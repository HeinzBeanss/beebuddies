import "./Home.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const HomeContacts = ({guestMode, userData, refreshData, setRefreshPostData}) => {

    const [friends, setFriends] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData) {
            const fetchFriends = async () => {
                let url = `https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/friends`;

                if (guestMode) {
                  url += '?guestMode=true';
                }

                const response = await fetch(url);
                const friends = await response.json();
                setFriends(friends);
                setIsLoading(false);
                setRefreshPostData(true);
            }  
            fetchFriends();
        }
    }, [userData, refreshData])
    
    if (isLoading) {
        return <div className='home-contacts-loading'>Loading...</div>
        
    }

    return (
        <div className="home-contacts-outer">
            <h4 className='outer-title'>{guestMode ? "Bees in the Hive" : "Buddies"}</h4>
            <div className='home-contacts-section'>
                { friends.length > 0 ? (
                    friends.map((user, index) => {
                        return (
                            <div className='contact-section-item' key={index}>
                                <Link className="user-profilepicture-medium" to={`/user/${user._id}`}><img className="user-profilepicture-medium" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt={`${user.first_name} profile`} /></Link>
                                <Link to={`/user/${user._id}`}><h5 className='small-user-name'>{user.first_name} {user.last_name}</h5></Link>
                            </div>
                        )
                    })
                ) : (
                    <div className="home-contacts-loading">You have no friends added, find some at <Link to={"/users"}>the Hive!</Link></div>
                )}
            
                </div>
        </div>
    )
}

export default HomeContacts;