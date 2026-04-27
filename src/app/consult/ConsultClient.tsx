"use client";

import Navbar from "@/components/layout/Navbar";
import ChatInterface from "@/components/chat/ChatInterface";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const LAW_AREAS = [
  { icon: "⚖️", label: "Constitutional" },
  { icon: "🔒", label: "Criminal" },
  { icon: "🏠", label: "Property & Land" },
  { icon: "👨‍👩‍👧", label: "Family Law" },
  { icon: "🏭", label: "Labour Law" },
  { icon: "📝", label: "Contract Law" },
  { icon: "💼", label: "Company Law" },
  { icon: "💰", label: "Tax & VAT" },
  { icon: "✈️", label: "NRB Investment" },
];

export default function ConsultClient() {
  const { user, isPaid, tier } = useAuth();

  return (
    <div className="flex flex-col bg-white" style={{ height: "100dvh", overflow: "hidden" }}>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ───────────────────────────────── */}
        <aside className="hidden xl:flex flex-col w-64 flex-shrink-0 border-r border-gray-100 bg-white overflow-y-auto">

          {/* User */}
          <div className="p-4 border-b border-gray-100">
            {user ? (
              <div className={`rounded-xl p-3 ${isPaid ? "bg-amber-50 border border-amber-200" : "bg-[#006A4E]/5 border border-[#006A4E]/15"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${isPaid ? "bg-[#C8A84B] text-white" : "bg-[#006A4E] text-white"}`}>
                    {user.email[0].toUpperCase()}
                  </div>
                  <span className="text-[11px] font-medium text-gray-900 truncate">{user.email}</span>
                </div>
                {isPaid
                  ? <p className="text-[10px] text-amber-700 font-semibold">✦ {tier.toUpperCase()} · Full Access</p>
                  : <p className="text-[10px] text-gray-500">Free plan</p>}
                {!isPaid && (
                  <Link href="/payment" className="mt-2 flex items-center justify-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-[#C8A84B] text-white hover:bg-[#b8943b] transition-all">
                    ✦ Upgrade to Pro
                  </Link>
                )}
              </div>
            ) : (
              <div>
                <p className="text-[11px] font-semibold text-gray-700 mb-1">Guest · 20 free queries</p>
                <div className="flex gap-1.5">
                  <Link href="/auth/signin" className="flex-1 text-center text-[10px] font-medium px-2 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 transition-all">Sign In</Link>
                  <Link href="/auth/signup" className="flex-1 text-center text-[10px] font-semibold px-2 py-1.5 rounded-lg bg-[#006A4E] text-white hover:bg-[#005a40] transition-all">Sign Up</Link>
                </div>
              </div>
            )}
          </div>

          {/* Verdict legend */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Verdict System</p>
            <div className="space-y-1.5">
              {[
                { v: "🟢", cls: "verdict-green",  label: "GREEN — Relief available"  },
                { v: "🟡", cls: "verdict-yellow", label: "YELLOW — Court discretion" },
                { v: "🔴", cls: "verdict-red",    label: "RED — Relief blocked"       },
                { v: "⬛", cls: "verdict-black",  label: "BLACK — No jurisdiction"   },
              ].map(x => (
                <div key={x.v} className={`${x.cls} flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] font-medium`}>
                  <span>{x.v}</span><span>{x.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Law areas */}
          <div className="p-4 flex-1">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">9 Law Areas</p>
            <div className="space-y-0.5">
              {LAW_AREAS.map(a => (
                <div key={a.label} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-all">
                  <span className="text-sm">{a.icon}</span>
                  <span className="text-[11px] text-gray-700">{a.label}</span>
                  <span className="ml-auto text-[9px] text-[#006A4E] font-bold">✓</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 border-t border-gray-100">
            <div className="rounded-xl bg-red-50 border border-red-100 p-3">
              <p className="text-[9px] font-bold text-red-600 mb-1">⚠ DISCLAIMER</p>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Legal <strong className="text-gray-700">information only</strong> — not advice.
                Consult a <strong className="text-gray-700">Bar Council advocate</strong> for representation.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Chat ──────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </main>
      </div>
    </div>
  );
}
