import '../../Styles/Home.css';
import { Link } from "react-router-dom";
import React from "react";

import HomeUser from "./HomeUser";
import HomeContacts from "./HomeContacts";
import HomeCreatePost from "./HomeCreatePost";
import HomeNavigation from "./HomeNavigation";
import HomeRequests from "./HomeRequests";

const Home = () => {

    const handleLogoutSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        const response = await fetch("http://localhost:4000/auth/logout");
        const message = await response.json();
        console.log(message);
    };
    
    return (
        <div className="home-component">
            <div className='home-section-one'>
                <HomeUser />
                <HomeNavigation />
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
            <Link to={"/signup"}>Signup</Link>

            <button className="logout-button" type="submit" onClick={handleLogoutSubmit}>Logout</button> */}
        </div>
    )
}

export default Home;