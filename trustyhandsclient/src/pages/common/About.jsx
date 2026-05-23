import React from "react";
import { Link } from "react-router-dom";
import "../../styles/About.css";

const founders = [
  {
    name: "Shruthi Deepika",
    role: "CEO & Co-Founder",
    description:
      "With a background in technology and social entrepreneurship, Shruthi leads our vision to transform India's service industry.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
  },
  {
    name: "Durga Sravanthi",
    role: "CEO & Co-Founder",
    description:
      "Durga brings technical expertise and a passion for creating user-friendly platforms that solve real-world problems.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
  },
  {
    name: "Himakshi",
    role: "Operations Lead",
    description:
      "Himakshi focuses on operations and community building, ensuring both workers and customers have exceptional experiences.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
  },
  {
    name: "Deekshitha",
    role: "Chief Technical Officer",
    description:
      "Deekshitha steers the technology stack, ensuring Trustyhands stays fast and reliable with scalable architecture.",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c6c7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
  },
];

const processSteps = [
  {
    number: 1,
    icon: "user-plus",
    title: "Create Account",
    text: "Users sign up as customers or workers through our simple onboarding process",
  },
  {
    number: 2,
    icon: "search",
    title: "Find or Offer Services",
    text: "Customers find skilled workers nearby. Workers offer their services and set availability",
  },
  {
    number: 3,
    icon: "handshake",
    title: "Connect & Agree",
    text: "Parties connect directly, agree on terms, and confirm the job",
  },
  {
    number: 4,
    icon: "check-circle",
    title: "Complete & Review",
    text: "Job is completed, payment is processed securely, and both parties leave reviews",
  },
];

const About = () => {
  return (
    <div className="about-page">
      {/* About Hero Banner */}
      <section className="about-hero-section">
        <div className="container">
          <h1>About Trustyhands</h1>
          <p>Connecting skilled workers with people in need since 2023</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="about-story-content">
            <div className="about-story-text">
              <p>
                In India, finding reliable skilled workers like plumbers,
                electricians, cleaners, and construction workers at the right
                time has always been a challenge. Most people rely on neighbors,
                WhatsApp groups, or unverified contacts, which is slow and
                unreliable. At the same time, many skilled workers struggle to
                find regular employment, often depending on word of mouth or
                waiting at labor points hoping for work.
              </p>
              <br />
              <p>
                Trustyhands was born to solve this dual problem. Founded in 2023
                by three passionate entrepreneurs - Shruthi Deepika, Durga
                Sravanthi, and Khyathi Sree - our platform instantly connects
                users with nearby verified workers, making the process faster,
                safer, and more convenient for everyone involved.
              </p>
              <br />
              <p>
                Today, Trustyhands has grown to become one of India's leading
                service platforms, connecting thousands of skilled workers with
                customers across multiple cities. Our mission is to empower both
                workers and customers through technology, creating opportunities
                and solving everyday problems.
              </p>
            </div>
            <div className="about-story-image"></div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section
        className="about-section"
        style={{ backgroundColor: "rgba(221, 161, 94, 0.05)" }}
      >
        <div className="container">
          <h2 className="section-title">Meet Our Founders</h2>
          <div className="about-founders-grid">
            {founders.map((founder) => (
              <div key={founder.name} className="about-founder-card">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="about-founder-img"
                />
                <h3 className="about-founder-name">{founder.name}</h3>
                <p className="about-founder-role">{founder.role}</p>
                <p>{founder.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">How Trustyhands Works</h2>
          <p
            style={{
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto 30px",
            }}
          >
            Our platform simplifies the process of finding skilled workers while
            creating opportunities for service providers
          </p>
          <div className="about-process-steps">
            {processSteps.map((step) => (
              <div key={step.number} className="about-process-step">
                <div className="about-step-number">{step.number}</div>
                <div className="about-step-icon">
                  <i className={`fas fa-${step.icon}`}></i>
                </div>
                <h3 className="about-step-title">{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Us Section */}
      <section className="about-work-with-us">
        <div className="container">
          <div className="about-work-content">
            <h2 style={{ fontSize: "2.2rem", marginBottom: "15px" }}>
              Work With Trustyhands
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                maxWidth: "700px",
                margin: "0 auto 20px",
              }}
            >
              Join our mission to transform India's service industry and create
              opportunities for millions
            </p>
            <div className="about-work-options">
              <div className="about-work-option">
                <div className="about-work-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h3>Join Our Team</h3>
                <p>
                  We're always looking for talented individuals who share our
                  passion for innovation and social impact.
                </p>
                <Link
                  className="btn btn-secondary"
                  to="/careers"
                  style={{ marginTop: "15px", padding: "8px 20px" }}
                >
                  View Openings
                </Link>
              </div>
              <div className="about-work-option">
                <div className="about-work-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <h3>Become a Worker</h3>
                <p>
                  Join our platform as a skilled professional and access
                  thousands of job opportunities in your area.
                </p>
                <Link
                  className="btn btn-primary"
                  to="/register"
                  style={{ marginTop: "15px", padding: "8px 20px" }}
                >
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
