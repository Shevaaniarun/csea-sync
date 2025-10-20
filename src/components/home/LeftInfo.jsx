import React from "react";
import "./AboutComponent.css";

const LeftInfo = () => {
  return (
    <div className="about-container">
      {/* The H1 now gets its blue color from the CSS class directly for consistency */}
      <h1 className="font-semibold text-cyan-200 glowing-title">Sync '25</h1>
      <p>25th and 26th October, 2025</p>
      <p className="animated-slogan">When Minds SYNC🔌Innovation Happens✨</p>
    </div>
  );
};

export default LeftInfo;
