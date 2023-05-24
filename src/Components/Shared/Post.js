// css
import React from "react";

const Post = ({post}) => {
    console.log(post);
    return (
        <div className="post-item">
            <div>{post.author.first_name}</div>
            <div>{post.content}</div>
            {post.image ? (
                <img className="small-user-profilepicture" src={`data:${post.image.contentType};base64,${post.image.data}`} alt="Image" />
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Post;