import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiHeart, FiBarChart2 } from "react-icons/fi";

const Navbar = () => (
	<nav className="navbar bg-danger text-white shadow p-3 d-flex justify-content-between">
		<h2 className="fw-bold">Blood Donation Dashboard</h2>
		<div>
			<Link to="/dashboard" className="btn btn-light me-2"><FiHome className="me-1" /> Dashboard</Link>
			<Link to="/users" className="btn btn-light me-2"><FiUser className="me-1" /> Users</Link>
			<Link to="/donations" className="btn btn-light me-2"><FiHeart className="me-1" /> Donations</Link>
			<Link to="/info" className="btn btn-light me-2"><FiBarChart2 className="me-1" /> Info</Link>
			<button className="btn btn-warning me-2">🔔 Notifications</button>
			<button className="btn btn-light">👤 Profile</button>
		</div>
	</nav>
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
		<div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
			<Navbar />
			<div className="container-fluid mt-4">
				<div className="row justify-content-center">
					{/* Blood Requests Section */}
					<div className="col-lg-4">
						<div className="card shadow-sm">
							<div className="card-header bg-danger text-white text-center">
								<h4 className="mb-0">Blood Requests</h4>
							</div>
							<div className="card-body overflow-auto" style={{ maxHeight: "75vh" }}>
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
