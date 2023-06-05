import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import PhotoPost from "../Shared/PhotoPost";

const UserContacts = ({ userData, setRefreshData, targetUser }) => {

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
            <div className={targetUser.posts.length ? "user-photos-section" : "user-photos-loading"}>
                { targetUser.posts.length > 0 ? (
                    targetUser.posts.map((post, index) => {
                        return (
                            <PhotoPost setRefreshData={setRefreshData} userData={userData} key={index} post={post}/>
                        )
                    })
                ) : (
                    <div>This user has no photos.</div>
                )}
            
                </div>
        </div>
    )
}

export default UserContacts;