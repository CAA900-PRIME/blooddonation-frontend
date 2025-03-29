// SCRUM-38: 2FA Enable + OTP Verify (Frontend)

import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const TwoFactorSetup = () => {
  const [secret, setSecret] = useState("");
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const generateSecret = async () => {
    const res = await fetch(`${apiUrl}/api/auth/generate-2fa-secret`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    setSecret(data.secret); // You can also return a QR image
  };

  const verifyOTP = async () => {
    const res = await fetch(`${apiUrl}/api/auth/verify-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ otp }),
    });

    if (res.ok) {
      alert("2FA Enabled!");
      setVerified(true);
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger">Enable Two-Factor Authentication</h3>
      {!secret && (
        <button className="btn btn-outline-danger" onClick={generateSecret}>
          Generate OTP Secret
        </button>
      )}

      {secret && (
        <div className="mt-3">
          <p><strong>OTP Secret:</strong> {secret}</p>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-danger" onClick={verifyOTP}>
            Verify OTP
          </button>
        </div>
      )}

      {verified && (
        <div className="alert alert-success mt-3">
           Two-Factor Authentication has been enabled!
        </div>
      )}
    </div>
  );
};

export default TwoFactorSetup;
