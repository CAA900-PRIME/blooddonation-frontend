import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
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
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="text-center mb-3">Create an account</h2>
        <p className="text-muted text-center">To continue, fill out your personal info</p>
        {error && <p className="text-danger text-center">{error}</p>}

        <form>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="email@gmail.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label>Username</label>
            <input type="text" name="username" className="form-control" placeholder="best_wizard421" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <div className="input-group">
              <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="**********" value={formData.password} onChange={handleChange} required />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label>Repeat Password</label>
            <div className="input-group">
              <input type={showPassword ? "text" : "password"} name="confirmPassword" className="form-control" placeholder="**********" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" className="form-control" placeholder="+1234567890" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label>Home Address</label>
            <input type="text" name="homeAddress" className="form-control" placeholder="123 Main St" value={formData.homeAddress} onChange={handleChange} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>City</label>
              <input type="text" name="city" className="form-control" placeholder="New York" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Country</label>
              <input type="text" name="country" className="form-control" placeholder="USA" value={formData.country} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label>Postal Code</label>
            <input type="text" name="postalCode" className="form-control" placeholder="10001" value={formData.postalCode} onChange={handleChange} required />
          </div>

          <p className="small text-muted text-center">
            By clicking Sign up, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
          </p>

          <button type="button" className="signup-btn" onClick={handleCreateAccount}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
