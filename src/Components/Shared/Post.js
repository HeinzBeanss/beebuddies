import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from 'luxon';

import heart from "../../Assets/heart-outline.svg";
import heartfull from "../../Assets/heart.svg";

const Post = ({setRefreshData, userData, post}) => {

    const formatTimestamp = (timestamp) => {
        const formattedTime = DateTime.fromISO(timestamp).toFormat("MMMM d' at 'HH:mm");
        return formattedTime;
    }

    console.log(post);
    const [comment, setComment] = useState("");

    const handleInputChange = (e) => {
        setComment(e.target.value);
    }

    const postComment = async () => {

        if (!comment) {
            return;
        }
        const sanitizedComment = sanitizeComment(comment);

        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/posts/${post._id}/comment`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ comment }),
        })
        const message = await response.json();
        console.log(message);
        setRefreshData(true);
        setComment("");
    };

    const sanitizeComment = (input) => {
        const tempElement = document.createElement('div');
        tempElement.innerText = input;
        return tempElement.innerHTML;
      };

    const toggleLikePost = async () => {
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/posts/${post._id}/toggle-like`, {
            method: "PUT",
        })
        const message = await response.json();
        console.log(message);
        setRefreshData(true);
    };

    const toggleLikeComment = async (e, comment) => {
        console.log(post._id);
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/posts/${post._id}/comments/${comment._id}/toggle-like`, {
            method: "PUT",
        })
        const message = await response.json();
        console.log(message);
        setRefreshData(true);
    }

    return (
        <div className="post-item">
            <div className="post-section-header">
                <Link className="user-profilepicture-medium" to={`/user/${post.author._id}`}><img className="user-profilepicture-medium" src={`data:${post.author.profile_picture.contentType};base64,${post.author.profile_picture.data}`} alt="Image" /></Link>
                <div className="post-section-header-info">
                <Link to={`/user/${post.author._id}`}><h4 className="post-user-name">{post.author.first_name} {post.author.last_name}</h4></Link>
                    <p className="post-timestamp">{formatTimestamp(post.timestamp)}</p>
                </div>
            </div>
            <div className="post-section-content">{post.content}</div>
            {post.image ? (
                <img className="post-image" src={`data:${post.image.contentType};base64,${post.image.data}`} alt="Image" />
            ) : null}
            {/* Note - add hover like thing displaying users. */}
            <div className="post-section-feedback">
                <div className="post-section-likes">
                    <img className="comment-item-likesvg" src={post.likes.some(like => like._id === userData.updatedUser._id) ? heartfull : heart} onClick={toggleLikePost}></img>
                    <p className="post-section-likecount">{post.likes.length}</p>
                </div>
                <p className="post-section-comments">{post.comments.length} Comments</p>
            </div>
            <div className={post.comments.length > 0 ? "post-section-writecomment" : "post-section-writecomment-end"}>
                <img className="user-profilepicture-small" src={`data:${userData.updatedUser.profile_picture.contentType};base64,${userData.updatedUser.profile_picture.data}`} alt="Image" />
                <input className="writecomment-section-comment" type="text" name="comment" placeholder="Write a comment..." onChange={handleInputChange} value={comment}></input>
                <button className="writecomment-section-post" onClick={postComment}>Post Comment</button>
            </div>
            {post.comments.length > 0 ? (
            <div className="comment-section">
            {post.comments.length > 0 && (
                
                post.comments.map((comment, index) => {
                    return (
                        <div key={index} className="comment-section-item">
                            <Link className="user-profilepicture-small" to={`/user/${comment.author._id}`}><img className="user-profilepicture-small" src={`data:${comment.author.profile_picture.contentType};base64,${comment.author.profile_picture.data}`} alt="Image" /></Link>
                            <div className="comment-item-right">
                                <div className="comment-item-right-top">
                                <Link to={`/user/${comment.author._id}`}><h5 className="comment-item-author">{comment.author.first_name} {comment.author.last_name}</h5></Link>
                                    <p className="comment-item-timestamp">{formatTimestamp(comment.timestamp)}</p>
                                </div>
                                
                                <div className="comment-item-right-bot">
                                    <p className="comment-item-content">{comment.content}</p>
                                    <div className="comment-item-likes">
                                        <p className="comment-section-likecount">{comment.likes.length}</p>
                                        <img className="comment-item-likesvg" src={comment.likes.includes(userData.updatedUser._id) ? heartfull : heart} onClick={(e) => toggleLikeComment(e, comment)}></img>

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