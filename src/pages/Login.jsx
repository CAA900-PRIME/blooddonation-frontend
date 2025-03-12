import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setUser }) => {
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
			localStorage.setItem("user", JSON.stringify(data.user));
			setUser(data.user);
			navigate("/");
		} else {
			alert("Login failed");
		}
	};

	return (
		<div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
			<div className="row w-75 shadow-lg rounded-4 overflow-hidden">
				{/* Left Side - Welcome Section */}
				<div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-white p-4 welcome-section">
					<h1 className="fw-bold">Welcome Page</h1>
					<p className="text-center">Sign In To Your Account</p>
					<p className="mt-auto mb-0">www.blooddonation.ca</p>
				</div>

				{/* Right Side - Login Form */}
				<div className="col-md-6 bg-white p-5">
					<h4 className="mb-3">Hello! <span className="text-danger">Good Morning</span></h4>
					<h5 className="mb-4">
						<span className="text-danger fw-bold">Login</span> Your Account
					</h5>

					{/* Email Input */}
					<div className="mb-3">
						<input
							type="email"
							className="form-control"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					{/* Password Input */}
					<div className="mb-3">
						<input
							type="password"
							className="form-control"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					{/* Remember Me & Forgot Password */}
					<div className="d-flex justify-content-between align-items-center mb-4">
						<div>
							<input type="checkbox" id="rememberMe" className="me-2" />
							<label htmlFor="rememberMe">Remember</label>
						</div>
						<button className="btn btn-link text-decoration-none text-danger" onClick={() => navigate("/reset-password")}>
							Forgot Password?
						</button>
					</div>

					{/* Login Button */}
					<button className="btn btn-danger w-100 py-2" onClick={handleLogin}>
						SUBMIT
					</button>

					{/* Create Account */}
					<div className="text-center mt-3">
						<button className="btn btn-link text-decoration-none text-danger">Create Account</button>
					</div>
				</div>
			</div>

			{/* Custom Styles */}
			<style>
				{`
					.bg-gradient {
						background: linear-gradient(to right, #8B0000, #FF4500);
					}
					.welcome-section {
						background: linear-gradient(to right, #8B0000, #FF4500);
						color: white;
						text-align: center;
					}
				`}
			</style>
		</div>
	);
};

export default Login;
