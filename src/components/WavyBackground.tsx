"use client";

import React, { useEffect, useRef } from "react";

const WavyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    const lines = 5;
    const step = 5; // Smaller step for smoother curves

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Create a gradient for the lines
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.lineWidth = 2;
      time += 0.005;

      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        
        // Spread lines vertically
        const yBase = (height * 0.5) + (l - lines / 2) * 60;
        
        for (let x = 0; x <= width; x += step) {
            // Base wave movement
            // Combine multiple sine waves for more organic feel
            const wave1 = Math.sin(x * 0.003 + time + l * 0.5) * 40;
            const wave2 = Math.sin(x * 0.01 - time * 0.5) * 10;
            
            let y = yBase + wave1 + wave2;
            
            // Mouse interaction
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 400;
            
            if (dist < maxDist) {
                const force = Math.pow((maxDist - dist) / maxDist, 2);
                // Push lines away from mouse
                const dir = dy > 0 ? 1 : -1;
                y += force * 100 * dir;
            }

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
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

export default WavyBackground;
