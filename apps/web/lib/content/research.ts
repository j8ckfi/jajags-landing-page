import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { ResearchItem } from "./types"

const dir = path.join(process.cwd(), "content/research")

function parse(fileName: string): ResearchItem {
  const slug = fileName.replace(/\.mdx$/, "")
  const raw = fs.readFileSync(path.join(dir, fileName), "utf8")
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    abstract: data.abstract ?? "",
    authors: data.authors ?? [],
    tags: data.tags ?? [],
    status: data.status ?? "published",
    doi: data.doi,
    citation: data.citation,
    github: data.github,
    content,
  }
}

export function getAllResearch(): ResearchItem[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getResearchBySlug(slug: string): ResearchItem | null {
  const fullPath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  return parse(`${slug}.mdx`)
}
