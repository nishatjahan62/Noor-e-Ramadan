"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { t, timings as tc } from "@/data/contents";
import { districts } from "@/data/districts";
import { getTimingsForDistrict } from "@/data/timings";
import DistrictSelector from "@/components/DistrictSelector";
import { cn } from "@/lib/utils";
import {
  getTodayIdx,
  RAMADAN_START,
  TodayCard,
  TomorrowCard,
  CenterDivider,
  SalahCard,
  CurrentTimeBadge,
} from "@/lib/Helpers/timingsHelper";

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
              <a href="/timings" className={cn(
                "text-center text-xs font-semibold py-1.5 text-primary hover:text-secondary transition-colors hover:underline underline-offset-2",
                lang === "bn" ? "font-bn" : "font-body"
              )}>
                {t(tc.viewAll, lang)} →
              </a>
            </div>

            <CenterDivider />

            <div className="flex-1 flex flex-col gap-2">
              <SalahCard timings={allTimings[todayIdx]} lang={lang} />
              <a href="/namaz" className={cn(
                "text-center text-xs font-semibold py-1.5 text-primary hover:text-secondary transition-colors hover:underline underline-offset-2",
                lang === "bn" ? "font-bn" : "font-body"
              )}>
                {t(tc.viewAllNamaz, lang)} →
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}