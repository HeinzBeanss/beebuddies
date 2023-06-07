import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import whitemode from "../Assets/a4.png";

const NavBar = ({ guestMode, userData }) => {

    if (!userData) {
        return (
            <div className='navbar-loading'>Loading...</div>
        )
    }

    return(
        <div className="navigation-component">
            <div className="navigation-content">
                <Link to={"/"}><img className="nav-logo" src={whitemode}></img></Link>
            </div>
        </div>
    )

}

export default NavBar;