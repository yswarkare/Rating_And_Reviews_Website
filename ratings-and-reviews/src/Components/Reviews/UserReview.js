import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { getProductReviews } from "../../Redux/Actions/reviewsActions";
import { getUserReview,
    editUserReview,
    setUserReview,
    postUserReview,
    updateUserReview,
    deleteUserReview } from "../../Redux/Actions/reviewsActions";


class UserReview extends Component {

    componentDidMount = () => {
        let review = {
            product: this.props.product._id,
            user: this.props.user._id
        }
        this.props.getUserReview(review)
    }

    onClickEditUserReview = () => {
        this.props.editUserReview()
    }

    onChangeSetUserReview = (userReview) => {
        let review = {
            review: userReview,
            product: this.props.product._id,
            user: this.props.user._id
        }
        this.props.setUserReview(review);
    }

    onClickUpdateUserReview = async () => {
        let review = this.props.review
        await this.props.updateUserReview(review);
        let product = {
            product: this.props.product._id
        }
        await this.props.getProductReviews(product)
    }

    onClickPostUserReview = async () => {
        let review = this.props.review
        await this.props.postUserReview(review);
        let product = {
            product: this.props.product._id
        }
        await this.props.getProductReviews(product)
    }

    onClickDeleteUserReview = async () => {
        let review = this.props.review
        await this.props.deleteUserReview(review);
        let product = {
            product: this.props.product._id
        }
        await this.props.getProductReviews(product)
    }

    render() {
        return (
            <div className="user-review-component">
                <div className="user-review">
                    <div className="review-header"></div>
                    <div className="review-box">
                        { 
                            this.props.reviews.reviewExists === true && this.props.reviews.editReview === false &&
                            <div className="show-user-review">
                                <div className="user-review-buttons">
                                    <div>{this.props.review.user.username}</div>
                                    <div><Button onClick={()=>{this.onClickEditUserReview()}} variant="contained" color="primary">Edit</Button></div>
                                    <div><Button onClick={()=>{this.onClickDeleteUserReview()}} variant="contained" color="primary">Delete</Button></div>
                                    <div>{this.props.review.createdAt.toLocaleString()}</div>
                                </div>
                                <div><p>{this.props.review.review}</p></div>
                            </div>
                        }
                        {   
                            this.props.reviews.reviewExists === true && this.props.reviews.editReview === true &&
                            <div className="update-review">
                                <div >
                                    <TextareaAutosize onChange={(e)=>{this.onChangeSetUserReview(e.target.value)}} className="review-text-box" value={this.props.review.review} aria-label="minimum height" rowsMin={3} placeholder="Update Review" />
                                </div>
                                <div className="update-review-button">
                                    <Button onClick={()=>{this.onClickUpdateUserReview()}} variant="contained" color="primary">Update</Button>
                                </div>
                            </div>
                        }
                        { 
                            this.props.reviews.reviewExists === false &&
                            <div className="write-review">
                                <div>
                                    <TextareaAutosize onChange={(e)=>{this.onChangeSetUserReview(e.target.value)}} className="review-text-box" value={this.props.review.review} aria-label="minimum height" rowsMin={3} placeholder="Write Review" />
                                </div>
                                <div className="post-review-button">
                                    <Button onClick={()=>{this.onClickPostUserReview()}} variant="contained" color="primary">Post</Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


UserReview.propTypes = {
    reviews: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getProductReviews: PropTypes.func.isRequired,
    getUserReview: PropTypes.func.isRequired,
    editUserReview: PropTypes.func.isRequired,
    setUserReview: PropTypes.func.isRequired,
    postUserReview: PropTypes.func.isRequired,
    updateUserReview: PropTypes.func.isRequired,
    deleteUserReview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews,
        review: state.reviews.review,
        product: state.products.product,
        user: state.users.user,
    }
}

export default connect(mapStateToProps, { 
    getProductReviews,
    getUserReview,
    editUserReview,
    setUserReview,
    postUserReview,
    updateUserReview,
    deleteUserReview })(UserReview);