import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/Routes";
import NavBar from "./components/NavBar";
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
			<div className="">
				<AppRoutes user={user} setUser={setUser} />
			</div>
		</Router>
	);
}



export default App;
