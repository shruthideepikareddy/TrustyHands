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

const workerSkills = [
  "Plumbing Services",
  "Electrical Work",
  "Deep Cleaning",
  "Carpentry",
  "Painting Services",
  "AC Service",
  "Packers & Movers",
  "Kitchen Cleaning",
  "Event Staffing",
  "Home Sanitization",
  "Babysitting",
  "Gardening Services",
  "Bathroom Cleaning",
  "Fridge Repair",
  "TV Repair",
  "Cook Services",
  "Washing Machine Repair",
  "Car Detailing",
];

const WorkerDetails = () => {
  const [phone, setPhone] = useState("+91 ");
  const [line, setLine] = useState("");
  const [city, setCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [pincode, setPincode] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [idProofData, setIdProofData] = useState("");
  const [idProofName, setIdProofName] = useState("");
  const [profilePhotoData, setProfilePhotoData] = useState("");
  const [profilePhotoName, setProfilePhotoName] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const step1 = JSON.parse(localStorage.getItem("signupData") || "null");

  useEffect(() => {
    if (!step1) {
      navigate("/register");
    }
  }, [navigate, step1]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onIdProofChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIdProofName(file.name);
    const base64 = await toBase64(file);
    setIdProofData(base64);
  };

  const onProfilePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfilePhotoName(file.name);
    const base64 = await toBase64(file);
    setProfilePhotoData(base64);
  };

  const handleSubmit = async () => {
    setErrors([]);
    const newErrors = [];

    if (!step1) {
      newErrors.push("Missing registration step 1 data.");
    }
    if (!phone.trim()) newErrors.push("Phone is required.");
    if (!line.trim()) newErrors.push("Address line is required.");
    if (!city.trim()) newErrors.push("City is required.");
    if (!addressState.trim()) newErrors.push("State is required.");
    if (!pincode.trim()) newErrors.push("Pincode is required.");
    if (!skill.trim()) newErrors.push("Skill is required.");
    if (!experience.trim()) newErrors.push("Experience is required.");
    if (!idProofData) newErrors.push("ID Proof is required.");

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
          state: addressState.trim(),
          pincode: pincode.trim(),
        },
        workerDetails: {
          skill: skill.trim(),
          experience: experience.trim(),
          serviceArea: serviceArea.trim(),
          idProof: idProofData,
          profilePhoto: profilePhotoData,
        },
      };

      await axios.post(`${API_URL}/api/auth/register`, payload);
      localStorage.removeItem("signupData");
      alert("Wait for admin approval. Check after one day.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrors([err.response?.data?.message || "Registration failed."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-container" style={{ maxWidth: "800px" }}>
        <h2 className="register-form-title">Worker Profile Details - Step 2</h2>

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {/* Row 1: Demographics */}
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
              value={addressState}
              onChange={(e) => setAddressState(e.target.value)}
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
                Full Address Line <span style={{ color: "red" }}>*</span>
              </label>
              <LocationFetcher onLocationFetched={(data) => {
                const { address, display_name } = data;
                if (address.city || address.town || address.village) {
                  setCity(address.city || address.town || address.village);
                }
                if (address.state) {
                  setAddressState(address.state);
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

          <div
            className="form-section-divider"
            style={{
              gridColumn: "1 / -1",
              height: "1px",
              background: "rgba(96, 108, 56, 0.2)",
              margin: "10px 0",
            }}
          ></div>

          {/* Row 2: Professional Details */}
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
              Primary Skill <span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid rgba(96, 108, 56, 0.2)",
                borderRadius: "8px",
                background: "#fefae0",
              }}
              required
            >
              <option value="">-- Select Skill --</option>
              {workerSkills.map((s) => (
                <option key={s} value={s}>
                  {s}
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
              Years of Experience <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="e.g. 5 Years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
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
              Service Area Radius (km)
            </label>
            <input
              placeholder="e.g. 10"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid rgba(96, 108, 56, 0.2)",
                borderRadius: "8px",
              }}
            />
          </div>

          <div
            className="form-section-divider"
            style={{
              gridColumn: "1 / -1",
              height: "1px",
              background: "rgba(96, 108, 56, 0.2)",
              margin: "10px 0",
            }}
          ></div>

          {/* Row 3: Documents */}
          <div className="register-input-group" style={{ marginBottom: 0 }}>
            <label
              className="register-file-label"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#4f5e3f",
                fontSize: "0.9rem",
              }}
            >
              Upload ID Proof (Aadhaar/PAN){" "}
              <span style={{ color: "red" }}>*</span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={onIdProofChange}
                style={{ marginTop: "8px" }}
                required
              />
            </label>
            {idProofName && (
              <small style={{ color: "var(--primary)" }}>
                Selected: {idProofName}
              </small>
            )}
          </div>

          <div className="register-input-group" style={{ marginBottom: 0 }}>
            <label
              className="register-file-label"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#4f5e3f",
                fontSize: "0.9rem",
              }}
            >
              Upload Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={onProfilePhotoChange}
                style={{ marginTop: "8px" }}
              />
            </label>
            {profilePhotoName && (
              <small style={{ color: "var(--primary)" }}>
                Selected: {profilePhotoName}
              </small>
            )}
          </div>
        </div>

        <button
          className="register-submit-btn"
          disabled={isSubmitting}
          onClick={handleSubmit}
          style={{
            padding: "14px",
            fontSize: "1.05rem",
            width: "100%",
            marginTop: "10px",
          }}
        >
          {isSubmitting
            ? "Submitting securely..."
            : "Submit Registration for Approval"}
        </button>
      </div>
    </div>
  );
};

export default WorkerDetails;
