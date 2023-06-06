import '../Home/Home.css';
import "../Shared/Shared.css";
import { Link } from "react-router-dom";
import React from "react";
import defaultpfp from "../../Assets/default_bee_profile.jpg";


const HomeUser = ({guestMode, loading, userData}) => {
    console.log("below")
    console.log(userData);

    if (userData == null) {
        return (
        <div className='home-user-section'>
            <div className='user-section-image'></div>
            <h4 className='user-section-name'>Not Signed In</h4>
        </div>            
        )
    }

    if (userData) {
        return (
            <div className='user-section'>
                    <Link className="user-profilepicture-medium" to={`/profile`}><img className="user-profilepicture-medium" src={guestMode ? defaultpfp : `data:${userData.updatedUser.profile_picture.contentType};base64,${userData.updatedUser.profile_picture.data}`} alt="Image" /></Link>
                <div className='home-user-section-info'>
                    <p className='user-section-signinas'>Signed in as...</p>
                    {guestMode ? <h4 className='user-section-name link'>{userData.updatedUser.first_name}</h4> : <Link to={`/profile`}><h4 className='user-section-name link'>{userData.updatedUser.first_name}</h4></Link>}
                </div>
            </div>
        )
    }

}

export default HomeUser;
