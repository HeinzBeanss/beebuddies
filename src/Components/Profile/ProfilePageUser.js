import '../Home/Home.css';
import { Link } from "react-router-dom";
import React from "react";

const ProfilePageUser = ({profileUser}) => {
    
    if (profileUser == null) {
        return (
        <div className='profile-user-section'>
            <div className='profile-section-image'></div>
            <h4 className='profile-section-name'>Not Signed In</h4>
        </div>            
        )
    }

    if (profileUser) {
        return (
            <div className='profile-user-section'>
                <img className="small-user-profilepicture" src={`data:${profileUser.profile_picture.contentType};base64,${profileUser.profile_picture.data}`} alt="Image" />
                <h4 className='profile-section-name'>{profileUser.first_name} {profileUser.last_name}</h4>
            </div>
        )
    }

}

export default ProfilePageUser;