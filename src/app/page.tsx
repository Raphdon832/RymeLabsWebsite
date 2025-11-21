"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import FloatingContactButton from "@/components/FloatingContactButton";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

const clientSuccessStories = [
  {
    name: "Scenscia",
    type: "Luxury diffuser brand",
    logo: "/Scenscia.png",
    logoWidth: 160,
    logoHeight: 48,
  },
  {
    name: "Pharmasea",
    type: "Pharmaceutical marketplace",
    logo: "/PharmaseaIcon.png",
    logoWidth: 160,
    logoHeight: 48,
  },
  {
    name: "Ryme Interiors",
    type: "Interior design studio",
    logo: "/RymeInteriors.png",
    logoWidth: 160,
    logoHeight: 48,
  },
  {
    name: "Fivescores.com",
    type: "Live scores platform connecting sports lovers",
    logo: "/fivescores.png",
    logoWidth: 180,
    logoHeight: 48,
  },
];

const HeaderText = ({ type }: { type: 'zoom' | 'type' }) => {
  if (type === 'zoom') {
    return (
      <motion.span
        className="text-xl font-bold tracking-tight text-foreground block"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        RymeLabs
      </motion.span>
    );
  }
  
  return (
    <motion.div className="text-xl font-bold tracking-tight text-foreground flex">
      {Array.from("RymeLabs").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.2 + i * 0.05, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { hasLoaded, setHasLoaded } = useLoading();
  const [loading, setLoading] = useState(!hasLoaded);
  const [animationType, setAnimationType] = useState<'zoom' | 'type'>('zoom');

  useEffect(() => {
    setAnimationType(Math.random() > 0.5 ? 'zoom' : 'type');
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setHasLoaded(true);
  };

  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-foreground selection:text-background relative bg-background">
      {!hasLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      <StarBackground showCelestialBody={true} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <FloatingContactButton />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            {!loading && (
              <motion.div 
                layoutId="logo-icon" 
                className="relative w-8 h-8"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  mass: 1
                }}
              >
                <Image 
                  src="/RymeLabsIcon.png" 
                  alt="RymeLabs" 
                  fill
                  className="object-contain dark:invert-0 invert"
                  priority
                />
              </motion.div>
            )}
          </div>
          {!loading && <HeaderText type={animationType} />}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MagneticButton 
            onClick={() => setIsMenuOpen(true)}
            className="group bg-foreground/5 border border-border text-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-foreground/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 backdrop-blur-sm cursor-pointer"
          >
            <span className="tracking-wide">MENU</span>
            <div className="flex flex-col gap-[5px] items-end">
              <span className="w-6 h-[2px] bg-foreground rounded-full group-hover:w-4 transition-all duration-300"></span>
              <span className="w-4 h-[2px] bg-foreground rounded-full group-hover:w-6 transition-all duration-300"></span>
            </div>
          </MagneticButton>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center px-4 py-32 md:py-48 overflow-hidden min-h-screen">
        <BinaryBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <FadeIn className="relative z-10 flex flex-col items-center w-full max-w-[90%] md:max-w-[80%] mx-auto">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm text-muted-foreground mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Accepting New Projects
          </div>
          <HeroTitle />
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/start-project">
              <MagneticButton className="bg-foreground text-background px-6 py-3 rounded-full text-base font-bold hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-foreground/20 cursor-pointer">
                Start Your Project
              </MagneticButton>
            </Link>
            <Link href="/work">
              <MagneticButton className="group border border-border text-foreground px-6 py-3 rounded-full text-base font-bold hover:bg-muted transition-all hover:border-foreground/50 flex items-center gap-2 cursor-pointer">
                View Our Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </MagneticButton>
            </Link>
          </div>
        </FadeIn>
        <ScrollToBottomBall />
      </main>

      {/* Services Section */}
      <section className="px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foreground/5 via-transparent to-transparent" />
        <WavyBackground />
        <FadeIn className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">What We Create</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">We don&apos;t just write code; we engineer digital ecosystems designed for scale, performance, and impact.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "App Development",
                desc: "Transforming concepts into intuitive, high-performance mobile experiences for iOS and Android.",
                icon: (
                  <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                )
              },
              {
                title: "Web Platforms",
                desc: "Building scalable, modern web applications that drive business growth and user engagement.",
                icon: (
                  <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                )
              },
              {
                title: "AI & Emerging Tech",
                desc: "Harnessing the power of Artificial Intelligence and Machine Learning to solve complex challenges.",
                icon: (
                  <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                )
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-card/30 border border-border hover:border-foreground/20 transition-all duration-300 hover:bg-card/50 hover:-translate-y-1">
                <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-border">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Products Section */}
      <section className="relative px-6 py-32 border-t border-border bg-background/20 overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground">Our Products</h2>
              <p className="text-muted-foreground text-base max-w-xl">Innovative solutions built in-house to solve real-world problems.</p>
            </div>
            <a href="/products" className="text-foreground border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors">View all products →</a>
          </div>

          <Marquee className="py-4" baseVelocity={-0.2}>
            {[
              {
                name: "Fomz by RymeLabs",
                desc: "A signature product delivering unique digital experiences.",
                color: "blue" as const,
                href: "/products/fomz"
              },
              {
                name: "Pharmasea",
                desc: "Navigating the future of pharmaceutical technology.",
                color: "emerald" as const,
                href: "/products/pharmasea"
              },
              {
                name: "WhitePaper",
                desc: "Streamlining information with intelligent document solutions.",
                color: "orange" as const,
                href: "/products/whitepaper"
              },
              {
                name: "Fomz by RymeLabs",
                desc: "A signature product delivering unique digital experiences.",
                color: "blue" as const,
                href: "/products/fomz"
              },
              {
                name: "Pharmasea",
                desc: "Navigating the future of pharmaceutical technology.",
                color: "emerald" as const,
                href: "/products/pharmasea"
              },
              {
                name: "WhitePaper",
                desc: "Streamlining information with intelligent document solutions.",
                color: "orange" as const,
                href: "/products/whitepaper"
              }
            ].map((product, i) => (
              <div key={i} className="mx-4">
                <ProductCard 
                  title={product.name} 
                  description={product.desc} 
                  color={product.color}
                  href={product.href}
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
            {[...clientSuccessStories, ...clientSuccessStories].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="group p-8 rounded-2xl bg-card/20 border border-border hover:border-foreground/20 hover:bg-card/40 transition-all duration-300 w-[280px] flex-shrink-0 text-left"
              >
                <div className="mb-6 mt-2 flex items-center justify-start h-16">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={client.logoWidth ?? 160}
                      height={client.logoHeight ?? 48}
                      className="object-contain max-h-12 w-auto drop-shadow-lg dark:invert-0 invert"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:bg-foreground/10 transition-colors self-start">
                      <span className="font-bold text-lg">{client.name[0]}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-foreground">{client.name}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">{client.type}</p>
              </div>
            ))}
          </Marquee>
          
          <div className="mt-16 text-center">
            <p className="text-zinc-500 text-base">...and many more successful deployments.</p>
          </div>
        </FadeIn>
      </section>

      {/* Partners Section */}
      <section className="relative z-20 px-6 py-32 border-t border-border bg-background/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground drop-shadow-lg">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground text-base">Powering the next generation of digital experiences.</p>
          </div>
          
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              {["UrbanDev Studio", "UrbanDev Games", "5Stars Consulting", "5Stars Premier League", "Fivescores.com"].map((partner, i) => (
                <div key={i} className="w-full flex justify-center p-4 hover:bg-foreground/5 rounded-xl transition-colors duration-300">
                  <PartnerLogo name={partner} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
