import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure correct path
import bloodDonationImage from "../assets/blood-donation.jpg"; // Import the image
import "bootstrap/dist/css/bootstrap.min.css";
import signupImage from "../assets/signup_image.jpg"; // Import the image

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    homeAddress: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async () => {
    const {
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
    } = formData;

    if (
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
      !postalCode
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
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Account creation failed.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side - Form */}
      <div className="signup-form">
        <h2 className="text-center mb-3">Create an account</h2>
        <p className="text-muted text-center">To continue, fill out your personal info</p>
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
          <div className="row shadow-lg rounded-4 signup-container">
            {/* Left Side - Full Height Image */}
            <div className="col-md-6 p-0 d-flex align-items-center image-section">
              <img
                src={signupImage}
                alt="Signup"
                className="img-fluid image-full"
              />
            </div>

            {/* Right Side - Signup Form */}
            <div className="col-md-6 bg-white d-flex flex-column justify-content-center form-section p-4">
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

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="signup-image">
        <img src={bloodDonationImage} alt="Blood Donation" />
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .signup-container {
            height: 90vh;
            max-width: 1100px;
            display: flex;
            align-items: center;
          }
          .image-section {
            height: 100%;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .image-full {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
          .form-section {
            max-width: 600px;
            margin: auto;
          }
          .form-control {
            font-size: 0.9rem;
            padding: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
