import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        const response = await fetch(`${apiUrl}/api/auth/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (response.ok) {
            alert("OTP sent to your email");
            setStep(2);
        } else {
            alert("Failed to send OTP");
        }
    };

    const handleVerifyOTP = async () => {
        const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp, newPassword }),
        });
        if (response.ok) {
            alert("Password reset successful. Please login.");
            navigate("/");
        } else {
            alert("Invalid OTP or failed to reset password");
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
            <div className="row w-50 shadow-lg rounded-4 p-4 bg-white text-center">
                <h3 className="mb-3 fw-bold text-danger">Forgot Password</h3>
                {step === 1 && (
                    <>
                        <p className="text-muted">Enter your email to receive an OTP.</p>
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-danger text-white"><FaEnvelope /></span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-danger w-100" onClick={handleSendOTP}>Send OTP</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <p className="text-muted">Enter the OTP sent to your email and set a new password.</p>
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-danger text-white"><FaKey /></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-danger text-white"><FaLock /></span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-danger w-100" onClick={handleVerifyOTP}>Reset Password</button>
                    </>
                )}
            </div>

            <style>
                {`
                    .bg-gradient {
                        background: linear-gradient(to right, #8B0000, #FF4500);
                    }
                    .input-group-text {
                        border-right: none;
                    }
                    .form-control {
                        border-left: none;
                    }
                `}
            </style>
        </div>
    );
};

export default ForgotPassword;
