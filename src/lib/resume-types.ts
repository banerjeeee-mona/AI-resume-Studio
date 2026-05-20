export type ResumeData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  education: string;
  experience: string;
  projects: string;
};

export const emptyResume: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: "",
  education: "",
  experience: "",
  projects: "",
};

export const sampleResume: ResumeData = {
  name: "Alex Johnson",
  title: "Senior Frontend Engineer",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary: "",
  skills: "React, TypeScript, Next.js, Node.js, Tailwind CSS, GraphQL, AWS, Testing (Jest, Playwright)",
  education: "B.S. Computer Science — University of California, Berkeley (2018)",
  experience:
    "Senior Frontend Engineer — Acme Corp (2022–Present)\n• Led migration of legacy app to Next.js, improving LCP by 42%.\n• Mentored 4 engineers and established the design-system guild.\n\nFrontend Engineer — Bright Labs (2019–2022)\n• Shipped a real-time analytics dashboard used by 30k+ daily users.\n• Built reusable component library adopted across 6 product teams.",
  projects:
    "ResumeForge — open-source AI resume builder (10k stars).\nDevPortfolio Kit — Next.js starter template with 5k+ downloads.",
};

export type TemplateId = "modern" | "classic" | "minimal";
