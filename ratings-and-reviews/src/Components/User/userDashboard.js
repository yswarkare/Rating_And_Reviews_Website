import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserInfo } from "../../Redux/Actions/userProfileActions";
import UserNavbar from "../Navbars/userNavbar";

class UserDashboard extends Component {

    componentDidMount = () => {
        this.props.getUserInfo()
    }

    render(){
        return(
            <div className="user-dashboard-container">
                {this.props.loginStatus.userIsAdmin === false && this.props.loginStatus.loggedIn === true && <UserNavbar></UserNavbar>}
                <div className="user-dashboard">
                    This Is User Dashboard
                </div>
            </div>
        )
    }
}

UserDashboard.propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    loginStatus: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.users.loginStatus
    }
}

export default connect(mapStateToProps, { getUserInfo })(UserDashboard);