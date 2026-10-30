"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3547F5]/15 ring-1 ring-[#3547F5]/30">
            <Lock className="h-6 w-6 text-[#7F8BFF]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin Portal
          </h1>
          <p className="mt-1 text-sm text-[#8B949E]">
            Enter your password to access messages
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#21262D] bg-[#161B22] p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === "error" && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {errorMsg}
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#8B949E]"
              >
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="Enter admin password"
                  className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2.5 pr-10 text-sm text-white placeholder-[#484F58] focus:border-[#3547F5] focus:outline-none focus:ring-1 focus:ring-[#3547F5]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484F58] hover:text-[#8B949E]"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !password}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3547F5] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4C5CFF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#484F58]">
          Portfolio Admin · Private access only
        </p>
      </div>
    </div>
  );
}
