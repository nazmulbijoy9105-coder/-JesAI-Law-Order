"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdmin, supabase } from "@/lib/auth/supabase-auth"
import { verifyPayment } from "@/lib/payment/payment"

interface PaymentRecord {
  id: string
  user_id: string
  tier: string
  method: string
  amount: number
  transaction_id: string
  phone_number: string
  status: string
  created_at: string
  users: { email: string }
}

export default function AdminPage() {
  const router = useRouter()
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("pending")
  const [stats, setStats] = useState({ total: 0, pending: 0, verified: 0, revenue: 0 })

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    const admin = await isAdmin()
    if (!admin) { router.push("/"); return }
    loadPayments()
  }

  async function loadPayments() {
    setLoading(true)
    const { data } = await supabase
      .from("payment_records")
      .select("*, users(email)")
      .order("created_at", { ascending: false })

    if (data) {
      setPayments(data)
      setStats({
        total: data.length,
        pending: data.filter(p => p.status === "pending").length,
        verified: data.filter(p => p.status === "verified").length,
        revenue: data.filter(p => p.status === "verified").reduce((sum, p) => sum + p.amount, 0),
      })
    }
    setLoading(false)
  }

  async function handleVerify(id: string, approved: boolean) {
    await verifyPayment(id, approved)
    loadPayments()
  }

  const filtered = payments.filter(p => filter === "all" ? true : p.status === filter)

  const statusColor: Record<string, string> = {
    pending: "#C9A84C",
    verified: "#1AB89E",
    rejected: "#E74C3C",
  }

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", padding:"24px" }}>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"24px", borderBottom:"1px solid #1a1a1a", paddingBottom:"16px" }}>
        <div style={{ fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"20px", letterSpacing:"4px", color:"#C9A84C" }}>JESAI ADMIN</div>
        <div style={{ flex:1 }} />
        <button onClick={() => router.push("/")}
          style={{ padding:"6px 16px", border:"1px solid #333", color:"#666", background:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", letterSpacing:"2px", fontSize:"11px" }}>
          ← BACK
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"24px" }}>
        {[
          { label:"Total", value:stats.total, color:"#888" },
          { label:"Pending", value:stats.pending, color:"#C9A84C" },
          { label:"Verified", value:stats.verified, color:"#1AB89E" },
          { label:"Revenue (BDT)", value:`৳${stats.revenue.toLocaleString()}`, color:"#A78BFA" },
        ].map(s => (
          <div key={s.label} style={{ background:"#111", border:"1px solid #1a1a1a", padding:"16px" }}>
            <div style={{ fontSize:"10px", letterSpacing:"2px", color:"#444", marginBottom:"6px" }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize:"24px", fontWeight:700, color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
        {["pending","verified","rejected","all"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding:"6px 16px", border:`1px solid ${filter===f?"#C9A84C":"#333"}`, color:filter===f?"#C9A84C":"#555", background:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase" }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign:"center", padding:"40px", color:"#444" }}>Loading...</div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {filtered.length === 0 && (
            <div style={{ textAlign:"center", padding:"40px", color:"#333" }}>No {filter} payments</div>
          )}
          {filtered.map(p => (
            <div key={p.id} style={{ background:"#111", border:"1px solid #1a1a1a", padding:"16px", display:"flex", alignItems:"center", gap:"16px", flexWrap:"wrap" }}>
              <div style={{ flex:"1", minWidth:"200px" }}>
                <div style={{ fontWeight:700, color:"#ddd", fontSize:"13px" }}>{p.users?.email}</div>
                <div style={{ fontSize:"11px", color:"#555", marginTop:"2px" }}>
                  {p.phone_number} • {new Date(p.created_at).toLocaleString("en-BD")}
                </div>
              </div>
              <div style={{ minWidth:"100px" }}>
                <div style={{ fontWeight:700, color:"#C9A84C" }}>৳{p.amount}</div>
                <div style={{ fontSize:"11px", color:"#555", textTransform:"uppercase" }}>{p.tier} • {p.method}</div>
              </div>
              <div style={{ fontFamily:"Source Code Pro,monospace", fontSize:"12px", color:"#888", minWidth:"120px" }}>
                {p.transaction_id}
              </div>
              <div style={{ padding:"3px 10px", border:`1px solid ${statusColor[p.status]}33`, color:statusColor[p.status], fontSize:"10px", fontWeight:700, letterSpacing:"1px" }}>
                {p.status.toUpperCase()}
              </div>
              {p.status === "pending" && (
                <div style={{ display:"flex", gap:"6px" }}>
                  <button onClick={() => handleVerify(p.id, true)}
                    style={{ padding:"6px 14px", background:"#1AB89E", color:"#000", border:"none", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"11px", letterSpacing:"1px" }}>
                    VERIFY ✓
                  </button>
                  <button onClick={() => handleVerify(p.id, false)}
                    style={{ padding:"6px 14px", background:"none", color:"#E74C3C", border:"1px solid rgba(231,76,60,0.3)", cursor:"pointer", fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"11px" }}>
                    REJECT ✗
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
