import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import HomeContacts from "./HomeContacts";
import HomeCreatePost from "./HomeCreatePost";
import HomeRequests from "./HomeRequests";
import HomePostContainer from "../Home/HomePostContainer";

const Home = ({setTheme, theme, isMobile, loadingStatus, guestMode, setGuestMode, loading, userData, isLoggedIn, setIsLoggedIn}) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode && !loadingStatus) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode, loadingStatus]);
    
    const [refreshData, setRefreshData] = useState(true);
    const [refreshPostData, setRefreshPostData] = useState(true);

    if (isMobile) {
        return (
            <div className="mobile-home-container">
                <HomeCreatePost isMobile={isMobile} setRefreshPostData={setRefreshPostData} refreshPostData={refreshPostData} guestMode={guestMode} refreshData={refreshData} setRefreshData={setRefreshData} userData={userData}/>
                <HomePostContainer isMobile={isMobile} setRefreshPostData={setRefreshPostData} refreshPostData={refreshPostData} guestMode={guestMode} refreshData={refreshData} setRefreshData={setRefreshData} userData={userData}/>
            </div>
        )
    }

    return (
        <div className="home-component">
            <div className='home-section-one'>
                <SharedUser guestMode={guestMode} loading={loading} userData={userData} />
                <SharedNavigation guestMode={guestMode}/>
                <SharedSettings guestMode={guestMode} setTheme={setTheme} theme={theme} setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} userData={userData}/>
            </div>
            <div className='home-section-two'>
                <HomeCreatePost isMobile={isMobile} setRefreshPostData={setRefreshPostData} refreshPostData={refreshPostData} guestMode={guestMode} refreshData={refreshData} setRefreshData={setRefreshData} userData={userData}/>
                <HomePostContainer isMobile={isMobile} setRefreshPostData={setRefreshPostData} refreshPostData={refreshPostData} guestMode={guestMode} refreshData={refreshData} setRefreshData={setRefreshData} userData={userData}/>
            </div>
            <div className='home-section-three'>
                <HomeRequests guestMode={guestMode} userData={userData} refreshData={refreshData} setRefreshData={setRefreshData} setRefreshPostData={setRefreshPostData}/>
                <HomeContacts guestMode={guestMode} userData={userData} refreshData={refreshData} setRefreshData={setRefreshData} setRefreshPostData={setRefreshPostData}/>
            </div>
        </div>
    )
}

export default Home;