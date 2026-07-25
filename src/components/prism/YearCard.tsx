import { Link } from "@tanstack/react-router";
import type { YearInfo } from "@/lib/curriculum";

export function YearCard({ year }: { year: YearInfo }) {
  return (
    <Link
      to="/year/$year"
      params={{ year: year.key }}
      className="group relative block h-56 overflow-hidden rounded-2xl border border-border shadow-elegant transition-transform hover:-translate-y-1"
    >
      <div className={`h-full w-full bg-gradient-to-br ${year.cover}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
          MBBS · Modular
        </div>
        <h3 className="mt-1 text-2xl font-bold drop-shadow">{year.title}</h3>
        <p className="mt-1 text-sm text-white/85">{year.subtitle}</p>
        <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-200 group-hover:text-white">
          Open workspace →
        </div>
      </div>
    </Link>
  );
}