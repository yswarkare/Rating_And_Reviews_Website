import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Tooltip, IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


class PasswordInput extends Component {

    state = {
        showPassword: false,
        password: this.props.password,
        error: true,
        errorMessage: "Enter Password"
    }

    handlePasswordChange = (password) => {
        this.setState({
            password: password
        }, this.props.handlePasswordChange(this.state.password))
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

    render() {
        return (
            <div>
                <FormControl variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={(e)=>{this.handlePasswordChange(e.target.value)}}
                    helperText={this.state.errorMessage}
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
            </div>
        );
    }
}


// PasswordInput.propTypes = {

// };


export default PasswordInput;
