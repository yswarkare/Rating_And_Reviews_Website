import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LoginErrors from "./LoginErrors";
import { Link } from "react-router-dom"
import { getUsernameOrEmailId, getPassword, userLogin } from "../../Redux/Actions/userActions";

class UserLogin extends Component {

    onChangeGetUsernameOrEmailId = (usernameOrEmail) => {
        this.props.getUsernameOrEmailId(usernameOrEmail)
    }

    onChangeGetPassword = (password) => {
        this.props.getPassword(password)
    }
    
    onClickUserLogin = () => {        
        this.props.userLogin(this.props.loginDetails);
    }

    render(){
        
        return(
            <div className="user-login-container">
                <div className="user-login">
                    <TextField onChange={(e)=>{this.onChangeGetUsernameOrEmailId(e.target.value)}} type="text" id="outlined-required" label="Username or Email Id" variant="outlined" />
                    <TextField onChange={(e)=>{this.onChangeGetPassword(e.target.value)}} type="password" autoComplete="current-password" id="outlined-password-input" label="Password" variant="outlined" />
                    <Link to={this.props.loginStatus.loginRedirect}>
                        <Button onClick={()=>{this.onClickUserLogin()}} variant="contained" color="primary">
                            Login
                        </Button>
                    </Link>
                    <LoginErrors></LoginErrors>
                </div>
            </div>
        )
    }
}

UserLogin.propTypes = {
    user: PropTypes.object.isRequired,
    loginDetails: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired,
    headers: PropTypes.object.isRequired,
    getUsernameOrEmailId: PropTypes.func.isRequired,
    getPassword: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
     return {
        user: state.users.user,
        loginDetails: state.users.loginDetails,
        errors: state.users.errors,
        loginStatus: state.users.loginStatus,
        headers: state.users.headers
    };
}

export default connect(mapStateToProps, { getUsernameOrEmailId, getPassword, userLogin })(UserLogin);