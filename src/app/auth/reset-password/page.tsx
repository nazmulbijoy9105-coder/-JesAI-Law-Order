"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const [lang, setLang] = useState<"en" | "bn">("en");

  const T = {
    title: lang === "en" ? "Set New Password" : "নতুন পাসওয়ার্ড সেট করুন",
    pass: lang === "en" ? "New Password (min 6 chars)" : "নতুন পাসওয়ার্ড (ন্যূনতম ৬ অক্ষর)",
    confirm: lang === "en" ? "Confirm New Password" : "পাসওয়ার্ড নিশ্চিত করুন",
    btn: lang === "en" ? "Update Password →" : "পাসওয়ার্ড আপডেট করুন →",
    success: lang === "en" ? "Password updated! Taking you to sign in..." : "পাসওয়ার্ড আপডেট হয়েছে! সাইন ইনে নিয়ে যাচ্ছি...",
    expired: lang === "en" ? "This reset link has expired or is invalid. Please request a new one." : "এই রিসেট লিংকটি মেয়াদোত্তীর্ণ বা অবৈধ। নতুন লিংক অনুরোধ করুন।",
    loading: lang === "en" ? "Verifying reset link..." : "রিসেট লিংক যাচাই করছি...",
  };

  useEffect(() => {
    // Handle the auth callback from email link
    const handleAuthCallback = async () => {
      const { data, error: authError } = await supabase.auth.getSession();
      if (authError || !data.session) {
        // Try to exchange the code in the URL for a session
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setError(T.expired);
          } else {
            setReady(true);
          }
        } else {
          // Check hash fragment
          const hash = window.location.hash;
          if (hash && hash.includes("access_token")) {
            setReady(true);
          } else {
            setError(T.expired);
          }
        }
      } else {
        setReady(true);
      }
    };
    handleAuthCallback();
  // eslint-disable-next-line react-hooks/exhaustive-deps

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>

      <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", gap: "8px" }}>
        {["en", "bn"].map(l => (
          <button key={l} onClick={() => setLang(l as "en" | "bn")}
            style={{ padding: "4px 12px", border: `1px solid ${lang === l ? "#C9A84C" : "#333"}`, color: lang === l ? "#C9A84C" : "#555", background: "none", cursor: "pointer", fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "2px" }}>
            {l === "en" ? "EN" : "বাং"}
          </button>
        ))}
      </div>

      <div onClick={() => router.push("/")}
        style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "28px", letterSpacing: "6px", color: "#C9A84C", marginBottom: "8px", cursor: "pointer" }}>
        JESAI
      </div>
      <div style={{ fontFamily: "Crimson Pro,serif", fontStyle: "italic", fontSize: "14px", color: "#555", marginBottom: "32px" }}>
        Bangladesh Legal Literacy AI
      </div>

      {success ? (
        <div style={{ background: "#091410", border: "1px solid rgba(26,184,158,0.3)", padding: "24px 32px", textAlign: "center", maxWidth: "400px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>✅</div>
          <div style={{ color: "#1AB89E", fontWeight: 700, fontSize: "16px" }}>{T.success}</div>
        </div>
      ) : !ready && !error ? (
        <div style={{ color: "#555", fontSize: "14px" }}>{T.loading}</div>
      ) : error && !ready ? (
        <div style={{ background: "#130a09", border: "1px solid rgba(192,57,43,0.3)", padding: "24px 32px", textAlign: "center", maxWidth: "400px" }}>
          <div style={{ color: "#E74C3C", fontSize: "14px", marginBottom: "16px" }}>{error}</div>
          <button onClick={() => router.push("/auth/signin")}
            style={{ padding: "10px 24px", background: "#C9A84C", color: "#000", border: "none", cursor: "pointer", fontFamily: "Rajdhani,sans-serif", fontWeight: 700, letterSpacing: "2px" }}>
            BACK TO SIGN IN
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}
          style={{ background: "#111", border: "1px solid #1a1a1a", padding: "32px", width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "16px" }}>

          <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "2px", color: "#F5F0E8" }}>{T.title}</div>

          {error && (
            <div style={{ background: "#130a09", border: "1px solid rgba(192,57,43,0.3)", padding: "10px 12px", fontSize: "13px", color: "#E74C3C" }}>
              {error}
            </div>
          )}

          {[
            { label: T.pass, value: password, set: setPassword, placeholder: "Min 6 characters" },
            { label: T.confirm, value: confirm, set: setConfirm, placeholder: "Repeat password" },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#666", display: "block", marginBottom: "6px" }}>
                {f.label.toUpperCase()}
              </label>
              <input
                type="password"
                value={f.value}
                onChange={e => f.set(e.target.value)}
                placeholder={f.placeholder}
                required
                style={{ width: "100%", background: "#0d0d0d", border: "1px solid #2a2a2a", color: "#ddd", padding: "10px 12px", fontSize: "14px", fontFamily: "Rajdhani,sans-serif", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          ))}

          <button type="submit" disabled={loading}
            style={{ padding: "12px", background: loading ? "#1a1a1a" : "#C9A84C", color: loading ? "#333" : "#000", border: "none", cursor: loading ? "default" : "pointer", fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "2px" }}>
            {loading ? "..." : T.btn}
          </button>
        </form>
      )}
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
