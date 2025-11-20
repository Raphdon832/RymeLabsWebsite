"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RotatingHeadlineProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

export default function RotatingHeadline({
  phrases,
  interval = 3500,
  className = "",
}: RotatingHeadlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, interval);

    return () => clearInterval(id);
  }, [phrases.length, interval]);

  const currentPhrase = phrases[index] ?? "";

  return (
    <div className={`relative inline-flex overflow-hidden h-[1.2em] align-bottom whitespace-nowrap ${className}`} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentPhrase}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="inline-block"
        >
          {currentPhrase}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
