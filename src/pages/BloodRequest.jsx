import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTint, FaHospital, FaCity, FaPhone, FaGlobe, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function BloodRequest({ user }) {
    const navigate = useNavigate();
    const location = useLocation();
    const existingRequest = location.state?.request || null; // Retrieve data from navigation state
    const isEditing = !!existingRequest; // Check if modifying an existing request

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        requester_id: user?.id || "",
        blood_type: existingRequest?.blood_type || "",
        hospital_name: existingRequest?.hospital_name || "",
        hospital_address: existingRequest?.hospital_address || "",
        country: existingRequest?.country || user?.country || "",
        city: existingRequest?.city || user?.city || "",
        contact_phone_number: existingRequest?.contact_phone_number || user?.phone_number || "",
        appointment: existingRequest?.appointment || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.blood_type || !formData.hospital_name || !formData.contact_phone_number) {
            alert("Please fill in all required fields.");
            return;
        }
        setLoading(true);

        try {
            const url = isEditing
                ? `${apiUrl}/api/app/update-application/${existingRequest.id}`
                : `${apiUrl}/api/app/create-application`;
            const method = isEditing ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (response.ok) {
                alert(isEditing ? "Request updated successfully!" : "Request submitted successfully!");
                navigate("/dashboard");
            } else {
                alert("Failed to process request. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting blood request:", error);
        }

        setLoading(false);
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="col-md-8">
                <div className="card shadow-lg p-4">
                    <h2 className="text-center text-danger mb-4">{isEditing ? "Modify Blood Request" : "Request Blood"}</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Requester ID */}
                        <div className="mb-3">
                            <label className="form-label">Requester ID</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaUser /></span>
                                <input type="text" className="form-control" name="requester_id" value={formData.requester_id} disabled />
                            </div>
                        </div>

                        {/* Blood Type */}
                        <div className="mb-3">
                            <label className="form-label">Blood Type</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaTint /></span>
                                <select className="form-select" name="blood_type" value={formData.blood_type} onChange={handleChange} required>
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
                            </div>
                        </div>

                        {/* Hospital Name */}
                        <div className="mb-3">
                            <label className="form-label">Hospital Name</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaHospital /></span>
                                <input type="text" className="form-control" name="hospital_name" value={formData.hospital_name} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Hospital Address */}
                        <div className="mb-3">
                            <label className="form-label">Hospital Address</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaMapMarkerAlt /></span>
                                <input type="text" className="form-control" name="hospital_address" value={formData.hospital_address} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Contact Phone Number */}
                        <div className="mb-3">
                            <label className="form-label">Contact Phone Number</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaPhone /></span>
                                <input type="text" className="form-control" name="contact_phone_number" value={formData.contact_phone_number} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Submit & Cancel Buttons */}
                        <div className="text-center d-flex gap-2">
                            <button type="submit" className="btn btn-danger w-50 py-2" disabled={loading}>
                                {loading ? "Processing..." : isEditing ? "Update Request" : "Submit Request"}
                            </button>
                            <button type="button" className="btn btn-secondary w-50 py-2" onClick={handleCancel}>
                                Cancel Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BloodRequest;
