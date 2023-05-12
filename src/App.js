import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import React from "react";

import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import Home from "./Components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/signup'} element={<SignupPage />} />
          <Route path={'/'} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
