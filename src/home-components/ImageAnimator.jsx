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
    <div className="home-image-container">
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
