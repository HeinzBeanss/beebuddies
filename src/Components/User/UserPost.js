import React, { useState } from "react";

const Post = ({ setRefreshData, userData, post, targetUser}) => {

    const [comment, setComment] = useState("");

    const handleInputChange = (e) => {
        setComment(e.target.value);
    }

    const postComment = async () => {
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

    return (
        <div className="post-item">
            <div className="post-section-header">
                <img className="small-user-profilepicture" src={`data:${post.author.profile_picture.contentType};base64,${post.author.profile_picture.data}`} alt={`${post.author.first_name} profile`} />
                <div>{post.author.first_name} {post.author.last_name}</div>
                <div>{post.timestamp}</div>
            </div>
            <div className="post-section-four">{post.content}</div>
            {post.image ? (
                <img className="post-section-four small-user-profilepicture" src={`data:${post.image.contentType};base64,${post.image.data}`} alt="post content" />
            ) : (
                <div></div>
            )}
            {/* Note - add hover like thing displaying users. */}
            <div className="post-section-feedback">
                <div className="post-section-likes">
                    <p className="post-section-likecount">{post.likes.length}</p>
                    <button className="comment-item-likes" onClick={toggleLikePost}>Like</button>
                </div>
                <div className="post-section-comments">{post.comments.length}</div>
            </div>
            <div className="post-section-writecomment">
                <div className="writecomment-section-header">
                    <img className="small-user-profilepicture" src={`data:${userData.updatedUser.profile_picture.contentType};base64,${userData.updatedUser.profile_picture.data}`} alt={`${userData.updatedUser.first_name} profile`} />
                    <h5 className="small-user-name">{userData.updatedUser.first_name} {userData.updatedUser.last_name}</h5>
                </div>
                <div className="writecomment-section-input">
                    <input className="writecomment-section-comment" type="text" name="comment" placeholder="Write a comment..." onChange={handleInputChange} value={comment}></input>
                    <button className="writecomment-section-post" onClick={postComment}>Post Comment</button>
                </div>
                {post.comments.length > 0 && (
                    post.comments.map((comment, index) => {
                        return (
                            <div key={index} className="comment-section-item">
                                <img className="small-user-profilepicture" src={`data:${comment.author.profile_picture.contentType};base64,${comment.author.profile_picture.data}`} alt={`${comment.author.first_name} profile`} />
                                <div className="comment-item-right">
                                    <h5 className="comment-item-author">{comment.author.first_name} {comment.author.last_name}</h5>
                                    <p className="comment-item-content">{comment.content}</p>
                                    <div className="comment-item-final">
                                        <p className="comment-item-timestamp">{comment.timestamp}</p>
                                        <div className="comment-item-likes">
                                            <p className="comment-item-likecount">{comment.likes.length}</p>
                                            <button className="comment-item-likes" onClick={(e) => toggleLikeComment(e, comment)}>Like</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

        </div>
    )
}

export default Post;