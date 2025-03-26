import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
	const navigate = useNavigate();
	const [bloodRequests, setBloodRequests] = useState([]);
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


		const fetchAppliedApplication = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/app/get-applied-applications`, {
					method: "GET",
					credentials: "include",
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await response.json();
				if (response.ok) {
					setAcceptedRequests(data);
				} else {
					console.error('Error fetching data:', data);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		};


		fetchApplications();
		fetchMyApplication();
		fetchAppliedApplication();
	}, []);

	const handleModify = (request) => {
		navigate("/blood-request", { state: { request } });
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`${apiUrl}/api/app/delete-application`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ app_id: id }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to delete request");
			}

			setCreatedRequests(createdRequests.filter(request => request.id !== id));
			alert("Request deleted successfully");
		} catch (error) {
			alert(`Error: ${error.message}`);
		}
	};

	const handleApply = async (id) => {
		try {
			const response = await fetch(`${apiUrl}/api/app/apply-application`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ app_id: id }),
			});

			const data = await response.json();
			if (response.ok) {
				alert("Applied successfully!");
				// Find and move request from bloodRequests to acceptedRequests
				const appliedRequest = bloodRequests.find(req => req.id === id);
				if (appliedRequest) {
					setAcceptedRequests(prev => [...prev, appliedRequest]);
					setBloodRequests(prev => prev.filter(req => req.id !== id));
				}
			} else {
				alert(data.error);
			}
		} catch (error) {
			alert("An error occurred while applying.");
			console.error(error);
		}
	};

	const renderRequestList = (requests, btnText, btnColor, isCreated = false, onApply = null) => (
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
						{isCreated ? (
							<>
								<button className="btn btn-primary btn-sm mt-2 w-100" onClick={() => handleModify(request)}>
									Modify Request
								</button>
								<button className="btn btn-danger btn-sm mt-2 w-100" onClick={() => handleDelete(request.id)}>
									Delete Request
								</button>
							</>
						) : onApply ? (
							<button className={`btn btn-${btnColor} btn-sm mt-2 w-100`} onClick={() => onApply(request.id)}>
								{btnText}
							</button>
						) : null}
					</li>
				))
			) : (
				<p className="text-center">No requests available.</p>
			)}
		</ul>
	);

	return (
		<div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
			<div className="container-fluid mt-4">
				<div className="row">
					{/* Blood Requests Section */}
					<div className="col-md-4">
						<div className="card shadow-sm">
							<div className="card-header bg-danger text-white text-center">
								<h4 className="mb-0">Blood Requests</h4>
							</div>
							<div className="card-body overflow-auto" style={{ maxHeight: "75vh" }}>
								{renderRequestList(bloodRequests, "Apply", "danger", false, handleApply)}
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
								{renderRequestList(createdRequests, "Modify Request", "primary", true)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
