import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import UserPhotos from "../User/UserPhotos";

const PhotosPage = ({userData, setIsLoggedIn}) => {

    const [refreshData, setRefreshData] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (userData && refreshData) {
            const fetchUsers = async () => {
                try {
                    console.log("FETCHING USERS NOW")
                    const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}`);
                    const data = await response.json();
                    setData(data);
                    setRefreshData(false);
                    console.log(data);
                } catch (err) {

                }
            };
            fetchUsers();
        }
    }, [userData, refreshData]);

    return (
        <div className="userindex-component">
            <div className="userindex-section-one">
                <SharedUser userData={userData} />
                <SharedNavigation />
                <SharedSettings setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='userindex-section-two'>
                <UserPhotos targetUser={data} setRefreshData={setRefreshData} userData={userData}/>
            </div>
            
        </div>
    )
}

export default PhotosPage;