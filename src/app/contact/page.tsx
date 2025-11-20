import PageShell from "@/components/PageShell";
import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";

const contactDetails = [
  { label: "Email", value: "hello@rymelabs.com" },
  { label: "Phone", value: "+1 (555) 123-4567" },
  { label: "Office", value: "123 Innovation Dr, Tech City" },
];

export default function ContactPage() {
  return (
    <PageShell containerClassName="max-w-3xl">
      <FadeIn inView={false}>
        <div className="mb-12 space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">Contact</p>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
            Let’s build together
          </h1>
          <p className="text-xl text-zinc-400">
            Tell us about your vision and we’ll design the path forward.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15} inView={false}>
        <form className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Name</label>
              <input
                type="text"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Email</label>
              <input
                type="email"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Subject</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50 transition-colors appearance-none">
              <option>General Inquiry</option>
              <option>Project Proposal</option>
              <option>Partnership</option>
              <option>Careers</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Message</label>
            <textarea
              rows={6}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Tell us about your project..."
            ></textarea>
          </div>

          <div className="pt-4">
            <MagneticButton className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-colors">
              Send Message
            </MagneticButton>
          </div>
        </form>
      </FadeIn>

      <FadeIn delay={0.3} inView={false}>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-zinc-400 text-sm">
          {contactDetails.map((detail) => (
            <div key={detail.label}>
              <h3 className="text-white font-bold mb-2">{detail.label}</h3>
              <p>{detail.value}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </PageShell>
  );
}
