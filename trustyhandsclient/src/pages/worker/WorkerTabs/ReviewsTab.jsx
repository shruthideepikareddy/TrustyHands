import React from "react";
import { capitalize } from "../../../utils/formatters";

const ReviewsTab = ({ myReviews }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Expert Feedback</h2>
      {myReviews.length === 0 ? (
        <div
          className="card-pro animated-card"
          style={{ textAlign: "center", padding: "40px" }}
        >
          No reviews yet.
        </div>
      ) : (
        <div className="table-pro-container animated-card">
          <table className="table-pro">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Service Type</th>
                <th>Rating</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {myReviews.map((f) => (
                <tr key={f._id}>
                  <td>{capitalize(f.customerId?.fullName)}</td>
                  <td>{f.customerId?.service || "N/A"}</td>
                  <td>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {(() => {
                        const rating = f.rating;
                        const fullStars = Math.floor(rating);
                        const hasHalfStar = rating % 1 !== 0;
                        return (
                          <>
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fa${i < fullStars ? "s" : i === fullStars && hasHalfStar ? "s" : "r"} fa-star`}
                                style={{
                                  marginRight: "0px",
                                  color: "#fbc02d",
                                  fontSize: "0.85rem",
                                  opacity:
                                    i === fullStars && hasHalfStar ? 0.5 : 1,
                                }}
                              />
                            ))}
                            <span
                              style={{
                                fontSize: "0.85rem",
                                color: "#333",
                                marginLeft: "3px",
                                fontWeight: "500",
                              }}
                            >
                              {f.rating}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </td>
                  <td>{f.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
