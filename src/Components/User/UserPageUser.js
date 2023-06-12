import React from "react";
import { DateTime } from 'luxon';

const UserPageUser = ({guestMode, setRefreshData, userData, targetUser, setRefreshMainUserData}) => {

    const formatTimestamp = (timestamp) => {
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

    const sendFriendRequest = async (e) => {
        e.preventDefault();
        const isFriend = userData.updatedUser.friends.includes(targetUser._id);
        const isRequestSent = userData.updatedUser.friend_requests_out.includes(targetUser._id);
        if (isFriend || isRequestSent) {
            return;
          }

        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/send-friend-request/${targetUser._id}`, {
            method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
    }

    const resindFriendRequest = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/rescind-friend-request/${targetUser._id}`, {
            method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
    }

    const acceptFriendRequest = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/add-friend/${targetUser._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
    }
    
    const denyFriendRequest = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/deny-friend-request/${targetUser._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
    }

    const removeFriend = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/remove-friend/${targetUser._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
    }

    if (targetUser && userData) {
        return (
            <div className='user-user-section'>
                 <div className="user-request-buttons">
                        {targetUser.friends.some(friend => friend._id === userData.updatedUser._id) ? (
                            <button disabled={guestMode} className='user-request-button' onClick={guestMode ? null : removeFriend}>Remove Friend</button>
                        ) : targetUser.friend_requests_in.includes(userData.updatedUser._id) ? (
                            <button disabled={guestMode} className='user-request-button' onClick={guestMode ? null : resindFriendRequest}>Rescind Request</button>
                        ) : targetUser.friend_requests_out.includes(userData.updatedUser._id) ? (
                            <div className='user-page-request-container'>
                                <button disabled={guestMode} className='user-request-button' onClick={guestMode ? null : acceptFriendRequest}>Accept Request</button>
                                <button disabled={guestMode} className='user-request-button' onClick={guestMode ? null : denyFriendRequest}>Deny Request</button>
                            </div>
                        ) : !targetUser.friends.some(friend => friend._id === userData.updatedUser._id) ? (
                            <button className='user-request-button' disabled={guestMode} onClick={guestMode ? null : sendFriendRequest}>Add Friend</button>
                        ) : null}
                        </div>
                <div className="user-section-top">
                    <img className="user-profilepicture-large" src={`data:${targetUser.profile_picture.contentType};base64,${targetUser.profile_picture.data}`} alt={`${targetUser.first_name} profile`} />
                    <div className="user-section-info">
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