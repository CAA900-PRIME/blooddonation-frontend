// SCRUM-37: Final Password Reset with Token

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch(`${apiUrl}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    if (response.ok) {
      alert("Password reset successful!");
      navigate("/login");
    } else {
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-danger">Reset Your Password</h3>
      <input
        className="form-control my-2"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        className="form-control my-2"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="btn btn-danger" onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
