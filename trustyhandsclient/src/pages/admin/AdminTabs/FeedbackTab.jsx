import React from "react";
import { capitalize } from "../../../utils/formatters";

const FeedbackTab = ({ feedbacks }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Feedback Overview</h2>
      <div className="table-pro-container animated-card">
        <table className="table-pro">
          <thead>
            <tr>
              <th>From (Customer)</th>
              <th>To (Worker)</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f._id}>
                <td>{capitalize(f.customerId?.fullName || "Anonymous")}</td>
                <td>{capitalize(f.workerId?.fullName)}</td>
                <td>
                  <div
                    style={{
                      color: "#fbc02d",
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    {(() => {
                      const fullStars = Math.floor(f.rating);
                      const hasHalfStar = f.rating % 1 !== 0;
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
    </div>
  );
};

export default FeedbackTab;
