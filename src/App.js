import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import './App.css';
import "./Components/Home/Home.css";
import './Components/Shared/Shared.css';
import './Components/Friends/Friends.css';
import './Components/Profile/Profile.css';
import './Components/User/User.css';
import './Components/UserList/UserIndexPage.css';

import NavBar from "./Components/NavBar";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import Home from "./Components/Home/Home";
import UserPage from "./Components/User/UserPage";
import ProfilePage from "./Components/Profile/ProfilePage";
import UserIndexPage from "./Components/UserList/UserIndexPage";
import FriendsPage from "./Components/Friends/FriendsPage";


const App = () => {

  // const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [refreshMainUserData, setRefreshMainUserData] = useState(false);

  // Verify Token on page load up.
  useEffect(() => {
    // Function
    setUserData(null);
    const verifyToken = async () => {
      try {
        console.log("Attempting to verify token");
        console.log(token);
        const response = await fetch("http://localhost:4000/auth/verify-token", {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserData(userData);
          setIsLoggedIn(true);
          setLoading(false);
          setRefreshMainUserData(false);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          setIsLoggedIn(false);
          setLoading(false);
          setIsLoggedIn(false);
          // navigate("/login");
          setRefreshMainUserData(false);
        }
      } catch (error) {
        console.error("Error verifiying token:", error);
        setError("An error occured while verifying the token");
        setIsLoggedIn(false);
        setLoading(false);
        setRefreshMainUserData(false);
        // navigate("/login");
      }
    }

    // Get the token in storage
    const token = localStorage.getItem("token");
    if (!token) {
      // No token, go to login page
      setIsLoggedIn(false);
      // navigate("/login");
    } else {
      verifyToken();
      // There is a token
    }
  }, [isLoggedIn, refreshMainUserData]);



  return (
    <>
      <Router>
        <NavBar userData={userData}/>
        <Routes>
          <Route exact path={'/'} element={<Home setIsLoggedIn={setIsLoggedIn} loading={loading} userData={userData} />} />
          <Route path={'/login'} element={<LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
          <Route path={'/signup'} element={<SignupPage isLoggedIn={isLoggedIn} />} />

          <Route path={"/profile"} element={<ProfilePage setIsLoggedIn={setIsLoggedIn} loading={loading} userData={userData}  />} />
          <Route path={"/user/:userId"} element={<UserPage setRefreshMainUserData={setRefreshMainUserData} setIsLoggedIn={setIsLoggedIn} loading={loading} userData={userData}  />} />

          <Route path={"/users"} element={<UserIndexPage setIsLoggedIn={setIsLoggedIn} loading={loading} userData={userData} />}/>
          <Route path={"/friends"} element={<FriendsPage setIsLoggedIn={setIsLoggedIn} loading={loading} userData={userData} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
