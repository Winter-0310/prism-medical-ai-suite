import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/prism/TopBar";
import { YearCard } from "@/components/prism/YearCard";
import { YEAR_KEYS, YEARS } from "@/lib/curriculum";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prism Medical AI — High-Yield MBBS Study Suite" },
      { name: "description", content: "Refracting complex medical knowledge into high-yield clinical insights for MBBS students across all 5 years of the integrated modular curriculum." },
      { property: "og:title", content: "Prism Medical AI — High-Yield MBBS Study Suite" },
      { property: "og:description", content: "AI-powered MBBS study companion covering modules, subjects, OSCE/TOACS stations and clinical ward queries." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 800 400" preserveAspectRatio="none">
          <path d="M0 250 L120 250 L140 200 L160 300 L180 150 L200 350 L220 250 L400 250 L420 200 L440 300 L460 250 L800 250"
            stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-white">
          <div className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            Powered by Lovable AI
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Prism Medical AI
            <span className="block text-emerald-300">High-Yield Medical Study Suite</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Refracting Complex Medical Knowledge into High-Yield Clinical Insights.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Select Your MBBS Year</h2>
            <p className="text-sm text-muted-foreground">Enter a year workspace to browse modules, subjects and OSCE prep.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {YEAR_KEYS.map((k) => (
            <YearCard key={k} year={YEARS[k]} />
          ))}
        </div>
      </section>
    </div>
  );
}
