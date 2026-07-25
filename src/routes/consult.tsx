import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/prism/TopBar";
import { AskPanel } from "@/components/prism/AskPanel";
import { Card } from "@/components/ui/card";
import { Stethoscope, BookOpen, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/consult")({
  head: () => ({
    meta: [
      { title: "AI Curriculum Consult · Prism Medical AI" },
      { name: "description", content: "Ask Prism Medical AI whether a topic is high-yield MBBS, low-yield, or postgraduate — plus clinical education queries." },
      { property: "og:title", content: "AI Curriculum Consult · Prism Medical AI" },
      { property: "og:description", content: "MBBS curriculum verification and clinical education assistant." },
    ],
  }),
  component: Consult,
});

function Consult() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-3xl font-bold md:text-4xl">AI Curriculum Consult</h1>
          <p className="mt-2 max-w-2xl text-white/85">
            Verify if a topic is part of the undergraduate MBBS modular syllabus, or ask a clinical education question — answers stay strictly within medical education.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 py-10 md:grid-cols-3">
        <Info icon={<BookOpen className="h-5 w-5" />} title="Syllabus Check" text="Is this topic High-Yield, Low-Yield, or Postgraduate-level?" />
        <Info icon={<Stethoscope className="h-5 w-5" />} title="Clinical Query" text="Bedside, ward and OSCE-style education answers." />
        <Info icon={<ShieldCheck className="h-5 w-5" />} title="Guardrails" text="Strictly restricted to MBBS education. No personal diagnosis." />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <AskPanel
          mode="Curriculum Consult"
          placeholder='e.g. "Is Cushing reflex part of MBBS syllabus?" or "Explain approach to a patient with acute chest pain for OSCE."'
          title="Prism Curriculum Verdict"
        />
      </section>
    </div>
  );
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Card className="p-5">
      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">{icon}</div>
      <div className="font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </Card>
  );
}