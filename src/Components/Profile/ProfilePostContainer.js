import '../Home/Home.css';
import React, { useState, useEffect } from "react";
import ProfilePost from "./ProfilePost";

const ProfilePostContainer = ({ setRefreshData, userData, profileUser }) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (!profileUser || !userData) {
        return <div className='profile-post-section'>Loading...</div>
    }
    
    // if (error) {
    //     return <div className='user-post-section'>Error: {error.message}</div>
    // }

    return (
        <div className="profile-post-section">
            { profileUser.posts.length > 0 ? (
                profileUser.posts.map((post, index) => {
                    return (
                        <ProfilePost setRefreshData={setRefreshData} userData={userData} profileUser={profileUser} post={post} key={index}/>
                    )
                })
            ) : (
                <div>This user has no posts!</div>
            )}
        </div>
    )
}

export default ProfilePostContainer;