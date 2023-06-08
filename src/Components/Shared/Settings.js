import '../Home/Home.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logout from "../../Assets/log-out-outline.svg";
import logoutHover from "../../Assets/log-out.svg";
import sun from "../../Assets/sunny-outline.svg";
import sunHover from "../../Assets/sunny.svg";
import moon from "../../Assets/moon-outline.svg";
import moonHover from "../../Assets/moon.svg";

const SharedSettings = ({isMobile, theme, setTheme, openSettingsComponent, setOpenSettingsComponent, setGuestMode, setIsLoggedIn}) => {
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
        const response = await fetch("http://localhost:4000/auth/logout");
        const message = await response.json();
        console.log(message);
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
      }, {
        id: 2,
        title: "Log out",
        svg: logout,
        svgHover: logoutHover,
        action: handleLogoutSubmit,
        isLast: true,
      }
    ];

    if (isMobile) {
      return (
      <div className="mobile-settings-overlay" onClick={() => setOpenSettingsComponent(false)}>
        <div className='mobile-settings'>
        {settingsItems.map((item) => (
                <div key={item.id} className={item.isLast ? 'settings-section-item last' : 'settings-section-item'} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} onClick={item.action}>
                    <img className="settings-section-svg" src={hoveredItem === item.id ? item.svgHover : item.svg} alt={item.title}></img>
                    <h4 className="settings-section-title">{item.title}</h4>
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
            {settingsItems.map((item) => (
                <div key={item.id} className={item.isLast ? 'settings-section-item last' : 'settings-section-item'} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} onClick={item.action}>
                    <img className="settings-section-svg" src={hoveredItem === item.id ? item.svgHover : item.svg} alt={item.title}></img>
                    <h4 className="settings-section-title">{item.title}</h4>
                </div>
            ))}
          </div>
        </div>
    )
}

export default SharedSettings;