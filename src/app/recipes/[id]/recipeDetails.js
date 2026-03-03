"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { t, recipes as rc } from "@/data/contents";
import { useLang } from "@/context/LangContext";

const categoryConfig = {
  iftar:  { icon: "🌙", bg: "from-emerald-50/70 to-white", badge: "from-primary to-primary/80",        text: "text-primary"   },
  sehri:  { icon: "🌅", bg: "from-emerald-50/70 to-white", badge: "from-secondary to-secondary/80",    text: "text-secondary" },
  both:   { icon: "🍽️", bg: "from-emerald-50/70 to-white", badge: "from-primary/80 to-secondary/80",  text: "text-primary"   },
  drinks: { icon: "🥤", bg: "from-emerald-50/70 to-white", badge: "from-secondary/80 to-primary/80",  text: "text-secondary" },
};

function formatTime(time, lang, contents) {
  if (lang !== "bn") return time;
  return String(time)
    .replace("hr", t(contents.hrUnit, lang))
    .replace("min", t(contents.minUnit, lang))
    .replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

export default function RecipeDetail({ recipe }) {
  const { lang } = useLang();
  const config   = categoryConfig[recipe.category];

  return (
    <main className="min-h-screen pt-8 pb-16 px-4">
      <div className="mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          {/* Category badge */}
          <span className={cn(
            "inline-flex items-center  gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r text-white mb-4",
            config.badge
          )}>
            <span>{config.icon}</span>
            <span>{t(rc[recipe.category], lang)}</span>
          </span>

          {/* Title */}
          <h1
            className={cn("text-3xl md:text-4xl font-black leading-tight mb-3", lang === "bn" ? "font-bn" : "font-heading")}
            style={{
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t(recipe.title, lang)}
          </h1>

          {/* Description */}
          <p className={cn("text-sm text-primary-600 dark:text-amber-300 leading-relaxed mb-5", lang === "bn" ? "font-bn" : "")}>
            {t(recipe.description, lang)}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-center  gap-4 flex-wrap ">
            <span className={cn("flex items-center gap-1.5 text-sm font-semibold text-black dark:text-white", lang === "bn" ? "font-bn" : "")}>
              ⏱ <span>{t(rc.prepTime, lang)}:</span> <span className="text-primary font-bold">{formatTime(recipe.prepTime, lang, rc)}</span>
            </span>
            <span className={cn("flex items-center gap-1.5 text-sm font-semibold text-black dark:text-white ", lang === "bn" ? "font-bn" : "")}>
              🔥 <span>{t(rc.cookTime, lang)}:</span> <span className="text-secondary font-bold">{formatTime(recipe.prepTime, lang, rc)}</span>
            </span>
            <span className={cn("flex items-center gap-1.5 text-sm font-semibold text-black dark:text-white", lang === "bn" ? "font-bn" : "")}>
              👥 <span>{t(rc.serves, lang)}:</span> <span className="text-primary font-bold">{formatTime(recipe.serves, lang,rc)}</span>
            </span>
          </div>
        </motion.div>
</div>
<div className="px-4 sm:px-8 lg:px-10">
        {/* Desktop: 2 column | Mobile: single column */}
        <div className="md:grid md:grid-cols-2 md:gap-6 flex flex-col gap-6 mb-6">

          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-[1.5px]"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            <div className={cn(
              "rounded-[22px] p-7 h-full bg-gradient-to-br dark:bg-none dark:bg-slate-900",
              config.bg
            )}>
              <h2
                className={cn("text-lg font-black mb-5", lang === "bn" ? "font-bn" : "font-heading")}
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🧂 {t(rc.ingredients, lang)}
              </h2>
              <ul className="flex flex-col gap-3">
                {t(recipe.ingredients, lang).map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={cn("flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300", lang === "bn" ? "font-bn" : "")}
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl p-[1.5px]"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            <div className={cn(
              "rounded-[22px] p-7 h-full bg-gradient-to-br dark:bg-none dark:bg-slate-900",
              config.bg
            )}>
              <h2
                className={cn("text-lg font-black mb-5", lang === "bn" ? "font-bn" : "font-heading")}
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                📋 {t(rc.steps, lang)}
              </h2>
              <ol className="flex flex-col gap-5">
                {t(recipe.steps, lang).map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white"
                      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                    >
                      {i + 1}
                    </span>
                    <span className={cn("text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-1", lang === "bn" ? "font-bn" : "")}>
                      {step}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>

        </div>

        {/* Tips — center */}
        {recipe.tips && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl p-[1.5px] mx-0   md:mx-14 lg:mx-20 items-center justify-center "
            style={{ background: "linear-gradient(135deg, var(--color-secondary), var(--color-primary))" }}
          >
            <div className={cn(
              "rounded-[22px] p-7 bg-gradient-to-br dark:bg-none dark:bg-slate-900",
              config.bg
            )}>
              <h2
                className={cn("text-lg font-black mb-5", lang === "bn" ? "font-bn" : "font-heading")}
                style={{
                  background: "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                💡 {t(rc.tips, lang)}
              </h2>
              <ul className="flex flex-col gap-3">
                {t(recipe.tips, lang).map((tip, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={cn("flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300", lang === "bn" ? "font-bn" : "")}
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-secondary to-primary flex-shrink-0 mt-1.5" />
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

      </div>
    </main>
  );
}