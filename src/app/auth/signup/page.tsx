"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/auth/supabase-auth"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [lang, setLang] = useState<"en"|"bn">("en")

  const T = {
    title:    lang === "en" ? "Create Account" : "অ্যাকাউন্ট তৈরি করুন",
    sub:      lang === "en" ? "Start with 5 free legal questions" : "৫টি বিনামূল্যে প্রশ্ন দিয়ে শুরু করুন",
    email:    lang === "en" ? "Email Address" : "ইমেইল ঠিকানা",
    phone:    lang === "en" ? "Phone (optional)" : "ফোন নম্বর (ঐচ্ছিক)",
    pass:     lang === "en" ? "Password (min 6 chars)" : "পাসওয়ার্ড (ন্যূনতম ৬ অক্ষর)",
    confirm:  lang === "en" ? "Confirm Password" : "পাসওয়ার্ড নিশ্চিত করুন",
    btn:      lang === "en" ? "Create Account →" : "অ্যাকাউন্ট তৈরি করুন →",
    login:    lang === "en" ? "Already have account? Sign In" : "ইতিমধ্যে অ্যাকাউন্ট আছে? সাইন ইন করুন",
    success:  lang === "en" ? "Account created! Check your email to confirm." : "অ্যাকাউন্ট তৈরি হয়েছে! ইমেইল চেক করুন।",
  }

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password !== confirm) { setError("Passwords do not match"); return }
    if (password.length < 6) { setError("Password too short"); return }
    setLoading(true)
    try {
      await signUp(email, password, phone)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px" }}>

      {/* Lang toggle */}
      <div style={{ position:"absolute", top:"16px", right:"16px", display:"flex", gap:"8px" }}>
        {["en","bn"].map(l => (
          <button key={l} onClick={() => setLang(l as any)}
            style={{ padding:"4px 12px", border:`1px solid ${lang===l?"#C9A84C":"#333"}`, color:lang===l?"#C9A84C":"#555", background:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"11px", letterSpacing:"2px" }}>
            {l === "en" ? "EN" : "বাং"}
          </button>
        ))}
      </div>

      {/* Logo */}
      <div onClick={() => router.push("/")}
        style={{ fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"28px", letterSpacing:"6px", color:"#C9A84C", marginBottom:"8px", cursor:"pointer" }}>
        JESAI
      </div>
      <div style={{ fontFamily:"Crimson Pro,serif", fontStyle:"italic", fontSize:"14px", color:"#555", marginBottom:"32px" }}>
        Bangladesh Legal Literacy AI
      </div>

      {success ? (
        <div style={{ background:"#091410", border:"1px solid rgba(26,184,158,0.3)", padding:"24px 32px", textAlign:"center", maxWidth:"400px" }}>
          <div style={{ fontSize:"32px", marginBottom:"12px" }}>✅</div>
          <div style={{ color:"#1AB89E", fontWeight:700, fontSize:"16px", letterSpacing:"1px" }}>{T.success}</div>
          <button onClick={() => router.push("/auth/signin")}
            style={{ marginTop:"16px", padding:"10px 24px", background:"#C9A84C", color:"#000", border:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, letterSpacing:"2px" }}>
            SIGN IN →
          </button>
        </div>
      ) : (
        <form onSubmit={handle}
          style={{ background:"#111", border:"1px solid #1a1a1a", padding:"32px", width:"100%", maxWidth:"400px", display:"flex", flexDirection:"column", gap:"16px" }}>

          <div>
            <div style={{ fontSize:"22px", fontWeight:700, letterSpacing:"2px", color:"#F5F0E8", marginBottom:"4px" }}>{T.title}</div>
            <div style={{ fontSize:"13px", color:"#555" }}>{T.sub}</div>
          </div>

          {error && (
            <div style={{ background:"#130a09", border:"1px solid rgba(192,57,43,0.3)", padding:"10px 12px", fontSize:"13px", color:"#E74C3C" }}>
              {error}
            </div>
          )}

          {[
            { label: T.email,   value: email,    set: setEmail,   type:"email",    placeholder:"you@example.com" },
            { label: T.phone,   value: phone,    set: setPhone,   type:"tel",      placeholder:"01XXXXXXXXX" },
            { label: T.pass,    value: password, set: setPassword,type:"password", placeholder:"Min 6 characters" },
            { label: T.confirm, value: confirm,  set: setConfirm, type:"password", placeholder:"Repeat password" },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize:"11px", fontWeight:700, letterSpacing:"2px", color:"#666", display:"block", marginBottom:"6px" }}>
                {f.label.toUpperCase()}
              </label>
              <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)}
                placeholder={f.placeholder} required={f.label !== T.phone}
                style={{ width:"100%", background:"#0d0d0d", border:"1px solid #2a2a2a", color:"#ddd", padding:"10px 12px", fontSize:"14px", fontFamily:"Rajdhani,sans-serif", outline:"none" }}
              />
            </div>
          ))}

          <button type="submit" disabled={loading}
            style={{ padding:"12px", background:loading?"#1a1a1a":"#C9A84C", color:loading?"#333":"#000", border:"none", cursor:loading?"default":"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"15px", letterSpacing:"2px", transition:"all 0.15s" }}>
            {loading ? "..." : T.btn}
          </button>

          <div style={{ textAlign:"center", fontSize:"12px", color:"#444" }}>
            <span style={{ cursor:"pointer", color:"#666" }} onClick={() => router.push("/auth/signin")}>
              {T.login}
            </span>
          </div>

          <div style={{ fontSize:"10px", color:"#333", textAlign:"center", lineHeight:1.5 }}>
            By signing up you agree to use JesAI for legal information only — not legal advice.
          </div>
        </form>
      )}
    </div>
  )
}
