"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { t, recipes as rc } from "@/data/contents";
import { useLang } from "@/context/LangContext";

const categoryConfig = {
  iftar:  { icon: "🌙", bg: "from-emerald-50/70 to-white",  badge: "from-primary to-primary/80",    text: "text-primary hover:text-secondary"   },
  sehri:  { icon: "🌅", bg: "from-amber-50/70 to-white",    badge: "from-secondary to-secondary/80", text: "text-primary hover:text-secondary" },
  both:   { icon: "🍽️", bg: "from-emerald-50/70 to-white", badge: "from-primary/80 to-secondary/80", text: "text-primary hover:text-secondary" },
  drinks: { icon: "🥤", bg: "from-amber-50/70 to-white", badge: "from-secondary/80 to-primary/80", text: "text-primary hover:text-secondary" },
};

export default function RecipeCard({ recipe, index = 0 }) {
  const { lang } = useLang();
  const config = categoryConfig[recipe.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative rounded-3xl p-[1.5px] group cursor-pointer"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
      }}
    >
      {/* Card bg —  */}
     <div className={cn(
  "rounded-[22px] p-5 flex flex-col gap-3 h-full bg-gradient-to-br dark:bg-none dark:bg-slate-900",
  config.bg
)}>
        {/* Category badge + time */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r text-white",
              config.badge,
            )}
          >
            <span>{config.icon}</span>
            <span>{t(rc[recipe.category], lang)}</span>
          </span>
          <span className="text-[14px] font-medium text-secondary">
            ⏱ {recipe.prepTime}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-base font-black leading-tight",
            lang === "bn" ? "font-bn" : "font-heading",
          )}
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t(recipe.title, lang)}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1",
            lang === "bn" ? "font-bn" : "",
          )}
        >
          {t(recipe.description, lang)}
        </p>

        {/* Button */}
        <Link href={`/recipes/${recipe.id}`}>
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={cn(
              "mt-1 w-full text-center text-xs font-semibold py-2 rounded-xl transition-all duration-200",
              "bg-white/50 dark:bg-slate-800/60",
              "hover:bg-white/80 dark:hover:bg-slate-700/60",
              config.text,
              lang === "bn" ? "font-bn" : "",
            )}
          >
            {t(rc.seeRecipe, lang)} →
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
