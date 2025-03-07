import React, { useState } from "react";
import "../styles/BloodRequest.css"; // Import the new CSS file

function BloodRequest({ user }) { // user prop passed to get requester_id
	const [formData, setFormData] = useState({
		requester_id: user?.id || "", // Assuming user is logged in
		doner_id: null, // Will be assigned later
		blood_type: "",
		hospital_name: "",
		hospital_address: "",
		country: "",
		city: "",
		contact_phone_number: "",
		status: "Pending", // Default status
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const requestData = JSON.stringify(formData);
		
		try {
			const response = await fetch("http://localhost:3000/api/blood-requests", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: requestData,
			});

			if (response.ok) {
				alert("Your blood request has been submitted successfully!");
				console.log("Blood Request Submitted:", formData);
			} else {
				alert("Failed to submit request. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting blood request:", error);
		}
	};

	return (
		<div className="blood-request-container">
			<h2>Request Blood</h2>
			<form className="blood-request-form" onSubmit={handleSubmit}>
				<label>Requester ID (Auto-filled)</label>
				<input type="text" name="requester_id" value={formData.requester_id} disabled />

				<label>Blood Type</label>
				<select name="blood_type" value={formData.blood_type} onChange={handleChange} required>
					<option value="">Select Blood Type</option>
					<option value="A+">A+</option>
					<option value="A-">A-</option>
					<option value="B+">B+</option>
					<option value="B-">B-</option>
					<option value="O+">O+</option>
					<option value="O-">O-</option>
					<option value="AB+">AB+</option>
					<option value="AB-">AB-</option>
				</select>

				<label>Hospital Name</label>
				<input type="text" name="hospital_name" value={formData.hospital_name} onChange={handleChange} required />

				<label>Hospital Address</label>
				<input type="text" name="hospital_address" value={formData.hospital_address} onChange={handleChange} required />

				<label>Country</label>
				<input type="text" name="country" value={formData.country} onChange={handleChange} required />

				<label>City</label>
				<input type="text" name="city" value={formData.city} onChange={handleChange} required />

				<label>Contact Phone Number</label>
				<input type="text" name="contact_phone_number" value={formData.contact_phone_number} onChange={handleChange} required />

				{/* Hidden Status Field (Default: Pending) */}
				<input type="hidden" name="status" value={formData.status} />

				<button type="submit">Submit Request</button>
			</form>
		</div>
	);
}

export default BloodRequest;
