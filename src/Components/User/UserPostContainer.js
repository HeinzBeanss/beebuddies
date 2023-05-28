import '../Home/Home.css';
import React, { useState, useEffect } from "react";
import Post from "../Shared/Post";

const UserPostContainer = ({ setRefreshData, userData, targetUser }) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (!targetUser || !userData) {
        return <div className='user-post-loading'>Loading...</div>
    }
    
    // if (error) {
    //     return <div className='user-post-section'>Error: {error.message}</div>
    // }

    return (
        <div className="post-section">
            { targetUser.posts.length > 0 ? (
                targetUser.posts.map((post, index) => {
                    return (
                        <Post setRefreshData={setRefreshData} userData={userData} targetUser={targetUser} post={post} key={index}/>
                    )
                })
            ) : (
                <div>This user has no posts!</div>
            )}
        </div>
    )
}

export default UserPostContainer;