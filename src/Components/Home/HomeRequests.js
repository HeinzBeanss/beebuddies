import '../../Styles/Home.css';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const HomeRequests = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/users/:id/friend-requests");
                const data = await response.json();
                setData(data);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        } 
        fetchData();
    }, [])

    if (isLoading) {
        return <div className='home-request-section'>Loading...</div>
        
    }

    if (error) {
        return <div className='home-request-section'>Error: {error.message}</div>
    }

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