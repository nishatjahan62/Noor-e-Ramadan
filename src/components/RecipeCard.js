"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookmark } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { t, recipes as rc } from "@/data/contents";
import { useLang } from "@/context/LangContext";
import { useSession } from "next-auth/react";
import useBookmark from "@/lib/useBookmark";

const categoryConfig = {
  iftar:  { icon: "🌙", bg: "from-emerald-50/70 to-white",  badge: "from-primary to-primary/80",     text: "text-primary hover:text-secondary" },
  sehri:  { icon: "🌅", bg: "from-amber-50/70 to-white",    badge: "from-secondary to-secondary/80",  text: "text-primary hover:text-secondary" },
  both:   { icon: "🍽️", bg: "from-emerald-50/70 to-white", badge: "from-primary/80 to-secondary/80",  text: "text-primary hover:text-secondary" },
  drinks: { icon: "🥤", bg: "from-amber-50/70 to-white",    badge: "from-secondary/80 to-primary/80",  text: "text-primary hover:text-secondary" },
};

export default function RecipeCard({ recipe, index = 0 }) {
  const { lang }                        = useLang();
  const { data: session }               = useSession();
  const { bookmarked, toggle, loading } = useBookmark(recipe.id, "recipe");
  const config                          = categoryConfig[recipe.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative rounded-3xl p-[1.5px] group cursor-pointer"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
    >
      <div className={cn(
        "rounded-[22px] p-5 flex flex-col gap-3 h-full bg-gradient-to-br dark:bg-none dark:bg-slate-900",
        config.bg
      )}>

        {/* Badge + bookmark */}
        <div className="flex items-center justify-between">
          <span className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r text-white",
            config.badge
          )}>
            <span>{config.icon}</span>
            <span className={lang === "bn" ? "font-bn" : "font-body"}>
              {t(rc[recipe.category], lang)}
            </span>
          </span>

          <div className="flex items-center gap-2">
            <span className={cn("text-[14px] font-medium text-secondary", lang === "bn" ? "font-bn" : "font-body")}>
              ⏱ {recipe.prepTime}
            </span>

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
          {t(recipe.title, lang)}
        </h3>

        {/* Description */}
        <p className={cn(
          "text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1",
          lang === "bn" ? "font-bn" : "font-body"
        )}>
          {t(recipe.description, lang)}
        </p>

        {/* Button */}
        <Link href={`/recipes/${recipe.id}`}>
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={cn(
              "mt-1 w-full text-center text-xs font-semibold py-2 rounded-xl transition-all duration-200",
              "bg-white/50 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/60",
              config.text,
              lang === "bn" ? "font-bn" : "font-body"
            )}
          >
            {t(rc.seeRecipe, lang)} →
          </motion.div>
        </Link>

      </div>
    </motion.div>
  );
}