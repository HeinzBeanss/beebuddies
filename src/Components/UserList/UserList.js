import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const UserList = ({ data, setRefreshData, userData}) => {

    const sendFriendRequest = async (e, user) => {
        e.preventDefault();
        const isFriend = userData.updatedUser.friends.includes(user._id);
        const isRequestSent = userData.updatedUser.friend_requests_out.includes(user._id);
        // Note - Could add extra validation
        if (isFriend || isRequestSent) {
            console.log("Friend request already sent or user is already a friend");
            return;
          }

        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/send-friend-request/${user._id}`, {
            method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        console.log(message);
    }

    const resindFriendRequest = async (e, user) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/rescind-friend-request/${user._id}`, {
            method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        console.log(message);
    }


    if (!data) {
        return <div className='userindex-section-userlist'>Loading...</div>
        
    }

    return (
        <div className='userindex-section-userlist'>

            <div className='userlist-unadded-users'>
                <h4>Users you may know</h4>
                {data.map((user, index) => {
                    if (!user.friend_requests_out.includes(userData.updatedUser._id)) {
                        return (
                            <div key={index} className='userindex-user-card'>
                                <Link to={`/user/${user._id}`}><h5>{user.first_name} {user.last_name}</h5></Link>
                                <Link to={`/user/${user._id}`}><img className="userindex-user-profilepicture" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt="Image" /></Link>
                                { user.friends.includes(userData.updatedUser._id) ? (
                                    <div>You're already friends!</div>
                                ) : user.friend_requests_in.includes(userData.updatedUser._id) ? (
                                    <button className='usercard-resind-request' onClick={(e) => resindFriendRequest(e, user)}> Rescind Friend Request</button>
                                ) : (
                                    <button className='usercard-send-request' onClick={(e) => sendFriendRequest(e, user)}>Send Friend Request</button>
                                )
                                }
                            </div>       
                            )
                    }
                })}
            </div>
        </div>
    )
}

export default UserList;