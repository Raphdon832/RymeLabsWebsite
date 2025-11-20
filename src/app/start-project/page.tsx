"use client";

import StarBackground from "@/components/StarBackground";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";

export default function StartProjectPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-white selection:text-black relative pt-32 pb-20 px-6">
      <StarBackground />
      <Header />
      
            <div className="max-w-3xl mx-auto">
                <FadeIn inView={false}>
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
              Start a Project
            </h1>
            <div className="flex items-center gap-4 mb-8">
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-white' : 'bg-white/10'}`} />
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-white' : 'bg-white/10'}`} />
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-white' : 'bg-white/10'}`} />
          </div>
        </div>
                </FadeIn>

                <FadeIn delay={0.2} inView={false}>
          <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm min-h-[400px] flex flex-col justify-between">
            {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold">What are you looking to build?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Web Application', 'Mobile App', 'Marketing Site', 'E-commerce', 'Custom Software', 'Other'].map((opt) => (
                            <button key={opt} className="p-4 rounded-xl border border-white/10 hover:bg-white hover:text-black transition-all text-left font-medium">
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold">What is your estimated budget?</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {['< $10k', '$10k - $50k', '$50k - $100k', '$100k+'].map((opt) => (
                            <button key={opt} className="p-4 rounded-xl border border-white/10 hover:bg-white hover:text-black transition-all text-left font-medium">
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold">Last details</h2>
                    <div className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50" />
                        <input type="email" placeholder="Your Email" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50" />
                        <textarea placeholder="Anything else we should know?" rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50" />
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
                {step > 1 ? (
                    <button onClick={() => setStep(s => s - 1)} className="text-zinc-400 hover:text-white transition-colors font-medium">
                        Back
                    </button>
                ) : <div></div>}
                
                {step < 3 ? (
                    <MagneticButton onClick={() => setStep(s => s + 1)} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        Next Step
                    </MagneticButton>
                ) : (
                    <MagneticButton className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        Submit Request
                    </MagneticButton>
                )}
            </div>
        </div>
        </FadeIn>
      </div>

    </div>
  );
}
