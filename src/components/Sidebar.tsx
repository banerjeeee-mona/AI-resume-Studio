import { FileText, LayoutTemplate, Sparkles, Download, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarView = "builder" | "templates" | "ai" | "export" | "settings";

const items: { id: SidebarView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "builder", label: "Builder", icon: FileText },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "ai", label: "AI Summary", icon: Sparkles },
  { id: "export", label: "Export", icon: Download },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  active,
  onSelect,
}: {
  active: SidebarView;
  onSelect: (v: SidebarView) => void;
}) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-2 border-r border-white/10 bg-black/30 p-5 backdrop-blur">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg shadow-blue-500/30">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold gradient-text">ResumeForge</div>
          <div className="text-xs text-muted-foreground">AI Builder</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                isActive
                  ? "bg-gradient-to-r from-blue-600/30 to-violet-600/20 text-white shadow-inner"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive && "text-blue-300")} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-violet-600/10 p-4">
        <div className="text-xs font-semibold text-white">Pro Tip</div>
        <p className="mt-1 text-xs text-muted-foreground">
          Use the AI Summary to generate an ATS-friendly intro from your skills and experience.
        </p>
      </div>
    </aside>
  );
}
