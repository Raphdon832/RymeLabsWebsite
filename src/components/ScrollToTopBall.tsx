"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function ScrollToTopBall() {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Launch animation - shoot up high
    await controls.start({
      y: -window.innerHeight, // Fly up the height of the screen
      opacity: 0,
      transition: { duration: 1, ease: "easeIn" }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset position after scroll is likely done
    setTimeout(() => {
      controls.set({ y: 0, opacity: 1 });
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center w-full py-8 absolute -top-6 left-0 right-0 z-2000 pointer-events-none">
      <motion.div
        onClick={handleClick}
        animate={isAnimating ? controls : { y: [0, -15, 0] }}
        transition={
          isAnimating
            ? undefined
            : {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="w-12 h-12 rounded-full bg-foreground cursor-pointer shadow-lg shadow-foreground/40 hover:shadow-xl hover:shadow-foreground/60 flex items-center justify-center pointer-events-auto border-2 border-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-6 h-6 text-background"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.div>
    </div>
  );
}
