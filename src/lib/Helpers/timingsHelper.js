"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { t, timings as tc } from "@/data/contents";
import useCurrentTime from "@/lib/useCurrentTime";

export { useCurrentTime };

export const RAMADAN_START = new Date("2026-02-18T00:00:00");
export const MAGHRIB_HOUR  = 18;

export function getTodayIdx() {
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

export function toBn(str) {
  return String(str).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}



export function AnimatedBorderCard({ children, isToday, className }) {
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

export function TimeRow({ emoji, label, time, accent, lang }) {
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

export function TodayCard({ rojaNum, sehri, iftar, lang }) {
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

export function TomorrowCard({ rojaNum, sehri, iftar, lang }) {
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

export function CenterDivider() {
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

export function SalahCard({ timings, lang }) {
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

export function CurrentTimeBadge({ lang }) {
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