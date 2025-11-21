"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import MagneticButton from "@/components/MagneticButton";

export default function DashboardPage() {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login?redirect=/dashboard");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-sm tracking-[0.4em] text-white/60 uppercase">
          Preparing your dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.5em] text-blue-300/80 mb-4">
            Dashboard Overview
          </p>
          <h1 className="text-4xl font-bold mb-3">Welcome back, {user.email}</h1>
          <p className="text-zinc-400 max-w-2xl">
            This space will host your project briefs, milestones, assets, and conversations. We&apos;re currently wiring up the rest of the dashboard according to the execution plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-white/40 mb-2">
              Next step
            </p>
            <h2 className="text-2xl font-semibold mb-3">Start a project brief</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Head over to the start-project page to submit a new initiative. It will soon appear here for tracking.
            </p>
            <Link href="/start-project" className="text-white underline">
              Go to start-project ↗
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-white/40 mb-2">
              Account
            </p>
            <h2 className="text-2xl font-semibold mb-3">Signed in as {user.email}</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Need to switch accounts? Sign out and re-authenticate with a different email or Google account.
            </p>
            <MagneticButton
              onClick={async () => {
                await signOutUser();
                router.replace("/auth/login");
              }}
              className="border border-white/20 text-white bg-transparent px-6 py-2 rounded-full"
            >
              Sign out
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
