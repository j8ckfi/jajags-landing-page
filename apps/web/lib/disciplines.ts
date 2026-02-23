export type Discipline = {
  slug: string
  label: string
  painting: string
  paintingAlt: string
  line: string
  tags: string[]
}

export const disciplines: Discipline[] = [
  {
    slug: "artificial-intelligence",
    label: "artificial intelligence",
    painting: "/paintings/jeanne_samary_1970.17.78.webp",
    paintingAlt: "Jeanne Samary by Renoir",
    line: "language, vision, and the models underneath.",
    tags: ["AI", "machine learning", "NLP", "artificial intelligence", "inference", "fine-tuning", "LLM", "model compression", "knowledge distillation"],
  },
  {
    slug: "systems",
    label: "systems",
    painting: "/paintings/notre_dame_de_paris_2015.19.79.webp",
    paintingAlt: "Notre-Dame de Paris",
    line: "architecture, compilers, operating systems.",
    tags: ["systems", "architecture", "compilers", "OS", "networking", "infrastructure"],
  },
  {
    slug: "agents",
    label: "agents",
    painting: "/paintings/oarsmen_at_chatou_1951.5.2.webp",
    paintingAlt: "Oarsmen at Chatou by Renoir",
    line: "computers building computers.",
    tags: ["agents", "automation", "multi-agent", "web app", "open access"],
  },
  {
    slug: "developer-tools",
    label: "developer tools",
    painting: "/paintings/charing_cross_bridge_london_1985.64.32.webp",
    paintingAlt: "Charing Cross Bridge by Monet",
    line: "the tools that make building faster.",
    tags: ["developer tools", "CLI", "tooling", "bash", "devtools"],
  },
  {
    slug: "data",
    label: "data & research",
    painting: "/paintings/the_seine_at_giverny_1963.10.180.webp",
    paintingAlt: "The Seine at Giverny",
    line: "questions that take longer than a sprint.",
    tags: ["data", "data analysis", "statistics", "equity", "urban systems", "transit"],
  },
  {
    slug: "design",
    label: "design",
    painting: "/paintings/poppies_isles_of_shoals_1997.135.1.webp",
    paintingAlt: "Poppies at the Isles of Shoals",
    line: "form, typography, and things that feel right.",
    tags: ["design", "UI", "typography", "UX"],
  },
  {
    slug: "education",
    label: "education",
    painting: "/paintings/first_snow_at_veneux-nadon_1983.98.1.webp",
    paintingAlt: "First Snow at Veneux-Nadon by Sisley",
    line: "learning in public. teaching by building.",
    tags: ["education", "learning", "teaching", "curriculum"],
  },
  {
    slug: "misc",
    label: "misc",
    painting: "/paintings/the_mussel_harvest_1954.8.1.webp",
    paintingAlt: "The Mussel Harvest",
    line: "everything else.",
    tags: [],
  },
]

export function getDisciplineBySlug(slug: string): Discipline | undefined {
  return disciplines.find((d) => d.slug === slug)
}

// Returns true if any content tag matches a discipline tag (case-insensitive).
// For "misc", returns true if the item matches no other discipline.
export function contentMatchesDiscipline(
  contentTags: string[],
  discipline: Discipline,
  allDisciplines: Discipline[] = disciplines,
): boolean {
  if (discipline.slug === "misc") {
    const otherDisciplines = allDisciplines.filter((d) => d.slug !== "misc")
    return !otherDisciplines.some((d) => contentMatchesDiscipline(contentTags, d, allDisciplines))
  }
  const lower = contentTags.map((t) => t.toLowerCase())
  return discipline.tags.some((tag) => lower.includes(tag.toLowerCase()))
}
