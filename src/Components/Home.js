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
        <div>Home Test
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>

            <button className="logout-button" type="submit" onClick={handleLogoutSubmit}>Logout</button>
        </div>
    )
}

export default Home;