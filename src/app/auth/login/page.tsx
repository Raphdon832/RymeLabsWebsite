"use client";

import { FormEvent, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const { signIn, signUp, signInWithGoogle, loading, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState<"login" | "register">(
    searchParams.get("mode") === "register" ? "register" : "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectPath);
    }
  }, [loading, user, redirectPath, router]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">
          Redirecting to dashboard
        </p>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      router.replace(redirectPath);
    } catch (err) {
      console.error(err);
      setError("Unable to authenticate. Please verify your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.replace(redirectPath);
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-20">
      <div className="w-full max-w-lg border border-white/10 rounded-3xl bg-white/5 p-10 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.5em] text-white/60 mb-4">
          {mode === "login" ? "Welcome back" : "Join RymeLabs"}
        </p>
        <h1 className="text-3xl font-semibold mb-8">
          {mode === "login" ? "Sign in to your account" : "Create a new account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm text-white/60">
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/40"
            />
          </label>

          <label className="block text-sm text-white/60">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-white/40"
            />
          </label>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-2xl px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-black font-semibold rounded-2xl py-3 disabled:opacity-50"
          >
            {submitting ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogle}
            className="w-full border border-white/20 rounded-2xl py-3 text-sm font-semibold hover:border-white/40 transition"
            disabled={submitting}
          >
            Continue with Google
          </button>
        </div>

        <div className="mt-8 text-sm text-white/60 flex flex-col gap-2">
          <button
            className="text-white"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "Need an account? Create one"
              : "Already have an account? Sign in"}
          </button>
          <Link href="/" className="text-white/70 underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
