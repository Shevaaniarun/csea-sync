import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const numParticles = 80;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initialize particles
      particles = Array.from({ length: numParticles }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      }));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxDist = 150; // shorter lines
      const maxConnections = 3; // max lines per particle

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // find distances to all other particles
        const distances = particles
          .map((p2, idx) => ({ idx, dist: Math.hypot(p1.x - p2.x, p1.y - p2.y) }))
          .filter(d => d.idx !== i && d.dist < maxDist)
          .sort((a, b) => a.dist - b.dist) // nearest first
          .slice(0, maxConnections); // limit connections

        distances.forEach(d => {
          const p2 = particles[d.idx];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,183,255,${1 - d.dist / maxDist})`;
          ctx.lineWidth = 0.3; // very thin lines
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,183,255,0.8)";
        ctx.fill();

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", background: "transparent" }}
    />
  );
};

export default ParticlesBackground;
