import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import ProfilePostContainer from "./ProfilePostContainer";
import ProfilePageUser from "./ProfilePageUser";
import UserPhotos from "../User/UserPhotos";
import UserFriends from "../User/UserFriends";
import Settings from "../Shared/Settings";


const ProfilePage = ({ setIsLoggedIn, userData }) => {

    const [profileUser, setProfileUser] = useState(null);
    const [refreshData, setRefreshData] = useState(true);

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

    return (
        <div className="user-page">
            <div className="profile-section-one">
                <ProfilePageUser profileUser={profileUser} />
                <UserPhotos targetUser={profileUser} />
                <UserFriends targetUser={profileUser} />
                <Settings setIsLoggedIn={setIsLoggedIn} userData={userData} />
            </div>
            <div className="profile-section-two">
                <ProfilePostContainer setRefreshData={setRefreshData} profileUser={profileUser} userData={userData} />
            </div>
        </div>
    )
}

export default ProfilePage;