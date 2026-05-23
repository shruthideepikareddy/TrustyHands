import React from "react";
import { capitalize } from "../../../utils/formatters";

const MyJobsTab = ({ bookings, updateStatus, isBookingCompletable }) => {
  const acceptedBookings = bookings.filter((b) => b.status !== "pending");

  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">My Professional Jobs</h2>
      {acceptedBookings.length === 0 ? (
        <div
          className="card-pro animated-card"
          style={{ textAlign: "center", padding: "40px" }}
        >
          No jobs assigned yet.
        </div>
      ) : (
        <div className="table-pro-container animated-card">
          <table className="table-pro">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Estimate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {acceptedBookings.map((b) => (
                <tr key={b._id}>
                  <td>{capitalize(b.customerId?.fullName)}</td>
                  <td>{b.service}</td>
                  <td>{b.date}</td>
                  <td>₹ {b.proposedPrice ?? "N/A"}</td>
                  <td>
                    <span className={`status-badge badge-${b.status}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    {b.status === "accepted" && (
                      <button
                        className="btn-primary-rect btn-small btn-hover-effect"
                        disabled={!isBookingCompletable(b.date)}
                        title={
                          !isBookingCompletable(b.date)
                            ? "You can mark as complete only on the scheduled date"
                            : "Mark booking as completed"
                        }
                        onClick={() => updateStatus(b._id, "completed")}
                      >
                        Complete
                      </button>
                    )}
                    {b.status === "completed" && (
                      <span style={{ color: "#4caf50", fontWeight: "500" }}>
                        Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyJobsTab;
