import { TopNav } from "@/components/sections/TopNav";
import { ProgressIndicator } from "@/components/sections/ProgressIndicator";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { System } from "@/components/sections/System";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Testimonials } from "@/components/sections/Testimonials";
import { GreenFilm } from "@/components/sections/GreenFilm";
import { FooterBar } from "@/components/sections/FooterBar";

export default function Home() {
  return (
    <main className="relative w-full">
      <TopNav />
      <ProgressIndicator />
      <Hero />
      <Problem />
      <System />
      <WhoItsFor />
      <Testimonials />
      {/* GreenFilm hosts the EndMenu overlay inside its sticky viewport */}
      <GreenFilm />
      <FooterBar />
    </main>
  );
}
