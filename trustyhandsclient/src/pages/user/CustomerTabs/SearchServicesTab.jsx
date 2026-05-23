import React from "react";
import { capitalize, generateRandomRating } from "../../../utils/formatters";

const SearchServicesTab = ({
  searchCategory,
  setSearchCategory,
  searchLocation,
  setSearchLocation,
  searchTerm,
  setSearchTerm,
  filteredWorkers,
  setSelectedWorker,
}) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Professional Hub</h2>
      <div
        className="card-pro search-filters-card"
        style={{
          padding: "18px 20px",
          borderRadius: "18px",
          marginBottom: "25px",
          border: "1.5px solid #eef3f8",
        }}
      >
        <div
          className="search-filters-row"
          style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
        >
          <div className="search-filter-item" style={{ flex: "1 1 200px" }}>
            <label
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                color: "var(--primary)",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Service Category
            </label>
            <input
              type="text"
              className="styled-input"
              placeholder="Filter by skill or service"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div className="search-filter-item" style={{ flex: "1 1 200px" }}>
            <label
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                color: "var(--primary)",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Location
            </label>
            <input
              type="text"
              className="styled-input"
              placeholder="City or state"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div
            className="search-filter-item search-filter-wide"
            style={{ flex: "2 1 300px" }}
          >
            <label
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                color: "var(--primary)",
                marginBottom: "5px",
                display: "block",
              }}
            >
              Quick Search
            </label>
            <div
              className="search-input-inline"
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f5f7fa",
                borderRadius: "8px",
                padding: "0 10px",
                border: "1px solid #ddd",
              }}
            >
              <i className="fas fa-search" style={{ color: "#888" }}></i>
              <input
                type="text"
                placeholder="Search worker name or service"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  background: "transparent",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredWorkers
          .filter(
            (w) =>
              (w.fullName || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              (w.workerDetails?.skill || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
          )
          .map((w) => (
            <div
              key={w._id}
              className="worker-card-slim card-pro animate-fade-in-up"
            >
              <div className="worker-card-header">
                <div className="worker-avatar-circle">
                  {w.workerDetails?.profilePhoto ? (
                    <img
                      src={w.workerDetails.profilePhoto}
                      alt={w.fullName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    w.fullName[0]
                  )}
                </div>
                <div className="worker-info-stack">
                  <h4>{capitalize(w.fullName)}</h4>
                  <span>{w.workerDetails?.skill}</span>
                </div>
              </div>
              <div className="worker-stats-row">
                <span
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  {(() => {
                    const rating = generateRandomRating(w._id);
                    const fullStars = Math.floor(rating);
                    const hasHalfStar = rating % 1 !== 0;
                    return (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fa${i < fullStars ? "s" : i === fullStars && hasHalfStar ? "s" : "r"} fa-star`}
                            style={{
                              marginRight: "2px",
                              color: "#fbc02d",
                              opacity: i === fullStars && hasHalfStar ? 0.5 : 1,
                            }}
                          />
                        ))}
                      </>
                    );
                  })()}
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "#333",
                      marginLeft: "4px",
                    }}
                  >
                    {generateRandomRating(w._id)}
                  </span>
                </span>
                <span>
                  <i
                    className="fas fa-user-clock"
                    style={{ color: "var(--accent)" }}
                  ></i>{" "}
                  {w.workerDetails?.experience} Yrs
                </span>
              </div>
              <div
                className="worker-location-row"
                style={{ marginTop: "10px" }}
              >
                <i className="fas fa-map-pin" style={{ color: "#e91e63" }}></i>{" "}
                {w.address?.city || "Guntur"} | Serves{" "}
                {w.workerDetails?.serviceArea || "15"} km
              </div>
              <button
                className="btn-hire-compact btn-hover-effect"
                style={{ marginTop: "15px" }}
                onClick={() => setSelectedWorker(w)}
              >
                Hire Professional
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchServicesTab;
