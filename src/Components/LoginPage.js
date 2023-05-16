import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LoginPage = (props) => {
    const navigate = useNavigate();

    // Check if the user is logged in already
    useEffect(() => {
        if (props.isLoggedIn === true) {
            console.log("User alerady logged in");
            navigate("/");
        };
    }, []);

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
        console.log("LOGGING IN - CLIENT SIDE");
        const {email, password} = formData;
        const response = await fetch(`http://localhost:4000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
    };

    // Error Messages
    const [error, setError] = useState("");

    return (
        <div className="component-login">
            <div className="login-container">
                <form onSubmit={handleLoginSubmit}>
                    <h2>Login.</h2>
                    <p>Slogan goes here</p>
                    <div className="input-label-group">
                        <label htmlFor="login-email">Email Address</label>
                        <input type="email" id="login-email" required={true} name="email" value={formData.email} onChange={handleChange}></input>
                    </div>
                    <div className="input-label-group">
                        <label htmlFor="login-password">Password</label>
                        <input type="password" id="login-password" required={true} name="password" value={formData.password} onChange={handleChange}></input>
                    </div>
                    <div className="error-container">{error}</div>
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;