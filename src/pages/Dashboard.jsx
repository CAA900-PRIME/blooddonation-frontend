import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiHeart, FiBarChart2 } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap"; // Bootstrap Modal

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = ({ handleShowLogoutModal }) => (
	<nav className="navbar bg-danger text-white shadow p-3 d-flex justify-content-between">
		<h2 className="fw-bold">Blood Donation Dashboard</h2>
		<div>
			<Link to="/dashboard" className="btn btn-light me-2"><FiHome className="me-1" /> Dashboard</Link>
			<Link to="/users" className="btn btn-light me-2"><FiUser className="me-1" /> Users</Link>
			<Link to="/donations" className="btn btn-light me-2"><FiHeart className="me-1" /> Donations</Link>
			<Link to="/info" className="btn btn-light me-2"><FiBarChart2 className="me-1" /> Info</Link>
			<button className="btn btn-warning me-2">🔔 Notifications</button>
			<Link to="/profile" className="btn btn-light me-2">👤 Profile</Link>
			<button className="btn btn-dark" onClick={handleShowLogoutModal}>🚪 Logout</button>
		</div>
	</nav>
);

const Dashboard = () => {
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [bloodRequests, setBloodRequests] = useState([]);
	const [appliedRequests, setAppliedRequests] = useState([]);
	const [createdRequests, setCreatedRequests] = useState([]);
	const [acceptedRequests, setAcceptedRequests] = useState([]);

	useEffect(() => {
		const fetchApplications = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/app/get-applications`, {
					method: "GET",
					credentials: "include",
					Headers: {
						'Content-Type': 'application/json',
					}
				});
				const data = await response.json();
				if (response.ok) {
					setBloodRequests(data);
				} else {
					console.error('Error fetching data:', data);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		};

		const fetchMyApplication = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/app/get-my-applications`, {
					method: "GET",
					credentials: "include",
					Headers: {
						'Content-Type': 'application/json',
					}
				});
				const data = await response.json();
				if (response.ok) {
					setCreatedRequests(data);
				} else {
					console.error('Error fetching data:', data);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		};

		fetchMyApplication();
		fetchApplications();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		alert("You have been logged out.");
		navigate("/login");
	};

	return (
		<div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
			<Navbar handleShowLogoutModal={() => setShowLogoutModal(true)} />
		</div>
	);
};

export default Dashboard;
