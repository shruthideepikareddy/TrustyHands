import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../../context/ToastContext";
import "../../styles/ContactUs.css";
import { API_URL } from '../../utils/api';

const ContactUs = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("th_user") || "null");
    if (user) {
      setFormData(prev => ({
        ...prev,
        full_name: user.fullName || "",
        email: user.email || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/api/contact`, {
        name: formData.full_name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      
      setSubmitted(true);
      addToast("Message sent successfully! We will contact you soon.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="contact-page">
      <section className="contact-hero-section">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to assist you with any questions or requests</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-form-container">
              <div className="contact-card">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-group">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="subject">Subject</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Choose a subject
                      </option>
                      <option value="service">Service Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="worker">Become a Worker</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>

                {submitted && (
                  <div className="contact-form-success">
                    <i className="fas fa-check-circle" />
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you. We will contact you within 24 hours.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="contact-info-container">
              <div className="contact-card">
                <h2>Office Contact</h2>
                <div className="contact-info">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      {" "}
                      <i className="fas fa-map-marker-alt" />{" "}
                    </div>
                    <div className="contact-info-content">
                      <h3>Headquarters</h3>
                      <p>Plot No. 45, Srinagar Colony, Guntur, AP 522006</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      {" "}
                      <i className="fas fa-phone-alt" />{" "}
                    </div>
                    <div className="contact-info-content">
                      <h3>Phone</h3>
                      <p>+91 86394 52100</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      {" "}
                      <i className="fas fa-envelope" />{" "}
                    </div>
                    <div className="contact-info-content">
                      <h3>Email</h3>
                      <p>support@trustyhands.com</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      {" "}
                      <i className="fas fa-clock" />{" "}
                    </div>
                    <div className="contact-info-content">
                      <h3>Hours</h3>
                      <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-map-container">
            <div className="contact-map-overlay">
              <h3>Visit Our Guntur Office</h3>
              <p>
                <i className="fas fa-map-marker-alt" /> Plot No. 45, Srinagar
                Colony, Guntur, AP 522006
              </p>
              <p>
                <i className="fas fa-clock" /> Open today: 9:00 AM - 8:00 PM
              </p>
              <p>
                <i className="fas fa-phone" /> +91 86394 52100
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
