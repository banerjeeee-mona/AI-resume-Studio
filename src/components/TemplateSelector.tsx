import type { TemplateId } from "@/lib/resume-types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const TEMPLATES: { id: TemplateId; name: string; description: string; preview: string }[] = [
  { id: "modern", name: "Modern", description: "Gradient header, bold and contemporary.", preview: "from-blue-500 to-violet-500" },
  { id: "classic", name: "Classic", description: "Centered serif header, timeless.", preview: "from-slate-700 to-slate-900" },
  { id: "minimal", name: "Minimal", description: "Two-column, calm and refined.", preview: "from-zinc-400 to-zinc-600" },
];

export function TemplateSelector({
  value,
  onChange,
}: {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {TEMPLATES.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "group relative overflow-hidden rounded-xl border p-4 text-left transition-all",
              active
                ? "border-blue-400/60 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
            )}
          >
            <div className={cn("mb-3 h-24 rounded-lg bg-gradient-to-br", t.preview)} />
            <div className="flex items-center justify-between">
              <div className="font-medium text-white">{t.name}</div>
              {active && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Check className="h-3 w-3" />
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
          </button>
        );
      })}
    </div>
  );
}
