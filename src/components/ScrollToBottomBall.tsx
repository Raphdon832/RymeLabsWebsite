"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function ScrollToBottomBall() {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Launch animation - shoot down
    await controls.start({
      y: window.innerHeight, // Fly down the height of the screen
      opacity: 0,
      transition: { duration: 1, ease: "easeIn" }
    });

    // Scroll to bottom
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    // Reset position after scroll is likely done
    setTimeout(() => {
      controls.set({ y: 0, opacity: 1 });
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20 pointer-events-none">
      <motion.div
        onClick={handleClick}
        animate={isAnimating ? controls : { y: [0, 10, 0] }}
        transition={
          isAnimating
            ? undefined
            : {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="w-12 h-12 rounded-full bg-white cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] flex items-center justify-center pointer-events-auto border-2 border-zinc-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  );
}
