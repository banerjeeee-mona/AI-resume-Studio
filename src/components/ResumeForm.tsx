import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import type { ResumeData } from "@/lib/resume-types";
import { sampleResume } from "@/lib/resume-types";

export function ResumeForm({
  data,
  onChange,
  onGenerate,
  generating,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
  onGenerate: () => void;
  generating: boolean;
}) {
  const set = <K extends keyof ResumeData>(k: K, v: ResumeData[K]) => onChange({ ...data, [k]: v });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Your Details</h2>
          <p className="text-sm text-muted-foreground">Fill in your info — we'll handle the rest.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(sampleResume)}
          className="border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Wand2 className="mr-2 h-4 w-4" /> Load sample
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Full Name">
          <Input value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
        </Field>
        <Field label="Job Title">
          <Input value={data.title} onChange={(e) => set("title", e.target.value)} placeholder="Product Designer" />
        </Field>
        <Field label="Email">
          <Input value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@email.com" />
        </Field>
        <Field label="Phone">
          <Input value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 555 000 0000" />
        </Field>
        <Field label="Location" className="md:col-span-2">
          <Input value={data.location} onChange={(e) => set("location", e.target.value)} placeholder="City, Country" />
        </Field>
      </div>

      <Field label="Skills (comma separated)">
        <Textarea
          rows={2}
          value={data.skills}
          onChange={(e) => set("skills", e.target.value)}
          placeholder="React, TypeScript, UI Design, …"
        />
      </Field>

      <Field label="Education">
        <Textarea
          rows={3}
          value={data.education}
          onChange={(e) => set("education", e.target.value)}
          placeholder="B.S. Computer Science — Stanford University (2020)"
        />
      </Field>

      <Field label="Experience">
        <Textarea
          rows={5}
          value={data.experience}
          onChange={(e) => set("experience", e.target.value)}
          placeholder={"Senior Engineer — Company (2022–Present)\n• Led ...\n• Built ..."}
        />
      </Field>

      <Field label="Projects">
        <Textarea
          rows={3}
          value={data.projects}
          onChange={(e) => set("projects", e.target.value)}
          placeholder="Project name — short description."
        />
      </Field>

      <div className="rounded-xl border border-white/10 bg-gradient-to-r from-blue-600/10 to-violet-600/10 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
          <Sparkles className="h-4 w-4 text-blue-300" /> AI Professional Summary
        </div>
        <Textarea
          rows={4}
          value={data.summary}
          onChange={(e) => set("summary", e.target.value)}
          placeholder="Click 'Generate' to create an ATS-friendly summary."
        />
        <Button onClick={onGenerate} disabled={generating} className="gradient-btn mt-3 text-white">
          {generating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate with AI
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
