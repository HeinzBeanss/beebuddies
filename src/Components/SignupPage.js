import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import typeface from "../Assets/transparent.png";


const SignupPage = ({ setIsLoggedIn, isLoggedIn }) => {
    const navigate = useNavigate();
    // use effect, if signed in, redirect if possible. or do it on app, layer above idk.

    // Check if the user is logged in already
    useEffect(() => {
        if (isLoggedIn === true) {
            console.log("User alerady logged in");
            navigate("/");
        };
    }, []);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordtwo: "",
        birthdate: "",
    });

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Handle Signup Form Submit
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const { first_name, last_name, email, password, passwordtwo, birthdate } = formData;

        if (password !== passwordtwo) {
            return setError("Passwords do not match")
        } else {
            const response = await fetch(`http://localhost:4000/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({ first_name, last_name, email, password, passwordtwo, birthdate}),
                
            });
            console.log(response);
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // navigate("/login");
                // Login automatically
                console.log("LOGGING IN - CLIENT SIDE VIA SIGNUP PAGE");
                const response = await fetch(`http://localhost:4000/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                      },
                    body: JSON.stringify({ email, password }),
                });
                const logindata = await response.json();
                console.log(logindata);
                localStorage.setItem("token", logindata.token);
                console.log(`token from sign up is: ${logindata.token}`);
                await Promise.resolve();
                if (response.ok) {
                    setError("");
                    setIsLoggedIn(true);
                    navigate("/");
                } else {
                    navigate("/login");
                    setError(`${data.message}`);
                    // DO something if it doesn't log in properly.
                }
            } else {
                setError(`${data.errors[0].msg}`);
            }
        }
    }

    // Error Messages
    const [error, setError] = useState(" ");
    useEffect(() => {
        if (formData.passwordtwo === "") {
            // Hasn't been touched yet
        } else {
            if (formData.password !== formData.passwordtwo) {
                setError("Passwords do not match")
            } else {
                setError("");
            }
        }
    }, [formData.passwordtwo, formData.password])


    return (
        <div className="component-login-container">
            <div className="component-signup">
                <div className="signup-content">
                    <img className="typefaceimage" src={typeface}></img>
                    <svg className="wave-pattern" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q33.3,70 66.6,50 Q100,30 100,50 L100,100 L0,100 Z"></path>
                    </svg>
                    <div className="signup-container">
                        <h2 className="login-title">Create an account</h2>
                        <form className="signup-form" onSubmit={handleSignupSubmit}>
                            <div className="form-inputs">
                                <div className="signup-form-side-two">
                                    <div className="input-label-group">
                                        <label className="signup-label" htmlFor="signup-firstname">First Name</label>
                                        <input className="signup-input" type="text" id="signup-firstname" required={true} name="first_name" value={formData.first_name} onChange={handleChange}></input>
                                    </div>
                                    <div className="input-label-group">
                                        <label className="signup-label" htmlFor="signup-lastname">Last Name</label>
                                        <input className="signup-input" type="text" id="signup-lastname" required={true} name="last_name" value={formData.last_name} onChange={handleChange}></input>
                                    </div>
                                    <div className="input-label-group">
                                        <label className="signup-label" htmlFor="signup-email">Email Address</label>
                                        <input className="signup-input" type="email" id="signup-email" required={true} name="email" value={formData.email} onChange={handleChange}></input>
                                    </div>
                                </div>
                                <div className="signup-form-side-one">
                                    <div className="input-label-group">
                                        <label className="signup-label" htmlFor="signup-password">Password</label>
                                        <input className="signup-input" type="password" id="signup-password" required={true} name="password" value={formData.password} onChange={handleChange}></input>
                                    </div>
                                    <div className="input-label-group">
                                        <label className="signup-label" htmlFor="signup-password-two">Re-enter Password</label>
                                        <input className="signup-input" type="password" id="signup-password-two" required={true} name="passwordtwo" value={formData.passwordtwo} onChange={handleChange}></input>
                                    </div>
                                    <div className="input-label-group">
                                        <label className="signup-label" htmlFor="signup-birthday">Birthdate</label>
                                        <input className="signup-input" type="date" id="signup-birthdate" required={true} name="birthdate" value={formData.birthdate} onChange={handleChange}></input>
                                    </div>
                                </div>
                            </div>

                            <button className="login-button" type="submit">Create Account</button>
                            <div className="error-container">{error}</div>
                        </form>
                        <div className="login-container-border"></div>
                    </div>
                    <p className="login-account-message">Already have an account? <Link className="login-redirect" to={"/login"}><span className="login-redirect">Login here.</span></Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;


