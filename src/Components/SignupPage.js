import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const SignupPage = () => {
    const navigate = useNavigate();
    // use effect, if signed in, redirect if possible. or do it on app, layer above idk.

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordtwo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate("/login");
    }

    return (
        <div className="component-signup">
            <div className="signup-container">
                <form onSubmit={handleSignupSubmit}>
                    <h2>Create an account.</h2>
                    <p>Slogan goes here</p>
                    <div className="input-label-group">
                        <label htmlFor="signup-firstname">First Name</label>
                        <input type="text" id="signup-firstname" required={true} name="first_name" value={formData.first_name} onChange={handleChange}></input>
                    </div>
                    <div className="input-label-group">
                        <label htmlFor="signup-lastname">Last Name</label>
                        <input type="text" id="signup-lastname" required={true} name="last_name" value={formData.last_name} onChange={handleChange}></input>
                    </div>
                    <div className="input-label-group">
                        <label htmlFor="signup-email">Email Address</label>
                        <input type="email" id="signup-email" required={true} name="email" value={formData.email} onChange={handleChange}></input>
                    </div>
                    <div className="input-label-group">
                        <label htmlFor="signup-password">Password</label>
                        <input type="password" id="signup-password" required={true} name="password" value={formData.password} onChange={handleChange}></input>
                    </div>
                    <div className="input-label-group">
                        <label htmlFor="signup-password-two">Re-enter Password</label>
                        <input type="password" id="signup-password-two" required={true} name="passwordtwo" value={formData.passwordtwo} onChange={handleChange}></input>
                    </div>
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage;