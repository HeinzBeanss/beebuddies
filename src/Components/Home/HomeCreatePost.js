import '../../Styles/Home.css';
import { Link } from "react-router-dom";
import React from "react";

const HomeCreatePost = () => {
    return (
        <div className='home-createpost-section'>
        <div className="createpost-top-section">
            <div className='temp-user'></div>
            <h5 className='createpost-title'>What's on your mind, username?</h5>
        </div>
        <textarea className='createpost-text' placeholder='Write your thoughts here' rows={4}></textarea>
        <div className="createpost-button-section">
            <button className='createpost-file'>Add an image</button>
            <button className='createpost-input-button'>Create Post</button>
        </div>
    </div>
    )
}

export default HomeCreatePost;