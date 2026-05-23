import React from "react";

const ContactMessagesTab = ({ contacts }) => {
  return (
    <div className="content-inner slide-in">
      <h2 className="console-title">Support Inbox</h2>
      {!contacts || contacts.length === 0 ? (
        <div
          className="card-pro animated-card"
          style={{ padding: "30px", textAlign: "center" }}
        >
          <p style={{ margin: 0, color: "#666" }}>
            No contact messages at the moment.
          </p>
        </div>
      ) : (
        <div className="table-pro-container animated-card">
          <table className="table-pro">
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>Email Address</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>{c.email}</td>
                  <td
                    style={{
                      fontSize: "0.85rem",
                      color: "#555",
                      lineHeight: "1.5",
                      fontStyle: "italic",
                    }}
                  >
                    "{c.message}"
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactMessagesTab;
