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

function useCurrentTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function AnimatedBorderCard({ children, isToday, className }) {
  return (
    <div
      className={cn("relative rounded-3xl p-[2px] min-w-0 h-full", className)}
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
      "flex flex-col lg:flex-row items-center lg:items-center lg:justify-between rounded-2xl px-4 py-3",
      accent ? "bg-secondary/10 dark:bg-secondary/20" : "bg-primary/5 dark:bg-primary/10"
    )}>
      <div className="flex items-center flex-col py-1 lg:py-0 lg:flex-row gap-0 lg:gap-2.5">
        <span className="text-xl">{emoji}</span>
        <span className={cn(
          "text-xs font-semibold",
          accent ? "text-secondary" : "text-primary",
          lang === "bn" ? "font-bn" : "font-body"
        )}>
          {label}
        </span>
      </div>
      <span className={cn(
        "text-lg font-black tabular-nums tracking-tight",
        accent ? "text-secondary" : "text-primary",
        lang === "bn" ? "font-bn" : "font-body"
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
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        className="relative rounded-[22px] p-5 flex flex-col gap-3 overflow-hidden cursor-pointer h-full bg-white dark:bg-slate-900"
      >
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

        <div className="flex flex-col gap-0.5 pr-8">
          <span
            className={cn("text-base font-black tracking-wide", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t(tc.today, lang)}
          </span>
          <span className={cn("text-sm font-semibold text-secondary", lang === "bn" ? "font-bn" : "font-body")}>
            {t(tc.roja, lang)} {lang === "bn" ? toBn(rojaNum) : rojaNum}
          </span>
        </div>

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
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        className="relative rounded-[22px] p-5 flex flex-col gap-3 overflow-hidden cursor-pointer h-full bg-white dark:bg-slate-900"
      >
        <div className="flex flex-col gap-0.5">
          <span className={cn("text-sm font-black text-gray-500 dark:text-gray-400 tracking-wide", lang === "bn" ? "font-bn" : "font-heading")}>
            {t(tc.tomorrow, lang)}
          </span>
          <span className={cn("text-xs text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
            {t(tc.roja, lang)} {lang === "bn" ? toBn(rojaNum) : rojaNum}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <TimeRow emoji="🌙" label={t(tc.sehri, lang)} time={sehri} accent={false} lang={lang} />
          <TimeRow emoji="🌅" label={t(tc.iftar, lang)} time={iftar} accent={true}  lang={lang} />
        </div>
      </motion.div>
    </AnimatedBorderCard>
  );
}

function CenterDivider() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-3">
      <motion.div
        animate={{ scaleY: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-px flex-1 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-amber-400 text-xs">✦</span>
        <span className="text-lg">🌙</span>
        <span className="text-amber-400 text-xs">✦</span>
      </motion.div>
      <motion.div
        animate={{ scaleY: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="w-px flex-1 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"
      />
    </div>
  );
}

function SalahCard({ timings, lang }) {
  const namazList = [
    { emoji: "🌤️", key: "fajr",    label: t(tc.fajr,    lang), time: timings.fajr,    accent: false },
    { emoji: "☀️",  key: "dhuhr",   label: t(tc.dhuhr,   lang), time: timings.dhuhr,   accent: false },
    { emoji: "🌤️", key: "asr",     label: t(tc.asr,     lang), time: timings.asr,     accent: true  },
    { emoji: "🌅",  key: "maghrib", label: t(tc.maghrib, lang), time: timings.maghrib, accent: true  },
  ];

  return (
    <AnimatedBorderCard isToday={false}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.15 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        className="relative rounded-[22px] p-5 flex flex-col gap-3 overflow-hidden cursor-pointer h-full bg-white dark:bg-slate-900"
      >
        <div className="flex flex-col gap-0.5">
          <span
            className={cn("text-base font-black tracking-wide", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t(tc.namaz, lang)}
          </span>
          <span className={cn("text-xs text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
            {t(tc.today, lang)}
          </span>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <div className="grid grid-cols-2 gap-2">
            {namazList.map(({ emoji, key, label, time, accent }) => (
              <div
                key={key}
                className={cn(
                  "flex flex-col lg:flex-row items-center justify-between px-3 py-2.5 rounded-2xl",
                  accent ? "bg-secondary/10 dark:bg-secondary/20" : "bg-primary/5 dark:bg-primary/10"
                )}
              >
                <div className="flex items-center flex-col py-2 lg:py-0 lg:flex-row">
                  <span className="text-base">{emoji}</span>
                  <span className={cn("text-xs font-semibold", accent ? "text-secondary" : "text-primary", lang === "bn" ? "font-bn" : "font-body")}>
                    {label}
                  </span>
                </div>
                <span className={cn("text-sm font-black tabular-nums", accent ? "text-secondary" : "text-primary", lang === "bn" ? "font-bn" : "font-body")}>
                  {lang === "bn" ? toBn(time) : time}
                </span>
              </div>
            ))}
          </div>

          {/* Isha */}
          <div className="flex flex-col items-center lg:flex-row justify-between px-3 py-2.5 rounded-2xl bg-primary/5 dark:bg-primary/10">
            <div className="flex items-center flex-col py-2 lg:py-0 lg:flex-row">
              <span className="text-base">🌙</span>
              <span className={cn("text-xs font-semibold text-primary", lang === "bn" ? "font-bn" : "font-body")}>
                {t(tc.isha, lang)}
              </span>
            </div>
            <span className={cn("text-sm font-black tabular-nums text-primary", lang === "bn" ? "font-bn" : "font-body")}>
              {lang === "bn" ? toBn(timings.isha) : timings.isha}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatedBorderCard>
  );
}

function CurrentTimeBadge({ lang }) {
  const now     = useCurrentTime();
  const timeStr = now.toLocaleTimeString("en-BD", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "Asia/Dhaka",
  });
  const dateStr = now.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-BD", {
    weekday: "long", day: "numeric", month: "long",
    timeZone: "Asia/Dhaka",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-0.5"
    >
      <span
        className={cn("text-2xl font-black tabular-nums tracking-tight", lang === "bn" ? "font-bn" : "font-body")}
        style={{
          background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {lang === "bn" ? toBn(timeStr) : timeStr}
      </span>
      <span className={cn("text-xs text-gray-500 dark:text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
        {dateStr}
      </span>
    </motion.div>
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
        <p className={cn("text-gray-400 text-sm", lang === "bn" ? "font-bn" : "font-body")}>
          {new Date() < RAMADAN_START ? t(tc.notStarted, lang) : t(tc.ramadanOver, lang)}
        </p>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @keyframes gradientSpin {
          0%   { background-position: 0% 50%;   }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%;   }
        }
      `}</style>

      <section className="pt-4 lg:pt-10 px-4 sm:px-10 md:px-16 lg:px-20">
        <div className="mx-auto">

          {/* Section heading */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.span
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block text-xl text-amber-400"
            >✦</motion.span>
            <p
              className={cn("text-lg tracking-[0.25em] uppercase text-center font-semibold", lang === "bn" ? "font-bn tracking-normal" : "font-heading")}
              style={{
                background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t(tc.heading, lang)}
            </p>
            <motion.span
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block text-amber-400 text-xl"
            >✦</motion.span>
          </div>

          {/* Header — 3 col */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid grid-cols-1 lg:grid-cols-3 items-center gap-4"
          >
            <div className="text-center lg:text-left">
              <p className={cn("text-xs dark:text-white font-medium mb-1 tracking-widest uppercase", lang === "bn" ? "font-bn" : "font-body")}>
                {t(tc.eyebrow, lang)}
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
                {t(tc.section, lang)}
              </h2>
              <p className={cn("text-base text-center lg:text-left text-secondary mt-1.5 flex items-center justify-center lg:justify-normal gap-1", lang === "bn" ? "font-bn" : "font-body")}>
                <span>📍</span>
                <span>{lang === "bn" ? district?.bn : district?.en}</span>
                <span className="mx-1 text-gray-300">·</span>
                <span>{t(tc.ramadanYear, lang)}</span>
              </p>
            </div>

            <div className="flex justify-center">
              <CurrentTimeBadge lang={lang} />
            </div>

            <div className="flex justify-end">
              <DistrictSelector selected={districtId} onSelect={setDistrictId} />
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            key={districtId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0"
          >
            <div className="flex-[2] flex flex-col gap-2">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 flex-1 items-stretch">
                <div className="flex-1">
                  <TodayCard
                    rojaNum={todayIdx + 1}
                    sehri={allTimings[todayIdx].sehri}
                    iftar={allTimings[todayIdx].iftar}
                    lang={lang}
                  />
                </div>
                {tomorrowIdx !== null && (
                  <div className="flex-1">
                    <TomorrowCard
                      rojaNum={tomorrowIdx + 1}
                      sehri={allTimings[tomorrowIdx].sehri}
                      iftar={allTimings[tomorrowIdx].iftar}
                      lang={lang}
                    />
                  </div>
                )}
              </div>
              
              <a  href="/timings"
                className={cn(
                  "text-center text-xs font-semibold py-1.5 text-primary hover:text-secondary transition-colors hover:underline underline-offset-2",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
              >
                {t(tc.viewAll, lang)} →
              </a>
            </div>

            <CenterDivider />

            <div className="flex-1 flex flex-col gap-2">
              <SalahCard timings={allTimings[todayIdx]} lang={lang} />
              
               <a href="/namaz"
                className={cn(
                  "text-center text-xs font-semibold py-1.5 text-primary hover:text-secondary transition-colors hover:underline underline-offset-2",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
              >
                {t(tc.viewAllNamaz, lang)} →
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}