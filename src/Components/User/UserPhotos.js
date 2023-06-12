import React from "react";

import PhotoPost from "../Shared/PhotoPost";

const UserContacts = ({isMobile, guestMode, userData, setRefreshData, targetUser }) => {
    
    if (!targetUser) {
        return <div className='user-photos-loading'>Loading...</div>
    }

    return (
        <div className="user-photos-outer">
            <h4 className='outer-title'>{targetUser.first_name}'s Photos</h4>
            <div className={targetUser.posts.length ? "user-photos-section" : "user-photos-loading"}>
                { targetUser.posts.length > 0 ? (
                    targetUser.posts.map((post, index) => {
                        return (
                            <PhotoPost isMobile={isMobile} guestMode={guestMode} setRefreshData={setRefreshData} userData={userData} key={index} post={post}/>
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