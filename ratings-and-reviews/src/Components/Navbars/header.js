import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SearchBox from "../searchBox";
import { Navbar, Nav, NavItem } from "reactstrap";
import AdminNavbar from "./adminNavbar";
import { isUserLoggedIn, setUserLogout } from "../../Redux/Actions/userActions";
import { setUserUpdate, getUserInfo } from "../../Redux/Actions/userProfileActions";
import { getAllProducts } from "../../Redux/Actions/productActions";
import { getAllCategories } from "../../Redux/Actions/categoriesActions";
import { getAllSubCategories } from "../../Redux/Actions/subCategoriesActions";
import { getAllSubSubCategories } from "../../Redux/Actions/subSubCategoriesActions";


class Header extends Component {

    componentDidMount = () => {
        let user = {
            user: this.props.user,
            userIsAdmin: this.props.loginStatus.userIsAdmin,
        }
        let admin = {
            emailId: this.props.loginStatus.emailId,
            headers: this.props.headers
        }
        this.props.getAllCategories(admin);
        this.props.getAllSubCategories(admin);
        this.props.getAllSubSubCategories(admin);
        this.props.getAllProducts()
        this.props.isUserLoggedIn();
        if (this.props.loginStatus.loggedIn === true){
            this.props.setTokenInUser(user)
        }
    }

    onClickSetUserLogout = () => {
        let user = {
            user: this.props.user,
            userIsAdmin: this.props.loginStatus.userIsAdmin,
            headers: this.props.headers
        }
        this.props.setUserLogout(user)
    }

    render(){
        // console.log("Props in header =>" + JSON.stringify(this.props))
        return(
            <div className="header">
                <Link to="/"><h1>Ratekaro</h1></Link>
                <Navbar>
                    <Nav>
                    <div className="header-navbar">
                    <div className="header-Home">
                        <NavItem>
                            <Link to="/">Home</Link>
                        </NavItem>
                    </div>
                    <div>
                        <NavItem>
                            <Link to="/search-box">
                                <SearchBox></SearchBox>
                            </Link>
                        </NavItem>
                    </div>
                    <div className="user-login-logout">
                        {this.props.loginStatus.loggedIn === false && 
                            <div className="login-link">
                            <NavItem>
                            <Link to="/user-login">Login</Link>
                            </NavItem>
                            </div>}
                        {this.props.loginStatus.loggedIn === false && 
                            <div className="register-link">
                            <NavItem>
                            <Link to="/user-registration">Register</Link>
                            </NavItem>
                            </div>}
                        {this.props.loginStatus.loggedIn === true && 
                            <div className="user-account-link">
                            <NavItem>
                            <Link to="/user-account">{this.props.user.username}</Link>
                            </NavItem>
                            </div>}
                        {this.props.loginStatus.loggedIn === true && 
                            <div className="logout-link">
                            <NavItem>
                            <Link onClick={()=>{this.onClickSetUserLogout()}} to="/">Logout</Link>
                            </NavItem>
                            </div>}
                    </div>
                    </div>
                    </Nav>
                </Navbar>
                
                {this.props.loginStatus.userIsAdmin === true && <AdminNavbar></AdminNavbar>}
            </div>
        )
    }
}

Header.propTypes = {
    loginStatus: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    subCategories: PropTypes.object.isRequired,
    headers: PropTypes.object.isRequired,
    subSubCategories: PropTypes.object.isRequired,
    isUserLoggedIn: PropTypes.func.isRequired,
    setUserLogout: PropTypes.func.isRequired,
    setUserUpdate: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    getAllProducts: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    getAllSubCategories: PropTypes.func.isRequired,
    getAllSubSubCategories: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        errors: state.users.errors,
        loginStatus: state.users.loginStatus,
        categories: state.categories,
        subCategories: state.subCategories,
        subSubCategories: state.subSubCategories,
        headers: state.users.headers,
    };
}

export default connect(mapStateToProps,{ isUserLoggedIn,
    setUserLogout,
    setUserUpdate,
    getUserInfo,
    getAllProducts,
    getAllCategories,
    getAllSubCategories,
    getAllSubSubCategories })(Header);