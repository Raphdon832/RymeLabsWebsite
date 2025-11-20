"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SolutionsBackgroundProps {
  activeCard: string | null;
}

export default function SolutionsBackground({ activeCard }: SolutionsBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        {activeCard === "Cloud Architecture" && <CloudEffect key="cloud" />}
        {activeCard === "Enterprise AI" && <AIEffect key="ai" />}
        {activeCard === "Immersive Web" && <WebEffect key="web" />}
        {activeCard === "Blockchain" && <BlockchainEffect key="blockchain" />}
        {activeCard === "Mobile Ecosystems" && <MobileEffect key="mobile" />}
        {activeCard === "Cybersecurity" && <SecurityEffect key="security" />}
      </AnimatePresence>
    </div>
  );
}

function CloudEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent" />
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-30"
          initial={{ x: -200, opacity: 0 }}
          animate={{
            x: "120vw",
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 5,
          }}
          style={{
            top: `${10 + i * 15}%`,
          }}
        >
          <div className="relative w-[400px] h-[150px]">
            <div className="absolute inset-0 bg-white blur-[60px] rounded-full" />
            <div className="absolute top-[-40px] left-[60px] w-[180px] h-[180px] bg-white blur-[50px] rounded-full" />
            <div className="absolute top-[-20px] right-[60px] w-[160px] h-[160px] bg-white blur-[50px] rounded-full" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function AIEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-purple-500/5 to-purple-900/10 blur-3xl" />
      
      {/* Neural Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#a855f7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Active Synapses */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </motion.div>
  );
}

function WebEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-500/10" />
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: 'linear-gradient(0deg, transparent 24%, #ec4899 25%, #ec4899 26%, transparent 27%, transparent 74%, #ec4899 75%, #ec4899 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #ec4899 25%, #ec4899 26%, transparent 27%, transparent 74%, #ec4899 75%, #ec4899 76%, transparent 77%, transparent)',
             backgroundSize: '50px 50px',
             transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)'
           }}
      />
    </motion.div>
  );
}

function BlockchainEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0"
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-emerald-500/20 bg-emerald-500/5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2] }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '60px',
            height: '60px',
          }}
        />
      ))}
    </motion.div>
  );
}

function MobileEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Floating App Icons */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden"
          initial={{ y: "120vh", opacity: 0 }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 1, 1, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            width: `${40 + Math.random() * 40}px`,
            height: `${40 + Math.random() * 40}px`,
          }}
        >
          <div className={`w-full h-full opacity-30 bg-gradient-to-br ${
            ['from-blue-400 to-purple-500', 'from-green-400 to-cyan-500', 'from-orange-400 to-red-500'][i % 3]
          }`} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function SecurityEffect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Rotating Cyber Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cyan-500/30 border-dashed"
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 20 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: `${400 + i * 200}px`,
            height: `${400 + i * 200}px`,
            borderWidth: '1px',
            opacity: 0.3 - i * 0.05
          }}
        />
      ))}
      
      {/* Scanning Radar Sector */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-gradient-to-r from-transparent to-cyan-500/10"
        style={{ transformOrigin: "bottom left", left: "50%", bottom: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Hexagon Grid Overlay */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
    </motion.div>
  );
}
