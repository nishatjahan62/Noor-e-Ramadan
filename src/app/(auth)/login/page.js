"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LangContext";

function CrescentMoon({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function LoginPage() {
  const { lang }            = useLang();
  const router              = useRouter();
  const [email, setEmail]   = useState("");
  const [password, setPass] = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoad]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoad(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoad(false);

    if (res?.error) {
      setError(lang === "bn" ? "Email বা Password ভুল" : "Invalid email or password");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="w-full max-w-md mx-4"
    >
      {/* Card */}
      <div
        className="rounded-3xl p-[1.5px]"
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      >
        <div className="rounded-[22px] p-8 bg-white dark:bg-slate-900 flex flex-col gap-6">

          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ring-1 ring-amber-300/40 bg-gradient-to-br from-emerald-500/10 to-amber-400/10 dark:from-emerald-900/40 dark:to-amber-900/30">
              <CrescentMoon size={22} className="text-amber-500 dark:text-amber-300" />
            </div>
            <h1
              className="text-2xl font-black font-heading"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {lang === "bn" ? "লগইন করুন" : "Welcome Back"}
            </h1>
            <p className={cn("text-xs text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
              {lang === "bn" ? "আপনার account এ প্রবেশ করুন" : "Sign in to your account"}
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className={cn("text-xs font-semibold text-gray-600 dark:text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
                {lang === "bn" ? "ইমেইল" : "Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com"
                className={cn(
                  "rounded-2xl border border-primary/30 dark:border-slate-700 px-4 py-3 text-sm outline-none",
                  "bg-emerald-50/50 dark:bg-slate-800 text-gray-700 dark:text-gray-200",
                  "focus:ring-2 focus:ring-emerald-400/40 transition-all font-body"
                )}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className={cn("text-xs font-semibold text-gray-600 dark:text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
                {lang === "bn" ? "পাসওয়ার্ড" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "rounded-2xl border border-primary/30 dark:border-slate-700 px-4 py-3 text-sm outline-none",
                  "bg-emerald-50/50 dark:bg-slate-800 text-gray-700 dark:text-gray-200",
                  "focus:ring-2 focus:ring-emerald-400/40 transition-all font-body"
                )}
              />
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("text-xs text-red-500 text-center", lang === "bn" ? "font-bn" : "font-body")}
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={loading}
              className={cn(
                "w-full py-3 rounded-2xl text-sm font-bold text-white transition-all",
                loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90",
                lang === "bn" ? "font-bn" : "font-body"
              )}
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              {loading
                ? (lang === "bn" ? "লগইন হচ্ছে..." : "Signing in...")
                : (lang === "bn" ? "লগইন করুন" : "Sign In")
              }
            </motion.button>

          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-emerald-100 dark:bg-slate-700" />
            <span className="text-xs text-gray-400 font-body">or</span>
            <span className="h-px flex-1 bg-emerald-100 dark:bg-slate-700" />
          </div>

          {/* Register link */}
          <p className={cn("text-center text-xs text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
            {lang === "bn" ? "account নেই?" : "Don't have an account?"}{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-secondary transition-colors"
            >
              {lang === "bn" ? "রেজিস্ট্রেশন করুন" : "Register"}
            </Link>
          </p>

        </div>
      </div>
    </motion.div>
  );
}