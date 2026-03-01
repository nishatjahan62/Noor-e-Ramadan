"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Config ──────────────────────────────────────────────
const RAMADAN_START = new Date("2026-02-18T00:00:00"); // 1st Roja
const RAMADAN_TOTAL = 30;

function getRojaInfo() {
  const now = new Date();
  const diffMs = now - RAMADAN_START;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    // Ramadan শুরু হয়নি
    const daysLeft = Math.abs(diffDays);
    return { type: "countdown", daysLeft };
  }

  if (diffDays >= RAMADAN_TOTAL) {
    // Ramadan শেষ
    return { type: "ended" };
  }

  // চলছে
  const rojaNumber = diffDays + 1;
  return { type: "active", rojaNumber };
}

// বাংলা সংখ্যা
function toBanglaNum(n) {
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n)
    .split("")
    .map((d) => bn[parseInt(d)] ?? d)
    .join("");
}

export default function RamadanBadge({ lang = "en" }) {
  const [info, setInfo] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setInfo(getRojaInfo());
    // প্রতি মিনিটে update (midnight crossover এর জন্য)
    const id = setInterval(() => setInfo(getRojaInfo()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!info) return null;

  // ── Active: আজ কত তম রোজা ──
  if (info.type === "active") {
    const num = lang === "bn" ? toBanglaNum(info.rojaNumber) : info.rojaNumber;
    const label =
      lang === "bn"
        ? `আজ ${num} তম রোজা`
        : `Today is Roja ${num}`;
    const sub =
      lang === "bn"
        ? `রমজান ২০২৬ চলছে • মোট ${toBanglaNum(RAMADAN_TOTAL)} দিন`
        : `Ramadan 2026 is ongoing • ${RAMADAN_TOTAL} days total`;

    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.6 }}
            className="relative inline-flex flex-col items-center gap-1"
          >
            {/* Glow ring */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.15, 0.4] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
              }}
            />

            {/* Badge */}
            <div
              className="relative flex flex-col items-center gap-0.5 rounded-3xl px-6 py-3 backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(5,150,105,0.14) 100%)",
                border: "1px solid rgba(245,158,11,0.35)",
                boxShadow:
                  "0 4px 24px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Number circle */}
              <motion.div
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="flex h-14 w-14 items-center justify-center rounded-full mb-1"
                style={{
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #059669 100%)",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.4)",
                }}
              >
                <span className="text-2xl font-black text-white leading-none">
                  {info.rojaNumber}
                </span>
              </motion.div>

              <span className="text-base font-bold text-amber-600 dark:text-amber-300">
                {label}
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 opacity-80">
                {sub}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // ── Countdown: Ramadan শুরু হয়নি ──
  if (info.type === "countdown") {
    const label =
      lang === "bn"
        ? `রমজান শুরু হতে আর ${toBanglaNum(info.daysLeft)} দিন বাকি`
        : `${info.daysLeft} days until Ramadan 2026`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 backdrop-blur-md"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,150,105,0.15) 0%, rgba(245,158,11,0.12) 100%)",
          border: "1px solid rgba(5,150,105,0.3)",
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-xl"
        >
          🌙
        </motion.span>
        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          {label}
        </span>
      </motion.div>
    );
  }

  // ── Ended ──
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 backdrop-blur-md"
      style={{
        background: "rgba(5,150,105,0.12)",
        border: "1px solid rgba(5,150,105,0.25)",
      }}
    >
      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
        {lang === "bn" ? "রমজান ২০২৬ সমাপ্ত — ঈদ মোবারক! 🎉" : "Ramadan 2026 Ended — Eid Mubarak! 🎉"}
      </span>
    </motion.div>
  );
}