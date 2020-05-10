import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { getAdminInfo } from "../../Redux/Actions/adminActions";

class AdminProfile extends Component {
    
    componentDidMount = () => {
        this.props.getAdminInfo()
    }

    render(){   
        return(
            <div className="admin-profile">
                <Container>
                    <Row>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

AdminProfile.propTypes = {
    getAdminInfo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        loginStatus: state.users.loginStatus,
    }
}

export default connect(mapStateToProps, { getAdminInfo })(AdminProfile);