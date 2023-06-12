import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateTime } from 'luxon';

import PostDisplay from  "../Shared/PostPage";
import defaultpfp from "../../Assets/default_bee_profile.jpg";
import heart from "../../Assets/heart-outline.svg";
import heartfull from "../../Assets/heart.svg";

const Post = ({isMobile, guestMode, setRefreshData, userData, post}) => {

    const deletePost = async () => {
        const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/posts/${post._id}`, {
            method: "DELETE",
        })
        const message = await response.json();
        setRefreshData(true);
    };

    // Display Likes
    const [likes, setLikes] = useState(null);
    const displayLikes = (users) => {
        if (users.length < 1) {
            return
        }
        setLikes(
            <div className="display-likes-component">
                {users.map((user, index) => {
                    return (
                        <p key={index}>{user.first_name} {user.last_name}</p>
                    )
                })}
            </div>
        )
    };

    // Display Comment Likes
    const [hoveredComment, setHoveredComment] = useState(null);

    const displayCommentLikes = (users) => {
        if (users.length < 1) {
          return;
        }
      
        return (
          <div className="display-likes-component">
            {users.map((user, index) => (
              <p key={index}>{user.first_name} {user.last_name}</p>
            ))}
          </div>
        );
      };

    // Update the hover state for the specific comment
    const handleCommentMouseEnter = (commentId) => {
    setHoveredComment(commentId);
    };
  
     // Reset the hover state when the mouse leaves the comment
    const handleCommentMouseLeave = () => {
    setHoveredComment(null);
    };

    const formatTimestamp = (timestamp) => {
        const formattedTime = DateTime.fromISO(timestamp).toFormat("MMMM d' at 'HH:mm");
        return formattedTime;
    }

    const [comment, setComment] = useState("");

    const handleInputChange = (e) => {
        setComment(e.target.value);
    }

    const postComment = async (e) => {
        e.preventDefault();
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

    if (!userData) {
        return (
            <div className="post-section-loading">Loading</div>
        )
    } 

    return (
        <div className="post-item">
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
            <div className="post-section-header">
                <Link className="user-profilepicture-medium" to={`/user/${post.author._id}`}><img className="user-profilepicture-medium" src={`data:${post.author.profile_picture.contentType};base64,${post.author.profile_picture.data}`} alt={`${post.author.first_name} profile`} /></Link>
                {post.author._id === userData.updatedUser._id ? 
                <div className="profilepost-section-header">
                <div className="post-section-header-info">
                    <Link to={`/user/${post.author._id}`}><h4 className="post-user-name">{post.author.first_name} {post.author.last_name}</h4></Link>
                    <p className="post-timestamp">{formatTimestamp(post.timestamp)}</p>
                </div>
                <button className="profilepost-delete" onClick={deletePost}>Delete Post</button>
            </div> :
            <div className="post-section-header-info">
            <Link to={`/user/${post.author._id}`}><h4 className="post-user-name">{post.author.first_name} {post.author.last_name}</h4></Link>
                <p className="post-timestamp">{formatTimestamp(post.timestamp)}</p>
            </div>}
            </div>
            <div className="post-section-content">{post.content}</div>
            {post.image ? (
                <img className="post-image" src={`data:${post.image.contentType};base64,${post.image.data}`} alt="post content" onClick={isMobile ? null : enlargeImage} />
            ) : null}
            {/* Note - add hover like thing displaying users. */}
            <div className="post-section-feedback minus">
                <div className="post-section-likes" onMouseOver={() => displayLikes(post.likes)} onMouseLeave={() => setLikes(null)}>
                    {likes}
                    <img className="comment-item-likesvg" src={post.likes.some(like => like._id === userData.updatedUser._id) ? heartfull : heart} onClick={guestMode ? null : toggleLikePost} alt="heart"></img>
                    <p className="post-section-likecount">{post.likes.length}</p>
                </div>
                <p className="post-section-comments">{post.comments.length} Comments</p>
            </div>
            <form onSubmit={postComment} className={post.comments.length > 0 ? "post-section-writecomment" : "post-section-writecomment-end"}>
                <img className="user-profilepicture-small" src={guestMode ? defaultpfp : `data:${userData.updatedUser.profile_picture.contentType};base64,${userData.updatedUser.profile_picture.data}`} alt={`${userData.updatedUser.first_name} profile`}/>
                <input className="writecomment-section-comment" type="text" name="comment" placeholder={guestMode ? "Login to post a comment" : "Write a comment..."} onChange={handleInputChange} value={comment}></input>
                <button disabled={guestMode} type="submit" className="writecomment-section-post" onClick={postComment}>{isMobile ? "Comment" : "Post Comment"}</button>
            </form>
            {post.comments.length > 0 ? (
            <div className="comment-section">
            {post.comments.length > 0 && (
                
                post.comments.map((comment, index) => {
                    return (
                        <div key={index} className="comment-section-item">
                            <Link className="user-profilepicture-small" to={`/user/${comment.author._id}`}><img className="user-profilepicture-small" src={`data:${comment.author.profile_picture.contentType};base64,${comment.author.profile_picture.data}`} alt={`${comment.author.first_name} profile`} /></Link>
                            <div className="comment-item-right">
                                <div className="comment-item-right-top">
                                <Link to={`/user/${comment.author._id}`}><h5 className="comment-item-author">{comment.author.first_name} {comment.author.last_name}</h5></Link>
                                    <p className="comment-item-timestamp">{formatTimestamp(comment.timestamp)}</p>
                                </div>
                                
                                <div className="comment-item-right-bot">
                                    <p className="comment-item-content">{comment.content}</p>
                                    <div className="comment-item-likes minus"     onMouseEnter={() => handleCommentMouseEnter(comment._id)} onMouseLeave={handleCommentMouseLeave}>
                                    {hoveredComment === comment._id && (
                                    <>{displayCommentLikes(comment.likes)}</>
                                    )}
                                        <p className="comment-section-likecount">{comment.likes.length}</p>
                                        <img className="comment-item-likesvg" src={comment.likes.some(like => like._id === userData.updatedUser._id) ? heartfull : heart} onClick={guestMode ? null : (e) => toggleLikeComment(e, comment)} alt="heart"></img>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
            </div>
            ) : null}
        </div>
    )
}

export default Post;