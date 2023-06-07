import React from "react";
import { Link } from "react-router-dom";

const UserIndexRequests = ({ guestMode, data, setRefreshData, userData}) => {

    const acceptFriendRequest = async (e, user) => {
        e.preventDefault();
        // Note - Could add validation
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/add-friend/${user._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        console.log(message);
    }
    
    const denyFriendRequest = async (e, user) => {
        e.preventDefault();
        // Note - Could add validation
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/deny-friend-request/${user._id}`, {
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
      <div className='userindex-requests-in'>
        {data.filter((user) => user.friend_requests_out.includes(userData.updatedUser._id)).length > 0 ? (
          <div>
            <h4 className="userindex-requests-title">Friend Requests</h4>
            <div className="index-requests-grid">
              {data
                .filter((user) =>
                  user.friend_requests_out.includes(userData.updatedUser._id)
                )
                .map((user, index) => (
                  <div className="friendlist-card" key={index}>
                    <Link to={`/user/${user._id}`}>
                      <h5 className="userindex-username">{user.first_name} {user.last_name}</h5>
                    </Link>
                    <Link to={`/user/${user._id}`}>
                      <img
                        className="friend-pfp"
                        src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`}
                        alt="Image"
                      />
                    </Link>
                    <div className="userindex-item-bottom">
                      <button
                        className="userindex-accept-button"
                        onClick={(e) => acceptFriendRequest(e, user)}
                      >
                        Accept
                      </button>
                      <button
                        className="userindex-deny-button"
                        onClick={(e) => denyFriendRequest(e, user)}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>You have no incoming friend requests.</div>
        )}
      </div>
    );
  } else if (guestMode) {
    return (
      <div className='userindex-requests-in'>
        <div>Login to receive friend requests.</div>
      </div>
    )
  }
      
}

export default UserIndexRequests;