"use client";

import React from "react";

interface ShimmerCardProps {
  title: string;
  description: string;
}

export default function ShimmerCard({ title, description }: ShimmerCardProps) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/5 transition-colors">
      
      {/* Animated Border Layer - Visible on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#3b82f6_75%,#ffffff_100%)]" />
      </div>

      {/* Inner Content Mask - creates the border thickness */}
      <div className="absolute inset-[1px] rounded-[23px] bg-black/90 backdrop-blur-xl" />
      
      {/* Default Border (Static) - fades out on hover */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:opacity-0 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative p-8 z-10 h-full flex flex-col">
        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-zinc-400 leading-relaxed flex-grow">{description}</p>
      </div>
    </div>
  );
}
