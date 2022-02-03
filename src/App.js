import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Landing/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import AboutYou from "./Components/AboutYou/AboutYou";
import Referral from "./Components/Referral/Referral";
import DomainPage from "./Components/Domain/DomainPage";
import ProtectedRoute from "./ProtectedRoute";
import Quiz from "./Components/Quiz/Quiz.js"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route exact path="/aboutyou" element={<ProtectedRoute> <AboutYou /> </ProtectedRoute>} /> */}
          <Route exact path="/aboutyou" element={<ProtectedRoute />} >
            <Route exact path="/aboutyou" element={<AboutYou />} />
          </Route>
          {/* <Route path="/aboutyou" element={<AboutYou />} /> */}
          <Route exact path="/referral" element={<ProtectedRoute />} >
            <Route exact path="/referral"  element={<Referral />} />
          </Route>
          <Route path="/domain" element={<DomainPage />} />
          <Route path="/test_quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
