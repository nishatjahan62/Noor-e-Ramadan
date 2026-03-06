import Image from "next/image";
import HeoBanner from "../components/HeroBanner"
import TimingsCards from "@/components/TimingsCards";
import RecipesSection from "@/components/RecipeSection";
import DuasSection from "@/components/DuasSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
  <main>
    <HeoBanner></HeoBanner>
    <TimingsCards></TimingsCards>
    <DuasSection></DuasSection>
    <RecipesSection></RecipesSection>
    <Footer></Footer>
  </main>
  );
}
