import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getAllCategories } from "../../Redux/Actions/categoriesActions";
import { getAllSubCategories } from "../../Redux/Actions/subCategoriesActions";
import { getAllSubSubCategories } from "../../Redux/Actions/subSubCategoriesActions";
import Category from "./Category";
import SubCategory from "./SubCategory";
import SubSubCategory from "./SubSubCategory";


class AllCategories extends Component {

    state = {
        showTab: "categories",
        class1: "list-group-item list-group-item-action",
        class2: "list-group-item list-group-item-action",
        class3: "list-group-item list-group-item-action",
    }

    switchTab = (tab) => {
        let active = "list-group-item list-group-item-action active";
        let inactive = "list-group-item list-group-item-action";
        if (tab === 1){
            this.setState({
                showTab: "categories",
                class1: active,
                class2: inactive,
                class3: inactive
            }, console.log(this.state.showTab))
        } else if (tab === 2) {
            this.setState({
                showTab: "sub-categories",
                class1: inactive,
                class2: active,
                class3: inactive
            }, console.log(this.state.showTab))
        } else if (tab === 3){
            this.setState({
                showTab: "sub-sub-categories",
                class1: inactive,
                class2: inactive,
                class3: active
            }, console.log(this.state.showTab))
        }
    }

    componentDidMount = () => {
        let admin = {
            emailId: this.props.loginStatus.emailId,
            headers: this.props.headers
        }
        this.props.getAllCategories(admin);
        this.props.getAllSubCategories(admin);
        this.props.getAllSubSubCategories(admin)
    }

    render() {
        // console.log("Props in add categories => " + JSON.stringify(this.props) )
        return (
            <div className="add-categories-container">
                <div className="categories-tab-panel">
                    <ul className="categories-tab-panel-list list-group-horizontal">
                        <li onClick={()=>{this.switchTab(1)}} className="list-group-item list-group-item-action" key="1">Categories</li>
                        <li onClick={()=>{this.switchTab(2)}} className="list-group-item list-group-item-action" key="2">Sub-Categories</li>
                        <li onClick={()=>{this.switchTab(3)}} className="list-group-item list-group-item-action" key="3">Sub-Sub-Categories</li>
                    </ul>
                </div>
                <div className="categories-list-component" >
                    {
                        this.state.showTab === "categories" && 
                        <Category></Category>
                    }
                    {
                        this.state.showTab === "sub-categories" &&
                        <SubCategory></SubCategory>
                    }
                    {
                        this.state.showTab === "sub-sub-categories" &&
                        <SubSubCategory></SubSubCategory>
                    }
                </div>
            </div>
        )
    }
}

AllCategories.propTypes = {
    loginStatus: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    subCategories: PropTypes.object.isRequired,
    subSubCategories: PropTypes.object.isRequired,
    headers: PropTypes.object.isRequired,
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
        headers: state.users.headers
    };
}

export default connect(mapStateToProps,{ 
    getAllCategories,
    getAllSubCategories,
    getAllSubSubCategories })(AllCategories);