import '../../Styles/UserIndexPage.css';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const UserList = ({loading, userData}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // fetch just friends
    useEffect(() => {
        if (userData) {
            const fetchUsers = async () => {
                try {
                    console.log("FETCHING USERS NOW")
                    const response = await fetch(`http://localhost:4000/api/user/${userData.updatedUser._id}/unadded-users`);
                    const data = await response.json();
                    setData(data);
                    setIsLoading(false);
                    console.log(data);
                } catch (err) {
                    setError(err);
                    setIsLoading(false);
                }
            };
            fetchUsers();
        }
        console.log("Currently no valid user data");
    }, [userData]);

    if (isLoading) {
        return <div className='userindex-request-section'>Loading...</div>
        
    }

    if (error) {
        return <div className='userindex-request-section'>Error: {error.message}</div>
    }

    
    return (
        <div className='userindex-section-two'>
            <div className='userlist-grid'>
                {data.map((user, index) => {
                    return (
                    <div key={index} className='userindex-user-card'>
                        <Link to={`/user/${user._id}`}><img className="userindex-user-profilepicture" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt="Image" /></Link>
                        <Link to={`/user/${user._id}`}><h5>{user.first_name} {user.last_name}</h5></Link>

                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserList;