"use client";

import { useState } from "react";
import { Scale, ArrowLeft, Mail, Lock, Eye, EyeOff, Chrome } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Scale size={28} className="text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-4">Welcome Back</h1>
          <p className="text-slate-600">Login to access your legal dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <Chrome size={20} />
            Continue with Google
          </button>
        </div>

        <p className="text-center mt-6 text-slate-600">
          Do not have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </Link>
        </p>

        <Link href="/" className="block text-center mt-4 text-slate-500 hover:text-slate-700">
          <ArrowLeft size={16} className="inline mr-1" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
