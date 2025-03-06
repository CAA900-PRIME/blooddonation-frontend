import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import signupImage from "../assets/signup_image.jpg"; // Import the image

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
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
    const { email, username, password, confirmPassword, phoneNumber, homeAddress, city, country, postalCode } = formData;

    if (!email || !username || !password || !confirmPassword || !phoneNumber || !homeAddress || !city || !country || !postalCode) {
      setError("Please fill out all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, phoneNumber, homeAddress, city, country, postalCode }),
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
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="row w-75 shadow-lg rounded-4 overflow-hidden signup-container">
        {/* Left Side - Image Section */}
        <div className="col-md-5 d-flex align-items-center justify-content-center text-white p-4 image-section">
          <img src={signupImage} alt="Signup" className="img-fluid w-100 h-100 object-fit-cover" />
        </div>

        {/* Right Side - Signup Form */}
        <div className="col-md-7 bg-white p-4 d-flex flex-column justify-content-center">
          <h5 className="mb-2">
            <span className="text-danger fw-bold">Sign Up</span> for a New Account
          </h5>

          {error && <p className="text-danger text-center">{error}</p>}

          <form>
            <div className="row">
              <div className="col-md-6 mb-2">
                <input type="email" name="email" className="form-control" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-2">
                <input type="text" name="username" className="form-control" placeholder="Username" value={formData.username} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <div className="input-group">
                  <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
                  <button type="button" className="btn btn-outline-danger" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <input type={showPassword ? "text" : "password"} name="confirmPassword" className="form-control" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <input type="tel" name="phoneNumber" className="form-control" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-2">
                <input type="text" name="homeAddress" className="form-control" placeholder="Home Address" value={formData.homeAddress} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <input type="text" name="city" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-2">
                <input type="text" name="country" className="form-control" placeholder="Country" value={formData.country} onChange={handleChange} required />
              </div>
            </div>

            <div className="mb-2">
              <input type="text" name="postalCode" className="form-control" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
            </div>

            <p className="small text-muted text-center">
              By clicking Sign Up, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
            </p>

            <button type="button" className="btn btn-danger w-100 py-2" onClick={handleCreateAccount}>
              SUBMIT
            </button>

            <div className="text-center mt-2">
              <button className="btn btn-link text-danger text-decoration-none" onClick={() => navigate("/login")}>Already have an account? Login</button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .signup-container {
            height: 90vh;
            max-width: 900px;
          }
          .image-section {
            padding: 0;
          }
          .image-section img {
            object-fit: cover;
          }
          .form-control {
            font-size: 0.9rem;
            padding: 0.5rem;
            border: 1px solid #ccc; /* Neutral border */
          }
          .form-control:focus {
            border-color: #D32F2F; /* Only red when focused */
            box-shadow: 0 0 5px rgba(211, 47, 47, 0.5);
          }
          .btn-danger {
            background-color: #D32F2F;
            border: none;
          }
          .btn-danger:hover {
            background-color: #B71C1C;
          }
          .btn-outline-danger {
            border-color: #D32F2F;
            color: #D32F2F;
          }
          .btn-outline-danger:hover {
            background-color: #D32F2F;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
