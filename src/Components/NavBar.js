import '../Styles/Nav.css';
import React, { useState, useEffect } from "react";
import { Buffer } from 'buffer';


const NavBar = (props) => {

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

    // if (!props.userData || !props.userData.updatedUser || !props.userData.updatedUser.profile_picture) {
    //     return null; // Or render a loading indicator
    //   }
    
    return(
        <div className="navigation-component">
            <div className="navigation-content">
                <div className="nav-left-side">
                    <div>logo</div>
                    <div>title</div>
                </div>
                <div className="nav-right-side">
                    <div className="nav-search">
                        search
                    </div>
                    <div className="create">create</div>
                    {/* <img src={`data:${props.userData.updatedUser.profile_picture.conentType};base64,${props.userData.updatedUser.profile_picture.data}`} alt="Image" /> */}
                    <button onClick={toggleTheme}>Theme</button>
                </div>

            </div>
        </div>
    )
}

export default NavBar;