import React, { Component } from "react";


const withProductWrapper = WrappedProduct => {

    class withProductWrapper extends Component {

        

        render () {
            return (
                <div className="products-wrapper">
                    {this.props.products.map((product, index)=>{
                        return(
                            
                            <WrappedProduct product={product} key={index}></WrappedProduct>
                            
                        )
                    })}
                </div>
            )
        }
    }

    return withProductWrapper;

}

export default withProductWrapper;