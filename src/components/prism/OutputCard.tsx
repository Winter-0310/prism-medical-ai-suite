import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Check } from "lucide-react";

export function OutputCard({
  title,
  content,
  tag = "High-Yield",
}: {
  title?: string;
  content: string;
  tag?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({
          title: title ?? "Prism Medical AI",
          text: content,
        });
      } catch {
        /* ignore */
      }
    } else {
      await copy();
    }
  };
  return (
    <Card className="p-5 shadow-elegant border-primary/20">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {title && <h3 className="font-semibold text-foreground">{title}</h3>}
          <Badge data-nonessential className="bg-primary text-primary-foreground">
            {tag}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={copy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button size="sm" variant="outline" onClick={share}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground/90">
        {content}
      </div>
    </Card>
  );
}