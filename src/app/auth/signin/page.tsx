"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, resetPassword } from "@/lib/auth/supabase-auth"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resetMode, setResetMode] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [lang, setLang] = useState<"en"|"bn">("en")
  const [redirectTo, setRedirectTo] = useState("/")

  useEffect(() => {
    const redirect = searchParams?.get("redirect")
    if (redirect) setRedirectTo(redirect)
  }, [searchParams])

  const T = {
    title:    lang === "en" ? "Sign In" : "সাইন ইন",
    email:    lang === "en" ? "Email Address" : "ইমেইল ঠিকানা",
    pass:     lang === "en" ? "Password" : "পাসওয়ার্ড",
    btn:      lang === "en" ? "Sign In →" : "সাইন ইন করুন →",
    forgot:   lang === "en" ? "Forgot password?" : "পাসওয়ার্ড ভুলে গেছেন?",
    signup:   lang === "en" ? "New here? Create Account" : "নতুন? অ্যাকাউন্ট তৈরি করুন",
    reset:    lang === "en" ? "Send Reset Link" : "রিসেট লিংক পাঠান",
    resetOk:  lang === "en" ? "Reset link sent! Check your email." : "রিসেট লিংক পাঠানো হয়েছে!",
  }

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const { user } = await signIn(email, password)
      const { data: profile } = await import("@/lib/auth/supabase-auth").then(m =>
        m.supabase.from("users").select("role").eq("id", user!.id).single()
      )
      if (profile?.role === "admin") {
        router.push("/admin")
      } else {
        router.push(redirectTo || "/")
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await resetPassword(email)
      setResetSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Reset failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px" }}>

      <div style={{ position:"absolute", top:"16px", right:"16px", display:"flex", gap:"8px" }}>
        {["en","bn"].map(l => (
          <button key={l} onClick={() => setLang(l as "en"|"bn")}
            style={{ padding:"4px 12px", border:`1px solid ${lang===l?"#C9A84C":"#333"}`, color:lang===l?"#C9A84C":"#555", background:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"11px", letterSpacing:"2px" }}>
            {l === "en" ? "EN" : "বাং"}
          </button>
        ))}
      </div>

      <div onClick={() => router.push("/")}
        style={{ fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"28px", letterSpacing:"6px", color:"#C9A84C", marginBottom:"8px", cursor:"pointer" }}>
        JESAI
      </div>
      <div style={{ fontFamily:"Crimson Pro,serif", fontStyle:"italic", fontSize:"14px", color:"#555", marginBottom:"32px" }}>
        Bangladesh Legal Literacy AI
      </div>

      {resetSent ? (
        <div style={{ background:"#091410", border:"1px solid rgba(26,184,158,0.3)", padding:"24px 32px", textAlign:"center", maxWidth:"400px" }}>
          <div style={{ fontSize:"32px", marginBottom:"12px" }}>📧</div>
          <div style={{ color:"#1AB89E", fontWeight:700 }}>{T.resetOk}</div>
          <button onClick={() => { setResetMode(false); setResetSent(false) }}
            style={{ marginTop:"16px", padding:"8px 20px", background:"none", border:"1px solid #333", color:"#888", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", letterSpacing:"2px" }}>
            BACK
          </button>
        </div>
      ) : (
        <form onSubmit={resetMode ? handleReset : handle}
          style={{ background:"#111", border:"1px solid #1a1a1a", padding:"32px", width:"100%", maxWidth:"400px", display:"flex", flexDirection:"column", gap:"16px" }}>

          <div style={{ fontSize:"22px", fontWeight:700, letterSpacing:"2px", color:"#F5F0E8" }}>
            {resetMode ? (lang==="en"?"Reset Password":"পাসওয়ার্ড রিসেট") : T.title}
          </div>

          {error && (
            <div style={{ background:"#130a09", border:"1px solid rgba(192,57,43,0.3)", padding:"10px 12px", fontSize:"13px", color:"#E74C3C" }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ fontSize:"11px", fontWeight:700, letterSpacing:"2px", color:"#666", display:"block", marginBottom:"6px" }}>
              {T.email.toUpperCase()}
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" required
              style={{ width:"100%", background:"#0d0d0d", border:"1px solid #2a2a2a", color:"#ddd", padding:"10px 12px", fontSize:"14px", fontFamily:"Rajdhani,sans-serif", outline:"none" }}
            />
          </div>

          {!resetMode && (
            <div>
              <label style={{ fontSize:"11px", fontWeight:700, letterSpacing:"2px", color:"#666", display:"block", marginBottom:"6px" }}>
                {T.pass.toUpperCase()}
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                style={{ width:"100%", background:"#0d0d0d", border:"1px solid #2a2a2a", color:"#ddd", padding:"10px 12px", fontSize:"14px", fontFamily:"Rajdhani,sans-serif", outline:"none" }}
              />
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{ padding:"12px", background:loading?"#1a1a1a":"#C9A84C", color:loading?"#333":"#000", border:"none", cursor:loading?"default":"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"15px", letterSpacing:"2px" }}>
            {loading ? "..." : (resetMode ? T.reset : T.btn)}
          </button>

          <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px" }}>
            <span style={{ cursor:"pointer", color:"#555" }} onClick={() => setResetMode(!resetMode)}>
              {resetMode ? "← Back" : T.forgot}
            </span>
            <span style={{ cursor:"pointer", color:"#666" }} onClick={() => router.push("/auth/signup")}>
              {T.signup}
            </span>
          </div>
        </form>
      )}
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:"100vh", background:"#0A0A0A" }} />}>
      <SignInForm />
    </Suspense>
  )
}
