// Magic UI Confetti component based on https://magicui.design/docs/components/confetti
import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export interface ConfettiProps {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  flat?: boolean;
  ticks?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  shapes?: string[];
  zIndex?: number;
  disableForReducedMotion?: boolean;
  useWorker?: boolean;
  resize?: boolean;
  scalar?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({
  particleCount = 50,
  angle = 90,
  spread = 45,
  startVelocity = 45,
  decay = 0.9,
  gravity = 1,
  drift = 0,
  flat = false,
  ticks = 200,
  origin = { x: 0.5, y: 0.5 },
  colors = [
    "#26ccff",
    "#a25afd",
    "#ff5e7e",
    "#88ff5a",
    "#fcff42",
    "#ffa62d",
    "#ff36ff",
  ],
  zIndex = 100,
  disableForReducedMotion = false,
  useWorker = true,
  resize = true,
  scalar = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disableForReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    confetti({
      particleCount,
      angle,
      spread,
      startVelocity,
      decay,
      gravity,
      drift,
      ticks,
      origin,
      colors,
      zIndex,
      disableForReducedMotion,
      useWorker,
      scalar,
    });
    // No cleanup needed for one-shot confetti
  }, []);

  return <div ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex }} />;
};

export default Confetti;
