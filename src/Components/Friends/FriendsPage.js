import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import SearchBar from "../Shared/SearchBar";
import FriendsList from "../Friends/FriendList";

const FriendsPage = ({theme, setTheme, isMobile, loadingStatus, setGuestMode, guestMode, isLoggedIn, loading, userData, setIsLoggedIn }) => {

    console.log(`guest mode: ${guestMode}`);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode && !loadingStatus) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode, loadingStatus]);
    console.log(isLoggedIn);

    useEffect(() => {
        if (guestMode) {
            navigate("/")
        }
    }, [loadingStatus]);

    const [friends, setFriends] = useState(null);

    useEffect(() => {
        if (userData) {
            const fetchFriends = async () => {
                const response = await fetch(`http://localhost:4000/api/users/${userData.updatedUser._id}/friends`);
                const friendsData = await response.json();
                setFriends(friendsData);
                console.log(friendsData);
            };    
            fetchFriends();
        }
    }, [userData])

    if (isMobile) {
        return (
            <div className="mobile-friends-container">
                <SearchBar friends={friends}/>
                <FriendsList friends={friends}/>
            </div>
        )
    }

    return(
        <div className="friends-component">
            <div className="friends-section-one">
                <SharedUser loading={loading} userData={userData} />
                <SharedNavigation />
                <SharedSettings setTheme={setTheme} theme={theme} setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className="friends-section-two">
                <SearchBar friends={friends}/>
                <FriendsList friends={friends}/>
            </div>
        </div>
    )
}

export default FriendsPage;