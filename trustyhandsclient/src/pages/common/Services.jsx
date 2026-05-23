import React, { useState, useMemo } from "react";
import "../../styles/Services.css";

const servicesData = [
  {
    id: 1,
    title: "Plumbing Services",
    icon: "fa-faucet",
    description: "Expert solutions for leaks, installations, and all plumbing needs.",
    category: "repairs",
  },
  {
    id: 2,
    title: "Electrical Work",
    icon: "fa-bolt",
    description: "Certified electricians for installations, repairs and maintenance.",
    category: "repairs",
  },
  {
    id: 3,
    title: "Deep Cleaning",
    icon: "fa-broom",
    description: "Thorough cleaning for homes, offices and commercial spaces.",
    category: "domestic",
  },
  {
    id: 4,
    title: "Carpentry",
    icon: "fa-hammer",
    description: "Custom woodwork, furniture repair and installations.",
    category: "repairs",
  },
  {
    id: 5,
    title: "Painting Services",
    icon: "fa-paint-roller",
    description: "Interior and exterior painting for homes and businesses.",
    category: "repairs",
  },
  {
    id: 6,
    title: "AC Service",
    icon: "fa-wind",
    description: "Maintenance, repair and installation for all AC units.",
    category: "repairs",
  },
  {
    id: 7,
    title: "Packers & Movers",
    icon: "fa-boxes",
    description: "Professional packing and relocation services.",
    category: "movers",
  },
  {
    id: 8,
    title: "Kitchen Cleaning",
    icon: "fa-utensils",
    description: "Deep cleaning for kitchens and appliances.",
    category: "domestic",
  },
  {
    id: 9,
    title: "Event Staffing",
    icon: "fa-glass-cheers",
    description: "Professional staff for events, parties and gatherings.",
    category: "event",
  },
  {
    id: 10,
    title: "Home Sanitization",
    icon: "fa-hand-sparkles",
    description: "Professional sanitization for healthy living.",
    category: "domestic",
  },
  {
    id: 11,
    title: "Babysitting",
    icon: "fa-baby",
    description: "Reliable childcare professionals for your family.",
    category: "domestic",
  },
  {
    id: 12,
    title: "Gardening Services",
    icon: "fa-leaf",
    description: "Landscaping, lawn care and garden maintenance.",
    category: "domestic",
  },
  {
    id: 13,
    title: "Bathroom Cleaning",
    icon: "fa-shower",
    description: "Deep cleaning and sanitization for bathrooms.",
    category: "domestic",
  },
  {
    id: 14,
    title: "Fridge Repair",
    icon: "fa-snowflake",
    description: "Expert repair for all refrigerator models.",
    category: "repairs",
  },
  {
    id: 15,
    title: "TV Repair",
    icon: "fa-tv",
    description: "Professional repair for all television types.",
    category: "repairs",
  },
  {
    id: 16,
    title: "Cook Services",
    icon: "fa-utensils",
    description: "Professional cooks for daily meals or special occasions.",
    category: "domestic",
  },
  {
    id: 17,
    title: "Washing Machine Repair",
    icon: "fa-soap",
    description: "Expert technicians for all washing machine brands.",
    category: "repairs",
  },
  {
    id: 18,
    title: "Car Detailing",
    icon: "fa-car",
    description: "Professional interior and exterior car cleaning services.",
    category: "repairs",
  },
];

const categories = [
  { key: "all", label: "All Services" },
  { key: "domestic", label: "Domestic Help" },
  { key: "repairs", label: "Repairs" },
  { key: "event", label: "Event Help" },
  { key: "movers", label: "Movers" },
];

const testimonialsData = [
  {
    id: 1,
    icon: "fa-faucet",
    service: "Plumbing Services",
    quote:
      "Trustyhands saved me when my kitchen sink burst on a Sunday! Found a plumber within 20 minutes who fixed everything professionally. The platform is incredibly easy to use and the quality of service exceeded my expectations.",
    name: "Sarah Johnson",
    role: "Homeowner in New York",
    initials: "SJ",
  },
  {
    id: 2,
    icon: "fa-broom",
    service: "Cleaning Services",
    quote:
      "The deep cleaning service was exceptional! The team arrived on time, brought all their own supplies, and left my home spotless. I've booked them for monthly cleanings now. Highly recommend Trustyhands for all home services!",
    name: "Michael Chen",
    role: "Busy Professional",
    initials: "MC",
  },
  {
    id: 3,
    icon: "fa-bolt",
    service: "Electrical Work",
    quote:
      "I needed several electrical outlets installed in my home office. The electrician from Trustyhands was knowledgeable, efficient, and cleaned up after himself. Pricing was transparent and fair. Will definitely use again!",
    name: "Emma Rodriguez",
    role: "Remote Worker",
    initials: "ER",
  },
];

const faqsData = [
  {
    id: 1,
    question: "Are all workers background verified?",
    answer:
      "Yes, all service professionals on TrustyHands undergo a thorough background check, identity verification, and skills assessment before they are allowed to offer services on our platform. Your safety is our top priority.",
  },
  {
    id: 2,
    question: "How does payment work?",
    answer:
      "Payment is handled securely through our platform. You only pay once the job is complete and you're satisfied. We support multiple payment methods including credit/debit cards and UPI. No hidden fees.",
  },
  {
    id: 3,
    question: "Can I reschedule my booking?",
    answer:
      "Absolutely! You can reschedule or cancel a booking up to 2 hours before the scheduled time, free of charge, directly from your customer dashboard.",
  },
  {
    id: 4,
    question: "What if I'm not satisfied with the service?",
    answer:
      "We have a 100% satisfaction guarantee. If you're not happy with the service, contact our support team within 24 hours and we'll arrange a re-do at no extra cost or issue a full refund.",
  },
  {
    id: 5,
    question: "How are workers rated and reviewed?",
    answer:
      "After every completed service, customers can leave a star rating and written review. These are publicly visible on the worker's profile and help maintain the quality of our marketplace.",
  },
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredServices = useMemo(() => {
    let result = servicesData;
    if (selectedCategory !== "all") {
      result = result.filter((s) => s.category === selectedCategory);
    }
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(lowerSearch) ||
          s.description.toLowerCase().includes(lowerSearch)
      );
    }
    return result;
  }, [selectedCategory, searchTerm]);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="srv-page">
      <section className="srv-hero-section">
        <div className="container">
          <h1>Our Premium Services</h1>
          <p>Explore our wide range of trusted home and professional services</p>
        </div>
      </section>

      <section className="srv-search-filter srv-section">
        <div className="container">
          <div className="srv-search-container">
            <div className="srv-search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a service or category..."
              />
            </div>
          </div>

          <div className="srv-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`srv-category-tab ${selectedCategory === cat.key ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="srv-section">
        <div className="container">
          <div className="srv-services-grid">
            {filteredServices.map((service) => (
              <div key={service.id} className="srv-service-card">
                <div className="srv-service-icon">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3 className="srv-service-title">{service.title}</h3>
                <p className="srv-service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Want to Offer Your Services? CTA */}
      <section className="srv-join-worker srv-section">
        <div className="container">
          <h2>Want to Offer Your Services?</h2>
          <p>
            Join thousands of skilled professionals earning competitive income by offering your
            expertise to our community of customers.
          </p>
          <a href="/register" className="srv-join-btn">
            Join as a Worker
          </a>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="srv-testimonials">
        <div className="container">
          <div className="srv-section-header">
            <h2>Customer Testimonials</h2>
            <div className="srv-section-underline"></div>
          </div>
          <div className="srv-testimonial-container">
            {testimonialsData.map((t) => (
              <div key={t.id} className="srv-testimonial">
                <div className="srv-testimonial-header">
                  <i className={`fas ${t.icon}`}></i>
                  <strong>{t.service}</strong>
                </div>
                <p className="srv-testimonial-quote">"{t.quote}"</p>
                <div className="srv-client">
                  <div className="srv-client-avatar">{t.initials}</div>
                  <div className="srv-client-info">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="srv-faqs">
        <div className="container">
          <div className="srv-section-header">
            <h2>Frequently Asked Questions</h2>
            <div className="srv-section-underline"></div>
          </div>
          <div className="srv-faq-container">
            {faqsData.map((faq) => (
              <div key={faq.id} className="srv-faq-item">
                <div
                  className="srv-faq-question"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.question}</span>
                  <i className={`fas fa-chevron-${openFaq === faq.id ? "up" : "down"}`}></i>
                </div>
                <div className={`srv-faq-answer ${openFaq === faq.id ? "active" : ""}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
