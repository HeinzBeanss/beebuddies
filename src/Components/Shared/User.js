import '../../Styles/Home.css';
import { Link } from "react-router-dom";
import React from "react";

const HomeUser = ({loading, userData}) => {
    console.log("below")
    console.log(userData);

    if (userData == null) {
        return (
        <div className='home-user-section'>
            <div className='user-section-image'></div>
            <h4 className='user-section-name'>Not Signed In</h4>
        </div>            
        )
    }

    if (userData) {
        return (
            <div className='home-user-section'>
                <div className='user-section-image'></div>
                <h4 className='user-section-name'>{userData.updatedUser.first_name} {userData.updatedUser.last_name}</h4>
            </div>
        )
    }

}

export default HomeUser;
