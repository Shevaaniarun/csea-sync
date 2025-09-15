import React, { useState, useRef, useEffect } from "react";

/* ================= NAVBAR COMPONENT ================= */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { currentPhase } = useAnimationTimer();

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
        <div className="animation-section">
          <div className="image-container">
            <ImageAnimator currentPhase={currentPhase} />
          </div>
          <div className="text-container">
            <TextAnimator currentPhase={currentPhase} />
          </div>
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

      <style>{`
        /* NAVBAR BASE */
        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 70px;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          box-sizing: border-box;
          background-color: #030712;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .animation-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 45px;
          width: auto;
        }

        .animated-image {
          object-fit: cover;
          border: none;
          outline: none;
          box-shadow: none;
        }

        .text-container {
          display: flex;
          align-items: center;
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        /* DESKTOP LINKS */
        .desktop-links {
          display: flex;
          gap: 30px;
        }

        .desktop-links a {
          text-decoration: none;
          color: #f0f0f0;
          font-size: 1rem;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 5px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .desktop-links a:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.2);
        }

        /* HAMBURGER MENU */
        .hamburger-menu {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 28px;
          height: 22px;
          cursor: pointer;
          z-index: 1002;
        }

        .hamburger-menu .bar {
          height: 3px;
          width: 100%;
          background-color: #f0f0f0;
          border-radius: 10px;
          transition: all 0.3s ease-in-out;
        }

        .hamburger-menu .bar.open:nth-child(1) {
          transform: translateY(9.5px) rotate(45deg);
        }
        .hamburger-menu .bar.open:nth-child(2) {
          opacity: 0;
        }
        .hamburger-menu .bar.open:nth-child(3) {
          transform: translateY(-9.5px) rotate(-45deg);
        }

        /* MOBILE NAV */
        .mobile-nav {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 70%;
          max-width: 280px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding-top: 100px;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          background-color: rgba(3, 7, 18, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-left: 1px solid rgba(255, 255, 255, 0.18);
        }

        .mobile-nav.open {
          transform: translateX(0);
        }

        .mobile-nav a {
          color: #f0f0f0;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 15px 20px;
          transition: background-color 0.2s;
        }

        .mobile-nav a:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        /* RESPONSIVE */
        @media (max-width: 800px) {
          .navbar-container {
            padding: 0 20px;
            height: 60px;
          }
          .desktop-links {
            display: none;
          }
          .hamburger-menu {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

/* ================= IMAGE ANIMATOR ================= */
function ImageAnimator({ currentPhase }) {
  const isCseaVisible = currentPhase === "csea";

  const imageStyle = {
    position: "absolute",
    width: "50%",
    height: "50%",
    transition: "opacity 2s ease-in-out",
  };

  const visibleImageStyle = { ...imageStyle, opacity: 1 };
  const hiddenImageStyle = { ...imageStyle, opacity: 0 };

  return (
    <div className="home-image-container" style={{
      width: "100px", height: "45px", position: "relative"
    }}>
      <img
        src="/csea.webp"
        alt="CSEA Logo"
        className="animated-image"
        style={isCseaVisible ? visibleImageStyle : hiddenImageStyle}
      />
      <img
        src="/sync.png"
        alt="SYNC Logo"
        className="animated-image"
        style={!isCseaVisible ? visibleImageStyle : hiddenImageStyle}
      />
    </div>
  );
}

/* ================= TEXT ANIMATOR ================= */
function TextAnimator({ currentPhase }) {
  const containerRef = useRef(null);
  const cseaGroupRef = useRef(null);
  const syncGroupRef = useRef(null);
  const animationTimeout = useRef(null);
  const isAnimating = useRef(false);
  const previousPhaseRef = useRef(currentPhase);

  const clearAnimationClasses = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove(
        "animating",
        "phase-csea-to-sync",
        "phase-sync-to-csea"
      );
    }
  };

  const resetLetterStyles = () => {
    if (containerRef.current) {
      const allLetters = containerRef.current.querySelectorAll(".letter");
      allLetters.forEach((letter) => {
        letter.style.transform = "";
        letter.style.opacity = "";
        letter.style.zIndex = "";
        letter.style.textShadow = "";
      });
    }
  };

  const completeCseaToSyncTransition = () => {
    clearAnimationClasses();
    cseaGroupRef.current.style.opacity = "0";
    syncGroupRef.current.style.opacity = "1";
    resetLetterStyles();
    isAnimating.current = false;
  };

  const animateCseaToSync = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    clearAnimationClasses();
    containerRef.current.classList.add("animating", "phase-csea-to-sync");
    animationTimeout.current = setTimeout(completeCseaToSyncTransition, 2000);
  };

  const completeSyncToCseaTransition = () => {
    clearAnimationClasses();
    syncGroupRef.current.style.opacity = "0";
    cseaGroupRef.current.style.opacity = "1";
    resetLetterStyles();
    isAnimating.current = false;
  };

  const animateSyncToCsea = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    clearAnimationClasses();
    containerRef.current.classList.add("animating", "phase-sync-to-csea");
    animationTimeout.current = setTimeout(completeSyncToCseaTransition, 2000);
  };

  useEffect(() => {
    if (previousPhaseRef.current !== currentPhase) {
      if (currentPhase === "sync") animateCseaToSync();
      else if (currentPhase === "csea") animateSyncToCsea();
    }
    previousPhaseRef.current = currentPhase;
    return () => clearTimeout(animationTimeout.current);
  }, [currentPhase]);

  useEffect(() => {
    cseaGroupRef.current.style.opacity = "1";
  }, []);

  return (
    <>
      <div className="text-display" ref={containerRef}>
        <div className="letter-group csea-group" ref={cseaGroupRef}>
          <span className="letter">C</span>
          <span className="letter">S</span>
          <span className="letter">E</span>
          <span className="letter">A</span>
        </div>
        <div className="letter-group sync-group" ref={syncGroupRef}>
          <span className="letter">S</span>
          <span className="letter">Y</span>
          <span className="letter">N</span>
          <span className="letter">C</span>
        </div>
      </div>

      <style>{`
        .text-display {
          perspective: 1000px;
          position: relative;
          width: 200px;
          height: 60px;
        }
        .letter-group {
          position: absolute;
          display: flex;
          top: 0;
          left: 0;
        }
        .letter {
          font-size: 2rem;
          font-weight: 600;
          color: #e5e7eb;
          text-shadow: 0 0 8px rgba(255,255,255,0.6);
          margin-right: 6px;
          transition: all 0.3s ease;
        }
        .letter:last-child { margin-right: 0; }
        .csea-group { opacity: 1; }
        .sync-group { opacity: 0; }
        @media (max-width: 800px) {
          .letter { font-size: 1.6rem; }
        }
      `}</style>
    </>
  );
}

/* ================= USE ANIMATION TIMER HOOK ================= */
function useAnimationTimer() {
  const [phase, setPhase] = useState("csea");
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === "csea" ? "sync" : "csea"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return { currentPhase: phase };
}
