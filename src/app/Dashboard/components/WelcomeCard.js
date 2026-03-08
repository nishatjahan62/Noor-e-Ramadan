"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export default function WelcomeCard({ session, lang }) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="rounded-3xl p-[1.5px]"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
    >
      <div className="rounded-[22px] px-6 py-5 bg-white dark:bg-slate-900 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1
            className={cn("text-2xl font-black", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {session.user.name}
          </h1>
          <span className="text-xs text-gray-400">{session.user.email}</span>
        </div>
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-md ring-1 ring-amber-300/30"
          style={{ background: "linear-gradient(135deg, rgba(5,150,105,0.08), rgba(245,158,11,0.08))" }}
        >
          🌙
        </div>
      </div>
    </motion.div>
  );
}