"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { t, user as uc } from "@/data/contents";
import { duas } from "@/data/duas";
import { recipes } from "@/data/recipes";

const TABS = ["duas", "recipes"];

export default function BookmarksSection({ lang }) {
  const [tab,       setTab]       = useState("duas");
  const [bookmarks, setBookmarks] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then(r => r.json())
      .then(data => { setBookmarks(data.bookmarks ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const removeBookmark = async (itemId, type) => {
    await fetch("/api/bookmarks", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, type }),
    });
    setBookmarks(prev => prev.filter(b => !(b.itemId === itemId && b.type === type)));
  };

  const duaBookmarks    = bookmarks.filter(b => b.type === "dua");
  const recipeBookmarks = bookmarks.filter(b => b.type === "recipe");
  const currentList     = tab === "duas" ? duaBookmarks : recipeBookmarks;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.15 }}
      className="rounded-3xl p-[1.5px] h-full"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
    >
      <div className="rounded-[22px] px-6 py-5 bg-white dark:bg-slate-900 flex flex-col gap-4 h-full">

        {/* Header */}
        <h2
          className={cn("text-base font-black", lang === "bn" ? "font-bn" : "font-heading")}
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🔖 {t(uc.bookmarks, lang)}
        </h2>

        {/* Tabs */}
        <div className="flex gap-2">
          {TABS.map(key => {
            const count = bookmarks.filter(b =>
              b.type === (key === "duas" ? "dua" : "recipe")
            ).length;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                  lang === "bn" ? "font-bn" : "font-body",
                  tab === key
                    ? "text-white"
                    : "text-gray-400 bg-gray-100 dark:bg-slate-800 hover:text-primary"
                )}
                style={tab === key ? {
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                } : {}}
              >
                {t(uc[key], lang)}
                {count > 0 && (
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    tab === key ? "bg-white/30 text-white" : "bg-primary/10 text-primary"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2"
          >
            {loading ? (
              <div className="flex flex-col gap-2">
                {[1,2,3].map(i => (
                  <div key={i} className="h-12 rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse" />
                ))}
              </div>
            ) : currentList.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <p className={cn("text-xs text-gray-400 text-center", lang === "bn" ? "font-bn" : "font-body")}>
                  {tab === "duas" ? t(uc.emptyDuas, lang) : t(uc.emptyRecipes, lang)}
                </p>
                <Link
                  href={tab === "duas" ? "/duas" : "/recipes"}
                  className={cn(
                    "text-xs font-semibold text-primary hover:text-secondary transition-colors",
                    lang === "bn" ? "font-bn" : "font-body"
                  )}
                >
                  {tab === "duas" ? t(uc.goDuasLink, lang) : t(uc.goRecipesLink, lang)}
                </Link>
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {currentList.map(bookmark => {
                    const item = tab === "duas"
                      ? duas.find(d => d.id === bookmark.itemId)
                      : recipes.find(r => r.id === bookmark.itemId);
                    if (!item) return null;

                    return (
                      <motion.li
                        key={bookmark.itemId}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800"
                      >
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                          <Link
                            href={tab === "duas" ? "/duas" : `/recipes/${item.id}`}
                            className={cn(
                              "text-sm font-semibold text-gray-700 dark:text-gray-200 truncate hover:text-primary transition-colors",
                              lang === "bn" ? "font-bn" : "font-body"
                            )}
                          >
                            {t(item.title, lang)}
                          </Link>
                          {tab === "recipes" && (
                            <span className={cn("text-[10px] text-gray-400", lang === "bn" ? "font-bn" : "font-body")}>
                              ⏱ {item.prepTime}
                            </span>
                          )}
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => removeBookmark(bookmark.itemId, bookmark.type)}
                          className={cn(
                            "text-[10px] font-semibold text-red-400 hover:text-red-500 transition-colors shrink-0",
                            lang === "bn" ? "font-bn" : "font-body"
                          )}
                        >
                          {t(uc.remove, lang)}
                        </motion.button>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </motion.div>
  );
}