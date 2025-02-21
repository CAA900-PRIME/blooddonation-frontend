import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import InfoPage from "./pages/InfoPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="container text-center mt-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Blood Donation App</a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/info">Information</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={() => {
                        localStorage.removeItem("user");
                        setUser(null);
                      }}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Login setUser={setUser} />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container mt-5">
      <div className="jumbotron p-5 bg-danger text-white rounded">
        <h1 className="display-4">Donate Blood, Save Lives</h1>
        <p className="lead">Every drop counts! Join our mission to help those in need by becoming a blood donor.</p>
        <hr className="my-4" />
        <p>Sign up today and make a difference in someone's life.</p>
        <Link className="btn btn-light btn-lg me-2" to="/signup">Become a Donor</Link>
        <Link className="btn btn-outline-light btn-lg" to="/login">Login</Link>
      </div>
    </div>
  );
}

export default App;
