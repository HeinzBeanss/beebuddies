import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import UserPhotos from "../User/UserPhotos";

const PhotosPage = ({setTheme, theme, isMobile, loadingStatus, setGuestMode, guestMode, isLoggedIn, userData, setIsLoggedIn}) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode && !loadingStatus) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode, loadingStatus]);

    useEffect(() => {
        if (guestMode) {
            navigate("/")
        }
    }, [loadingStatus]);

    const [refreshData, setRefreshData] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (userData && refreshData) {
            const fetchUsers = async () => {
                try {
                    const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}`);
                    const data = await response.json();
                    setData(data);
                    setRefreshData(false);
                } catch (err) {

                }
            };
            fetchUsers();
        }
    }, [userData, refreshData]);

    if (isMobile) {
        return (
            <div className="mobile-userindex-container">
                <UserPhotos isMobile={isMobile} targetUser={data} setRefreshData={setRefreshData} userData={userData}/>
            </div>
        )
    }
    return (
        <div className="userindex-component">
            <div className="userindex-section-one">
                <SharedUser userData={userData} />
                <SharedNavigation />
                <SharedSettings guestMode={guestMode} setTheme={setTheme} theme={theme} setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} userData={userData}/>
            </div>
            <div className='userindex-section-two'>
                <UserPhotos targetUser={data} setRefreshData={setRefreshData} userData={userData}/>
            </div>
            
        </div>
    )
}

export default PhotosPage;