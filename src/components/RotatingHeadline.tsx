"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RotatingHeadlineProps {
  phrases: string[];
  interval?: number;
  className?: string;
  noWrap?: boolean;
}

export default function RotatingHeadline({
  phrases,
  interval = 3500,
  className = "",
  noWrap = true,
}: RotatingHeadlineProps) {
  const [index, setIndex] = useState(0);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, interval);

    return () => clearInterval(id);
  }, [phrases.length, interval]);

  const currentPhrase = phrases[index] ?? "";
  const textWrappingClass = noWrap ? "whitespace-nowrap" : "whitespace-normal break-words";

  useLayoutEffect(() => {
    if (!measureRef.current) return;

    const measureNode = measureRef.current;
    let maxHeight = 0;

    phrases.forEach((phrase) => {
      measureNode.textContent = phrase;
      const rect = measureNode.getBoundingClientRect();
      maxHeight = Math.max(maxHeight, rect.height);
    });

    measureNode.textContent = "";
    setMeasuredHeight(maxHeight || null);
  }, [phrases, textWrappingClass]);

  const containerClasses = [
    "relative inline-flex w-full align-bottom overflow-hidden",
    noWrap ? "h-[1.2em]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const textClassNames = [textWrappingClass, className].filter(Boolean).join(" ");

  return (
    <div
      className={containerClasses}
      style={measuredHeight ? { minHeight: measuredHeight } : undefined}
      aria-live="polite"
    >
      <span
        ref={measureRef}
        aria-hidden
        className={`${textClassNames} absolute left-0 top-0 w-full opacity-0 pointer-events-none`}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentPhrase}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`absolute left-0 top-0 w-full ${textClassNames}`}
        >
          {currentPhrase}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
