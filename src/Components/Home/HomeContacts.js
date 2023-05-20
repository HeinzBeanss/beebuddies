import '../../Styles/Home.css';
import { Link } from "react-router-dom";
import React from "react";

const HomeContacts = () => {

    // fetch just friends
    
    return (
        <div className='home-contacts-section'>
        <div className='contact-section-item'>
            <div className='temp-user'></div>
            <h5 className='contact-item-name'>Friend Name</h5>
        </div>
    </div>
    )
}

export default HomeContacts;