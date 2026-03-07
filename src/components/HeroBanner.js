"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { t, banner } from "@/data/contents";
import { useLang } from "@/context/LangContext";
import RamadanBadge from "@/components/RamadanDayBadge";

function DuaCard({ dua, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-3 text-center w-full"
    >
      {/* Title badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1"
      >
        <span className="text-secondary text-xs">✦</span>
        <span className={`text-xs font-semibold tracking-widest uppercase text-secondary ${lang === "bn" ? "font-bn" : "font-heading"}`}>
          {t(dua.title, lang)}
        </span>
        <span className="text-secondary text-xs">✦</span>
      </motion.div>

      {/* Arabic */}
      <motion.p
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="text-xl md:text-2xl lg:text-3xl font-bold font-arabic leading-loose text-secondary dark:text-secondary"
        style={{ direction: "rtl", textShadow: "0 0 32px rgba(245,158,11,0.2)" }}
      >
        {dua.arabic}
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25 }}
        className="h-px w-24 rounded-full bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
      />

      {/* Meaning */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`text-sm md:text-base leading-relaxed max-w-md text-primary/80 dark:text-primary/70 ${lang === "bn" ? "font-bn" : "font-body"}`}
      >
        {t(dua.meaning, lang)}
      </motion.p>

      {/* Source */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.38 }}
        className={`text-xs rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-primary font-medium ${lang === "bn" ? "font-bn" : "font-body"}`}
      >
        📖 {dua.source}
      </motion.span>
    </motion.div>
  );
}

export default function Banner() {
  const { lang }     = useLang();
  const [duaIndex, setDuaIndex] = useState(0);
  const intervalRef  = useRef(null);
  const duas         = [banner.sehri, banner.iftar];

  const restartInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDuaIndex(i => (i + 1) % duas.length);
    }, 6000);
  };

  useEffect(() => {
    restartInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      <Image src="/banner.jpg" alt="Ramadan Banner" fill priority className="object-cover object-center" />

      <div className="absolute inset-0 transition-all duration-500" style={{ background: "var(--banner-overlay)" }} />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-6xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex flex-col items-center gap-2 text-center"
          >
            <p className="text-2xl md:text-4xl font-bold font-arabic text-secondary">
              {t(banner.arabicTitle, lang)}
            </p>

            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight ${lang === "bn" ? "font-bn" : "font-heading"}`}
              style={{
                background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t(banner.heading, lang)}
            </h1>

            <p className={`text-sm md:text-base tracking-widest uppercase text-black dark:text-white ${lang === "bn" ? "font-bn" : "font-body"}`}>
              {t(banner.subheading, lang)}
            </p>
          </motion.div>

          {/* Badge + Dua grid */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-10">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full md:w-auto flex justify-center md:justify-start md:pt-2 shrink-0"
            >
              <RamadanBadge />
            </motion.div>

            <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
            <div className="block md:hidden w-24 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex-1 w-full max-w-xl"
            >
              {/* Dots */}
              <div className="flex justify-center gap-2 mb-4">
                {duas.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDuaIndex(i); restartInterval(); }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: duaIndex === i ? 28 : 8,
                      height: 8,
                      background: duaIndex === i
                        ? "linear-gradient(90deg, var(--color-primary), var(--color-secondary))"
                        : "rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
              </div>

              {/* Dua card */}
              <div
                className="relative rounded-3xl border border-emerald-100 bg-white p-6 md:p-8 shadow-lg dark:bg-slate-900/80 dark:border-secondary/15"
                style={{ boxShadow: "0 4px 24px rgba(5,150,105,0.08), 0 1px 8px rgba(0,0,0,0.05)" }}
              >
                {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                  <span key={i} className={`absolute ${pos} text-base text-secondary/25`}>
                    {i < 2 ? "❋" : "✿"}
                  </span>
                ))}
                <AnimatePresence mode="wait">
                  <DuaCard key={duaIndex} dua={duas[duaIndex]} lang={lang} />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-col items-center gap-1"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-secondary font-bold text-2xl"
            >
              ↓
            </motion.div>
            <span className={`text-xs tracking-widest uppercase text-white ${lang === "bn" ? "font-bn" : "font-body"}`}>
              {t(banner.scrollHint, lang)}
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}