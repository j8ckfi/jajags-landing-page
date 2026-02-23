import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { CurriculumLesson, CurriculumTrack } from "./types"

const dir = path.join(process.cwd(), "content/curriculum")

function parseLesson(trackSlug: string, fileName: string): CurriculumLesson {
  const slug = fileName.replace(/\.mdx$/, "")
  const raw = fs.readFileSync(path.join(dir, trackSlug, fileName), "utf8")
  const { data, content } = matter(raw)
  return {
    slug,
    track: trackSlug,
    title: data.title ?? "",
    order: data.order ?? 0,
    authors: data.authors ?? [],
    quiz: data.quiz ?? [],
    content,
  }
}

export function getAllTracks(): CurriculumTrack[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => fs.statSync(path.join(dir, f)).isDirectory())
    .map((trackSlug) => {
      const trackMeta = path.join(dir, trackSlug, "_meta.json")
      const meta = fs.existsSync(trackMeta)
        ? JSON.parse(fs.readFileSync(trackMeta, "utf8"))
        : {}
      const lessons = fs
        .readdirSync(path.join(dir, trackSlug))
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => parseLesson(trackSlug, f))
        .sort((a, b) => a.order - b.order)
      return {
        slug: trackSlug,
        title: meta.title ?? trackSlug,
        description: meta.description ?? "",
        lessons,
      }
    })
}

export function getTrackBySlug(trackSlug: string): CurriculumTrack | null {
  const trackDir = path.join(dir, trackSlug)
  if (!fs.existsSync(trackDir)) return null
  const trackMeta = path.join(trackDir, "_meta.json")
  const meta = fs.existsSync(trackMeta)
    ? JSON.parse(fs.readFileSync(trackMeta, "utf8"))
    : {}
  const lessons = fs
    .readdirSync(trackDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parseLesson(trackSlug, f))
    .sort((a, b) => a.order - b.order)
  return {
    slug: trackSlug,
    title: meta.title ?? trackSlug,
    description: meta.description ?? "",
    lessons,
  }
}

export function getLessonBySlug(
  trackSlug: string,
  lessonSlug: string
): CurriculumLesson | null {
  const fullPath = path.join(dir, trackSlug, `${lessonSlug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  return parseLesson(trackSlug, `${lessonSlug}.mdx`)
}
