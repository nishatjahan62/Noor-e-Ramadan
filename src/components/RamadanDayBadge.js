"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { t, banner } from "@/data/contents";
import { useLang } from "@/context/LangContext";

const RAMADAN_START = new Date("2026-02-18T00:00:00");
const RAMADAN_TOTAL = 30;
const MAGHRIB_HOUR  = 18;

const RAMADAN_END = new Date(RAMADAN_START);
RAMADAN_END.setDate(RAMADAN_END.getDate() + 29);
RAMADAN_END.setHours(MAGHRIB_HOUR, 0, 0, 0);

function getRojaInfo() {
  const now  = new Date();
  const hour = now.getHours();
  const islamicDate = new Date(now);
  if (hour < MAGHRIB_HOUR) islamicDate.setDate(islamicDate.getDate() - 1);
  islamicDate.setHours(0, 0, 0, 0);
  const start = new Date(RAMADAN_START);
  start.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((islamicDate - start) / 86_400_000);
  if (diffDays < 0)              return { type: "countdown", daysLeft: Math.abs(diffDays) };
  if (diffDays >= RAMADAN_TOTAL) return { type: "ended" };
  return { type: "active", rojaNumber: diffDays + 1 };
}

function calcTime() {
  const now = new Date();
  const hour = now.getHours();
  const todayMaghrib = new Date(now);
  if (hour < MAGHRIB_HOUR) todayMaghrib.setDate(todayMaghrib.getDate() - 1);
  todayMaghrib.setHours(MAGHRIB_HOUR, 0, 0, 0);
  const elapsed = now - todayMaghrib;
  if (elapsed <= 0) return { h: 0, m: 0, s: 0 };
  return {
    h: Math.floor(elapsed / 3_600_000),
    m: Math.floor((elapsed % 3_600_000) / 60_000),
    s: Math.floor((elapsed % 60_000)    / 1_000),
  };
}

function getHijriDate(lang) {
  try {
    const locale = lang === "bn" ? "bn-u-ca-islamic" : "en-u-ca-islamic";
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(new Date());
  } catch { return ""; }
}

function toBn(n) { return String(n).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]); }
function num(n, lang) { return lang === "bn" ? toBn(n) : String(n); }
function pad2(n) { return String(n).padStart(2, "0"); }

function TimeBox({ value, label, lang }) {
  const display = lang === "bn" ? toBn(pad2(value)) : pad2(value);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-11 rounded-xl bg-gradient-to-b from-emerald-50 to-white
        dark:from-slate-800 dark:to-slate-900
        border border-emerald-100 dark:border-emerald-900
        py-1.5 flex items-center justify-center shadow-inner overflow-hidden"
      >
        <motion.span
          key={value}
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 24 }}
          className="text-base font-black text-secondary tabular-nums leading-none font-body"
        >
          {display}
        </motion.span>
      </div>
      <span className={`text-[9px] text-gray-400 font-medium uppercase tracking-wide ${lang === "bn" ? "font-bn" : "font-body"}`}>
        {label}
      </span>
    </div>
  );
}

function Card({ children, delay = 0, glow = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 24, delay }}
      className="relative flex flex-col gap-1.5 rounded-2xl border border-emerald-100
        bg-white px-4 py-3 shadow-lg w-full
        dark:bg-slate-900/70 dark:border-emerald-800/30"
    >
      {glow && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.07, 0.2] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl bg-emerald-400 blur-xl pointer-events-none"
        />
      )}
      {children}
    </motion.div>
  );
}

function ProgressBar({ value, total, delay = 0.5 }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="mt-0.5 h-1.5 w-full rounded-full bg-emerald-100 dark:bg-slate-700 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
      />
    </div>
  );
}

export default function RamadanBadge() {
  const { lang } = useLang();
  const [info]   = useState(() => getRojaInfo());
  const hijriDay = getHijriDate(lang);

  const rojaNumber = info.type === "active" ? info.rojaNumber : 0;
  const completed  = Math.max(0, rojaNumber - 1);

  const [countUp, setCountUp] = useState(0);
  useEffect(() => {
    if (info.type !== "active") return;
    let c = 0;
    const step = () => {
      c += 1;
      setCountUp(c);
      if (c < completed) setTimeout(step, 80);
    };
    const id = setTimeout(step, 600);
    return () => clearTimeout(id);
  }, []);

  const [timer, setTimer] = useState(() => calcTime());
  useEffect(() => {
    const id = setInterval(() => setTimer(calcTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const mobileBadge = (() => {
    if (info.type === "active") {
      const label = lang === "bn"
        ? `আজ ${num(info.rojaNumber, lang)}${t(banner.badge.activeUnit, lang)}`
        : `${t(banner.badge.active, lang)} ${num(info.rojaNumber, lang)}`;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.35 }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.08, 0.25] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-2xl bg-secondary blur-xl"
          />
          <div className="relative flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-lg dark:bg-slate-900/70 dark:border-secondary/25">
            <motion.div
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow"
            >
              <span className="text-lg font-black text-white font-body">{info.rojaNumber}</span>
            </motion.div>
            <div className="flex flex-col gap-0.5">
              <span className={`text-sm font-bold text-secondary ${lang === "bn" ? "font-bn" : "font-body"}`}>{label}</span>
              <span className={`text-xs font-medium text-primary ${lang === "bn" ? "font-bn" : "font-body"}`}>{t(banner.badge.ongoing, lang)}</span>
            </div>
          </div>
        </motion.div>
      );
    }
    if (info.type === "countdown") {
      const days  = num(info.daysLeft, lang);
      const label = lang === "bn"
        ? `রমজান শুরু হতে আর ${days} ${t(banner.badge.countdown, lang)}`
        : `${days} ${t(banner.badge.countdown, lang)}`;
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-2.5 shadow-md dark:bg-slate-900/70 dark:border-primary/20"
        >
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}>🌙</motion.span>
          <span className={`text-sm font-semibold text-primary ${lang === "bn" ? "font-bn" : "font-body"}`}>{label}</span>
        </motion.div>
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="rounded-2xl border border-primary/25 bg-white/70 px-4 py-2.5 backdrop-blur-md dark:bg-slate-900/70"
      >
        <span className={`text-sm font-semibold text-primary ${lang === "bn" ? "font-bn" : "font-body"}`}>{t(banner.badge.ended, lang)}</span>
      </motion.div>
    );
  })();

  const desktopCards = (
    <div className="flex flex-col gap-3 w-full">

      <Card delay={0.2} glow={info.type === "active"}>
        <div className="flex items-center gap-3">
          <motion.div
            animate={info.type === "active" ? { rotate: [0, 3, -3, 0] } : {}}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow"
          >
            <span className="text-xl font-black text-white tabular-nums font-body">
              {info.type === "active" ? num(rojaNumber, lang) : "–"}
            </span>
          </motion.div>
          <div className="flex-1 flex flex-col gap-1">
            <span className={`text-xs text-gray-500 dark:text-gray-400 ${lang === "bn" ? "font-bn" : "font-body"}`}>
              {t(banner.badge.card1.sub, lang)}
            </span>
            {info.type === "active" && (
              <ProgressBar value={rojaNumber} total={RAMADAN_TOTAL} delay={0.6} />
            )}
          </div>
        </div>
      </Card>

      <Card delay={0.35}>
        <div className="flex items-baseline gap-2">
          <span className={`text-base font-bold text-primary ${lang === "bn" ? "font-bn" : "font-body"}`}>{hijriDay}</span>
          <span className={`text-xs font-semibold text-secondary ${lang === "bn" ? "font-bn" : "font-body"}`}>{t(banner.badge.card2.year, lang)}</span>
        </div>
        <div className="mt-0.5 rounded-xl bg-emerald-50 dark:bg-slate-800/60 px-3 py-2">
          <p className="text-sm font-bold text-right font-arabic leading-relaxed text-secondary mb-1">
            {banner.badge.card2.duaArabic}
          </p>
          <p className={`text-xs italic text-primary ${lang === "bn" ? "font-bn" : "font-body"}`}>
            {t(banner.badge.card2.dua, lang)}
          </p>
        </div>
      </Card>

      <Card delay={0.5}>
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-1">
            <TimeBox value={rojaNumber} label={lang === "bn" ? "রোজা"    : "roja"} lang={lang} />
            <span className="text-secondary/50 font-black text-lg mb-5 font-body">:</span>
            <TimeBox value={timer.h}    label={lang === "bn" ? "ঘণ্টা"   : "hrs"}  lang={lang} />
            <span className="text-secondary/50 font-black text-lg mb-5 font-body">:</span>
            <TimeBox value={timer.m}    label={lang === "bn" ? "মিনিট"   : "min"}  lang={lang} />
            <span className="text-secondary/50 font-black text-lg mb-5 font-body">:</span>
            <TimeBox value={timer.s}    label={lang === "bn" ? "সেকেন্ড" : "sec"}  lang={lang} />
          </div>
          <div className="flex flex-wrap justify-end gap-[3px] max-w-[72px]">
            {Array.from({ length: RAMADAN_TOTAL }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: i < countUp ? 1 : 0.5, opacity: i < countUp ? 1 : 0.2 }}
                transition={{ delay: 0.6 + i * 0.04, type: "spring", stiffness: 400 }}
                className="w-2 h-2 rounded-full"
                style={{
                  background: i < countUp
                    ? "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                    : "rgba(0,0,0,0.12)",
                }}
              />
            ))}
          </div>
        </div>
        <ProgressBar value={countUp} total={RAMADAN_TOTAL} delay={0.6} />
      </Card>

    </div>
  );

  return (
    <>
      <div className="md:hidden">{mobileBadge}</div>
      <div className="hidden md:block w-full">{desktopCards}</div>
    </>
  );
}