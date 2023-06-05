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
          <h4 className="search-section-title">Search for users</h4>
          <input
            className="search-section-searchbar"
            placeholder="John Smith"
            value={value}
            onChange={onChange}
          />
          {value.length > 0 && (
            <div className="searchbar-container">
              <div className="search-section-dropdown">
                {friends
                  .filter((friend) => {
                    const searchTerm = value.toLowerCase();
                    const friendsName = friend.first_name.toLowerCase();
                    return searchTerm && friendsName.startsWith(searchTerm);
                  })
                  .map((friend) => (
                    <Link
                      className="search-section-dropdown-row"
                      key={friend._id}
                      to={`/user/${friend._id}`}
                    >
                      {friend.first_name} {friend.last_name}
                    </Link>
                  ))}
                {value.length > 0 && friends.filter((friend) => {
                  const searchTerm = value.toLowerCase();
                  const friendsName = friend.first_name.toLowerCase();
                  return searchTerm && friendsName.startsWith(searchTerm);
                }).length === 0 && (
                  <p className="search-section-dropdown-row">No users found</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
      
}

export default SearchBar;