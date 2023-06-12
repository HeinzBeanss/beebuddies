import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const HomeRequests = ({ guestMode, userData, refreshData, setRefreshData, setRefreshPostData }) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const acceptFriendRequest = async (e, user) => {
        e.preventDefault();
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/add-friend/${user._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
        setRefreshPostData(true);
    }
    
    const denyFriendRequest = async (e, user) => {
        e.preventDefault();
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/deny-friend-request/${user._id}`, {
        method: "PUT",
        });
        const message = await response.json();
        setRefreshData(true);
    }

    useEffect(() => {
        if (userData && !guestMode) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/friend-requests`);
                    const data = await response.json();
                    setData(data);
                    setRefreshData(false);
                } catch (err) {
                    setError(err);
                    setRefreshData(false);
                }
            } 
            fetchData();
        }
    }, [userData, refreshData])

    const findMutuals = (user) => {
        const userFriends = user.friends;
        let mutualsCount = 0;
      
        userData.updatedUser.friends.forEach((friend) => {
          if (userFriends.includes(friend)) {
            mutualsCount++;
          }
        });
      
        return mutualsCount;
      };

    if (error) {
        return <div className='home-request-loading'>Error: {error.message}</div>
    }

    if (data) {
    return (
        <div className="home-requests-outer">
            <h4 className='outer-title'>Friend Requests</h4>
            <div className='home-request-section'>
                { data.length > 0 ? (
                data.map((user, index) => {
                    return (
                        <div className='request-section-item' key={index}>
                        <div className="request-item-top">
                            <Link to={`/user/${user._id}`} className="user-profilepicture-medium"><img className="user-profilepicture-medium" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt={`${user.first_name} profile`} /></Link>
                            <div className='request-item-top-right'>
                                <Link to={`/user/${user._id}`}><h5 className='small-user-name'>{user.first_name} {user.last_name}</h5></Link>
                                <p className='request-item-mutuals'>{findMutuals(user)} Mutual Friends</p>
                            </div>
                        </div>
                        <div className="request-item-bottom">
                            <button className='request-accept-button' onClick={(e) => acceptFriendRequest(e, user)}>Accept</button>
                            <button className='request-deny-button' onClick={(e) => denyFriendRequest(e, user)}>Deny</button>
                        </div>
                    </div>
                    )
                })
                ) : (
                <div className="home-request-loading">You have no incoming friend requests.</div>
                )}
            </div>
        </div>
    )
    } else if (!data && guestMode) {
        return (
            <div className="home-requests-outer">
                <h4 className='outer-title'>Friend Requests</h4>
                <div className='home-request-section'>
                <div className="home-request-loading">Login to receive friend requests!</div>
                </div>
            </div>
            )
    }
}

export default HomeRequests;