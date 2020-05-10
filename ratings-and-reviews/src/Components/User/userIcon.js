import React, { Component } from "react";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

class UserIcon extends Component {

    state = {
        openMenu : false,
        loggedIn : false
    }
    
    toggleMenu = () => {
        let value = true
        if (this.state.openMenu === true){
            value = false
        }
        this.setState({
            openMenu: value
        })
    }

    handleMenu = () => {
        this.toggleMenu()
    }

    render(){
        return(
            <div className="user-icon">
                
                <Tooltip title="username" area-label="username">
                    <IconButton className="user-icon-button" aria-label="User" onClick={()=>{this.handleMenu()}}>
                        <AccountBoxIcon aria-label="User" ></AccountBoxIcon>
                    </IconButton>
                </Tooltip>
                { this.state.openMenu === true && this.state.loggedIn === false &&
                    <div>
                        <Link to="/user-login" ><span>Login </span></Link>
                        <span>or </span>
                        <Link to="/user-registration" ><span>Register</span></Link>
                    </div>
                }
                { this.state.openMenu === true && this.state.loggedIn === true &&
                    <div>
                        <Link to="/user-dashboard" ><span>Dashboard </span></Link>
                        <Link to="/user-profile" ><span>Profile</span></Link>
                    </div>
                }
            </div>
        )
    }
}

export default UserIcon;