import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { TopBar } from "@/components/prism/TopBar";
import { EcgLoader } from "@/components/prism/EcgLoader";
import { OutputCard } from "@/components/prism/OutputCard";
import { askPrism } from "@/lib/prism-ai.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Timer, Pill, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Medical Gamification Zone · Prism Medical AI" },
      { name: "description", content: "Productive MBBS revision with Rapid-Fire Diagnosis Blitz, Pharma-Match, and OSCE Station Simulator." },
      { property: "og:title", content: "Medical Gamification Zone · Prism Medical AI" },
      { property: "og:description", content: "AI-powered mini-games for clinical vignettes, pharmacology matching, and OSCE simulation." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <section className="bg-gradient-hero text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-3xl font-bold md:text-4xl">Medical Gamification Zone</h1>
          <p className="mt-2 max-w-2xl text-white/85">Three built-in AI mini-games for productive high-yield revision.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <Tabs defaultValue="blitz">
          <TabsList>
            <TabsTrigger value="blitz"><Timer className="mr-2 h-4 w-4" />Diagnosis Blitz</TabsTrigger>
            <TabsTrigger value="pharma"><Pill className="mr-2 h-4 w-4" />Pharma-Match</TabsTrigger>
            <TabsTrigger value="osce"><Stethoscope className="mr-2 h-4 w-4" />OSCE Simulator</TabsTrigger>
          </TabsList>
          <TabsContent value="blitz" className="mt-6"><BlitzGame /></TabsContent>
          <TabsContent value="pharma" className="mt-6"><PharmaGame /></TabsContent>
          <TabsContent value="osce" className="mt-6"><OsceGame /></TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function useAi() {
  const call = useServerFn(askPrism);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ask = async (prompt: string, mode: string) => {
    setLoading(true);
    setError(null);
    try {
      const r = await call({ data: { prompt, mode } });
      return r.text;
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI response unavailable. Please retry.");
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { ask, loading, error };
}

function BlitzGame() {
  const { ask, loading, error } = useAi();
  const [vignette, setVignette] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [time, setTime] = useState(30);

  const startRound = async () => {
    setFeedback(null);
    setAnswer("");
    setTime(30);
    const r = await ask(
      "Generate ONE rapid-fire clinical vignette in exactly 3 concise lines for an MBBS student. Provide 4 answer options (A-D) for the most likely diagnosis or best next step. Do NOT reveal the correct answer. Format:\n\nVignette:\n<3 lines>\n\nOptions:\nA) ...\nB) ...\nC) ...\nD) ...",
      "Diagnosis Blitz",
    );
    if (r) {
      setVignette(r);
      const iv = setInterval(() => {
        setTime((t) => {
          if (t <= 1) { clearInterval(iv); return 0; }
          return t - 1;
        });
      }, 1000);
    }
  };

  const submit = async () => {
    if (!vignette || !answer.trim()) return;
    const r = await ask(
      `Case:\n${vignette}\n\nStudent's answer: ${answer}\n\nAs the examiner, reveal the correct option letter and diagnosis, say if the student is correct, and give a 3-bullet high-yield teaching point.`,
      "Diagnosis Blitz Grading",
    );
    if (r) setFeedback(r);
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Rapid-Fire Diagnosis Blitz</h3>
          <p className="text-sm text-muted-foreground">3-line vignettes. Pick the correct diagnosis or next best step within 30 seconds.</p>
        </div>
        <Button onClick={startRound} disabled={loading}>New Vignette</Button>
      </div>
      {loading && <EcgLoader compact />}
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {vignette && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-md bg-muted p-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Time left</span>
            <span className={`font-mono text-lg ${time <= 10 ? "text-destructive" : "text-primary"}`}>{time}s</span>
          </div>
          <OutputCard title="Case" content={vignette} tag="Blitz" />
          <div className="flex gap-2">
            <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter letter (A/B/C/D) or your answer" />
            <Button onClick={submit} disabled={loading}>Submit</Button>
          </div>
          {feedback && <OutputCard title="Examiner Feedback" content={feedback} tag="Teaching Point" />}
        </div>
      )}
    </Card>
  );
}

function PharmaGame() {
  const { ask, loading, error } = useAi();
  const [round, setRound] = useState<string | null>(null);
  const [pairs, setPairs] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const start = async () => {
    setFeedback(null);
    setPairs("");
    const r = await ask(
      "Create a Pharma-Match challenge for MBBS. Provide two shuffled columns of 5 items each:\n\nColumn A (Drugs — labeled 1-5): 5 high-yield drugs\nColumn B (Mechanisms — labeled A-E): their mechanisms in shuffled order\n\nDo NOT reveal the correct pairing. End with a short reminder that the student should submit their matching (e.g. 1-C, 2-A, ...).",
      "Pharma-Match",
    );
    if (r) setRound(r);
  };

  const submit = async () => {
    if (!round || !pairs.trim()) return;
    const r = await ask(
      `Challenge:\n${round}\n\nStudent's matching: ${pairs}\n\nGrade the pairing. Reveal the correct 1-5 -> letter matches, mark each right/wrong, and give a 1-line high-yield side-effect for each drug.`,
      "Pharma-Match Grading",
    );
    if (r) setFeedback(r);
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Pharma-Match & Mechanism Challenge</h3>
          <p className="text-sm text-muted-foreground">Match high-yield drugs to their mechanisms and see the key side effects.</p>
        </div>
        <Button onClick={start} disabled={loading}>New Challenge</Button>
      </div>
      {loading && <EcgLoader compact />}
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {round && (
        <div className="space-y-4">
          <OutputCard title="Match the Columns" content={round} tag="Pharma" />
          <div className="flex gap-2">
            <Input value={pairs} onChange={(e) => setPairs(e.target.value)} placeholder="Your matches, e.g. 1-C, 2-A, 3-E, 4-B, 5-D" />
            <Button onClick={submit} disabled={loading}>Submit</Button>
          </div>
          {feedback && <OutputCard title="Grading & Side Effects" content={feedback} tag="Teaching Point" />}
        </div>
      )}
    </Card>
  );
}

function OsceGame() {
  const { ask, loading, error } = useAi();
  const [scenario, setScenario] = useState("");
  const [transcript, setTranscript] = useState<{ role: "student" | "examiner"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const start = async () => {
    if (!scenario.trim()) return;
    setTranscript([]);
    const r = await ask(
      `You are the OSCE examiner. Start a step-by-step OSCE station for MBBS on: "${scenario}". Give the opening station brief (setting, patient stub, task), and ask the student for their first action or question. Keep replies short.`,
      "OSCE Simulator",
    );
    if (r) setTranscript([{ role: "examiner", text: r }]);
  };

  const send = async () => {
    if (!input.trim()) return;
    const student = input;
    setInput("");
    const next = [...transcript, { role: "student" as const, text: student }];
    setTranscript(next);
    const history = next.map((t) => `${t.role === "student" ? "STUDENT" : "EXAMINER"}: ${t.text}`).join("\n\n");
    const r = await ask(
      `OSCE station on: ${scenario}\n\nTranscript so far:\n${history}\n\nAs the OSCE examiner, respond in-character to the student's latest turn. Guide them stepwise, give short feedback on missed points, and either ask for the next step or, if the station is complete, give a concise structured final feedback (marks out of 10, strengths, missed points).`,
      "OSCE Simulator",
    );
    if (r) setTranscript([...next, { role: "examiner", text: r }]);
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold">OSCE Station Simulator</h3>
        <p className="text-sm text-muted-foreground">AI acts as your OSCE examiner for history-taking or physical exam stations.</p>
      </div>
      {transcript.length === 0 ? (
        <div className="flex gap-2">
          <Input value={scenario} onChange={(e) => setScenario(e.target.value)} placeholder='e.g. "Chest pain history taking" or "Cranial nerve examination"' />
          <Button onClick={start} disabled={loading}>Start Station</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3 rounded-md border border-border bg-muted/30 p-4">
            {transcript.map((t, i) => (
              <div key={i} className={t.role === "examiner" ? "" : "text-right"}>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.role === "examiner" ? "Examiner" : "You"}
                </div>
                <div className={`mt-1 inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${t.role === "examiner" ? "bg-card text-card-foreground border border-border" : "bg-primary text-primary-foreground"}`}>
                  {t.text}
                </div>
              </div>
            ))}
          </div>
          {loading && <EcgLoader compact />}
          <div className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Your next question or action..." />
            <Button onClick={send} disabled={loading}>Send</Button>
            <Button variant="outline" onClick={() => { setTranscript([]); setScenario(""); }}>End</Button>
          </div>
        </div>
      )}
      {error && <Alert variant="destructive" className="mt-3"><AlertDescription>{error}</AlertDescription></Alert>}
    </Card>
  );
}