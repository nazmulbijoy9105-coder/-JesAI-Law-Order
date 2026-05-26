"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth/supabase-auth";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try { await signUp(email, password, phone); setSuccess(true); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Sign up failed"); }
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

      {success ? (
        <div className="w-full max-w-sm bg-white rounded-2xl border border-green-200 p-8 text-center shadow-sm">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="font-bold text-gray-900 mb-2">Account created!</h2>
          <p className="text-gray-500 text-[13px] mb-6">Check your email to confirm your account, then sign in.</p>
          <button onClick={() => router.push("/auth/signin")}
            className="px-6 py-2.5 rounded-xl bg-[#006A4E] text-white font-bold text-[13px] hover:bg-[#005a40] transition-all">
            Sign In →
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Create Account</h1>
          <p className="text-[13px] text-gray-500 mb-6">Start with 20 free legal questions — no credit card needed.</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">{error}</div>
          )}

          <form onSubmit={handle} className="space-y-4">
            {[
              { label: "Email", value: email, set: setEmail, type: "email", ph: "you@example.com", required: true },
              { label: "Phone (optional)", value: phone, set: setPhone, type: "tel", ph: "01XXXXXXXXX", required: false },
              { label: "Password (min 6 chars)", value: password, set: setPassword, type: "password", ph: "••••••••", required: true },
              { label: "Confirm Password", value: confirm, set: setConfirm, type: "password", ph: "Repeat password", required: true },
            ].map(f => (
              <div key={f.label}>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">{f.label}</label>
                <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph} required={f.required}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#006A4E] focus:ring-2 focus:ring-[#006A4E]/10 transition-all placeholder-gray-400" />
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-[#006A4E] text-white font-bold text-[14px] hover:bg-[#005a40] transition-all disabled:opacity-40 shadow-sm">
              {loading ? "Creating..." : "Create Account →"}
            </button>
          </form>

          <p className="mt-4 text-center text-[12px] text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-[#006A4E] font-medium hover:underline">Sign In</Link>
          </p>
          <p className="mt-3 text-[10px] text-gray-400 text-center leading-relaxed">
            By signing up you agree to use JesAI for legal information only — not legal advice.
          </p>
        </div>
      )}
    </div>
  );
}
