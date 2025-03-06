import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/Routes";
import NavBar from "./components/NavBar";
import ResetPassword from "./pages/ResetPassword"; // Import ResetPassword component
import "./App.css";

function App() {
	const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

	useEffect(() => {
		const handleStorageChange = () => {
			setUser(JSON.parse(localStorage.getItem("user")));
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	return (
		<Router>
			<NavBar user={user} setUser={setUser} />
			<div className="container mt-4">
				<Routes>
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/*" element={<AppRoutes user={user} setUser={setUser} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
