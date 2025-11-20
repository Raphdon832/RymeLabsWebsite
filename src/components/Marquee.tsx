"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

export const Marquee = ({
  children,
  baseVelocity = -0.5,
  className,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}) => {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      // We add 32 (gap-8 = 2rem) to account for the gap between the duplicated sets
      setContentWidth(measureRef.current.offsetWidth + 32);
    }
  }, [children]);

  useAnimationFrame((t, delta) => {
    if (!contentWidth) return;

    let newX = baseX.get();
    
    if (!isHovered) {
        // Move based on velocity
        newX += baseVelocity * (delta / 10);
    }
    
    // Wrap logic to create infinite loop
    if (newX <= -contentWidth) {
        newX += contentWidth;
    } else if (newX > 0) {
        newX -= contentWidth;
    }
    
    baseX.set(newX);
  });

  return (
    <div 
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="flex flex-nowrap gap-8 w-max cursor-grab active:cursor-grabbing"
        style={{ x: baseX }}
        drag="x"
      >
        <div ref={measureRef} className="flex gap-8 shrink-0">
            {children}
        </div>
        <div className="flex gap-8 shrink-0">
            {children}
        </div>
        <div className="flex gap-8 shrink-0">
            {children}
        </div>
        <div className="flex gap-8 shrink-0">
            {children}
        </div>
      </motion.div>
    </div>
  );
};
