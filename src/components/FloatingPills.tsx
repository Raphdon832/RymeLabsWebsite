"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PillShape = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="4" y="4" width="16" height="16" rx="8" stroke="currentColor" strokeWidth="1.5" />
    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const TabletShape = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CapsuleShape = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 2C9.23858 2 7 4.23858 7 7V17C7 19.7614 9.23858 22 12 22C14.7614 22 17 19.7614 17 17V7C17 4.23858 14.7614 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PlusShape = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function FloatingPills() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const elements = [
    { Component: PillShape, size: 60, x: "10%", y: "20%", delay: 0 },
    { Component: TabletShape, size: 40, x: "80%", y: "15%", delay: 1 },
    { Component: CapsuleShape, size: 70, x: "20%", y: "60%", delay: 2 },
    { Component: PlusShape, size: 30, x: "90%", y: "50%", delay: 0.5 },
    { Component: PillShape, size: 50, x: "70%", y: "80%", delay: 1.5 },
    { Component: TabletShape, size: 45, x: "5%", y: "40%", delay: 2.5 },
    { Component: CapsuleShape, size: 55, x: "40%", y: "90%", delay: 1 },
    { Component: PlusShape, size: 25, x: "60%", y: "10%", delay: 3 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-500/10"
          initial={{ 
            x: el.x, 
            y: el.y, 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay
          }}
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
          }}
        >
          <el.Component className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}
