import React from "react";

const HomeTab = ({ bookings, setActiveTab }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Worker Hub Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-box animate-pulse-hover">
          <div
            className="stat-icon"
            style={{ background: "#e8f5e9", color: "#2e7d32" }}
          >
            <i className="fas fa-clipboard-list"></i>
          </div>
          <div className="stat-info">
            <h5>Pending</h5>
            <span>{bookings.filter((b) => b.status === "pending").length}</span>
          </div>
        </div>
        <div className="stat-box animate-pulse-hover">
          <div
            className="stat-icon"
            style={{ background: "#f1f8e9", color: "#388e3c" }}
          >
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h5>Completed</h5>
            <span>
              {bookings.filter((b) => b.status === "completed").length}
            </span>
          </div>
        </div>
      </div>

      <div className="card-pro animated-card">
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.95rem",
            lineHeight: "1.6",
          }}
        >
          Welcome to your workstation. Manage your job requests, track completed
          work, and maintain your professional profile.
        </p>
        <button
          className="btn-primary-rect btn-hover-effect"
          style={{ marginTop: "15px" }}
          onClick={() => setActiveTab("Job Requests")}
        >
          View Job Requests
        </button>
      </div>
    </div>
  );
};

export default HomeTab;
