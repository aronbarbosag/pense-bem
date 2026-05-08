import { useEffect, useRef } from "react";

export function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let animationId;

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };

    resize();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.7 + 0.2,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 246, 255, ${particle.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full opacity-40"
    />
  );
}
