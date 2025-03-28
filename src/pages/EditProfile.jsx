import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const EditProfile = ({ showAlert }) => {
	const [formData, setFormData] = useState({
		email: "",
		phoneNumber: "",
		homeAddress: "",
		firstName: "",
		lastName: "",
		dob: "",
		postalCode: "",
		country: "",
		city: ""
	});
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/users/get-user`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: "include"
				});
				if (!response.ok) {
					throw new Error("Failed to fetch profile data");
				}
				const user = await response.json();
				const formatDOB = new Date(user.dob).toISOString().split('T')[0];
				setFormData({
					email: user.email || "",
					phoneNumber: user.phone_number || "",
					homeAddress: user.home_address || "",
					firstName: user.firstName || "",
					lastName: user.lastName || "",
					dob: formatDOB || "",
					postalCode: user.postalCode || "",
					country: user.country || "",
					city: user.city || ""
				});

			} catch (error) {
				showAlert("Error fetching profile data", "danger");
			}
		};

		fetchProfile();
		const fetchCountries = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/country/get-countries`);
				if (!response.ok) throw new Error("Failed to fetch countries");
				const data = await response.json();
				setCountries(data.countries);
			} catch (error) {
				console.error("Error fetching countries:", error);
			}
		};

		fetchCountries();
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCountryChange = async (event) => {
		const selectedCountry = event.target.value;
		setFormData({ ...formData, country: selectedCountry, city: "" });

		try {
			const response = await fetch(`${apiUrl}/api/city/get-cities-of-country/${selectedCountry}`);
			if (!response.ok) throw new Error("Failed to fetch cities");
			const data = await response.json();
			setCities(data.cities);
		} catch (error) {
			console.error("Error fetching cities:", error);
			setCities([]);
		}
	};

	const handleUpdateProfile = async () => {
		try {
			const response = await fetch(`${apiUrl}/api/auth/edit-profile`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				showAlert("Profile updated successfully!", "success");
				navigate("/profile");
			} else {
				const err = await response.json();
				setError(err.error || "Profile update failed.");
				showAlert(err.error, "danger");
			}
		} catch (error) {
			showAlert(error, "danger");
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<div className="container d-flex align-items-center justify-content-center py-4">
			<div className="row shadow-lg rounded-4 w-100" style={{ maxWidth: "600px" }}>
				<div className="col p-4 bg-white">
					<h5 className="text-center mb-3">Edit Profile</h5>
					{error && <p className="text-danger text-center">{error}</p>}
					<form>
						<div className="mb-3">
							<label>Email Address</label>
							<input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<input
								type="text"
								name="firstName"
								className="form-control"
								placeholder="First Name"
								value={formData.firstName}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-3">
							<input
								type="text"
								name="lastName"
								className="form-control"
								placeholder="Last Name"
								value={formData.lastName}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-3">
							<input
								type="date"
								name="dob"
								className="form-control"
								value={formData.dob}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-3">
							<label>Phone Number</label>
							<input type="tel" name="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<label>Home Address</label>
							<input type="text" name="homeAddress" className="form-control" value={formData.homeAddress} onChange={handleChange} required />
						</div>
						<div className="mb-3">
							<input
								type="text"
								name="postalCode"
								className="form-control"
								placeholder="Postal Code"
								value={formData.postalCode}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-3">
							<label>Country</label>
							<select name="country" className="form-select" value={formData.country} onChange={handleCountryChange} required>
								<option disabled value="">Select Country</option>
								{countries.map((country, index) => (
									<option key={index} value={country.name}>{country.name}</option>
								))}
							</select>
						</div>
						<div className="mb-3">
							<label>City</label>
							<select name="city" className="form-select" value={formData.city} onChange={handleChange} required>
								<option disabled value="">Select City</option>
								{cities.map((city, index) => (
									<option key={index} value={city.name}>{city.name}</option>
								))}
							</select>
						</div>
						<button type="button" className="btn btn-danger w-100" onClick={handleUpdateProfile}>Update Profile</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;

