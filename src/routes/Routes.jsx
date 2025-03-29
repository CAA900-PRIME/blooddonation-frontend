import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import InfoPage from "../pages/InfoPage";
import BloodRequest from "../pages/BloodRequest";
import Profile from "../pages/Profile.jsx";
import ForgotPassword from "../pages/forgot-password";
import VerifyOTP from "../pages/verify-otp";
import RequestDetails from "../pages/RequestDetails.jsx";
import EditProfile from "../pages/EditProfile.jsx";
// route for Two-Factor Setup
import TwoFactorSetup from "../components/TwoFactorSetup"; // adjust if path differs


const AppRoutes = ({ user, setUser, showAlert }) => {
	const isDev = process.env.NODE_ENV === "development";
	{/* Ensure to redirect user to login if they aren't logged in, unless in development mode */ }
	return (
		<Routes>
			<Route path="/login" element={<Login setUser={setUser} showAlert={showAlert} />} />
			<Route path="/signup" element={<Signup showAlert={showAlert} />} />
			<Route path="/forgot-password" element={isDev || user ? <ForgotPassword user={user} /> : <Login setUser={setUser} showAlert={showAlert} />} />
			<Route path="/verify-otp" element={isDev || user ? <VerifyOTP user={user} /> : <Login setUser={setUser} showAlert={showAlert} />} />
			<Route path="/dashboard" element={isDev || user ? <Dashboard user={user} showAlert={showAlert} /> : <Login setUser={setUser} showAlert={showAlert} />} />
			<Route path="/info" element={isDev || user ? <InfoPage user={user} /> : <Login setUser={setUser} showAlert={showAlert} />} />
			<Route path="/home" element={<Home />} />
			<Route path="/blood-request" element={isDev || user ? <BloodRequest user={user} showAlert={showAlert} /> : <Login setUser={setUser} showAlert={showAlert} />} />
			<Route path="/profile" element={isDev || user ? <Profile user={user} showAlert={showAlert} /> : <Login setUser={setUser} showAlert={showAlert} />} />
			<Route path="/" element={<Home />} />
			<Route path="/request-details/:id" element={isDev || user ? <RequestDetails user={user} showAlert={showAlert} /> : <Login setUser={setUser} showAlert={showAlert} />} />
			<Route path="/edit-profile" element={isDev || user ? <EditProfile user={user} showAlert={showAlert} /> : <Login setUser={setUser} showAlert={showAlert} />} />
		</Routes>
	);
};

export default AppRoutes;
