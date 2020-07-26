import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class LoginErrors extends Component {
    
    render() {
        return (
            <div className="login-errors">
                {
                    this.props.errors.login.success === false && 
                    <p>{this.props.errors.login.message}</p>
                }
            </div>
        );
    }
}

LoginErrors.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users,
        user: state.users.user,
        errors: state.users.errors,
    }
}

export default connect(mapStateToProps, {})(LoginErrors)