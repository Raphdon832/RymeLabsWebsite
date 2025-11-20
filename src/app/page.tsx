"use client";

import { useState } from "react";
import Image from "next/image";
import BinaryBackground from "@/components/BinaryBackground";
import GlobeBackground from "@/components/GlobeBackground";
import WavyBackground from "@/components/WavyBackground";
import StarBackground from "@/components/StarBackground";
import HeroTitle from "@/components/HeroTitle";
import FadeIn from "@/components/FadeIn";
import ScrollToTopBall from "@/components/ScrollToTopBall";
import ScrollToBottomBall from "@/components/ScrollToBottomBall";
import MenuOverlay from "@/components/MenuOverlay";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { PartnerLogo } from "@/components/PartnerLogo";
import MagneticButton from "@/components/MagneticButton";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-white selection:text-black relative">
      <Preloader />
      <StarBackground />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Image 
            src="/RymeLabsIcon.png" 
            alt="RymeLabs" 
            width={40} 
            height={40} 
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-white">RymeLabs</span>
        </div>
        
        <MagneticButton 
          onClick={() => setIsMenuOpen(true)}
          className="group bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 backdrop-blur-sm cursor-pointer"
        >
          <span className="tracking-wide">MENU</span>
          <div className="flex flex-col gap-[5px] items-end">
            <span className="w-6 h-[2px] bg-white rounded-full group-hover:w-4 transition-all duration-300"></span>
            <span className="w-4 h-[2px] bg-white rounded-full group-hover:w-6 transition-all duration-300"></span>
          </div>
        </MagneticButton>
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center px-4 py-32 md:py-48 overflow-hidden min-h-screen">
        <BinaryBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
        <FadeIn className="relative z-10 flex flex-col items-center w-full max-w-[90%] md:max-w-[80%] mx-auto">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Accepting New Projects
          </div>
          <HeroTitle />
          <div className="flex flex-col sm:flex-row gap-6">
            <MagneticButton className="bg-white text-black px-6 py-3 rounded-full text-base font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer">
              Start Your Project
            </MagneticButton>
            <MagneticButton className="group border border-zinc-700 text-white px-6 py-3 rounded-full text-base font-bold hover:bg-zinc-900 transition-all hover:border-zinc-500 flex items-center gap-2 cursor-pointer">
              View Our Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </MagneticButton>
          </div>
        </FadeIn>
        <ScrollToBottomBall />
      </main>

      {/* Services Section */}
      <section className="px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-transparent to-transparent" />
        <WavyBackground />
        <FadeIn className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">What We Create</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">We don't just write code; we engineer digital ecosystems designed for scale, performance, and impact.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "App Development",
                desc: "Transforming concepts into intuitive, high-performance mobile experiences for iOS and Android.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                )
              },
              {
                title: "Web Platforms",
                desc: "Building scalable, modern web applications that drive business growth and user engagement.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                )
              },
              {
                title: "AI & Emerging Tech",
                desc: "Harnessing the power of Artificial Intelligence and Machine Learning to solve complex challenges.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                )
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-zinc-900/50 hover:-translate-y-1">
                <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Products Section */}
      <section className="relative px-6 py-32 border-t border-white/5 bg-black/20 overflow-hidden">
        <div className="absolute -right-20 top-0 bottom-0 w-full md:w-1/2 opacity-40 pointer-events-none mix-blend-screen">
          <GlobeBackground />
        </div>
        <FadeIn className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">Innovation Lab</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">Our Products</h2>
              <p className="text-zinc-400 text-lg max-w-xl">Innovative solutions built in-house to solve real-world problems.</p>
            </div>
            <a href="#" className="text-white border-b border-white pb-1 hover:text-zinc-300 hover:border-zinc-300 transition-colors">View all products →</a>
          </div>

          <Marquee className="py-4" baseVelocity={-0.2}>
            {[
              {
                name: "Fomz by RymeLabs",
                desc: "A signature product delivering unique digital experiences.",
                color: "blue" as const
              },
              {
                name: "Pharmasea",
                desc: "Navigating the future of pharmaceutical technology.",
                color: "emerald" as const
              },
              {
                name: "WhitePaper",
                desc: "Streamlining information with intelligent document solutions.",
                color: "orange" as const
              },
              {
                name: "Fomz by RymeLabs",
                desc: "A signature product delivering unique digital experiences.",
                color: "blue" as const
              },
              {
                name: "Pharmasea",
                desc: "Navigating the future of pharmaceutical technology.",
                color: "emerald" as const
              },
              {
                name: "WhitePaper",
                desc: "Streamlining information with intelligent document solutions.",
                color: "orange" as const
              }
            ].map((product, i) => (
              <div key={i} className="mx-4">
                <ProductCard 
                  title={product.name} 
                  description={product.desc} 
                  color={product.color} 
                />
              </div>
            ))}
          </Marquee>
        </FadeIn>
      </section>

      {/* Client Projects Section */}
      <section className="px-6 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        <FadeIn className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">Client Success Stories</h2>
          
          <Marquee className="py-4" baseVelocity={-0.2}>
            {[
              { name: "Scenscia.com", type: "Web Platform" },
              { name: "Lenox Phoenix", type: "Business Solution" },
              { name: "Trackd", type: "Mobile Application" },
              { name: "Fivescores.com", type: "Sports Analytics" },
              { name: "Scenscia.com", type: "Web Platform" },
              { name: "Lenox Phoenix", type: "Business Solution" },
              { name: "Trackd", type: "Mobile Application" },
              { name: "Fivescores.com", type: "Sports Analytics" }
            ].map((client, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/20 hover:bg-zinc-900/40 transition-all duration-300 w-[280px] flex-shrink-0">
                <div className="h-12 w-12 mb-6 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <span className="font-bold text-lg">{client.name[0]}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-zinc-200 group-hover:text-white">{client.name}</h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400">{client.type}</p>
              </div>
            ))}
          </Marquee>
          
          <div className="mt-16 text-center">
            <p className="text-zinc-500 text-lg">...and many more successful deployments.</p>
          </div>
        </FadeIn>
      </section>

      {/* Partners Section */}
      <section className="relative z-20 px-6 py-32 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">Trusted by Industry Leaders</h2>
            <p className="text-zinc-400 text-lg">Powering the next generation of digital experiences.</p>
          </div>
          
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              {["UrbanDev Studio", "UrbanDev Games", "5Stars Consulting", "5Stars Premier League", "Fivescores.com"].map((partner, i) => (
                <div key={i} className="w-full flex justify-center p-4 hover:bg-white/5 rounded-xl transition-colors duration-300">
                  <PartnerLogo name={partner} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-20 border-t border-white/10 bg-black/80 backdrop-blur-md relative">
        <ScrollToTopBall />
        <FadeIn className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <div className="text-3xl font-bold tracking-tighter mb-6">RymeLabs</div>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Pioneering the digital frontier with code, creativity, and cutting-edge technology.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-zinc-400">
              <li className="leading-relaxed">11C Dream City Estate,<br/>Abuja, Nigeria</li>
              <li><a href="tel:+234706010242" className="hover:text-white transition-colors">+234 706 010 242</a></li>
            </ul>
          </div>
        </FadeIn>
        <FadeIn className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm" delay={0.2}>
          <p>© 2025 RymeLabs Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
}
