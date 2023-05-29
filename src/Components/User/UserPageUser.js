import '../Home/Home.css';
import { Link } from "react-router-dom";
import React from "react";
import { DateTime } from 'luxon';

const UserPageUser = ({setRefreshData, userData, targetUser, setRefreshMainUserData}) => {

    const formatTimestamp = (timestamp) => {
        console.log(targetUser);
        console.log(userData);
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
        // Note - Could add extra validation
        if (isFriend || isRequestSent) {
            console.log("Friend request already sent or user is already a friend");
            return;
          }

        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/send-friend-request/${targetUser._id}`, {
            method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
        console.log(message);
    }

    const resindFriendRequest = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/rescind-friend-request/${targetUser._id}`, {
            method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
        console.log(message);
    }

    const acceptFriendRequest = async (e) => {
        e.preventDefault();
        // Note - Could add validation
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/add-friend/${targetUser._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
        console.log(message);
    }
    
    const denyFriendRequest = async (e) => {
        e.preventDefault();
        // Note - Could add validation
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/deny-friend-request/${targetUser._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
        console.log(message);
    }

    const removeFriend = async (e) => {
        e.preventDefault();
        // Note - Could add validation
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/remove-friend/${targetUser._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshMainUserData(true);
        console.log(message);
    }

    if (targetUser && userData) {
        return (
            <div className='user-user-section'>
                 <div className="user-request-buttons">
                        {targetUser.friends.some(friend => friend._id === userData.updatedUser._id) ? (
                            <button className='user-request-button' onClick={removeFriend}>Remove Friend</button>
                        ) : targetUser.friend_requests_in.includes(userData.updatedUser._id) ? (
                            <button className='user-request-button' onClick={resindFriendRequest}>Rescind Request</button>
                        ) : targetUser.friend_requests_out.includes(userData.updatedUser._id) ? (
                            <div className='user-page-request-container'>
                                <button className='user-request-button' onClick={acceptFriendRequest}>Accept Friend Request</button>
                                <button className='user-request-button' onClick={denyFriendRequest}>Deny Friend Request</button>
                            </div>
                        ) : !targetUser.friends.some(friend => friend._id === userData.updatedUser._id) ? (
                            <button className='user-request-button' onClick={sendFriendRequest}>Add Friend</button>
                        ) : null}
                        </div>
                <div className="user-section-top">
                    <img className="user-profilepicture-large" src={`data:${targetUser.profile_picture.contentType};base64,${targetUser.profile_picture.data}`} alt="Image" />
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