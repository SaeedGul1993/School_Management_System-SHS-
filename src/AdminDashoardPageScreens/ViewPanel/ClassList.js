import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getListOfClasses } from '../../Redux/Actions/getClasses';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './viewPanel.css';
import { ListItemIcon } from '@material-ui/core';
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

const ListOfClasses = (props) => {

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [updateValue, setUpdateValue] = React.useState('');
    const [updateValueId, setUpdateValueId] = React.useState('');
    const [deleteValueId, setDeleteValueId] = React.useState('');


    const showNotification = () => {
        notification.open({
            type: 'success',
            duration: 2,
            message: <p style={{ textAlign: 'center', color: "#000000", fontFamily: "'El Messiri', sans-serif" }}> Update Class Successfully . </p>,
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
            message: <p style={{ textAlign: 'center', color: "#000000", fontFamily: "'El Messiri', sans-serif" }}> Delete Class Successfully . </p>,
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
        Firebase.database().ref(`Classes/${updateValueId}/ClassName`).set(
            updateValue
        ).then(() => {
            showNotification();
            handleClose();
        })
    }
    const onDelete = () => {
        Firebase.database().ref(`Classes/${deleteValueId}/`).remove()
            .then(() => {
                showDeleteNotification();
                handleDeletClose();
            })
    }
    const handleOpen = (id, name) => {
        setOpen1(true);
        setOpenEdit(true);
        setUpdateValueId(id);
        setUpdateValue(name);
    };
    const handleClose = () => {
        setOpen1(false);
        setOpenEdit(false);
    };
    const handleOpenDeleteModal = (id) => {
        setOpen2(true);
        setOpenDelete(true);
        setDeleteValueId(id);
    }
    const handleDeletClose = () => {
        setOpen2(false);
        setOpenDelete(false);
    };
    const onCancel = () => {
        setOpen2(false);
        setOpenDelete(false);
        console.log('cancel');
    }
    const changeHandler = (e) => {
        setUpdateValue(e.target.value);
    }
    useEffect(() => {
        props.getClasses();
        console.log('props', props.listOfClasses);
    }, [])

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
                <div className="modal-container">
                    <div className="heading-container1">
                        <EditIcon className="modal-icon" /><h2>Edit Class Name</h2>
                    </div>
                    <div className="modal-input">
                        <Input placeholder="Update Class Name"
                            value={updateValue}
                            onChange={changeHandler}
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
                        <DeleteIcon className="modal-icon" /><h2>Delete Class Name</h2>
                    </div>
                    <div className="modal-para">
                        <p>Are You Sure You are Delete this Class ? </p>
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

        <div className="class-list-container">
            <List className="class-list-style">
                <li >
                    <ul>
                        {props.listOfClasses.map((name, index) => {
                            return <Card key={index} className="class-lis-card">
                                <ListItem   >
                                    <ListItemText className="class-list-text"><span id="index">{index + 1}</span> <span>{name.ClassName}</span></ListItemText>
                                    <ListItemIcon >
                                        <Tooltip title="Edit Class" placement="left">
                                            <EditIcon className="edit-icon" onClick={() => handleOpen(name.id, name.ClassName)} />
                                        </Tooltip>
                                        <Tooltip title="Delete Class" placement="right">
                                            <DeleteIcon className="delete-icon" onClick={() => handleOpenDeleteModal(name.id)} />
                                        </Tooltip>
                                    </ListItemIcon>
                                </ListItem>
                            </Card>
                        })}
                    </ul>
                </li>
            </List>
            {openEdit ? showEditModal() : ''}
            {openDelete ? showDeleteModal() : ''}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listOfClasses: state.classes.classArray
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getClasses: () => { dispatch(getListOfClasses()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfClasses);