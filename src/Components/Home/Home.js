import '../Home/Home.css';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings"
import HomeContacts from "./HomeContacts";
import HomeCreatePost from "./HomeCreatePost";
import HomeRequests from "./HomeRequests";
import HomePostContainer from "../Home/HomePostContainer";

const Home = ({ loading, userData, setIsLoggedIn}) => {
    
    const [refreshData, setRefreshData] = useState(true);

    return (
        <div className="home-component">
            <div className='home-section-one'>
                <SharedUser loading={loading} userData={userData} />
                <SharedNavigation />
                <SharedSettings setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='home-section-two'>
                <HomeCreatePost refreshData={refreshData} setRefreshData={setRefreshData} userData={userData}/>
                <HomePostContainer refreshData={refreshData} setRefreshData={setRefreshData} userData={userData}/>
            </div>
            <div className='home-section-three'>
                <HomeRequests userData={userData}/>
                <HomeContacts userData={userData}/>
            </div>



            {/* <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link> */}

        </div>
    )
}

export default Home;