"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BookShape = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const OpenBookShape = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M2 3H8C10.2091 3 12 4.79086 12 7V21C12 18.7909 10.2091 17 8 17H2V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 3H16C13.7909 3 12 4.79086 12 7V21C12 18.7909 13.7909 17 16 17H22V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentShape = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 2V9H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PenShape = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M17 3L21 7L11 17L7 17L7 13L17 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 5L20 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function FloatingBooks() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const elements = [
    { Component: BookShape, size: 60, x: "10%", y: "20%", delay: 0 },
    { Component: OpenBookShape, size: 50, x: "80%", y: "15%", delay: 1 },
    { Component: DocumentShape, size: 55, x: "20%", y: "60%", delay: 2 },
    { Component: PenShape, size: 40, x: "90%", y: "50%", delay: 0.5 },
    { Component: BookShape, size: 45, x: "70%", y: "80%", delay: 1.5 },
    { Component: OpenBookShape, size: 65, x: "5%", y: "40%", delay: 2.5 },
    { Component: DocumentShape, size: 50, x: "40%", y: "90%", delay: 1 },
    { Component: PenShape, size: 35, x: "60%", y: "10%", delay: 3 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-500/10"
          initial={{ 
            x: el.x, 
            y: el.y, 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
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
