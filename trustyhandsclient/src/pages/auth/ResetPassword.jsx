import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Login.css";
import { API_URL } from '../../utils/api';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(`${API_URL}/api/auth/reset-password`, {
                email,
                password
            });
            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper" style={{ backgroundColor: "#fefae0" }}>
            <div className="login-container" style={{ maxWidth: "550px", borderTop: "4px solid #bc6c25" }}>
                <div className="login-logo-container">
                    <Link to="/" className="login-logo">
                        <i className="fas fa-hands-helping" style={{ color: "#bc6c25" }}></i>
                        <span style={{ color: "#283618" }}>Trustyhands</span>
                    </Link>
                    <p className="login-logo-text" style={{ fontSize: "0.85rem", color: "#606c38" }}>
                        Premium service platform connecting customers with trusted professionals
                    </p>
                </div>

                <div className="login-form-container">
                    <h1 className="login-form-title" style={{ fontSize: "1.6rem", color: "#283618", fontWeight: "700" }}>Create New Password</h1>
                    <div style={{ width: "40px", height: "3px", backgroundColor: "#bc6c25", margin: "10px auto 25px" }}></div>
                    
                    {email && (
                        <p style={{ textAlign: "center", color: "#666", marginBottom: "25px", fontSize: "0.95rem" }}>
                            Reset password for: <strong style={{ color: "#333" }}>{email}</strong>
                        </p>
                    )}

                    {error && (
                        <div className="login-error-message">
                            <p><i className="fas fa-exclamation-circle"></i> {error}</p>
                        </div>
                    )}

                    {success ? (
                        <div style={{ textAlign: "center", padding: "20px 0" }}>
                            <div style={{ 
                                width: "60px", 
                                height: "60px", 
                                background: "#f0fdf4", 
                                color: "#16a34a", 
                                borderRadius: "50%", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                margin: "0 auto 15px",
                                fontSize: "28px"
                            }}>
                                <i className="fas fa-check"></i>
                            </div>
                            <h2 style={{ color: "#2d3a1a", fontSize: "1.3rem", marginBottom: "10px" }}>Password Updated!</h2>
                            <p style={{ color: "#666", fontSize: "0.95rem" }}>
                                Your password has been successfully reset. <br/>
                                Redirecting you to login...
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div className="login-input-group">
                                <div style={{ position: "relative" }}>
                                    <i className="fas fa-lock input-icon" style={{ zIndex: 2, top: "50%", transform: "translateY(-50%)", color: "#606c38" }}></i>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ width: "100%", padding: "12px 40px", borderRadius: "8px", border: "1px solid #ddd", backgroundColor: "#fefae0" }}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 2, color: "#666" }}
                                    >
                                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>
                                </div>
                            </div>

                            <div className="login-input-group">
                                <div style={{ position: "relative" }}>
                                    <i className="fas fa-lock input-icon" style={{ zIndex: 2, top: "50%", transform: "translateY(-50%)", color: "#606c38" }}></i>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        style={{ width: "100%", padding: "12px 40px", borderRadius: "8px", border: "1px solid #ddd", backgroundColor: "#fefae0" }}
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 2, color: "#666" }}
                                    >
                                        <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="login-submit-btn"
                                disabled={isLoading}
                                style={{ 
                                    padding: "14px", 
                                    fontSize: "1rem", 
                                    marginTop: "10px", 
                                    backgroundColor: "#3a4124",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}
                            >
                                {isLoading ? "Updating..." : "Reset Password"}
                            </button>
                        </form>
                    )}

                    <div style={{ marginTop: "25px", textAlign: "center" }}>
                        <Link to="/forgot-password" style={{ color: "#606c38", fontSize: "0.9rem", textDecoration: "none", fontWeight: "600" }}>
                            <i className="fas fa-arrow-left" style={{ marginRight: "8px" }}></i> Use different email
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
