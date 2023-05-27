import React, { useState, useEffect } from "react";
import Post from "../Shared/Post";

const HomePostContainer = ({refreshData, setRefreshData, userData }) => {

    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (userData && refreshData) {
            const fetchPosts = async () => {
                const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/friends/posts`);
                const postData = await response.json();
                console.log(postData);
                setPosts(postData);
                setRefreshData(false);
                setIsLoading(false);
            };    
            fetchPosts();
        }
    }, [userData, refreshData]);

    if (isLoading) {
        return <div className='home-postcontainer-loading'>Loading...</div>
        
    }

    if (error) {
        return <div className='home-postcontainer-loading'>Error: {error.message}</div>
    }

    return (
        <div className="post-section">
            { posts.length > 0 ? (
                posts.map((post, index) => {
                    return (
                        <Post setRefreshData={setRefreshData} userData={userData} post={post} key={index}/>
                    )
                })
            ) : (
                <div className="home-postcontainer-loading">There are no posts to display!</div>
            )}
        </div>
    )
}

export default HomePostContainer;