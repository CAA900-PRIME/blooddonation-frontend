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
			const data = await response.json();
			console.log(data.message);
			console.log(data.user);
			localStorage.setItem("user", JSON.stringify(data.user)); 
			setUser(data.user); 
			navigate("/");
		} else {
			alert("Login failed"); // Replace with a Bootstrap alert
		}
	};

	return (
		<div className="container mt-4">
			<h2>Login</h2>
			<input 
				type="email" 
				className="form-control mb-2"
				placeholder="Email" 
				value={email} 
				onChange={(e) => setEmail(e.target.value)} 
			/>
			<input 
				type="password" 
				className="form-control mb-2"
				placeholder="Password" 
				value={password} 
				onChange={(e) => setPassword(e.target.value)} 
			/>
			<button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
			
			<div className="text-center mt-3">
				<button 
					className="btn btn-link" 
					onClick={() => navigate("/reset-password")}
				>
					Forgot Password?
				</button>
			</div>
		</div>
	);
}

export default Login;
