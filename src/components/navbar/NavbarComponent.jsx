import React, { useState } from "react";
import "./NavbarComponent.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = (
    <>
      <a href="#nav-home-div">
        Home
      </a>
      <a href="#nav-about-div">
        About
      </a>
      <a href="#nav-events-section">
        Events
      </a>
      <a href="#nav-sponsors-section">
        Sponsors
      </a>
      <a href="#nav-footer-div">
        Contact
      </a>
    </>
  );

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-center">
          <div className="desktop-links">{navLinks}</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;