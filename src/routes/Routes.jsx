import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Dashboard from "../pages/Dashboard"
import InfoPage from "../pages/InfoPage"
import BloodRequest from "../pages/BloodRequest"

const AppRoutes = ({ user, setUser }) => {
	return (
		<Routes>
			<Route path="/login" element={<Login setUser={setUser} />} />
			<Route path="/signup" element={<Signup />} />
			{/* <Route path="/dashboard" element={<Dashboard />} /> and ensure to redirect user to login if their aren't logged in*/}
			<Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Login setUser={setUser} />} />
			<Route path="/info" element={user ? <InfoPage /> : <Login setUser={setUser} />} />
			<Route path="/home" element={<Home />} />
			<Route path="/blood-request" element={user ? <BloodRequest /> : <Login setUser={setUser} />} />
			<Route path="/" element={<Home />} />
		</Routes>
	);
};

export default AppRoutes;
