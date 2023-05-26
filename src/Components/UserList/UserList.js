import '../Home/Home.css';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const UserList = ({loading, userData}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(true);

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
    
    // NEED TO MAKE SURE IT IPDATES/FETCHES AGAIN WHEN I SEND A FRIEND REQUEST
    // fetch just friends
    useEffect(() => {
        if (userData && refreshData) {
            const fetchUsers = async () => {
                try {
                    console.log("FETCHING USERS NOW")
                    const response = await fetch(`http://localhost:4000/api/user/${userData.updatedUser._id}/unadded-users`);
                    const data = await response.json();
                    setData(data);
                    setIsLoading(false);
                    setRefreshData(false);
                    console.log(data);
                } catch (err) {
                    setError(err);
                    setIsLoading(false);
                }
            };
            fetchUsers();
        }
        console.log("Currently no valid user data");
    }, [userData, refreshData]);

    if (isLoading) {
        return <div className='userindex-request-section'>Loading...</div>
        
    }

    if (error) {
        return <div className='userindex-request-section'>Error: {error.message}</div>
    }

    return (
        <div className='userindex-section-two'>
            <div className='userindex-requests-in'>
            <h4>Friend Requests</h4>
                {data.map((user, index) => {
                         if (user.friend_requests_out.includes(userData.updatedUser._id)) {
                            return (
                                <div key={index}><Link to={`/user/${user._id}`}><h5>{user.first_name} {user.last_name}</h5></Link>
                                <Link to={`/user/${user._id}`}><img className="small-user-profilepicture" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt="Image" /></Link>
                                <div className="userindex-item-bottom">
                                    <button className='userindex-accept-button' onClick={(e) => acceptFriendRequest(e, user)}>Accept</button>
                                    <button className='userindex-deny-button' onClick={(e) => denyFriendRequest(e, user)}>Deny</button>
                                </div>
                            </div>
                            )
                         }
                })}
            </div>
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