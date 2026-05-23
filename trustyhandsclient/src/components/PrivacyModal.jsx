import React from "react";
import "../styles/PolicyModal.css";

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-header">
          <i className="fas fa-shield-alt"></i>
          <h2>Privacy Policy</h2>
        </div>

        <div className="modal-body">
          <section className="policy-section">
            <h3>1. Introduction</h3>
            <p>
              We are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your information.
            </p>
          </section>

          <section className="policy-section">
            <h3>2. Information We Collect</h3>
            <ul>
              <li>Personal information (name, email, phone, address)</li>
              <li>Payment information (processed securely)</li>
              <li>Account information (username, profile details)</li>
              <li>Usage data (pages visited, clicks, bookings)</li>
              <li>Device information (IP address, browser type)</li>
            </ul>
          </section>

          <section className="policy-section">
            <h3>3. How We Use Your Information</h3>
            <ul>
              <li>To provide and maintain our service</li>
              <li>To process transactions</li>
              <li>To send updates and offers</li>
              <li>To prevent fraud</li>
              <li>To improve our platform</li>
            </ul>
          </section>

          <section className="policy-section">
            <h3>4. Data Security</h3>
            <p>
              We implement security measures to protect your information.
              However, no method is 100% secure.
            </p>
          </section>

          <section className="policy-section">
            <h3>5. Sharing Your Information</h3>
            <p>
              We do not sell your information. We may share data with service
              providers, payment processors, or when required by law.
            </p>
          </section>

          <section className="policy-section">
            <h3>6. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your information.
              Contact us at support@trustyhands.com.
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

export default PrivacyModal;
