import '../../Styles/Home.css';
import { Link } from "react-router-dom";
import React from "react";

const HomeNavigation = () => {
    return (
        <div className='home-nav-section'>
        <div className='nav-section-item'>
            <div className='nav-section-image'></div>
            <Link to={"/"}><h5 className='nav-section-title'>Home</h5></Link>
        </div>
        <div className='nav-section-item'>
            <div className='nav-section-image'></div>
            <Link to={"/profile"}><h5 className='nav-section-title'>Profile</h5></Link>
        </div>
        <div className='nav-section-item'>
            <div className='nav-section-image'></div>
            <Link to={"/friends"}><h5 className='nav-section-title'>Buddies</h5></Link>
        </div>
        <div className='nav-section-item'>
            <div className='nav-section-image'></div>
            <Link to={"/users"}><h5 className='nav-section-title'>The Hive</h5></Link>
        </div>
        <div className='nav-section-item last'>
            <div className='nav-section-image'></div>
            <h5 className='nav-section-title'>Photos</h5>
        </div>
    </div>
    )
}

export default HomeNavigation;