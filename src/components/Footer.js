"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { t, footer as fc } from "@/data/contents";
import { useLang } from "@/context/LangContext";

const LINKS = [
  { href: "/",        labelKey: "home"     },
  { href: "/recipes", labelKey: "recipes"  },
  { href: "/timings", labelKey: "schedule" },
  { href: "/duas",    labelKey: "duas"     },
];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="relative mt-16 border-t border-emerald-100/40 dark:border-slate-800/60">
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{ background: "linear-gradient(90deg, transparent, #059669, #f59e0b, transparent)" }}
      />

      <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col items-center gap-3">

        {/* Links */}
        <div className="flex items-center gap-1 flex-wrap justify-center">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-3 py-1 text-xs text-primary hover:text-secondary transition-colors",
                lang === "bn" ? "font-bn" : "font-body"
              )}
            >
              {t(fc[l.labelKey], lang)}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className={cn("flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-300", lang === "bn" ? "font-bn" : "font-body")}>
          <span>{t(fc.madeBy, lang)}</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block text-rose-400"
          >❤️</motion.span>
          {t(fc.by, lang) && <span>{t(fc.by, lang)}</span>}
          <span
            className="font-semibold font-logo"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nishat Jahan
          </span>
          <span>·</span>
          <span>{t(fc.ramadan, lang)}</span>
        </div>

      </div>
    </footer>
  );
}