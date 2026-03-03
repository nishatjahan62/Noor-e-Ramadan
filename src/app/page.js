import Image from "next/image";
import HeoBanner from "../components/HeroBanner"
import TimingsCards from "@/components/TimingsCards";
import RecipesSection from "@/components/RecipeSection";

export default function Home() {
  return (
  <main>
    <HeoBanner></HeoBanner>
    <TimingsCards></TimingsCards>
    <RecipesSection></RecipesSection>
  </main>
  );
}
