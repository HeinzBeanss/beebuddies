import '../Styles/Nav.css';
import React, { useState, useEffect } from "react";
import { Buffer } from 'buffer';


const NavBar = (props) => {

    // if (!props.userData || !props.userData.updatedUser || !props.userData.updatedUser.profile_picture) {
    //     return null; // Or render a loading indicator
    //   }
    
    return(
        <div className="navigation-component">
            <div className="navigation-content">
                <div className="nav-left-side">
                    <div>logo</div>
                    <div>title</div>
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