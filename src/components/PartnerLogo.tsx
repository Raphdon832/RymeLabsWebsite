"use client";

import React from "react";

interface PartnerLogoProps {
  name: string;
}

export const PartnerLogo: React.FC<PartnerLogoProps> = ({ name }) => {
  const renderLogo = () => {
    switch (name) {
      case "UrbanDev Studio":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-foreground text-background rounded-lg flex items-center justify-center font-bold text-xl">U</div>
            <span className="font-bold text-xl tracking-tight">UrbanDev<span className="font-light text-muted-foreground">Studio</span></span>
          </div>
        );
      case "UrbanDev Games":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="font-bold text-xl tracking-tight">UrbanDev<span className="text-purple-400 dark:text-purple-400 text-purple-600">Games</span></span>
          </div>
        );
      case "5Stars Consulting":
        return (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
                {[1,2,3].map(i => (
                    <svg key={i} className={`w-6 h-6 ${i === 2 ? 'text-yellow-400 dark:text-yellow-400 text-yellow-500' : 'text-yellow-500/50'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
            </div>
            <div className="flex flex-col leading-none">
                <span className="font-bold text-lg">5Stars</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Consulting</span>
            </div>
          </div>
        );
      case "5Stars Premier League":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                <span className="font-serif font-bold text-yellow-500">5S</span>
            </div>
            <span className="font-bold text-xl font-serif">Premier<span className="text-yellow-500">League</span></span>
          </div>
        );
      case "Fivescores.com":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center relative overflow-hidden">
                <div className="absolute bottom-0 left-1 w-2 h-4 bg-green-500" />
                <div className="absolute bottom-0 left-4 w-2 h-6 bg-green-400" />
                <div className="absolute bottom-0 left-7 w-2 h-3 bg-green-600" />
            </div>
            <span className="font-mono font-bold text-xl">Fivescores<span className="text-green-500">.com</span></span>
          </div>
        );
      default:
        return <span className="text-xl font-bold">{name}</span>;
    }
  };

  return (
    <div className="opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer">
        {renderLogo()}
    </div>
  );
};
