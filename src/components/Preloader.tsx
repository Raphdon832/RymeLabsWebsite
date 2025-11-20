"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // After count finishes, show logo
          setTimeout(() => setShowLogo(true), 200);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showLogo) {
      // After logo shows for a bit, finish loading
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (onComplete) onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showLogo, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          <motion.div
            key="bg"
            className="fixed inset-0 z-[9999] bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          {!showLogo ? (
            <motion.div
              key="counter"
              className="fixed inset-0 z-[10000] flex items-center justify-center text-white pointer-events-none"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-end overflow-hidden">
                <motion.span
                  className="text-9xl font-bold tracking-tighter"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {count}
                </motion.span>
                <span className="text-2xl font-bold mb-4 ml-2">%</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="logo-container"
              className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                layoutId="logo-icon"
                className="relative w-32 h-32 md:w-48 md:h-48"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image 
                  src="/RymeLabsIcon.png" 
                  alt="RymeLabs" 
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
