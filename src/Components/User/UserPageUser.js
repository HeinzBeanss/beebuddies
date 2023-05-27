import '../Home/Home.css';
import { Link } from "react-router-dom";
import React from "react";
import { DateTime } from 'luxon';

const UserPageUser = ({targetUser}) => {

    const formatTimestamp = (timestamp) => {
        console.log(targetUser);
        const formattedTime = DateTime.fromISO(timestamp).toFormat("MMMM d yyyy");
        return formattedTime;
    }
    
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
            <div className='user-user-section'>
                <div className="user-section-top">
                    <img className="user-profilepicture-large" src={`data:${targetUser.profile_picture.contentType};base64,${targetUser.profile_picture.data}`} alt="Image" />
                    <div class="user-section-info">
                        <h4 className='userpage-user-section-name'>{targetUser.first_name} {targetUser.last_name}</h4>
                        <p className='user-section-info-item'>Born: {formatTimestamp(targetUser.birthdate)}</p>
                        <p className='user-section-info-item'>Joined: {formatTimestamp(targetUser.date_created)}</p>
                    </div>
                </div>
                <p className='user-section-info-bio'>{targetUser.bio}</p>
            </div>
        )
    }

}

export default UserPageUser;