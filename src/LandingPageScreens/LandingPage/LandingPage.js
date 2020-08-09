import React from 'react';
import './LandingPage.css';
import Grid from '@material-ui/core/Grid';
import Loader from '../../Loader/Loader';
import LoginPage from '../AuthenticationPage/LoginPage';
import Bg from '../../assets/backgroundImages/backgroundImage.png';
import BgTopImage from '../../assets/avatar/image.svg';
import { connect } from 'react-redux';
import { loggedInUserMethod, loggedOutUserMethod } from '../../Redux/Actions/loggedInUser';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true
        }
    }
    componentDidMount() {
        const { loader } = this.state;
        setInterval(() => {
            this.setState({
                loader: false
            })
        }, 3000)
        if(this.props.loggedUser !=null){
            this.props.history.push(`dashboard/home`);
        }
    }
    render() {
        return (
            <div className="Landing-Page-Container">
                <img className="Wave-bg" src={Bg} />
                <Grid container spacing={1}>
                    <Grid item xs={6} className="Img">
                        <img src={BgTopImage} />
                    </Grid>
                    <Grid item xs={6} className="Login-Container">
                        <LoginPage />
                    </Grid>
                </Grid>
                {this.state.loader ? <Loader /> : ''}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedInUser.LoggedInUser
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
       
        setLoggedInUser: (data) => { dispatch(loggedInUserMethod(data)) },
        setUnPaidLength: (data) => { dispatch(loggedOutUserMethod(data)) }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps) (LandingPage);