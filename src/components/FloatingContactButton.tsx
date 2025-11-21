"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { FaWhatsapp, FaPhoneVolume } from "react-icons/fa6";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-[100] flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      drag
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      whileHover={{ cursor: "grab" }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2, staggerChildren: 0.1 }}
            className="flex flex-col gap-3 items-center"
          >
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/2347076236808"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-14 h-14 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Chat on WhatsApp"
            >
              <div className="absolute right-16 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
                WhatsApp
              </div>
              <FaWhatsapp className="w-8 h-8 text-[#25D366]" />
            </motion.a>

            {/* Phone Button */}
            <motion.a
              href="tel:+2347076236808"
              className="group relative flex items-center justify-center w-14 h-14 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Call Us"
            >
              <div className="absolute right-16 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
                Call Now
              </div>
              <FaPhoneVolume className="w-6 h-6 text-blue-500" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={toggleOpen}
        className="relative flex items-center justify-center w-16 h-16 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl text-white overflow-hidden z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/0" />
        
        {/* Pulse Effect */}
        {!isOpen && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-white/5 opacity-75 animate-ping" />
        )}

        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <MessageCircle className="w-8 h-8 text-white" />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
