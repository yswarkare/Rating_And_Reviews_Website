import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class RegistrationErrors extends Component {
    render() {
        return (
            <div className="registration-errors pt-4">
            {
                this.props.errors.registration.success === true &&
                <p>{this.props.errors.registration.message}</p>
            }
            {
                this.props.errors.password.success === false &&
                <p>{this.props.errors.password.message}</p>
            }
            {
                this.props.errors.registration.success === false &&
                <p>{this.props.errors.registration.message}</p>
            }
            <ul className="password-errors">
            {
                this.props.errors.registration.success === false && this.props.errors.registration.error === "password" && this.props.errors.registration.errors.map((error, index) => {
                    return (
                        <li key={index}><span>{error}</span></li>
                    )
                })
            }
            </ul>
            </div>
        );
    }
}

RegistrationErrors.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        users: state.users,
        loginStatus: state.users.loginStatus,
        errors: state.users.errors
    }
}

export default connect(mapStateToProps, {})(RegistrationErrors);