import '../../Styles/Home.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SharedSettings = ({setIsLoggedIn}) => {
    const navigate = useNavigate();

    // DARK/LIGHT THEME 
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };
    useEffect(() => {
      document.body.className = theme;
    }, [theme])

    const handleLogoutSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        const response = await fetch("http://localhost:4000/auth/logout");
        const message = await response.json();
        console.log(message);
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className='shared-settings-section'>
            <div className='settings-switchtheme'>
                <button className='settings-switchtheme-button' onClick={toggleTheme}>Switch Theme</button>
            </div>
            <div className='settings-logout'>
                <button className="settings-logout-button" type="submit" onClick={handleLogoutSubmit}>Logout</button>
            </div>

        </div>
    )
}

export default SharedSettings;