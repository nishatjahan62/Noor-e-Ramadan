"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { t, banner } from "@/data/contents";
import { useLang } from "@/context/LangContext";

const RAMADAN_START = new Date("2026-02-18T00:00:00");
const RAMADAN_TOTAL = 30;

function getRojaInfo() {
  const diffDays = Math.floor((new Date() - RAMADAN_START) / 86_400_000);
  if (diffDays < 0)              return { type: "countdown", daysLeft: Math.abs(diffDays) };
  if (diffDays >= RAMADAN_TOTAL) return { type: "ended" };
  return { type: "active", rojaNumber: diffDays + 1 };
}

function toBn(n) {
  return String(n).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

export default function RamadanBadge() {
  const { lang } = useLang();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setInfo(getRojaInfo());
    const id = setInterval(() => setInfo(getRojaInfo()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!info) return null;

  // ── ACTIVE ──
  if (info.type === "active") {
    const num   = lang === "bn" ? toBn(info.rojaNumber) : info.rojaNumber;
    const label = lang === "bn"
      ? `আজ ${num}${t(banner.badge.activeUnit, lang)}`
      : `${t(banner.badge.active, lang)} ${num}`;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.35 }}
        className="relative"
      >
        {/* glow */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.08, 0.25] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl bg-secondary blur-xl"
        />

        <div className="relative flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-lg dark:bg-slate-900/70 dark:border-secondary/25">
          {/* roja number */}
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow"
          >
            <span className="text-lg font-black text-white">{info.rojaNumber}</span>
          </motion.div>

          {/* labels */}
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-secondary">{label}</span>
            <span className="text-xs font-medium text-primary">
              {t(banner.badge.ongoing, lang)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── COUNTDOWN ──
  if (info.type === "countdown") {
    const days  = lang === "bn" ? toBn(info.daysLeft) : info.daysLeft;
    const label = lang === "bn"
      ? `রমজান শুরু হতে আর ${days} দিন বাকি`
      : `${days} ${t(banner.badge.countdown, lang)}`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-2.5 shadow-md dark:bg-slate-900/70 dark:border-primary/20"
      >
        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          🌙
        </motion.span>
        <span className="text-sm font-semibold text-primary">{label}</span>
      </motion.div>
    );
  }

  // ── ENDED ──
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="rounded-2xl border border-primary/25 bg-white/70 px-4 py-2.5 backdrop-blur-md dark:bg-slate-900/70"
    >
      <span className="text-sm font-semibold text-primary">{t(banner.badge.ended, lang)}</span>
    </motion.div>
  );
}