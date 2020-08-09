import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getListOfStudents } from '../../Redux/Actions/getStudents';
import { getListOfClasses } from '../../Redux/Actions/getClasses';
import DataTable from '../Table/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Card } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input } from 'semantic-ui-react';
import { Button, notification } from 'antd';
import Firebase from '../../Config/Config';
import './viewPanel.css';

const StudentList = (props) => {

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [updateStudentName, setUpdateStudentName] = React.useState('');
    const [updateFatherName, setUpdateFatherName] = React.useState('');
    const [updatePhoneNumber, setUpdatePhoneNumber] = React.useState('');
    const [updateFee, setUpdateFee] = React.useState('');
    const [updateValueId, setUpdateValueId] = React.useState('');
    const [deleteValueId, setDeleteValueId] = React.useState('');

    useEffect(() => {
        console.log('props', props.listOfStudents);
        props.getStudents();
    }, [])

    const showNotification = () => {
        notification.open({
            type: 'success',
            duration: 2,
            message: <p style={{ textAlign: 'center', color: "#000000", fontFamily: "'El Messiri', sans-serif" }}> Update Student Successfully . </p>,
            style: {
                width: 400,
                marginLeft: 335 - 800,
                marginTop: 150 - 100,
                background: '#ffffff',
                color: '#32be8f'
            },
        })
    }
    const showDeleteNotification = () => {
        notification.open({
            type: 'success',
            duration: 2,
            message: <p style={{ textAlign: 'center', color: "#000000", fontFamily: "'El Messiri', sans-serif" }}> Delete Student Successfully . </p>,
            style: {
                width: 400,
                marginLeft: 335 - 800,
                marginTop: 150 - 100,
                background: '#ffffff',
                color: '#32be8f'
            },
        })
    }

    const getDataForUpdate = () => {
        Firebase.database().ref(`Students/${updateValueId}/studentName`).set(
            updateStudentName
        ).then(() => {
            Firebase.database().ref(`Students/${updateValueId}/fatherName`).set(
                updateFatherName
            ).then(() => {
                Firebase.database().ref(`Students/${updateValueId}/phoneNumber`).set(
                    updatePhoneNumber
                ).then(() => {
                    Firebase.database().ref(`Students/${updateValueId}/fee`).set(
                        updateFee
                    ).then(() => {
                        showNotification();
                        handleClose();
                    })
                })
            })
        })
    }
    const editMethod = (id, stdName, fName, phnNumber, fee) => {
        console.log('edit', id);
        setOpen1(true);
        setOpenEdit(true);
        setUpdateValueId(id);
        setUpdateStudentName(stdName);
        setUpdateFatherName(fName);
        setUpdatePhoneNumber(phnNumber);
        setUpdateFee(fee);
    }
    const deleteMethod = (id) => {
        setOpen2(true);
        setOpenDelete(true);
        setDeleteValueId(id);

    }
    const onDelete = () => {
        Firebase.database().ref(`Students/${deleteValueId}/`).remove()
            .then(() => {
                showDeleteNotification();
                handleDeletClose();
            })
    }
    const handleClose = () => {
        setOpen1(false);
        setOpenEdit(false);
    };
    const handleDeletClose = () => {
        setOpen2(false);
        setOpenDelete(false);
    };
    const onCancel = () => {
        setOpen2(false);
        setOpenDelete(false);
        console.log('cancel');
    }
    const changeHandler1 = (e) => {
        setUpdateStudentName(e.target.value);
    }
    const changeHandler2 = (e) => {
        setUpdateFatherName(e.target.value);
    }
    const changeHandler3 = (e) => {
        setUpdatePhoneNumber(e.target.value);
    }
    const changeHandler4 = (e) => {
        setUpdateFee(e.target.value);
    }
    const showEditModal = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={open1}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="student-modal-container">
                    <div className="heading-container1">
                        <EditIcon className="modal-icon" /><h2>Edit Student Detail</h2>
                    </div>
                    <div className="modal-input">
                        <Input placeholder="Update Student Name"
                            value={updateStudentName}
                            onChange={changeHandler1}
                            icon="pencil"
                            iconPosition="left"
                        />
                    </div>
                    <div className="modal-input">
                        <Input placeholder="Update Father Name"
                            value={updateFatherName}
                            onChange={changeHandler2}
                            icon="pencil"
                            iconPosition="left"
                        />
                    </div>
                    <div className="modal-input">
                        <Input placeholder="Update Phone Number"
                            value={updatePhoneNumber}
                            onChange={changeHandler3}
                            icon="pencil"
                            iconPosition="left"
                        />
                    </div>
                    <div className="modal-input">
                        <Input placeholder="Update fee"
                            value={updateFee}
                            onChange={changeHandler4}
                            icon="pencil"
                            iconPosition="left"
                        />
                    </div>
                    <div className="modal-btn">
                        <Button onClick={getDataForUpdate}> Update</Button>
                    </div>
                </div>
            </Modal>
        )
    }
    const showDeleteModal = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={open2}
                onClose={handleDeletClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="delete-modal-container">
                    <div className="heading-container1 ">
                        <DeleteIcon className="modal-icon" /><h2>Delete Student</h2>
                    </div>
                    <div className="modal-para">
                        <p>Are You Sure You are Delete this <b style={{ color: 'red' }}>Student</b> ? </p>
                    </div>
                    <div className="modal-btns">
                        <Button className="cancel-btn" onClick={onCancel} >Cancel</Button>
                        <Button className="delete-btn" onClick={onDelete}>Delete</Button>
                    </div>
                </div>
            </Modal>
        )
    }


    return (
        <div className="student-table-container">
            <DataTable actions="true" heading="Student List" editFunc={editMethod} deleteFunc={deleteMethod} studentList={props.listOfStudents} />
            {openEdit ? showEditModal() : ''}
            {openDelete ? showDeleteModal() : ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);