import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Navbars/header";
import HomePage from "./homePage";
import UserLogin from "./User/userLogin";
import UserRegistration from "./User/userRegistration"
import AdminDashboard from "./Admin/adminDashboard";
import AdminProfile from "./Admin/adminProfile";
import Products from "./Products/products";
import UserAccount from "./User/userAccount";
import AllCategories from "./Categories/AllCategories";
import AddProducts from "./Products/addProducts";
import UserDashboard from "./User/userDashboard";
import UserProfile from "./User/userProfile";
import WrappedProductPage from "./Products/productPage";

class Wrapper extends Component {

    render(){
        return(
            <Router>
                <div className="wrapper">
                    <Header></Header>
                    <Switch>
                        <Route exact path="/"><HomePage></HomePage></Route>
                        <Route exact path="/products"><Products></Products></Route>
                        <Route exact path="/admin-profile"><AdminProfile></AdminProfile></Route>
                        <Route exact path="/admin-dashboard"><AdminDashboard></AdminDashboard></Route>
                        <Route exact path="/user-login"><UserLogin></UserLogin></Route>
                        <Route exact path="/user-registration"><UserRegistration></UserRegistration></Route>
                        <Route exact path="/user-account"><UserAccount></UserAccount></Route>
                        <Route exact path="/all-categories"><AllCategories></AllCategories></Route>
                        <Route exact path="/add-products"><AddProducts></AddProducts></Route>
                        <Route exact path="/user-profile"><UserProfile></UserProfile></Route>
                        <Route exact path="/user-dashboard"><UserDashboard></UserDashboard></Route>
                        <Route exact path="/product-page/:id" component={WrappedProductPage}></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Wrapper;