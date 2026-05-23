import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/HowItWorks.css";

const HowItWorks = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How quickly can I get service after booking?",
      answer:
        "Most services can be scheduled within 24 hours. For urgent requests, we have professionals available for same-day service in many areas.",
    },
    {
      question: "How do I become a Trustyhands worker?",
      answer:
        "Simply sign up on our platform, complete your profile, and go through our verification process. Once approved, you can start accepting service requests.",
    },
    {
      question: "What safety measures are in place?",
      answer:
        "All workers are verified through background checks. We also have a rating system and 24/7 support to ensure safety for both customers and workers.",
    },
    {
      question: "How does payment work?",
      answer:
        "Payments are handled directly between you and the worker at the service location. TrustyHands does NOT process payments or take a commission from the service fee. We recommend mutually deciding the final price before the work begins.",
    },

  ];

  const customerSteps = [
    {
      title: "Find & Book",
      icon: "fas fa-search",
      items: [
        {
          number: 1,
          title: "Browse Services",
          desc: "Explore our wide range of professional services",
        },
        {
          number: 2,
          title: "Select a Worker",
          desc: "View profiles, ratings, and reviews",
        },
        {
          number: 3,
          title: "Book Your Service",
          desc: "Choose date, time, and service details",
        },
      ],
    },
    {
      title: "Get Service",
      icon: "fas fa-calendar-check",
      items: [
        {
          number: 4,
          title: "Confirm Appointment",
          desc: "Receive confirmation and reminders",
        },
        {
          number: 5,
          title: "Professional Service",
          desc: "Our expert arrives on time to serve you",
        },
        {
          number: 6,
          title: "Secure Payment",
          desc: "Pay safely through our platform",
        },
      ],
    },
  ];

  const workerSteps = [
    {
      title: "Join & Setup",
      icon: "fas fa-user-plus",
      items: [
        {
          number: 1,
          title: "Create Profile",
          desc: "Sign up and complete your professional profile",
        },
        {
          number: 2,
          title: "Verification",
          desc: "Complete our verification process",
        },
        {
          number: 3,
          title: "Set Availability",
          desc: "Choose when and where you want to work",
        },
      ],
    },
    {
      title: "Work & Earn",
      icon: "fas fa-briefcase",
      items: [
        {
          number: 4,
          title: "Get Hired",
          desc: "Receive service requests from customers",
        },
        {
          number: 5,
          title: "Complete Service",
          desc: "Provide excellent service to customers",
        },
        {
          number: 6,
          title: "Get Paid",
          desc: "Receive secure payments through our platform",
        },
      ],
    },
  ];

  const benefits = [
    {
      icon: "fas fa-shield-alt",
      title: "Verified Professionals",
      desc: "All workers undergo thorough background checks and verification",
    },
    {
      icon: "fas fa-hand-holding-usd",
      title: "Transparent Pricing",
      desc: "No hidden fees. Know the cost upfront with no surprises",
    },
    {
      icon: "fas fa-clock",
      title: "24/7 Support",
      desc: "Our dedicated support team is available anytime to help",
    },
    {
      icon: "fas fa-star",
      title: "Customer Ratings",
      desc: "Read reviews and choose the best professional for your needs",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hiw-hero-section">
        <div className="container">
          <h1>How Trustyhands Works</h1>
          <p>
            Simple steps to get quality services or start earning with
            Trustyhands
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="hiw-section">
        <div className="container">
          <h2 className="section-title">For Customers</h2>
          <p className="hiw-section-description">
            Getting the service you need is quick and easy with Trustyhands.
            Follow these simple steps to find trusted professionals.
          </p>

          <div className="hiw-steps-container">
            {customerSteps.map((step, idx) => (
              <div key={idx} className="hiw-process-card">
                <div className="hiw-process-icon">
                  <i className={step.icon}></i>
                </div>
                <h3>{step.title}</h3>
                <div className="hiw-step-list">
                  {step.items.map((item) => (
                    <div key={item.number} className="hiw-step-item">
                      <div className="hiw-step-number">{item.number}</div>
                      <div className="hiw-step-content">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="section-title">For Workers</h2>
          <p className="hiw-section-description">
            Join our platform to offer your services and grow your business.
            Here's how to get started as a Trustyhands professional.
          </p>

          <div className="hiw-steps-container">
            {workerSteps.map((step, idx) => (
              <div key={idx} className="hiw-process-card">
                <div className="hiw-process-icon">
                  <i className={step.icon}></i>
                </div>
                <h3>{step.title}</h3>
                <div className="hiw-step-list">
                  {step.items.map((item) => (
                    <div key={item.number} className="hiw-step-item">
                      <div className="hiw-step-number">{item.number}</div>
                      <div className="hiw-step-content">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="hiw-benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Trustyhands</h2>
          <div className="hiw-benefits-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="hiw-benefit-card">
                <div className="hiw-benefit-icon">
                  <i className={benefit.icon}></i>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hiw-cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of satisfied customers and skilled professionals on
            our platform today.
          </p>
          <div className="hiw-cta-buttons">
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(true)}
            >
              Find a Worker
            </button>
            <button
              className="btn btn-darker"
              onClick={() => setShowModal(true)}
            >
              Become a Worker
            </button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="hiw-faqs">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="hiw-faq-container">
            {faqs.map((faq, idx) => (
              <div key={idx} className="hiw-faq-item">
                <div className="hiw-faq-question" onClick={() => toggleFaq(idx)}>
                  {faq.question}
                  <i
                    className={`fas fa-chevron-down ${activeFaq === idx ? "rotate" : ""}`}
                  ></i>
                </div>
                <div
                  className={`hiw-faq-answer ${activeFaq === idx ? "active" : ""}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div className="modal-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h2>Login Required</h2>
            <p>Please login or signup to access all features of Trustyhands</p>
            <div className="modal-buttons">
              <Link to="/login" className="btn btn-outline">
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HowItWorks;
