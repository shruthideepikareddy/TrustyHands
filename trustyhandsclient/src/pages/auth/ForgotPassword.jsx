import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css"; // Reuse login styles for consistency

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // In a real app, you'd call an API to send a code/token.
            // For now, we simulate success and navigate to the reset page.
            await new Promise(resolve => setTimeout(resolve, 800));
            navigate("/reset-password", { state: { email } });
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-container" style={{ maxWidth: "500px" }}>
                <i className="fas fa-key login-decoration login-decoration-1"></i>
                <i className="fas fa-shield-alt login-decoration login-decoration-2"></i>

                <div className="login-logo-container">
                    <Link to="/" className="login-logo">
                        <i className="fas fa-hands-helping"></i>
                        <span>Trustyhands</span>
                    </Link>
                    <p className="login-logo-text">
                        Secure your account and reset your access
                    </p>
                </div>

                <div className="login-form-container">
                    {error && (
                        <div className="login-error-message">
                            <p><i className="fas fa-exclamation-circle"></i> {error}</p>
                        </div>
                    )}

                    <h1 className="login-form-title">Forgot Password?</h1>
                    <p style={{ textAlign: "center", color: "#666", marginBottom: "25px", fontSize: "0.95rem" }}>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div className="login-input-group">
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#4f5e3f" }}>Email Address</label>
                            <div style={{ position: "relative" }}>
                                <i className="fas fa-envelope input-icon" style={{ zIndex: 2 }}></i>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ width: "100%", padding: "12px", paddingLeft: "40px" }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="login-submit-btn"
                            disabled={isLoading}
                            style={{ padding: "14px", fontSize: "1.05rem" }}
                        >
                            {isLoading ? "Sending Link..." : "Send Reset Link"}
                        </button>
                    </form>

                    <div className="login-links" style={{ marginTop: "30px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
                        <Link to="/login" className="login-switch-btn" style={{ fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                            <i className="fas fa-arrow-left"></i> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
