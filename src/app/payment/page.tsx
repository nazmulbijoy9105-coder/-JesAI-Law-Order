"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { PAYMENT_PLANS, submitPayment, PaymentTier, PaymentMethod } from "@/lib/payment/payment";
import { supabase } from "@/lib/auth/supabase-auth";
import Link from "next/link";

const FEATURES: Record<PaymentTier, { label: string; highlight?: boolean }[]> = {
  basic: [
    { label: "50 queries per day" },
    { label: "All 9 law modules" },
    { label: "Both English & Bengali" },
    { label: "NLC-verified answers" },
    { label: "Email support" },
  ],
  pro: [
    { label: "Unlimited queries", highlight: true },
    { label: "All 9 law modules" },
    { label: "Full ILRMF analysis", highlight: true },
    { label: "Priority support" },
    { label: "WhatsApp access", highlight: true },
  ],
  professional: [
    { label: "Unlimited queries", highlight: true },
    { label: "Direct advocate consultation", highlight: true },
    { label: "Case strategy review", highlight: true },
    { label: "Document drafting", highlight: true },
    { label: "WhatsApp + Phone access", highlight: true },
  ],
};

export default function PaymentPage() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<PaymentTier>("pro");
  const [method, setMethod] = useState<PaymentMethod>("bkash");
  const [txnId, setTxnId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const plan = PAYMENT_PLANS.find(p => p.tier === selectedTier)!;
  const payNumber = method === "bkash" ? plan.bkash_number : plan.nagad_number;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!txnId.trim()) { setError("Enter transaction ID"); return; }
    if (!phone.trim()) { setError("Enter your phone number"); return; }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/signin?redirect=/payment"); return; }
      const result = await submitPayment({ user_id: user.id, tier: selectedTier, method, transaction_id: txnId, phone_number: phone, amount: plan.price_bdt });
      if (!result.success) { setError(result.message); return; }
      setSuccess(true);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tierConfig = {
    basic:        { label: "Basic",        badge: "",           accent: "border-gray-200",      btn: "border-gray-200 text-gray-700 hover:border-gray-300" },
    pro:          { label: "Pro",          badge: "Popular",    accent: "border-[#006A4E]",     btn: "bg-[#006A4E] text-white hover:bg-[#005a40]"          },
    professional: { label: "Professional", badge: "Best Value", accent: "border-[#C8A84B]",     btn: "bg-[#C8A84B] text-white hover:bg-[#b8943b]"          },
  };

  if (success) return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center p-10 rounded-2xl border border-green-200 bg-green-50">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Submitted!</h2>
          <p className="text-gray-500 text-[14px] mb-6 leading-relaxed">
            Your payment will be verified within 1–2 hours. You will receive full access after verification.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#006A4E] text-white font-semibold hover:bg-[#005a40] transition-all">
            Go to JesAI →
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold text-[#006A4E] uppercase tracking-widest mb-3">Upgrade</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Unlock Full Legal Analysis</h1>
            <p className="text-gray-500 text-[14px] max-w-lg mx-auto">
              Free gives you 20 queries. Upgrade for unlimited access, full ILRMF pipeline, and direct NLC advocate support.
            </p>
          </div>

          {step === 1 ? (
            <>
              {/* Plans */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {PAYMENT_PLANS.map(p => {
                  const cfg = tierConfig[p.tier];
                  const selected = selectedTier === p.tier;
                  return (
                    <button key={p.tier} onClick={() => setSelectedTier(p.tier)}
                      className={`relative text-left rounded-2xl border-2 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md ${selected ? cfg.accent + " shadow-md" : "border-gray-200"}`}>
                      {cfg.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#006A4E] text-white text-[10px] font-bold whitespace-nowrap">
                          {cfg.badge}
                        </div>
                      )}
                      <div className="text-[13px] font-bold text-gray-500 mb-1">{cfg.label}</div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">৳{p.price_bdt.toLocaleString()}</div>
                      <div className="text-[11px] text-gray-400 mb-4">/month</div>
                      <div className="space-y-2">
                        {FEATURES[p.tier].map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className={`text-[11px] ${f.highlight ? "text-[#006A4E]" : "text-gray-400"}`}>
                              {f.highlight ? "✦" : "✓"}
                            </span>
                            <span className={`text-[12px] ${f.highlight ? "font-semibold text-gray-900" : "text-gray-500"}`}>{f.label}</span>
                          </div>
                        ))}
                      </div>
                      {selected && <div className="mt-4 text-[11px] font-bold text-[#006A4E]">✓ Selected</div>}
                    </button>
                  );
                })}
              </div>

              <div className="text-center">
                <button onClick={() => setStep(2)}
                  className="px-10 py-3.5 rounded-xl bg-[#006A4E] text-white font-bold text-[15px] hover:bg-[#005a40] transition-all shadow-sm hover:shadow-md">
                  Continue with {tierConfig[selectedTier].label} — ৳{plan.price_bdt.toLocaleString()} →
                </button>
                <p className="mt-3 text-[11px] text-gray-400">Pay via bKash or Nagad · Verified within 1–2 hours</p>
              </div>
            </>
          ) : (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-700 text-lg">←</button>
                  <div>
                    <h2 className="font-bold text-gray-900">Complete Payment</h2>
                    <p className="text-[12px] text-gray-500">{tierConfig[selectedTier].label} — ৳{plan.price_bdt.toLocaleString()}/month</p>
                  </div>
                </div>

                {/* Method */}
                <div className="mb-5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["bkash", "nagad"] as PaymentMethod[]).map(m => (
                      <button key={m} type="button" onClick={() => setMethod(m)}
                        className={`py-3 rounded-xl border-2 font-semibold text-[13px] transition-all ${method === m ? "border-[#006A4E] bg-[#006A4E]/5 text-[#006A4E]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                        {m === "bkash" ? "🟣 bKash" : "🟠 Nagad"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Send to */}
                <div className="mb-5 p-4 rounded-xl bg-[#006A4E]/5 border border-[#006A4E]/15">
                  <p className="text-[10px] font-bold text-[#006A4E] uppercase tracking-wider mb-1">Send ৳{plan.price_bdt.toLocaleString()} to</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-widest">{payNumber}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{method === "bkash" ? "bKash" : "Nagad"} — Send Money</p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">{error}</div>
                )}

                {[
                  { label: "Transaction ID", value: txnId, set: setTxnId, ph: "e.g. ABC123XYZ", type: "text" },
                  { label: "Your Phone Number", value: phone, set: setPhone, ph: "01XXXXXXXXX", type: "tel" },
                ].map(f => (
                  <div key={f.label} className="mb-4">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">{f.label}</label>
                    <input
                      type={f.type} value={f.value} onChange={e => f.set(e.target.value)}
                      placeholder={f.ph} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13px] text-gray-900 focus:outline-none focus:border-[#006A4E] focus:ring-2 focus:ring-[#006A4E]/10 transition-all placeholder-gray-400"
                    />
                  </div>
                ))}

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#006A4E] text-white font-bold text-[14px] hover:bg-[#005a40] transition-all disabled:opacity-40 shadow-sm">
                  {loading ? "Submitting..." : "Submit Payment →"}
                </button>
                <p className="mt-3 text-[11px] text-gray-400 text-center">
                  Verified by NLC within 1–2 hours of submission.
                </p>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
