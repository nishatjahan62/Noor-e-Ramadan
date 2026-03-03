// src/app/recipes/[id]/page.js
import { recipes } from "@/data/recipes";
import RecipeDetail from "./recipeDetails";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return recipes.map(r => ({ id: String(r.id) }));
}

export default async function RecipePage({ params }) {
  const { id } = await params;  // ✅ await করুন
  const recipe = recipes.find(r => String(r.id) === id);
  if (!recipe) notFound();
  return <RecipeDetail recipe={recipe} />;
}