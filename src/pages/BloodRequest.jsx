import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHospital, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function BloodRequest({ user, showAlert }) {
	const navigate = useNavigate();
	const location = useLocation();
	const existingRequest = location.state?.request || null; // Retrieve data from navigation state
	const isEditing = !!existingRequest; // Check if modifying an existing request
	const [loading, setLoading] = useState(false);

	//This will ensure the data does not persist when changing between 'Blood Request' and 'Modify Request'
	const [formData, setFormData] = useState({});
	useEffect(() => {
		setFormData({
			requester_id: user?.id || "",
			hospital_name: existingRequest?.hospital_name || "",
			hospital_address: existingRequest?.hospital_address || "",
			country: existingRequest?.country || user?.country || "",
			city: existingRequest?.city || user?.city || "",
			phone_number: existingRequest?.phone_number || user?.phone_number || "",
			appointment: existingRequest?.appointment || "",
		});
	}, [existingRequest, user]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.hospital_name || !formData.phone_number) {
			showAlert("Please fill in all required fields.", "warning")
			return;
		}
		setLoading(true);

		try {
			const url = isEditing
				? `${apiUrl}/api/app/update-application/${existingRequest.id}`
				: `${apiUrl}/api/app/create-application`;
			const method = "POST"
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
				credentials: "include",
			});

			if (response.ok) {
				showAlert(isEditing ? "Request updated successfully!" : "Request submitted successfully!", "success");
				navigate("/dashboard");
			} else {
				const err = await response.json();
				showAlert(err.error, "danager")
			}
		} catch (error) {
			showAlert(error, "danager")
		}
		setLoading(false);
	};

	const handleCancel = () => {
		navigate("/dashboard");
	};

	return (
		<div className="container d-flex align-items-center justify-content-center min-vh-100">
			<div className="col-md-8">
				<div className="card shadow-lg p-4">
					<h2 className="text-center text-danger mb-4">{isEditing ? "Modify Blood Request" : "Request Blood"}</h2>
					<form onSubmit={handleSubmit}>
						{/* Requester ID */}
						<div className="mb-3">
							<label className="form-label">Requester ID</label>
							<div className="input-group">
								<span className="input-group-text"><FaUser /></span>
								<input type="text" className="form-control" name="requester_id" value={formData.requester_id} disabled />
							</div>
						</div>


						{/* Hospital Name */}
						<div className="mb-3">
							<label className="form-label">Hospital Name</label>
							<div className="input-group">
								<span className="input-group-text"><FaHospital /></span>
								<input type="text" className="form-control" name="hospital_name" value={formData.hospital_name} onChange={handleChange} required />
							</div>
						</div>

						{/* Hospital Address */}
						<div className="mb-3">
							<label className="form-label">Hospital Address</label>
							<div className="input-group">
								<span className="input-group-text"><FaMapMarkerAlt /></span>
								<input type="text" className="form-control" name="hospital_address" value={formData.hospital_address} onChange={handleChange} required />
							</div>
						</div>

						{/* Country & City */}
						<div className="mb-3">
							<label className="form-label">Country</label>
							<input type="text" className="form-control" name="country" value={formData.country} disabled />
						</div>

						<div className="mb-3">
							<label className="form-label">City</label>
							<input type="text" className="form-control" name="city" value={formData.city} disabled />
						</div>

						{/* Appointment */}
						<div className="mb-3">
							<label className="form-label">Appointment</label>
							<input type="datetime-local" name="appointment" className="form-control" value={formData.appointment} onChange={handleChange} required />
						</div>

						{/* Contact Phone Number */}
						<div className="mb-3">
							<label className="form-label">Contact Phone Number</label>
							<div className="input-group">
								<span className="input-group-text"><FaPhone /></span>
								<input type="text" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
							</div>
						</div>

						{/* Submit & Cancel Buttons */}
						<div className="text-center d-flex gap-2">
							<button type="submit" className="btn btn-danger w-50 py-2" disabled={loading}>
								{loading ? "Processing..." : isEditing ? "Update Request" : "Submit Request"}
							</button>
							<button type="button" className="btn btn-secondary w-50 py-2" onClick={handleCancel}>
								Cancel Request
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default BloodRequest;
