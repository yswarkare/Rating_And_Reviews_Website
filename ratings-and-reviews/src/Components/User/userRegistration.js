import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RegistrationErrors from "./RegistrationErrors";
import { setFirstName,
    setMiddleName,
    setLastName,
    setUsername,
    setEmailId,
    setPassword,
    setRepeatPassword,
    registerUser } from "../../Redux/Actions/userActions";

class UserRegistration extends Component {

    state = {
        registered: null,
        redirect: null
    }

    onChangeSetFirstName = (firstName) =>{
        this.props.setFirstName(firstName)
    }
    
    onChangeSetMiddleName = (middleName) =>{
        this.props.setMiddleName(middleName)
    }
    
    onChangeSetLastName = (lastName) =>{
        this.props.setLastName(lastName)
    }
    
    onChangeSetUsername = (username) =>{
        this.props.setUsername(username)
    }
    
    onChangeSetEmailId = (emailId) =>{
        this.props.setEmailId(emailId)
    }
    
    onChangeSetPassword = (password) =>{
        this.props.setPassword(password)
    }
    
    onChangeSetRepeatPassword = (repeatPassword) =>{
        this.props.setRepeatPassword(repeatPassword)
    }

    onClickRegisterUser = () => {
        this.props.registerUser(this.props.user)
    }

    render(){
        console.log(this.props.user)
        return(
            <div>
            <div className="user-registration-container">
                <div className="user-registration">
                    <TextField type="text" onChange={(e)=>{this.onChangeSetFirstName(e.target.value)}} label="First Name" variant="outlined" />
                    <TextField type="text" onChange={(e)=>{this.onChangeSetMiddleName(e.target.value)}} label="Middle Name" variant="outlined" />
                    <TextField type="text" onChange={(e)=>{this.onChangeSetLastName(e.target.value)}} label="Last Name" variant="outlined" />
                    <div></div>
                    <TextField type="text" onChange={(e)=>{this.onChangeSetUsername(e.target.value)}} label="Username" variant="outlined" />
                    <TextField type="text" onChange={(e)=>{this.onChangeSetEmailId(e.target.value)}} label="Email Id" variant="outlined" />
                    <TextField type="password" onChange={(e)=>{this.onChangeSetPassword(e.target.value)}} autoComplete="current-password" label="Password" variant="outlined" />
                    <TextField type="password" onChange={(e)=>{this.onChangeSetRepeatPassword(e.target.value)}} autoComplete="current-password" label="Repeat Password" variant="outlined" />
                    <div></div>
                    <Button onClick={()=>{this.onClickRegisterUser()}} variant="contained" color="primary">
                        Register
                    </Button>
                    
                </div>
            </div>
                <div>
                    <RegistrationErrors></RegistrationErrors>
                </div>
            </div>
        )
    }
}

UserRegistration.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired,
    setFirstName: PropTypes.func.isRequired,
    setMiddleName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setEmailId: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setRepeatPassword: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        errors: state.users.errors,
        loginStatus: state.users.loginStatus
    };
}

export default connect(mapStateToProps, { setFirstName,
    setMiddleName,
    setLastName,
    setUsername,
    setEmailId,
    setPassword,
    setRepeatPassword,
    registerUser })(UserRegistration);