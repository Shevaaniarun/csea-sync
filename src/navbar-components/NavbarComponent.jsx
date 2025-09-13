import React, { useState } from "react";
import "./NavbarComponent.css";
import logo from "../assets/csea.webp";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = (
    <>
      <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
      <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
      <a href="#events" onClick={() => setIsMenuOpen(false)}>Events</a>
      <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
    </>
  );

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-left">
          <a href="https://www.cseaceg.org.in/" target="_blank" rel="noreferrer">
            <img src={logo} alt="CSE Sync Logo" className="navbar-logo" />
          </a>
        </div>

        <div className="navbar-center">
          <span className="sync-text">SYNC'25</span>
        </div>

        <div className="navbar-right">
          <div className="desktop-links">{navLinks}</div>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <span className={`bar ${isMenuOpen ? "open" : ""}`} />
            <span className={`bar ${isMenuOpen ? "open" : ""}`} />
            <span className={`bar ${isMenuOpen ? "open" : ""}`} />
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        {navLinks}
      </div>
    </>
  );
};

export default Navbar;
