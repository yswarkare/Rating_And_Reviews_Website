import React, { Component } from "react";
import Products from "./Products/products"

class HomePage extends Component {
    render(){
        return(
            <div className="home-page">
                <div className="product-list-container">
                    <Products></Products>
                </div>
            </div>
        )
    }
}

export default HomePage;