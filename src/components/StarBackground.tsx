"use client";

import React, { useEffect, useRef } from "react";

export default function StarBackground({ showCelestialBody = false }: { showCelestialBody?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 3000); // Density
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          speed: Math.random() * 0.2 + 0.05,
          opacity: Math.random(),
        });
      }
    };

    const drawCelestialBody = (width: number, height: number, time: number) => {
      // time is 0-24
      // Sun: 6 to 18
      // Moon: 18 to 6 (0-6 and 18-24)

      const isDay = time >= 6 && time < 18;
      
      if (!showCelestialBody) return false; // If disabled, treat as night (stars visible)

      // Fade out based on scroll
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight; // Fade out completely after 1 viewport height
      const scrollOpacity = Math.max(0, 1 - scrollY / maxScroll);

      if (scrollOpacity <= 0.01) return isDay;

      let progress = 0;

      if (isDay) {
        progress = (time - 6) / 12;
      } else {
        if (time >= 18) {
          progress = (time - 18) / 12;
        } else {
          progress = (time + 6) / 12;
        }
      }

      // Position: Arc from left to right
      const x = width * (0.1 + 0.8 * progress);
      // Height: starts low (0.8), goes high (0.2), ends low (0.8)
      const y = height * (0.8 - 0.6 * Math.sin(progress * Math.PI));

      ctx.save();
      ctx.globalAlpha = scrollOpacity;

      if (isDay) {
        // Sun Glow - Increased Intensity
        const gradient = ctx.createRadialGradient(x, y, 10, x, y, 150);
        gradient.addColorStop(0, "rgba(255, 255, 220, 0.32)"); 
        gradient.addColorStop(0.2, "rgba(255, 200, 50, 0.15)"); 
        gradient.addColorStop(0.5, "rgba(255, 100, 0, 0.05)"); 
        gradient.addColorStop(1, "rgba(255, 100, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 150, 0, Math.PI * 2);
        ctx.fill();

        // Sun Core - Increased Intensity
        ctx.fillStyle = "rgba(255, 255, 240, 0.85)"; 
        ctx.shadowBlur = 60; 
        ctx.shadowColor = "rgba(255, 200, 50, 0.35)"; 
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Blur Overlay
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.filter = "blur(15px)";
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = "none";
      } else {
        // Moon Glow
        const gradient = ctx.createRadialGradient(x, y, 20, x, y, 80);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, Math.PI * 2);
        ctx.fill();

        // Moon Body
        ctx.fillStyle = "#e0e0e0";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Craters
        ctx.fillStyle = "#d0d0d0";
        ctx.beginPath();
        ctx.arc(x - 12, y + 6, 7, 0, Math.PI * 2);
        ctx.arc(x + 14, y - 10, 5, 0, Math.PI * 2);
        ctx.arc(x + 6, y + 14, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
      return isDay;
    };

    const drawStars = () => {
      const now = new Date();
      const time = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
      
      // Background
      ctx.fillStyle = "black"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Celestial Body
      const isDay = drawCelestialBody(canvas.width, canvas.height, time);

      // Draw Stars
      // Fade stars significantly during day
      const starOpacityMultiplier = isDay ? 0.1 : 1;

      stars.forEach((star) => {
        ctx.globalAlpha = star.opacity * starOpacityMultiplier;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position (slow drift upwards)
        star.y -= star.speed;
        
        // Reset if out of bounds
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        
        // Twinkle effect
        if (Math.random() > 0.99) {
            star.opacity = Math.random();
        }
      });
      
      ctx.globalAlpha = 1; // Reset alpha

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
