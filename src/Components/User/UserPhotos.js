import '../Home/Home.css';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const UserContacts = ({ targetUser }) => {

    const [error, setError] = useState(null);
    
    if (!targetUser) {
        return <div className='user-photos-loading'>Loading...</div>
    }

    if (error) {
        return <div className='user-photos-loading'>Error: {error.message}</div>
    }

    return (
        <div className="user-photos-outer">
            <h4 className='outer-title'>{targetUser.first_name}'s Photos</h4>
            <div className='user-photos-section'>
                { targetUser.posts.length > 0 ? (
                    targetUser.posts.map((post, index) => {
                        return (
                            post.image ? (
                                    <img key={index} className="user-photos-photo" src={`data:${post.image.contentType};base64,${post.image.data}`} alt="Image" />
                            
                            ) : null
                        )
                    })
                ) : (
                    <div className='user-photos-loading'>This user has no photos.</div>
                )}
            
                </div>
        </div>
    )
}

export default UserContacts;