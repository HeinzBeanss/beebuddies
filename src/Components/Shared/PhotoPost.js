import React, { useState, useEffect } from "react";
import { DateTime } from 'luxon';
import PostDisplay from "../Shared/PostPage";

const PhotoPost = ({isMobile, guestMode, setRefreshData, userData, post, index}) => {

    const deletePost = async () => {
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/posts/${post._id}`, {
            method: "DELETE",
        })
        const message = await response.json();
        setRefreshData(true);
        stopEnlargeImage();
    };
    
    const formatTimestamp = (timestamp) => {
        const formattedTime = DateTime.fromISO(timestamp).toFormat("MMMM d' at 'HH:mm");
        return formattedTime;
    }

    const [comment, setComment] = useState("");

    const handleInputChange = (e) => {
        setComment(e.target.value);
    }

    const postComment = async () => {
        if (!comment) {
            return;
        }
        const sanitizedComment = sanitizeComment(comment);

        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/posts/${post._id}/comment`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ comment }),
        })
        const message = await response.json();
        setRefreshData(true);
        setComment("");
    };

    const sanitizeComment = (input) => {
        const tempElement = document.createElement('div');
        tempElement.innerText = input;
        return tempElement.innerHTML;
      };

    const toggleLikePost = async () => {
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/posts/${post._id}/toggle-like`, {
            method: "PUT",
        })
        const message = await response.json();
        setRefreshData(true);
    };

    const toggleLikeComment = async (e, comment) => {
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/posts/${post._id}/comments/${comment._id}/toggle-like`, {
            method: "PUT",
        })
        const message = await response.json();
        setRefreshData(true);
    }

    // const [largeImage, setLargeImage] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [displayLargePost, setDisplayLargePost] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setScrollPosition(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const enlargeImage = () => {
        setDisplayLargePost(true);
        document.body.classList.add('no-scroll');
    }

    const stopEnlargeImage = () => {
        setDisplayLargePost(null);
        document.body.classList.remove('no-scroll');
        window.scrollTo(0, scrollPosition);
    };

    return (
        post.image ? (
            <div className="container-test">
                    {displayLargePost ? <PostDisplay
                    guestMode={guestMode}
                    userData={userData}
                    post={post} 
                    setDisplayLargePost={setDisplayLargePost}
                    scrollPosition={scrollPosition} 
                    stopEnlargeImage={stopEnlargeImage}
                    formatTimestamp={formatTimestamp}
                    toggleLikeComment={toggleLikeComment}
                    toggleLikePost={toggleLikePost}
                    postComment={postComment}
                    handleInputChange={handleInputChange}
                    comment={comment}
                    setComment={setComment}
                    deletePost={deletePost}
                    /> : null}
                <img key={index} onClick={isMobile ? null : enlargeImage} className="user-photos-photo" src={`data:${post.image.contentType};base64,${post.image.data}`} alt={`${post.author.first_name} profile`} />
                </div>
    
    ) : null
    )
}

export default PhotoPost;