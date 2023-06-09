import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import UserPhotos from "../User/UserPhotos";

const PhotosPage = ({setTheme, theme, isMobile, loadingStatus, setGuestMode, guestMode, isLoggedIn, userData, setIsLoggedIn}) => {

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

    const [refreshData, setRefreshData] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (userData && refreshData) {
            const fetchUsers = async () => {
                try {
                    console.log("FETCHING USERS NOW")
                    const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}`);
                    const data = await response.json();
                    setData(data);
                    setRefreshData(false);
                    console.log(data);
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