import React from "react";
import { capitalize } from "../../../utils/formatters";

const WorkerApprovalsTab = ({
  pendingWorkers,
  handleStatusUpdate,
  setProofModal,
  proofModal,
}) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Worker Approvals</h2>
      {pendingWorkers.length === 0 ? (
        <div
          className="card-pro animated-card"
          style={{ padding: "30px", textAlign: "center" }}
        >
          <p style={{ margin: 0, color: "#666" }}>
            No pending worker applications at the moment.
          </p>
        </div>
      ) : (
        <div className="approvals-grid">
          {pendingWorkers.map((worker) => (
            <div
              key={worker._id}
              className="worker-card-slim animated-card"
              style={{ gap: "16px" }}
            >
              {/* Profile photo row */}
              <div className="worker-card-header">
                <div
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#e8f5e9",
                    border: "2px solid #a5d6a7",
                    flexShrink: 0,
                  }}
                >
                  {worker.profilePhoto || worker.workerDetails?.profilePhoto ? (
                    <img
                      src={
                        worker.profilePhoto ||
                        worker.workerDetails?.profilePhoto
                      }
                      alt="profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setProofModal({
                          src:
                            worker.profilePhoto ||
                            worker.workerDetails?.profilePhoto,
                          label: `${worker.fullName}'s Profile Photo`,
                        })
                      }
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "var(--primary)",
                      }}
                    >
                      {worker.fullName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="worker-info-stack">
                  <h4>{capitalize(worker.fullName)}</h4>
                  <span>{worker.workerDetails?.skill || "Expert"}</span>
                </div>
              </div>

              {/* ID Proof section */}
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#888",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  ID / Proof Document
                </p>
                {worker.workerDetails?.idProof ? (
                  <img
                    src={worker.workerDetails.idProof}
                    alt="ID Proof"
                    style={{
                      width: "100%",
                      maxHeight: "160px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "1px solid #ddd",
                    }}
                    onClick={() =>
                      setProofModal({
                        src: worker.workerDetails.idProof,
                        label: `${worker.fullName}'s ID Proof`,
                      })
                    }
                  />
                ) : (
                  <div
                    style={{
                      padding: "12px",
                      background: "#f8f8f8",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      color: "#999",
                      textAlign: "center",
                    }}
                  >
                    No proof document uploaded
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="worker-stats-row" style={{ flexWrap: "wrap" }}>
                <span>
                  <i className="fas fa-briefcase"></i>{" "}
                  {worker.workerDetails?.experience || "N/A"} Yrs
                </span>
                <span>
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {worker.workerDetails?.serviceArea || "—"} km
                </span>
              </div>
              <div className="worker-location-row">
                <i className="fas fa-phone"></i>
                <span>{worker.phone || "No phone"}</span>
              </div>
              <div className="worker-location-row">
                <i className="fas fa-envelope"></i>
                <span>{worker.email}</span>
              </div>
              <div className="worker-location-row">
                <i className="fas fa-map-pin"></i>
                <span>
                  {worker.address?.line ||
                    worker.address?.city ||
                    worker.address?.state ||
                    "No address"}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn-primary-rect btn-hover-effect"
                  style={{ flex: 1, padding: "8px" }}
                  onClick={() => handleStatusUpdate(worker._id, "approved")}
                >
                  <i className="fas fa-check"></i> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proof/Image Modal */}
      {proofModal && (
        <div
          onClick={() => setProofModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <strong style={{ fontSize: "0.95rem" }}>
                {proofModal.label}
              </strong>
              <button
                onClick={() => setProofModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#555",
                }}
              >
                ✕
              </button>
            </div>
            <img
              src={proofModal.src}
              alt={proofModal.label}
              style={{
                maxWidth: "70vw",
                maxHeight: "75vh",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerApprovalsTab;
