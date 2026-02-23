import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project } from "./types"

const dir = path.join(process.cwd(), "content/projects")

function parse(fileName: string): Project {
  const slug = fileName.replace(/\.mdx$/, "")
  const raw = fs.readFileSync(path.join(dir, fileName), "utf8")
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    authors: data.authors ?? [],
    tags: data.tags ?? [],
    url: data.url,
    github: data.github,
    status: data.status ?? "active",
    content,
  }
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  return parse(`${slug}.mdx`)
}
