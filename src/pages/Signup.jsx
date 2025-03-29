import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/signup_image.jpg";

const apiUrl = import.meta.env.VITE_API_URL;

const Signup = ({ showAlert }) => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		dob: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		homeAddress: "",
		city: "",
		country: "",
		postalCode: "",
		sex: "",
		blood_type: ""
	});

	const [showPassword, setShowPassword] = useState(false);
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await fetch(`${apiUrl}/api/country/get-countries`);
				if (!response.ok) {
					const err = await response.json();
					throw new Error(err.error);
				}
				const data = await response.json();
				setCountries(data.countries);
			} catch (error) {
				showAlert("error", "danger")
				console.error("Error fetching countries:", error);
			}
		};

		if (localStorage.getItem("user")) {
			navigate("/dashboard");
		}
		fetchCountries();
	}, [navigate]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCountryChange = async (event) => {
		const selectedCountry = event.target.value;
		setFormData((prevData) => ({
			...prevData,
			country: selectedCountry,
			city: "",
		}));

		try {
			const response = await fetch(`${apiUrl}/api/city/get-cities-of-country/${selectedCountry}`);
			if (!response.ok) {
				throw new Error("Failed to fetch cities");
			}
			const data = await response.json();
			setCities(data.cities);
		} catch (error) {
			showAlert("error", "danger")
			console.error("Error fetching cities:", error);
			setCities([]);
		}
	}

	const handleCreateAccount = async () => {
		const {
			username,
			firstName,
			lastName,
			dob,
			email,
			password,
			confirmPassword,
			phoneNumber,
			homeAddress,
			city,
			country,
			postalCode,
			sex,
			blood_type,
		} = formData;

		if (
			!username ||
			!firstName ||
			!lastName ||
			!dob ||
			!email ||
			!password ||
			!confirmPassword ||
			!phoneNumber ||
			!homeAddress ||
			!city ||
			!country ||
			!postalCode ||
			!sex ||
			!blood_type
		) {
			setError("Please fill out all required fields.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setError("");
		try {
			const response = await fetch(`${apiUrl}/api/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					firstName,
					lastName,
					dob,
					email,
					password,
					phoneNumber,
					homeAddress,
					city,
					country,
					postalCode,
					sex,
					blood_type,
				}),
			});

			if (response.ok) {
				navigate("/login");
			} else {
				const err = await response.json();
				setError(err.error || "Account creation failed.");
			}
		} catch (error) {
			showAlert(error, "danger")
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<div className="container d-flex align-items-center justify-content-center py-4">
			<div
				className="row shadow-lg rounded-4 overflow-hidden w-100"
				style={{ maxWidth: "1100px", minHeight: "450px", position: "relative" }}
			>
				<div
					style={{
						position: "absolute",
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						background: `url(${signupImage}) center/cover no-repeat`,
						filter: "blur(8px)",
						zIndex: 0,
					}}
				></div>

				<div
					className="col-md-5 d-flex align-items-center justify-content-center p-3"
					style={{ zIndex: 1 }}
				>
					<img
						src={signupImage}
						alt="Signup"
						className="fade-edge-img"
						style={{
							width: "auto",
							height: "400px",
							objectFit: "cover",
						}}
					/>
				</div>

				<div
					className="col-md-7 d-flex flex-column justify-content-center p-4 bg-white"
					style={{ zIndex: 1 }}
				>
					<h5 className="mb-3 text-center">
						<span className="text-danger fw-bold">Sign Up</span> for a New Account
					</h5>

					{error && <p className="text-danger text-center">{error}</p>}

					<form>
						<div className="row">
							<div className="col-md-6 mb-3">
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
							<div className="col-md-6 mb-3">
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
						</div>

						<div className="mb-3">
							<input
								type="text"
								name="username"
								className="form-control"
								placeholder="Username"
								value={formData.username}
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
							<input
								type="email"
								name="email"
								className="form-control"
								placeholder="Email Address"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="row">
							<div className="col-md-6 mb-3">
								<div className="input-group">
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										className="form-control"
										placeholder="Password"
										value={formData.password}
										onChange={handleChange}
										required
									/>
									<button
										type="button"
										className="btn btn-outline-danger"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? "🙈" : "👁️"}
									</button>
								</div>
							</div>
							<div className="col-md-6 mb-3">
								<input
									type={showPassword ? "text" : "password"}
									name="confirmPassword"
									className="form-control"
									placeholder="Confirm Password"
									value={formData.confirmPassword}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="mb-3">
							<input
								type="tel"
								name="phoneNumber"
								className="form-control"
								placeholder="Phone Number"
								value={formData.phoneNumber}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-3">
							<input
								type="text"
								name="homeAddress"
								className="form-control"
								placeholder="Home Address"
								value={formData.homeAddress}
								onChange={handleChange}
								required
							/>
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

						<div className="row">
							<div className="col-md-6 mb-3">
								<select
									name="country"
									className="form-select"
									value={formData.country}
									onChange={handleCountryChange}
									required
								>
									<option disabled value="">Select Country</option>
									{countries.length > 0 ? (
										countries.map((country, index) => (
											<option key={index} value={country.name}>{country.name}</option>
										))
									) : (
										<option disabled>Loading...</option>
									)}
								</select>
							</div>
							<div className="col-md-6 mb-3">
								<select
									name="city"
									className="form-select"
									value={formData.city}
									onChange={handleChange}
									disabled={!formData.country}
									required
								>
									<option disabled value="">Select City</option>
									{cities.length > 0 ? (
										cities.map((city, index) => (
											<option key={index} value={city.name}>{city.name}</option>
										))
									) : (
										<option disabled>No cities available</option>
									)}
								</select>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 mb-3">
								<select
									name="sex"
									className="form-select"
									value={formData.sex}
									onChange={handleChange}
									required
								>
									<option disabled value="">Select Sex</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="col-md-6 mb-3">
								<select
									name="blood_type"
									className="form-select"
									value={formData.blood_type}
									onChange={handleChange}
									required
								>
									<option disabled value="">Select Blood Type</option>
									<option value="A+">A+</option>
									<option value="A-">A-</option>
									<option value="B+">B+</option>
									<option value="B-">B-</option>
									<option value="AB+">AB+</option>
									<option value="AB-">AB-</option>
									<option value="O+">O+</option>
									<option value="O-">O-</option>
								</select>
							</div>
						</div>

						<p className="small text-muted text-center">
							By clicking Sign Up, you agree to our{" "}
							<a href="#">Terms and Conditions</a> and{" "}
							<a href="#">Privacy Policy</a>.
						</p>

						<button
							type="button"
							className="btn btn-danger w-100 py-2"
							onClick={handleCreateAccount}
						>
							SUBMIT
						</button>

						<div className="text-center mt-2">
							<button
								className="btn btn-link text-danger text-decoration-none"
								onClick={() => navigate("/login")}
							>
								Already have an account? Login
							</button>
						</div>
					</form>
				</div>
			</div >

			<style>
				{`
          .fade-edge-img {
            -webkit-mask-image: linear-gradient(
              to right,
              rgba(0,0,0,1) 85%,
              rgba(0,0,0,0) 100%
            );
            mask-image: linear-gradient(
              to right,
              rgba(0,0,0,1) 85%,
              rgba(0,0,0,0) 100%
            );
          }
        `}
			</style>
		</div >
	);
};

export default Signup;
