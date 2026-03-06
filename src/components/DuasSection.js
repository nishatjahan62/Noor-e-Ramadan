"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { t, duas as dc } from "@/data/contents";
import { duas } from "@/data/duas";
import { useLang } from "@/context/LangContext";
import DuaCard from "./DuaCards";

const featured = duas.filter(d => d.featured === true);

export default function DuasSection() {
  const { lang } = useLang();

  return (
    <section className="pt-8 lg:pt-20 px-4">
      <div className="mx-auto max-w-5xl">

        {/* Heading — desktop:  */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Top eyebrow — always center */}
          <div className="flex flex-col items-center justify-center gap-3 mb-4">
           <div className="flex gap-2 text-xl"> <motion.span
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block text-amber-400 "
            >✦</motion.span>
            <p
              className={cn("text-sm tracking-[0.25em] uppercase font-semibold", lang === "bn" ? "font-bn tracking-normal" : "")}
              style={{
                background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t(dc.eyebrow, lang)}
            </p>
        
            <motion.span
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block text-amber-400 "
            >✦</motion.span></div>
              <div>   <p
                className="text-xs font-semibold italic"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {lang === "bn"
                  ? "রমজানের প্রতিটি মুহূর্ত দোয়ায় ভরিয়ে দিন 🌙"
                  : "Fill every moment of Ramadan with prayer 🌙"
                }
              </p></div>
          </div>
 <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400" />
                <span className="text-amber-400 text-xs">✦</span>
                <span className="h-px w-12 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400" />
                <span className="text-amber-400 text-xs">✦</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-400" />
            
              </div>
             
            </div>

          {/* Desktop: heading left + tagline right | Mobile: center */}
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left gap-3 pt-2">

            {/* Left — main heading + subheading */}
            <div className="flex flex-col items-center lg:items-start gap-1.5">
              <h2
                className={cn("text-3xl md:text-4xl font-black leading-tight", lang === "bn" ? "font-bn" : "font-heading")}
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t(dc.heading, lang)}
              </h2>
              <p className={cn("text-sm text-gray-500 dark:text-gray-400", lang === "bn" ? "font-bn" : "")}>
                {t(dc.subheading, lang)}
              </p>
            </div>

          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((dua, i) => (
            <DuaCard key={dua.id} dua={dua} index={i} defaultOpen={true} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/duas"
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-semibold",
              "text-primary hover:text-secondary transition-colors hover:underline underline-offset-2",
              lang === "bn" ? "font-bn" : ""
            )}
          >
            {t(dc.viewAll, lang)} →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}