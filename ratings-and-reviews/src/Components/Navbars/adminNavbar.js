import React, { Component } from "react";
import { Nav, NavItem } from 'reactstrap';
import { Link } from "react-router-dom";


class AdminNavbar extends Component {
    render(){
        return(
            <div>
                <Nav className="admin-navbar">
                    <NavItem>
                        <Link to="/admin-dashboard">Dashboard</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/all-categories">Categories</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/add-products">Products</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/user-profile">Profile</Link>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default AdminNavbar;