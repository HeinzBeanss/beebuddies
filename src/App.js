import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, { useEffect, useState } from "react";

import NavBar from "./Components/NavBar";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import Home from "./Components/Home";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");

  // Verify Token on page load up.
  useEffect(() => {
    // Function
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
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          setIsLoggedIn(false);
          // navigate("/login");
        }
      } catch (error) {
        console.error("Error verifiying token:", error);
        setError("An error occured while verifying the token");
        setIsLoggedIn(false);
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
  }, []);

  return (
    <>
      <NavBar userData={userData}/>
      <Router>
        <Routes>
            <Route path={'/login'} element={<LoginPage isLoggedIn={isLoggedIn}/>} />
            <Route path={'/signup'} element={<SignupPage isLoggedIn={isLoggedIn}/>} />
            <Route path={'/'} element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
