import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/Routes";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Alert from "./components/Alert.jsx";
import "./App.css";

function App() {
	const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
	const [alert, setAlert] = useState({ message: "", type: "" });
	useEffect(() => {
		const handleStorageChange = () => {
			setUser(JSON.parse(localStorage.getItem("user")));
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const showAlert = (message, type = "primary") => {
		setAlert({ message, type });
		setTimeout(() => setAlert({ message: "", type: "" }), 20000);
	};
	return (
		<Router>
			<NavBar user={user} setUser={setUser} />
			{alert.message && <Alert alertMessage={alert.message} alertType={alert.type} />}
			<div className="d-flex flex-column min-vh-100">
				<AppRoutes user={user} setUser={setUser} showAlert={showAlert} />
			</div>
			<Footer />
		</Router>
	);
}

export default App;
