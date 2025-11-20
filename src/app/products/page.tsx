import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import { ProductCard } from "@/components/ProductCard";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";

const products = [
  {
    title: "Fomz by RymeLabs",
    description:
      "A signature product delivering unique digital experiences. Fomz revolutionizes how users interact with digital content through immersive interfaces.",
    color: "blue" as const,
  },
  {
    title: "Pharmasea",
    description:
      "Navigating the future of pharmaceutical technology. An AI-driven platform for supply chain optimization and drug discovery acceleration.",
    color: "emerald" as const,
    href: "/products/pharmasea",
  },
  {
    title: "WhitePaper",
    description:
      "Streamlining information with intelligent document solutions. The next generation of knowledge management for enterprise.",
    color: "orange" as const,
  },
  {
    title: "Nebula Core",
    description:
      "Cloud infrastructure management reimagined. Autonomous scaling and self-healing capabilities for mission-critical systems.",
    color: "purple" as const,
  },
];

export default function ProductsPage() {
  return (
    <PageShell containerClassName="max-w-7xl">
      <FadeIn inView={false}>
        <div className="mb-20">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 mb-6">Product Suite</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
            Our Products
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl">
            Proprietary technologies engineered to redefine industry standards and deliver measurable impact.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} inView={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3} inView={false}>
        <div className="mt-32 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 mb-4">Next Steps</p>
          <h2 className="text-2xl font-bold mb-8">Ready to build the future?</h2>
          <Link href="/start-project">
            <MagneticButton className="bg-white text-black px-8 py-4 rounded-full text-base font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] inline-block">
              Start Your Project
            </MagneticButton>
          </Link>
        </div>
      </FadeIn>
    </PageShell>
  );
}
