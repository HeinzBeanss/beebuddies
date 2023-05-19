import '../Styles/Home.css';
import { Link } from "react-router-dom";
import React from "react";

const Home = () => {

    const handleLogoutSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        const response = await fetch("http://localhost:4000/auth/logout");
        const message = await response.json();
        console.log(message);
    };
    
    return (
        <div className="home-component">
            <div className='home-section-one'>
                <div className='home-user-section'>
                    <h4>Username</h4>
                </div>

                <div className='home-nav-section'>
                    <div className='nav-section-item'>
                        <div className='nav-section-image'></div>
                        <h5 className='nav-section-title'>Home</h5>
                    </div>
                    <div className='nav-section-item'>
                        <div className='nav-section-image'></div>
                        <h5 className='nav-section-title'>Buddies</h5>
                    </div>
                    <div className='nav-section-item'>
                        <div className='nav-section-image'></div>
                        <h5 className='nav-section-title'>The Hive</h5>
                    </div>
                    <div className='nav-section-item last'>
                        <div className='nav-section-image'></div>
                        <h5 className='nav-section-title'>Photos</h5>
                    </div>
                </div>
            </div>
            <div className='home-section-two'>
                <div className='home-createpost-section'>
                    <div class="createpost-top-section">
                        <div className='temp-user'></div>
                        <h5 className='createpost-title'>What's on your mind, username?</h5>
                    </div>
                    <textarea className='createpost-text' placeholder='Write your thoughts here' rows={4}></textarea>
                    <div class="createpost-button-section">
                        <button className='createpost-file'>Add an image</button>
                        <button className='createpost-input-button'>Create Post</button>
                    </div>
                </div>
                {/* {for each post, new section for each.} */}
            </div>
            <div className='home-section-three'>
                <div className='home-request-section'>
                <div className='request-section-item'>
                        <div class="request-item-top">
                            <div className='temp-user'></div>
                            <div className='request-item-top-right'>
                                <h5 className='request-item-name'>Friend Name</h5>
                                <p className='request-item-mutuals'>5 Mutual Friends</p>
                            </div>
                        </div>
                        <div class="request-item-bottom">
                            <button className='request-accept-button'>Accept</button>
                            <button className='request-deny-button'>Deny</button>
                        </div>
                    </div>
                    <div className='request-section-item'>
                        <div class="request-item-top">
                            <div className='temp-user'></div>
                            <div className='request-item-top-right'>
                                <h5 className='request-item-name'>Friend Name</h5>
                                <p className='request-item-mutuals'>5 Mutual Friends</p>
                            </div>
                        </div>
                        <div class="request-item-bottom">
                            <button className='request-accept-button'>Accept</button>
                            <button className='request-deny-button'>Deny</button>
                        </div>
                    </div>
                    <div className='request-section-item'>
                        <div class="request-item-top">
                            <div className='temp-user'></div>
                            <div className='request-item-top-right'>
                                <h5 className='request-item-name'>Friend Name</h5>
                                <p className='request-item-mutuals'>5 Mutual Friends</p>
                            </div>
                        </div>
                        <div class="request-item-bottom">
                            <button className='request-accept-button'>Accept</button>
                            <button className='request-deny-button'>Deny</button>
                        </div>
                    </div>
                    {/* for each request */}
                </div>
                <div className='home-contacts-section'>
                    <div className='contact-section-item'>
                        <div className='temp-user'></div>
                        <h5 className='contact-item-name'>Friend Name</h5>
                    </div>
                </div>
            </div>



            {/* <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>

            <button className="logout-button" type="submit" onClick={handleLogoutSubmit}>Logout</button> */}
        </div>
    )
}

export default Home;