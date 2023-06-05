import '../Home/Home.css';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DateTime } from 'luxon';


const ProfilePageUser = ({profileUser, setRefreshData, setRefreshMainUserData}) => {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        bio: ""
      });
      
      useEffect(() => {
        if (profileUser) {
          setFormData({
            first_name: profileUser.first_name,
            last_name: profileUser.last_name,
            bio: profileUser.bio
          });
        }
      }, [profileUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const [isEditing, setIsEditing] = useState(false);

    const openEditWindow = () => {
        setIsEditing(true);
    }

    const closeEditWindow = () => {
        if (profileUser) {
            setFormData({
              first_name: profileUser.first_name,
              last_name: profileUser.last_name,
              bio: profileUser.bio
            });
          }
          setIsEditing(false);
    }

    const confirmEdit = async (e) => {
        console.log("test");
        e.preventDefault();
        const { first_name, last_name, bio } = formData;
        const response = await fetch(`http://localhost:4000/api/users/${profileUser._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ first_name, last_name, bio }),
        });
        const message = await response.json();
        console.log(message);
        setIsEditing(false);
        setRefreshData(true);
    };

    const handleFileUpload = () => {
        const fileInput = document.querySelector('.createpost-file-avatar');
        setAvatarFeedback("");
        fileInput.click();
    };

    const [avatarFeedback, setAvatarFeedback] = useState("");
    
    const handleFileChange = async (e) => {
        console.log("pressed the handlefilechange avatar");
        const file = e.target.files[0]; 
        if (!file) {
            console.log("actually no file was chosen");
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
        if (file.size > 2 * 1024 * 1024) {
            setAvatarFeedback(<div className='createpost-file-error'>Sorry, your file was too big. (Over 2MB)</div>)
            e.target.value = "";
            return;
        } 
        if (!allowedFileTypes.includes(file.type)) {
            setAvatarFeedback(<div className='createpost-file-error'>{file.type} isn't a supported file type for your banner.</div>);
            e.target.value = "";
            return;
        }
        setAvatarFeedback("");
        console.log(file);

        // It's all good, now upload the photo, then refresh the data.
        console.log("Attempting to upload new Profile Picture");
        const formData = new FormData();
        formData.append("image", file);
        formData.append("mimeType", file.type);
        const response = await fetch(`http://localhost:4000/api/users/${profileUser._id}/update-avatar`, {
            method: "PUT",
            body: formData,
        });
        const message = await response.json();
        console.log(message);
        setRefreshData(true);
        setRefreshMainUserData(true);
    }
     
    const formatTimestamp = (timestamp) => {
        const formattedTime = DateTime.fromISO(timestamp).toFormat("MMMM d yyyy");
        return formattedTime;
    }
    
    if (profileUser == null) {
        return (
        <div className='home-user-section'>
            <div className='user-section-image'></div>
            <h4 className='user-section-name'>Not Signed In</h4>
        </div>            
        )
    }

    if (profileUser) {
        if (!isEditing) {
            return (
                <div className='profile-user-section'>
                    <div className='avatar-feedback'>{avatarFeedback}</div>
                    <div className="profile-edit-buttons">
                        <button className='profile-edit-button' onClick={openEditWindow}>Edit Profile</button>
                        <button className='profile-edit-button' onClick={handleFileUpload}>Change Avatar</button>
                        <input className="createpost-file-avatar" type="file" accept="image/*" onChange={handleFileChange}/>
                        </div>
                    <div className="user-section-top">
                        <img className="user-profilepicture-large" src={`data:${profileUser.profile_picture.contentType};base64,${profileUser.profile_picture.data}`} alt="Image" />
                        <div className="user-section-info">
                            <h4 className='userpage-user-section-name'>{profileUser.first_name} {profileUser.last_name}</h4>
                            <p className='user-section-info-item'>Born: {formatTimestamp(profileUser.birthdate)}</p>
                            <p className='user-section-info-item'>Joined: {formatTimestamp(profileUser.date_created)}</p>
                        </div>
                    </div>
                    <p className='user-section-info-bio'>{profileUser.bio}</p>
    
                </div>
            )
        } else {
            return (
            <div className="profile-edit-section">
                <div className='profile-edit-content'>
                    <div className="profile-edit-top">
                        <h4 className='profile-edit-title'>Edit your profile info</h4>
                        <button className='profile-edit-button-cancel' onClick={closeEditWindow}>Cancel Edit</button>
                    </div>
                    <form className="profile-edit-form" onSubmit={confirmEdit}>
                        <div className="profile-edit-form-item">
                            <label htmlFor='first_name'>FIRST NAME</label>
                            <input className='profile-edit-input' id='first_name' name="first_name" value={formData.first_name} onChange={handleChange}></input>
                        </div>
                        <div className="profile-edit-form-item">
                            <label htmlFor='last_name'>LAST NAME</label>
                            <input className='profile-edit-input' id='last_name' name="last_name" value={formData.last_name} onChange={handleChange}></input>
                        </div>
                        <div className="profile-edit-form-item">
                            <label htmlFor='bio'>BIO</label>
                            <textarea className='profile-edit-textarea' id='bio' name="bio" value={formData.bio} onChange={handleChange} rows={3}></textarea>
                        </div>
                    <button className='profile-edit-button-confirm' type='submit'>Confirm</button>
                    </form>
                </div>
            </div>
            )
        }
    }

}

export default ProfilePageUser;