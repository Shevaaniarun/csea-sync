import React from "react";
import TextAnimator from "./TextAnimator";
import ImageAnimator from "./ImageAnimator";
import AboutComponent from "./AboutComponent";
import { useAnimationTimer } from "./useAnimationTimer";
import "./HomeComponent.css";

export default function HomeComponent() {
  const { currentPhase } = useAnimationTimer();

  return (
    <div className="home-body">
      <div className="home-container">
        {/* Left Column: About Text */}
        <div className="about-section">
          <AboutComponent />
        </div>

        {/* Right Column: Animations */}
        <div className="animation-section">
          <div className="image-container">
            <ImageAnimator currentPhase={currentPhase} />
          </div>
          <div className="text-container">
            <TextAnimator currentPhase={currentPhase} />
          </div>
        </div>
      </div>
    </div>
  );
}
