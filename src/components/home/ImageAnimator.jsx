import React from "react";
import cseaImage from "../assets/csea.webp";
import syncImage from "../assets/sync.png";
import "./ImageAnimator.css";

export default function ImageAnimator({ currentPhase }) {
  const isCseaVisible = currentPhase === "csea";

  const imageStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "opacity 2s ease-in-out",
  };

  const visibleImageStyle = { ...imageStyle, opacity: 1 };
  const hiddenImageStyle = { ...imageStyle, opacity: 0 };

  return (
    <div className="home-image-container w-full max-w-sm mx-auto bg-gradient-to-br from-blue-950 to-black border border-cyan-400/40 shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all duration-300 rounded-xl font-sans tracking-wide">
      <img
        src={cseaImage}
        alt="CSEA Logo"
        className="animated-image"
        style={isCseaVisible ? visibleImageStyle : hiddenImageStyle}
      />
      <img
        src={syncImage}
        alt="SYNC Logo"
        className="animated-image"
        style={!isCseaVisible ? visibleImageStyle : hiddenImageStyle}
      />
    </div>
  );
}
