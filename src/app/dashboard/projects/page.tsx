"use client";

import { useState } from "react";
import Link from "next/link";
import { useProjectIntakes } from "@/hooks/useProjectIntakes";

type ProjectRow = {
  id: string;
  name: string;
  industry: string;
  phase: string;
  status: string;
  owner: string;
  lastUpdate: string;
  isIntake?: boolean;
};

const demoProjects: ProjectRow[] = [
  {
    id: "demo-scenscia",
    name: "Scenscia Omnishop",
    industry: "Luxury retail",
    phase: "Implementation",
    status: "On track",
    owner: "Experience Lab",
    lastUpdate: "Nov 18",
  },
  {
    id: "demo-pharmasea",
    name: "Pharmasea Vendor Console",
    industry: "Healthcare",
    phase: "Compliance review",
    status: "Attention",
    owner: "AI Systems",
    lastUpdate: "Nov 19",
  },
  {
    id: "demo-ryme-interiors",
    name: "Ryme Interiors Studio",
    industry: "Design",
    phase: "Sprint 04",
    status: "On track",
    owner: "Immersive Web",
    lastUpdate: "Nov 17",
  },
  {
    id: "demo-fivescores",
    name: "Fivescores Live",
    industry: "Sports",
    phase: "QA",
    status: "Green",
    owner: "Mobile Lab",
    lastUpdate: "Nov 15",
  },
];

const statusClass = (status: string) => {
  switch (status) {
    case "Attention":
      return "text-amber-300 border-amber-300/30";
    case "Green":
    case "On track":
      return "text-emerald-300 border-emerald-300/30";
    case "New intake":
      return "text-sky-300 border-sky-300/40";
    case "In review":
      return "text-blue-200 border-blue-200/40";
    case "Proposal sent":
      return "text-violet-200 border-violet-200/40";
    case "In production":
      return "text-cyan-200 border-cyan-200/40";
    case "Go-live":
      return "text-white border-white/40";
    default:
      return "text-white/70 border-white/20";
  }
};

const stagePresets = [
  { label: "Intake triage", stage: "Intake", status: "New intake" },
  { label: "Discovery", stage: "Discovery", status: "In review" },
  { label: "Proposal", stage: "Proposal", status: "Proposal sent" },
  { label: "In production", stage: "In production", status: "In production" },
  { label: "Launch prep", stage: "Launch prep", status: "Go-live" },
];

export default function DashboardProjectsPage() {
  const {
    intakes,
    loading,
    updatingId,
    updateProject,
    deleteProject,
    deletingId,
    error,
  } = useProjectIntakes();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const intakeRows: ProjectRow[] = intakes.map((intake) => ({
    id: intake.id,
    name: intake.name || "New inquiry",
    industry: `${intake.serviceType} · ${intake.budget}`,
    phase: intake.stage || "Intake",
    status: intake.status || "New intake",
    owner: "Intake desk",
    lastUpdate: new Intl.DateTimeFormat("en", {
      month: "short",
      day: "2-digit",
    }).format(new Date(intake.updatedAt ?? intake.createdAt)),
    isIntake: true,
  }));

  const projects = [...intakeRows, ...demoProjects];

  const handleStageChange = async (project: ProjectRow, nextStage: string) => {
    if (!project.isIntake) return;
    const preset = stagePresets.find((item) => item.stage === nextStage);
    if (!preset) return;

    try {
      await updateProject(project.id, {
        stage: preset.stage,
        status: preset.status,
      });
      setFeedback({ type: "success", message: `${project.name} moved to ${preset.label}` });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to update";
      setFeedback({ type: "error", message });
    }
  };

  const handleDelete = async (project: ProjectRow) => {
    if (!project.isIntake) return;
    const confirmed = window.confirm(`Remove ${project.name} from the intake pipeline?`);
    if (!confirmed) return;

    try {
      await deleteProject(project.id);
      setFeedback({ type: "success", message: `${project.name} removed from intake` });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to delete";
      setFeedback({ type: "error", message });
    }
  };

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
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] text-xs uppercase tracking-[0.3em] text-white/40 px-6 py-4 border-b border-white/5">
          <span>Project</span>
          <span>Phase</span>
          <span>Status</span>
          <span>Owner</span>
          <span>Updated</span>
          <span className="text-right">Actions</span>
        </div>
        <div>
          {projects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] items-center px-6 py-5 border-b border-white/5 text-sm text-white/80"
            >
              <div>
                <p className="font-semibold text-white flex items-center gap-2">
                  {project.name}
                  {project.isIntake && (
                    <span className="text-[10px] uppercase tracking-[0.4em] text-sky-300">
                      Intake
                    </span>
                  )}
                </p>
                <p className="text-xs text-white/50">{project.industry}</p>
              </div>
              {project.isIntake ? (
                <select
                  className="bg-transparent border border-white/20 rounded-full px-3 py-1 text-xs focus:outline-none"
                  value={project.phase}
                  onChange={(event) => handleStageChange(project, event.target.value)}
                  disabled={updatingId === project.id}
                >
                  {stagePresets.map((preset) => (
                    <option key={preset.stage} value={preset.stage} className="bg-black text-white">
                      {preset.label}
                    </option>
                  ))}
                </select>
              ) : (
                <p>{project.phase}</p>
              )}
              <span className={`w-fit px-3 py-1 rounded-full border text-xs ${statusClass(project.status)}`}>
                {project.status}
              </span>
              <p>{project.owner}</p>
              <p className="text-white/60">{project.lastUpdate}</p>
              <div className="flex justify-end">
                {project.isIntake ? (
                  <button
                    onClick={() => handleDelete(project)}
                    disabled={deletingId === project.id}
                    className="text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white disabled:opacity-40"
                  >
                    {deletingId === project.id ? "Removing" : "Remove"}
                  </button>
                ) : (
                  <span className="text-xs text-white/30">—</span>
                )}
              </div>
            </div>
          ))}
          {projects.length === 0 && !loading && (
            <p className="px-6 py-8 text-sm text-white/60">No projects yet. New submissions will populate this table.</p>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Next iteration</p>
        <h2 className="text-2xl font-semibold mb-3">Automated intake</h2>
        <p className="text-sm text-white/60">
          The public start-project form now feeds directly into this table. Each submission instantly
          generates an intake record, giving the core team visibility before the formal kickoff.
        </p>
        {(feedback || error) && (
          <p className={`text-xs mt-4 ${feedback?.type === "error" || error ? "text-rose-300" : "text-emerald-300"}`}>
            {feedback?.message || error}
          </p>
        )}
      </div>
    </div>
  );
}
