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
    { href: "/",        label: "Home"       },
    { href: "/consult", label: "Ask JesAI"  },
    { href: "/laws",    label: "Law Areas"  },
    { href: "/payment", label: "Upgrade"    },
  ];

  const handleSignOut = async () => {
    setSigningOut(true);
    try { await signOut(); router.push("/"); }
    finally { setSigningOut(false); setOpen(false); }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="h-8 w-8 rounded-xl bg-[#006A4E] flex items-center justify-center text-white font-bold text-base shadow-sm">J</div>
            <div>
              <span className="font-bold text-gray-900 text-[15px] tracking-tight">Jes<span className="text-[#C8A84B]">AI</span></span>
              <p className="text-[9px] text-gray-400 tracking-wider hidden sm:block -mt-0.5">BANGLADESH LEGAL AI</p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  pathname === l.href
                    ? "bg-[#006A4E]/8 text-[#006A4E]"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <div className="hidden sm:flex items-center gap-2">
                    {isPaid && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        ✦ {tier.toUpperCase()}
                      </span>
                    )}
                    <span className="text-[11px] text-gray-400 max-w-[120px] truncate">{user.email}</span>
                    <button onClick={handleSignOut} disabled={signingOut}
                      className="text-[11px] px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 transition-all disabled:opacity-40">
                      {signingOut ? "..." : "Sign Out"}
                    </button>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link href="/auth/signin"
                      className="text-[12px] font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all">
                      Sign In
                    </Link>
                  </div>
                )}
              </>
            )}

            <Link href="/consult"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006A4E] text-white text-[13px] font-semibold hover:bg-[#005a40] transition-all shadow-sm">
              Ask JesAI
            </Link>

            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-400 hover:text-gray-700">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-0.5 pb-4">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  pathname === l.href ? "bg-[#006A4E]/8 text-[#006A4E]" : "text-gray-600 hover:bg-gray-50"
                }`}>
                {l.label}
              </Link>
            ))}
            <div className="pt-2 px-1 space-y-1.5">
              {!loading && user ? (
                <>
                  <p className="text-[10px] text-gray-400 px-2">{user.email}</p>
                  <button onClick={handleSignOut} className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-red-600 hover:bg-red-50">Sign Out</button>
                </>
              ) : (
                <Link href="/auth/signin" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-[13px] text-gray-600 hover:bg-gray-50">Sign In</Link>
              )}
              <Link href="/consult" onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-[#006A4E] text-white text-[13px] font-semibold hover:bg-[#005a40] transition-all">
                Ask JesAI Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
