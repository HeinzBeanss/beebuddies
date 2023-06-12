import '../Home/Home.css';
import React from "react";
import Post from "../Shared/Post";

const UserPostContainer = ({isMobile, guestMode, setRefreshData, userData, targetUser }) => {

    if (!targetUser || !userData) {
        return <div className='user-post-loading'>Loading...</div>
    }

    return (
        <div className="post-section">
            { targetUser.posts.length > 0 ? (
                targetUser.posts.map((post, index) => {
                    return (
                        <Post isMobile={isMobile} guestMode={guestMode} setRefreshData={setRefreshData} userData={userData} targetUser={targetUser} post={post} key={index}/>
                    )
                })
            ) : (
                <div className='user-post-loading'>This user has no posts!</div>
            )}
        </div>
    )
}

export default UserPostContainer;