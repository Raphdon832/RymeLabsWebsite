"use client";

import StarBackground from "@/components/StarBackground";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

const clientProjects = [
  {
    name: "Scenscia",
    sector: "Luxury fragrance",
    description:
      "Immersive commerce and IoT control surfaces for a premium diffuser brand, blending cinematic merchandising with device telemetry.",
    capabilities: ["Headless commerce", "IoT pairing", "Subscription analytics"],
    image: "/Scenscia.png",
    imageWidth: 160,
    imageHeight: 60,
  },
  {
    name: "Ryme Interiors",
    sector: "Interior design",
    description:
      "A spatial design portal with interactive mood boards, AR-ready lookbooks, and concierge booking flows for luxury residential projects.",
    capabilities: ["Interactive lookbooks", "3D mood boards", "Client portal"],
    image: "/RymeInteriors.png",
    imageWidth: 150,
    imageHeight: 50,
  },
  {
    name: "Fivescores.com",
    sector: "Sports media",
    description:
      "Live scores community infrastructure with real-time play-by-play, league discovery, and fan chat synchronized across devices.",
    capabilities: ["Realtime infra", "Fan community", "Live notifications"],
    image: "/fivescores.png",
    imageWidth: 170,
    imageHeight: 50,
    href: "https://fivescores.com",
    external: true,
  },
  {
    name: "Lenox Phoenix",
    sector: "Corporate services",
    description:
      "A modular operating system for a regional conglomerate, covering finance, HR, and expansion monitoring in a single control plane.",
    capabilities: ["Workflow orchestration", "Data warehouse", "Executive dashboards"],
  },
];

const inHouseProducts = [
  {
    name: "Pharmasea",
    category: "Healthtech",
    description:
      "A pharmaceutical marketplace OS that connects pharmacies, suppliers, and AI intake flows with regulatory-grade compliance.",
    highlights: ["AI prescription triage", "Vendor marketplace", "Compliance console"],
    href: "/products/pharmasea",
    accent: "from-cyan-500/20 to-emerald-500/5",
  },
  {
    name: "WhitePaper",
    category: "Knowledge intelligence",
    description:
      "Document intelligence for research teams — ingest, summarize, and share knowledge with source-aware guardrails.",
    highlights: ["LLM summarization", "Live citations", "Secure sharing"],
    href: "/products/whitepaper",
    accent: "from-indigo-500/20 to-slate-800/40",
  },
  {
    name: "Fomz",
    category: "Productivity",
    description:
      "A design-first form builder with component-level theming, headless APIs, and automation-friendly webhooks.",
    highlights: ["Pixel-perfect theming", "Headless API", "Workflow automations"],
    href: "/products/fomz",
    accent: "from-rose-500/20 to-amber-500/10",
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-white selection:text-black relative pt-32 pb-20 px-6">
      <StarBackground />
      <Header />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn inView={false}>
          <div className="mb-16 md:mb-24">
            <p className="text-xs uppercase tracking-[0.5em] text-blue-300/80 mb-5">Portfolio</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-400">
              Client success meets in-house invention
            </h1>
            <p className="text-lg text-zinc-400 max-w-3xl">
              Every engagement blends strategy, design, and deep engineering. Explore the collaborations we have delivered for founders and enterprises, alongside the products we build and ship from our own labs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
              <span className="px-4 py-2 rounded-full border border-white/10">Client Delivery</span>
              <span className="px-4 py-2 rounded-full border border-white/10">In-House Products</span>
              <span className="px-4 py-2 rounded-full border border-white/10">AI, Cloud, Web3, Immersive</span>
            </div>
          </div>
        </FadeIn>

        {/* Client work */}
        <FadeIn delay={0.15} inView={false}>
          <section>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 mb-3">Client collaborations</p>
                <h2 className="text-3xl md:text-4xl font-semibold">Brand launches, mission-critical platforms, community ecosystems</h2>
              </div>
              <p className="text-zinc-500 max-w-md text-sm md:text-base">
                Hardware, commerce, live data, and enterprise workflows — we architect the full stack so each client ships with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clientProjects.map((project) => {
                const linkLabel = project.external ? "Visit experience" : "View details";
                return (
                  <div
                    key={project.name}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      {project.image ? (
                        <div className="relative h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">
                          <Image
                            src={project.image}
                            alt={`${project.name} logo`}
                            width={project.imageWidth ?? 140}
                            height={project.imageHeight ?? 48}
                            className="object-contain max-h-12 w-auto"
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-lg font-semibold text-white/70">
                          {project.name[0]}
                        </div>
                      )}
                      <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-1">{project.sector}</p>
                        <h3 className="text-2xl font-semibold">{project.name}</h3>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-base leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.capabilities.map((capability) => (
                        <span
                          key={`${project.name}-${capability}`}
                          className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-wide text-white/70"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                    {project.href && (
                      <Link
                        href={project.href}
                        target={project.external ? "_blank" : undefined}
                        rel={project.external ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white"
                      >
                        {linkLabel}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </FadeIn>

        {/* In-house products */}
        <FadeIn delay={0.3} inView={false}>
          <section className="mt-32">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 mb-3">In-house products</p>
                <h2 className="text-3xl md:text-4xl font-semibold">IP we operate, iterate, and scale</h2>
              </div>
              <p className="text-zinc-500 max-w-md text-sm md:text-base">
                These are the platforms we deploy internally — living proof of our craft in AI, workflow design, and premium user experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {inHouseProducts.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="group"
                >
                  <div
                    className={`h-full rounded-3xl border border-white/10 bg-gradient-to-br ${product.accent} p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] uppercase tracking-[0.5em] text-white/70">{product.category}</span>
                      <span className="text-[11px] px-3 py-1 rounded-full border border-white/20 text-white/70">In-house</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
                    <p className="text-sm text-zinc-200/80 leading-relaxed">{product.description}</p>
                    <ul className="mt-6 space-y-2 text-sm text-white/80">
                      {product.highlights.map((highlight) => (
                        <li key={`${product.name}-${highlight}`} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white">
                      Explore product
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.45} inView={false}>
          <div className="mt-28 flex flex-col items-center text-center gap-6">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">Next brief</p>
            <h3 className="text-3xl md:text-4xl font-semibold max-w-3xl text-balance">
              Ready to add your name to this list? Let's co-design the next release, platform, or flagship experience.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 font-semibold hover:bg-zinc-200 transition-all"
              >
                Start a project
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 font-semibold text-white hover:border-white/40 transition-all"
              >
                Browse products
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
