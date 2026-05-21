import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar, type SidebarView } from "@/components/Sidebar";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { Button } from "@/components/ui/button";
import { Download, Menu, Sparkles } from "lucide-react";
import { type ResumeData, type TemplateId, emptyResume } from "@/lib/resume-types";
import { generateSummary } from "@/lib/dummy-ai";
import { Toaster, toast } from "sonner";

export const Route = createFileRoute("/")({
  component: ResumeBuilderPage,
});

function ResumeBuilderPage() {
  const [view, setView] = useState<SidebarView>("builder");
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [template, setTemplate] = useState<TemplateId>("modern");
  const [generating, setGenerating] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const summary = await generateSummary(data);
      setData((d) => ({ ...d, summary }));
      toast.success("AI summary generated", { description: "ATS-friendly and ready to edit." });
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    const node = document.getElementById("resume-print");
    if (!node) return;
    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>${data.name || "Resume"}</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>body{margin:0;padding:24px;background:#f1f5f9;font-family:ui-sans-serif,system-ui;}@media print{body{padding:0;background:#fff;}}</style>
</head><body>${node.outerHTML}<script>window.onload=()=>setTimeout(()=>window.print(),300)</script></body></html>`;
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    }
  };

  return (
    <div className="flex min-h-screen text-foreground">
      <Toaster theme="dark" position="top-right" richColors />
      <Sidebar active={view} onSelect={(v) => { setView(v); setMobileNavOpen(false); }} />

      <main className="flex-1">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-md p-2 text-muted-foreground hover:bg-white/5 md:hidden"
              onClick={() => setMobileNavOpen((s) => !s)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-white sm:text-lg">
                {view === "builder" && "Resume Builder"}
                {view === "templates" && "Choose a Template"}
                {view === "ai" && "AI Summary"}
                {view === "export" && "Export & Download"}
                {view === "settings" && "Settings"}
              </h1>
              <p className="text-xs text-muted-foreground">Craft an ATS-friendly resume in minutes.</p>
            </div>
          </div>
          <Button onClick={handleDownload} className="gradient-btn text-white">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </header>

        {mobileNavOpen && (
          <MobileNav active={view} onSelect={(v) => { setView(v); setMobileNavOpen(false); }} />
        )}

        <div className="mx-auto max-w-[1400px] p-4 md:p-8">
          {view === "builder" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="card-glow animate-fade-in-up rounded-2xl p-6">
                <ResumeForm
                  data={data}
                  onChange={setData}
                  onGenerate={handleGenerate}
                  generating={generating}
                />
              </div>
              <div className="animate-fade-in-up lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
                <PreviewWrap>
                  <ResumePreview data={data} template={template} />
                </PreviewWrap>
              </div>
            </div>
          )}

          {view === "templates" && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="card-glow rounded-2xl p-6">
                <TemplateSelector value={template} onChange={setTemplate} />
              </div>
              <PreviewWrap>
                <ResumePreview data={data} template={template} />
              </PreviewWrap>
            </div>
          )}

          {view === "ai" && (
            <div className="card-glow animate-fade-in-up mx-auto max-w-2xl rounded-2xl p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg shadow-blue-500/30">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Generate an ATS-friendly summary</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                We'll analyze your skills and experience and craft a professional summary tailored for applicant tracking systems.
              </p>
              <Button onClick={handleGenerate} disabled={generating} className="gradient-btn mt-6 text-white">
                {generating ? "Generating…" : "Generate Summary"}
              </Button>
              {data.summary && (
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm text-slate-200">
                  {data.summary}
                </div>
              )}
            </div>
          )}

          {view === "export" && (
            <div className="card-glow animate-fade-in-up mx-auto max-w-2xl rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-white">Download your resume</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Opens a print-ready preview. Choose "Save as PDF" in your browser's print dialog.
              </p>
              <Button onClick={handleDownload} className="gradient-btn mt-6 text-white">
                <Download className="mr-2 h-4 w-4" /> Download as PDF
              </Button>
            </div>
          )}

          {view === "settings" && (
            <div className="card-glow animate-fade-in-up mx-auto max-w-2xl rounded-2xl p-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Settings</h2>
                <p className="mt-1 text-sm text-muted-foreground">Manage your resume data and preferences.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium text-white">Default Template</div>
                <p className="text-xs text-muted-foreground mb-3">Choose which template loads by default.</p>
                <div className="flex flex-wrap gap-2">
                  {(["modern", "classic", "minimal"] as TemplateId[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemplate(t)}
                      className={
                        "rounded-md px-3 py-1.5 text-xs capitalize transition " +
                        (template === t
                          ? "bg-gradient-to-r from-blue-400 to-blue-900 text-white"
                          : "bg-white/5 text-muted-foreground hover:bg-white/10")
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium text-white">Resume Data</div>
                <p className="text-xs text-muted-foreground mb-3">Load sample data or clear all fields.</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => { setData(sampleResume); toast.success("Sample data loaded"); }}
                    className="gradient-btn text-white"
                    size="sm"
                  >
                    Load Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setData(emptyResume); toast.success("Resume cleared"); }}
                    className="border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium text-white">About</div>
                <p className="text-xs text-muted-foreground mt-1">
                  ResumeForge AI Builder · v1.0 · Crafted with a light blue gradient theme.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function PreviewWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-200/5 p-4 ring-1 ring-white/10">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3 px-1">Live Preview</div>
      {children}
    </div>
  );
}

function MobileNav({ active, onSelect }: { active: SidebarView; onSelect: (v: SidebarView) => void }) {
  const items: { id: SidebarView; label: string }[] = [
    { id: "builder", label: "Builder" },
    { id: "templates", label: "Templates" },
    { id: "ai", label: "AI Summary" },
    { id: "export", label: "Export" },
    { id: "settings", label: "Settings" },
  ];
  return (
    <div className="border-b border-white/10 bg-black/40 px-4 py-2 md:hidden">
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <button
            key={i.id}
            onClick={() => onSelect(i.id)}
            className={
              "rounded-md px-3 py-1.5 text-xs " +
              (active === i.id
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-muted-foreground hover:bg-white/10")
            }
          >
            {i.label}
          </button>
        ))}
      </div>
    </div>
  );
}
