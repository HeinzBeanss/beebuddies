import './Home.css';
import { Link } from "react-router-dom";
import React, { useState } from "react";
import defaultpfp from "../../Assets/default_bee_profile.jpg";

const HomeCreatePost = ({guestMode, setRefreshPostData, refreshPostData, setRefreshData, userData }) => {

    const [imageFile, setImageFile] = useState(null);
    const [postData, setPostData] = useState({
        content: "",
    });
    const [fileError, setFileError] = useState(<div></div>)
    const [fileName, setFileName] = useState("");

    const handleFileUpload = () => {
        setFileError(<div></div>)
        const fileInput = document.querySelector('.createpost-file');
        fileInput.click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({...postData, [name]: value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            console.log("actually no file was chosen");
            setImageFile(null);
            setFileName("");
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
            setFileError(<div className='createpost-file-error'>Sorry, your file was too big. (Over 1MB)</div>)
            setFileName("");
            e.target.value = "";
            return;
        } 
        if (!allowedFileTypes.includes(file.type)) {
            setFileError(<div className='createpost-file-error'>{file.type} isn't a supported file type.</div>);
            e.target.value = "";
            setFileName("");
            return;
        }
        setFileError(<div></div>)
        setImageFile(file);
        console.log(file);
        setFileName(file.name);
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
            setRefreshPostData(true);
            setPostData({
                content: "",
            })
        } else {
            return;
        }
    }

    const handleGuestError = (e) => {
        e.preventDefault();
        setFileError(<div className='createpost-file-error'>Login to post</div>)
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
                <img className="user-profilepicture-medium" src={guestMode ? defaultpfp : `data:${userData.updatedUser.profile_picture.contentType};base64,${userData.updatedUser.profile_picture.data}`} alt="Image" />
                <h4 className='createpost-title'>What's on your mind, {userData.updatedUser.first_name}?</h4>
                </div>
            )}

        <form onSubmit={guestMode ? handleGuestError : createPost} encType="multipart/form-data">
            <textarea className='createpost-text' name="content" placeholder='Write your thoughts here' rows={4} value={postData.content} onChange={handleInputChange}></textarea>
            <div className="createpost-button-section">
                {fileError}
                <p className='createpost-file-name'>{fileName}</p>
                <div className="createpost-upload-button">
                    <input disabled={guestMode} className="createpost-file" type="file" accept="image/*" onChange={handleFileChange}/>
                    <button disabled={guestMode} className="custom-file-upload" type="button" onClick={handleFileUpload}>Upload an image</button>
                </div>
                <button
                 className='createpost-input-button' type='submit'>Create Post</button>
            </div>
        </form>
    </div>
    )
}

export default HomeCreatePost;