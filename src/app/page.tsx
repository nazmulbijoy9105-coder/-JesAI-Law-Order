import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const LAW_AREAS = [
  { icon: "⚖️", title: "Constitutional Law",   desc: "Fundamental rights, writ jurisdiction, detention safeguards, Articles 27–44.",           color: "border-l-[#006A4E]" },
  { icon: "🔒", title: "Criminal Law",          desc: "Penal Code, CrPC, FIR, bail, remand, trial procedure, special laws.",                   color: "border-l-[#C8A84B]" },
  { icon: "🏠", title: "Property & Land",       desc: "Transfer of Property, mutation, khatian, deed registration, adverse possession.",        color: "border-l-[#006A4E]" },
  { icon: "👨‍👩‍👧", title: "Family Law",           desc: "Marriage, divorce, talaq, custody, maintenance, dower under all personal laws.",        color: "border-l-[#C8A84B]" },
  { icon: "🏭", title: "Labour Law",            desc: "Termination, gratuity, wages, overtime, maternity — Labour Act 2006.",                   color: "border-l-[#006A4E]" },
  { icon: "📝", title: "Contract Law",          desc: "Formation, breach, remedies, guarantee, stamp duty — Contract Act 1872.",                color: "border-l-[#C8A84B]" },
  { icon: "💼", title: "Company Law",           desc: "RJSC registration, directors, shareholders, compliance — Companies Act 1994.",            color: "border-l-[#006A4E]" },
  { icon: "💰", title: "Tax & VAT",             desc: "Income Tax Act 2023, VAT, TIN, NBR returns, withholding tax.",                           color: "border-l-[#C8A84B]" },
  { icon: "✈️", title: "NRB Investment",        desc: "Repatriation, BIDA, DTAA, FBAR, cross-border investment rules.",                         color: "border-l-[#006A4E]" },
];

const STEPS = [
  { n: "01", icon: "💬", title: "Describe Your Facts",    desc: "Tell JesAI what happened — no legal jargon needed." },
  { n: "02", icon: "🔍", title: "Issues Identified",      desc: "Every distinct legal issue in your situation is named and classified." },
  { n: "03", icon: "🟢", title: "Tier-1 Checks Run",     desc: "Limitation, registration, jurisdiction, evidence — deterministic GREEN / RED verdicts." },
  { n: "04", icon: "⚔️", title: "Both Sides Argued",     desc: "Your strongest arguments and what opposing counsel will say — full balance." },
  { n: "05", icon: "🎯", title: "Verdict & Next Steps",   desc: "Likely outcome, remedies available, documents needed, courts to approach." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#006A4E]/[0.03] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#C8A84B]/[0.04] rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006A4E]/8 border border-[#006A4E]/15 text-[#006A4E] text-[12px] font-semibold mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#006A4E] animate-pulse" />
            NLC-Validated · Bangladesh Legal AI · Free to Start
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Your Legal Rights,{" "}
            <span className="gradient-text">Explained Simply</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bangladesh's Legal Reasoning AI — maps your situation to the law, runs structured
            fact analysis, presents both sides, and delivers a clear verdict.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link href="/consult"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#006A4E] text-white font-semibold text-[15px] hover:bg-[#005a40] transition-all shadow-sm hover:shadow-md hover:shadow-[#006A4E]/20 hover:scale-[1.02]">
              Ask JesAI — Free
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/laws"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-[15px] hover:border-gray-300 hover:bg-gray-50 transition-all hover:scale-[1.02]">
              Explore Law Areas
            </Link>
          </div>

          {/* Stats */}
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-gray-50 border border-gray-100">
            {[
              { v: "9",     l: "Law Modules"          },
              { v: "250+",  l: "Validated Q&A Pairs"  },
              { v: "Free",  l: "Legal Literacy"        },
              { v: "24/7",  l: "Always Available"      },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-[20px] font-bold text-gray-900">{s.v}</div>
                <div className="text-[11px] text-gray-400 mt-0.5 whitespace-nowrap">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold text-[#006A4E] uppercase tracking-widest mb-3">The ILRMF Pipeline</p>
            <h2 className="text-3xl font-bold text-gray-900">How JesAI Analyses Your Case</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
            {STEPS.map((s, i) => (
              <div key={s.n} className="bg-white p-6 relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 right-0 w-px h-8 bg-gray-200 translate-x-1/2 z-10" />
                )}
                <div className="text-2xl mb-3">{s.icon}</div>
                <div className="text-[10px] font-bold text-[#C8A84B] mb-1.5 tracking-widest">STEP {s.n}</div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-1.5 leading-snug">{s.title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Law Areas ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold text-[#006A4E] uppercase tracking-widest mb-3">Coverage</p>
            <h2 className="text-3xl font-bold text-gray-900">All Areas of Bangladesh Law</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-[14px]">
              NLC-validated knowledge across every major subject — substantive rights and procedural guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {LAW_AREAS.map(a => (
              <Link key={a.title} href="/consult"
                className={`group bg-white rounded-xl border-l-4 border border-gray-100 ${a.color} p-5 hover:shadow-md transition-all hover:-translate-y-0.5`}>
                <div className="text-2xl mb-3">{a.icon}</div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-1.5">{a.title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{a.desc}</p>
                <div className="mt-3 text-[11px] text-[#006A4E] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Ask JesAI →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verdict system ────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[12px] font-bold text-[#006A4E] uppercase tracking-widest mb-3">Verdict System</p>
            <h2 className="text-3xl font-bold text-gray-900">Every Answer Has a Clear Verdict</h2>
            <p className="text-gray-500 mt-3 text-[14px] max-w-xl mx-auto">
              JesAI uses deterministic Tier-1 checks and discretionary Tier-2 analysis to classify every legal outcome.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { v: "🟢", cls: "verdict-green",  h: "GREEN",  d: "Relief clearly available — deterministic, no discretion needed." },
              { v: "🟡", cls: "verdict-yellow", h: "YELLOW", d: "Court's discretion — factors identified, outcome arguable." },
              { v: "🔴", cls: "verdict-red",    h: "RED",    d: "Relief blocked — specific legal bar identified." },
              { v: "⬛", cls: "verdict-black",  h: "BLACK",  d: "No jurisdiction — this court cannot hear this matter." },
            ].map(x => (
              <div key={x.h} className={`${x.cls} p-4 rounded-xl`}>
                <div className="text-2xl mb-2">{x.v}</div>
                <div className="text-[12px] font-bold mb-1">{x.h}</div>
                <p className="text-[11px] leading-relaxed opacity-80">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────── */}
      <section className="py-6 border-y border-red-100 bg-red-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[13px] text-gray-600">
            <span className="font-bold text-red-600">⚠️ Disclaimer: </span>
            JesAI provides <strong>legal literacy and information only</strong> — not legal advice.
            For representation, consult a certified advocate registered with the{" "}
            <strong className="text-gray-900">Bangladesh Bar Council</strong>.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl bg-[#006A4E] p-12 text-white">
            <div className="text-5xl mb-5">🇧🇩</div>
            <h2 className="text-2xl font-bold mb-3">Know Your Rights. Know Your Laws.</h2>
            <p className="text-white/70 mb-8 text-[14px] leading-relaxed">
              Every Bangladeshi citizen deserves to understand the laws that govern their life.
              Start with 20 free questions — no registration required.
            </p>
            <Link href="/consult"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#006A4E] font-bold text-[15px] hover:bg-gray-50 transition-all shadow-sm">
              Start Free Consultation
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
