import '../Home/Home.css';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const UserContacts = ({ targetUser }) => {

    const [error, setError] = useState(null);
    
    if (!targetUser) {
        return <div className='user-contacts-section'>Loading...</div>
    }

    if (error) {
        return <div className='user-contacts-section'>Error: {error.message}</div>
    }

    return (
        <div className='user-contacts-section'>
            { targetUser.friends.length > 0 ? (
                targetUser.friends.map((user, index) => {
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

export default UserContacts;