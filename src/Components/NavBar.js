import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SharedSettings from "./Shared/Settings";

import Hive from "../Assets/honey.svg";
import Home from "../Assets/home-outline.svg";
import Profile from "../Assets/person-circle-outline.svg";
import Friends from "../Assets/people-circle-outline.svg";
import Photos from "../Assets/image-outline.svg";
// import MenuHover from "../Assets/settings.svg";

import HiveHover from "../Assets/honey-hover.svg";
import HomeHover from "../Assets/home.svg";
import ProfileHover from "../Assets/person-circle.svg";
import FriendsHover from "../Assets/people-circle.svg";
import PhotosHover from "../Assets/image.svg";
import Menu from "../Assets/settings-outline.svg";

import whitemode from "../Assets/a4.png";

const NavBar = ({isMobile, guestMode, theme, setTheme, userData, setIsLoggedIn, setGuestMode}) => {

    const navItems = [
        {
          id: 1,
          svg: Home,
          svgHover: HomeHover,
          path: '/',
        },
        {
          id: 2,
          svg: Profile,
          svgHover: ProfileHover,
          path: '/profile',
          disabled: guestMode, // Disable if guestMode is true
        },
        {
          id: 3,
          svg: Friends,
          svgHover: FriendsHover,
          path: '/friends',
          disabled: guestMode, // Disable if guestMode is true
        },
        {
          id: 4,
          svg: Hive,
          svgHover: HiveHover,
          path: '/users',
        },
        {
          id: 5,
          svg: Photos,
          svgHover: PhotosHover,
          path: '/photos',
          disabled: guestMode, // Disable if guestMode is true
          isLast: true,
        },
      ];

    const [openSettingsComponent, setOpenSettingsComponent] = useState(false);
    const openSettings = () => {
        setOpenSettingsComponent(true);
    }

    if (isMobile) {
        return (
            <div className="mobile-nav">
                {navItems.map(item => {
                   return item.disabled ? (
                     <div key={item.id} className="mobile-nav-link disabled">
                       <img className="mobile-nav-item" src={item.svg} alt={item.title} />
                     </div>
                   ) : (
                     <Link key={item.id} className="mobile-nav-link" to={item.path}>
                       <img className="mobile-nav-item" src={item.svg} alt={item.title} />
                     </Link>
                   );
                 })}
                <img src={Menu} className={`mobile-nav-item`} onClick={openSettings}></img>
                {openSettingsComponent ? <SharedSettings
                guestMode={guestMode}
                userData={userData}
                setTheme={setTheme} theme={theme}
                openSettingsComponent={openSettingsComponent}
                setOpenSettingsComponent={setOpenSettingsComponent}
                isMobile={isMobile}
                setGuestMode={setGuestMode}
                setIsLoggedIn={setIsLoggedIn} /> : null}
            </div>
        )
    }

    if (!userData) {
        return (
            <div className='navbar-loading'>Loading...</div>
        )
    }

    return(
        <div className="navigation-component">
            <div className="navigation-content">
                <Link to={"/"}><img className="nav-logo" src={whitemode}></img></Link>
            </div>
        </div>
    )

}

export default NavBar;