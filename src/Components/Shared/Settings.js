import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logout from "../../Assets/log-out-outline.svg";
import logoutHover from "../../Assets/log-out.svg";
import sun from "../../Assets/sunny-outline.svg";
import sunHover from "../../Assets/sunny.svg";
import moon from "../../Assets/moon-outline.svg";
import moonHover from "../../Assets/moon.svg";
import remove from "../../Assets/close-circle-outline.svg";
import removeHover from "../../Assets/close-circle.svg";

const SharedSettings = ({isMobile, theme, setTheme, openSettingsComponent, setOpenSettingsComponent, guestMode, setGuestMode, setIsLoggedIn, userData}) => {

  const [showDeleteAccountPrompt, setShowDeleteAccountPrompt] = useState(false);
  
  const showPrompt = () => {
    if (isMobile) {
      setOpenSettingsComponent(true);
    }
    setShowDeleteAccountPrompt(true);
  }

  const handleDeleteAccount = async () => {
    const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}`, {
      method: "DELETE",
    });
    const message = await response.json();
    console.log(message);
    localStorage.removeItem("token");
    localStorage.removeItem("isGuest");
    Cookies.remove("token");
    setIsLoggedIn(false);
    setGuestMode(false);
    navigate("/login");
  }

    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (item) => {
      setHoveredItem(item);
    };
  
    const handleMouseLeave = () => {
      setHoveredItem(null);
    };

    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      console.log(`just pressed: ${theme}`);
    };

    const handleLogoutSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("isGuest");
        Cookies.remove("token");
        setIsLoggedIn(false);
        setGuestMode(false);
        navigate("/login");
    };

    const settingsItems = [
      {
        id: 1,
        title: "Switch Theme",
        svg: theme === "light" ? sun : moon,
        svgHover: theme === "light" ? sunHover: moonHover,
        action: toggleTheme,
      },
       {
        id: 2,
        title: "Log out",
        svg: logout,
        svgHover: logoutHover,
        action: handleLogoutSubmit,

      },
      {
        id: 3,
        title: "Delete Account",
        svg: remove,
        svgHover: removeHover,
        action: guestMode ? (isMobile ? () => setOpenSettingsComponent(true) : null) : (isMobile ? handleDeleteAccount : showPrompt),
        isLast: true,
        disabled: guestMode,
      },
    ];

    if (isMobile) {
      return (
      <div className="mobile-settings-overlay" onClick={() => setOpenSettingsComponent(false)}>
        <div className='mobile-settings'>
        {settingsItems.map((item) => (
                <div key={item.id} className={item.isLast ? 'settings-section-item last' : 'settings-section-item'} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} onClick={item.action}>
                    <img className="settings-section-svg" src={hoveredItem === item.id ? item.svgHover : item.svg} alt={item.title}></img>
                    <h4 className={item.disabled ? "settings-section-title disabled" : "settings-section-title"}>{item.title}</h4>
                </div>
            ))}
        </div>
      </div>
      )
    }

    return (
        <div className="settings-outer">
          <h4 className='outer-title'>Settings</h4>
          <div className='shared-settings-section'>
          {showDeleteAccountPrompt ? 
          <div className='delete-account-overlay'>
            <div className="delete-account-container">
              <p className='delete-account-text'>Are you sure you want to delete your account?</p>
              <div className='delete-account-buttons'>
                <button className='delete-account-button' onClick={() => setShowDeleteAccountPrompt(false)}>Cancel</button>
                <button className='delete-account-button' onClick={handleDeleteAccount}>Confirm</button>
              </div>
            </div>
          </div>
          : null}
            {settingsItems.map((item) => (
                <div key={item.id} className={item.isLast ? 'settings-section-item last' : 'settings-section-item'} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} onClick={item.action}>
                    <img className="settings-section-svg" src={hoveredItem === item.id ? item.svgHover : item.svg} alt={item.title}></img>
                    <h4 className={item.disabled ? "settings-section-title disabled" : "settings-section-title"}>{item.title}</h4>
                </div>
            ))}
          </div>
        </div>
    )
}

export default SharedSettings;