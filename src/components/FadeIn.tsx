"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
}

export default function FadeIn({ children, className, delay = 0, direction = "up", fullWidth = false }: FadeInProps) {
  const directions = {
    up: { y: 100, x: 0, skewY: 3 },
    down: { y: -100, x: 0, skewY: -3 },
    left: { x: 100, y: 0, skewX: 3 },
    right: { x: -100, y: 0, skewX: -3 },
    none: { x: 0, y: 0, skewX: 0, skewY: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, skewX: 0, skewY: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={`${className} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </motion.div>
  );
}
