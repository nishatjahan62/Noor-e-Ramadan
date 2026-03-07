"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";
import { t, auth as ac } from "@/data/contents";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

function CrescentMoon({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function RegisterPage() {
  const { lang }            = useLang();
  const { isDark }          = useTheme();
  const router              = useRouter();
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [password, setPass] = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoad]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoad(true);

    if (password.length < 6) {
      setError(t(ac.passwordShort, lang));
      setLoad(false);
      return;
    }

    const res  = await fetch("/api/register", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoad(false);

    if (!res.ok) {
      setError(data.error);
   } else {
  await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  await Swal.fire({
    icon:              "success",
    title:             t(ac.welcomeTitle, lang),
    text:              t(ac.accountCreated, lang),
    timer:             1500,
    showConfirmButton: false,
    background:        isDark ? "#0f172a" : "#ffffff",
    color:             isDark ? "#f1f5f9" : "#1e293b",
  });

  router.push("/");
  router.refresh();
}}

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="w-full max-w-sm mx-4"
    >
      <div
        className="rounded-2xl p-[1.5px]"
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      >
        <div className="rounded-[14px] px-6 py-5 bg-white dark:bg-slate-900 flex flex-col gap-4">

          {/* Logo */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow-md ring-1 ring-amber-300/40 bg-gradient-to-br from-emerald-500/10 to-amber-400/10 dark:from-emerald-900/40 dark:to-amber-900/30">
              <CrescentMoon size={18} className="text-amber-500 dark:text-amber-300" />
            </div>
            <h1
              className="text-xl font-black font-heading"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t(ac.registerTitle, lang)}
            </h1>
            <p className={cn("text-[11px] text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
              {t(ac.registerSub, lang)}
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-3">

            <div className="flex flex-col gap-1">
              <label className={cn("text-[11px] font-semibold text-gray-600 dark:text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
                {t(ac.fullName, lang)}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t(ac.namePlaceholder, lang)}
                className={cn(
                  "rounded-xl border border-primary/30 dark:border-slate-700 px-3 py-2 text-sm outline-none",
                  "bg-emerald-50/50 dark:bg-slate-800 text-gray-700 dark:text-gray-200",
                  "focus:ring-2 focus:ring-emerald-400/40 transition-all",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={cn("text-[11px] font-semibold text-gray-600 dark:text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
                {t(ac.emailLabel, lang)}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com"
                className={cn(
                  "rounded-xl border border-primary/30 dark:border-slate-700 px-3 py-2 text-sm outline-none",
                  "bg-emerald-50/50 dark:bg-slate-800 text-gray-700 dark:text-gray-200",
                  "focus:ring-2 focus:ring-emerald-400/40 transition-all",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={cn("text-[11px] font-semibold text-gray-600 dark:text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
                {t(ac.passwordLabel, lang)}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "rounded-xl border border-primary/30 dark:border-slate-700 px-3 py-2 text-sm outline-none",
                  "bg-emerald-50/50 dark:bg-slate-800 text-gray-700 dark:text-gray-200",
                  "focus:ring-2 focus:ring-emerald-400/40 transition-all",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
              />
              <p className={cn("text-[10px] text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
                {t(ac.passwordHint, lang)}
              </p>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={cn("text-xs text-red-500 text-center", lang === "bn" ? "font-bn" : "font-body")}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={loading}
              className={cn(
                "w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all",
                loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90",
                lang === "bn" ? "font-bn" : "font-body"
              )}
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              {loading ? t(ac.creating, lang) : t(ac.createBtn, lang)}
            </motion.button>

          </div>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-emerald-100 dark:bg-slate-700" />
            <span className={cn("text-[11px] text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>or</span>
            <span className="h-px flex-1 bg-emerald-100 dark:bg-slate-700" />
          </div>

          <p className={cn("text-center text-[11px] text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
            {t(ac.haveAccount, lang)}{" "}
            <Link href="/login" className="font-semibold text-primary hover:text-secondary transition-colors">
              {t(ac.goLogin, lang)}
            </Link>
          </p>

        </div>
      </div>
    </motion.div>
  );
}