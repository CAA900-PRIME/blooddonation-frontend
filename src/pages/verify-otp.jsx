import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaKey, FaLock } from "react-icons/fa";

const apiUrl = import.meta.env.VITE_API_URL;

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    // Determine password strength
    const checkStrength = (password) => {
        if (password.length < 6) return "Weak";
        if (/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) return "Strong";
        return "Medium";
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleVerifyOTP = async () => {
        if (!email || !otp || !newPassword || !confirmPassword) {
            alert("Please complete all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password should be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            if (response.ok) {
                alert("Password reset successful. Redirecting to login...");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                alert("Invalid OTP or failed to reset password.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("An error occurred. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
            <div className="row w-50 shadow-lg rounded-4 p-4 bg-white text-center">
                <h3 className="mb-3 fw-bold text-danger">Verify OTP</h3>
                <p className="text-muted">
                    Enter the OTP sent to <strong>{email}</strong> and your new password.
                </p>

                {/* OTP Input */}
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

                {/* New Password Input */}
                <div className="input-group mb-1">
                    <span className="input-group-text bg-danger text-white"><FaLock /></span>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setPasswordStrength(checkStrength(e.target.value));
                        }}
                    />
                </div>
                <div className="text-start mb-2">
                    <small className={`text-${passwordStrength === "Strong" ? "success" : passwordStrength === "Medium" ? "warning" : "danger"}`}>
                        Strength: {passwordStrength || ""}
                    </small>
                </div>

                {/* Confirm Password Input */}
                <div className="input-group mb-3">
                    <span className="input-group-text bg-danger text-white"><FaLock /></span>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Show/Hide Password Toggle */}
                <div className="form-check text-start mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                        id="togglePassword"
                    />
                    <label className="form-check-label" htmlFor="togglePassword">
                        Show Password
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    className="btn btn-danger w-100"
                    onClick={handleVerifyOTP}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Reset Password"}
                </button>
            </div>

            {/* Custom Styles */}
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

export default VerifyOTP;
