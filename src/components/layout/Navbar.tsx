"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isPaid, tier, signOut } = useAuth();

  const links = [
    { href: "/",        label: "Home"      },
    { href: "/consult", label: "Ask JesAI" },
    { href: "/laws",    label: "Law Areas" },
    { href: "/payment", label: "Upgrade"   },
  ];

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.push("/");
    } finally {
      setSigningOut(false);
      setOpen(false);
    }
  };

  const tierBadge = () => {
    if (!isPaid) return null;
    const colors: Record<string, string> = {
      basic: "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30",
      pro: "bg-[#c8a84b]/10 text-[#c8a84b] border-[#c8a84b]/30",
      professional: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    };
    const labels: Record<string, string> = {
      basic: "Basic",
      pro: "Pro",
      professional: "Professional",
    };
    const cls = colors[tier] ?? "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30";
    return (
      <span className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>
        ✦ {labels[tier] ?? tier.toUpperCase()}
      </span>
    );
  };

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
            {!loading && (
              <>
                {user ? (
                  <>
                    {tierBadge()}
                    {/* User menu */}
                    <div className="hidden sm:flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 max-w-[120px] truncate">{user.email}</span>
                      <button
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="text-[11px] px-3 py-1.5 rounded-lg border border-white/10 text-slate-500 hover:text-[#f42a41] hover:border-[#f42a41]/30 transition-all duration-200 disabled:opacity-40"
                      >
                        {signingOut ? "..." : "Sign Out"}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Free badge for guests */}
                    <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#006a4e]/30 bg-[#006a4e]/10 px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                      <span className="text-[11px] text-[#4ade80] font-medium">20 Free Questions</span>
                    </div>
                    <Link href="/auth/signin"
                      className="hidden sm:flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all">
                      Sign In
                    </Link>
                  </>
                )}
              </>
            )}

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

            {!loading && (
              <div className="pt-2 px-3 space-y-2">
                {user ? (
                  <>
                    <div className="text-[11px] text-slate-500 px-1 pb-1 truncate">{user.email}</div>
                    {isPaid && (
                      <div className="text-[10px] text-[#c8a84b] px-1">Plan: {tier}</div>
                    )}
                    <button
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#f42a41] hover:bg-[#f42a41]/10 transition-all"
                    >
                      {signingOut ? "Signing out..." : "Sign Out"}
                    </button>
                  </>
                ) : (
                  <Link href="/auth/signin" onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                    Sign In
                  </Link>
                )}
                <Link href="/consult" onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#006a4e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#005a40] transition-all">
                  Ask JesAI Free
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
