import React from "react";
import { Link } from "react-router-dom";

const FriendList = ({ friends }) => {

    if (!friends) {
        return (
            <div className="friendlist-loading">Loading...</div>
        )
    }

    return (
        <div className="friendlist-section">
            <div className='friendlist-section-grid'>
                { friends.length > 0 ? (
                    friends.map((user, index) => {
                        return (
                            <div className='friendlist-card' key={index}>
                                <Link className="friend-pfp" to={`/user/${user._id}`}><img className="friend-pfp" src={`data:${user.profile_picture.contentType};base64,${user.profile_picture.data}`} alt={`${user.first_name} profile`} /></Link>
                                <Link to={`/user/${user._id}`}><h5 className='friendlist-username'>{user.first_name} {user.last_name}</h5></Link>
                                <p className="friendlist-bio">{user.bio}</p>
                            </div>
                        )
                    })
                ) : (
                    <div className="home-contacts-loading">You have no friends added, find some at <Link to={"/users"}>the Hive!</Link></div>
                )}
            
                </div>
        </div>
    )
}

export default FriendList;