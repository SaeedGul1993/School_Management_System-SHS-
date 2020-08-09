import React, { useState, useEffect } from 'react';
import './Form.css';
import { Card } from '@material-ui/core';
import { Icon, Input, Select } from 'semantic-ui-react';
import { Button, notification } from 'antd';
import { connect } from 'react-redux';
import { getListOfClasses } from '../../Redux/Actions/getClasses';
import { getListOfStudents } from '../../Redux/Actions/getStudents';
import { AddStudentApi } from "../../Services/PostApi's";
import Loader from '../../Loader/Loader';
import Firebase from '../../Config/Config';

const StudentForm = (props) => {

    const [studentName, setStudentName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [classId, setClassId] = useState('');
    const [ClassName, setClassName] = useState('');
    const [gr_No, set_Gr_No] = useState('');
    const [adm_Date, set_Adm_Date] = useState('');
    const [due_Date, set_Due_Date] = useState('');
    const [fee, setFee] = useState('');
    const [phn_No, set_Phn_No] = useState('');
    const [Loaders, setLoader] = useState(false);

    useEffect(() => {
        props.getStudents();
        console.log('props', props.listOfStudents);
    }, []);
    const countryOptions = props.listOfClasses.map((name, index) => {
        return { key: index, value: name.id, text: name.ClassName }
    })
    const showNotification = () => {
        notification.open({
            type: 'success',
            duration: 2,
            message: <p style={{ textAlign: 'center', color: "#000000", fontFamily: "'El Messiri', sans-serif" }}> Create Student Successfully . </p>,
            style: {
                width: 400,
                marginLeft: 335 - 800,
                marginTop: 150 - 100,
                background: '#ffffff',
                color: '#32be8f'
            },
        })
    }
    const allStates = () => {
        setStudentName('');
        setFatherName('');
        set_Gr_No('');
        set_Phn_No('');
        set_Adm_Date('');
        set_Due_Date('');
        setFee('');
        setClassId('');
    }
    const showLoader = () => {
        setLoader(true);
        console.log('loader', Loaders);
    }
    const hideLoader = () => {
        setLoader(false);
        console.log('loader', Loaders);
    }
    const selectHandler = (selectedOption, data) => {
        setClassId(data.value);
        getClassById(data.value);
    }
    const checkStudentByIdAndGrNo = (grNo) => {
        props.listOfStudents.map((data) => {
            if (data.grNo === grNo && data.classId == classId) {
                alert('This " Gr.No " is already Registered.');
                set_Gr_No('');
            }
        })
    }
    const getClassById = (id) => {
        return (
            Firebase.database().ref(`Classes/${id}/`).on('value', (snapShot) => {
                let data = snapShot.val();
                setClassName(data.ClassName);
            })
        )
    }
    const handleChangeOfStudentName = (e) => {
        setStudentName(e.target.value);
    };

    const handleChangeOfFatherName = (e) => {
        setFatherName(e.target.value);
    };

    const handleChangeOfGrNo = (e) => {
        set_Gr_No(e.target.value);
        checkStudentByIdAndGrNo(e.target.value);

    };

    const handleChangeOfPhoneNumber = (e) => {
        set_Phn_No(e.target.value);
    };

    const handleChangeOfadmDate = (e) => {
        set_Adm_Date(e.target.value);
        console.log(e.target.value);
    };

    const handleChangeOfDueDate = (e) => {
        set_Due_Date(e.target.value);
    };

    const handleChangeOfFee = (e) => {
        setFee(e.target.value);
    };

    return (
        <div className="student-form-container">
            <Card className="student-form">
                <div>
                    <Icon className="form-icon" name="pencil" />
                    <h2>Create Student</h2>
                </div>
                <div className="student-inputField">
                    <Input placeholder="Enter Student Name"
                        icon="pencil"
                        iconPosition="left"
                        value={studentName}
                        onChange={handleChangeOfStudentName}
                    />
                    <Input placeholder="Enter Father Name"
                        icon="pencil"
                        iconPosition="left"
                        value={fatherName}
                        onChange={handleChangeOfFatherName}
                    />
                </div>
                <div className="student-inputField">
                    <Select placeholder={<p className="select-placeholder">Select Class</p>}
                        className="select-input"
                        options={countryOptions}
                        onChange={selectHandler}
                        value={classId}
                        selection
                    />
                    <Input placeholder="Enter Gr.No"
                        icon="pencil"
                        iconPosition="left"
                        value={gr_No}
                        onChange={handleChangeOfGrNo}
                    />
                </div>

                <div className="student-inputField">
                    <Input placeholder="Enter Phone Number"
                        icon="pencil"
                        iconPosition="left"
                        value={phn_No}
                        onChange={handleChangeOfPhoneNumber}
                    />
                    <Input type="date" title="Enter Admission Date"
                        icon="pencil"
                        iconPosition="left"
                        value={adm_Date}
                        onChange={handleChangeOfadmDate}
                    />
                </div>
                <div className="student-inputField">
                    <Input placeholder="Enter Due Date"
                        icon="pencil"
                        iconPosition="left"
                        value={due_Date}
                        onChange={handleChangeOfDueDate}
                    />
                    <Input placeholder="Enter Fee"
                        icon="pencil"
                        iconPosition="left"
                        value={fee}
                        onChange={handleChangeOfFee}
                    />
                </div>
                <div className="student-form-btn">
                    <Button
                        onClick={() => AddStudentApi(studentName, fatherName, classId, ClassName, gr_No, phn_No, adm_Date, due_Date, fee, showLoader, hideLoader, showNotification, allStates)}
                        disabled={
                            studentName.length == 0 ||
                                fatherName.length == 0 ||
                                classId.length == 0 ||
                                gr_No.length == 0 ||
                                phn_No.length == 0 ||
                                adm_Date.length == 0 ||
                                due_Date.length == 0 ||
                                fee.length == 0 ? true : false
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getClasses: () => { dispatch(getListOfClasses()) },
        getStudents: () => { dispatch(getListOfStudents()) }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);