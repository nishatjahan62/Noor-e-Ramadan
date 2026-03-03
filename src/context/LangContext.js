"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("lang") || "en";
  });

  const toggle = () => {
    setLang((prev) => {
      const next = prev === "en" ? "bn" : "en";
      if (typeof window !== "undefined") localStorage.setItem("lang", next);
      return next;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang; 
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}