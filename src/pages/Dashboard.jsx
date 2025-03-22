import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
	const navigate = useNavigate();
	const [bloodRequests, setBloodRequests] = useState([]);
	const [appliedRequests, setAppliedRequests] = useState([]);
	const [createdRequests, setCreatedRequests] = useState([
		// {
		//     id: 1,
		//     username: "John Doe",
		//     blood_type: "O+",
		//     city: "New York",
		//     country: "USA",
		//     hospital_name: "NYC General Hospital",
		//     hospital_address: "123 Main St, New York",
		//     appointment: "2025-04-15",
		//     status: "Pending"
		// },
		// {
		//     id: 2,
		//     username: "Jane Smith",
		//     blood_type: "A-",
		//     city: "Los Angeles",
		//     country: "USA",
		//     hospital_name: "LA Health Center",
		//     hospital_address: "456 Sunset Blvd, LA",
		//     appointment: "2025-04-20",
		//     status: "Confirmed"
		// }
	]);
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

	const handleModify = (request) => {
		navigate("/blood-request", { state: { request } });
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`/delete-application`, {
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

	const renderRequestList = (requests, btnText, btnColor, isCreated = false) => (
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
						{isCreated && (
							<>
								<button className="btn btn-primary btn-sm mt-2 w-100" onClick={() => handleModify(request)}>
									Modify Request
								</button>
								<button className="btn btn-danger btn-sm mt-2 w-100" onClick={() => handleDelete(request.id)}>
									Delete Request
								</button>
							</>
						)}
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
