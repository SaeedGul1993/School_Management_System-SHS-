import React from 'react'
import './Table.css';
import { Input, Icon, Select } from 'semantic-ui-react';
import { Card } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import PrintData from '../ViewPanel/PrintData';
import PrintDataByClass from '../ViewPanel/printDataByClass';
import ReactToPrint from 'react-to-print';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { getListOfClasses } from '../../Redux/Actions/getClasses';
import { getListOfStudents } from '../../Redux/Actions/getStudents';
import { Tooltip } from '@material-ui/core';



class FeeTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            open: false,
            open1: false,
            openPrintModal: false,
            openPrintModal1: false,
            stdObject: {},
            paidFeeList: this.props.feeList,
            classId: '',
            options: [],
            selectMonth: ''

        }
    }

    componentWillMount() {
        console.log('props', this.props.feeList)
        var countryOptions = this.props.listOfClasses.map((name, index) => {
            return { key: index, value: name.id, text: name.ClassName }
        })
        this.setState({
            options: countryOptions
        })

    }

    selcectMonthHandler = (e) => {
        this.setState({
            selectMonth: e.target.value
        })
        console.log('select Month',e.target.value);
        console.log('select class iD',this.state.classId);
        let dummyArray = [];
        this.props.feeList.map((fee) => {
            if (this.state.classId === fee.classID && fee.monthOfFee === e.target.value) {
                dummyArray.push(fee);
                console.log('true', dummyArray);
                this.setState({
                    paidFeeList: dummyArray
                })
               
            }
            
        })

    }

    selectHandler = (selectedOption, data) => {
        this.setState({
            classId: data.value
        })

    }

    seacrhingMethodForStudents = (value) => {
        return function (x) {
            return x.grNo.toLowerCase().includes(value.toLowerCase()) || !value;
        }
    }

    seacrhHandler = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }


    compare = (a, b) => {
        const bandA = a.ClassName.toUpperCase();
        const bandB = b.ClassName.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    readyForPrint = (id) => {
        this.setState({
            open: true,
            openPrintModal: true
        })
        this.props.feeList.map((fee) => {
            if (fee.feeId == id) {
                this.setState({
                    stdObject: fee
                }, () => {
                    console.log('stdObject', this.state.stdObject);
                })
            }
        })
    }

    readyForPrintAllStudentsByClass = () => {
        this.setState({
            open1: true,
            openPrintModal1: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
            openPrintModal: false
        })
    };
    handleClose1 = () => {
        this.setState({
            open1: false,
            openPrintModal1: false
        })
    };

    printModal = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={this.state.open}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
            >
                <div className="under-modal-container">
                    <ReactToPrint
                        className="print-btn-container"
                        trigger={() => <Button className="print-btn" ><PrintIcon /></Button>}
                        content={() => this.componentRef}
                    />
                    <div>
                        <PrintData ref={el => (this.componentRef = el)} paidStudentObject={this.state.stdObject} />
                    </div>
                </div>
            </Modal>
        )
    }
    printAllDataModal = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={this.state.open1}
                onClose={this.handleClose1}
                closeAfterTransition
                BackdropComponent={Backdrop}
            >
                <div className="under-modal-container">
                    <ReactToPrint
                        className="print-btn-container"
                        trigger={() => <Button className="print-btn" ><PrintIcon /></Button>}
                        content={() => this.componentRef}
                    />
                    <div>
                        <PrintDataByClass ref={el => (this.componentRef = el)} paidStudentArray={this.state.paidFeeList} />
                    </div>
                </div>
            </Modal>
        )
    }
    render() {
        return (
            <Card >
                <div className="heading-container">
                    <h4 className="table-heading">{this.props.heading}</h4>
                    <Select placeholder={<p className="select-placeholder">Select Class</p>}
                        className="select-input-fee"
                        selection
                        options={this.state.options}
                        onChange={this.selectHandler}
                        value={this.state.classId}
                    />
                    <Input icon="calendar alternate outline"
                        title="search by Month"
                        type="month"
                        iconPosition="left"
                        value={this.state.selectMonth}
                        onChange={this.selcectMonthHandler}
                    />
                    <Input icon="search"
                        placeholder="search by grNo"
                        iconPosition="right"
                        value={this.state.searchValue}
                        onChange={this.seacrhHandler}
                    />
                    <Tooltip title="print-all-by-class" placement="top" >
                        <PrintIcon className="print-icon-all"
                            onClick={this.readyForPrintAllStudentsByClass}
                        />
                    </Tooltip>

                </div>
                <table className="table">
                    <thead>
                        <th>V.No</th>
                        <th>Gr.No</th>
                        <th>StdName</th>
                        <th>FathName</th>
                        <th>Class</th>
                        <th>IssDate</th>
                        <th>Month</th>
                        <th>MonthlyFee</th>
                        <th>LateFee</th>
                        <th>AdmFee</th>
                        <th>CompFee</th>
                        <th>ExamFee</th>
                        <th>LabFee</th>
                        <th>AnnaulFee</th>
                        <th>DueFee</th>
                        <th>AfterDueFee</th>
                        <th>Action</th>

                    </thead>
                    <tbody>
                        {this.state.paidFeeList.sort(this.compare).filter(this.seacrhingMethodForStudents(this.state.searchValue)).map((fee, index) => {
                            return <tr key={index}>
                                <td data-label="Gr.No">{fee.vochureNumber}</td>
                                <td data-label="Student Name">{fee.grNo}</td>
                                <td data-label="Father Name">{fee.studentName}</td>
                                <td data-label="Class">{fee.fatherName}</td>
                                <td data-label="Class">{fee.ClassName}</td>
                                <td data-label="Ph.No">{fee.issueDate}</td>
                                <td data-label="Adm Date">{fee.monthOfFee}</td>
                                <td data-label="Due Date">{fee.monthlyFee}</td>
                                <td data-label="Fee">{fee.lateFee}</td>
                                <td data-label="Fee">{fee.admissionFee}</td>
                                <td data-label="Fee">{fee.computerFee}</td>
                                <td data-label="Fee">{fee.examinationFee}</td>
                                <td data-label="Fee">{fee.labCharges}</td>
                                <td data-label="Fee">{fee.annualCharges}</td>
                                <td data-label="Fee">{fee.dueDateAmount}</td>
                                <td data-label="Fee">{fee.afterDueDateAmount}</td>
                                <td data-label="Fee">
                                    <Tooltip title="print-By-Single-Student" placement="top" >
                                        <PrintIcon className="print-icon"
                                            onClick={() => this.readyForPrint(fee.feeId)}
                                        />
                                    </Tooltip>
                                </td>


                            </tr>
                        })}
                    </tbody>
                </table>
                {this.state.openPrintModal ? this.printModal() : false}
                {this.state.openPrintModal1 ? this.printAllDataModal() : false}

            </Card>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(FeeTable);

