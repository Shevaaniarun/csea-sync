import { useState, useEffect } from "react";

const INITIAL_DELAY = 2000; // 2-second wait before the first animation starts
const CYCLE_INTERVAL = 7000; // 7-second cycle (2s animation + 5s display)

/**
 * A custom hook to manage a synchronized animation timer.
 * It provides a `currentPhase` ('csea' or 'sync') that components can listen to.
 */
export const useAnimationTimer = () => {
  const [currentPhase, setCurrentPhase] = useState("csea");

  useEffect(() => {
    // 1. Initial Delay: Wait for 2 seconds before starting the animation cycle.
    const initialTimeout = setTimeout(() => {
      // 2. First Transition: After the delay, trigger the first switch to 'sync'.
      setCurrentPhase("sync");

      // 3. Recurring Cycle: Set up an interval to toggle the phase every 10 seconds.
      const cycleInterval = setInterval(() => {
        setCurrentPhase((prevPhase) =>
          prevPhase === "csea" ? "sync" : "csea"
        );
      }, CYCLE_INTERVAL);

      // Cleanup function for the interval when the component unmounts.
      return () => clearInterval(cycleInterval);
    }, INITIAL_DELAY);

    // Cleanup function for the initial timeout when the component unmounts.
    return () => clearTimeout(initialTimeout);
  }, []);

  return { currentPhase };
};
