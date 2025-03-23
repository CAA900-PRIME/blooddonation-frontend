import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert("OTP sent to your email");
                navigate("/verify-otp", { state: { email } });
            } else {
                alert("Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
            <div className="row w-50 shadow-lg rounded-4 p-4 bg-white text-center">
                <h3 className="mb-3 fw-bold text-danger">Forgot Password</h3>
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
                <button className="btn btn-danger w-100" onClick={handleSendOTP}>
                    Send OTP
                </button>
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
