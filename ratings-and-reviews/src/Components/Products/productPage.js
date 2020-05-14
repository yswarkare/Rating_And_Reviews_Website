import React, { Component } from "react";
// import PropTypes from "prop-types";
import withProductPageHOC from "./withProductPageHOC";
import GiveRating from "../Ratings/GiveRating";
import ShowRating from "../Ratings/ShowRating";
import UserReview from "../Reviews/UserReview";
import ProductReviewsList from "../Reviews/ProductReviewsList";

class ProductPage extends Component {

    componentDidMount = () => {
        // this.props.getAllProducts()
    }

    render () {
        
        return (
            <div className="product-page-container">
                <div className="product-container">
                    <div className="product-image-container">
                        <img href={this.props.product.image} alt={this.props.product.productName}></img>
                    </div>
                    <div className="product-info">
                        <div className="product-name"><span>{this.props.product.productName}</span></div>
                            <div className="product-brand-name"><span>{this.props.product.brandName}</span></div>
                            <div className="product-categories">
                                <div className="product-category"><span>{this.props.product.category.categoryName}</span></div>
                                <div className="product-sub-category"><span>{this.props.product.subCategory.subCategoryName}</span></div>
                                <div className="product-sub-sub-category"><span>{this.props.product.subSubCategory.subSubCategoryName}</span></div>
                            </div>
                        <div className="product-description"><span>{this.props.product.description}</span></div>
                    </div>
                </div>

                <div className="product-ratings-and-reviews">
                    <div className="rating-container">
                        <div className="product-raging">
                            <ShowRating product={this.props.product} ></ShowRating>
                        </div>
                        <div className="give-rating">
                            { this.props.loginStatus.loggedIn === true && <GiveRating></GiveRating>}
                        </div>
                    </div>
                    <div className="product-reviews">
                        <div className="write-product-review">
                            {
                                this.props.loginStatus.loggedIn === true &&
                                <UserReview></UserReview>
                            }
                        </div>
                        <div className="product-reviews-list">
                            <ProductReviewsList></ProductReviewsList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProductPage.propTypes = {
    
}

const WrappedProductPage = withProductPageHOC(ProductPage);

export default WrappedProductPage;