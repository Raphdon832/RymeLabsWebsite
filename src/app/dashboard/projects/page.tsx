"use client";

import Link from "next/link";

const demoProjects = [
  {
    name: "Scenscia Omnishop",
    industry: "Luxury retail",
    phase: "Implementation",
    health: "On track",
    owner: "Experience Lab",
    lastUpdate: "Nov 18",
  },
  {
    name: "Pharmasea Vendor Console",
    industry: "Healthcare",
    phase: "Compliance review",
    health: "Attention",
    owner: "AI Systems",
    lastUpdate: "Nov 19",
  },
  {
    name: "Ryme Interiors Studio",
    industry: "Design",
    phase: "Sprint 04",
    health: "On track",
    owner: "Immersive Web",
    lastUpdate: "Nov 17",
  },
  {
    name: "Fivescores Live",
    industry: "Sports",
    phase: "QA",
    health: "Green",
    owner: "Mobile Lab",
    lastUpdate: "Nov 15",
  },
];

const healthClass = (health: string) => {
  switch (health) {
    case "Attention":
      return "text-amber-300 border-amber-300/30";
    case "Green":
    case "On track":
      return "text-emerald-300 border-emerald-300/30";
    default:
      return "text-white/70 border-white/20";
  }
};

export default function DashboardProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-2">Workstream</p>
          <h1 className="text-3xl font-semibold">Projects pipeline</h1>
        </div>
        <Link
          href="/start-project"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-sm"
        >
          New intake
        </Link>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40">
        <div className="grid grid-cols-6 text-xs uppercase tracking-[0.3em] text-white/40 px-6 py-4 border-b border-white/5">
          <span className="col-span-2">Project</span>
          <span>Phase</span>
          <span>Health</span>
          <span>Owner</span>
          <span>Updated</span>
        </div>
        <div>
          {demoProjects.map((project) => (
            <div
              key={project.name}
              className="grid grid-cols-6 items-center px-6 py-5 border-b border-white/5 text-sm text-white/80"
            >
              <div className="col-span-2">
                <p className="font-semibold text-white">{project.name}</p>
                <p className="text-xs text-white/50">{project.industry}</p>
              </div>
              <p>{project.phase}</p>
              <span className={`w-fit px-3 py-1 rounded-full border text-xs ${healthClass(project.health)}`}>
                {project.health}
              </span>
              <p>{project.owner}</p>
              <p className="text-white/60">{project.lastUpdate}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Next iteration</p>
        <h2 className="text-2xl font-semibold mb-3">Automated intake</h2>
        <p className="text-sm text-white/60">
          The next milestone is connecting the public start-project form to this pipeline. Each submission will automatically spin up a project record, notify the core team, and populate this view.
        </p>
      </div>
    </div>
  );
}
