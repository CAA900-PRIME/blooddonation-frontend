import React, { useState } from "react";
import "../styles/BloodRequest.css"; // Import the new CSS file

function BloodRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    city: "",
    hospital: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blood Request Submitted:", formData);
    alert("Your blood request has been submitted successfully!");
  };

  return (
    <div className="blood-request-container">
      <h2>Request Blood</h2>
      <form className="blood-request-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone Number</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Blood Group</label>
        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />

        <label>Hospital Name</label>
        <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} required />

        <label>Reason for Request</label>
        <textarea name="reason" value={formData.reason} onChange={handleChange} required></textarea>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default BloodRequest;
