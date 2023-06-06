import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const UserList = ({guestMode, data, setRefreshData, userData}) => {

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

    if (!guestMode) {
    return (
        <div className='userindex-section-userlist'>
            {data.filter((user) => !user.friend_requests_out.includes(userData.updatedUser._id)).length === 0 ? (
              <h4 className="userindex-userlist-title">There are no users you haven't added or received a friend request from!</h4>
            ) : (
              <h4 className="userindex-userlist-title">Users you may know</h4>
            )}
            
            {data.filter((user) => !user.friend_requests_out.includes(userData.updatedUser._id)).length > 0 ? (
                <div className='userlist-unadded-users'>
                {data
                  .filter((user) => !user.friend_requests_out.includes(userData.updatedUser._id))
                  .map((user, index) => (
                    <div key={index} className='friendlist-card'>
                      <Link to={`/user/${user._id}`}>
                        <h5 className="userindex-username">{user.first_name} {user.last_name}</h5>
                      </Link>
                      <Link to={`/user/${user._id}`}>
                        <img className="friend-pfp" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt="Image" />
                      </Link>
                      {user.friends.includes(userData.updatedUser._id) ? (
                        <div>You're already friends!</div>
                      ) : user.friend_requests_in.includes(userData.updatedUser._id) ? (
                        <button className='usercard-rescind-request' onClick={(e) => resindFriendRequest(e, user)}>Rescind Friend Request</button>
                      ) : (
                        <button className='usercard-send-request' onClick={(e) => sendFriendRequest(e, user)}>Send Friend Request</button>
                      )}
                    </div>
                  ))}
            </div>
            ) : null}
        </div>
      );
    } else {
      return (
        <div className='userindex-section-userlist'>
            <h4 className="userindex-userlist-title">Other Bees in the Hive</h4>
                <div className='userlist-unadded-users'>
                {data.map((user, index) => (
                    <div key={index} className='friendlist-card'>
                      <Link to={`/user/${user._id}`}>
                        <h5 className="userindex-username">{user.first_name} {user.last_name}</h5>
                      </Link>
                      <Link to={`/user/${user._id}`}>
                        <img className="friend-pfp" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt="Image" />
                      </Link>
                        <button disabled={guestMode} className='usercard-send-request' onClick={(e) => sendFriendRequest(e, user)}>Send Friend Request</button>
                    </div>
                  ))}
            </div>
        </div>
      )
    }
}

export default UserList;