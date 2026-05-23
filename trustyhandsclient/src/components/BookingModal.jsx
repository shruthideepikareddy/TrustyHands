import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import LocationFetcher from "./LocationFetcher";
import "../styles/Register.css";
import { API_URL } from '../utils/api';

const BookingModal = ({ worker, onClose, onBookingComplete }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    description: "",
    proposedPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("th_user") || "null");
    setUser(userData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast("Please login to book a service.", "error");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (!formData.proposedPrice || Number(formData.proposedPrice) <= 0) {
        addToast(
          "Estimated price is required and must be greater than 0",
          "error",
        );
        setLoading(false);
        return;
      }

      const payload = {
        customerId: user.id || user._id,
        workerId: worker._id,
        service: worker.workerDetails?.skill || "General Service",
        date: formData.date,
        time: formData.time,
        address: formData.address,
        description: formData.description,
        proposedPrice: Number(formData.proposedPrice),
      };

      await axios.post(`${API_URL}/api/bookings`, payload);
      addToast(
        "Booking request sent successfully! Check your dashboard for updates.",
      );
      onBookingComplete();
    } catch (err) {
      addToast(
        err.response?.data?.message || "Failed to send booking request.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal" style={{ display: "flex", zIndex: 1000 }}>
      <div
        className="modal-content"
        style={{ maxWidth: "500px", padding: "30px", borderRadius: "16px" }}
      >
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 style={{ color: "var(--primary)", marginBottom: "10px" }}>
          Book Service
        </h2>
        <p style={{ marginBottom: "20px", color: "var(--text-light)" }}>
          Requesting <strong>{worker.workerDetails?.skill}</strong> from{" "}
          <strong>{worker.fullName}</strong>
        </p>

        {error && <div className="register-error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="register-full-form">
          <div className="register-grid-2">
            <div className="register-input-group">
              <label>Service Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                min={today}
              />
            </div>

            <div className="register-input-group">
              <label>Service Time</label>
              <input
                type="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="register-input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ margin: 0 }}>Service Address</label>
              <LocationFetcher onLocationFetched={(data) => {
                 setFormData({ ...formData, address: data.display_name });
              }} />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Full address where service is needed"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <label>
              Estimated Price (₹) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              name="proposedPrice"
              placeholder="Enter your estimated price"
              min="1"
              required
              value={formData.proposedPrice}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <label>Notes / Issue Description (Optional)</label>
            <textarea
              name="description"
              placeholder="Describe the issue or any specific requirements"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid rgba(96, 108, 56, 0.2)",
                minHeight: "80px",
              }}
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            className="register-submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending Request..." : "Confirm Booking Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
