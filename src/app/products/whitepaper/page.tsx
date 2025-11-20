"use client";

import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";
import Image from "next/image";
import FloatingBooks from "@/components/FloatingBooks";

export default function WhitePaperPage() {
  return (
    <PageShell containerClassName="max-w-7xl">
      <FloatingBooks />
      {/* Hero Section */}
      <FadeIn inView={false}>
        <div className="mb-20 pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-amber-400 font-mono text-sm tracking-widest uppercase">Coming Soon</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-amber-500">
            WhitePaper
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Nigeria’s academic knowledge hub. An AI-powered repository where students can find, upload, organize, and study academic documents with a built-in research assistant.
          </p>
          
          <div className="mt-8 flex gap-4">
            <MagneticButton className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 cursor-not-allowed opacity-80">
              Coming to iOS & Android
            </MagneticButton>
          </div>
        </div>
      </FadeIn>

      {/* Hero Image Placeholder */}
      <FadeIn delay={0.1} inView={false}>
        <div className="w-full mb-32 relative group">
            <div className="relative w-full max-w-53 md:max-w-62 lg:max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/20 bg-zinc-900/50 border border-white/10 aspect-[9/16] flex items-center justify-center">
                <div className="text-center p-6">
                    <p className="text-zinc-500 font-mono text-sm mb-2">[App Interface Placeholder]</p>
                    <p className="text-zinc-600 text-xs">WhitePaper Mobile App</p>
                </div>
            </div>
        </div>
      </FadeIn>

      {/* The Problem & Solution */}
      <FadeIn delay={0.2} inView={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-32">
            <div>
                <h2 className="text-xl md:text-2xl font-bold mb-6">The Academic Challenge</h2>
                <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
                    <p>
                        Students across Nigerian universities struggle with accessing quality academic resources. From finding project topics and past questions to organizing scattered lecture notes, the academic journey is often fragmented and inefficient.
                    </p>
                    <p>
                        <strong className="text-white">WhitePaper</strong> unifies this experience. It acts as a modern library, Google Drive, and AI tutor all in one, giving students a central hub to discover, store, and understand their materials.
                    </p>
                </div>
            </div>
            <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-amber-400">Smart Repository</h3>
                    <p className="text-zinc-400 text-sm">Access thousands of past projects, assignments, and questions organized by university, faculty, and department.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-amber-400">Personal Cloud</h3>
                    <p className="text-zinc-400 text-sm">Upload, organize, and sync your own notes and research papers across devices, replacing messy file storage.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-amber-400">AI Copilot</h3>
                    <p className="text-zinc-400 text-sm">Your personal research assistant. Summarize PDFs, extract key points, generate flashcards, and simplify complex topics instantly.</p>
                </div>
            </div>
        </div>
      </FadeIn>

      {/* Key Features Grid */}
      <FadeIn delay={0.3} inView={false}>
        <div className="mb-32">
            <h2 className="text-xl md:text-2xl font-bold mb-12 text-center">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                    { 
                        title: "Document Search", 
                        desc: "Find materials by topic, department, or level. Full-text search ensures you never miss a relevant resource." 
                    },
                    { 
                        title: "My Papers", 
                        desc: "A dedicated personal library to upload, rename, and organize your academic life in the cloud." 
                    },
                    { 
                        title: "AI Summarization", 
                        desc: "Turn 100-page PDFs into concise summaries, chapter breakdowns, and study guides in seconds." 
                    },
                    { 
                        title: "Academic Forums", 
                        desc: "Connect with peers, ask questions, and share resources in school-specific community discussions." 
                    },
                    { 
                        title: "Project Templates", 
                        desc: "Access verified guides for project writing, including chapter structures, citation formats, and research methodologies." 
                    },
                    { 
                        title: "Study Tools", 
                        desc: "Generate practice questions and flashcards from your lecture notes to prepare for exams effectively." 
                    }
                ].map((feature, i) => (
                    <div key={i} className="rounded-3xl bg-zinc-900/30 border border-white/10 p-6 hover:bg-zinc-900/50 transition-colors group">
                        <h3 className="text-lg font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">{feature.title}</h3>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-8">The Future of Learning</h2>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10">
                    WhitePaper aims to become the universal academic database for Africa. By digitizing and connecting knowledge across institutions, we are building an AI-first ecosystem where every document is searchable, explainable, and interactive.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Coming soon to App Store & Play Store
                </div>
            </div>
        </div>
      </FadeIn>
    </PageShell>
  );
}
