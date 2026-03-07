"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiCheck, FiBookmark } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { t, duas as dc } from "@/data/contents";
import { useLang } from "@/context/LangContext";
import { useSession } from "next-auth/react";
import useBookmark from "@/lib/useBookmark";

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

const LONG_THRESHOLD = 100;

export default function DuaCard({ dua, index = 0, defaultOpen = false }) {
  const { lang }                        = useLang();
  const { data: session }               = useSession();
  const [expanded, setExpanded]         = useState(defaultOpen);
  const [copied,   setCopied]           = useState(false);
  const { bookmarked, toggle, loading } = useBookmark(dua.id, "dua");

  const config     = categoryConfig[dua.category] ?? { icon: "🤲", badge: "from-primary to-secondary/80" };
  const hasContent = dua.arabic && dua.arabic.trim() !== "";
  const isLong     = hasContent && dua.arabic.length > LONG_THRESHOLD;

  const handleCopy = () => {
    const lines = [dua.arabic];
    const translation = t(dua.translation, lang);
    if (translation) lines.push("\n" + translation);
    if (dua.reference) lines.push("\n— " + t(dua.reference, lang));
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative rounded-3xl p-[1.5px]"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
    >
      <div className="rounded-[22px] p-5 flex flex-col gap-3 h-full bg-gradient-to-br from-emerald-50/70 to-white dark:bg-none dark:bg-slate-900">

        {/* Badge + actions */}
        <div className="flex items-center justify-between">
          <span className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r text-white",
            config.badge
          )}>
            <span>{config.icon}</span>
            <span className={lang === "bn" ? "font-bn" : "font-body"}>
              {t(dc[dua.category] ?? { en: dua.category, bn: dua.category }, lang)}
            </span>
          </span>

          <div className="flex items-center gap-1">

            {/* Bookmark button */}
            {session ? (
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={toggle}
                disabled={loading}
                title={bookmarked
                  ? (lang === "bn" ? "বুকমার্ক সরান" : "Remove bookmark")
                  : (lang === "bn" ? "বুকমার্ক করুন" : "Bookmark")
                }
                className="p-1.5 rounded-lg transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {bookmarked ? (
                    <motion.span
                      key="filled"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <BsBookmarkFill size={14} className="text-secondary" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="outline"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FiBookmark size={14} className="text-gray-400 hover:text-secondary" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ) : (
              <motion.a
                href="/login"
                whileTap={{ scale: 0.85 }}
                title={lang === "bn" ? "বুকমার্ক করতে লগইন করুন" : "Login to bookmark"}
                className="p-1.5 rounded-lg text-gray-300 hover:text-secondary transition-colors"
              >
                <FiBookmark size={14} />
              </motion.a>
            )}

            {/* Copy button */}
            {hasContent && (
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={handleCopy}
                title={lang === "bn" ? "কপি করুন" : "Copy"}
                className="p-1.5 rounded-lg text-gray-400 hover:text-primary transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FiCheck size={15} className="text-primary" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FiCopy size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

          </div>
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
          <p className={cn("text-xs leading-relaxed text-gray-500 dark:text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
            {t(dua.subtitle, lang)}
          </p>
        )}

        {/* Arabic + translation */}
        {hasContent && (
          <div className="flex flex-col gap-2 pt-3 border-t border-emerald-100/60 dark:border-slate-700/40">
            <div className="relative">
              <p
                className={cn(
                  "text-right leading-loose text-gray-800 dark:text-gray-100 font-arabic",
                  isLong && !expanded ? "text-base line-clamp-3" : "text-xl"
                )}
                dir="rtl"
              >
                {dua.arabic}
              </p>
              {isLong && !expanded && (
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
              )}
            </div>

            <AnimatePresence initial={false}>
              {(!isLong || expanded) && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden flex flex-col gap-2"
                >
                  {dua.translation && t(dua.translation, lang) && (
                    <p className={cn(
                      "text-xs leading-relaxed italic text-gray-600 dark:text-gray-300",
                      lang === "bn" ? "font-bn" : "font-body"
                    )}>
                      {t(dua.translation, lang)}
                    </p>
                  )}
                  {dua.reference && t(dua.reference, lang) && (
                    <span className={cn("text-[10px] font-semibold text-primary/70", lang === "bn" ? "font-bn" : "font-body")}>
                      📚 {t(dua.reference, lang)}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {isLong && (
              <button
                onClick={() => setExpanded(v => !v)}
                className={cn(
                  "self-start mt-1 text-[11px] font-semibold transition-colors text-primary hover:text-secondary",
                  lang === "bn" ? "font-bn" : "font-body"
                )}
              >
                {expanded
                  ? (lang === "bn" ? "কম দেখুন ▲" : "Show less ▲")
                  : (lang === "bn" ? "আরও দেখুন ▼" : "Read more ▼")
                }
              </button>
            )}
          </div>
        )}

        {/* Coming soon */}
        {!hasContent && (
          <span className={cn("text-[10px] italic text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
            {t(dc.comingSoon, lang)}
          </span>
        )}

      </div>
    </motion.div>
  );
}