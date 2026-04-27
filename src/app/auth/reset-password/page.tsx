"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/auth/supabase-auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) { setReady(true); return; }
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const { error: ex } = await supabase.auth.exchangeCodeForSession(code);
        if (!ex) setReady(true);
        else setError("Reset link expired or invalid. Please request a new one.");
      } else if (window.location.hash.includes("access_token")) {
        setReady(true);
      } else {
        setError("Reset link expired or invalid. Please request a new one.");
      }
    };
    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setSuccess(true);
      setTimeout(() => router.push("/auth/signin"), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update password");
    } finally { setLoading(false); }
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

      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {success ? (
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="font-bold text-gray-900 mb-2">Password updated!</h2>
            <p className="text-gray-500 text-[13px]">Redirecting to sign in...</p>
          </div>
        ) : error && !ready ? (
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-600 text-[14px] mb-4 font-medium">{error}</p>
            <Link href="/auth/signin" className="px-6 py-2.5 rounded-xl bg-[#006A4E] text-white font-bold text-[13px] hover:bg-[#005a40] transition-all">
              Back to Sign In
            </Link>
          </div>
        ) : !ready ? (
          <p className="text-center text-gray-500 text-[13px]">Verifying reset link...</p>
        ) : (
          <>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Set New Password</h1>
            <p className="text-[13px] text-gray-500 mb-6">Choose a strong password for your account.</p>

            {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "New Password", value: password, set: setPassword, ph: "Min 6 characters" },
                { label: "Confirm Password", value: confirm, set: setConfirm, ph: "Repeat password" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">{f.label}</label>
                  <input type="password" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#006A4E] focus:ring-2 focus:ring-[#006A4E]/10 transition-all placeholder-gray-400" />
                </div>
              ))}
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-[#006A4E] text-white font-bold text-[14px] hover:bg-[#005a40] transition-all disabled:opacity-40">
                {loading ? "Updating..." : "Update Password →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
