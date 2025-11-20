"use client";

import React, { useEffect, useRef } from "react";

const GlobeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let globeRadius = 0;

    const resize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        globeRadius = Math.min(width, height) * 0.4;
      }
    };
    resize();

    const dots: { x: number; y: number; z: number }[] = [];
    const numDots = 1000;

    // Initialize dots on a sphere
    for (let i = 0; i < numDots; i++) {
      const phi = Math.acos(-1 + (2 * i) / numDots);
      const theta = Math.sqrt(numDots * Math.PI) * phi;
      
      dots.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi)
      });
    }

    let rotation = 0;
    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      rotation += 0.001;

      dots.forEach((dot) => {
        // Scale dot to current radius
        const x3d = dot.x * globeRadius;
        const y3d = dot.y * globeRadius;
        const z3d = dot.z * globeRadius;

        // Rotate around Y axis
        const x = x3d * Math.cos(rotation) - z3d * Math.sin(rotation);
        const z = x3d * Math.sin(rotation) + z3d * Math.cos(rotation);
        
        // Project 3D to 2D
        const scale = 400 / (400 + z); 
        const px = cx + x * scale;
        const py = cy + y3d * scale;

        // Draw dot
        const alpha = (z + globeRadius) / (2 * globeRadius); // 0 to 1 roughly
        const size = Math.max(0.5, 1.5 * scale);

        if (scale > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, alpha * 0.5)})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GlobeBackground;
