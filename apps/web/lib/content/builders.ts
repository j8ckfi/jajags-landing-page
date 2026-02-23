import { getAllPosts } from "./blog"
import { getAllResearch } from "./research"
import { getAllProjects } from "./projects"
import { getAllTools } from "./tools"
import type { BuilderProfile } from "./types"

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export function getAllBuilders(): BuilderProfile[] {
  const posts = getAllPosts()
  const research = getAllResearch()
  const projects = getAllProjects()
  const tools = getAllTools()

  const nameMap = new Map<string, BuilderProfile>()

  function ensure(name: string): BuilderProfile {
    const slug = nameToSlug(name)
    if (!nameMap.has(slug)) {
      nameMap.set(slug, { slug, name, posts: [], research: [], projects: [], tools: [] })
    }
    return nameMap.get(slug)!
  }

  for (const post of posts) {
    for (const author of post.authors) {
      ensure(author).posts.push({ slug: post.slug, title: post.title, date: post.date, description: post.description })
    }
  }
  for (const item of research) {
    for (const author of item.authors) {
      ensure(author).research.push({ slug: item.slug, title: item.title, date: item.date, abstract: item.abstract })
    }
  }
  for (const project of projects) {
    for (const author of project.authors) {
      ensure(author).projects.push({ slug: project.slug, title: project.title, date: project.date, description: project.description, status: project.status })
    }
  }
  for (const tool of tools) {
    for (const author of tool.authors) {
      ensure(author).tools.push({ slug: tool.slug, title: tool.title, description: tool.description })
    }
  }

  return Array.from(nameMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function getBuilderBySlug(slug: string): BuilderProfile | null {
  return getAllBuilders().find((b) => b.slug === slug) ?? null
}
