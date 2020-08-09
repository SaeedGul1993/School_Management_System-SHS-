import React, { useState, useEffect } from 'react';
import './Form.css';
import { Card } from '@material-ui/core';
import { Icon } from 'semantic-ui-react';
import { Input, Select } from 'semantic-ui-react';
import { Button, notification } from 'antd';
import { connect } from 'react-redux';
import { getListOfStudents } from '../../Redux/Actions/getStudents';
import { getListOfFee } from '../../Redux/Actions/getFees';
import { getListOfClasses } from '../../Redux/Actions/getClasses';
import Firebase from '../../Config/Config';
import { AddFeeApi } from "../../Services/PostApi's";
import Loader from '../../Loader/Loader';

const FeeForm = (props) => {

    const [vochureNo, setvochureNo] = useState(0);
    const [ClassName, setClassName] = useState('');
    const [Loaders, setLoader] = useState(false);
    const [classId, setClassId] = useState('');
    const [grNo, setGrNo] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [selectMonth, setSelectMonth] = useState('');
    const [monthlyFee, setMonthlyFee] = useState('');
    const [admissionFee, setAdmissionFee] = useState(0);
    const [computerFee, setComputerFee] = useState(0);
    const [examinationFee, setExaminationFee] = useState(0);
    const [labCharges, setLabCharges] = useState(0);
    const [annualCharges, setAnnualCharges] = useState(0);
    const [lateFee, setLateFee] = useState('');
    const [dueDateAmount, setDueDateAmount] = useState('');
    const [afterDueDateAmount, setAfterDueDateAmount] = useState('');

    const countryOptions = props.listOfClasses.map((name, index) => {
        return { key: index, value: name.id, text: name.ClassName }
    })

    useEffect(() => {
        Firebase.database().ref(`Vochure/`).on('value', (snapShot) => {
            let data = snapShot.val();
            setvochureNo(data.VNumber + 1);
        })
        props.getFees();
        console.log('props of fee', props.listOfFee);
    }, [])

    const allStates = () => {
        setStudentName('');
        setFatherName('');
        setClassId('');
        setClassName('');
        setComputerFee(0);
        setAdmissionFee(0);
        setDueDateAmount('');
        setExaminationFee(0);
        setGrNo('');
        setIssueDate('');
        setMonthlyFee('');
        setSelectMonth('');
        setLateFee('');
        setLabCharges(0);
        setAfterDueDateAmount('');
        setAnnualCharges(0);
    }
    const showLoader = () => {
        setLoader(true);
        console.log('loader', Loaders);
    }
    const hideLoader = () => {
        setLoader(false);
        console.log('loader', Loaders);
    }
    const showNotification = () => {
        notification.open({
            type: 'success',
            duration: 2,
            message: <p style={{ textAlign: 'center', color: "#000000", fontFamily: "'El Messiri', sans-serif" }}> Create Fee Successfully . </p>,
            style: {
                width: 400,
                marginLeft: 335 - 800,
                marginTop: 150 - 100,
                background: '#ffffff',
                color: '#32be8f'
            },
        })
    }
    const selectHandler = (selectedOption, data) => {
        setClassId(data.value);
        getClassById(data.value);
        console.log('classId', data.value);

    }
    const getClassById = (id) => {
        return (
            Firebase.database().ref(`Classes/${id}/`).on('value', (snapShot) => {
                let data = snapShot.val();
                setClassName(data.ClassName);
                console.log('class Name', data.ClassName);

            })
        )
    }

    const grNoHandler = (e) => {
        setGrNo(e.target.value);
        props.listOfStudents.map((student) => {
            if (student.classId == classId && student.grNo == e.target.value) {
                setStudentName(student.studentName);
                setFatherName(student.fatherName);
                setMonthlyFee(student.fee);
                setStudentId(student.id);
                setDueDate(student.dueDate);
            }
            else if (grNo === '') {
                setStudentName('');
                setFatherName('');
                setMonthlyFee('');
            }

        })
    }

    const issueDateHandler = (e) => {
        setIssueDate(e.target.value);
        props.listOfStudents.map((student) => {
            if (parseInt((e.target.value).substring(8)) > parseInt(student.dueDate)) {
                let plainty = 250;
                setLateFee(plainty);
                console.log('monthly', (parseInt(monthlyFee)));
                let totalAmount = 0;
                console.log('lateFee', lateFee);
                totalAmount = parseInt(monthlyFee) + parseInt(plainty) + parseInt(computerFee) + parseInt(admissionFee) + parseInt(labCharges) + parseInt(annualCharges) + parseInt(examinationFee);
                console.log('total amount', totalAmount);
                let totalDueAmount = totalAmount - plainty;
                setAfterDueDateAmount(totalAmount);
                setDueDateAmount(totalDueAmount);
            }
            else {
                setLateFee(0);
                let totalAmount = 0;
                console.log('lateFee', lateFee);
                console.log('parseInt(computerFee)', parseInt(computerFee));
                console.log('parseInt(admissionFee)', parseInt(admissionFee));
                console.log('parseInt(annualCharges) ', parseInt(annualCharges) );
                console.log(' parseInt(examinationFee) ', parseInt(examinationFee) );

                console.log('lateFee', lateFee);

                totalAmount = parseInt(monthlyFee) + parseInt(computerFee) + parseInt(admissionFee) + parseInt(labCharges) + parseInt(annualCharges) + parseInt(examinationFee);
                console.log('total amount', totalAmount);
                setDueDateAmount(totalAmount);
                setAfterDueDateAmount('');
            }
        })

    }

    const monthHandler = (e) => {
        console.log('select month', e.target.value);
        setSelectMonth(e.target.value);
        props.listOfFee.map((fee) => {
            if (fee.classID == classId && fee.grNo == grNo && fee.monthOfFee == e.target.value) {
                alert('This " Student " has been paid this " Month " Fee Thanks');
                setSelectMonth('');
            }
        })
    }

    const admFeeHandler = (e) => {
        setAdmissionFee(e.target.value)
    }

    const computerFeeHandler = (e) => {
        setComputerFee(e.target.value);
    }

    const examinationFeeHandler = (e) => {
        setExaminationFee(e.target.value);
    }

    const labChargesHandler = (e) => {
        setLabCharges(e.target.value);
    }
    const annualChargesHandler = (e) => {
        setAnnualCharges(e.target.value);
    }
    const feeDetailObj = {
        vochureNumber: vochureNo,
        grNo: grNo,
        classID: classId,
        ClassName: ClassName,
        studentId: studentId,
        studentName: studentName,
        fatherName: fatherName,
        issueDate: issueDate,
        monthOfFee: selectMonth,
        monthlyFee: monthlyFee,
        admissionFee: admissionFee,
        computerFee: computerFee,
        examinationFee: examinationFee,
        labCharges: labCharges,
        annualCharges: annualCharges,
        lateFee: lateFee,
        dueDate:dueDate,
        dueDateAmount: dueDateAmount,
        afterDueDateAmount: afterDueDateAmount

    }

    return (
        <div className="fee-form-container">
            <Card className="fee-form">
                <div>
                    <Icon className="form-icon" name="pencil" />   <h2>Create Fee Voucher</h2>
                </div>
                <h2 className="vocuheer-num-style">Voucher No : {vochureNo} </h2>
                <div className="fee-inputField">
                    <Select placeholder={<p className="select-placeholder">Select Class</p>}
                        className="select-input"
                        options={countryOptions}
                        onChange={selectHandler}
                        value={classId}
                        selection
                    />
                    <Input placeholder="Enter GrNo"
                        icon="pencil"
                        iconPosition="left"
                        value={grNo}
                        onChange={grNoHandler}
                    />
                </div>
                <div className="fee-inputField">

                    <Input placeholder="Enter Student Name"
                        icon="pencil"
                        iconPosition="left"
                        value={studentName}
                    />
                    <Input placeholder="Enter Father Name"
                        icon="pencil"
                        iconPosition="left"
                        value={fatherName}
                    />
                </div>
                <div className="fee-inputField">

                    <Input placeholder="Enter Monthly Fee"
                        icon="pencil"
                        iconPosition="left"
                        value={monthlyFee}
                    />
                    <Input placeholder="Enter Admission Fee"
                        icon="pencil"
                        iconPosition="left"
                        value={admissionFee}
                        onChange={admFeeHandler}
                    />
                </div>
                <div className="fee-inputField">
                    <Input placeholder="Enter Computer Fee"
                        icon="pencil"
                        iconPosition="left"
                        value={computerFee}
                        onChange={computerFeeHandler}

                    />
                    <Input placeholder="Enter Examination Fee"
                        icon="pencil"
                        iconPosition="left"
                        value={examinationFee}
                        onChange={examinationFeeHandler}

                    />
                </div>
                <div className="fee-inputField">
                    <Input placeholder="Enter Lab Charges "
                        icon="pencil"
                        iconPosition="left"
                        value={labCharges}
                        onChange={labChargesHandler}

                    />
                    <Input placeholder="Enter Annual Fee"
                        icon="pencil"
                        iconPosition="left"
                        value={annualCharges}
                        onChange={annualChargesHandler}

                    />
                </div>
                <div className="fee-inputField">

                    <Input type="date" title="Select Issue Date"
                        icon="pencil"
                        iconPosition="left"
                        value={issueDate}
                        onChange={issueDateHandler}
                    />
                    <Input type="month" title="Select Month"
                        icon="pencil"
                        iconPosition="left"
                        value={selectMonth}
                        onChange={monthHandler}
                    />
                </div>
                <div className="fee-inputField">

                    <Input placeholder="Enter Due Date Amount"
                        icon="pencil"
                        iconPosition="left"
                        value={dueDateAmount}
                    />
                    <Input placeholder="Enter After Due Date Amount"
                        icon="pencil"
                        iconPosition="left"
                        value={afterDueDateAmount}
                    />
                </div>
                <div className="fee-inputField">

                    <Input placeholder="Enter Late Fee"
                        icon="pencil"
                        iconPosition="left"
                        value={lateFee}

                    />
                </div>
                <div className="student-form-btn">
                    <Button
                        onClick={() => AddFeeApi(feeDetailObj, showLoader, hideLoader, showNotification, allStates, vochureNo)}
                        disabled={
                            classId.length == 0 ||
                                grNo.length == 0 ||
                                studentName.length == 0 ||
                                fatherName.length == 0 ||
                                issueDate.length == 0 ||
                                selectMonth.length == 0 ||
                                monthlyFee.length == 0 ? true : false
                        }
                    >
                        Submit
                    </Button>
                </div>
            </Card>
            {Loaders ? <Loader /> : ''}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listOfClasses: state.classes.classArray,
        listOfStudents: state.students.studentsArray,
        listOfFee: state.fees.feeArray,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getClasses: () => { dispatch(getListOfClasses()) },
        getStudents: () => { dispatch(getListOfStudents()) },
        getFees: () => { dispatch(getListOfFee()) }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeeForm);