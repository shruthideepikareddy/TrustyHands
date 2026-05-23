import React from "react";
import { capitalize } from "../../../utils/formatters";

const BookingsTab = ({ bookings }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Bookings Log</h2>
      <div className="table-pro-container animated-card">
        <table className="table-pro">
          <thead>
            <tr>
              <th>Client</th>
              <th>Expert</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{capitalize(b.customerId?.fullName)}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTab;
