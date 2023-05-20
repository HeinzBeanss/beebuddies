import '../../Styles/Home.css';
import { Link } from "react-router-dom";
import React from "react";

const HomeRequests = () => {

    // fetch just friend requests.

    return (
        <div className='home-request-section'>
        <div className='request-section-item'>
            <div className="request-item-top">
                <div className='temp-user'></div>
                <div className='request-item-top-right'>
                    <h5 className='request-item-name'>Friend Name</h5>
                    <p className='request-item-mutuals'>5 Mutual Friends</p>
                </div>
            </div>
            <div className="request-item-bottom">
                <button className='request-accept-button'>Accept</button>
                <button className='request-deny-button'>Deny</button>
            </div>
        </div>
           
            {/* for each request */}
        </div>
    )
}

export default HomeRequests;