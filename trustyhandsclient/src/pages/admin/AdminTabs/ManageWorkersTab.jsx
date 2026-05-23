import React from "react";
import { capitalize } from "../../../utils/formatters";

const ManageWorkersTab = ({ workers, handleStatusUpdate, suspendWorker }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Manage Workers</h2>
      <div className="table-pro-container animated-card">
        <table className="table-pro">
          <thead>
            <tr>
              <th>Name</th>
              <th>Skill</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => (
              <tr key={w._id}>
                <td>
                  <strong>{capitalize(w.fullName)}</strong>
                </td>
                <td>{w.workerDetails?.skill || "—"}</td>
                <td>{w.email}</td>
                <td>{w.phone || "—"}</td>
                <td>
                  <span
                    className={`status-badge ${
                      w.workerDetails?.status === "approved"
                        ? "badge-accepted"
                        : w.workerDetails?.status === "rejected"
                          ? "badge-rejected"
                          : w.isSuspended
                            ? "badge-suspended"
                            : "badge-pending"
                    }`}
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      ...(w.isSuspended && {
                        background: "#ffebee",
                        color: "#c62828",
                        border: "1px solid #ef5350",
                      }),
                    }}
                  >
                    {w.isSuspended
                      ? "Suspended"
                      : w.workerDetails?.status || "pending"}
                  </span>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <button
                      title="Lock account permanently"
                      onClick={() => suspendWorker(w._id)}
                      style={{
                        padding: "5px 12px",
                        color: "#c62828",
                        background: "#fdecea",
                        border: "1px solid #e57373",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageWorkersTab;
