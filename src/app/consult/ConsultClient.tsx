"use client";

import Navbar from "@/components/layout/Navbar";
import ChatInterface from "@/components/chat/ChatInterface";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const LAW_AREAS = [
  { icon: "⚖️", label: "Constitutional"  },
  { icon: "🔒", label: "Criminal"         },
  { icon: "🏠", label: "Property & Land"  },
  { icon: "👨‍👩‍👧", label: "Family Law"      },
  { icon: "🏭", label: "Labour Law"       },
  { icon: "📝", label: "Contract Law"     },
  { icon: "💼", label: "Company Law"      },
  { icon: "💰", label: "Tax & VAT"        },
  { icon: "✈️", label: "NRB Investment"   },
];

const PIPELINE_STEPS = [
  { icon: "💬", code: "01", label: "Facts extracted"           },
  { icon: "🔍", code: "02", label: "Issues classified"         },
  { icon: "🟢", code: "03", label: "Tier-1 checks run"         },
  { icon: "⚔️", code: "04", label: "Argument trees generated"  },
  { icon: "🎯", code: "05", label: "Verdict + relief mapped"   },
  { icon: "🤝", code: "06", label: "Human guidance"            },
];

export default function ConsultClient() {
  const { user, isPaid, tier } = useAuth();

  return (
    <div
      className="flex flex-col bg-[#080f1e]"
      style={{ height: "100dvh", overflow: "hidden" }}
    >
      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* ── Premium Sidebar (desktop only) ─────────────────── */}
        <aside className="hidden xl:flex flex-col w-72 flex-shrink-0 border-r border-white/[0.06] bg-[#0a1220] overflow-y-auto">

          {/* User card */}
          <div className="p-4 border-b border-white/[0.06]">
            {user ? (
              <div className={`rounded-xl p-3 ${isPaid
                ? "bg-gradient-to-br from-[#c8a84b]/15 to-[#c8a84b]/5 border border-[#c8a84b]/30"
                : "bg-[#006a4e]/10 border border-[#006a4e]/20"}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${isPaid ? "bg-[#c8a84b] text-[#0a1628]" : "bg-[#006a4e] text-white"}`}>
                    {user.email[0].toUpperCase()}
                  </div>
                  <span className="text-[11px] text-white font-medium truncate">{user.email}</span>
                  {isPaid && (
                    <span className="ml-auto text-[9px] font-bold text-[#c8a84b] border border-[#c8a84b]/40 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                      ✦ {tier.toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">
                  {isPaid ? "Full access · Unlimited" : "Free plan · 20 questions/day"}
                </p>
                {!isPaid && (
                  <Link href="/payment"
                    className="mt-2.5 flex items-center justify-center gap-1.5 text-[10px] font-bold px-3 py-2 rounded-lg bg-gradient-to-r from-[#c8a84b]/20 to-[#c8a84b]/10 text-[#c8a84b] border border-[#c8a84b]/30 hover:from-[#c8a84b]/30 transition-all">
                    ✦ Upgrade to Pro
                  </Link>
                )}
              </div>
            ) : (
              <div className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.07]">
                <p className="text-[11px] text-white font-medium mb-1">Guest Access</p>
                <p className="text-[10px] text-slate-500 mb-2.5">20 free questions · No account needed</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <Link href="/auth/signin"
                    className="text-center text-[10px] font-medium px-2 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all">
                    Sign In
                  </Link>
                  <Link href="/auth/signup"
                    className="text-center text-[10px] font-semibold px-2 py-1.5 rounded-lg bg-[#006a4e] text-white hover:bg-[#005a40] transition-all">
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ILRMF pipeline */}
          <div className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-bold text-[#c8a84b] uppercase tracking-widest">ILRMF Pipeline</span>
              <div className="flex-1 h-px bg-[#c8a84b]/20" />
            </div>
            <div className="space-y-2">
              {PIPELINE_STEPS.map(s => (
                <div key={s.code} className="flex items-center gap-2.5">
                  <span className="text-[9px] font-bold text-slate-600 tabular-nums w-4">{s.code}</span>
                  <span className="text-sm leading-none">{s.icon}</span>
                  <span className="text-[11px] text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verdict legend */}
          <div className="p-4 border-b border-white/[0.06]">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Verdict Legend</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#4ade80]/5 border border-[#4ade80]/15">
                <span>🟢</span>
                <span className="text-[10px] text-[#4ade80] font-medium">GREEN — Relief available</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#c8a84b]/5 border border-[#c8a84b]/15">
                <span>🟡</span>
                <span className="text-[10px] text-[#c8a84b] font-medium">YELLOW — Court's discretion</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#f42a41]/5 border border-[#f42a41]/15">
                <span>🔴</span>
                <span className="text-[10px] text-[#f42a41] font-medium">RED — Relief blocked</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
                <span>⬛</span>
                <span className="text-[10px] text-slate-400 font-medium">BLACK — No jurisdiction</span>
              </div>
            </div>
          </div>

          {/* Law areas */}
          <div className="p-4 flex-1">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">Law Areas</p>
            <div className="space-y-0.5">
              {LAW_AREAS.map(a => (
                <div key={a.label} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all">
                  <span className="text-sm">{a.icon}</span>
                  <span className="text-[11px] text-slate-300">{a.label}</span>
                  <span className="ml-auto text-[9px] text-[#4ade80]/60">✓</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 border-t border-white/[0.06]">
            <div className="rounded-xl bg-[#f42a41]/5 border border-[#f42a41]/20 p-3">
              <p className="text-[9px] font-bold text-[#f42a41] mb-1">⚠ DISCLAIMER</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Legal <strong className="text-white">information only</strong> — not legal advice.
                Consult a <strong className="text-white">Bar Council advocate</strong> for representation.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Chat Panel ─────────────────────────────────────── */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#0a1220]/90 backdrop-blur-md flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-[#006a4e] to-[#004d38] flex items-center justify-center shadow-lg shadow-[#006a4e]/30 flex-shrink-0">
                <span className="text-white font-bold text-sm">J</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#4ade80] border-2 border-[#0a1220]" />
              </div>
              <div>
                <h1 className="text-white font-semibold text-sm leading-none">
                  Jes<span className="text-[#c8a84b]">AI</span>
                  <span className="ml-2 text-[9px] font-normal text-[#4ade80] border border-[#006a4e]/40 bg-[#006a4e]/10 px-1.5 py-0.5 rounded-full align-middle">ILRMF ACTIVE</span>
                </h1>
                <p className="text-[10px] text-slate-500 mt-0.5">Bangladesh Legal Reasoning AI · NLC</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isPaid ? (
                <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-[#c8a84b]/15 text-[#c8a84b] border border-[#c8a84b]/30">
                  ✦ {tier} · Full Pipeline
                </span>
              ) : (
                <>
                  <span className="hidden sm:block text-[10px] text-slate-500">20 free queries</span>
                  <Link href="/payment"
                    className="text-[10px] font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#c8a84b]/20 to-[#c8a84b]/10 text-[#c8a84b] border border-[#c8a84b]/30 hover:from-[#c8a84b]/30 transition-all whitespace-nowrap">
                    ✦ Upgrade
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Chat — fills all remaining space */}
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </main>
      </div>
    </div>
  );
}
