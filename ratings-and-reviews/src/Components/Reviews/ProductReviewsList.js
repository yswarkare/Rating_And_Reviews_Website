import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getProductReviews } from "../../Redux/Actions/reviewsActions";
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import Tooltip from '@material-ui/core/Tooltip';
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// import ThumbDownIcon from '@material-ui/icons/ThumbDown';

class ProductReviewsList extends Component {

    state = {
        toggleChoice: null
    }

    componentDidMount = () => {
        let product = {
            product: this.props.product._id
        }
        this.props.getProductReviews(product)
    }

    toggleLikeDislike = (choice) => {
        this.setState({
            toggleChoice: choice
        }, console.log(this.state.toggleChoice))
    }

    render() {
        return (
            <div className="product-reviews-list">
                {
                    this.props.reviews.map((review, index) => {
                        return (
                            <div className="product-review" key={index}>
                                <div className="product-review-header">
                                    <div className="product-review-username"><span>{review.user.username}</span></div>
                                    <div className="product-review-likes">
                                        <span>{review.createdAt}</span>
                                    </div>
                                    <div className="product-review-dislikes">
                                        <span>{review.updatedAt}</span>
                                    </div>
                                    <div className="product-review-date"><span>{review.date}</span></div>
                                </div>
                                <div className="product-review-body">
                                    <p>{review.review}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}


ProductReviewsList.propTypes = {
    reviews: PropTypes.array.isRequired,
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getProductReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        product: state.products.product,
        reviews: state.reviews.productReviews,
        user: state.users.user
    }
}

export default connect(mapStateToProps, { getProductReviews })(ProductReviewsList);

// <ToggleButtonGroup
//     value={this.state.toggleChoice}
//     exclusive
//     onChange={(e)=>{this.toggleLikeDislike(e.target.value)}}
//     aria-label="text alignment">
//     <Tooltip title="Like">
//         <ToggleButton value="like">
//             <ThumbUpIcon></ThumbUpIcon>
//         </ToggleButton>
//     </Tooltip>
//     <Tooltip title="Dislike">
//         <ToggleButton value="dislike">
//             <ThumbDownIcon></ThumbDownIcon>
//         </ToggleButton>
//     </Tooltip>
// </ToggleButtonGroup>