"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Solutions", href: "/solutions" },
  { name: "Company", href: "/company" },
  { name: "Contact", href: "/contact" },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutUser();
    onClose();
    router.push("/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Menu Items */}
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <Link key={link.name} href={link.href} legacyBehavior passHref>
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
                  className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground hover:to-foreground transition-all duration-300 tracking-tight cursor-pointer"
                  onClick={onClose}
                >
                  {link.name}
                </motion.a>
              </Link>
            ))}

            {user && (
              <>
                <Link href="/dashboard" legacyBehavior passHref>
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: navLinks.length * 0.1 + 0.1, duration: 0.5 }}
                    className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-emerald-400 dark:from-emerald-300 dark:to-emerald-700 hover:to-emerald-500 dark:hover:to-emerald-200 transition-all duration-300 tracking-tight cursor-pointer"
                    onClick={onClose}
                  >
                    Dashboard
                  </motion.a>
                </Link>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: navLinks.length * 0.1 + 0.2, duration: 0.5 }}
                  className="text-xl md:text-2xl font-medium text-muted-foreground hover:text-foreground transition-all duration-300 tracking-tight cursor-pointer mt-4"
                  onClick={handleSignOut}
                >
                  Sign Out
                </motion.button>
              </>
            )}
          </nav>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-10 text-zinc-500 text-sm tracking-widest uppercase"
          >
            RymeLabs Inc. © 2025
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
