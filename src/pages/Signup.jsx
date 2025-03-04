import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        phoneNumber: "",
        homeAddress: "",
        city: "",
        country: "",
        postalCode: ""
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
        const { email, username, password, phoneNumber, homeAddress, city, country, postalCode } = formData;

        // Validation
        if (!email || !username || !password || !phoneNumber || !homeAddress || !city || !country || !postalCode) {
            setError("Please fill out all required fields.");
            return;
        }
        if (!validatePassword(password)) {
            setError(
                "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number."
            );
            return;
        }

        setError("");
        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
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
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h2>Create an Account</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <div>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: "10px" }}>
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            <input type="tel" name="phoneNumber" placeholder="Phone number" value={formData.phoneNumber} onChange={handleChange} required />
            <input type="text" name="homeAddress" placeholder="Home address" value={formData.homeAddress} onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
            <input type="text" name="postalCode" placeholder="Postal code" value={formData.postalCode} onChange={handleChange} required />
            <p style={{ fontSize: "0.9em", color: "gray" }}>
                Passwords must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.
            </p>
            <button onClick={handleCreateAccount}>Create Account</button>
        </div>
    );
}

export default CreateAccount;
