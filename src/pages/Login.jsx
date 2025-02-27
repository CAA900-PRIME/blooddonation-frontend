import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => { //setUser coming from the routes
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		const response = await fetch("http://localhost:3000/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			// Parse to json
			const data = await response.json();
			console.log(data.message);
			console.log(data.user);
			localStorage.setItem("user", JSON.stringify(data.user)) //Will have to use const user = JSON.parse(localStorage.getItem("user")); To get the user account
			setUser(data.user); //Setting the user once loggedin
			navigate("/");
		} else {
			//Need to replace it with a nice alert template using bootstrap
			alert("Login failed");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}

export default Login;
