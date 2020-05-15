import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAdminInfo } from "../../Redux/Actions/adminActions";

class AdminDashboard extends Component {

    componentDidMount = () => {
        this.props.getAdminInfo()
    }
    
    render(){
        return(
            <div className="admin-dashboard">
                This Is Admin Dashboard
            </div>
        )
    }
}

AdminDashboard.propTypes = {
    getAdminInfo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        errors: state.users.inputErrors,
        loginStatus: state.users.loginStatus,
        categories: state.categories,
        subCategories: state.subCategories,
        subSubCategories: state.subSubCategories,
        products: state.products
    };
}

  export default connect(mapStateToProps, { getAdminInfo })(AdminDashboard);