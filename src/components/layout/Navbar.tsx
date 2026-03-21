"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/",        label: "Home"      },
    { href: "/consult", label: "Ask JesAI" },
    { href: "/laws",    label: "Law Areas" },
    { href: "/payment", label: "Upgrade"   },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a1628]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-[#006a4e] flex items-center justify-center text-white font-bold text-base shadow-lg shadow-[#006a4e]/30">
              J
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-base tracking-wide">JesAI</span>
              <span className="hidden sm:block text-[10px] text-slate-500 tracking-wider">LEGAL LITERACY</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === l.href
                    ? "bg-[#006a4e]/20 text-[#4ade80]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Free badge */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#006a4e]/30 bg-[#006a4e]/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-[11px] text-[#4ade80] font-medium">20 Free Questions</span>
            </div>

            <Link href="/consult"
              className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#006a4e] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#005a40] transition-all shadow-md shadow-[#006a4e]/20">
              Ask JesAI
            </Link>

            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/[0.06] py-3 space-y-1 pb-4">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === l.href
                    ? "bg-[#006a4e]/20 text-[#4ade80]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}>
                {l.label}
              </Link>
            ))}
            <div className="pt-2 px-3">
              <Link href="/consult" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#006a4e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#005a40] transition-all">
                Ask JesAI Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
