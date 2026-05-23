import React, { useState, useEffect } from "react";
import "../../styles/Home.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("th_user");
    setIsLoggedIn(!!user);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="home-hero-carousel">
        {/* Slide 1 */}
        <div className={`home-carousel-slide ${currentSlide === 0 ? "active" : ""}`}>
          <div className="home-slide-content">
            <h1>
              Find <span>Trusted Professionals</span> For All Your Needs
            </h1>
            <p>
              Book verified workers for any task at your convenience. Fast,
              reliable, and hassle-free service.
            </p>
            {!isLoggedIn && (
              <div className="home-hero-buttons">
                <button className="btn btn-primary" onClick={openModal}>
                  Find a Worker
                </button>
                <button className="btn btn-secondary" onClick={openModal}>
                  Join as a Worker
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Slide 2 */}
        <div className={`home-carousel-slide ${currentSlide === 1 ? "active" : ""}`}>
          <div className="home-slide-content">
            <h1>
              <span>Premium Services</span> At Your Doorstep
            </h1>
            <p>
              From plumbing to cleaning, we connect you with the best
              professionals in your area.
            </p>
            {!isLoggedIn && (
              <div className="home-hero-buttons">
                <button className="btn btn-primary" onClick={openModal}>
                  Find a Worker
                </button>
                <button className="btn btn-secondary" onClick={openModal}>
                  Join as a Worker
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Slide 3 */}
        <div className={`home-carousel-slide ${currentSlide === 2 ? "active" : ""}`}>
          <div className="home-slide-content">
            <h1>
              Join Our Growing <span>Community</span> Today
            </h1>
            <p>
              Earn competitive income by offering your skills and services to
              thousands of customers.
            </p>
            {!isLoggedIn && (
              <div className="home-hero-buttons">
                <button className="btn btn-primary" onClick={openModal}>
                  Find a Worker
                </button>
                <button className="btn btn-secondary" onClick={openModal}>
                  Join as a Worker
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="home-carousel-indicators">
          <div
            className={`home-indicator ${currentSlide === 0 ? "active" : ""}`}
            onClick={() => showSlide(0)}
          ></div>
          <div
            className={`home-indicator ${currentSlide === 1 ? "active" : ""}`}
            onClick={() => showSlide(1)}
          ></div>
          <div
            className={`home-indicator ${currentSlide === 2 ? "active" : ""}`}
            onClick={() => showSlide(2)}
          ></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="home-how-works">
        <div className="container">
          <h2 className="section-title">How Trustyhands Works</h2>
          <div className="home-steps">
            <div className="home-step-card">
              <div className="home-step-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <h3 className="home-step-title">Create Account</h3>
              <p>
                Sign up as a customer or worker in minutes with our simple
                onboarding process.
              </p>
            </div>
            <div className="home-step-card">
              <div className="home-step-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="home-step-title">Find or Offer</h3>
              <p>
                Customers find skilled workers nearby. Workers offer their
                services.
              </p>
            </div>
            <div className="home-step-card">
              <div className="home-step-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="home-step-title">Connect & Work</h3>
              <p>
                Connect directly, agree on terms, and complete the job
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-services">
        <div className="container">
          <h2 className="section-title">Our Premium Services</h2>
          <div className="home-services-grid">
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="home-service-title">Electrician</h3>
              <p className="home-service-desc">
                Certified professionals for all electrical needs
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-faucet"></i>
              </div>
              <h3 className="home-service-title">Plumbing</h3>
              <p className="home-service-desc">
                Expert solutions for leaks and installations
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-wind"></i>
              </div>
              <h3 className="home-service-title">AC Service</h3>
              <p className="home-service-desc">
                Maintenance and repair for all AC units
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-broom"></i>
              </div>
              <h3 className="home-service-title">Deep Cleaning</h3>
              <p className="home-service-desc">
                Thorough cleaning for homes and offices
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-hammer"></i>
              </div>
              <h3 className="home-service-title">Carpentry</h3>
              <p className="home-service-desc">
                Custom woodwork and furniture repair
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-bath"></i>
              </div>
              <h3 className="home-service-title">Bathroom Cleaning</h3>
              <p className="home-service-desc">
                Sanitization and deep cleaning services
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-snowflake"></i>
              </div>
              <h3 className="home-service-title">Fridge Repair</h3>
              <p className="home-service-desc">
                Expert refrigeration repair and maintenance
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-paint-roller"></i>
              </div>
              <h3 className="home-service-title">Painting</h3>
              <p className="home-service-desc">
                Interior and exterior painting services
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-boxes"></i>
              </div>
              <h3 className="home-service-title">Packers & Movers</h3>
              <p className="home-service-desc">
                Professional packing and relocation services
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h3 className="home-service-title">Kitchen Cleaning</h3>
              <p className="home-service-desc">
                Deep cleaning for kitchens and appliances
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-hand-sparkles"></i>
              </div>
              <h3 className="home-service-title">Home Sanitization</h3>
              <p className="home-service-desc">
                Professional sanitization for healthy living
              </p>
            </div>
            <div className="home-service-card">
              <div className="home-service-icon">
                <i className="fas fa-tv"></i>
              </div>
              <h3 className="home-service-title">TV Repair</h3>
              <p className="home-service-desc">
                Expert repair for all television models
              </p>
            </div>
          </div>
          <div className="home-view-more">
            <a href="/services" className="home-view-more-btn">
              View More Services
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section className="home-customers">
        <div className="container">
          <h2 className="section-title">For Customers</h2>
          <div className="home-customer-content">
            <div className="home-customer-text">
              <h3
                style={{
                  fontSize: "1.6rem",
                  color: "var(--primary)",
                  marginBottom: "18px",
                }}
              >
                Find Trusted Professionals For All Your Needs
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  marginBottom: "22px",
                }}
              >
                At Trustyhands, we understand that finding reliable help for
                your home and business needs can be challenging. Our platform
                connects you with verified professionals who are ready to help
                with any task, big or small.
              </p>
              <div className="home-benefits-grid">
                <div className="home-benefit-card">
                  <div className="home-benefit-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--text)",
                        marginBottom: "6px",
                        fontSize: "1rem",
                      }}
                    >
                      Verified Workers
                    </h4>
                    <p style={{ fontSize: "0.85rem" }}>
                      All professionals undergo thorough background checks
                    </p>
                  </div>
                </div>
                <div className="home-benefit-card">
                  <div className="home-benefit-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--text)",
                        marginBottom: "6px",
                        fontSize: "1rem",
                      }}
                    >
                      Ratings & Reviews
                    </h4>
                    <p style={{ fontSize: "0.85rem" }}>
                      See feedback from other customers before hiring
                    </p>
                  </div>
                </div>
                <div className="home-benefit-card">
                  <div className="home-benefit-icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--text)",
                        marginBottom: "6px",
                        fontSize: "1rem",
                      }}
                    >
                      Secure Payments
                    </h4>
                    <p style={{ fontSize: "0.85rem" }}>
                      Safe and hassle-free payment transactions
                    </p>
                  </div>
                </div>
                <div className="home-benefit-card">
                  <div className="home-benefit-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--text)",
                        marginBottom: "6px",
                        fontSize: "1rem",
                      }}
                    >
                      24/7 Support
                    </h4>
                    <p style={{ fontSize: "0.85rem" }}>
                      Our dedicated team is always ready to assist you
                    </p>
                  </div>
                </div>
              </div>
              {!isLoggedIn && (
                <button
                  className="btn btn-primary"
                  style={{ marginTop: "25px", padding: "10px 25px" }}
                  onClick={openModal}
                >
                  Find a Worker Now
                </button>
              )}
            </div>
            <div className="home-customer-image">
              <img
                src="https://img.freepik.com/premium-vector/happy-client-customer-person-shaking-hands_87720-244.jpg"
                alt="Customer Image"
                style={{
                  width: "400px",
                  height: "400px",
                  borderRadius: "14px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workers Section */}
      <section className="home-workers">
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--secondary)" }}>
            For Workers
          </h2>
          <div className="home-worker-content">
            <div className="home-worker-image">
              <img
                src="https://static.vecteezy.com/system/resources/previews/023/981/182/original/group-of-people-in-different-professions-businessman-construction-worker-female-doctor-teacher-waiter-chef-cartoon-illustration-free-png.png"
                alt="Worker Image"
                style={{ width: "100%", height: "auto", borderRadius: "14px" }}
              />
            </div>
            <div className="home-worker-text">
              <h3
                style={{
                  fontSize: "1.6rem",
                  color: "var(--text)",
                  marginBottom: "18px",
                }}
              >
                Join Our Community of Skilled Professionals
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  marginBottom: "22px",
                }}
              >
                Trustyhands provides a platform for skilled workers to connect
                with customers who need their services. Expand your client base,
                set your own schedule, and grow your business with our
                professional platform.
              </p>
              <div className="home-benefits-grid">
                <div className="home-benefit-card">
                  <div className="home-benefit-icon">
                    <i className="fas fa-money-bill-wave"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--text)",
                        marginBottom: "6px",
                        fontSize: "1rem",
                      }}
                    >
                      Competitive Pay
                    </h4>
                    <p style={{ fontSize: "0.85rem" }}>
                      Set your rates and get paid fairly for your work
                    </p>
                  </div>
                </div>
                <div className="home-benefit-card">
                  <div className="home-benefit-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--text)",
                        marginBottom: "6px",
                        fontSize: "1rem",
                      }}
                    >
                      Flexible Schedule
                    </h4>
                    <p style={{ fontSize: "0.85rem" }}>
                      Choose when and where you want to work
                    </p>
                  </div>
                </div>
                <div className="home-benefit-card">
                  <div className="home-benefit-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--text)",
                        marginBottom: "6px",
                        fontSize: "1rem",
                      }}
                    >
                      Build Your Reputation
                    </h4>
                    <p style={{ fontSize: "0.85rem" }}>
                      Grow your client base through positive reviews
                    </p>
                  </div>
                </div>
                <div className="home-benefit-card">
                  <div className="home-benefit-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--text)",
                        marginBottom: "6px",
                        fontSize: "1rem",
                      }}
                    >
                      Insurance Protection
                    </h4>
                    <p style={{ fontSize: "0.85rem" }}>
                      Work with peace of mind with our coverage
                    </p>
                  </div>
                </div>
              </div>
              {!isLoggedIn && (
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: "25px", padding: "10px 25px" }}
                  onClick={openModal}
                >
                  Join as a Worker
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home-testimonials">
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--accent)" }}>
            Success Stories
          </h2>
          <div className="home-testimonial-container">
            <div className="home-testimonial">
              <div className="home-testimonial-header">
                <i className="fas fa-user"></i>
                <h3 style={{ color: "var(--text)", fontSize: "1.2rem" }}>
                  Customer Feedback
                </h3>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                "Trustyhands saved me when my kitchen sink burst on a Sunday!
                Found a plumber within 20 minutes who fixed everything
                professionally. The platform is incredibly easy to use and the
                quality of service exceeded my expectations."
              </p>
              <div className="home-client">
                <div className="home-client-avatar">SJ</div>
                <div className="home-client-info">
                  <h4>Sarah Johnson</h4>
                  <p>Homeowner in New York</p>
                </div>
              </div>
            </div>
            <div className="home-testimonial">
              <div className="home-testimonial-header">
                <i className="fas fa-tools"></i>
                <h3 style={{ color: "var(--text)", fontSize: "1.2rem" }}>
                  Worker Feedback
                </h3>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                "Since joining Trustyhands, I've doubled my monthly income. The
                platform connects me with serious clients who value my skills.
                The payment system is reliable and the support team is always
                helpful. Best decision I made for my business!"
              </p>
              <div className="home-client">
                <div className="home-client-avatar">MC</div>
                <div className="home-client-info">
                  <h4>Michael Chen</h4>
                  <p>Electrician & Trustyhands Pro</p>
                </div>
              </div>
            </div>
            <div className="home-testimonial">
              <div className="home-testimonial-header">
                <i className="fas fa-user"></i>
                <h3 style={{ color: "var(--text)", fontSize: "1.2rem" }}>
                  Customer Feedback
                </h3>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                "I've used Trustyhands for multiple services - cleaning,
                plumbing, and AC repair. Every professional arrived on time, did
                excellent work, and charged fairly. The app makes it so easy to
                book and manage services. Highly recommended!"
              </p>
              <div className="home-client">
                <div className="home-client-avatar">ER</div>
                <div className="home-client-info">
                  <h4>Emma Rodriguez</h4>
                  <p>Business Owner & Regular Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <h2>Ready to Experience Premium Service?</h2>
          <p>
            Join thousands of satisfied customers and skilled professionals on
            our platform today.
          </p>
          {!isLoggedIn && (
            <div className="home-hero-buttons">
              <button className="btn btn-darker" onClick={openModal}>
                Find a Worker
              </button>
              <button className="btn btn-secondary" onClick={openModal}>
                Join as a Worker
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="modal"
          style={{ display: "flex" }}
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h2>Login Required</h2>
            <p>Please login or signup to access all features of Trustyhands</p>
            <div className="modal-buttons">
              <a href="/login" className="btn btn-outline">
                Log In
              </a>
              <a href="/register" className="btn btn-primary">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
