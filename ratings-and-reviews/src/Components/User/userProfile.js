import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Tooltip, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from "@material-ui/icons/Update"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import UserNavbar from "../Navbars/userNavbar";
import { isUserLoggedIn } from "../../Redux/Actions/userActions";
import { 
    getUserInfo,
    setUserUpdate,
    setUpdateFirstName,
    setUpdateMiddleName,
    setUpdateLastName,
    setUpdateUsername,
    setUpdateEmailId,
    setUpdateOldPassword,
    setUpdateNewPassword,
    setUpdateRepeatPassword,
    updateUserName,
    updateUserUsername,
    updateUserEmailId,
    updateUserPassword } from "../../Redux/Actions/userProfileActions";
// import PasswordInput from "../InputComponents/PasswordInput";

class UserProfile extends Component {

    state = {
        editName: false,
        editUsername: false,
        editEmailId: false,
        editPassword: false,
        showPassword: false,
    }

    getDerivedStateFromProps = () => {
        this.props.isUserLoggedIn();
    }

    componentDidMount = () => {
        let userIsAdmin = this.props.userIsAdmin
        this.props.setUserUpdate()
        this.props.getUserInfo(userIsAdmin);
    }

    onClickEditName = () => {
        this.setState({
            editName: true
        })
    }

    onChangeSetFirstName = (firstName) => {
        this.props.setUpdateFirstName(firstName)
    }

    onChangeSetMiddleName = (middleName) => {
        this.props.setUpdateMiddleName(middleName)
    }

    onChangeSetLastName = (lastName) => {
        this.props.setUpdateLastName(lastName)
    }

    onClickUpdateName = () => {
        let user = {
            user: this.props.userUpdate,
            userIsAdmin: this.props.userIsAdmin
        }
        this.props.updateUserName(user)
        this.setState({
            editName: false
        })
    }

    onClickEditUsername = () => {
        this.setState({
            editUsername: true
        })
    }

    onChangeSetUpdateUsername = (username) => {
        this.props.setUpdateUsername(username)
    }

    onClickUpdateUsername = () => {
        let user = {
            user: this.props.userUpdate,
            userIsAdmin: this.props.userIsAdmin
        }
        this.props.updateUserUsername(user)
        this.setState({
            editUsername: false
        })
    }

    onClickEditEmailId = () => {
        this.setState({
            editEmailId: true
        })
    }

    onChangeSetUpdateEmailId = (emailId) => {
        this.props.setUpdateEmailId(emailId)
    }

    onClickUpdateEmailId = () => {
        let user = {
            user: this.props.userUpdate,
            userIsAdmin: this.props.userIsAdmin
        }
        this.props.updateUserEmailId(user)
        this.setState({
            editEmailId: false
        })
    }

    onClickEditPassword = () => {
        this.setState({
            editPassword: true
        })
    }

    onChangeSetOldPassword = (oldPassword) => {
        this.props.setUpdateOldPassword(oldPassword)
    }

    onChangeSetNewPassword = (newPassword) => {
        this.props.setUpdateNewPassword(newPassword)
    }

    onChangeSetRepeatPassword = (repeatPassword) => {
        this.props.setUpdateRepeatPassword(repeatPassword)
    }

    onClickUpdatePassword = () => {
        let user = {
            user: this.props.userUpdate,
            userIsAdmin: this.props.userIsAdmin
        }
        this.props.updateUserPassword(user)
        this.setState({
            editPassword: false
        })
    }

    toggleShowPassword = () => {
        let showPassword = !this.state.showPassword;
        this.setState({
            showPassword: showPassword
        })
    }

    handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    render(){
        return(
            <Container className="user-profile mt-2">
            {this.props.loginStatus.userIsAdmin === false && this.props.loginStatus.loggedIn === true && <UserNavbar></UserNavbar>}
                <Row className="user-profile-heading m-3 w-75">
                    <Col><span>Welcome {this.props.user.username}! This is your profile page</span></Col>
                </Row>
                <div className="user-profile-info mt-3">
                    <Row className="align-items-center">
                        <Col sm={3}  className="m-1">
                            <FormGroup>
                                <Row>
                                    <Label for="user-first-name"><span>First Name</span></Label>
                                </Row>
                                <Row>
                                    { this.state.editName === false &&
                                        <span id="user-first-name">{this.props.userUpdate.firstName}</span>}
                                    { this.state.editName === true &&
                                        <Input onChange={(e)=>{this.onChangeSetFirstName(e.target.value)}} id="user-first-name" value={this.props.userUpdate.firstName}></Input>
                                    }
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col sm={3}  className="m-1">
                            <FormGroup>
                                <Row>
                                    <Label for="user-middle-name"><span>Middle Name</span></Label>
                                </Row>
                                <Row>
                                    { this.state.editName === false &&
                                        <span id="user-middle-name">{this.props.userUpdate.middleName}</span>}
                                    { this.state.editName === true &&
                                        <Input onChange={(e)=>{this.onChangeSetMiddleName(e.target.value)}} id="user-middle-name" value={this.props.userUpdate.middleName}></Input>
                                    }
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col sm={3}  className="m-1">
                            <FormGroup>
                                <Row>
                                    <Label for="user-last-name"><span>Last Name</span></Label>
                                </Row>
                                <Row>
                                    { this.state.editName === false &&
                                    <span id="user-last-name">{this.props.userUpdate.lastName}</span>}
                                    { this.state.editName === true &&
                                        <Input onChange={(e)=>{this.onChangeSetLastName(e.target.value)}} id="user-last-name" value={this.props.userUpdate.lastName}></Input>
                                    }
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col sm={2}>
                            <FormGroup>
                            { this.state.editName === false &&
                                <Tooltip title="Edit">
                                    <IconButton onClick={()=>{this.onClickEditName()}}>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                </Tooltip>}
                            { this.state.editName === true &&
                                <Tooltip title="Update">
                                    <IconButton onClick={()=>{this.onClickUpdateName()}}>
                                        <UpdateIcon></UpdateIcon>
                                    </IconButton>
                                </Tooltip>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup row className="justify-content-start align-items-center">
                        <Col sm={3} className="text-left"><span>Username</span></Col>
                        <Col sm={6}>{ this.state.editUsername === false &&
                            <span>{this.props.userUpdate.username}</span>}
                            { this.state.editUsername === true &&
                                <Input onChange={(e)=>{this.onChangeSetUpdateUsername(e.target.value)}} id="user-username" value={this.props.userUpdate.username}></Input>}
                        </Col>
                        <Col sm={3}>
                            { this.state.editUsername === false &&
                                <Tooltip title="Edit">
                                    <IconButton onClick={()=>{this.onClickEditUsername()}}>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                </Tooltip>}
                            { this.state.editUsername === true &&
                                <Tooltip title="Update">
                                    <IconButton onClick={()=>{this.onClickUpdateUsername()}}>
                                        <UpdateIcon></UpdateIcon>
                                    </IconButton>
                                </Tooltip>}
                        </Col>
                    </FormGroup>
                    <FormGroup row className="justify-content-start align-items-center">
                        <Col sm={3} className="text-left"><span>Email Id</span></Col>
                        <Col sm={6}>{ this.state.editEmailId === false &&
                            <span>{this.props.userUpdate.emailId}</span>}
                            { this.state.editEmailId === true && 
                                <Input onChange={(e)=>{this.onChangeSetUpdateEmailId(e.target.value)}} id="user-emailId" value={this.props.userUpdate.emailId}></Input>}
                                { this.props.errors.emailId.success === false &&<FormFeedback invalid>{this.props.errors.emailId.message}</FormFeedback>}
                                { this.props.errors.emailId.success === true &&<FormFeedback valid>{this.props.errors.emailId.message}</FormFeedback>}
                        </Col>
                        <Col sm={3}>
                            { this.state.editEmailId === false &&
                                <Tooltip title="Edit">
                                    <IconButton onClick={()=>{this.onClickEditEmailId()}}>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                </Tooltip>}
                            { this.state.editEmailId === true &&
                                <Tooltip title="Update">
                                    <IconButton onClick={()=>{this.onClickUpdateEmailId()}}>
                                        <UpdateIcon></UpdateIcon>
                                    </IconButton>
                                </Tooltip>}
                        </Col>
                    </FormGroup>
                    { this.state.editPassword === true &&
                        <FormGroup row className="align-items-center m-1">
                        <Col sm={3}><span>Old Password</span></Col>
                        <Col sm={6}>                            
                            <FormControl variant="outlined">
                            <InputLabel htmlFor="old-password">Old Password</InputLabel>
                            <OutlinedInput
                                id="old-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.props.userUpdate.oldPassword}
                                onChange={(e)=>{this.onChangeSetOldPassword(e.target.value)}}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>{this.toggleShowPassword()}}
                                    onMouseDown={(e)=>{this.handleMouseDownPassword(e)}}
                                    edge="end"
                                    >
                                    {this.state.showPassword ? <Tooltip title="Hide Password"><Visibility /></Tooltip> : <Tooltip title="Show Password"><VisibilityOff /></Tooltip>}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={70}
                            />
                            </FormControl>
                        </Col>
                    </FormGroup>
                    }
                    <FormGroup row className="align-items-center m-1">
                        <Col sm={3}>{this.state.editPassword === false &&<span>Password</span>}
                        {this.state.editPassword === true &&<span>New Password</span>}</Col>
                        <Col sm={6}>{ this.state.editPassword === false &&
                            <span>********</span>}
                            {
                                this.state.editPassword === true &&
                                <FormControl variant="outlined">
                                <InputLabel htmlFor="new-password">New Password</InputLabel>
                                <OutlinedInput
                                    id="new-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.props.userUpdate.newPassword}
                                    onChange={(e)=>{this.onChangeSetNewPassword(e.target.value)}}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>{this.toggleShowPassword()}}
                                        onMouseDown={(e)=>{this.handleMouseDownPassword(e)}}
                                        edge="end"
                                        >
                                        {this.state.showPassword ? <Tooltip title="Hide Password"><Visibility /></Tooltip> : <Tooltip title="Show Password"><VisibilityOff /></Tooltip>}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                                </FormControl>
                            }

                        </Col>
                        <Col sm={3}>
                            { this.state.editPassword === false &&
                                <Tooltip title="Edit">
                                    <IconButton onClick={()=>{this.onClickEditPassword()}}>
                                        <EditIcon></EditIcon>
                                    </IconButton>
                                </Tooltip>}
                        </Col>
                    </FormGroup>
                    { this.state.editPassword === true &&
                        <FormGroup row className="align-items-center m-1">
                        <Col sm={3}><span>Repeat Password</span></Col>
                        <Col sm={6}>                            
                            <FormControl variant="outlined">
                            <InputLabel htmlFor="repeat-password">Repeat Password</InputLabel>
                            <OutlinedInput
                                id="repeat-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.props.userUpdate.repeatPassword}
                                onChange={(e)=>{this.onChangeSetRepeatPassword(e.target.value)}}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>{this.toggleShowPassword()}}
                                    onMouseDown={(e)=>{this.handleMouseDownPassword(e)}}
                                    edge="end"
                                    >
                                    {this.state.showPassword ? <Tooltip title="Hide Password"><Visibility /></Tooltip> : <Tooltip title="Show Password"><VisibilityOff /></Tooltip>}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={70}
                            />
                            </FormControl>
                        </Col>
                        <Col sm={3}>
                            <Tooltip title="Update">
                                <IconButton onClick={()=>{this.onClickUpdatePassword()}}>
                                    <UpdateIcon></UpdateIcon>
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </FormGroup>
                    }
                </div>

            </Container>
        )
    }
}

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
    userUpdate: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired,
    userIsAdmin: PropTypes.bool.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    setUserUpdate: PropTypes.func.isRequired,
    setUpdateFirstName: PropTypes.func.isRequired,
    setUpdateMiddleName: PropTypes.func.isRequired,
    setUpdateLastName: PropTypes.func.isRequired,
    setUpdateUsername: PropTypes.func.isRequired,
    setUpdateEmailId: PropTypes.func.isRequired,
    setUpdateOldPassword: PropTypes.func.isRequired,
    setUpdateNewPassword: PropTypes.func.isRequired,
    setUpdateRepeatPassword: PropTypes.func.isRequired,
    updateUserName: PropTypes.func.isRequired,
    updateUserUsername: PropTypes.func.isRequired,
    updateUserEmailId: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    isUserLoggedIn: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        userUpdate: state.users.userUpdate,
        userIsAdmin: state.users.loginStatus.userIsAdmin,
        errors: state.users.errors,
        loginStatus: state.users.loginStatus
    }
}

export default connect(mapStateToProps, { 
    isUserLoggedIn,
    getUserInfo,
    setUserUpdate,
    setUpdateFirstName,
    setUpdateMiddleName,
    setUpdateLastName,
    setUpdateUsername,
    setUpdateEmailId,
    setUpdateOldPassword,
    setUpdateNewPassword,
    setUpdateRepeatPassword,
    updateUserName,
    updateUserUsername,
    updateUserEmailId,
    updateUserPassword })(UserProfile);