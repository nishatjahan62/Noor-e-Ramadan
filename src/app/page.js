import Image from "next/image";
import HeoBanner from "../components/HeroBanner"
import TimingsCards from "@/components/TimingsCards";

export default function Home() {
  return (
  <main>
    <HeoBanner></HeoBanner>
    <TimingsCards></TimingsCards>
  </main>
  );
}
