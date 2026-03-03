// src/app/recipes/not-found.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LangContext";

export default function RecipeNotFound() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm mx-auto">

        {/* Animated icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          🍽️
        </motion.div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="inline-block text-amber-400 text-sm"
          >✦</motion.span>
          <span className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-amber-400" />
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="inline-block text-amber-400 text-sm"
          >✦</motion.span>
        </div>

        {/* Heading */}
        <h1
          className={cn("text-3xl font-black mb-3", lang === "bn" ? "font-bn" : "font-heading")}
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {lang === "bn" ? "রেসিপি পাওয়া যায়নি" : "Recipe Not Found"}
        </h1>

        {/* Subtitle */}
        <p className={cn("text-sm text-gray-400 dark:text-gray-500 mb-8 leading-relaxed", lang === "bn" ? "font-bn" : "")}>
          {lang === "bn"
            ? "এই রেসিপিটি খুঁজে পাওয়া যাচ্ছে না। হয়তো এটি সরিয়ে নেওয়া হয়েছে।"
            : "This recipe doesn't exist or may have been removed."}
        </p>

        {/* Back button */}
        <Link href="/recipes">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white",
              lang === "bn" ? "font-bn" : ""
            )}
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            }}
          >
            ← {lang === "bn" ? "সব রেসিপি দেখুন" : "Back to Recipes"}
          </motion.div>
        </Link>

      </div>
    </main>
  );
}