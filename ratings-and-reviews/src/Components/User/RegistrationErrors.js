import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class RegistrationErrors extends Component {
    render() {
        return (
            <div>
            {
                this.props.errors.registration.success === true &&
                <p>{this.props.errors.registration.message}</p>
            }
            {
                this.props.errors.registration.success === false &&
                <p>{this.props.errors.registration.message}</p>
            }
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