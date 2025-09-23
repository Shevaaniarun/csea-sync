import React from "react";
import HomeComponent from "./home-components/HomeComponent";
import { EventsSection } from "./components/events/EventsSection";
import Navbar from "./navbar-components/NavbarComponent";
import LightRays from "./components/ui/bg-animations/LightRays";
import ParticlesBackground from "./components/ui/bg-animations/ParticlesBackground";

export default function HomeEventsWrapper() {
  return (
    <>
      {/* FIXED BACKGROUND CONTAINER */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <div className="absolute inset-0 bg-gray-950" />
        <div className="absolute inset-0 pointer-events-none">
          <ParticlesBackground />
          <LightRays
            raysOrigin="top-center"
            raysColor="#00b7ff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="relative z-0">
        <Navbar />
        <HomeComponent />
        <EventsSection />
      </div>
    </>
  );
}