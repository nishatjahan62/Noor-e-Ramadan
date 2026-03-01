"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ── Icons ────────────────────────────────────
import { FiSun, FiMenu, FiX } from "react-icons/fi";
import { PiMoonStarsFill } from "react-icons/pi";
import { TbLanguage } from "react-icons/tb";

// ── Lang context + content ───────────────────
import { useLang } from "../context/LangContext";
import { t, navbar } from "../data/contents/index";

// ── Nav links ─────────────────────────────────
const LINKS = [
  { href: "/",        labelKey: "home" },
  { href: "/recipes", labelKey: "recipes" },
  { href: "/timings", labelKey: "schedule" },
];

// ── Reusable icon button ──────────────────────
function IconButton({ children, onClick, ariaLabel, className = "" }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative rounded-xl border px-3 py-2 shadow-sm backdrop-blur-md transition-all duration-200",
        "border-amber-200/40 bg-white/50 hover:bg-white/70",
        "dark:border-amber-400/20 dark:bg-slate-800/50 dark:hover:bg-slate-700/60",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

function CrescentMoon({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function StarSparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={cn("w-3 h-3", className)}>
      <path d="M10 1l2.39 6.26L19 9l-5.5 4.74L15.12 21 10 17.27 4.88 21l1.62-7.26L1 9l6.61-1.74L10 1z" />
    </svg>
  );
}

// ─────────────────────────────────────────────
export default function Navbar() {
  const pathname         = usePathname();
  const { lang, toggle } = useLang();           // ← context, no local state

  const [compact,  setCompact]  = useState(false);
  const [isDark,   setIsDark]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldCompact = latest > 80;
    setCompact(shouldCompact);
    if (shouldCompact) setMenuOpen(false);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const title = t(navbar.brand, lang);

  return (
    <header className="sticky top-0 z-50">

      {/* ── Background ── */}
      <div className={cn(
        "absolute inset-0 -z-10 transition-all duration-500",
        compact
          ? "bg-white/95 shadow-lg dark:bg-slate-950/95 backdrop-blur-2xl"
          : "bg-gradient-to-r from-emerald-50/90 via-white/80 to-amber-50/90 backdrop-blur-xl dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/90"
      )} />

      {/* ── Top gradient line ── */}
      <AnimatePresence>
        {!compact && (
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 right-0 h-[2px] origin-left"
            style={{ background: "linear-gradient(90deg, transparent 0%, #059669 30%, #f59e0b 70%, transparent 100%)" }}
          />
        )}
      </AnimatePresence>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* ══ LEFT: Logo — desktop ══ */}
        <AnimatePresence initial={false} mode="wait">
          {!compact ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="hidden md:flex items-center gap-3"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl shadow-md ring-1 ring-amber-300/40 bg-gradient-to-br from-emerald-500/10 to-amber-400/10 dark:from-emerald-900/40 dark:to-amber-900/30">
                <CrescentMoon size={20} className="text-amber-500 dark:text-amber-300" />
                <StarSparkle className="absolute -top-1 -right-1 text-amber-400 dark:text-amber-300" />
              </div>
              <Link href="/" className="select-none">
                <span
                  className={cn("text-xl font-bold tracking-wide", lang === "bn" ? "font-bn" : "font-heading")}
                  style={{
                    background: "linear-gradient(135deg, #059669 0%, #10b981 40%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.03em",
                  }}
                >
                  {title}
                </span>
              </Link>
            </motion.div>
          ) : (
            <motion.div key="logo-hidden" className="hidden md:block w-0" />
          )}
        </AnimatePresence>

        {/* ══ LEFT: Moon only — mobile ══ */}
        <div className="flex md:hidden items-center">
          <Link href="/">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ring-1 ring-amber-300/40 bg-gradient-to-br from-emerald-500/10 to-amber-400/10 dark:from-emerald-900/40 dark:to-amber-900/30">
              <CrescentMoon size={18} className="text-amber-500 dark:text-amber-300" />
              <StarSparkle className="absolute -top-1 -right-1 text-amber-400 w-2 h-2" />
            </div>
          </Link>
        </div>

        {/* ══ CENTER: Nav links — desktop non-compact ══ */}
        <AnimatePresence initial={false}>
          {!compact && (
            <motion.div
              key="center-links"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="hidden md:flex items-center gap-1"
            >
              {LINKS.map((l, i) => {
                const active = pathname === l.href;
                const label  = t(navbar[l.labelKey], lang);
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200",
                        lang === "bn" ? "font-bn" : "font-body",
                        active
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(5,150,105,0.12) 0%, rgba(245,158,11,0.12) 100%)",
                            boxShadow: "0 0 0 1px rgba(245,158,11,0.3)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ CENTER: Compact pill — desktop on scroll ══ */}
        <AnimatePresence>
          {compact && (
            <motion.div
              key="compact-pill"
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="mx-auto hidden md:block"
            >
              <div
                className="flex items-center gap-1 rounded-full px-2 py-1.5 shadow-xl ring-1 backdrop-blur-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(236,253,245,0.80) 50%, rgba(255,251,235,0.85) 100%)",
                  boxShadow: "0 8px 32px rgba(5,150,105,0.12), 0 2px 8px rgba(0,0,0,0.08)",
                  borderColor: "rgba(5,150,105,0.2)",
                }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-amber-400/20 mr-1">
                  <CrescentMoon size={13} className="text-amber-500" />
                </div>
                {LINKS.map((l) => {
                  const active = pathname === l.href;
                  const label  = t(navbar[l.labelKey], lang);
                  return (
                    <motion.div key={l.href} whileHover={{ y: -2 }} whileTap={{ scale: 0.92 }}>
                      <Link
                        href={l.href}
                        className={cn(
                          "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                          lang === "bn" ? "font-bn" : "font-body",
                          active
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400"
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="compact-active-pill"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: "linear-gradient(135deg, rgba(5,150,105,0.15) 0%, rgba(245,158,11,0.15) 100%)",
                              boxShadow: "0 0 0 1px rgba(245,158,11,0.35)",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ RIGHT: Toggles ══ */}
        <div className="flex items-center gap-2">

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <IconButton onClick={() => setMenuOpen(!menuOpen)} ariaLabel={t(navbar.openMenu, lang)}>
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FiX size={20} className="text-gray-800 dark:text-white" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FiMenu size={20} className="text-gray-800 dark:text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </IconButton>
          </div>

          {/* Language toggle — context এর toggle() call করে */}
          <IconButton onClick={toggle} ariaLabel="Toggle language">
            <span className="flex items-center gap-1">
              <TbLanguage size={20} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hidden sm:inline">
                {t(navbar.langToggle, lang)}
              </span>
            </span>
          </IconButton>

          {/* Theme toggle */}
          <IconButton onClick={() => setIsDark((p) => !p)} ariaLabel="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span key="sun" initial={{ rotate: -90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FiSun size={20} className="text-amber-400" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: -90, scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <PiMoonStarsFill size={20} className="text-amber-500 dark:text-amber-300" />
                </motion.span>
              )}
            </AnimatePresence>
          </IconButton>
        </div>
      </nav>

      {/* ══ MOBILE DROPDOWN ══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div
              className={cn(
                "mx-3 mb-3 rounded-3xl p-2 shadow-xl ring-1 backdrop-blur-2xl",
                isDark ? "bg-slate-900/95 ring-emerald-500/20" : "bg-white/95 ring-emerald-300/30"
              )}
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(6,78,59,0.15) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(236,253,245,0.80) 100%)",
              }}
            >
              <div className="mb-2 mx-3 h-px rounded-full" style={{ background: "linear-gradient(90deg, transparent, #059669, #f59e0b, transparent)" }} />

              {LINKS.map((l, i) => {
                const active = pathname === l.href;
                const label  = t(navbar[l.labelKey], lang);
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                        lang === "bn" ? "font-bn" : "font-body",
                        isDark ? "text-gray-200 hover:bg-slate-800/80" : "text-gray-800 hover:bg-emerald-50",
                        active ? (isDark ? "bg-slate-800 text-emerald-300" : "bg-emerald-50 text-emerald-800") : ""
                      )}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />}
                      <span className={active ? "" : "ml-4"}>{label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}