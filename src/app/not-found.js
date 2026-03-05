// src/app/not-found.js
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4"
      >

        {/* 404 heading with stars */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <motion.span
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="inline-block text-amber-400 text-xl"
          >✦</motion.span>

          <h1
            className={cn("text-6xl font-black", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {lang === "bn" ? "৪০৪" : "404"}
          </h1>

          <motion.span
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="inline-block text-amber-400 text-xl"
          >✦</motion.span>
        </div>

        {/* Mosque icon */}
        <motion.span
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-5xl"
        ></motion.span>

        {/* Message */}
        <p className={cn("text-gray-500 dark:text-gray-400 text-sm max-w-xs", lang === "bn" ? "font-bn" : "")}>
          {lang === "bn"
            ? "এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।"
            : "This page could not be found."}
        </p>

        {/* Back link */}
        <Link
          href="/"
          className={cn(
            "mt-2 inline-flex items-center gap-1.5 text-sm font-semibold",
            "text-primary hover:text-secondary transition-colors hover:underline underline-offset-2",
            lang === "bn" ? "font-bn" : ""
          )}
        >
          {lang === "bn" ? "← হোমে ফিরুন" : "← Back to Home"}
        </Link>

      </motion.div>
    </main>
  );
}