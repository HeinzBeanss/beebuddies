import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import SearchBar from "../Shared/SearchBar";
import UserList from "../UserList/UserList";
import UserIndex from "../UserList/UserIndexRequests";

const UserIndexPage = ({setTheme, theme, isMobile, loadingStatus, setGuestMode, guestMode, isLoggedIn, userData, setIsLoggedIn, setRefreshUserData }) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode && !loadingStatus) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode, loadingStatus]);

    const [refreshData, setRefreshData] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (userData && refreshData) {
            const fetchUsers = async () => {
                try {
                    let url = `https://beebuddies.up.railway.app/api/user/${userData.updatedUser._id}/unadded-users`;
                    if (guestMode) {
                        url += '?guestMode=true';
                      }
                    const response = await fetch(url);
                    const data = await response.json();
                    setData(data);
                    setRefreshData(false);
                } catch (err) {

                }
            };
            fetchUsers();
        }
    }, [userData, refreshData]);

    if (isMobile) {
        return (
            <div className="mobile-userindex-container">
                <UserIndex guestMode={guestMode} data={data} setRefreshData={setRefreshData} userData={userData}/>
                <SearchBar guestMode={guestMode} friends={data}/>
                <UserList guestMode={guestMode} data={data} setRefreshData={setRefreshData} userData={userData}/>
            </div>
        )
    }
    return (
        <div className="userindex-component">
            <div className="userindex-section-one">
                <SharedUser guestMode={guestMode} userData={userData} />
                <SharedNavigation guestMode={guestMode}/>
                <SharedSettings guestMode={guestMode} setTheme={setTheme} theme={theme} setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} userData={userData}/>
            </div>
            <div className='userindex-section-two'>
                <UserIndex guestMode={guestMode} data={data} setRefreshData={setRefreshData} userData={userData}/>
                <SearchBar guestMode={guestMode} friends={data}/>
                <UserList guestMode={guestMode} data={data} setRefreshData={setRefreshData} userData={userData}/>
            </div>
            
        </div>
    )
}

export default UserIndexPage;