import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import InfoPage from "../pages/InfoPage";
import BloodRequest from "../pages/BloodRequest";
import Profile from "../pages/Profile.jsx";
import ForgotPassword from "../pages/forgot-password";

const AppRoutes = ({ user, setUser }) => {
    const isDev = process.env.NODE_ENV === "development";

    return (
        <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Ensure to redirect user to login if they aren't logged in, unless in development mode */}
            <Route path="/dashboard" element={isDev || user ? <Dashboard user={user} /> : <Login setUser={setUser} />} />
            <Route path="/info" element={isDev || user ? <InfoPage user={user} /> : <Login setUser={setUser} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blood-request" element={isDev || user ? <BloodRequest user={user} /> : <Login setUser={setUser} />} />
            <Route path="/profile" element={isDev || user ? <Profile user={user} /> : <Login setUser={setUser} />} />
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default AppRoutes;
