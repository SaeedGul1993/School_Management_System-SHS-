import React from 'react';
import { Input, Icon, Select } from 'semantic-ui-react';
import { Card, Checkbox } from '@material-ui/core';
import Firebase from '../../Config/Config';
import { Button, notification } from 'antd';
import { connect } from 'react-redux';
import { getListOfClasses } from '../../Redux/Actions/getClasses';
import { getListOfStudents } from '../../Redux/Actions/getStudents';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

class TransferStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classId: '',
            options: [],
            selectedStudentList: [],
            open: false,
            openModal: false,
            updateClassId: '',
            updateClassName: ''
        }
    }
    componentWillMount = () => {
        console.log('props', this.props.feeList)
        var countryOptions = this.props.listOfClasses.map((name, index) => {
            return { key: index, value: name.id, text: name.ClassName }
        })
        this.setState({
            options: countryOptions
        })
        this.props.getClasses();
    }

    selectHandler = (selectedOption, data1) => {
        this.setState({
            classId: data1.value
        })
        console.log('classID ', data1.value);
        this.getStudents(data1.value);
    }

    selectHandler1 = (selectedOption, data1) => {
        this.setState({
            updateClassId: data1.value
        })
        this.getClassById(data1.value);
    }

    getClassById = (id) => {
        return (
            Firebase.database().ref(`Classes/${id}/`).on('value', (snapShot) => {
                let data = snapShot.val();
                this.setState({
                    updateClassName: data.ClassName
                })

            })
        )
    }

    checkState = (id) => {

        let students = this.state.selectedStudentList.map((student) => {
            if (student.stdId == id) {
                student.checkValue = !student.checkValue;
            }
            return { ...student }
        })
        this.setState({
            selectedStudentList: students
        })
    }

    stdTransferFinally = () => {
        this.state.selectedStudentList.filter(std => std.checkValue==true).map((student) => {
            console.log('student',student);
            Firebase.database().ref(`Students/${student.stdId}`).update({
                ClassName: this.state.updateClassName,
                classId: this.state.updateClassId
            }).then(() => {
                this.handleClose();
                this.showNotification();
                this.setState({
                    updateClassId:''
                })
            })
        })
    }

    showNotification = () => {
        notification.open({
            type: 'success',
            duration: 2,
            message: <p style={{ textAlign: 'center', color: "#000000", fontFamily: "'El Messiri', sans-serif" }}> Student Transfer Successfuly . </p>,
            style: {
                width: 400,
                marginLeft: 335 - 800,
                marginTop: 150 - 100,
                background: '#ffffff',
                color: '#32be8f'
            },
        })
    }
    transferStudentModal = () => {
        this.setState({
            open: true,
            openModal: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
            openModal: false
        })
    };

    studentTransferModal = () => {
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
                <div className="transfer-modal-container">
                    <div id="modal-heading">
                        <TransferWithinAStationIcon className="transfer-icon" />   <h2> Transfer Student In  Class </h2>
                    </div>
                    <div id="modal-select">
                        <Select placeholder={<p className="select-placeholder">Select Class</p>}
                            className="select-input-fee1"
                            selection
                            options={this.state.options}
                            onChange={this.selectHandler1}
                            value={this.state.updateClassId}
                        />
                    </div>
                    <div id="modal-button">
                        <Button onClick={this.stdTransferFinally} disabled={this.state.updateClassId.length == 0 ? true:false}>
                            Transfer
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
    getStudents = (id) => {
        return (
            Firebase.database().ref(`Students/`).on('value', (snapShot) => {
                let data = snapShot.val();
                console.log('data ', data);
                let studentDummyArray = [];
                for (var key in data) {
                    data[key].stdId = key;
                    if (data[key]['classId'] === id) {
                        data[key].checkValue = true;
                        studentDummyArray.push(data[key]);
                    }
                }
                console.log('dummyArray', studentDummyArray);
                this.setState({
                    selectedStudentList: studentDummyArray
                })
            })
        )
    }
    showTransferStudentTable = () => {
        return (
            <Card>
                <div className="heading-container">
                    <h4 className="table-heading">Transfer Students List</h4>
                    <Select placeholder={<p className="select-placeholder">Select Class</p>}
                        className="select-input-fee"
                        selection
                        options={this.state.options}
                        onChange={this.selectHandler}
                        value={this.state.classId}
                    />
                    <Button className="transfer-btn" onClick={this.transferStudentModal}>
                        <TransferWithinAStationIcon />
                    </Button>

                </div>
                <table class="table">
                    <thead>
                        <th>Action</th>
                        <th>Gr.No</th>
                        <th>Student Name</th>
                        <th>Father Name</th>
                        <th>Class</th>
                        <th>Ph.No</th>
                        <th>Adm Date</th>
                        <th>Due Date</th>
                        <th>Fee</th>

                    </thead>
                    <tbody>
                        {this.state.selectedStudentList.length ? this.state.selectedStudentList.map((student, index) => {
                            return <tr key={index}>
                                <td><Checkbox style={{ color: '#38d39f' }} size="medium" checked={student.checkValue} onClick={() => this.checkState(student.stdId)} ></Checkbox></td>
                                <td data-label="Gr.No">{student.grNo}</td>
                                <td data-label="Student Name">{student.studentName}</td>
                                <td data-label="Father Name">{student.fatherName}</td>
                                <td data-label="Class">{student.ClassName}</td>
                                <td data-label="Ph.No">{student.phoneNumber}</td>
                                <td data-label="Adm Date">{student.admissionDate}</td>
                                <td data-label="Due Date">{student.dueDate}</td>
                                <td data-label="Fee">{student.fee}</td>
                            </tr>
                        }) : <p style={{ textAlign: 'center', fontFamily: "'El Messiri', sans-serif ", fontSize: '30px ' }}>No Data is found ...</p>}
                    </tbody>
                </table>
                {this.state.openModal ? this.studentTransferModal() : false}
            </Card>
        )
    }
    render() {
        console.log('list',this.state.selectedStudentList)
        return (
            <div>
                {this.showTransferStudentTable()}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransferStudent);