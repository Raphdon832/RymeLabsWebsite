"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { label: "Overview", href: "/dashboard", badge: "Insights" },
  { label: "Projects", href: "/dashboard/projects", badge: "Pipeline" },
  { label: "Messages", href: "#", badge: "Soon", disabled: true },
  { label: "Analytics", href: "#", badge: "Soon", disabled: true },
];

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">
          Preparing dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#050505] to-[#101010] text-white flex">
      <aside className="hidden lg:flex lg:flex-col w-72 border-r border-white/10 px-6 py-10 gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-2">RymeLabs</p>
          <h1 className="text-2xl font-semibold">Delivery Console</h1>
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const baseClasses = "flex items-center justify-between px-4 py-3 rounded-2xl border text-sm transition";

            if (item.disabled) {
              return (
                <div
                  key={item.label}
                  className={`${baseClasses} border-white/5 bg-transparent text-white/30 cursor-not-allowed`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.4em]">{item.badge}</span>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`${baseClasses} ${
                  isActive
                    ? "border-white/40 bg-white/10 text-white"
                    : "border-white/5 bg-transparent text-white/70 hover:text-white hover:border-white/30"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">{item.badge}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border border-white/5 rounded-3xl p-4 bg-white/5">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Account</p>
          <p className="text-sm font-semibold mb-1">{user.email}</p>
          <p className="text-xs text-white/50 mb-4">Core Team Access</p>
          <button
            onClick={async () => {
              await signOutUser();
              router.replace("/auth/login");
            }}
            className="w-full text-sm px-4 py-2 rounded-2xl border border-white/20 text-white/80 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="w-full border-b border-white/5 px-6 lg:px-10 py-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-blue-300/70 mb-1">Command Center</p>
            <h2 className="text-2xl font-semibold">Projects, clients, and labs in one place</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/start-project"
              className="px-5 py-2 rounded-full border border-white/20 text-sm font-semibold text-white/80 hover:text-white"
            >
              Start project
            </Link>
            <Link
              href="/dashboard/projects"
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold"
            >
              View pipeline
            </Link>
          </div>
        </header>
        <main className="flex-1 px-6 lg:px-10 py-8 space-y-10 bg-gradient-to-b from-transparent to-white/[0.02]">
          {children}
        </main>
      </div>
    </div>
  );
}
