"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

type AnalyticsPayload = {
  totals: {
    totalIntakes: number;
    activeStages: number;
  };
  stageBreakdown: { label: string; value: number }[];
  weeklyTrend: { date: string; submissions: number }[];
};

export default function DashboardAnalyticsPage() {
  const [data, setData] = useState<AnalyticsPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/analytics", { cache: "no-store" });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.error || "Unable to load analytics");
        }
        setData(payload as AnalyticsPayload);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const stageChart = useMemo(() => {
    if (!data) return null;
    return {
      labels: data.stageBreakdown.map((item) => item.label),
      datasets: [
        {
          label: "Projects",
          data: data.stageBreakdown.map((item) => item.value),
          backgroundColor: "rgba(255,255,255,0.6)",
          borderRadius: 12,
        },
      ],
    };
  }, [data]);

  const trendChart = useMemo(() => {
    if (!data) return null;
    return {
      labels: data.weeklyTrend.map((item) => item.date.slice(5)),
      datasets: [
        {
          label: "Intakes",
          data: data.weeklyTrend.map((item) => item.submissions),
          fill: false,
          borderColor: "#ffffff",
          backgroundColor: "#ffffff",
          tension: 0.4,
        },
      ],
    };
  }, [data]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-2">Analytics</p>
        <h1 className="text-3xl font-semibold">Pipeline telemetry</h1>
        <p className="text-sm text-white/60">Live metrics sourced from Firestore intake data.</p>
      </div>

      {loading && <p className="text-sm text-white/60">Loading dashboards...</p>}
      {error && <p className="text-sm text-rose-300">{error}</p>}

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Intakes</p>
              <p className="text-4xl font-semibold">{data.totals.totalIntakes}</p>
              <p className="text-sm text-white/60">Total project briefs received</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Active stages</p>
              <p className="text-4xl font-semibold">{data.totals.activeStages}</p>
              <p className="text-sm text-white/60">Distinct pipeline phases</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Weekly avg</p>
              <p className="text-4xl font-semibold">
                {Math.round(
                  data.weeklyTrend.reduce((sum, point) => sum + point.submissions, 0) /
                    Math.max(1, data.weeklyTrend.length)
                )}
              </p>
              <p className="text-sm text-white/60">Briefs per day (last 7)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Stage distribution</h2>
                <span className="text-xs text-white/50">Live</span>
              </div>
              {stageChart ? (
                <Bar
                  data={stageChart}
                  options={{
                    responsive: true,
                    scales: {
                      x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#a1a1aa" } },
                      y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#a1a1aa" } },
                    },
                    plugins: {
                      legend: { labels: { color: "#fafafa" } },
                    },
                  }}
                />
              ) : (
                <p className="text-sm text-white/60">No stage data available.</p>
              )}
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Weekly trend</h2>
                <span className="text-xs text-white/50">7-day window</span>
              </div>
              {trendChart ? (
                <Line
                  data={trendChart}
                  options={{
                    responsive: true,
                    scales: {
                      x: { grid: { display: false }, ticks: { color: "#a1a1aa" } },
                      y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#a1a1aa" } },
                    },
                    plugins: {
                      legend: { labels: { color: "#fafafa" } },
                      tooltip: { enabled: true },
                    },
                  }}
                />
              ) : (
                <p className="text-sm text-white/60">No trend data available.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
