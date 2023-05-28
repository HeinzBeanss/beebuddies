import '../Home/Home.css';
import { Link } from "react-router-dom";
import React from "react";
import { DateTime } from 'luxon';


const ProfilePageUser = ({profileUser}) => {
    
    const formatTimestamp = (timestamp) => {
        const formattedTime = DateTime.fromISO(timestamp).toFormat("MMMM d yyyy");
        return formattedTime;
    }
    
    if (profileUser == null) {
        return (
        <div className='home-user-section'>
            <div className='user-section-image'></div>
            <h4 className='user-section-name'>Not Signed In</h4>
        </div>            
        )
    }

    if (profileUser) {
        return (
            <div className='user-user-section'>
                <div className="user-section-top">
                    <img className="user-profilepicture-large" src={`data:${profileUser.profile_picture.contentType};base64,${profileUser.profile_picture.data}`} alt="Image" />
                    <div className="user-section-info">
                        <h4 className='userpage-user-section-name'>{profileUser.first_name} {profileUser.last_name}</h4>
                        <p className='user-section-info-item'>Born: {formatTimestamp(profileUser.birthdate)}</p>
                        <p className='user-section-info-item'>Joined: {formatTimestamp(profileUser.date_created)}</p>
                    </div>
                </div>
                <p className='user-section-info-bio'>{profileUser.bio}</p>
            </div>
        )
    }

}

export default ProfilePageUser;