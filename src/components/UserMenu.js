"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LangContext";
import useLogout from "@/lib/useLogout";
import { useTheme } from "@/context/ThemeContext";

export default function UserMenu({ session }) {
  const { lang }         = useLang();
  const { isDark }       = useTheme();
  const { handleLogout } = useLogout();
  const [open, setOpen]  = useState(false);
  const ref              = useRef(null);

  // Outside click close
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>

      {/* Trigger button */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen(v => !v)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-md transition-all",
          lang === "bn" ? "font-bn" : "font-body"
        )}
        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      >
        <span>👤</span>
        <span className="max-w-[80px] truncate">{session.user.name}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px]"
        >▾</motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute right-0 mt-2 w-44 rounded-2xl shadow-xl ring-1 overflow-hidden z-50",
              isDark
                ? "bg-slate-900 ring-emerald-500/20"
                : "bg-white ring-emerald-200/40"
            )}
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-emerald-100/60 dark:border-slate-700/40">
              <p className={cn("text-xs font-bold text-gray-700 dark:text-gray-200 truncate", lang === "bn" ? "font-bn" : "font-body")}>
                {session.user.name}
              </p>
              <p className="text-[10px] text-gray-400 truncate">{session.user.email}</p>
            </div>

            {/* Links */}
            <div className="py-1.5">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2 text-xs font-medium transition-colors",
                  "text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-primary",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
              >
                <span>👤</span>
                <span>{lang === "bn" ? "প্রোফাইল" : "Profile"}</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="mx-3 h-px bg-emerald-100/60 dark:bg-slate-700/40" />

            {/* Logout */}
            <div className="py-1.5">
              <button
                onClick={() => { setOpen(false); handleLogout(lang, isDark); }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium transition-colors",
                  "text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
              >
                <span>🚪</span>
                <span>{lang === "bn" ? "লগআউট" : "Logout"}</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}