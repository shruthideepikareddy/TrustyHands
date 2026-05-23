import React from "react";
import "../styles/PolicyModal.css";

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-header">
          <i className="fas fa-file-contract"></i>
          <h2>Terms & Conditions</h2>
        </div>

        <div className="modal-body">
          <section className="policy-section">
            <h3>1. Agreement to Terms</h3>
            <p>
              By using Trustyhands, you agree to be bound by these terms and
              conditions.
            </p>
          </section>

          <section className="policy-section">
            <h3>2. Use License</h3>
            <p>
              You may use this site for personal, non-commercial purposes. You
              may not:
            </p>
            <ul>
              <li>Modify or copy materials</li>
              <li>Use content for commercial purposes</li>
              <li>Reverse engineer or decompile software</li>
              <li>Remove copyright or proprietary notices</li>
              <li>Mirror or transfer materials to other servers</li>
            </ul>
          </section>

          <section className="policy-section">
            <h3>3. Disclaimer of Warranties</h3>
            <p>
              Materials on this site are provided "as is". We make no warranties
              and disclaim all implied warranties including merchantability and
              fitness for a particular purpose.
            </p>
          </section>

          <section className="policy-section">
            <h3>4. Limitations of Liability</h3>
            <p>
              Trustyhands shall not be liable for any damages arising from use
              or inability to use the site or materials.
            </p>
          </section>

          <section className="policy-section">
            <h3>5. User Responsibilities</h3>
            <ul>
              <li>Provide accurate information</li>
              <li>Maintain confidentiality of credentials</li>
              <li>Not engage in fraudulent activity</li>
              <li>Treat others with respect</li>
              <li>Comply with applicable laws</li>
            </ul>
          </section>

          <section className="policy-section">
            <h3>6. Governing Law</h3>
            <p>
              These terms are governed by the laws of India. You submit to the
              exclusive jurisdiction of courts in that location.
            </p>
          </section>

          <section className="policy-section">
            <p className="last-updated">
              <strong>Last Updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
