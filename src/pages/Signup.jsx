import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    firstName: "",
    lastName: "",
    dob: "",
    postalCode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleCreateAccount = async () => {
    const {
      email,
      confirmEmail,
      firstName,
      lastName,
      dob,
      postalCode,
      phoneNumber,
      password,
      confirmPassword,
    } = formData;

    // Validation
    if (!email || !confirmEmail || !firstName || !lastName || !dob || !postalCode || !phoneNumber || !password || !confirmPassword) {
      setError("Please fill out all required fields.");
      return;
    }
    if (email !== confirmEmail) {
      setError("Email addresses do not match.");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and no spaces or invalid characters."
      );
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
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          dob,
          postalCode,
          phoneNumber,
          password,
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
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Create an Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email address (this will be your username)"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="confirmEmail"
        placeholder="Confirm email address"
        value={formData.confirmEmail}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstName"
        placeholder="First name (as shown on your government-issued ID)"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last name (as shown on your government-issued ID)"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dob"
        placeholder="Date of birth (MM/DD/YYYY)"
        value={formData.dob}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal code"
        value={formData.postalCode}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ marginLeft: "10px" }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <p style={{ fontSize: "0.9em", color: "gray" }}>
        Passwords must contain: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, no spaces, and no invalid characters.
      </p>
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
}

export default CreateAccount;
