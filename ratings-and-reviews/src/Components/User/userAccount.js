import React, { Component } from "react";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import UserNavbar from "../Navbars/userNavbar";



class UserAccount extends Component {

    render () {
        return (
            <div className="user-account">
            {this.props.loginStatus.userIsAdmin === false && this.props.loginStatus.loggedIn === true && <UserNavbar></UserNavbar>}
            </div>
        )
    }

}

UserAccount.propTypes = {
    loginStatus: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.users.loginStatus
    }
}

export default connect(mapStateToProps, {})(UserAccount);