import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/prism/TopBar";
import { AskPanel } from "@/components/prism/AskPanel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { YEARS, type YearKey } from "@/lib/curriculum";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/year/$year")({
  head: ({ params }) => {
    const y = YEARS[params.year as YearKey];
    const title = y ? `${y.title} · Prism Medical AI` : "MBBS Year · Prism Medical AI";
    const desc = y ? `${y.title} workspace — ${y.subtitle}. Browse modules and subjects for the MBBS integrated modular curriculum.` : "MBBS year workspace.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    if (!YEARS[params.year as YearKey]) throw notFound();
    return { year: YEARS[params.year as YearKey] };
  },
  component: YearPage,
});

function YearPage() {
  const { year } = Route.useLoaderData();
  const [selected, setSelected] = useState<{ kind: "Module" | "Subject"; name: string } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <section className={`relative overflow-hidden bg-gradient-to-br ${year.cover}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 text-white">
          <Link to="/" className="mb-3 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> All Years
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">{year.title}</h1>
          <p className="mt-1 text-white/85">{year.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <Tabs defaultValue="modules">
          <TabsList>
            <TabsTrigger value="modules">Browse by Module</TabsTrigger>
            <TabsTrigger value="subjects">Browse by Subject</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="mt-6">
            <CardGrid items={year.modules} kind="Module" onPick={(n) => setSelected({ kind: "Module", name: n })} />
          </TabsContent>
          <TabsContent value="subjects" className="mt-6">
            <CardGrid items={year.subjects} kind="Subject" onPick={(n) => setSelected({ kind: "Subject", name: n })} />
          </TabsContent>
        </Tabs>

        {selected && (
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {selected.kind}: <span className="text-primary">{selected.name}</span>
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>Close</Button>
            </div>
            <AskPanel
              mode={`Year ${year.key} · ${selected.kind}: ${selected.name}`}
              placeholder={`Ask a high-yield question about ${selected.name} (e.g. "Give me MBBS-level key points, must-know MCQs, and OSCE checklist for ${selected.name}")`}
              initialPrompt={`Give me a high-yield MBBS Year ${year.key} study card for ${selected.kind}: ${selected.name}. Include: key concepts, must-know clinical correlations, high-yield MCQ traps, and an OSCE/TOACS checklist.`}
              title={`${selected.name} — High-Yield Card`}
            />
          </div>
        )}
      </section>
    </div>
  );
}

function CardGrid({
  items,
  kind,
  onPick,
}: {
  items: string[];
  kind: "Module" | "Subject";
  onPick: (name: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <button key={it} onClick={() => onPick(it)} className="text-left">
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-card p-5 text-white shadow-elegant transition hover:-translate-y-0.5">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
              {kind}
            </div>
            <div className="mt-1 text-lg font-bold">{it}</div>
            <div className="mt-3 text-xs text-white/75">Tap to generate high-yield card →</div>
          </Card>
        </button>
      ))}
    </div>
  );
}