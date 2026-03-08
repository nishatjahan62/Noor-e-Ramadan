"use client";
import { useLang } from "@/context/LangContext";
import WelcomeCard from "./WelcomeCard";
import GoalsSection from "./GoalsSection";
import BookmarkSection from "./BookmarkSection";

export default function DashboardClient({ session }) {
  const { lang } = useLang();

  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-16 py-10 max-w-5xl mx-auto flex flex-col gap-8">
      <WelcomeCard session={session} lang={lang} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GoalsSection     lang={lang} />
        <BookmarkSection  lang={lang} />
      </div>
    </main>
  );
}