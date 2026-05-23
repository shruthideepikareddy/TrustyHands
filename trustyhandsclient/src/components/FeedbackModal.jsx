import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import { API_URL } from '../utils/api';

const FeedbackModal = ({ booking, onClose, onComplete }) => {
  const { addToast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      addToast("Please share your experience with us.", "error");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/bookings/feedback`, {
        bookingId: booking._id,
        customerId: booking.customerId?._id || booking.customerId,
        workerId: booking.workerId?._id || booking.workerId,
        rating,
        comment
      });
      addToast("Thank you for your feedback!");
      onComplete();
    } catch (err) {
      addToast("Failed to submit feedback", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal" style={{ display: "flex", zIndex: 1000 }}>
      <div className="modal-content" style={{ maxWidth: "450px", padding: "30px", borderRadius: "20px" }}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2 style={{ color: "var(--primary)", marginBottom: "10px" }}>Service Feedback</h2>
        <p style={{ marginBottom: "20px", color: "var(--text-light)" }}>
          How was your experience with <strong>{booking.workerId?.fullName}</strong> for <strong>{booking.service}</strong>?
        </p>

        <form onSubmit={handleSubmit}>
          <div className="rating-selector" style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center" }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <i 
                key={num} 
                className={`fa${rating >= num ? 's' : 'r'} fa-star`}
                style={{ fontSize: "2rem", color: "#fbc02d", cursor: "pointer" }}
                onClick={() => setRating(num)}
              ></i>
            ))}
          </div>

          <div className="register-input-group">
            <label>Your Message</label>
            <textarea 
              placeholder="Tell us what you liked or what could be improved..."
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ddd", minHeight: "100px" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          <button className="register-submit-btn" type="submit" disabled={loading} style={{ marginTop: "10px" }}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
