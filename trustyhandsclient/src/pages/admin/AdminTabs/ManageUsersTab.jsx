import React from "react";
import { capitalize } from "../../../utils/formatters";

const ManageUsersTab = ({ customers }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Manage Users</h2>
      <div className="table-pro-container animated-card">
        <table className="table-pro">
          <thead>
            <tr>
              <th>Identity</th>
              <th>Email Address</th>
              <th>Phone</th>
              <th>City</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((u) => (
              <tr key={u._id}>
                <td>
                  <strong>{capitalize(u.fullName)}</strong>
                </td>
                <td>{u.email}</td>
                <td>{u.phone || "—"}</td>
                <td>{u.address?.city || u.address?.line || "—"}</td>
                <td>
                  <span
                    className={`status-badge ${u.role === "admin" ? "badge-accepted" : "badge-pending"}`}
                  >
                    {u.role || "customer"}
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

export default ManageUsersTab;
