"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { t, recipes as rc } from "@/data/contents";
import { recipes } from "@/data/recipes";
import { useLang } from "@/context/LangContext";
import RecipeCard from "@/components/RecipeCard"

const CATEGORIES = ["iftar", "sehri", "both", "drinks"];
const featured = CATEGORIES.map(cat =>
  recipes.find(r => r.category === cat && r.featured === true)
).filter(Boolean);

export default function RecipesSection() {
  const { lang } = useLang();

  return (
    <section className="pt-4 lg:pt-10 px-4 sm:px-10 md:px-16 lg:px-20">
      <div className="mx-auto ">

    
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-10 flex flex-col items-center text-center gap-2"
>
  {/* Animated label — timing section এর মতো */}
  <div className="flex items-center justify-center gap-3 mb-2">
    <motion.span
      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      className="inline-block text-amber-400 text-xl"
    >✦</motion.span>

    <p
      className={cn("text-lg tracking-[0.25em] uppercase font-semibold", lang === "bn" ? "font-bn tracking-normal" : "")}
      style={{
        background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #f59e0b 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {t(rc.recipesHeading, lang)}
    </p>
   
    <motion.span
      animate={{ rotate: -360, scale: [1, 1.2, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      className="inline-block text-amber-400 text-xl"
    >✦</motion.span>
  </div>


  {/* Subheading */}
  <p  className="text-xs font-semibold italic"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
    {t(rc.mainSubheading, lang)}
  </p>
    {/* Bottom ornament */}
          <div className="flex items-center gap-2 mt-1">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-400" />
            <span className="text-amber-400 text-xs">✦</span>
            <span className="h-px w-16 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400" />
            <span className="text-amber-400 text-xs">✦</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-emerald-400" />
          </div>
</motion.div> {/* Animated label */}
        
         
          {/* Main heading */}

  {/* Main heading */}
<div className="flex flex-col items-center lg:items-start gap-1.5">
  <h2
    className={cn("text-3xl font-black leading-tight text-center lg:text-left", lang === "bn" ? "font-bn" : "font-heading")}
    style={{
      background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {t(rc.heading, lang)}
  </h2>
</div>

{/* Subheading */}
<p className={cn("text-sm text-gray-500 dark:text-gray-400 max-w-sm pb-4 text-center lg:text-left", lang === "bn" ? "font-bn" : "")}>
  {t(rc.subheading, lang)}
</p>


  
        {/* Cards grid — desktop এ বড় */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-5 text-center"
        >
          <Link
            href="/recipes"
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-semibold",
              "text-primary hover:text-secondary transition-colors hover:underline underline-offset-2",
              lang === "bn" ? "font-bn" : ""
            )}
          >
            {t(rc.viewAll, lang)} →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}