import React from "react";

const ProfileTab = ({
  isEditing,
  setIsEditing,
  profileData,
  setProfileData,
  handleProfileUpdate,
  saveLoading,
}) => {
  const parseDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Account Settings</h2>

      <div className="profile-section-card animated-card">
        {/* Header: only show when NOT editing */}
        {!isEditing && (
          <div className="profile-settings-header">
            <h3>Professional Identity</h3>
            <button
              className="btn-orange-rect btn-hover-effect"
              style={{ padding: "6px 15px", fontSize: "0.85rem" }}
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit"></i>&nbsp; Edit Credentials
            </button>
          </div>
        )}

        <form onSubmit={handleProfileUpdate}>
          <div className="profile-grid">
            <div className="profile-input-group">
              <label>Full Name</label>
              <input type="text" value={profileData.fullName} readOnly />
            </div>
            <div className="profile-input-group">
              <label>Email Address</label>
              <input type="email" value={profileData.email} disabled />
            </div>
            <div className="profile-input-group">
              <label>Date of Birth</label>
              <input type="date" value={parseDate(profileData.dob)} readOnly />
            </div>
            <div className="profile-input-group">
              <label>Gender</label>
              <input
                type="text"
                value={
                  profileData.gender
                    ? profileData.gender.charAt(0).toUpperCase() +
                      profileData.gender.slice(1)
                    : ""
                }
                readOnly
              />
            </div>
            <div className="profile-input-group">
              <label>Mobile Contact</label>
              <input
                type="text"
                value={profileData.phone}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
              />
            </div>
            <div className="profile-input-group">
              <label>State</label>
              <input
                type="text"
                value={profileData.address?.state || ""}
                readOnly
              />
            </div>
            <div className="profile-input-group">
              <label>City</label>
              <input
                type="text"
                value={profileData.address?.city || ""}
                readOnly
              />
            </div>
            <div className="profile-input-group">
              <label>Pincode</label>
              <input
                type="text"
                value={profileData.address?.pincode || ""}
                readOnly
              />
            </div>
            <div
              className="profile-input-group"
              style={{ gridColumn: "1 / -1" }}
            >
              <label>Full Address</label>
              <textarea
                value={profileData.address?.line || ""}
                readOnly
                rows="2"
              />
            </div>
            <div className="profile-input-group">
              <label>Skill / Service</label>
              <input
                type="text"
                value={profileData.workerDetails?.skill || ""}
                readOnly
              />
            </div>
            <div className="profile-input-group">
              <label>Years of Experience</label>
              <input
                type="text"
                value={profileData.workerDetails?.experience || ""}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    workerDetails: {
                      ...profileData.workerDetails,
                      experience: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="profile-input-group">
              <label>Service Area (km)</label>
              <input
                type="text"
                value={profileData.workerDetails?.serviceArea || ""}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    workerDetails: {
                      ...profileData.workerDetails,
                      serviceArea: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          {isEditing && (
            <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>
              <button
                type="submit"
                className="btn-primary-rect btn-hover-effect"
                disabled={saveLoading}
              >
                {saveLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="btn-orange-rect btn-hover-effect"
                style={{
                  background: "#f8f8f8",
                  color: "#666",
                  border: "1px solid #ddd",
                }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;
