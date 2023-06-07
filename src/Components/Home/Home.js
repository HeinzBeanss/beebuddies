import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import HomeContacts from "./HomeContacts";
import HomeCreatePost from "./HomeCreatePost";
import HomeRequests from "./HomeRequests";
import HomePostContainer from "../Home/HomePostContainer";

const Home = ({loadingStatus, guestMode, setGuestMode, loading, userData, isLoggedIn, setIsLoggedIn}) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode && !loadingStatus) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode, loadingStatus]);
    console.log(`guest mode: ${guestMode}`);
    console.log(`isLoggedin: ${isLoggedIn}`);
    
    const [refreshData, setRefreshData] = useState(true);
    const [refreshPostData, setRefreshPostData] = useState(true);

    return (
        <div className="home-component">
            <div className='home-section-one'>
                <SharedUser guestMode={guestMode} loading={loading} userData={userData} />
                <SharedNavigation guestMode={guestMode}/>
                <SharedSettings setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='home-section-two'>
                <HomeCreatePost setRefreshPostData={setRefreshPostData} refreshPostData={refreshPostData} guestMode={guestMode} refreshData={refreshData} setRefreshData={setRefreshData} userData={userData}/>
                <HomePostContainer setRefreshPostData={setRefreshPostData} refreshPostData={refreshPostData} guestMode={guestMode} refreshData={refreshData} setRefreshData={setRefreshData} userData={userData}/>
            </div>
            <div className='home-section-three'>
                <HomeRequests guestMode={guestMode} userData={userData} refreshData={refreshData} setRefreshData={setRefreshData}/>
                <HomeContacts guestMode={guestMode} userData={userData} refreshData={refreshData} setRefreshData={setRefreshData}/>
            </div>



            {/* <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link> */}

        </div>
    )
}

export default Home;