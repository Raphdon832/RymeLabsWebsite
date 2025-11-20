"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import RotatingHeadline from "@/components/RotatingHeadline";
import ShimmerCard from "@/components/ShimmerCard";
import SolutionsBackground from "@/components/SolutionsBackground";
import Link from "next/link";

const solutions = [
  {
    title: "Enterprise AI",
    desc: "Custom large language models and predictive analytics integrated directly into your workflow.",
  },
  {
    title: "Immersive Web",
    desc: "WebGL and 3D web experiences that captivate audiences and increase dwell time.",
  },
  {
    title: "Blockchain",
    desc: "Secure, decentralized infrastructure for fintech and supply chain transparency.",
  },
  {
    title: "Mobile Ecosystems",
    desc: "Cross-platform applications with native performance and unified design systems.",
  },
  {
    title: "Cloud Architecture",
    desc: "Serverless and microservices architectures designed for infinite scalability.",
  },
  {
    title: "Cybersecurity",
    desc: "Zero-trust security frameworks protecting your most valuable digital assets.",
  },
];

const rotatingPhrases = [
  "scale",
  "visionary founders",
  "category leaders",
  "tomorrow's markets",
];

export default function SolutionsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <PageShell containerClassName="max-w-7xl">
      <SolutionsBackground activeCard={hoveredCard} />
      
      <FadeIn inView={false}>
        <div className="mb-20">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 mb-6">Capabilities</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance solutions-headline-truncate">
            <span className="block sm:inline">Solutions engineered for</span>
            <span className="hidden sm:inline">{' '}</span>
            <span className="block sm:inline sm:ml-2 mt-2 sm:mt-0">
              <RotatingHeadline
                phrases={rotatingPhrases}
                noWrap={false}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400 sm:whitespace-nowrap"
              />
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            Tailored strategies for complex digital challenges — from infrastructure to immersive brand experiences.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} inView={false}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item) => (
            <div 
              key={item.title} 
              className="h-full"
              onMouseEnter={() => setHoveredCard(item.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <ShimmerCard title={item.title} description={item.desc} />
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3} inView={false}>
        <div className="mt-32 flex flex-col items-center text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 mb-4">Partnership</p>
          <h2 className="text-3xl font-bold mb-8">Have a specific challenge?</h2>
          <Link href="/contact">
            <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95">
              Talk to an Expert
            </MagneticButton>
          </Link>
        </div>
      </FadeIn>
    </PageShell>
  );
}
