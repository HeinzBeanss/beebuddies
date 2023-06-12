import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import SearchBar from "../Shared/SearchBar";
import FriendsList from "../Friends/FriendList";

const FriendsPage = ({theme, setTheme, isMobile, loadingStatus, setGuestMode, guestMode, isLoggedIn, loading, userData, setIsLoggedIn }) => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode && !loadingStatus) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode, loadingStatus]);

    useEffect(() => {
        if (guestMode) {
            navigate("/")
        }
    }, [loadingStatus]);

    const [friends, setFriends] = useState(null);

    useEffect(() => {
        if (userData) {
            const fetchFriends = async () => {
                const response = await fetch(`https://beebuddies.up.railway.app/api/users/${userData.updatedUser._id}/friends`);
                const friendsData = await response.json();
                setFriends(friendsData);
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
                <SharedSettings guestMode={guestMode} setTheme={setTheme} theme={theme} setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} userData={userData}/>
            </div>
            <div className="friends-section-two">
                <SearchBar friends={friends}/>
                <FriendsList friends={friends}/>
            </div>
        </div>
    )
}

export default FriendsPage;