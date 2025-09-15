import React, { useState } from "react";
import "./NavbarComponent.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = (
    <>
      <a href="#home" className="active" onClick={() => setIsMenuOpen(false)}>
        Home
      </a>
      <a href="#about" onClick={() => setIsMenuOpen(false)}>
        About
      </a>
      <a href="#events" onClick={() => setIsMenuOpen(false)}>
        Events
      </a>
      <a href="#contact" onClick={() => setIsMenuOpen(false)}>
        Contact
      </a>
    </>
  );

  return (
    <>
      <nav className="navbar-container">
        {/* Left side div is removed */}

        {/* Center: Desktop navigation links */}
        <div className="navbar-center">
          <div className="desktop-links">{navLinks}</div>
        </div>

        {/* Right side div is removed, but we keep the hamburger functionality for potential future use */}
        <div className="navbar-right">
          <div className="hamburger-menu" onClick={toggleMenu}>
            <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
            <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
            <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>{navLinks}</div>
    </>
  );
};

export default Navbar;