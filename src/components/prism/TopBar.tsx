import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Activity, Palette, Type, BellOff } from "lucide-react";

type Theme = "zen-green" | "dark" | "light-medical" | "high-contrast";
type Font = "s" | "m" | "l";

function applyTheme(t: Theme) {
  const html = document.documentElement;
  html.classList.remove("dark");
  html.removeAttribute("data-theme");
  if (t === "dark") html.classList.add("dark");
  else if (t !== "zen-green") html.setAttribute("data-theme", t);
  localStorage.setItem("prism-theme", t);
}
function applyFont(f: Font) {
  document.documentElement.setAttribute("data-font", f);
  localStorage.setItem("prism-font", f);
}
function applyDnd(on: boolean) {
  document.documentElement.setAttribute("data-dnd", on ? "on" : "off");
  localStorage.setItem("prism-dnd", on ? "on" : "off");
}

export function TopBar() {
  const [dnd, setDnd] = useState(false);
  useEffect(() => {
    const t = (localStorage.getItem("prism-theme") as Theme) || "zen-green";
    const f = (localStorage.getItem("prism-font") as Font) || "m";
    const d = localStorage.getItem("prism-dnd") === "on";
    applyTheme(t);
    applyFont(f);
    applyDnd(d);
    setDnd(d);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero shadow-elegant">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">Prism Medical AI</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              High-Yield Study Suite
            </div>
          </div>
        </Link>

        <nav className="hidden gap-1 md:flex">
          <Link to="/" className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent">
            MBBS Curriculum
          </Link>
          <Link to="/games" className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent">
            Medical Gamification Zone
          </Link>
          <Link to="/consult" className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent">
            AI Curriculum Consult
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><Palette className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => applyTheme("zen-green")}>Zen Green</DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyTheme("dark")}>Dark Clinical</DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyTheme("light-medical")}>Light Medical</DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyTheme("high-contrast")}>Focus / High Contrast</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><Type className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Font Size</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => applyFont("s")}>Small</DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyFont("m")}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyFont("l")}>Large</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1">
            <BellOff className="h-3.5 w-3.5 text-muted-foreground" />
            <Switch checked={dnd} onCheckedChange={(v) => { setDnd(v); applyDnd(v); }} />
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 bg-muted/40" data-nonessential>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <span>5 Academic Years</span>
          <span className="text-primary">•</span>
          <span>Integrated Modular Curriculum</span>
          <span className="text-primary">•</span>
          <span>OSCE/TOACS Modules Ready</span>
        </div>
      </div>
      <nav className="flex justify-center gap-1 border-t border-border/60 py-2 md:hidden">
        <Link to="/" className="rounded-md px-2 py-1 text-xs font-medium hover:bg-accent">Curriculum</Link>
        <Link to="/games" className="rounded-md px-2 py-1 text-xs font-medium hover:bg-accent">Games</Link>
        <Link to="/consult" className="rounded-md px-2 py-1 text-xs font-medium hover:bg-accent">Consult</Link>
      </nav>
    </header>
  );
}