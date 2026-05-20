import type { ResumeData, TemplateId } from "@/lib/resume-types";
import { Mail, Phone, MapPin } from "lucide-react";

export function ResumePreview({ data, template }: { data: ResumeData; template: TemplateId }) {
  if (template === "classic") return <ClassicTemplate data={data} />;
  if (template === "minimal") return <MinimalTemplate data={data} />;
  return <ModernTemplate data={data} />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">{title}</h3>
      <div className="text-[13px] leading-relaxed text-slate-700 whitespace-pre-line">{children}</div>
    </section>
  );
}

function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div id="resume-print" className="mx-auto w-full max-w-[820px] bg-white text-slate-900 shadow-2xl">
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-white">
        <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
        <p className="mt-1 text-blue-100">{data.title || "Your Title"}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-blue-50">
          {data.email && (<span className="flex items-center gap-1"><Mail className="h-3 w-3" />{data.email}</span>)}
          {data.phone && (<span className="flex items-center gap-1"><Phone className="h-3 w-3" />{data.phone}</span>)}
          {data.location && (<span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{data.location}</span>)}
        </div>
      </div>
      <div className="p-8">
        {data.summary && <Section title="Summary">{data.summary}</Section>}
        {data.skills && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {data.skills.split(/[,\n]/).map((s) => s.trim()).filter(Boolean).map((s) => (
                <span key={s} className="rounded-md bg-blue-50 px-2 py-0.5 text-[12px] text-blue-700">{s}</span>
              ))}
            </div>
          </Section>
        )}
        {data.experience && <Section title="Experience">{data.experience}</Section>}
        {data.projects && <Section title="Projects">{data.projects}</Section>}
        {data.education && <Section title="Education">{data.education}</Section>}
      </div>
    </div>
  );
}

function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div id="resume-print" className="mx-auto w-full max-w-[820px] bg-white p-10 text-slate-900 shadow-2xl">
      <div className="border-b-2 border-slate-900 pb-4 text-center">
        <h1 className="text-3xl font-serif font-bold tracking-wide">{data.name || "Your Name"}</h1>
        <p className="mt-1 text-sm text-slate-600">{data.title}</p>
        <div className="mt-2 text-xs text-slate-500">
          {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
        </div>
      </div>
      <div className="pt-5">
        {data.summary && <Section title="Summary">{data.summary}</Section>}
        {data.experience && <Section title="Experience">{data.experience}</Section>}
        {data.education && <Section title="Education">{data.education}</Section>}
        {data.skills && <Section title="Skills">{data.skills}</Section>}
        {data.projects && <Section title="Projects">{data.projects}</Section>}
      </div>
    </div>
  );
}

function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div id="resume-print" className="mx-auto w-full max-w-[820px] bg-white p-10 text-slate-900 shadow-2xl">
      <h1 className="text-4xl font-light tracking-tight">{data.name || "Your Name"}</h1>
      <p className="mt-1 text-sm uppercase tracking-[0.25em] text-slate-500">{data.title}</p>
      <div className="mt-2 text-xs text-slate-500">
        {[data.email, data.phone, data.location].filter(Boolean).join(" — ")}
      </div>
      <div className="mt-8 grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-5">
          {data.skills && <Section title="Skills">{data.skills}</Section>}
          {data.education && <Section title="Education">{data.education}</Section>}
        </div>
        <div className="col-span-2 space-y-5">
          {data.summary && <Section title="Profile">{data.summary}</Section>}
          {data.experience && <Section title="Experience">{data.experience}</Section>}
          {data.projects && <Section title="Projects">{data.projects}</Section>}
        </div>
      </div>
    </div>
  );
}
