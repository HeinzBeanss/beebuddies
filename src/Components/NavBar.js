import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import typeface from "../Assets/trimmed2.png";
import defaultpfp from "../Assets/default_bee_profile.jpg";

const NavBar = ({ guestMode, userData }) => {

    if (!userData) {
        return (
            <div className='navbar-loading'>Loading...</div>
        )
    }

    return(
        <div className="navigation-component">


            <div className="navigation-content">
                <div className="nav-left-side">
                <Link to={"/"}><img className="nav-logo" src={typeface}></img></Link>
                </div>
                <div className="nav-right-side">
                    {guestMode ? <img className="user-profilepicture-medium" src={defaultpfp} alt="Image"></img> : <Link className="user-profilepicture-medium" to={`/user/${userData.updatedUser._id}`}><img className="user-profilepicture-medium" src={`data:${userData.updatedUser.profile_picture.contentType};base64,${userData.updatedUser.profile_picture.data}`} alt="Image" /></Link>}

                    {guestMode ? <h4 className="navbar-name">{userData.updatedUser.first_name} {userData.updatedUser.last_name}</h4> : <Link to={`/user/${userData.updatedUser._id}`}><h4 className="navbar-name">{userData.updatedUser.first_name} {userData.updatedUser.last_name}</h4></Link>}
                </div>

            </div>
        </div>
    )

}

export default NavBar;