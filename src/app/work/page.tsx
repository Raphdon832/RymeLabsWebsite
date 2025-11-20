"use client";

import StarBackground from "@/components/StarBackground";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function WorkPage() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-white selection:text-black relative pt-32 pb-20 px-6">
      <StarBackground />
      <Header />
      
      <div className="max-w-7xl mx-auto">
        <FadeIn inView={false}>
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
              Selected Work
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl">
              A showcase of our most ambitious projects and collaborations.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} inView={false}>
          <div className="space-y-32">
          {[
            { title: "Neon Horizon", category: "Immersive Web Experience", year: "2023", color: "bg-purple-500" },
            { title: "Quantum Leap", category: "Fintech Dashboard", year: "2023", color: "bg-blue-500" },
            { title: "EcoSphere", category: "Sustainability Platform", year: "2022", color: "bg-emerald-500" },
            { title: "AeroDynamics", category: "3D Product Configurator", year: "2022", color: "bg-orange-500" },
          ].map((project, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={`w-full h-[60vh] ${project.color} rounded-3xl mb-8 opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-[1.01] relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                 {/* Placeholder for project image */}
                 <div className="absolute inset-0 flex items-center justify-center text-white/20 text-9xl font-bold mix-blend-overlay">
                    {project.title.split(' ')[0]}
                 </div>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-8">
                <div>
                  <h3 className="text-4xl font-bold mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 text-lg">{project.category}</p>
                </div>
                <span className="text-zinc-500 font-mono">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
        </FadeIn>
      </div>
    </div>
  );
}
