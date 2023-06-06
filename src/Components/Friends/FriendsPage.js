import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SharedUser from "../Shared/User";
import SharedNavigation from "../Shared/Navigation";
import SharedSettings from "../Shared/Settings";
import SearchBar from "../Shared/SearchBar";
import FriendsList from "../Friends/FriendList";

const FriendsPage = ({setGuestMode, guestMode, isLoggedIn, loading, userData, setIsLoggedIn }) => {

    console.log(`guest mode: ${guestMode}`);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn && !guestMode) {
            navigate("/login");
        }
    }, [isLoggedIn, guestMode]);
    console.log(isLoggedIn);

    useEffect(() => {
        if (guestMode) {
            navigate("/")
        }
    }, []);

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

    return(
        <div className="friends-component">
            <div className="friends-section-one">
                <SharedUser loading={loading} userData={userData} />
                <SharedNavigation />
                <SharedSettings setGuestMode={setGuestMode} setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className="friends-section-two">
                <SearchBar friends={friends}/>
                <FriendsList friends={friends}/>
            </div>
        </div>
    )
}

export default FriendsPage;