import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080f1e] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-xl bg-[#006a4e] flex items-center justify-center text-white font-bold">
                J
              </div>
              <div>
                <span className="text-white font-bold text-base">JesAI</span>
                <p className="text-[10px] text-slate-500 tracking-wider">LEGAL LITERACY</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Bangladesh&apos;s Legal AI — NLC-validated knowledge across all
              major areas of Bangladesh law. Free for every citizen.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-[11px] text-[#4ade80]">JesAI is active</span>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <div className="space-y-2.5">
              {[
                { href: "/",        label: "Home"        },
                { href: "/consult", label: "Ask JesAI"   },
                { href: "/laws",    label: "Law Areas"   },
                { href: "/payment", label: "Upgrade Plan" },
                { href: "/auth/signup", label: "Create Account" },
                { href: "/auth/signin", label: "Sign In" },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="block text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* NLC Contact */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Neum Lex Counsel
            </h3>
            <div className="space-y-2 text-sm text-slate-500">
              <p className="text-slate-300 font-medium">Md Nazmul Islam (Bijoy)</p>
              <p>Advocate, Supreme Court of Bangladesh</p>
              <p>Panthapath, Dhaka, Bangladesh</p>
              <a href="mailto:nazmulbijoy9105@gmail.com"
                className="block hover:text-slate-300 transition-colors mt-3">
                nazmulbijoy9105@gmail.com
              </a>
              <a href="tel:+8801535778111"
                className="block hover:text-slate-300 transition-colors">
                +880 1535-778111
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Neum Lex Counsel · NB TECH. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 text-center max-w-md">
            ⚠️ JesAI provides legal information only — not legal advice.
            For legal services, consult a certified Bangladesh Bar Council advocate.
          </p>
        </div>
      </div>
    </footer>
  );
}
