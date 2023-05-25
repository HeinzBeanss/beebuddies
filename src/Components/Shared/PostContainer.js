import "../../Styles/Home.css"
import React, { useState, useEffect } from "react";
import Post from "./Post";

const PostContainer = ({refreshData, setRefreshData, userData }) => {

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
        return <div className='home-contacts-section'>Loading...</div>
        
    }

    if (error) {
        return <div className='home-contacts-section'>Error: {error.message}</div>
    }

    return (
        <div className="home-posts-section">
            { posts.length > 0 ? (
                posts.map((post, index) => {
                    return (
                        <Post setRefreshData={setRefreshData} userData={userData} post={post} key={index}/>
                    )
                })
            ) : (
                <div>No one's posted anything yet!</div>
            )}
        </div>
    )
}

export default PostContainer;