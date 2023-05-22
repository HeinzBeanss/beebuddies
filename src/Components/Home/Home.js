import '../../Styles/Home.css';
import { Link, useNavigate } from "react-router-dom";
import React from "react";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings"
import HomeContacts from "./HomeContacts";
import HomeCreatePost from "./HomeCreatePost";
import HomeRequests from "./HomeRequests";

const Home = ({ loading, userData, setIsLoggedIn}) => {
    
    return (
        <div className="home-component">
            <div className='home-section-one'>
                <SharedUser loading={loading} userData={userData} />
                <SharedNavigation />
                <SharedSettings setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='home-section-two'>
                <HomeCreatePost />
                {/* {for each post, new section for each.} */}
            </div>
            <div className='home-section-three'>
                <HomeRequests />
                <HomeContacts />
            </div>



            {/* <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link> */}

        </div>
    )
}

export default Home;