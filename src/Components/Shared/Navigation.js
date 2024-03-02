import { Link } from "react-router-dom";
import React, { useState } from "react";

import Hive from "../../Assets/honey.svg";
import Home from "../../Assets/home-outline.svg";
import Profile from "../../Assets/person-circle-outline.svg";
import Friends from "../../Assets/people-circle-outline.svg";
import Photos from "../../Assets/image-outline.svg";

import HiveHover from "../../Assets/honey-hover.svg";
import HomeHover from "../../Assets/home.svg";
import ProfileHover from "../../Assets/person-circle.svg";
import FriendsHover from "../../Assets/people-circle.svg";
import PhotosHover from "../../Assets/image.svg";

const Navigation = ({ guestMode }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const navItems = [
    {
      id: 1,
      title: 'Home',
      svg: Home,
      svgHover: HomeHover,
      path: '/',
    },
    {
      id: 2,
      title: 'Profile',
      svg: Profile,
      svgHover: ProfileHover,
      path: '/profile',
      disabled: guestMode, // Disable if guestMode is true
    },
    {
      id: 3,
      title: 'Buddies',
      svg: Friends,
      svgHover: FriendsHover,
      path: '/friends',
      disabled: guestMode, // Disable if guestMode is true
    },
    {
      id: 4,
      title: 'The Hive',
      svg: Hive,
      svgHover: HiveHover,
      path: '/users',
    },
    {
      id: 5,
      title: 'Photos',
      svg: Photos,
      svgHover: PhotosHover,
      path: '/photos',
      disabled: guestMode, // Disable if guestMode is true
      isLast: true,
    },
  ];

  return (
    <div className="nav-outer">
      <h4 className="outer-title">Navigation</h4>
      <div className="nav-section">
        {navItems.map((item, index) => (
          <div
            key={item.id}
            className={` ${item.isLast ? 'last' : 'nav-section-item'}`}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="nav-section-image"
              src={hoveredItem === item.id ? item.svgHover : item.svg}
              alt={item.title}
            />
            {item.path ? (
              item.disabled ? (
                <h4 className="nav-section-title disabled">{item.title}</h4>
              ) : (
                <Link to={item.path}>
                  <h4 className="nav-section-title">{item.title}</h4>
                </Link>
              )
            ) : (
              <h4 className="nav-section-title">{item.title}</h4>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};



export default Navigation;