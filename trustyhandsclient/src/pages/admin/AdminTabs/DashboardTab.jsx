import React from "react";

const DashboardTab = ({ stats, pendingWorkers }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Dashboard Overview</h2>
      <div className="stats-grid">
        {[
          {
            label: "Total Users",
            val: stats.totalUsers,
            icon: "users",
            bg: "#e0f2f1",
            col: "#00796b",
          },
          {
            label: "Experts",
            val: stats.totalWorkers,
            icon: "certificate",
            bg: "#f1f8e9",
            col: "#388e3c",
          },
          {
            label: "Total Tasks",
            val: stats.totalBookings,
            icon: "calendar-check",
            bg: "#fff3e0",
            col: "#ef6c00",
          },
          {
            label: "Pending Approvals",
            val: pendingWorkers.length,
            icon: "user-clock",
            bg: "#e3f2fd",
            col: "#1976d2",
          },
        ].map((s) => (
          <div key={s.label} className="stat-box animate-pulse-hover">
            <div
              className="stat-icon"
              style={{ background: s.bg, color: s.col }}
            >
              <i className={`fas fa-${s.icon}`}></i>
            </div>
            <div className="stat-info">
              <h5>{s.label}</h5>
              <span>{s.val}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="card-pro animated-card">
        <h3 style={{ margin: "0 0 10px", fontSize: "1rem" }}>
          System Oversight
        </h3>
        <p style={{ color: "#888", fontSize: "0.9rem" }}>
          The platform is performing securely. Use the sidebar to manage
          workers, bookings, and user accounts.
        </p>
      </div>
    </div>
  );
};

export default DashboardTab;
