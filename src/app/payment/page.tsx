"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { PAYMENT_PLANS, submitPayment, PaymentTier, PaymentMethod } from "@/lib/payment/payment"

export default function PaymentPage() {
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState<PaymentTier>("basic")
  const [method, setMethod] = useState<PaymentMethod>("bkash")
  const [txnId, setTxnId] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [lang, setLang] = useState<"en"|"bn">("en")
  const [step, setStep] = useState<1|2>(1)

  const plan = PAYMENT_PLANS.find(p => p.tier === selectedTier)!
  const payNumber = method === "bkash" ? plan.bkash_number : plan.nagad_number

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!txnId.trim()) { setError("Enter transaction ID"); return }
    if (!phone.trim()) { setError("Enter your phone number"); return }
    setLoading(true)
    try {
      // Get current user
      const { supabase } = await import("@/lib/auth/supabase-auth")
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/auth/signin"); return }

      const result = await submitPayment({
        user_id: user.id,
        tier: selectedTier,
        method,
        transaction_id: txnId,
        phone_number: phone,
        amount: plan.price_bdt,
      })

      if (!result.success) { setError(result.message); return }
      setSuccess(true)
    } catch {
      setError("Submission failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const features = lang === "bn" ? plan.features_bn : plan.features_en

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", padding:"24px", display:"flex", flexDirection:"column", alignItems:"center" }}>

      {/* Lang */}
      <div style={{ alignSelf:"flex-end", display:"flex", gap:"8px", marginBottom:"24px" }}>
        {["en","bn"].map(l => (
          <button key={l} onClick={() => setLang(l as any)}
            style={{ padding:"4px 12px", border:`1px solid ${lang===l?"#C9A84C":"#333"}`, color:lang===l?"#C9A84C":"#555", background:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"11px", letterSpacing:"2px" }}>
            {l==="en"?"EN":"বাং"}
          </button>
        ))}
      </div>

      {/* Logo */}
      <div style={{ fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"24px", letterSpacing:"5px", color:"#C9A84C", marginBottom:"4px" }}>JESAI</div>
      <div style={{ fontSize:"13px", color:"#555", marginBottom:"32px" }}>
        {lang==="en"?"Upgrade Your Access":"আপনার অ্যাক্সেস আপগ্রেড করুন"}
      </div>

      {success ? (
        <div style={{ background:"#091410", border:"1px solid rgba(26,184,158,0.3)", padding:"32px", textAlign:"center", maxWidth:"440px", width:"100%" }}>
          <div style={{ fontSize:"40px", marginBottom:"12px" }}>✅</div>
          <div style={{ color:"#1AB89E", fontWeight:700, fontSize:"18px", letterSpacing:"1px", marginBottom:"8px" }}>
            {lang==="en"?"Payment Submitted!":"পেমেন্ট জমা হয়েছে!"}
          </div>
          <div style={{ fontSize:"13px", color:"#666", lineHeight:1.6 }}>
            {lang==="en"
              ? "Your payment will be verified within 1-2 hours. You will get full access after verification."
              : "আপনার পেমেন্ট ১-২ ঘণ্টার মধ্যে যাচাই করা হবে।"}
          </div>
          <button onClick={() => router.push("/")}
            style={{ marginTop:"20px", padding:"10px 24px", background:"#C9A84C", color:"#000", border:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, letterSpacing:"2px" }}>
            {lang==="en"?"GO TO JESAI →":"যান →"}
          </button>
        </div>
      ) : step === 1 ? (
        // STEP 1: Plan selection
        <div style={{ width:"100%", maxWidth:"680px" }}>
          <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"3px", color:"#444", textAlign:"center", marginBottom:"16px" }}>
            {lang==="en"?"SELECT PLAN":"প্ল্যান বেছে নিন"}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"12px", marginBottom:"24px" }}>
            {PAYMENT_PLANS.map(p => (
              <button key={p.tier} onClick={() => setSelectedTier(p.tier)}
                style={{ background: selectedTier===p.tier?"#100e08":"#111", border:`1px solid ${selectedTier===p.tier?"#C9A84C":"#1a1a1a"}`, borderTop:`3px solid ${selectedTier===p.tier?"#C9A84C":"#333"}`, padding:"20px 16px", textAlign:"left", cursor:"pointer", transition:"all 0.15s" }}>
                <div style={{ fontWeight:700, fontSize:"16px", letterSpacing:"1px", color:selectedTier===p.tier?"#C9A84C":"#888", marginBottom:"4px" }}>
                  {lang==="bn"?p.label_bn:p.label_en}
                </div>
                <div style={{ fontSize:"24px", fontWeight:700, color:selectedTier===p.tier?"#F5F0E8":"#555", marginBottom:"12px" }}>
                  ৳{p.price_bdt}<span style={{ fontSize:"12px", color:"#444" }}>/month</span>
                </div>
                {(lang==="bn"?p.features_bn:p.features_en).map((f,i) => (
                  <div key={i} style={{ fontSize:"12px", color:"#666", marginBottom:"4px" }}>
                    <span style={{ color:selectedTier===p.tier?"#1AB89E":"#333", marginRight:"6px" }}>✓</span>{f}
                  </div>
                ))}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)}
            style={{ width:"100%", padding:"14px", background:"#C9A84C", color:"#000", border:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"15px", letterSpacing:"3px" }}>
            {lang==="en"?`CONTINUE WITH ৳${plan.price_bdt} PLAN →`:`চালিয়ে যান ৳${plan.price_bdt} →`}
          </button>
        </div>
      ) : (
        // STEP 2: Payment
        <form onSubmit={handleSubmit} style={{ width:"100%", maxWidth:"440px", background:"#111", border:"1px solid #1a1a1a", padding:"28px", display:"flex", flexDirection:"column", gap:"16px" }}>

          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <button onClick={() => setStep(1)} style={{ color:"#555", background:"none", border:"none", cursor:"pointer", fontSize:"18px" }}>←</button>
            <div>
              <div style={{ fontWeight:700, fontSize:"16px", color:"#F5F0E8" }}>
                {lang==="en"?"Complete Payment":"পেমেন্ট সম্পন্ন করুন"}
              </div>
              <div style={{ fontSize:"12px", color:"#666" }}>
                {lang==="bn"?plan.label_bn:plan.label_en} — ৳{plan.price_bdt}/month
              </div>
            </div>
          </div>

          {/* Method select */}
          <div>
            <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"2px", color:"#666", marginBottom:"8px" }}>
              {lang==="en"?"PAYMENT METHOD":"পেমেন্ট পদ্ধতি"}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
              {(["bkash","nagad"] as PaymentMethod[]).map(m => (
                <button key={m} type="button" onClick={() => setMethod(m)}
                  style={{ padding:"12px 8px", background:method===m?"#100e08":"#0d0d0d", border:`1px solid ${method===m?"#C9A84C":"#2a2a2a"}`, color:method===m?"#C9A84C":"#666", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"13px", letterSpacing:"1px", textTransform:"uppercase" }}>
                  {m === "bkash" ? "🟣 bKash" : "🟠 Nagad"}
                </button>
              ))}
            </div>
          </div>

          {/* Send to */}
          <div style={{ background:"#0d120f", border:"1px solid rgba(26,184,158,0.2)", padding:"16px" }}>
            <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"2px", color:"#1AB89E", marginBottom:"8px" }}>
              {lang==="en"?"SEND PAYMENT TO":"এই নম্বরে পাঠান"}
            </div>
            <div style={{ fontFamily:"Source Code Pro,monospace", fontSize:"22px", fontWeight:700, color:"#F5F0E8", letterSpacing:"2px" }}>
              {payNumber}
            </div>
            <div style={{ fontSize:"12px", color:"#555", marginTop:"4px" }}>
              {method==="bkash"?"bKash":"Nagad"} — Send Money — Amount: ৳{plan.price_bdt}
            </div>
          </div>

          {error && (
            <div style={{ background:"#130a09", border:"1px solid rgba(192,57,43,0.3)", padding:"10px", fontSize:"13px", color:"#E74C3C" }}>
              {error}
            </div>
          )}

          {/* Transaction ID */}
          <div>
            <label style={{ fontSize:"11px", fontWeight:700, letterSpacing:"2px", color:"#666", display:"block", marginBottom:"6px" }}>
              {lang==="en"?"TRANSACTION ID (TxnID)":"ট্র্যানজেকশন আইডি"}
            </label>
            <input value={txnId} onChange={e => setTxnId(e.target.value)}
              placeholder="e.g. ABC123XYZ" required
              style={{ width:"100%", background:"#0d0d0d", border:"1px solid #2a2a2a", color:"#ddd", padding:"10px 12px", fontSize:"14px", fontFamily:"Rajdhani,sans-serif", outline:"none", letterSpacing:"1px" }}
            />
            <div style={{ fontSize:"10px", color:"#333", marginTop:"4px" }}>
              {lang==="en"?"Copy TxnID from your bKash/Nagad message":"bKash/Nagad মেসেজ থেকে TxnID কপি করুন"}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label style={{ fontSize:"11px", fontWeight:700, letterSpacing:"2px", color:"#666", display:"block", marginBottom:"6px" }}>
              {lang==="en"?"YOUR PHONE NUMBER (used for payment)":"আপনার ফোন নম্বর (পেমেন্টে ব্যবহৃত)"}
            </label>
            <input value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX" required type="tel"
              style={{ width:"100%", background:"#0d0d0d", border:"1px solid #2a2a2a", color:"#ddd", padding:"10px 12px", fontSize:"14px", fontFamily:"Rajdhani,sans-serif", outline:"none" }}
            />
          </div>

          <button type="submit" disabled={loading}
            style={{ padding:"13px", background:loading?"#1a1a1a":"#C9A84C", color:loading?"#333":"#000", border:"none", cursor:loading?"default":"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"15px", letterSpacing:"2px" }}>
            {loading ? "..." : (lang==="en"?"SUBMIT PAYMENT →":"পেমেন্ট জমা দিন →")}
          </button>

          <div style={{ fontSize:"10px", color:"#333", textAlign:"center", lineHeight:1.5 }}>
            {lang==="en"
              ? "Payment verified manually within 1-2 hours. Pay only after delivery confirmed."
              : "পেমেন্ট ১-২ ঘণ্টায় যাচাই হবে। ডেলিভারি নিশ্চিত হলে তবেই পরিশোধ করুন।"}
          </div>
        </form>
      )}
    </div>
  )
}
