import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";

import typeface from "../Assets/transparent.png";

const LoginPage = ({guestMode, setGuestMode, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
    console.log(token);
    // Check if the user is logged in already
    useEffect(() => {
        if (isLoggedIn || guestMode) {
            navigate("/");
        }
    }, [isLoggedIn, guestMode])

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            localStorage.setItem("token", token);
            localStorage.removeItem("isGuest");
            setError("");
            setIsLoggedIn(true);
            navigate("/");
        }
    } ,[])

    // Form Data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Handle Submit
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = formData;
        const response = await fetch(`https://beebuddies.up.railway.app/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        localStorage.setItem("token", data.token);
        if (response.ok) {
            localStorage.removeItem("isGuest");
            setError("");
            setIsLoggedIn(true);
            navigate("/");
        } else {
            setError(<div className="login-error">{data.message}</div>)
        }
    };

    // Error Messages
    const [error, setError] = useState("");

    const handleContinueAsGuest = () => {
        localStorage.setItem("isGuest", "true");
        setGuestMode(true);
        navigate("/");
    }

    return (
        <div className="component-login-container">
            <div className="component-login">
                <div className="login-content">
                    <img className="typefaceimage" src={typeface}></img>
                    <svg className="wave-pattern" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q33.3,70 66.6,50 Q100,30 100,50 L100,100 L0,100 Z"></path>
                    </svg>
                    <div className="login-container">
                        <h2 className="login-title">Login to your account</h2>
                        <form className="login-form" onSubmit={handleLoginSubmit}>
                            <div className="input-label-group">
                                <label className="login-label" htmlFor="login-email">Email Address</label>
                                <input className="login-input" type="email" id="login-email" required={true} name="email" value={formData.email} onChange={handleChange}></input>
                            </div>
                            <div className="input-label-group">
                                <label className="login-label" htmlFor="login-password">Password</label>
                                <input className="login-input" type="password" id="login-password" required={true} name="password" value={formData.password} onChange={handleChange}></input>
                            </div>
                            <div className="error-container"></div>
                            <button className="login-button" type="submit">Login</button>
                            {error}
                        </form>
                        <div className="login-container-border"></div>
                    </div>
                    <p className="login-account-message">Don't have an account? <Link className="login-redirect" to={"/signup"}><span className="login-redirect">Signup here.</span></Link></p>
                    <p className="guest-button" onClick={handleContinueAsGuest}>Continue as guest</p>
                    <a href="https://beebuddies.up.railway.app/auth/login-facebook" className="fblogin"><button className="fbbutton">Login with Facebook</button></a>
                </div>

            </div>
        </div>
    )
}

export default LoginPage;