"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const content = [
  {
    title: <>The Only Limitation <br /> Is Your Mind.</>,
    desc: "RymeLabs brings your ideas to life. Whether it's a mobile app, a complex website, or an advanced AI solution, we build the technology that powers your vision."
  },
  {
    title: <>We Bring Your <br /> Ideas To Life.</>,
    desc: "From initial concept to final deployment, we engineer robust digital solutions that scale with your ambition."
  },
  {
    title: <>Innovating The <br /> Digital Future.</>,
    desc: "Harnessing the power of cutting-edge algorithms and modern frameworks to keep you ahead of the competition."
  },
  {
    title: <>Building Tomorrow&apos;s <br /> Tech Today.</>,
    desc: "We don't just follow trends; we set them. Experience next-generation development for a world that never stops evolving."
  }
];

export default function HeroTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full mb-12">
      <div className="relative min-h-[200px] md:min-h-[300px] w-full flex items-center justify-center perspective-1000 mb-4">
        <AnimatePresence mode="popLayout">
          <motion.h1
            key={index}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 4, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-center bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent drop-shadow-2xl"
          >
            {content[index].title}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="h-24 relative w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-0 left-0 right-0 text-sm md:text-xl text-zinc-400 text-center leading-snug"
          >
            {content[index].desc}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
