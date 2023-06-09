import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import CreatePost from "../Home/HomeCreatePost";
import ProfilePostContainer from "./ProfilePostContainer";
import ProfilePageUser from "./ProfilePageUser";
import UserPhotos from "../User/UserPhotos";
import UserFriends from "../User/UserFriends";
import Settings from "../Shared/Settings";


const ProfilePage = ({theme, setTheme, isMobile, loadingStatus, setGuestMode, guestMode, isLoggedIn, setRefreshMainUserData, setIsLoggedIn, userData }) => {

    console.log(`guest mode: ${guestMode}`);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode && !loadingStatus) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode, loadingStatus]);
    console.log(isLoggedIn);

    useEffect(() => {
        if (guestMode) {
            navigate("/")
        }
    }, [loadingStatus]);

    const [profileUser, setProfileUser] = useState(null);
    const [refreshData, setRefreshData] = useState(true);

    // const [bannerFile, setBannerFile] = useState(null);
    const [bannerFeedback, setbannerFeedback] = useState("");


    useEffect(() => {
        if (userData && refreshData) {
            const fetchUserInfo = async () => {
                const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}`);
                const profileUserData = await response.json();
                setProfileUser(profileUserData);
                setRefreshData(false);
            };    
            fetchUserInfo();
        }
    }, [refreshData, userData])

    const handleFileUpload = () => {
        const fileInput = document.querySelector('.createpost-file-banner');
        setbannerFeedback("");
        fileInput.click();
    };

    const handleFileChange = async (e) => {
        console.log("pressed the handlefilechange banner");
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

        console.log(file);
        // Validate File Size
        if (file.size > 4 * 1024 * 1024) {
            setbannerFeedback(<div className='createpost-file-error'>Sorry, your file was too big for your banner. (Over 4MB)</div>)
            e.target.value = "";
            return;
        } 
        if (!allowedFileTypes.includes(file.type)) {
            setbannerFeedback(<div className='createpost-file-error'>{file.type} isn't a supported file type for your banner.</div>);
            e.target.value = "";
            return;
        }
        setbannerFeedback("");
        console.log(file);

        // It's all good, now upload the photo, then refresh the data.
        console.log("Attempting to upload new Profile Banner");
        const formData = new FormData();
        formData.append("image", file);
        formData.append("mimeType", file.type);
        const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/update-banner`, {
            method: "PUT",
            body: formData,
        });
        const message = await response.json();
        console.log(message);
        setRefreshData(true);
    }

    return (
        <div className="profile-page">
            {profileUser ? (
                <div className="profile-banner">
                    <input className="createpost-file-banner" type="file" accept="image/*" onChange={handleFileChange}/>
                    <button className="banner-button" onClick={handleFileUpload}>Update Banner</button>
                    <img className="profile-banner" src={`data:${profileUser.banner.contentType};base64,${profileUser.banner.data}`} alt="Image" />
                </div>
            ) :
            <div className="profile-banner"></div>}
            <div className="profile-page-content">
            <div className="profile-section-one">
                <ProfilePageUser setBannerFeedback={setbannerFeedback} setRefreshMainUserData={setRefreshMainUserData} profileUser={profileUser} setRefreshData={setRefreshData}/>
                <UserFriends targetUser={profileUser} />
                <UserPhotos isMobile={isMobile} setRefreshData={setRefreshData} userData={userData} targetUser={profileUser} />
                <Settings guestMode={guestMode} setTheme={setTheme} theme={theme} setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} userData={userData} />
            </div>
            <div className="profile-section-two">
                <div className="banner-feedback">{bannerFeedback}</div>
                <CreatePost refreshData={refreshData} setRefreshData={setRefreshData} userData={userData} />
                <ProfilePostContainer isMobile={isMobile} setRefreshData={setRefreshData} profileUser={profileUser} userData={userData} />
            </div>
            </div>
        </div>
    )
}

export default ProfilePage;