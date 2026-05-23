import React, { useState } from "react";
import { capitalize } from "../../../utils/formatters";

const JobRequestsTab = ({
  bookings,
  acceptingId,
  setAcceptingId,
  handleAccept,
  updateStatus,
}) => {
  const pendingBookings = bookings.filter((b) => b.status === "pending");

  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Job Requests</h2>
      {pendingBookings.length === 0 ? (
        <div
          className="card-pro animated-card"
          style={{ textAlign: "center", padding: "40px" }}
        >
          No new job requests.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {pendingBookings.map((booking) => (
            <div
              key={booking._id}
              className="card-pro animated-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "1rem" }}>
                    {capitalize(booking.customerId?.fullName)}
                  </h4>
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: "800",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {booking.service}
                  </span>
                  <div
                    style={{
                      margin: "8px 0",
                      fontSize: "0.85rem",
                      color: "#666",
                    }}
                  >
                    <i className="fas fa-map-pin"></i> {booking.address}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#999" }}>
                    {booking.date} at {booking.time}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#444",
                      marginTop: "4px",
                    }}
                  >
                    <strong>Estimated Price:</strong> ₹{" "}
                    {booking.proposedPrice ?? "N/A"}
                  </div>
                </div>
                <div>
                  {!acceptingId || acceptingId !== booking._id ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        className="btn-primary-rect btn-hover-effect"
                        style={{ padding: "8px 20px" }}
                        onClick={() => setAcceptingId(booking._id)}
                      >
                        Review Request
                      </button>
                      <button
                        className="btn-orange-rect"
                        style={{
                          background: "#fff5f5",
                          color: "#d32f2f",
                          border: "1px solid #d32f2f",
                          boxShadow: "none",
                          padding: "8px 20px",
                        }}
                        onClick={() => updateStatus(booking._id, "rejected")}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        className="btn-primary-rect btn-hover-effect"
                        style={{ padding: "8px 20px" }}
                        onClick={() => handleAccept(booking._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn-orange-rect btn-hover-effect"
                        style={{
                          background: "#f8f8f8",
                          color: "#666",
                          border: "1px solid #ddd",
                          padding: "8px 20px",
                        }}
                        onClick={() => setAcceptingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {acceptingId === booking._id && (
                <div
                  style={{
                    background: "#f0f8f0",
                    padding: "12px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #4caf50",
                  }}
                >
                  <i
                    className="fas fa-info-circle"
                    style={{ color: "var(--primary)" }}
                  ></i>
                  <p
                    style={{
                      margin: "0 0 0 8px",
                      fontSize: "0.88rem",
                      color: "#4f5e3f",
                      fontWeight: "500",
                      display: "inline-block",
                    }}
                  >
                    Contact with the customer to finalize, then confirm.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobRequestsTab;
