import { Link } from "react-router-dom";
import React from "react";

const Home = () => {

    return (
        <div>Home Test
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
        </div>
    )
}

export default Home;