import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiHeart, FiBarChart2 } from "react-icons/fi";

const Sidebar = () => (
	<div className="sidebar bg-danger text-white vh-100 p-3 position-fixed shadow" style={{ width: "260px" }}>
		<h2 className="mb-4 text-center fw-bold">Dashboard</h2>
		<ul className="nav flex-column">
			<li className="nav-item mb-3">
				<Link to="/dashboard" className="nav-link text-white"><FiHome className="me-2" /> Dashboard</Link>
			</li>
			<li className="nav-item mb-3">
				<Link to="/users" className="nav-link text-white"><FiUser className="me-2" /> Users</Link>
			</li>
			<li className="nav-item mb-3">
				<Link to="/donations" className="nav-link text-white"><FiHeart className="me-2" /> Donations</Link>
			</li>
			<li className="nav-item">
				<Link to="/info" className="nav-link text-white"><FiBarChart2 className="me-2" /> Info</Link>
			</li>
		</ul>
	</div>
);

const Navbar = () => (
	<div className="navbar bg-white shadow p-3">
		<h2 className="d-inline-block text-danger fw-bold">Blood Donation Dashboard</h2>
		<div className="float-end">
			<button className="btn btn-light border me-2">🔔 Notifications</button>
			<button className="btn btn-danger">👤 Profile</button>
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

	// Handle Apply Button Click
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
				setAppliedRequests(new Set([...appliedRequests, requestId])); // Mark as applied
			} else {
				alert("Failed to apply. Please try again.");
			}
		} catch (error) {
			console.error("Error applying for blood request:", error);
		}
	};

	return (
		<div className="d-flex">
			<Sidebar />
			<div className="content p-4 w-75" style={{ marginLeft: "260px" }}>
				<Navbar />
				<div className="mt-4">
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
			</div>

			{/* Right Sidebar - Blood Requests List */}
			<div className="p-4 bg-light w-25 vh-100 overflow-auto border-start shadow-sm">
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
