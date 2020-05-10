import React, { Component } from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

class UserNavbar extends Component {
    render(){
        return(
            <div>
                <Nav className="user-navbar">
                    <NavItem>
                        <Link to="/user-dashboard">Dashboard</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/user-profile">Profile</Link>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default UserNavbar;