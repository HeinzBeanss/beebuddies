import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";

import UserPostContainer from "./UserPostContainer";
import UserPageUser from "./UserPageUser";
import UserPhotos from "./UserPhotos";
import UserFriends from "./UserFriends";
import Settings from "../Shared/Settings";


const UserPage = ({setTheme, theme, isMobile, loadingStatus, setGuestMode, guestMode, isLoggedIn, setIsLoggedIn, userData, setRefreshMainUserData}) => {

    console.log(`guest mode: ${guestMode}`);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode && !loadingStatus) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode, loadingStatus]);
    console.log(isLoggedIn);

    const { userId } = useParams();
    const [targetUser, setTargetUser] = useState(null);
    const [refreshData, setRefreshData] = useState(true);

    useEffect(() => {
        setRefreshData(true);
    }, [userId]);

    useEffect(() => {
        if (userData) {
            if (userId === userData.updatedUser._id) {
                navigate("/profile");
            }
            console.log(refreshData);
            if (refreshData) {
                const fetchUserInfo = async () => {
                    const response = await fetch(`http://localhost:4000/api/users/${userId}`);
                    const targetUserData = await response.json();
                    setTargetUser(targetUserData);
                    setRefreshData(false);
                };    
                fetchUserInfo();
            }
        }
    }, [refreshData, userData])
    return (
        <div className="user-page">
            {targetUser ? (
                <img className="user-banner" src={`data:${targetUser.banner.contentType};base64,${targetUser.banner.data}`} alt="Image" />
            ) :
            <div className="user-banner"></div>}
            <div className="user-page-content">
                <div className="user-section-one">
                    <UserPageUser guestMode={guestMode} setRefreshMainUserData={setRefreshMainUserData} setRefreshData={setRefreshData} userData={userData} targetUser={targetUser} />
                    <UserFriends targetUser={targetUser} />
                    <UserPhotos isMobile={isMobile} guestMode={guestMode} setRefreshData={setRefreshData} userData={userData} targetUser={targetUser} />
                    <Settings guestMode={guestMode} setTheme={setTheme} theme={theme} setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} userData={userData} />
                </div>
                <div className="user-section-two">
                    <UserPostContainer isMobile={isMobile} guestMode={guestMode} setRefreshData={setRefreshData} targetUser={targetUser} userData={userData} />
                </div>
            </div>
        </div>
    )
}

export default UserPage;