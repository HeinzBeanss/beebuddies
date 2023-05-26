import '../Home/Home.css';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const UserContacts = ({ targetUser }) => {

    const [error, setError] = useState(null);
    
    if (!targetUser) {
        return <div className='user-photos-section'>Loading...</div>
    }

    if (error) {
        return <div className='user-photos-section'>Error: {error.message}</div>
    }

    return (
        <div className='user-photos-section'>
            { targetUser.posts.length > 0 ? (
                targetUser.posts.map((post, index) => {
                    return (
                        post.image ? (
                            <div className='photo-section-item' key={index}>
                                <img className="small-user-profilepicture" src={`data:${post.image.contentType};base64,${post.image.data}`} alt="Image" />
                        </div>
                        ) : null
                    )
                })
            ) : (
                <div>This user has no photos.</div>
            )}
        
    </div>
    )
}

export default UserContacts;