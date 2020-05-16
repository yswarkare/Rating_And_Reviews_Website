import React, { Component } from "react";
import { Link } from "react-router-dom"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import withProductWrapper from "./withProductWrapper";


class Product extends Component {


    render () {
        return (
            <Link to={`/product-page/${this.props.product._id}`}>
            <Card className="product-container">

               <CardImg top width="100%" src={this.props.product.image} alt="loading image.." />
                <CardBody>
                <CardTitle>{this.props.product.brandName}</CardTitle>
                <CardSubtitle>{this.props.product.productName}</CardSubtitle>
                <CardText></CardText>
                {/* Remove this button not needed */}
               {/*  <Button>Button</Button> */}
                </CardBody>
            </Card>
            </Link>
        )
    }
}


const WrappedProduct = withProductWrapper(Product);

export default WrappedProduct;