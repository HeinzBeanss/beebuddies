import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ userData }) => {

    if (!userData) {
        return (
            <div className='navbar-loading'>Loading...</div>
        )
    }

    return(
        <div className="navigation-component">


            <div className="navigation-content">
                <div className="nav-left-side">
                <Link to={"/"}><div>logo</div></Link>
                <Link to={"/"}><div>BeeBuddies</div></Link>
                </div>
                <div className="nav-right-side">
                    <img className="user-profilepicture-medium" src={`data:${userData.updatedUser.profile_picture.contentType};base64,${userData.updatedUser.profile_picture.data}`} alt="Image" />
                    <h4 className="navbar-name">{userData.updatedUser.first_name} {userData.updatedUser.last_name}</h4>
                </div>

            </div>
        </div>
    )

}

export default NavBar;