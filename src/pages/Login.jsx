import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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
			console.log(response.json)
			// localStorage.setItem()
			navigate("/");
		} else {
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
