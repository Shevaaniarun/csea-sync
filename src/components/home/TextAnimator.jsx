import React, { useRef, useEffect } from "react";
import "./TextAnimator.css";

export default function TextAnimator({ currentPhase }) {
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
    if (cseaGroupRef.current && syncGroupRef.current) {
      cseaGroupRef.current.style.opacity = "0";
      cseaGroupRef.current.style.zIndex = "1";
      syncGroupRef.current.style.opacity = "1";
      syncGroupRef.current.style.zIndex = "10";
    }
    resetLetterStyles();
    isAnimating.current = false;
  };

  const animateCseaToSync = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    clearAnimationClasses();
    if (containerRef.current) {
      containerRef.current.classList.add("animating", "phase-csea-to-sync");
    }
    animationTimeout.current = setTimeout(completeCseaToSyncTransition, 2000);
  };

  const completeSyncToCseaTransition = () => {
    clearAnimationClasses();
    if (syncGroupRef.current && cseaGroupRef.current) {
      syncGroupRef.current.style.opacity = "0";
      syncGroupRef.current.style.zIndex = "1";
      cseaGroupRef.current.style.opacity = "1";
      cseaGroupRef.current.style.zIndex = "10";
    }
    resetLetterStyles();
    isAnimating.current = false;
  };

  const animateSyncToCsea = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    clearAnimationClasses();
    if (containerRef.current) {
      containerRef.current.classList.add("animating", "phase-sync-to-csea");
    }
    animationTimeout.current = setTimeout(completeSyncToCseaTransition, 2000);
  };

  useEffect(() => {
    // Only trigger an animation if the phase has actually changed from the last render.
    if (previousPhaseRef.current !== currentPhase) {
      if (currentPhase === "sync") {
        animateCseaToSync();
      } else if (currentPhase === "csea") {
        animateSyncToCsea();
      }
    }
    previousPhaseRef.current = currentPhase;

    return () => {
      clearTimeout(animationTimeout.current);
    };
  }, [currentPhase]);

  useEffect(() => {
    if (cseaGroupRef.current) {
      cseaGroupRef.current.style.opacity = "1";
      cseaGroupRef.current.style.zIndex = "10";
    }
  }, []);

  return (
    <div className="text-display" ref={containerRef}>
      <div className="letter-group csea-group" ref={cseaGroupRef}>
        <span className="letter letter-c-csea" data-letter="C">
          C
        </span>
        <span className="letter letter-s-csea" data-letter="S">
          S
        </span>
        <span className="letter letter-e-csea" data-letter="E">
          E
        </span>
        <span className="letter letter-a-csea" data-letter="A">
          A
        </span>
      </div>
      <div className="letter-group sync-group" ref={syncGroupRef}>
        <span className="letter letter-s-sync" data-letter="S">
          S
        </span>
        <span className="letter letter-y-sync" data-letter="Y">
          Y
        </span>
        <span className="letter letter-n-sync" data-letter="N">
          N
        </span>
        <span className="letter letter-c-sync" data-letter="C">
          C
        </span>
      </div>
    </div>
  );
}
