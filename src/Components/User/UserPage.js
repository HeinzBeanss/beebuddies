import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import UserPostContainer from "./UserPostContainer";
import UserPageUser from "./UserPageUser";
import UserPhotos from "./UserPhotos";
import UserFriends from "./UserFriends";
import Settings from "../Shared/Settings";


const UserPage = ({ setIsLoggedIn, userData, setRefreshMainUserData}) => {
    const navigate = useNavigate();
    const location = useLocation();

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
                    <UserPageUser setRefreshMainUserData={setRefreshMainUserData} setRefreshData={setRefreshData} userData={userData} targetUser={targetUser} />
                    <UserFriends targetUser={targetUser} />
                    <UserPhotos setRefreshData={setRefreshData} userData={userData} targetUser={targetUser} />
                    <Settings setIsLoggedIn={setIsLoggedIn} userData={userData} />
                </div>
                <div className="user-section-two">
                    <UserPostContainer setRefreshData={setRefreshData} targetUser={targetUser} userData={userData} />
                </div>
            </div>
        </div>
    )
}

export default UserPage;