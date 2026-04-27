import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-xl bg-[#006A4E] flex items-center justify-center text-white font-bold text-base">J</div>
              <div>
                <span className="font-bold text-gray-900 text-[15px]">Jes<span className="text-[#C8A84B]">AI</span></span>
                <p className="text-[9px] text-gray-400 tracking-wider -mt-0.5">BANGLADESH LEGAL AI</p>
              </div>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed mb-3">
              NLC-validated legal knowledge across all major areas of Bangladesh law. Free for every citizen.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#006A4E] animate-pulse" />
              <span className="text-[11px] text-[#006A4E] font-medium">JesAI is active</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Platform</h3>
            <div className="space-y-2">
              {[
                { href: "/",             label: "Home"            },
                { href: "/consult",      label: "Ask JesAI"       },
                { href: "/laws",         label: "Law Areas"       },
                { href: "/payment",      label: "Upgrade Plan"    },
                { href: "/auth/signup",  label: "Create Account"  },
                { href: "/auth/signin",  label: "Sign In"         },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="block text-[12px] text-gray-500 hover:text-gray-900 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* NLC */}
          <div>
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Neum Lex Counsel</h3>
            <div className="space-y-1.5 text-[12px] text-gray-500">
              <p className="font-semibold text-gray-900">Md Nazmul Islam (Bijoy)</p>
              <p>Advocate, Supreme Court of Bangladesh</p>
              <p>Panthapath, Dhaka</p>
              <a href="mailto:nazmulbijoy9105@gmail.com" className="block text-[#006A4E] hover:underline mt-2">nazmulbijoy9105@gmail.com</a>
              <a href="tel:+8801535778111" className="block text-[#006A4E] hover:underline">+880 1535-778111</a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-400">© {new Date().getFullYear()} Neum Lex Counsel · NB TECH. All rights reserved.</p>
          <p className="text-[11px] text-gray-400 text-center max-w-md">
            ⚠️ Legal information only — not legal advice. Consult a certified Bangladesh Bar Council advocate.
          </p>
        </div>
      </div>
    </footer>
  );
}
