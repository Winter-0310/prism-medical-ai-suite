import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askPrism } from "@/lib/prism-ai.functions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EcgLoader } from "./EcgLoader";
import { OutputCard } from "./OutputCard";

export function AskPanel({
  placeholder,
  mode,
  initialPrompt = "",
  title = "Prism Response",
}: {
  placeholder: string;
  mode: string;
  initialPrompt?: string;
  title?: string;
}) {
  const call = useServerFn(askPrism);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await call({ data: { prompt, mode } });
      setResult(r.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI response unavailable. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="resize-none"
        />
        <Button onClick={submit} disabled={loading} className="bg-primary text-primary-foreground">
          {loading ? "Working..." : "Ask Prism"}
        </Button>
      </div>
      {loading && <EcgLoader />}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {result && <OutputCard title={title} content={result} />}
    </div>
  );
}