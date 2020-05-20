import React, { Component } from "react";

class SearchBox extends Component {
    render(){
        return(
            <div className="admin-dashboard">
                <div>
                    <div className="input-group mx-auto">
                        <input type="text" className="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <div className="input-group-append">
                        <button className="btn btn-outline-success" type="button" id="button-addon2">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBox;