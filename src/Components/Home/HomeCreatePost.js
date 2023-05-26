import './Home.css';
import { Link } from "react-router-dom";
import React, { useState } from "react";

const HomeCreatePost = ({ setRefreshData, userData }) => {

    const [imageFile, setImageFile] = useState(null);
    const [postData, setPostData] = useState({
        content: "",
    });
    const [fileError, setFileError] = useState(<div></div>)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({...postData, [name]: value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            console.log("actually no file was chosen");
            setImageFile(null);
            return;
        }

        const allowedFileTypes = [  
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/tiff',
        'image/webp'
        ];

        // Validate File Size
        if (file.size > 1 * 1024 * 1024) {
            setFileError(<div>Sorry, your file was too big. (Over 1MB)</div>)
            e.target.value = "";
            return;
        } 
        if (!allowedFileTypes.includes(file.type)) {
            setFileError(<div>Sorry, {file.type} isn't a supported file type.</div>);
            e.target.value = "";
            return;
        }
        setFileError(<div></div>)
        setImageFile(file);
    }

    const createPost = async (e) => {
        e.preventDefault();
        if (userData) {
            console.log("Attempting to post");
            const formData = new FormData();
            formData.append("content", postData.content);
            formData.append("author", userData.updatedUser._id);
            if (imageFile) {
                formData.append("image", imageFile);
                formData.append("mimeType", imageFile.type);
            }
            console.log([...formData]);
            const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/posts`, {
                method: "POST",
                body: formData,
                });
            
            const message = await response.json();
            console.log(message);
            setRefreshData(true);
            setPostData({
                content: "",
            })
        } else {
            return;
        }
    }

    return (
        <div className='home-createpost-section'>

            {userData == null ? (
                <div className="createpost-top-section">
                    <div className='temp-user'></div>
                    <h5 className='createpost-title'>What's on your mind, username?</h5>
                </div>
            ) : (
                <div className="createpost-top-section">
                <img className="small-user-profilepicture" src={`data:${userData.updatedUser.profile_picture.contentType};base64,${userData.updatedUser.profile_picture.data}`} alt="Image" />
                <h5 className='user-section-name'>What's on your mind, {userData.updatedUser.first_name}?</h5>
                </div>
            )}

        <form onSubmit={createPost} encType="multipart/form-data">
            <textarea className='createpost-text' name="content" placeholder='Write your thoughts here' rows={4} value={postData.content} onChange={handleInputChange}></textarea>
            <div className="createpost-button-section">
                {fileError}
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button className='createpost-input-button' type='submit'>Create Post</button>
            </div>
        </form>
    </div>
    )
}

export default HomeCreatePost;