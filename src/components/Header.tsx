"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import MenuOverlay from "@/components/MenuOverlay";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationType, setAnimationType] = useState<'zoom' | 'type'>('zoom');
  const { user } = useAuth();

  useEffect(() => {
    setAnimationType(Math.random() > 0.5 ? 'zoom' : 'type');
  }, []);

  return (
    <>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/40">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <motion.div 
              className="relative w-8 h-8"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Image 
                src="/RymeLabsIcon.png" 
                alt="RymeLabs" 
                fill
                className="object-contain dark:invert-0 invert"
                priority
              />
            </motion.div>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground block">
            RymeLabs
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href={user ? "/dashboard" : "/auth/login"}
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition"
          >
            {user ? "Dashboard" : "Login"}
          </Link>
          <MagneticButton 
            onClick={() => setIsMenuOpen(true)}
            className="group bg-foreground/5 border border-border text-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-foreground/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 backdrop-blur-sm cursor-pointer"
          >
            <span className="tracking-wide">MENU</span>
            <div className="flex flex-col gap-[5px] items-end">
              <span className="w-6 h-[2px] bg-foreground rounded-full group-hover:w-4 transition-all duration-300"></span>
              <span className="w-4 h-[2px] bg-foreground rounded-full group-hover:w-6 transition-all duration-300"></span>
            </div>
          </MagneticButton>
        </div>
      </header>
    </>
  );
}
