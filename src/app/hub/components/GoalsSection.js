"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { t, user as uc } from "@/data/contents";

export default function GoalsSection({ lang }) {
  const [goals,   setGoals] = useState([]);
  const [input,   setInput] = useState("");
  const [loading, setLoad]  = useState(true);

  useEffect(() => {
    fetch("/api/goals")
      .then(r => r.json())
      .then(data => { setGoals(data.goals ?? []); setLoad(false); })
      .catch(() => setLoad(false));
  }, []);

  const addGoal = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const res  = await fetch("/api/goals", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setGoals(data.goals ?? []);
  };

  const toggleGoal = async (id) => {
    const res  = await fetch("/api/goals", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setGoals(data.goals ?? []);
  };

  const deleteGoal = async (id) => {
    const res  = await fetch("/api/goals", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setGoals(data.goals ?? []);
  };

  const doneCount = goals.filter(g => g.done).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
      className="rounded-3xl p-[1.5px] h-full"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
    >
      <div className="rounded-[22px] px-6 py-5 bg-white dark:bg-slate-900 flex flex-col gap-4 h-full">

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h2
              className={cn("text-base font-black", lang === "bn" ? "font-bn" : "font-heading")}
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              🎯 {t(uc.goalsTitle, lang)}
            </h2>
            {goals.length > 0 && (
              <span className={cn("text-[11px] text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
                {doneCount}/{goals.length} {t(uc.done, lang)}
              </span>
            )}
          </div>
          {goals.length > 0 && (
            <div className="relative w-10 h-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke="url(#goalGrad)" strokeWidth="3"
                  strokeDasharray={`${Math.round((doneCount / goals.length) * 94)} 94`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-secondary)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-primary">
                {Math.round((doneCount / goals.length) * 100)}%
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addGoal()}
            placeholder={t(uc.placeholder, lang)}
            className={cn(
              "flex-1 rounded-xl border border-primary/30 dark:border-slate-700 px-3 py-2 text-sm outline-none",
              "bg-emerald-50/50 dark:bg-slate-800 text-gray-700 dark:text-gray-200",
              "focus:ring-2 focus:ring-emerald-400/40 transition-all",
              lang === "bn" ? "font-bn" : "font-body"
            )}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addGoal}
            className={cn("px-4 py-2 rounded-xl text-xs font-bold text-white shrink-0", lang === "bn" ? "font-bn" : "font-body")}
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            {t(uc.add, lang)}
          </motion.button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2">
            {[1,2,3].map(i => (
              <div key={i} className="h-10 rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : goals.length === 0 ? (
          <p className={cn("text-center text-xs text-gray-400 py-4", lang === "bn" ? "font-bn" : "font-body")}>
            {t(uc.empty, lang)}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {goals.map(goal => (
                <motion.li
                  key={goal._id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors",
                    goal.done ? "bg-primary/5 dark:bg-primary/10" : "bg-gray-50 dark:bg-slate-800"
                  )}
                >
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleGoal(goal._id)}
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                      goal.done ? "border-primary bg-primary" : "border-gray-300 dark:border-slate-600"
                    )}
                  >
                    {goal.done && (
                      <motion.span
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="text-white text-[10px] font-black"
                      >✓</motion.span>
                    )}
                  </motion.button>
                  <span className={cn(
                    "flex-1 text-sm transition-all",
                    goal.done ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-200",
                    lang === "bn" ? "font-bn" : "font-body"
                  )}>
                    {goal.text}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => deleteGoal(goal._id)}
                    className="text-gray-300 hover:text-red-400 dark:text-slate-600 dark:hover:text-red-400 transition-colors text-xs"
                  >✕</motion.button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </motion.div>
  );
}