"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If Supabase is configured and succeeds, or dev mode fallback
      if (error && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // Fallback for development if env variables are not yet provided
        if (email.includes("@")) {
          // Allow dev entry
          sessionStorage.setItem("ace_admin_auth", JSON.stringify({ email }));
          router.push("/admin/dashboard");
          return;
        }
        setErrorMessage(error.message);
      } else if (error) {
        setErrorMessage(error.message);
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      // In dev mode allow quick entry
      sessionStorage.setItem("ace_admin_auth", JSON.stringify({ email }));
      router.push("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    sessionStorage.setItem("ace_admin_auth", JSON.stringify({ email: "admin@reinventaf.com" }));
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#62060E] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Summit Site</span>
          </Link>
        </div>

        <div className="rounded-3xl bg-gradient-to-b from-[#4A040A] to-[#3B0207] border border-[#FF6417]/30 shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6417]/20 border border-[#FF6417]/40 flex items-center justify-center text-[#FF6417] mx-auto mb-4 shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF6417] block mb-1">
              Organizer & Staff Portal
            </span>
            <h1 className="text-2xl font-black text-white">ACE GLOBAL SUMMIT</h1>
            <p className="text-xs text-white/70 mt-1">
              Sign in to manage attendees, verify tickets & view analytics
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs mb-6">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@reinventaf.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6417]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6417]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF6417] to-[#E65100] hover:from-[#FF7B39] hover:to-[#FF6417] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white/90 hover:text-white transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Dashboard (Demo Access)</span>
            </button>
            <p className="text-[11px] text-white/40 mt-2">
              For organizers configuring Supabase Auth credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
