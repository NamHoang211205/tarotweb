"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Mode = "login" | "signup";

export default function AuthPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signup") {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setError(body.error || "Could not create your account");
          setSubmitting(false);
          return;
        }
      }

      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Invalid email or password");
        setSubmitting(false);
        return;
      }

      router.push("/reading");
      router.refresh();
    } catch {
      setError("Something went wrong, please try again");
      setSubmitting(false);
    }
  }

  return (
    <div className="relative w-full max-w-sm rounded-2xl border border-accent-soft/25 bg-background-alt/50 backdrop-blur-md p-7 sm:p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex justify-center gap-1 mb-7 p-1 rounded-full bg-background/50 border border-border-soft">
        <button
          type="button"
          onClick={() => switchMode("login")}
          className={`flex-1 rounded-full py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            mode === "login"
              ? "bg-linear-to-b from-accent to-accent-dim text-background font-semibold"
              : "text-foreground/50 hover:text-foreground/80"
          }`}
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`flex-1 rounded-full py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            mode === "signup"
              ? "bg-linear-to-b from-accent to-accent-dim text-background font-semibold"
              : "text-foreground/50 hover:text-foreground/80"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-faint mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg bg-background/60 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-faint/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-faint mb-2">
            Password
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg bg-background/60 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-faint/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
          />
        </div>
        {mode === "signup" && (
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-faint mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg bg-background/60 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-faint/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
            />
          </div>
        )}

        {error && <p className="text-xs text-red-400 text-center">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-linear-to-b from-accent to-accent-dim text-background font-semibold py-3 text-sm tracking-wide shadow-[0_10px_30px_-8px_rgba(201,162,75,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(201,162,75,0.65)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {submitting
            ? "Please wait..."
            : mode === "login"
            ? "✦ Enter the Circle"
            : "✦ Begin Your Journey"}
        </button>
      </form>

      <button
        onClick={() => router.push("/reading")}
        className="w-full text-center mt-5 font-mono text-[11px] uppercase tracking-wider text-accent-soft/70 hover:text-accent-soft transition-colors"
      >
        Continue as guest →
      </button>
    </div>
  );
}
