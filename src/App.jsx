import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container text-center mt-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Blood Donation App</a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="jumbotron p-5 bg-primary text-white rounded">
          <h1 className="display-4">Welcome to Blood Donation App</h1>
          <p className="lead">Join us in saving lives by donating blood to those in need.</p>
          <hr className="my-4" />
          <p>Click below to sign up or log in.</p>
          <Link className="btn btn-light btn-lg me-2" to="/signup">Signup</Link>
          <Link className="btn btn-outline-light btn-lg" to="/login">Login</Link>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container mt-4">
      <h2>Why Donate Blood?</h2>
      <p>Blood donation is a vital part of worldwide healthcare. Every donation can save up to three lives!</p>
      <ul className="list-group">
        <li className="list-group-item">Improve your own health by donating</li>
        <li className="list-group-item">Help people in emergency situations</li>
        <li className="list-group-item">Make a difference in someone's life</li>
      </ul>
    </div>
  );
}

export default App;
