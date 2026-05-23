import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("th_user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("th_user");
    localStorage.removeItem("th_logged_in");
    setUser(null);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <i className="fas fa-hands-helping"></i>
          <span>TrustyHands</span>
        </div>
        <nav className="navbar-nav">
          <ul>
            <li>
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/how-it-works" className={navLinkClass}>
                How It Works
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="navbar-auth-buttons">
          {user ? (
            <>
              <NavLink
                to={`/${user.role}-dashboard`}
                className="btn btn-primary"
              >
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="btn btn-outline" style={{ cursor: "pointer" }}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline">
                Log In
              </NavLink>
              <NavLink to="/register" className="btn btn-primary">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
