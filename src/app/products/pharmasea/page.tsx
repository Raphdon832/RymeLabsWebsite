"use client";

import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";

export default function PharmaseaPage() {
  return (
    <PageShell containerClassName="max-w-7xl">
      {/* Hero Section */}
      <FadeIn inView={false}>
        <div className="mb-20 pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase">Live Product</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-emerald-500">
            Pharmasea
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl">
            Your trusted digital pharmacy marketplace. Navigating the future of pharmaceutical technology with AI-driven supply chain optimization.
          </p>
          
          <div className="mt-8 flex gap-4">
            <Link href="https://pharmasea.store" target="_blank">
                <MagneticButton className="bg-white text-black px-8 py-4 rounded-full text-base font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95">
                Visit Platform
                </MagneticButton>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Hero Image Placeholder */}
      <FadeIn delay={0.1} inView={false}>
        <div className="w-full h-[60vh] bg-zinc-900/50 rounded-3xl border border-white/10 flex items-center justify-center mb-32 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <p className="text-zinc-600 font-mono text-lg z-10">[Hero Image: Dashboard Interface or 3D Abstract Pill]</p>
        </div>
      </FadeIn>

      {/* Overview Section */}
      <FadeIn delay={0.2} inView={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
            <div>
                <h2 className="text-2xl font-bold mb-6">The Digital Pharmacy Revolution</h2>
                <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
                    <p>
                        Pharmasea bridges the gap between pharmaceutical suppliers, healthcare providers, and patients. By creating a unified digital marketplace, we eliminate inefficiencies in the traditional supply chain.
                    </p>
                    <p>
                        Our platform leverages advanced Artificial Intelligence to predict inventory needs, optimize delivery routes, and accelerate the drug discovery process by analyzing vast datasets of chemical compounds.
                    </p>
                </div>
            </div>
            <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-emerald-400">Supply Chain AI</h3>
                    <p className="text-zinc-400 text-sm">Predictive analytics that prevent shortages and reduce wastage through intelligent inventory management.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-emerald-400">Digital Marketplace</h3>
                    <p className="text-zinc-400 text-sm">A secure, compliant platform for B2B and B2C pharmaceutical transactions.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-emerald-400">Discovery Engine</h3>
                    <p className="text-zinc-400 text-sm">Accelerating R&D with machine learning models that identify potential drug candidates.</p>
                </div>
            </div>
        </div>
      </FadeIn>

      {/* Feature Showcase Placeholders */}
      <FadeIn delay={0.3} inView={false}>
        <div className="mb-32">
            <h2 className="text-2xl font-bold mb-12 text-center">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Smart Inventory", desc: "Real-time tracking and automated restocking based on predictive demand models." },
                    { title: "Secure Transactions", desc: "Blockchain-verified payments and supply chain transparency for every unit." },
                    { title: "Patient Portal", desc: "Seamless prescription management and direct-to-consumer delivery options." }
                ].map((feature, i) => (
                    <div key={i} className="aspect-square rounded-3xl bg-zinc-900/30 border border-white/10 flex flex-col items-center justify-center p-8 text-center hover:bg-zinc-900/50 transition-colors">
                        <div className="w-full flex-1 bg-zinc-800/50 rounded-xl mb-6 flex items-center justify-center border border-white/5 border-dashed">
                            <span className="text-zinc-600 font-mono text-sm">[Feature Image {i + 1}]</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-zinc-500 text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </FadeIn>

      {/* Next Steps */}
      <FadeIn delay={0.4} inView={false}>
        <div className="text-center py-20 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-6">Ready to modernize your pharmacy operations?</h2>
            <Link href="/contact">
                <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95">
                    Contact Sales
                </MagneticButton>
            </Link>
        </div>
      </FadeIn>
    </PageShell>
  );
}
