import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import SearchBar from "../Shared/SearchBar";
import UserList from "../UserList/UserList";
import UserIndex from "../UserList/UserIndexRequests";

const UserIndexPage = ({ userData, setIsLoggedIn, setRefreshUserData }) => {

    const [refreshData, setRefreshData] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (userData && refreshData) {
            const fetchUsers = async () => {
                try {
                    console.log("FETCHING USERS NOW")
                    const response = await fetch(`http://localhost:4000/api/user/${userData.updatedUser._id}/unadded-users`);
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
                <UserIndex data={data} setRefreshData={setRefreshData} userData={userData}/>
                <SearchBar friends={data}/>
                <UserList data={data} setRefreshData={setRefreshData} userData={userData}/>
            </div>
            
        </div>
    )
}

export default UserIndexPage;