import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const apiUrl = import.meta.env.VITE_API_URL;

const Login = ({ setUser, showAlert }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("user")) {
			navigate("/dashboard");
		}
	}, [navigate]);

	const handleLogin = async () => {
		const response = await fetch(`${apiUrl}/api/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();
		if (response.ok) {
			localStorage.setItem("user", JSON.stringify(data.user));
			setUser(data.user);
			navigate("/");
		} else {
			showAlert(data.error, "danger");
		}
	};

	return (
		<div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
			<div className="row w-75 shadow-lg rounded-4 overflow-hidden">
				<div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-white p-4 welcome-section">
					<h1 className="fw-bold">Welcome Page</h1>
					<p className="text-center">Sign In To Your Account</p>
					<p className="mt-auto mb-0">www.blooddonation.ca</p>
				</div>

				<div className="col-md-6 bg-white p-5">
					<h4 className="mb-3">Hello! <span className="text-danger">Good Morning</span></h4>
					<h5 className="mb-4">
						<span className="text-danger fw-bold">Login</span> Your Account
					</h5>

					<div className="mb-3">
						<input
							type="email"
							className="form-control"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<input
							type="password"
							className="form-control"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="d-flex justify-content-between align-items-center mb-4">
						<div>
							<input type="checkbox" id="rememberMe" className="me-2" />
							<label htmlFor="rememberMe">Remember</label>
						</div>
						<button
							className="btn btn-link text-decoration-none text-danger"
							onClick={() => navigate("/forgot-password")}
						>
							Forgot Password?
						</button>
					</div>

					<button className="btn btn-danger w-100 py-2" onClick={handleLogin}>
						SUBMIT
					</button>

					<div className="text-center mt-3">
						<a href="/Signup" className="btn btn-link text-decoration-none text-danger">Create Account</a>
					</div>
				</div>
			</div>

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
