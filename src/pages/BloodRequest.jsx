import React, { useState } from "react";

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
    <div className="container mt-5">
      <h2 className="mb-4">Request Blood</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Blood Group</label>
          <select name="bloodGroup" className="form-control" value={formData.bloodGroup} onChange={handleChange} required>
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
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Hospital Name</label>
          <input type="text" name="hospital" className="form-control" value={formData.hospital} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Reason for Request</label>
          <textarea name="reason" className="form-control" value={formData.reason} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="btn btn-danger">Submit Request</button>
      </form>
    </div>
  );
}

export default BloodRequest;
