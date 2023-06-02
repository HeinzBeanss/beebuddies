import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ friends }) => {

    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    }

    if (!friends) {
        return (
        <div className="friendlist-loading">Loading...</div>
            )
    }

    return (
        <div className="friendlist-section-search">
                <input className="search-section-searchbar" placeholder="Search for buddies" value={value} onChange={onChange}></input>
                <div className="search-section-dropdown">
                    {friends.filter(friend => {
                        const searchTerm = value.toLowerCase();
                        const friendsName = friend.first_name.toLowerCase();

                        return searchTerm && friendsName.startsWith(searchTerm)
                    })
                    .map((friend) => ( 
                        <Link className="search-section-dropdown-row" key={friend._id} to={`/user/${friend._id}`}>{friend.first_name} {friend.last_name}</Link>
                    ))}
                </div>
            </div>
    )
}

export default SearchBar;