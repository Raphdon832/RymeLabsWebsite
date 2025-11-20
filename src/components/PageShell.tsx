"use client";

import StarBackground from "@/components/StarBackground";
import Header from "@/components/Header";
import { ReactNode } from "react";

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface PageShellProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function PageShell({
  children,
  className,
  containerClassName = "max-w-6xl",
}: PageShellProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black",
        className
      )}
    >
      <StarBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" aria-hidden />
      <Header />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className={cn("mx-auto w-full", containerClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
