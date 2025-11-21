"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const highlightCards = [
  {
    label: "Active initiatives",
    value: "06",
    detail: "Across health, fintech, and lifestyle",
  },
  {
    label: "Avg. sprint velocity",
    value: "92%",
    detail: "Commitment delivered last cycle",
  },
  {
    label: "Upcoming launches",
    value: "03",
    detail: "Scheduled over the next 30 days",
  },
];

const pipeline = [
  {
    client: "Scenscia",
    scope: "Immersive commerce platform",
    stage: "In development",
    eta: "Dec 14",
  },
  {
    client: "Pharmasea",
    scope: "AI vendor console",
    stage: "QA + compliance",
    eta: "Jan 08",
  },
  {
    client: "Ryme Interiors",
    scope: "Spatial configurator",
    stage: "Design + engineering",
    eta: "Jan 22",
  },
];

const timeline = [
  { title: "Weekly alignment", description: "Core team ritual · 9:00 AM WAT" },
  { title: "Client demos", description: "WhitePaper + Pharmasea showcase" },
  { title: "Release window", description: "Push Fivescores v2.4 by Friday" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-2">
            Dashboard overview
          </p>
          <h1 className="text-3xl lg:text-4xl font-semibold">
            Welcome back{user?.email ? `, ${user.email}` : ""}. Here&apos;s the pulse for today.
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlightCards.map((card) => (
            <div
              key={card.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">
                {card.label}
              </p>
              <p className="text-4xl font-bold mb-2">{card.value}</p>
              <p className="text-sm text-white/60">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Pipeline</p>
              <h2 className="text-2xl font-semibold">Live streams</h2>
            </div>
            <Link href="/dashboard/projects" className="text-sm text-white/70 underline">
              See all
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {pipeline.map((item) => (
              <div key={item.client} className="py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{item.client}</p>
                  <p className="text-sm text-white/60">{item.scope}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full border border-white/10 text-xs uppercase tracking-wide text-white/70">
                    {item.stage}
                  </span>
                  <span className="text-sm text-white/60">ETA {item.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Today</p>
          <h2 className="text-2xl font-semibold mb-4">Touchpoints</h2>
          <div className="space-y-4">
            {timeline.map((event) => (
              <div key={event.title} className="p-4 rounded-2xl bg-black/30 border border-white/5">
                <p className="text-sm font-semibold">{event.title}</p>
                <p className="text-xs text-white/60">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
