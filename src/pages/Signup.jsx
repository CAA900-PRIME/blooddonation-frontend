import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import signupImage from "../assets/signup_image.jpg";

const Signup = () => {
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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    } = formData;

    // Basic validation
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
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setError(errorData.message || "Account creation failed.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center py-4">
      {/* 
        .row with .shadow-lg .rounded-4 .overflow-hidden => card with uniform corners
        position: relative => we can place the blurred background behind everything (zIndex: 0)
        minHeight: 450px so there's enough vertical space
      */}
      <div
        className="row shadow-lg rounded-4 overflow-hidden w-100"
        style={{ maxWidth: "1100px", minHeight: "450px", position: "relative" }}
      >
        {/* 
          1) The blurred background (absolutely positioned) 
             uses the same signupImage, blurred.
        */}
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

        {/*
          2) Foreground columns at zIndex:1:
             - The left image has a "fade-edge" mask so it merges gracefully with the blurred background.
        */}
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

      {/* Inline style for the fade-edge class (or place in a separate CSS file) */}
      <style>
        {`
          /* 
            Masks the right edge of the image so it fades to transparent.
            This merges smoothly with the blurred background behind it.
          */
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
    </div>
  );
};

export default Signup;
