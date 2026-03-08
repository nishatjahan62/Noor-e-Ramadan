"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { t, user as uc } from "@/data/contents";
import { useLang } from "@/context/LangContext";
import Link from "next/link";

function StatBox({ icon, label, value, lang, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay }}
      className="rounded-2xl p-[1.5px]"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
    >
      <div className="rounded-[14px] px-4 py-4 bg-white dark:bg-slate-900 flex flex-col items-center gap-1 text-center">
        <span className="text-2xl">{icon}</span>
        <span
          className="text-2xl font-black"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {value}
        </span>
        <span className={cn("text-[11px] text-gray-400 font-medium", lang === "bn" ? "font-bn" : "font-body")}>
          {t(label, lang)}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProfileClient({ session }) {
  const { lang }          = useLang();
  const [stats, setStats] = useState({ goalsSet: 0, goalsCompleted: 0, duasSaved: 0, recipesSaved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/goals").then(r => r.json()),
      fetch("/api/bookmarks").then(r => r.json()),
    ]).then(([goalsData, bookmarksData]) => {
      const goals     = goalsData.goals ?? [];
      const bookmarks = bookmarksData.bookmarks ?? [];
      setStats({
        goalsSet:       goals.length,
        goalsCompleted: goals.filter(g => g.done).length,
        duasSaved:      bookmarks.filter(b => b.type === "dua").length,
        recipesSaved:   bookmarks.filter(b => b.type === "recipe").length,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const initials = session.user.name
    ?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) ?? "U";

  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-16 py-10 max-w-2xl mx-auto flex flex-col gap-6">

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="rounded-3xl p-[1.5px]"
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      >
        <div className="rounded-[22px] px-6 py-6 bg-white dark:bg-slate-900 flex items-center gap-5">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white text-xl font-black shadow-md"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            {initials}
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h1
              className={cn("text-xl font-black truncate", lang === "bn" ? "font-bn" : "font-heading")}
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {session.user.name}
            </h1>
            <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
            <span
              className={cn("mt-1 self-start text-[10px] font-semibold px-2.5 py-0.5 rounded-full text-white", lang === "bn" ? "font-bn" : "font-body")}
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              🌙 {t(uc.member, lang)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.05 }}
        className="rounded-3xl p-[1.5px]"
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      >
        <div className="rounded-[22px] px-6 py-5 bg-white dark:bg-slate-900 flex flex-col gap-4">
          <h2
            className={cn("text-base font-black", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            📊 {t(uc.stats, lang)}
          </h2>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-24 rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatBox icon="🎯" label={uc.goalsSet}       value={stats.goalsSet}       lang={lang} delay={0.1}  />
              <StatBox icon="✅" label={uc.goalsCompleted} value={stats.goalsCompleted} lang={lang} delay={0.15} />
              <StatBox icon="🔖" label={uc.duasSaved}      value={stats.duasSaved}      lang={lang} delay={0.2}  />
              <StatBox icon="🍽️" label={uc.recipesSaved}  value={stats.recipesSaved}   lang={lang} delay={0.25} />
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
        className="rounded-3xl p-[1.5px]"
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      >
        <div className="rounded-[22px] px-6 py-5 bg-white dark:bg-slate-900 flex flex-col gap-4">
          <h2
            className={cn("text-base font-black", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🔗 {t(uc.quickLinks, lang)}
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/dashboard", label: uc.goDashboard, icon: "📊" },
              { href: "/duas",      label: uc.goDuas,      icon: "🤲" },
              { href: "/recipes",   label: uc.goRecipes,   icon: "🍽️" },
            ].map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all",
                  "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:text-white",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
                onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
              >
                <span>{icon}</span>
                <span>{t(label, lang)}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

    </main>
  );
}