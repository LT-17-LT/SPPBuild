import { TopNav } from "@/components/sections/TopNav";
import { ProgressIndicator } from "@/components/sections/ProgressIndicator";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { System } from "@/components/sections/System";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Testimonials } from "@/components/sections/Testimonials";
import { GreenFilm } from "@/components/sections/GreenFilm";
import { SiteFooter } from "@/components/sections/SiteFooter";

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
      <GreenFilm />
      <SiteFooter />
    </main>
  );
}
