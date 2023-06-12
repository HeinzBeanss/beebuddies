import React from "react";
import ProfilePost from "./ProfilePost";

const ProfilePostContainer = ({isMobile, setRefreshData, userData, profileUser }) => {

    if (!profileUser || !userData) {
        return <div className='user-post-loading'>Loading...</div>
    }
    
    return (
        <div className="post-section">
            { profileUser.posts.length > 0 ? (
                profileUser.posts.map((post, index) => {
                    return (
                        <ProfilePost isMobile={isMobile} setRefreshData={setRefreshData} userData={userData} profileUser={profileUser} post={post} key={index}/>
                    )
                })
            ) : (
                <div className='user-post-loading'>This user has no posts!</div>
            )}
        </div>
    )
}

export default ProfilePostContainer;