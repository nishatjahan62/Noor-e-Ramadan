// app/duas/page.js
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { t, duas as dc } from "@/data/contents";
import { duas } from "@/data/duas";
import { useLang } from "@/context/LangContext";
import DuaCard from "@/components/DuaCards";

const CATEGORIES = ["all", "mercy", "forgiveness", "freedom", "iftar", "sehri", "lailatul", "tarawih", "tarawih_munajat", "jumuah", "protection"];

export default function DuasPage() {
  const { lang }                      = useLang();
  const [activeCategory, setCategory] = useState("all");
  const [search, setSearch]           = useState("");

  const filtered = duas.filter(d => {
    const matchCat    = activeCategory === "all" || d.category === activeCategory;
    const query       = search.toLowerCase();
    const matchSearch = !query
      || t(d.title, lang).toLowerCase().includes(query)
      || (d.arabic && d.arabic.toLowerCase().includes(query));
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen pt-6 pb-16 px-4">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.span
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block text-amber-400 text-xl"
            >✦</motion.span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl"
            >🤲</motion.span>
            <p
              className={cn("text-sm tracking-[0.25em] uppercase font-semibold", lang === "bn" ? "font-bn tracking-normal" : "")}
              style={{
                background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t(dc.eyebrow, lang)}
            </p>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="text-2xl"
            >🤲</motion.span>
            <motion.span
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block text-amber-400 text-xl"
            >✦</motion.span>
          </div>

          <h1
            className={cn("text-3xl md:text-4xl font-black mb-3", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t(dc.pageTitle, lang)}
          </h1>
          <p className={cn("text-sm text-gray-400 max-w-md mx-auto", lang === "bn" ? "font-bn" : "")}>
            {t(dc.pageSubtitle, lang)}
          </p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-400" />
            <span className="text-amber-400 text-xs">✦</span>
            <span className="h-px w-16 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400" />
            <span className="text-amber-400 text-xs">✦</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-emerald-400" />
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === "bn" ? "দোয়া খুঁজুন..." : "Search duas..."}
            className={cn(
              "w-full rounded-2xl border border-primary/30 dark:border-slate-700/60 px-4 py-3 text-sm outline-none",
              "bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200",
              "placeholder:text-gray-400 dark:placeholder:text-gray-600",
              "focus:ring-2 focus:ring-emerald-400/40 transition-all",
              lang === "bn" ? "font-bn" : ""
            )}
          />
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-2 flex-wrap mb-5"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                lang === "bn" ? "font-bn" : "",
                activeCategory === cat
                  ? "text-white shadow-md"
                  : "bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-emerald-100/60 dark:border-slate-700/40 hover:border-emerald-300"
              )}
              style={activeCategory === cat ? {
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              } : {}}
            >
              {cat === "all"
                ? (lang === "bn" ? "সব" : "All")
                : t(dc[cat] ?? { en: cat, bn: cat }, lang)
              }
            </button>
          ))}
        </motion.div>

        {/* Count */}
        <p className={cn("text-xs text-gray-400 mb-6", lang === "bn" ? "font-bn" : "")}>
          {lang === "bn" ? `${filtered.length}টি দোয়া` : `${filtered.length} duas`}
        </p>

        {/* Cards */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="not-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("text-center text-gray-400 py-16 text-sm", lang === "bn" ? "font-bn" : "")}
            >
              {lang === "bn" ? "কোনো দোয়া পাওয়া যায়নি" : "No duas found"}
            </motion.p>
          ) : (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((dua, i) => (
                <DuaCard
                  key={dua.id}
                  dua={dua}
                  index={i}
                  defaultOpen={dua.featured}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}