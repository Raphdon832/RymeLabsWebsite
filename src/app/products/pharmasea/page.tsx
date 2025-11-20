"use client";

import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import FloatingPills from "@/components/FloatingPills";

const galleryImages = [
  "/pharmasea/Pharmasea Profile page.png",
  "/pharmasea/Pharmasea Dashboard Review page.png",
  "/pharmasea/Pharmasea Dashboard Overview page 1.png",
  "/pharmasea/Pharmasea Dashboard Review Management page.png",
  "/pharmasea/Pharmasea Dashboard Overview page 2.png",
  "/pharmasea/Pharmasea Dashboard Bulk Upload Modal.png",
  "/pharmasea/Add new product.png",
  "/pharmasea/Pharmasea product detail page.png",
  "/pharmasea/Pharmasea's nearby page.png",
  "/pharmasea/PharmAI chat page.png",
  "/pharmasea/New Products page.png",
  "/pharmasea/Create Prescription in chat thread.png",
  "/pharmasea/Messages page.png",
  "/pharmasea/Vendor Profile page.png",
  "/pharmasea/My prescriptions.png",
  "/pharmasea/Pharmasea Home page.png"
];

export default function PharmaseaPage() {
  return (
    <PageShell containerClassName="max-w-7xl">
      <FloatingPills />
      {/* Hero Section */}
      <FadeIn inView={false}>
        <div className="mb-20 pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase">Live Product</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-emerald-500">
            Pharmasea
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            Your one-stop digital ocean for medicines and pharmacy services. Connecting patients to verified pharmacies with delivery, chat, and AI support wrapped into one platform.
          </p>
          
          <div className="mt-8 flex gap-4">
            <Link href="https://pharmasea.store" target="_blank">
                <MagneticButton className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95">
                Visit Platform
                </MagneticButton>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Hero Image Placeholder */}
      <FadeIn delay={0.1} inView={false}>
        <div className="w-full mb-32 relative group">
            <div className="relative w-full max-w-53 md:max-w-62 lg:max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20">
                <Image 
                  src="/pharmasea/Pharmasea Home page.png" 
                  alt="Pharmasea App Interface" 
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                />
            </div>
        </div>
      </FadeIn>

      {/* The Problem & Solution */}
      <FadeIn delay={0.2} inView={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-32">
            <div>
                <h2 className="text-xl md:text-2xl font-bold mb-6">Bridging the Gap</h2>
                <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
                    <p>
                        In many regions, finding specific medications involves trekking to multiple pharmacies, facing opaque pricing, and lacking professional guidance.
                    </p>
                    <p>
                        <strong className="text-white">Pharmasea</strong> solves this by bringing visibility and convenience to healthcare. We provide a digital infrastructure that lets users discover nearby verified pharmacies, compare prices, and order medications for delivery or pickup—all from their phone.
                    </p>
                </div>
            </div>
            <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-emerald-400">For Patients</h3>
                    <p className="text-zinc-400 text-sm">Discoverability, price transparency, and the convenience of doorstep delivery or reserved pickup.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-emerald-400">For Pharmacies</h3>
                    <p className="text-zinc-400 text-sm">A complete digital toolkit: online storefronts, inventory management, and order processing dashboards.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-2 text-emerald-400">PharmAI Assistant</h3>
                    <p className="text-zinc-400 text-sm">An embedded AI companion for medication guidance, health education, and app navigation support.</p>
                </div>
            </div>
        </div>
      </FadeIn>

      {/* Key Features Grid */}
      <FadeIn delay={0.3} inView={false}>
        <div className="mb-32">
            <h2 className="text-xl md:text-2xl font-bold mb-12 text-center">Core Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                    { 
                        title: "Location-Based Discovery", 
                        desc: "Find verified pharmacies near you on a map. Filter by 24/7 availability, delivery options, or price.",
                        image: "/pharmasea/Pharmasea's nearby page.png"
                    },
                    { 
                        title: "Smart Search & Compare", 
                        desc: "Search for drugs by brand or category. Compare stock availability and prices across multiple vendors instantly.",
                        image: "/pharmasea/Pharmasea product detail page.png"
                    },
                    { 
                        title: "Seamless Fulfillment", 
                        desc: "Choose between doorstep delivery or 'click-and-collect' pickup. Upload prescriptions for verification.",
                        image: "/pharmasea/My prescriptions.png"
                    },
                    { 
                        title: "Vendor Dashboard", 
                        desc: "Pharmacies get a powerful portal to manage catalogs, stock levels, orders, and customer chats.",
                        image: "/pharmasea/Pharmasea Dashboard Overview page 1.png"
                    },
                    { 
                        title: "PharmAI Support", 
                        desc: "Ask questions like 'Can I take this with food?' or 'What is this drug for?' and get instant, safe educational guidance.",
                        image: "/pharmasea/PharmAI chat page.png"
                    },
                    { 
                        title: "Data-Driven Insights", 
                        desc: "Analytics on sales trends and demand patterns to help pharmacies optimize their supply chain.",
                        image: "/pharmasea/Pharmasea Dashboard Review Management page.png"
                    }
                ].map((feature, i) => (
                    <div key={i} className="rounded-3xl bg-zinc-900/30 border border-white/10 p-6 hover:bg-zinc-900/50 transition-colors overflow-hidden group">
                        <div className="relative w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden border border-white/5">
                            <Image 
                                src={feature.image} 
                                alt={feature.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </FadeIn>

      {/* Image Gallery */}
      <FadeIn delay={0.35} inView={false}>
        <div className="mb-32">
            <h2 className="text-2xl font-bold mb-12 text-center">App Gallery</h2>
            <ImageGallery images={galleryImages} />
        </div>
      </FadeIn>

      {/* Strategic Vision */}
      <FadeIn delay={0.4} inView={false}>
        <div className="py-20 border-t border-white/10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Health-Commerce Infrastructure</h2>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10">
                    Pharmasea is more than an app; it's a bridge between offline community pharmacies and the digital lifestyle of modern users. By building this data layer, we enable better supply chain decisions, seasonal demand prediction, and improved health access across Africa.
                </p>
                <Link href="https://pharmasea.store" target="_blank">
                    <MagneticButton className="bg-emerald-500 text-black px-8 py-4 rounded-full text-base font-bold hover:bg-emerald-400 transition-all">
                        Experience Pharmasea
                    </MagneticButton>
                </Link>
            </div>
        </div>
      </FadeIn>
    </PageShell>
  );
}
