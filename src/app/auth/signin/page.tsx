"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, resetPassword } from "@/lib/auth/supabase-auth";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const redirectTo = searchParams?.get("redirect") || "/";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const { user } = await signIn(email, password);
      const { data: profile } = await import("@/lib/auth/supabase-auth").then(m =>
        m.supabase.from("users").select("role").eq("id", user!.id).single()
      );
      router.push(profile?.role === "admin" ? "/admin" : redirectTo || "/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally { setLoading(false); }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try { await resetPassword(email); setResetSent(true); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Reset failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="h-9 w-9 rounded-xl bg-[#006A4E] flex items-center justify-center text-white font-bold text-lg">J</div>
        <div>
          <span className="font-bold text-gray-900 text-[16px]">Jes<span className="text-[#C8A84B]">AI</span></span>
          <p className="text-[9px] text-gray-400 tracking-wider -mt-0.5">BANGLADESH LEGAL AI</p>
        </div>
      </Link>

      {resetSent ? (
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="font-bold text-gray-900 mb-2">Reset link sent!</h2>
          <p className="text-gray-500 text-[13px] mb-6">Check your email and click the link to reset your password.</p>
          <button onClick={() => { setResetMode(false); setResetSent(false); }}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-[13px] font-medium text-gray-700 hover:border-gray-300 transition-all">
            Back to Sign In
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {resetMode ? "Reset Password" : "Sign In"}
          </h1>
          <p className="text-[13px] text-gray-500 mb-6">
            {resetMode ? "We'll send a reset link to your email." : "Welcome back to JesAI."}
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">{error}</div>
          )}

          <form onSubmit={resetMode ? handleReset : handleSignIn} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#006A4E] focus:ring-2 focus:ring-[#006A4E]/10 transition-all placeholder-gray-400" />
            </div>

            {!resetMode && (
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#006A4E] focus:ring-2 focus:ring-[#006A4E]/10 transition-all placeholder-gray-400" />
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-[#006A4E] text-white font-bold text-[14px] hover:bg-[#005a40] transition-all disabled:opacity-40 shadow-sm">
              {loading ? "..." : resetMode ? "Send Reset Link" : "Sign In →"}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-[12px]">
            <button onClick={() => setResetMode(!resetMode)} className="text-gray-400 hover:text-gray-700 transition-colors">
              {resetMode ? "← Back to Sign In" : "Forgot password?"}
            </button>
            <Link href="/auth/signup" className="text-[#006A4E] font-medium hover:underline">Create account</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SignInPage() {
  return <Suspense fallback={<div className="min-h-screen bg-gray-50" />}><SignInForm /></Suspense>;
}
