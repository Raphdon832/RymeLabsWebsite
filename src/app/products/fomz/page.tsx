"use client";

import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";
import Image from "next/image";

export default function FomzPage() {
  return (
    <PageShell containerClassName="max-w-7xl">
      {/* Hero Section */}
      <FadeIn inView={false}>
        <div className="mb-20 pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Live Product</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-500">
            Fomz
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed">
            The beautiful, intelligent evolution of data collection. A next-generation form builder that combines the simplicity of Google Forms with professional design customization and AI-driven analytics.
          </p>
          
          <div className="mt-8 flex gap-4">
            <Link href="https://fomz.netlify.app" target="_blank">
                <MagneticButton className="bg-white text-black px-8 py-4 rounded-full text-base font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95">
                Create a Fomz
                </MagneticButton>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Hero Image Placeholder */}
      <FadeIn delay={0.1} inView={false}>
        <div className="w-full mb-32 relative group">
            <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20 bg-zinc-900/50 aspect-video flex items-center justify-center">
                <div className="text-center p-6">
                    <p className="text-zinc-500 font-mono text-sm mb-2">[App Interface Placeholder]</p>
                    <p className="text-zinc-600 text-xs">Fomz Dashboard & Builder</p>
                </div>
            </div>
        </div>
      </FadeIn>

      {/* The Problem & Solution */}
      <FadeIn delay={0.2} inView={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
            <div>
                <h2 className="text-2xl font-bold mb-6">Beyond Basic Forms</h2>
                <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
                    <p>
                        Traditional form builders are functional but uninspiring. They often feel like "homework" for users, lack brand customization, and provide only basic spreadsheet data.
                    </p>
                    <p>
                        <strong className="text-white">Fomz</strong> changes the narrative. We believe data collection should be an experience, not a chore. By prioritizing design, interactivity, and intelligence, we help creators build forms that people actually want to fill out.
                    </p>
                </div>
            </div>
            <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-blue-400">Design-First</h3>
                    <p className="text-zinc-400 text-sm">Forms that feel like landing pages. Full control over fonts, colors, backgrounds, and layout to match your brand identity.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-blue-400">AI-Powered</h3>
                    <p className="text-zinc-400 text-sm">Describe your goal, and our AI generates the perfect form structure, questions, and logic in seconds.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-blue-400">Visual Analytics</h3>
                    <p className="text-zinc-400 text-sm">Don't just see rows of data. Visualize trends, sentiment, and completion rates with our beautiful built-in dashboard.</p>
                </div>
            </div>
        </div>
      </FadeIn>

      {/* Key Features Grid */}
      <FadeIn delay={0.3} inView={false}>
        <div className="mb-32">
            <h2 className="text-2xl font-bold mb-12 text-center">Why Choose Fomz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { 
                        title: "Smart Form Generator", 
                        desc: "Type 'Registration for a tech hackathon' and watch Fomz build the entire form with relevant fields instantly." 
                    },
                    { 
                        title: "Immersive UX", 
                        desc: "Smooth transitions, animations, and mobile-first layouts that make filling out forms feel effortless." 
                    },
                    { 
                        title: "Conditional Logic", 
                        desc: "Create dynamic paths. Show or hide questions based on previous answers to keep forms concise and relevant." 
                    },
                    { 
                        title: "Drag-and-Drop Builder", 
                        desc: "Intuitively add text, multiple choice, file uploads, ratings, and more with a simple visual editor." 
                    },
                    { 
                        title: "Share Anywhere", 
                        desc: "Embed forms directly in your website, share via a custom link, or generate a QR code for physical events." 
                    },
                    { 
                        title: "Data Insights", 
                        desc: "Go beyond spreadsheets. Understand your audience with automated charts, summaries, and key metric tracking." 
                    }
                ].map((feature, i) => (
                    <div key={i} className="rounded-3xl bg-zinc-900/30 border border-white/10 p-8 hover:bg-zinc-900/50 transition-colors group">
                        <h3 className="text-lg font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </FadeIn>

      {/* Strategic Vision */}
      <FadeIn delay={0.4} inView={false}>
        <div className="py-20 border-t border-white/10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">The Future of Interaction</h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                    Fomz is more than a tool; it's a new standard for digital interaction. We are bridging the gap between utility and aesthetics, proving that even the simplest administrative tasks can be beautiful, engaging, and intelligent.
                </p>
                <Link href="https://fomz.netlify.app" target="_blank">
                    <MagneticButton className="bg-blue-500 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        Start Building for Free
                    </MagneticButton>
                </Link>
            </div>
        </div>
      </FadeIn>
    </PageShell>
  );
}
