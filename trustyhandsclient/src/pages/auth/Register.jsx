import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setErrors([]);
    const newErrors = [];

    if (!fullName.trim()) newErrors.push("Full Name is required.");
    if (!email.trim()) newErrors.push("Email is required.");
    if (password.length < 8)
      newErrors.push("Password must be at least 8 characters long.");
    if (password !== confirmPassword) newErrors.push("Passwords do not match.");
    if (!dob) newErrors.push("Date of Birth is required.");
    if (!gender) newErrors.push("Gender is required.");
    if (!role) newErrors.push("Please select a role.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const signupData = {
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      role,
      dob,
      gender,
    };

    localStorage.setItem("signupData", JSON.stringify(signupData));

    if (role === "customer") {
      navigate("/customer-details");
    } else if (role === "worker") {
      navigate("/worker-details");
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container" style={{ maxWidth: "700px" }}>
        <i className="fas fa-hands-helping register-decoration register-decoration-1"></i>
        <i className="fas fa-tools register-decoration register-decoration-2"></i>

        <div className="register-logo-container">
          <Link to="/" className="register-logo">
            <i className="fas fa-hands-helping"></i>
            <span>Trustyhands</span>
          </Link>
          <p className="register-logo-text">
            Premium service platform connecting customers with trusted professionals
          </p>
        </div>

        <div className="register-form-container">
          {errors.length > 0 && (
            <div className="register-error-message">
              {errors.map((err, idx) => (
                <p key={idx}>
                  <i className="fas fa-exclamation-circle"></i> {err}
                </p>
              ))}
            </div>
          )}

          <h1 className="register-form-title">Create Account - Step 1</h1>

          <form onSubmit={handleNext}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginBottom: "15px",
              }}
            >
              <div className="register-input-group" style={{ marginBottom: 0 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#4f5e3f",
                    fontSize: "0.9rem",
                  }}
                >
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ padding: "12px", width: "100%" }}
                  required
                />
              </div>

              <div className="register-input-group" style={{ marginBottom: 0 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#4f5e3f",
                    fontSize: "0.9rem",
                  }}
                >
                  Email Address <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: "12px", width: "100%" }}
                  required
                />
              </div>

              <div className="register-input-group" style={{ marginBottom: 0 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#4f5e3f",
                    fontSize: "0.9rem",
                  }}
                >
                  Date of Birth <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDob(e.target.value)}
                  style={{ padding: "12px", width: "100%" }}
                  required
                />
              </div>

              <div className="register-input-group" style={{ marginBottom: 0 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#4f5e3f",
                    fontSize: "0.9rem",
                  }}
                >
                  Gender <span style={{ color: "red" }}>*</span>
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    background: "#f8faf3",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "1px solid rgba(96, 108, 56, 0.2)",
                  }}
                >
                  {["male", "female", "other"].map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={gender === option}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          accentColor: "var(--primary)",
                        }}
                      />
                      <span style={{ textTransform: "capitalize" }}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="register-input-group" style={{ marginBottom: 0 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#4f5e3f",
                    fontSize: "0.9rem",
                  }}
                >
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <div
                  className="password-input-wrapper"
                  style={{ position: "relative" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      paddingRight: "40px",
                    }}
                  />
                  <span
                    className="register-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                  >
                    <i
                      className={
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </span>
                </div>
              </div>

              <div className="register-input-group" style={{ marginBottom: 0 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#4f5e3f",
                    fontSize: "0.9rem",
                  }}
                >
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </label>
                <div
                  className="password-input-wrapper"
                  style={{ position: "relative" }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      paddingRight: "40px",
                    }}
                  />
                  <span
                    className="register-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                  >
                    <i
                      className={
                        showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </span>
                </div>
              </div>

              <div
                className="register-input-group role-radio-group"
                style={{ gridColumn: "1 / -1", marginBottom: 0 }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "600",
                    color: "#4f5e3f",
                    fontSize: "0.9rem",
                  }}
                >
                  Select Your Role <span style={{ color: "red" }}>*</span>
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: "30px",
                    alignItems: "center",
                    background: "#f8faf3",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid rgba(96, 108, 56, 0.2)",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "1rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={role === "customer"}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                        accentColor: "var(--primary)",
                      }}
                    />
                    <span>Customer</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "1rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="worker"
                      checked={role === "worker"}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                        accentColor: "var(--primary)",
                      }}
                    />
                    <span>Worker / Service Provider</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="register-submit-btn"
              style={{
                marginTop: "10px",
                padding: "14px",
                fontSize: "1.05rem",
              }}
            >
              Proceed to Next Step{" "}
              <i
                className="fas fa-arrow-right"
                style={{ marginLeft: "8px" }}
              ></i>
            </button>
          </form>

          <div className="register-links" style={{ marginTop: "20px" }}>
            <p>Already Have an Account?</p>
            <Link
              to="/login"
              className="register-switch-btn"
              style={{ fontSize: "1rem" }}
            >
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
