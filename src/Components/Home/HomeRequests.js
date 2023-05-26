import './Home.css';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const HomeRequests = ({ loading, userData }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(true);

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

    useEffect(() => {
        if (userData && refreshData) {
            const fetchData = async () => {
                try {
                    console.log("retrieving friend requests")
                    const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/friend-requests`);
                    const data = await response.json();
                    setData(data);
                    console.log(data);
                    setIsLoading(false);
                    setRefreshData(false);
                } catch (err) {
                    setError(err);
                    setIsLoading(false);
                    setRefreshData(false);
                }
            } 
            fetchData();
        }
    }, [userData, refreshData])

    if (isLoading) {
        return <div className='home-request-section'>Loading...</div>
        
    }

    if (error) {
        return <div className='home-request-section'>Error: {error.message}</div>
    }

    return (
        <div className='home-request-section'>
            { data.length > 0 ? (
            data.map((user, index) => {
                return (
                    <div className='request-section-item' key={index}>
                    <div className="request-item-top">
                        <Link to={`/user/${user._id}`}><img className="small-user-profilepicture" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt="Image" /></Link>
                        <div className='request-item-top-right'>
                            <Link to={`/user/${user._id}`}><h5 className='small-user-name'>{user.first_name} {user.last_name}</h5></Link>
                            <p className='request-item-mutuals'>Mutuals to do</p>
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
            <div>You have no requests</div>
            )}
        </div>
    )
}

export default HomeRequests;