import { useState } from "react";
import AppLoader from "./components/ui/loader/AppLoader";
import { Footer } from "./components/Footer";
import LightRays from "./components/ui/LightRays";
import ParticlesBackground from "./components/ui/ParticlesBackground";
import HomeEventsWrapper from "./HomeEventsWrapper";
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
        <HomeEventsWrapper/>
        <Footer/>
        </div>
      )}
    </div>
  );
}