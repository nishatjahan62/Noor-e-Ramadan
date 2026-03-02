"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { t, timings as tc } from "@/data/contents";
import { districts } from "@/data/districts";
import { getTimingsForDistrict } from "@/data/timings";
import DistrictSelector from "@/components/DistrictSelector";
import { cn } from "@/lib/utils";

const RAMADAN_START = new Date("2026-02-18T00:00:00");
const MAGHRIB_HOUR  = 18;

function getTodayIdx() {
  const now = new Date();
  const islamicDate = new Date(now);
  if (now.getHours() < MAGHRIB_HOUR) islamicDate.setDate(islamicDate.getDate() - 1);
  islamicDate.setHours(0, 0, 0, 0);
  const start = new Date(RAMADAN_START);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((islamicDate - start) / 86_400_000);
  if (diff < 0 || diff >= 30) return null;
  return diff;
}

function toBn(str) {
  return String(str).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

// Animated gradient border wrapper
function AnimatedBorderCard({ children, isToday, className }) {
  return (
    <div className={cn("relative rounded-3xl p-[2px] flex-1 min-w-0", className)}
      style={{
        background: isToday
          ? "linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-primary))"
          : "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
        backgroundSize: "200% 200%",
        animation: "gradientSpin 3s linear infinite",
      }}
    >
      {children}
    </div>
  );
}

function TimeRow({ emoji, label, time, accent, lang }) {
  return (
    <div className={cn(
      "flex items-center justify-between rounded-2xl px-4 py-3",
      accent ? "bg-secondary/10 dark:bg-secondary/20" : "bg-primary/5 dark:bg-primary/10"
    )}>
      <div className="flex items-center gap-2.5">
        <span className="text-xl">{emoji}</span>
        <span className={cn(
          "text-xs font-semibold",
          accent ? "text-secondary" : "text-primary",
          lang === "bn" ? "font-bn" : ""
        )}>
          {label}
        </span>
      </div>
      <span className={cn(
        "text-lg font-black tabular-nums tracking-tight",
        accent ? "text-secondary" : "text-primary"
      )}>
        {lang === "bn" ? toBn(time) : time}
      </span>
    </div>
  );
}

function TodayCard({ rojaNum, sehri, iftar, lang }) {
  return (
    <AnimatedBorderCard isToday={true}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
        whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
        className="relative rounded-[22px] p-5 flex flex-col gap-3 overflow-hidden cursor-pointer h-full
          bg-white dark:bg-slate-900"
      >
        {/* ⭐ Star pin — top right corner */}
        <div className="absolute top-3 right-3 z-10">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex items-center justify-center w-7 h-7 rounded-full shadow-md"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            <span className="text-white text-xs">⭐</span>
          </motion.div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-0.5 pr-8">
          <span
            className={cn("text-sm font-black tracking-wide", lang === "bn" ? "font-bn" : "")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t(tc.today, lang)}
          </span>
          <span className={cn("text-xs text-gray-400", lang === "bn" ? "font-bn" : "")}>
            {t(tc.roja, lang)} {lang === "bn" ? toBn(rojaNum) : rojaNum}
          </span>
        </div>

        {/* Times */}
        <div className="flex flex-col gap-2">
          <TimeRow emoji="🌙" label={t(tc.sehri, lang)} time={sehri} accent={false} lang={lang} />
          <TimeRow emoji="🌅" label={t(tc.iftar, lang)} time={iftar} accent={true}  lang={lang} />
        </div>
      </motion.div>
    </AnimatedBorderCard>
  );
}

function TomorrowCard({ rojaNum, sehri, iftar, lang }) {
  return (
    <AnimatedBorderCard isToday={false}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.2 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
        className="relative rounded-[22px] p-5 flex flex-col gap-3 overflow-hidden cursor-pointer h-full
          bg-white dark:bg-slate-900"
      >
        {/* Header */}
        <div className="flex flex-col gap-0.5">
          <span className={cn("text-sm font-black text-gray-500 dark:text-gray-400 tracking-wide", lang === "bn" ? "font-bn" : "")}>
            {t(tc.tomorrow, lang)}
          </span>
          <span className={cn("text-xs text-gray-400", lang === "bn" ? "font-bn" : "")}>
            {t(tc.roja, lang)} {lang === "bn" ? toBn(rojaNum) : rojaNum}
          </span>
        </div>

        {/* Times */}
        <div className="flex flex-col gap-2">
          <TimeRow emoji="🌙" label={t(tc.sehri, lang)} time={sehri} accent={false} lang={lang} />
          <TimeRow emoji="🌅" label={t(tc.iftar, lang)} time={iftar} accent={true}  lang={lang} />
        </div>
      </motion.div>
    </AnimatedBorderCard>
  );
}

export default function TimingsCards() {
  const { lang }                    = useLang();
  const [districtId, setDistrictId] = useState("chittagong");
  const [, forceUpdate]             = useState(0);

  useEffect(() => {
    const id = setInterval(() => forceUpdate(n => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const district   = districts.find(d => d.id === districtId);
  const allTimings = getTimingsForDistrict(
    district?.lat ?? 22.3569,
    district?.lng ?? 91.7832
  );

  const todayIdx    = getTodayIdx();
  const tomorrowIdx = todayIdx !== null && todayIdx + 1 < 30 ? todayIdx + 1 : null;

  if (todayIdx === null) {
    return (
      <section className="py-12 px-4 text-center">
        <p className={cn("text-gray-400 text-sm", lang === "bn" ? "font-bn" : "")}>
          {new Date() < RAMADAN_START ? t(tc.notStarted, lang) : t(tc.ramadanOver, lang)}
        </p>
      </section>
    );
  }

  return (
    <>
      {/* Animated border keyframe */}
      <style>{`
        @keyframes gradientSpin {
          0%   { background-position: 0% 50%;   }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%;   }
        }
      `}</style>

      <section className="py-14 px-4">
        <div className="mx-auto max-w-2xl">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <p className={cn("text-xs text-shadow-black dark:text-white font-medium mb-1 tracking-widest uppercase", lang === "bn" ? "font-bn" : "")}>
                {lang === "bn" ? "সেহরি ও ইফতার" : "Sehri & Iftar"}
              </p>
              <h2
                className={cn("text-3xl font-black leading-tight", lang === "bn" ? "font-bn" : "font-heading")}
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {lang === "bn" ? "আজকের সময়সূচি" : "Today's Timings"}
              </h2>
              <p className={cn("text-bse text-secondary mt-1.5 flex items-center gap-1", lang === "bn" ? "font-bn" : "")}>
                <span>📍</span>
                <span>{lang === "bn" ? district?.bn : district?.en}</span>
                <span className="mx-1 text-gray-300">·</span>
                <span>{lang === "bn" ? "রমজান ১৪৪৭" : "Ramadan 1447 AH"}</span>
              </p>
            </div>
            <DistrictSelector selected={districtId} onSelect={setDistrictId} />
          </motion.div>

          {/* Cards */}
          <motion.div
            key={districtId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-3"
          >
            <TodayCard
              rojaNum={todayIdx + 1}
              sehri={allTimings[todayIdx].sehri}
              iftar={allTimings[todayIdx].iftar}
              lang={lang}
            />
            {tomorrowIdx !== null && (
              <TomorrowCard
                rojaNum={tomorrowIdx + 1}
                sehri={allTimings[tomorrowIdx].sehri}
                iftar={allTimings[tomorrowIdx].iftar}
                lang={lang}
              />
            )}
          </motion.div>

          {/* View all */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 text-center"
          >
            
            <a  href="/timings"
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-semibold",
                "text-primary hover:text-secondary transition-colors hover:underline underline-offset-2",
                lang === "bn" ? "font-bn" : ""
              )}
            >
              {t(tc.viewAll, lang)} →
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}