import type { ResumeData } from "./resume-types";

export async function generateSummary(data: ResumeData): Promise<string> {
  await new Promise((r) => setTimeout(r, 1400));

  const name = data.name?.trim() || "A results-driven professional";
  const title = data.title?.trim() || "software professional";
  const topSkills =
    (data.skills || "")
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5)
      .join(", ") || "modern web technologies";

  const yearsMatch = (data.experience || "").match(/(\d{4}).*?(\d{4}|Present|present)/);
  const yearsLine = yearsMatch ? "with multiple years of hands-on experience" : "with a track record of shipping high-impact features";

  return [
    `${name} is a ${title} ${yearsLine}, specializing in ${topSkills}.`,
    `Adept at translating business goals into scalable, ATS-friendly solutions, collaborating across product, design, and engineering to deliver measurable outcomes.`,
    `Recognized for clean architecture, strong communication, and a bias for shipping.`,
  ].join(" ");
}
