import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Tool } from "./types"

const dir = path.join(process.cwd(), "content/tools")

function parse(fileName: string): Tool {
  const slug = fileName.replace(/\.mdx$/, "")
  const raw = fs.readFileSync(path.join(dir, fileName), "utf8")
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    authors: data.authors ?? [],
    url: data.url,
    github: data.github,
    content,
  }
}

export function getAllTools(): Tool[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
}

export function getToolBySlug(slug: string): Tool | null {
  const fullPath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  return parse(`${slug}.mdx`)
}
