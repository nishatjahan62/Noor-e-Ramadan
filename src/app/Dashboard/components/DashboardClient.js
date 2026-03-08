"use client";
import { useSession } from "next-auth/react";
import { useLang } from "@/context/LangContext";
import WelcomeCard from "./WelcomeCard";
import GoalsSection from "./GoalsSection";
import BookmarksSection from "./BookmarkSection";

export default function DashboardClient({ session: initialSession }) {
  const { data: session } = useSession();
  const { lang }          = useLang();
  const activeSession     = session ?? initialSession;

  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-16 py-10 max-w-5xl mx-auto flex flex-col gap-8">
      <WelcomeCard session={activeSession} lang={lang} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GoalsSection     lang={lang} session={activeSession} />
        <BookmarksSection lang={lang} session={activeSession} />
      </div>
    </main>
  );
}