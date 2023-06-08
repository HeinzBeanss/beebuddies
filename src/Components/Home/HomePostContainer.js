import React, { useState, useEffect } from "react";
import Post from "../Shared/Post";

const HomePostContainer = ({isMobile, guestMode, refreshPostData, setRefreshPostData, userData }) => {

    const [posts, setPosts] = useState(null);
    useEffect(() => {
        setRefreshPostData(true);
    }, [])

    useEffect(() => {
        if (userData && refreshPostData) {
            const fetchPosts = async () => {
                let url = `http://localhost:4000/api/users/${userData.updatedUser._id}/friends/posts`;

                if (guestMode) {
                  url += '?guestMode=true';
                }

                const response = await fetch(url);
                const postData = await response.json();
                console.log(postData);
                setPosts(postData);
                setRefreshPostData(false);
            };    
            fetchPosts();
        }
    }, [userData, refreshPostData]);

    if (!posts) {
        return (
            <div className="friendlist-loading">Loading...</div>
        )
    }

    return (
        <div className="post-section">
            { posts.length > 0 ? (
                posts.map((post, index) => {
                    return (
                        <Post isMobile={isMobile} guestMode={guestMode} setRefreshData={setRefreshPostData} userData={userData} post={post} key={index}/>
                    )
                })
            ) : (
                <div className="home-postcontainer-loading">There are no posts to display!</div>
            )}
        </div>
    )
}

export default HomePostContainer;