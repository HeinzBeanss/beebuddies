import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import UserPostContainer from "./UserPostContainer";
import UserPageUser from "./UserPageUser";
import UserPhotos from "./UserPhotos";
import UserFriends from "./UserFriends";
import Settings from "../Shared/Settings";


const UserPage = ({ setIsLoggedIn, userData }) => {
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
            <div className="user-section-one">
                <UserPageUser targetUser={targetUser} />
                <UserPhotos targetUser={targetUser} />
                <UserFriends targetUser={targetUser} />
                <Settings setIsLoggedIn={setIsLoggedIn} userData={userData} />
            </div>
            <div className="user-section-two">
                <UserPostContainer setRefreshData={setRefreshData} targetUser={targetUser} userData={userData} />
            </div>
        </div>
    )
}

export default UserPage;