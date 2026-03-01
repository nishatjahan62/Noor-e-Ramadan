"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { bannerDuas } from "@/data/duas";
import RamadanBadge from "@/components/RamadanDayBadge";

// ── Star field (generated once) ─────────────────────────
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

// ── Floating geometric shapes (Islamic lattice feel) ────
const SHAPES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: [10, 25, 45, 60, 75, 88][i],
  y: [20, 70, 35, 80, 15, 55][i],
  size: [60, 40, 80, 50, 70, 45][i],
  delay: i * 0.8,
  rotate: i * 30,
}));

// ── Lantern SVG ──────────────────────────────────────────
function Lantern({ className = "", style = {} }) {
  return (
    <svg viewBox="0 0 40 60" className={className} style={style} fill="none">
      <line x1="20" y1="0" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="8" y="8" width="24" height="4" rx="2" fill="currentColor" opacity="0.7" />
      <path d="M10 12 Q10 28 14 36 L20 40 L26 36 Q30 28 30 12 Z" fill="currentColor" opacity="0.15" />
      <path d="M10 12 Q10 28 14 36 L20 40 L26 36 Q30 28 30 12 Z" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="13" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="11" y1="22" x2="29" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="11" y1="28" x2="29" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M14 36 Q20 44 26 36" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="17" y="40" width="6" height="3" rx="1" fill="currentColor" opacity="0.5" />
      {/* Glow */}
      <ellipse cx="20" cy="26" rx="6" ry="8" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

// ── Dua Card ─────────────────────────────────────────────
function DuaCard({ dua, lang, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.96 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4 text-center"
    >
      {/* Title badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        style={{
          background: isDark
            ? "rgba(245,158,11,0.15)"
            : "rgba(245,158,11,0.18)",
          border: "1px solid rgba(245,158,11,0.35)",
        }}
      >
        <span className="text-amber-500 text-sm">✦</span>
        <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400">
          {lang === "bn" ? dua.title : dua.titleEn}
        </span>
        <span className="text-amber-500 text-sm">✦</span>
      </motion.div>

      {/* Arabic text */}
      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl md:text-3xl lg:text-4xl leading-loose font-bold"
        style={{
          fontFamily: "'Amiri', 'Scheherazade New', 'Traditional Arabic', serif",
          direction: "rtl",
          color: isDark ? "rgba(245,158,11,0.95)" : "rgba(180,83,9,0.9)",
          textShadow: isDark
            ? "0 0 40px rgba(245,158,11,0.3)"
            : "0 2px 8px rgba(180,83,9,0.15)",
        }}
      >
        {dua.arabic}
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="h-[1px] w-32 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)",
        }}
      />

      {/* Pronunciation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm md:text-base font-medium italic"
        style={{
          color: isDark
            ? "rgba(167,243,208,0.85)"
            : "rgba(4,120,87,0.85)",
        }}
      >
        {dua.pronunciation}
      </motion.p>

      {/* Meaning */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm md:text-base leading-relaxed max-w-lg"
        style={{
          color: isDark ? "rgba(226,232,240,0.75)" : "rgba(30,41,59,0.7)",
        }}
      >
        {dua.meaning}
      </motion.p>

      {/* Source */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs rounded-full px-3 py-1"
        style={{
          background: isDark ? "rgba(5,150,105,0.15)" : "rgba(5,150,105,0.1)",
          color: isDark ? "rgba(110,231,183,0.8)" : "rgba(4,120,87,0.7)",
          border: "1px solid rgba(5,150,105,0.2)",
        }}
      >
        📖 {dua.source}
      </motion.span>
    </motion.div>
  );
}

// ── Main Banner ──────────────────────────────────────────
export default function Banner({ lang = "en", isDark = false }) {
  const [duaIndex, setDuaIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const shouldReduce = useReducedMotion();
  const intervalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate duas every 6s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDuaIndex((i) => (i + 1) % bannerDuas.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const currentDua = bannerDuas[duaIndex];

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-20"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #020617 0%, #0a1628 40%, #071a12 70%, #0d0d00 100%)"
          : "linear-gradient(160deg, #f0fdf4 0%, #fefce8 40%, #ecfdf5 70%, #fffbeb 100%)",
      }}
    >
      {/* ── Stars (dark mode only) ── */}
      {isDark && !shouldReduce && mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {STARS.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
              transition={{
                repeat: Infinity,
                duration: s.duration,
                delay: s.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Light mode: soft radial glows ── */}
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(ellipse, rgba(5,150,105,0.2) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* ── Geometric floating shapes ── */}
      {!shouldReduce && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {SHAPES.map((s) => (
            <motion.div
              key={s.id}
              className="absolute"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [s.rotate, s.rotate + 15, s.rotate],
                opacity: isDark ? [0.04, 0.1, 0.04] : [0.06, 0.14, 0.06],
              }}
              transition={{
                repeat: Infinity,
                duration: 8 + s.id,
                delay: s.delay,
                ease: "easeInOut",
              }}
            >
              {/* Islamic 8-point star shape */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                  fill="none"
                  stroke={isDark ? "rgba(245,158,11,0.6)" : "rgba(5,150,105,0.5)"}
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Lanterns ── */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none flex justify-between px-8 md:px-20">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ rotate: [-4, 4, -4], y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4 + i,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "top center" }}
          >
            <Lantern
              className="w-8 md:w-12 h-auto"
              style={{
                color: i % 2 === 0
                  ? isDark ? "rgba(245,158,11,0.7)" : "rgba(180,83,9,0.5)"
                  : isDark ? "rgba(16,185,129,0.6)" : "rgba(5,150,105,0.45)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Moon ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-10 right-8 md:right-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 80 80"
            className="w-16 h-16 md:w-24 md:h-24"
            fill="currentColor"
          >
            {/* Glow */}
            <circle
              cx="40"
              cy="40"
              r="38"
              fill={isDark ? "rgba(245,158,11,0.08)" : "rgba(245,158,11,0.12)"}
            />
            {/* Moon crescent */}
            <path
              d="M50 15 A25 25 0 1 0 50 65 A18 18 0 1 1 50 15 Z"
              fill={isDark ? "#f59e0b" : "#d97706"}
              opacity={isDark ? 0.9 : 0.75}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ══ MAIN CONTENT ══ */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl mx-auto text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-2"
        >
          {/* Arabic Ramadan */}
          <motion.p
            className="text-3xl md:text-5xl font-bold"
            style={{
              fontFamily: "'Amiri', 'Scheherazade New', serif",
              direction: "rtl",
              color: isDark ? "rgba(245,158,11,0.9)" : "rgba(161,61,9,0.85)",
              textShadow: isDark ? "0 0 60px rgba(245,158,11,0.25)" : "none",
            }}
          >
            رَمَضَان ٢٠٢٦
          </motion.p>

          {/* English/Bangla heading */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              background: isDark
                ? "linear-gradient(135deg, #f59e0b 0%, #10b981 50%, #f59e0b 100%)"
                : "linear-gradient(135deg, #059669 0%, #d97706 60%, #059669 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200%",
            }}
          >
            {lang === "bn" ? "নূর-ই-রমজান" : "Noor-E-Ramadan"}
          </h1>

          <motion.p
            className="text-sm md:text-base font-medium tracking-widest uppercase"
            style={{
              color: isDark ? "rgba(110,231,183,0.7)" : "rgba(4,120,87,0.6)",
              letterSpacing: "0.2em",
            }}
          >
            {lang === "bn"
              ? "রহমত • বরকত • মাগফিরাত"
              : "Mercy  •  Blessing  •  Forgiveness"}
          </motion.p>
        </motion.div>

        {/* ── Roja Badge ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <RamadanBadge lang={lang} />
        </motion.div>

        {/* ── Separator ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center gap-3 w-full max-w-sm"
        >
          <div
            className="flex-1 h-[1px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,158,11,0.4))",
            }}
          />
          <span style={{ color: isDark ? "rgba(245,158,11,0.6)" : "rgba(180,83,9,0.5)" }}>
            ✦
          </span>
          <div
            className="flex-1 h-[1px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(245,158,11,0.4), transparent)",
            }}
          />
        </motion.div>

        {/* ── Animated Dua Section ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full"
        >
          {/* Dua indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {bannerDuas.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDuaIndex(i);
                  clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    setDuaIndex((idx) => (idx + 1) % bannerDuas.length);
                  }, 6000);
                }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: duaIndex === i ? 28 : 8,
                  height: 8,
                  background:
                    duaIndex === i
                      ? "linear-gradient(90deg, #059669, #f59e0b)"
                      : isDark
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.15)",
                }}
              />
            ))}
          </div>

          {/* Dua card with glass panel */}
          <div
            className="relative rounded-3xl p-6 md:p-10 backdrop-blur-md"
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(245,158,11,0.04) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(236,253,245,0.6) 100%)",
              border: isDark
                ? "1px solid rgba(245,158,11,0.15)"
                : "1px solid rgba(5,150,105,0.15)",
              boxShadow: isDark
                ? "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
                : "0 8px 40px rgba(5,150,105,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Corner decorations */}
            <span
              className="absolute top-4 left-4 text-lg opacity-30"
              style={{ color: isDark ? "#f59e0b" : "#059669" }}
            >
              ❋
            </span>
            <span
              className="absolute top-4 right-4 text-lg opacity-30"
              style={{ color: isDark ? "#f59e0b" : "#059669" }}
            >
              ❋
            </span>
            <span
              className="absolute bottom-4 left-4 text-lg opacity-30"
              style={{ color: isDark ? "#059669" : "#f59e0b" }}
            >
              ✿
            </span>
            <span
              className="absolute bottom-4 right-4 text-lg opacity-30"
              style={{ color: isDark ? "#059669" : "#f59e0b" }}
            >
              ✿
            </span>

            <AnimatePresence mode="wait">
              <DuaCard
                key={currentDua.id}
                dua={currentDua}
                lang={lang}
                isDark={isDark}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Bottom scroll hint ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-1 mt-4"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ color: isDark ? "rgba(245,158,11,0.4)" : "rgba(5,150,105,0.4)" }}
          >
            ↓
          </motion.div>
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
            }}
          >
            {lang === "bn" ? "আরো দেখুন" : "Scroll to explore"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}