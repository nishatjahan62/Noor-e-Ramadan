"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { t, duas as dc } from "@/data/contents";
import { useLang } from "@/context/LangContext";

const categoryConfig = {
  mercy:           { icon: "💚", badge: "from-primary to-primary/80"         },
  forgiveness:     { icon: "🤲", badge: "from-primary/80 to-secondary/80"    },
  forgiveness2:    { icon: "🤲", badge: "from-primary/80 to-secondary/80"    },
  freedom:         { icon: "🌟", badge: "from-secondary to-secondary/80"     },
  iftar:           { icon: "🌅", badge: "from-secondary to-primary/80"       },
  sehri:           { icon: "🌙", badge: "from-primary to-primary/80"         },
  lailatul:        { icon: "✨", badge: "from-secondary/80 to-primary/80"    },
  tarawih:         { icon: "🕌", badge: "from-primary/80 to-secondary/80"    },
  tarawih_munajat: { icon: "🕌", badge: "from-primary to-secondary/80"       },
  tarawih_end:     { icon: "🕌", badge: "from-secondary/80 to-primary/80"    },
  jumuah:          { icon: "🌿", badge: "from-primary/80 to-secondary/80"    },
  morning:         { icon: "🌤️", badge: "from-primary to-primary/80"        },
  evening:         { icon: "🌆", badge: "from-secondary to-secondary/80"     },
  quran:           { icon: "📖", badge: "from-primary/80 to-secondary/80"    },
  gratitude:       { icon: "🙏", badge: "from-secondary/80 to-primary/80"    },
  guidance:        { icon: "🌠", badge: "from-primary to-secondary/80"       },
  protection:      { icon: "🛡️", badge: "from-secondary to-primary/80"      },
};

export default function DuaCard({ dua, index = 0 }) {
  const { lang }      = useLang();
  const [open, setOpen] = useState(false);
  const config          = categoryConfig[dua.category] ?? { icon: "🤲", badge: "from-primary to-secondary/80" };
  const hasContent      = dua.arabic && dua.arabic.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 260, damping: 22 }}
      className="relative rounded-3xl p-[1.5px] cursor-pointer"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
      onClick={() => hasContent && setOpen(o => !o)}
    >
      <div className="rounded-[22px] p-5 flex flex-col gap-3 h-full bg-gradient-to-br from-emerald-50/70 to-white dark:bg-none dark:bg-slate-900">

        {/* Badge + icon */}
        <div className="flex items-center justify-between">
          <span className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r text-white",
            config.badge
          )}>
            <span>{config.icon}</span>
            <span className={lang === "bn" ? "font-bn" : ""}>{t(dc[dua.category] ?? { en: dua.category, bn: dua.category }, lang)}</span>
          </span>
          {hasContent && (
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-primary text-sm"
            >▾</motion.span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn("text-base font-black leading-tight", lang === "bn" ? "font-bn" : "font-heading")}
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t(dua.title, lang)}
        </h3>

        {/* Subtitle */}
        {dua.subtitle && (
          <p className={cn("text-xs text-gray-500 dark:text-gray-400 leading-relaxed", lang === "bn" ? "font-bn" : "")}>
            {t(dua.subtitle, lang)}
          </p>
        )}

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {open && hasContent && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-2 border-t border-emerald-100/60 dark:border-slate-700/40">

                {/* Arabic */}
                <p
                  className="text-right text-lg leading-loose font-arabic text-gray-800 dark:text-gray-100"
                  dir="rtl"
                >
                  {dua.arabic}
                </p>

                {/* Translation */}
                {dua.translation && t(dua.translation, lang) && (
                  <p className={cn("text-xs text-gray-600 dark:text-gray-300 leading-relaxed italic", lang === "bn" ? "font-bn" : "")}>
                    {t(dua.translation, lang)}
                  </p>
                )}

                {/* Reference */}
                {dua.reference && t(dua.reference, lang) && (
                  <span className={cn("text-[10px] font-semibold text-primary/70", lang === "bn" ? "font-bn" : "")}>
                    📚 {t(dua.reference, lang)}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coming soon if no content */}
        {!hasContent && (
          <span className={cn("text-[10px] text-gray-400 italic", lang === "bn" ? "font-bn" : "")}>
            {t(dc.comingSoon, lang)}
          </span>
        )}

      </div>
    </motion.div>
  );
}