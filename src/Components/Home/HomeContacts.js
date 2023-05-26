import "./Home.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const HomeContacts = ({ userData }) => {

    const [friends, setFriends] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData) {
            const fetchFriends = async () => {
                const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/friends`);
                const friends = await response.json();
                console.log("friends below here");
                console.log(friends);
                setFriends(friends);
                setIsLoading(false);
            }  
            fetchFriends();
        }
    }, [userData])
    
    if (isLoading) {
        return <div className='home-contacts-section'>Loading...</div>
        
    }

    if (error) {
        return <div className='home-contacts-section'>Error: {error.message}</div>
    }

    return (
        <div className='home-contacts-section'>
            { friends.length > 0 ? (
                friends.map((user, index) => {
                    return (
                        <div className='contact-section-item' key={index}>
                            <Link to={`/user/${user._id}`}><img className="small-user-profilepicture" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt="Image" /></Link>
                            <Link to={`/user/${user._id}`}><h5 className='small-user-name'>{user.first_name} {user.last_name}</h5></Link>
                        </div>
                    )
                })
            ) : (
                <div>You have no friends added, find some at <Link to={"/users"}>the Hive!</Link></div>
            )}
        
    </div>
    )
}

export default HomeContacts;