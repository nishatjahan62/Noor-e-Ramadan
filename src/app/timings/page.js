"use client";

import { useState, useEffect, useRef } from "react";
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

function getGregorianDate(dayIndex, lang) {
  const date = new Date(RAMADAN_START);
  date.setDate(date.getDate() + dayIndex);
  return date.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-BD", {
    month: "short", day: "numeric",
  });
}

function toBn(str) {
  return String(str).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

function TimingColumn({ rows, startIdx, todayIdx, lang }) {
  return (
    <div className="flex-1 overflow-hidden">
      {/* Column header */}
      <div className="grid grid-cols-4 px-4 py-1.5 bg-slate-800/60">
        {[
          t(tc.day, lang),
          t(tc.date, lang),
          t(tc.sehri, lang),
          t(tc.iftar, lang),
        ].map((label, i) => (
          <span key={i} className={cn(
            "text-[10px] font-bold uppercase tracking-wider text-center text-amber-400",
            lang === "bn" ? "font-bn" : ""
          )}>
            {label}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-800/40">
        {rows.map((row, i) => {
          const globalIdx = startIdx + i;
          const rojaNum   = globalIdx + 1;
          const isToday   = globalIdx === todayIdx;
          const isPast    = todayIdx !== null && globalIdx < todayIdx;

          return (
            <motion.div
              key={globalIdx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: globalIdx * 0.012 }}
              className={cn(
                "grid grid-cols-4 px-3 py-3 items-center relative transition-all duration-200 group cursor-pointer bg-slate-900",
                isToday && "bg-slate-800/80",
                isPast && "opacity-40",
                !isToday && !isPast && "hover:bg-slate-800/60"
              )}
            >
              {/* Hover left glow bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-linear-to-b from-amber-400 to-orange-400" />

              {/* Today left bar */}
              {isToday && (
                <motion.div
                  layoutId={`active-bar-${startIdx}`}
                  className="absolute left-0 top-1 bottom-1 w-1 rounded-r-full bg-linear-to-b from-amber-400 to-orange-500"
                />
              )}

              {/* Roja number */}
              <div className="flex justify-center">
                <span className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-xl text-xs font-black transition-transform duration-200 group-hover:scale-110",
                  isToday
                    ? "text-white shadow-md scale-110 bg-gradient-to-br from-amber-400 to-orange-500"
                    : isPast
                    ? "text-gray-600"
                    : "bg-amber-900/30 text-amber-400"
                )}>
                  {lang === "bn" ? toBn(rojaNum) : rojaNum}
                </span>
              </div>

              {/* Date */}
              <span className={cn(
                "text-[14px] text-center tabular-nums transition-colors duration-200",
                isToday ? "font-bold text-white" : isPast ? "text-gray-600" : "font-medium text-gray-300 group-hover:text-white"
              )}>
                {getGregorianDate(globalIdx, lang)}
              </span>

              {/* Sehri */}
              <div className="flex items-center justify-center gap-1">
                <span className="text-base">🌙</span>
                <span className={cn(
                  "text-[14px] tabular-nums transition-colors duration-200",
                  isToday ? "font-black text-emerald-400" : isPast ? "text-gray-600" : "font-medium text-gray-300 group-hover:text-emerald-400"
                )}>
                  {lang === "bn" ? toBn(row.sehri) : row.sehri}
                </span>
              </div>

              {/* Iftar */}
              <div className="flex items-center justify-center gap-1">
                <span className="text-base">🌅</span>
                <span className={cn(
                  "text-[14px] tabular-nums transition-colors duration-200",
                  isToday ? "font-black text-amber-400" : isPast ? "text-gray-600" : "font-medium text-gray-300 group-hover:text-amber-400"
                )}>
                  {lang === "bn" ? toBn(row.iftar) : row.iftar}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function TimingsPage() {
  const { lang }                    = useLang();
  const [districtId, setDistrictId] = useState("chittagong");
  const [, forceUpdate]             = useState(0);
  const todayRowRef                 = useRef(null);

  useEffect(() => {
    const id = setInterval(() => forceUpdate(n => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (todayRowRef.current) {
      todayRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [districtId]);

  const district   = districts.find(d => d.id === districtId);
  const allTimings = getTimingsForDistrict(
    district?.lat ?? 22.3569,
    district?.lng ?? 91.7832
  );
  const todayIdx = getTodayIdx();

  const firstHalf  = allTimings.slice(0, 15);
  const secondHalf = allTimings.slice(15, 30);

  return (
    <main className="min-h-screen bg-linear-to-b from-emerald-50/40 via-white to-amber-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-6 pb-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <p className={cn(
            "text-xs text-black font-semibold uppercase tracking-widest dark:text-white mb-2",
            lang === "bn" ? "font-bn" : ""
          )}>
            {t(tc.ramadanYear2, lang)}
          </p>
          <h1
            className={cn("text-3xl md:text-4xl font-black mb-3", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t(tc.scheduleTitle, lang)}
          </h1>
          <p className={cn("text-sm text-gray-400 max-w-md mx-auto", lang === "bn" ? "font-bn" : "")}>
            {t(tc.pageSubtitle, lang)}
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6"
        >
          <span className={cn(
            "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/10 dark:border-primary/30",
            lang === "bn" ? "font-bn" : ""
          )}>
            📍 {lang === "bn" ? district?.bn : district?.en}
          </span>
          <DistrictSelector selected={districtId} onSelect={setDistrictId} />
        </motion.div>

        {/* Outer card shell */}
        <motion.div
          key={`table-${districtId}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="overflow-hidden rounded-3xl border border-emerald-100/80 dark:border-slate-700/40 shadow-xl"
        >

          {/* Table top header */}
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b bg-gradient-to-r from-emerald-50/90 via-white/80 to-amber-50/90 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/90">
            <div>
              <h3 className={cn("text-base font-black text-secondary", lang === "bn" ? "font-bn" : "")}>
                {t(tc.completeSchedule, lang)}
              </h3>
              <p className={cn("text-[11px] text-black dark:text-white mt-0.5", lang === "bn" ? "font-bn" : "")}>
                {t(tc.thirtyDays, lang)}
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className={cn("flex items-center gap-1.5 text-[14px] text-black dark:text-white", lang === "bn" ? "font-bn" : "")}>
                <span className="w-2.5 h-2.5 rounded-full bg-linear-to-br from-primary to-secondary inline-block" />
                {t(tc.today, lang)}
              </span>
              <span className="flex items-center gap-1 text-[14px] text-black dark:text-white">
                🌙 {t(tc.sehri, lang)}
              </span>
              <span className="flex items-center gap-1 text-[14px] text-black dark:text-white">
                🌅 {t(tc.iftar, lang)}
              </span>
            </div>
          </div>

          {/* Desktop: 2 column layout */}
          <div className="hidden md:flex gap-0 divide-x divide-emerald-100/60 dark:divide-slate-700/40 dark:bg-slate-900/50">
            <div className="flex-1">
              <TimingColumn
                rows={firstHalf}
                startIdx={0}
                todayIdx={todayIdx}
                lang={lang}
                isSecond={false}
              />
            </div>
            <div className="flex-1">
              <TimingColumn
                rows={secondHalf}
                startIdx={15}
                todayIdx={todayIdx}
                lang={lang}
                isSecond={true}
              />
            </div>
          </div>

          {/* Mobile: single column */}
          <div className="md:hidden dark:bg-slate-900/50">
            <div className="grid grid-cols-4 bg-emerald-50/80 dark:bg-slate-800/60 px-3 py-2.5 border-b border-emerald-100/60 dark:border-slate-700/40">
              {[
                t(tc.day, lang),
                t(tc.date, lang),
                t(tc.sehri, lang),
                t(tc.iftar, lang),
              ].map((label, i) => (
                <span key={i} className={cn(
                  "text-[10px] font-bold uppercase tracking-wider text-center text-emerald-700 dark:text-emerald-400",
                  lang === "bn" ? "font-bn" : ""
                )}>
                  {label}
                </span>
              ))}
            </div>
            <div className="divide-y divide-emerald-50/80 dark:divide-slate-800/40">
              {allTimings.map((row, i) => {
                const rojaNum = i + 1;
                const isToday = i === todayIdx;
                const isPast  = todayIdx !== null && i < todayIdx;
                const isSecondHalf = i >= 15;

                return (
                  <div
                    key={i}
                    ref={isToday ? todayRowRef : null}
                    className={cn(
                      "grid grid-cols-4 px-3 py-3 items-center relative transition-colors",
                      isPast && "opacity-40",
                      isToday && (isSecondHalf ? "bg-amber-50/80 dark:bg-amber-900/10" : "bg-emerald-50/80 dark:bg-emerald-900/20")
                    )}
                  >
                    {isToday && (
                      <div className={cn(
                        "absolute left-0 top-1 bottom-1 w-1 rounded-r-full",
                        isSecondHalf
                          ? "bg-gradient-to-b from-amber-400 to-secondary"
                          : "bg-gradient-to-b from-primary to-secondary"
                      )} />
                    )}
                    <div className="flex justify-center">
                      <span className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-xl text-xs font-black",
                        isToday
                          ? cn("text-white shadow-md", isSecondHalf ? "bg-gradient-to-br from-amber-400 to-secondary" : "bg-gradient-to-br from-primary to-secondary")
                          : isPast
                          ? "text-gray-300 dark:text-gray-600"
                          : isSecondHalf
                          ? "bg-amber-50 text-amber-700 dark:bg-slate-800 dark:text-amber-400"
                          : "bg-emerald-50 text-emerald-700 dark:bg-slate-800 dark:text-emerald-400"
                      )}>
                        {lang === "bn" ? toBn(rojaNum) : rojaNum}
                      </span>
                    </div>
                    <span className={cn(
                      "text-[14px] text-center",
                      isToday ? "font-bold text-gray-700 dark:text-gray-200" : "text-gray-400"
                    )}>
                      {getGregorianDate(i, lang)}
                    </span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm">🌙</span>
                      <span className={cn("text-xs tabular-nums", isToday ? "font-black text-primary" : "text-gray-600 dark:text-gray-400")}>
                        {lang === "bn" ? toBn(row.sehri) : row.sehri}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm">🌅</span>
                      <span className={cn("text-xs tabular-nums", isToday ? "font-black text-secondary" : "text-secondary/60")}>
                        {lang === "bn" ? toBn(row.iftar) : row.iftar}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 text-center border-t border-emerald-100/60 dark:border-slate-700/40 bg-emerald-50/40 dark:bg-slate-800/20">
            <p className={cn("text-[10px] text-gray-400", lang === "bn" ? "font-bn" : "")}>
              ⚠️ {t(tc.disclaimer, lang)}
            </p>
          </div>

        </motion.div>
      </div>
    </main>
  );
}