import { useState } from "react";
import AppLoader from "./components/ui/loader/AppLoader";
import LightRays from "./components/ui/bg-animations/LightRays";
import ParticlesBackground from "./components/ui/bg-animations/ParticlesBackground";
import Navbar from "./components/navbar/NavbarComponent";
import { Footer } from "./components/Footer";
import HomeEventsWrapper from "./components/HomeAboutEventsWrapper";
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans text-[15px] md:text-[16px]">
      <div className="fixed inset-0 -z-10">
        <LightRays raysColor="#0284C7" raysSpeed={1} distortion={0.3} />
        <ParticlesBackground />
      </div>
      {isLoading && <AppLoader onDone={() => setIsLoading(false)} minDurationMs={2200} />}
      {!isLoading && (
        <div className="relative z-10">
          <Navbar />
          <HomeEventsWrapper/>
          <Footer/>
        </div>
      )}
    </div>
  );
}