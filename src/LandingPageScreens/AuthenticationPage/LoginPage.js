import React, { useState } from 'react';
import './AuthenticationPage.css';
import avatar from '../../assets/avatar/avatar.svg';
import { notification } from 'antd';
import Loader from '../../Loader/Loader';
import { LogInApi } from "../../Services/PostApi's";
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { loggedInUserMethod, loggedOutUserMethod } from '../../Redux/Actions/loggedInUser';

const LoginPage = (props) => {

    const [loader, setLoader] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');


    const Loaders = () => {

        setLoader(!loader);
    }

    const showNotification = () => {
        notification.open({
            type: 'success',
            duration: 2,
            message: <p style={{ textAlign: 'center', color: '#000000', fontFamily: "'El Messiri', sans-serif" }}> Congrate ! Login SuccessFully</p>,
            style: {
                width: 400,
                marginLeft: 335 - 800,
                marginTop: 150 - 100,
                background: '#ffffff',
                color: '#32be8f'
            },
        })
    }

    const changeEmailHandler = (e) => {
        setUserEmail(e.target.value);
    }

    const changePasswordHandler = (e) => {
        setUserPassword(e.target.value);
    }
    const getLoggedUserData =(data)=>{
        props.setLoggedInUser(data);
    }
    const submitLoginForm = (email, password) => {
        console.log('props', props);
        return (
            LogInApi(email, password, Loaders, props, showNotification,getLoggedUserData)
        )
    }

    const showLoginForm = () => {
        return (
            <div className="login-form-container">
                <div className="avatar-container">
                    <img src={avatar} />
                </div>
                <h2>WELCOME</h2>
                <div className="ui left icon input  ">
                    <input type="email" value={userEmail} onChange={changeEmailHandler} placeholder="useremail@gmail.com" />
                    <i aria-hidden="true" class="users icon bye"></i>
                </div>

                <div className="ui left icon input  ">
                    <input type="password" value={userPassword} onChange={changePasswordHandler} placeholder="password" />
                    <i aria-hidden="true" class="lock icon bye"></i>
                </div>
                <div classsName="forget-container">
                    <a >Forget Password ?</a>
                </div>
                <div className="btn-container">
                    <Button
                        onClick={() => submitLoginForm(userEmail, userPassword)}
                        disabled={userEmail.length==0 || userPassword.length==0 ? true : false}
                    >
                        LogIn
                    </Button>
                </div>
                {loader ? <Loader /> : ''}
            </div>
        )
    }

    return (

        <div>
            {showLoginForm()}
            {loader ? <Loader /> : ''}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
       
        setLoggedInUser: (data) => { dispatch(loggedInUserMethod(data)) },
        setUnPaidLength: (data) => { dispatch(loggedOutUserMethod(data)) }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)( withRouter(LoginPage)); 