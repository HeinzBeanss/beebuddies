import '../../Styles/UserIndexPage.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings"
import UserIndexUserList from "../UserList/UserList";

const UserIndexPage = ({ loading, userData, setIsLoggedIn }) => {
    // console.log(setIsLoggedIn);
    // console.log("ABOVE THIS IS THE SETILOGGEDIN PROPS")
    return (
        <div className="userindex-component">
            <div className="userindex-section-one">
                <SharedUser loading={loading} userData={userData} />
                <SharedNavigation />
                <SharedSettings setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='userindex-section-two'>
                <UserIndexUserList loading={loading} userData={userData}/>
            </div>
            
        </div>
    )
}

export default UserIndexPage;