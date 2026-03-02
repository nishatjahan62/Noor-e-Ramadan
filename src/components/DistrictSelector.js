"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { districts } from "@/data/districts";
import { useLang } from "@/context/LangContext";
import { t, timings } from "@/data/contents";
import { cn } from "@/lib/utils";

export default function DistrictSelector({ selected, onSelect }) {
  const { lang }          = useLang();
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const ref               = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = districts.filter(d =>
    d.en.toLowerCase().includes(query.toLowerCase()) || d.bn.includes(query)
  );

  const selectedDistrict = districts.find(d => d.id === selected);

  return (
    <div ref={ref} className="relative w-full max-w-xs">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm transition-all",
          "border-emerald-200 bg-white hover:bg-emerald-50",
          "dark:border-emerald-800/40 dark:bg-slate-900 dark:hover:bg-slate-800",
          open && "ring-2 ring-emerald-400/40"
        )}
      >
        <span className={lang === "bn" ? "font-bn" : ""}>
          {selectedDistrict
            ? (lang === "bn" ? selectedDistrict.bn : selectedDistrict.en)
            : t(timings.selectDistrict, lang)}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-emerald-500 text-xs"
        >
          ▾
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 mt-2 w-full rounded-2xl border border-emerald-100 bg-white shadow-xl dark:bg-slate-900 dark:border-slate-700 overflow-hidden"
          >
            {/* Search */}
            <div className="p-2 border-b border-emerald-50 dark:border-slate-700">
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t(timings.search, lang)}
                className="w-full rounded-xl px-3 py-2 text-sm bg-emerald-50 dark:bg-slate-800 outline-none placeholder:text-gray-400"
              />
            </div>

            {/* List */}
            <ul className="max-h-56 overflow-y-auto">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-gray-400 text-center">
                  {t(timings.notFound, lang)}
                </li>
              )}
              {filtered.map(d => (
                <li key={d.id}>
                  <button
                    onClick={() => { onSelect(d.id); setOpen(false); setQuery(""); }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm transition-colors",
                      lang === "bn" ? "font-bn" : "",
                      selected === d.id
                        ? "bg-emerald-50 text-emerald-700 font-semibold dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {lang === "bn" ? d.bn : d.en}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}