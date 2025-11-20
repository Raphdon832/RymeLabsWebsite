import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";

const offices = ["San Francisco", "London", "Tokyo", "Singapore"];

export default function CompanyPage() {
  return (
    <PageShell containerClassName="max-w-4xl">
      <FadeIn inView={false}>
        <div className="mb-20 space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">Company</p>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
            About RymeLabs
          </h1>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} inView={false}>
        <div className="space-y-16 text-base text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl text-white font-bold mb-4">Our Mission</h2>
            <p>
              RymeLabs exists to bridge the gap between imagination and digital reality. We believe that the most powerful technologies are those that feel indistinguishable from magic. Our team of engineers, designers, and visionaries push the boundaries of what is possible on the web.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-4">The Philosophy</h2>
            <p>
              We do not ship templates. Every pixel is placed with intention, every interaction tuned for delight. In a world of commodity software, RymeLabs stands for bespoke excellence — treating code as craft and design as language.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-white font-bold mb-4">Global Presence</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {offices.map((city) => (
                <div key={city} className="p-4 border border-white/10 rounded-xl text-center hover:bg-white/5 transition-colors">
                  <span className="block text-white font-bold">{city}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </FadeIn>
    </PageShell>
  );
}
