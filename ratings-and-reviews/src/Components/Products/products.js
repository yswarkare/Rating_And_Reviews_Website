import React, { Component } from "react";
import { connect } from "react-redux";
import WrappedProduct from "./WrappedProduct";


class Products extends Component {

    render () {
        return (
            <div className="products-container">
                <WrappedProduct products={this.props.products}></WrappedProduct>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        errors: state.users.inputErrors,
        loginStatus: state.users.loginStatus.registrationRedirect,
        products: state.products.products,
        categories: state.categories,
        subCategories: state.subCategories,
        subSubCategories: state.subSubCategories
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        dispatch: dispatch
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Products);