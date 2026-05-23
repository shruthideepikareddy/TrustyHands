import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LocationFetcher from "../../components/LocationFetcher";
import { API_URL } from '../../utils/api';

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
  "Puducherry",
  "Other",
];

const CustomerDetails = () => {
  const [phone, setPhone] = useState("+91 ");
  const [line, setLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const step1 = JSON.parse(localStorage.getItem("signupData") || "null");

  useEffect(() => {
    if (!step1) {
      navigate("/register");
    }
  }, [navigate, step1]);

  const handleSubmit = async () => {
    setErrors([]);
    const newErrors = [];

    if (!step1) {
      newErrors.push("Missing registration step 1 data.");
    }
    if (!phone.trim()) newErrors.push("Phone is required.");
    if (!line.trim()) newErrors.push("Address line is required.");
    if (!city.trim()) newErrors.push("City is required.");
    if (!state.trim()) newErrors.push("State is required.");
    if (!pincode.trim()) newErrors.push("Pincode is required.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...step1,
        phone: phone.trim(),
        address: {
          line: line.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
        },
      };

      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        payload,
      );
      const user = response.data.user;

      const safeUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      };

      localStorage.setItem("th_user", JSON.stringify(safeUser));
      localStorage.setItem("th_logged_in", "true");
      localStorage.removeItem("signupData");
      navigate("/customer-dashboard");
    } catch (err) {
      console.error(err);
      setErrors([err.response?.data?.message || "Registration failed."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container" style={{ maxWidth: "700px" }}>
        <h2 className="register-form-title">Customer Details - Step 2</h2>

        {step1 && (
          <div className="worker-summary">
            <p>
              <strong>Name:</strong> {step1.fullName || "-"}
            </p>
            <p>
              <strong>Email:</strong> {step1.email || "-"}
            </p>
            <p>
              <strong>Role:</strong> {step1.role || "-"}
            </p>
            <p>
              <strong>DOB:</strong> {step1.dob || "-"}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {step1.gender
                ? step1.gender.charAt(0).toUpperCase() + step1.gender.slice(1)
                : "-"}
            </p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="register-error-message">
            {errors.map((err, idx) => (
              <p key={idx}>
                <i className="fas fa-exclamation-circle"></i> {err}
              </p>
            ))}
          </div>
        )}

        <form
          className="worker-details-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
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
                Mobile Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={phone}
                placeholder="+91 XXXXX XXXXX"
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid rgba(96, 108, 56, 0.2)",
                  borderRadius: "8px",
                }}
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
                State / UT <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid rgba(96, 108, 56, 0.2)",
                  borderRadius: "8px",
                  background: "#fefae0",
                }}
                required
              >
                <option value="">-- Select State --</option>
                {indianStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
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
                City <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={city}
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid rgba(96, 108, 56, 0.2)",
                  borderRadius: "8px",
                }}
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
                Pincode <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={pincode}
                placeholder="e.g. 500001"
                onChange={(e) => setPincode(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid rgba(96, 108, 56, 0.2)",
                  borderRadius: "8px",
                }}
                required
              />
            </div>

            <div
              className="register-input-group"
              style={{ gridColumn: "1 / -1", marginBottom: 0 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    color: "#4f5e3f",
                    fontSize: "0.9rem",
                    margin: 0
                  }}
                >
                  Address Line <span style={{ color: "red" }}>*</span>
                </label>
                <LocationFetcher onLocationFetched={(data) => {
                  const { address, display_name } = data;
                  if (address.city || address.town || address.village) {
                    setCity(address.city || address.town || address.village);
                  }
                  if (address.state) {
                    setState(address.state);
                  }
                  if (address.postcode) {
                    setPincode(address.postcode);
                  }
                  setLine(display_name);
                }} />
              </div>
              <input
                type="text"
                value={line}
                placeholder="House Number, Street Name, Area"
                onChange={(e) => setLine(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid rgba(96, 108, 56, 0.2)",
                  borderRadius: "8px",
                }}
                required
              />
            </div>
          </div>
          <button
            className="register-submit-btn"
            disabled={isSubmitting}
            type="submit"
            style={{ padding: "14px", fontSize: "1.05rem", width: "100%" }}
          >
            {isSubmitting ? "Submitting..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetails;
