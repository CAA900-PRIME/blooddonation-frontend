import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiHeart, FiBarChart2 } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = () => (
	<nav className="navbar bg-danger text-white shadow p-3 d-flex justify-content-between">
		<h2 className="fw-bold">Blood Donation Dashboard</h2>
		<div>
			<Link to="/dashboard" className="btn btn-light me-2"><FiHome className="me-1" /> Dashboard</Link>
			<Link to="/users" className="btn btn-light me-2"><FiUser className="me-1" /> Users</Link>
			<Link to="/donations" className="btn btn-light me-2"><FiHeart className="me-1" /> Donations</Link>
			<Link to="/info" className="btn btn-light me-2"><FiBarChart2 className="me-1" /> Info</Link>
			<button className="btn btn-warning me-2">🔔 Notifications</button>
			<Link to="/profile" className="btn btn-light me-2">👤 Profile</Link>
		</div>
	</nav >
);

const Dashboard = () => {
	const navigate = useNavigate();
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
					headers: { 'Content-Type': 'application/json' },
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
					headers: { 'Content-Type': 'application/json' },
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

	const renderRequestList = (requests, btnText, btnColor) => (
		<ul className="list-group">
			{requests.length > 0 ? (
				requests.map((request) => (
					<li key={request.id} className="list-group-item d-flex flex-column bg-white shadow-sm p-3 mb-2">
						<strong className="text-danger">{request.username}</strong>
						<span>Blood Group: <span className="badge bg-danger">{request.blood_type}</span></span>
						<span>City: {request.city}</span>
						<span>Country: {request.country}</span>
						<span>Hospital Name: {request.hospital_name}</span>
						<span>Hospital Address: {request.hospital_address}</span>
						<span>Appointment: {request.appointment}</span>
						<span>Status: {request.status}</span>
						<button className={`btn btn-${btnColor} btn-sm mt-2 w-100`}>
							{btnText}
						</button>
					</li>
				))
			) : (
				<p className="text-center">No requests available.</p>
			)}
		</ul>
	);

	return (
		<div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
			<Navbar />
			<div className="container-fluid mt-4">
				<div className="row">

					{/* Blood Requests Section */}
					<div className="col-md-4">
						<div className="card shadow-sm">
							<div className="card-header bg-danger text-white text-center">
								<h4 className="mb-0">Blood Requests</h4>
							</div>
							<div className="card-body overflow-auto" style={{ maxHeight: "75vh" }}>
								{renderRequestList(bloodRequests, "Apply", "danger")}
							</div>
						</div>
					</div>

					{/* Accepted Requests Section */}
					<div className="col-md-4">
						<div className="card shadow-sm">
							<div className="card-header bg-success text-white text-center">
								<h4 className="mb-0">Accepted Requests</h4>
							</div>
							<div className="card-body overflow-auto" style={{ maxHeight: "75vh" }}>
								{renderRequestList(acceptedRequests, "Accepted ✅", "success")}
							</div>
						</div>
					</div>

					{/* Created Requests Section */}
					<div className="col-md-4">
						<div className="card shadow-sm">
							<div className="card-header bg-primary text-white text-center">
								<h4 className="mb-0">Created Requests</h4>
							</div>
							<div className="card-body overflow-auto" style={{ maxHeight: "75vh" }}>
								{renderRequestList(createdRequests, "Modify Request", "primary")}
							</div>
						</div>
					</div>

				</div>
			</div>

			{/* Custom Styles */}
			<style>
				{`
					body {
						background-color: #fff !important;
					}
					.card {
						height: 85vh;
					}
					.card-body {
						overflow-y: auto;
					}
					.card:hover {
						transform: scale(1.02);
						transition: 0.3s ease-in-out;
					}
					.list-group-item:hover {
						background: #f8d7da;
						transition: 0.3s;
					}
				`}
			</style>
		</div>
	);
};

export default Dashboard;
