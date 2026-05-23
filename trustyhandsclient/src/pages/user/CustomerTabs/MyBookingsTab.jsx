import React from "react";
import { capitalize } from "../../../utils/formatters";

const MyBookingsTab = ({ bookings, loading, handleCompleteBooking, isBookingCompletable }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">My Bookings</h2>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          Loading logs...
        </div>
      ) : bookings.length === 0 ? (
        <div
          className="card-pro animated-card"
          style={{ textAlign: "center", padding: "40px" }}
        >
          No orders listed.
        </div>
      ) : (
        <div className="table-pro-container animated-card">
          <table className="table-pro">
            <thead>
              <tr>
                <th>Professional</th>
                <th>Task</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const canComplete = isBookingCompletable(b.date);
                return (
                  <tr key={b._id}>
                    <td>{capitalize(b.workerId?.fullName)}</td>
                    <td>{b.service}</td>
                    <td>
                      {b.date} at {b.time}
                    </td>
                    <td>
                      <span className={`status-badge badge-${b.status}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      {b.status === "accepted" ? (
                        <button
                          className="btn-primary-rect btn-small btn-hover-effect"
                          disabled={!canComplete}
                          title={
                            !canComplete
                              ? "You can mark as complete only on the scheduled date"
                              : "Mark booking complete"
                          }
                          onClick={() => handleCompleteBooking(b._id)}
                        >
                          Complete
                        </button>
                      ) : (
                        <span
                          style={{ color: "#777", fontSize: "0.85rem" }}
                        >
                          {b.status === "completed" ? "Done" : "—"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookingsTab;
