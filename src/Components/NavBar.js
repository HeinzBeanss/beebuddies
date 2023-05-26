import './Nav.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ userData }) => {

    if (userData == null) {
    return (
        <div>Loading...</div>
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
                        <div className="nav-search">
                            search
                        </div>
                        <div className="create">create</div>
                        {/* <img src={`data:${props.userData.updatedUser.profile_picture.conentType};base64,${props.userData.updatedUser.profile_picture.data}`} alt="Image" /> */}
                    </div>
    
                </div>
            </div>
        )
    
}

export default NavBar;