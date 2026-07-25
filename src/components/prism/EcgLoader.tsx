import { useEffect, useState } from "react";

const MESSAGES = [
  "Refracting Clinical Evidence...",
  "Mapping High-Yield Points...",
  "Formatting OSCE Checklists...",
];

export function EcgLoader({ compact = false }: { compact?: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <svg viewBox="0 0 300 60" className={compact ? "h-10 w-56" : "h-16 w-72"} fill="none">
        <path
          className="ecg-path"
          d="M0 30 L60 30 L75 30 L82 20 L90 40 L98 10 L106 50 L114 30 L150 30 L165 30 L172 22 L180 38 L188 30 L300 30"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-sm text-muted-foreground animate-pulse">{MESSAGES[i]}</p>
    </div>
  );
}