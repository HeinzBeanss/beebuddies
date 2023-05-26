import '../Home/Home.css';
import { Link } from "react-router-dom";
import React from "react";

const UserPageUser = ({targetUser}) => {
    
    if (targetUser == null) {
        return (
        <div className='home-user-section'>
            <div className='user-section-image'></div>
            <h4 className='user-section-name'>Not Signed In</h4>
        </div>            
        )
    }

    if (targetUser) {
        return (
            <div className='home-user-section'>
                <img className="small-user-profilepicture" src={`data:${targetUser.profile_picture.contentType};base64,${targetUser.profile_picture.data}`} alt="Image" />
                <h4 className='user-section-name'>{targetUser.first_name} {targetUser.last_name}</h4>
            </div>
        )
    }

}

export default UserPageUser;