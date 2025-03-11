import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiHeart, FiBarChart2 } from "react-icons/fi";

const Navbar = () => (
	<div className="navbar bg-danger text-white shadow p-3 d-flex justify-content-between">
		<h2 className="fw-bold">Blood Donation Dashboard</h2>
		<div>
			<Link to="/dashboard" className="btn btn-light me-2"><FiHome className="me-1" /> Dashboard</Link>
			<Link to="/users" className="btn btn-light me-2"><FiUser className="me-1" /> Users</Link>
			<Link to="/donations" className="btn btn-light me-2"><FiHeart className="me-1" /> Donations</Link>
			<Link to="/info" className="btn btn-light me-2"><FiBarChart2 className="me-1" /> Info</Link>
			<button className="btn btn-warning me-2">🔔 Notifications</button>
			<button className="btn btn-light">👤 Profile</button>
		</div>
	</div>
);

const Dashboard = () => {
	const [bloodRequests, setBloodRequests] = useState([]);
	const [appliedRequests, setAppliedRequests] = useState(new Set());

	useEffect(() => {
		const fetchBloodRequests = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/users/get-applications", {
					method: "GET",
					credentials: "include",
				});
				const data = await response.json();
				console.log(data);
				setBloodRequests(data);
			} catch (error) {
				console.error("Error fetching blood requests:", error);
			}
		};
		setBloodRequests([
			{ id: 1, username: "John Doe", bloodGroup: "A+", city: "New York", hospital: "City Hospital" },
			{ id: 2, username: "Jane Smith", bloodGroup: "O-", city: "Los Angeles", hospital: "LA Medical Center" },
			{ id: 3, username: "Michael Brown", bloodGroup: "B+", city: "Chicago", hospital: "Chicago General" },
		]);
		fetchBloodRequests();
	}, []);

	const handleApply = async (requestId) => {
		if (appliedRequests.has(requestId)) return;

		try {
			const response = await fetch("http://localhost:3000/api/users/apply-blood-request", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ requestId }),
			});

			if (response.ok) {
				alert("Successfully applied for blood request!");
				setAppliedRequests(new Set([...appliedRequests, requestId]));
			} else {
				alert("Failed to apply. Please try again.");
			}
		} catch (error) {
			console.error("Error applying for blood request:", error);
		}
	};

	return (
		<div>
			<Navbar />
			<div className="container mt-4">
				<h3 className="text-center text-danger fw-bold">Dashboard Overview</h3>
				<div className="row mt-3">
					<div className="col-md-4">
						<div className="card text-center shadow border-0 bg-danger text-white p-3">
							<h5>Total Donations</h5>
							<p className="fs-4 fw-bold">120</p>
						</div>
					</div>
					<div className="col-md-4">
						<div className="card text-center shadow border-0 bg-danger text-white p-3">
							<h5>Active Users</h5>
							<p className="fs-4 fw-bold">35</p>
						</div>
					</div>
					<div className="col-md-4">
						<div className="card text-center shadow border-0 bg-danger text-white p-3">
							<h5>Pending Requests</h5>
							<p className="fs-4 fw-bold">10</p>
						</div>
					</div>
				</div>
			</div>

			{/* Right Sidebar - Blood Requests List */}
			<div className="p-4 bg-light w-25 vh-100 overflow-auto border-start shadow-sm position-absolute end-0 top-0 mt-5">
				<h4 className="text-center text-danger fw-bold">Blood Requests</h4>
				<ul className="list-group">
					{bloodRequests.length > 0 ? (
						bloodRequests.map((request) => (
							<li key={request.id} className="list-group-item d-flex flex-column bg-white shadow-sm p-3 mb-2">
								<strong className="text-danger">{request.username}</strong>
								<span>Blood Group: <span className="badge bg-danger">{request.bloodGroup}</span></span>
								<span>City: {request.city}</span>
								<span>Hospital: {request.hospital}</span>

								{/* Apply Button */}
								<button 
									className="btn btn-danger btn-sm mt-2 w-100"
									onClick={() => handleApply(request.id)}
									disabled={appliedRequests.has(request.id)}
								>
									{appliedRequests.has(request.id) ? "Applied ✅" : "Apply"}
								</button>
							</li>
						))
					) : (
						<p className="text-center">No blood requests available.</p>
					)}
				</ul>
			</div>

			{/* Custom Styles */}
			<style>
				{`
          body {
            background: linear-gradient(to right, rgb(255, 255, 255), rgb(254, 232, 227));
          }
          .card:hover {
            transform: scale(1.05);
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
