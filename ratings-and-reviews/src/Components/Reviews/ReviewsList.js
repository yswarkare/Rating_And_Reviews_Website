import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';


class ReviewsList extends Component {
    render() {
        return (
            <div className="reviews-list-component">
                
            </div>
        );
    }
}


ReviewsList.propTypes = {
    reviews: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        product: state.products.product,
        reviews: state.products.product.reviews,
    }
}

export default connect(mapStateToProps, {})(ReviewsList);