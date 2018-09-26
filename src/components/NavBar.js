import React, { Component } from 'react';

class NavBar extends Component {

    render() {
        return(
            <div>
                <nav className="navbar navbar-light bg-light">
                    <form className="form-inline">
                        <button className="btn btn-outline-success" type="button">All Documents</button>
                    </form>
                </nav>
            </div>
        )};
}
export default NavBar;
