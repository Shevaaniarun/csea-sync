import React, { useEffect, useState } from 'react';
import Shuffle from './Shuffle';

type AppLoaderProps = {
  onDone?: () => void;
  minDurationMs?: number;
};


export default function AppLoader({ onDone, minDurationMs = 2000 }: AppLoaderProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setCompleted(true);
      onDone?.();
    }, minDurationMs);
    return () => clearTimeout(t);
  }, [minDurationMs, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(2,132,199,0.25)_0%,_rgba(0,0,0,0.88)_65%)]" />
      <Shuffle
        text="SYNC 2025"
        shuffleDirection="right"
        duration={0.5}
        animationMode="evenodd"
        shuffleTimes={1}
        ease="power3.out"
        stagger={0.035}
        threshold={0.0}
        triggerOnce={true}
        triggerOnHover={false}
        respectReducedMotion={true}
        className="md:text-6xl text-4xl tracking-widest text-cyan-200 drop-shadow-[0_0_36px_rgba(34,211,238,0.95)]"
        colorFrom="#67E8F9"
        colorTo="#22D3EE"
        style={{ letterSpacing: '0.15em' }}
      />
    </div>
  );
}


