"use client";

import React from "react";

interface ProductCardProps {
  title: string;
  description: string;
  color: "blue" | "purple" | "emerald" | "orange";
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, description, color }) => {
  const colorMap = {
    blue: {
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
      border: "group-hover:border-blue-500/30",
      glow: "bg-blue-500/20",
      text: "group-hover:text-blue-400",
      icon: "text-blue-400"
    },
    purple: {
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      border: "group-hover:border-purple-500/30",
      glow: "bg-purple-500/20",
      text: "group-hover:text-purple-400",
      icon: "text-purple-400"
    },
    emerald: {
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      border: "group-hover:border-emerald-500/30",
      glow: "bg-emerald-500/20",
      text: "group-hover:text-emerald-400",
      icon: "text-emerald-400"
    },
    orange: {
      gradient: "from-orange-500/20 via-red-500/10 to-transparent",
      border: "group-hover:border-orange-500/30",
      glow: "bg-orange-500/20",
      text: "group-hover:text-orange-400",
      icon: "text-orange-400"
    },
  };

  const theme = colorMap[color];

  return (
    <div className={`group relative w-[280px] md:w-[400px] h-[450px] md:h-[520px] rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900/80 border border-white/5 overflow-hidden transition-all duration-500 ${theme.border} hover:shadow-2xl hover:shadow-black/50`}>
      {/* Ambient Glow */}
      <div className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] transition-all duration-700 opacity-0 group-hover:opacity-100 ${theme.glow}`} />
      
      <div className="relative h-full flex flex-col p-6 md:p-8 z-10">
        {/* Visual Area */}
        <div className="h-48 md:h-64 mb-6 md:mb-8 rounded-[1.5rem] md:rounded-[2rem] bg-black/40 border border-white/5 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700 ease-out">
            {/* Gradient Mesh */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-40`} />
            
            {/* Abstract Geometric Composition */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                    {/* Circles */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 group-hover:scale-110 transition-transform duration-1000`} />
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-48 md:h-48 rounded-full border border-white/5 group-hover:scale-90 transition-transform duration-1000 delay-100`} />
                    
                    {/* Floating Elements */}
                    <div className={`absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/20 animate-pulse`} />
                    <div className={`absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full ${theme.glow.replace('bg-', 'bg-')} opacity-60`} />
                </div>
            </div>
            
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-between">
            <div>
                <h3 className={`text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 tracking-tight transition-colors duration-300 ${theme.text}`}>{title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{description}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/5">
                <span className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest">Version 2.0</span>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors ${theme.text}`}>
                    <svg className="w-4 h-4 md:w-5 md:h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
