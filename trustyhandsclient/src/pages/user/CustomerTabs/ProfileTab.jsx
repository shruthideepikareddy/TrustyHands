import React from "react";
import LocationFetcher from "../../../components/LocationFetcher";

const ProfileTab = ({
  isEditing,
  setIsEditing,
  profileData,
  setProfileData,
  handleProfileUpdate,
  saveLoading,
}) => {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

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
            <h3>General Identity</h3>
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
              <input
                type="text"
                value={profileData.fullName}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
              />
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
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, state: e.target.value },
                  })
                }
              />
            </div>
            <div className="profile-input-group">
              <label>City</label>
              <input
                type="text"
                value={profileData.address?.city || ""}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, city: e.target.value },
                  })
                }
              />
            </div>
            <div className="profile-input-group">
              <label>Pincode</label>
              <input
                type="text"
                value={profileData.address?.pincode || ""}
                readOnly={!isEditing}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: {
                      ...profileData.address,
                      pincode: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div
              className="profile-input-group"
              style={{ gridColumn: "1 / -1" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label style={{ margin: 0 }}>Full Address</label>
                {isEditing && (
                  <LocationFetcher
                    onLocationFetched={(data) => {
                      const { address, display_name } = data;
                      setProfileData({
                        ...profileData,
                        address: {
                          ...profileData.address,
                          city:
                            address.city ||
                            address.town ||
                            address.village ||
                            profileData.address.city,
                          state: address.state || profileData.address.state,
                          line: display_name,
                        },
                      });
                    }}
                  />
                )}
              </div>
              <textarea
                value={profileData.address?.line || ""}
                readOnly={!isEditing}
                rows="2"
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, line: e.target.value },
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
