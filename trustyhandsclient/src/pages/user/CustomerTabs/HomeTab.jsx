import React from "react";

const HomeTab = ({ bookings, setActiveTab }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Welcome Home</h2>
      <div className="stats-grid">
        <div className="stat-box animate-pulse-hover">
          <div
            className="stat-icon"
            style={{ background: "#e3f2fd", color: "#1976d2" }}
          >
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-info">
            <h5>Bookings</h5>
            <span>{bookings.length}</span>
          </div>
        </div>
        <div className="stat-box animate-pulse-hover">
          <div
            className="stat-icon"
            style={{ background: "#f0f7f0", color: "#2ecc71" }}
          >
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h5>Done</h5>
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
          Find pre-verified experts for all your domestic and maintenance
          services. Every professional is community-rated for your trust and
          security.
        </p>
        <button
          className="btn-primary-rect btn-hover-effect"
          style={{ marginTop: "15px" }}
          onClick={() => setActiveTab("Search Services")}
        >
          Search Experts
        </button>
      </div>
    </div>
  );
};

export default HomeTab;
