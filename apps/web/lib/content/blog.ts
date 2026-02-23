import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost } from "./types"

const dir = path.join(process.cwd(), "content/blog")

function parse(fileName: string): BlogPost {
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
    painting: data.painting,
    content,
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  return parse(`${slug}.mdx`)
}
