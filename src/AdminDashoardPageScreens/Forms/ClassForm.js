import React, { useState } from 'react';
import './Form.css';
import { Card } from '@material-ui/core';
import { Icon, Input } from 'semantic-ui-react';
import { Button, notification } from 'antd';
import Loader from '../../Loader/Loader';
import { AddClassApi } from "../../Services/PostApi's";


const ClassForm = () => {
    const [Loaders, setLoader] = useState(false);
    const [nameOfClass, setNameOfClass] = useState('');

    const showNotification = () => {
        notification.open({
            type: 'success',
            duration: 2,
            message: <p style={{ textAlign: 'center', color: "#000000", fontFamily: "'El Messiri', sans-serif" }}> Create Class Successfully . </p>,
            style: {
                width: 400,
                marginLeft: 335 - 800,
                marginTop: 150 - 100,
                background: '#ffffff',
                color: '#32be8f'
            },
        })
    }
    const setStateOfInput = () => {
        setNameOfClass('');
    }
    const trueLoader = () => {
        setLoader(true);
        console.log('loader', Loaders);
    }
    const falseLoader = () => {
        setLoader(false);
        console.log('loader', Loaders);
    }
    const changeHandler = (e) => {
        setNameOfClass(e.target.value);
        console.log('name',e.target.value)
    }
    return (
        <div className="class-form-container">
            <Card className="class-form">
                <div>
                    <Icon className="form-icon" name="pencil" />
                    <h2>Create Class</h2>
                </div>
                <div className="class-inputField">
                    <Input placeholder="Enter Class Name"
                        icon="pencil"
                        iconPosition="left"
                        value={nameOfClass}
                        onChange={changeHandler}
                        autocapitalize = "word"
                    />
                </div>
                <div className="class-form-btn">
                    <Button onClick={() => AddClassApi(nameOfClass, trueLoader,falseLoader, showNotification, setStateOfInput)}
                        disabled={nameOfClass.length == 0 ? true : false}
                    >
                        Submit
                    </Button>
                </div>
            </Card>
            {Loaders ? <Loader /> : ""}
        </div>
    )
}

export default ClassForm;