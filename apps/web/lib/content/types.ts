export type BlogPost = {
  slug: string
  title: string
  date: string
  description: string
  authors: string[]
  tags: string[]
  painting?: string
  content: string
}

export type ResearchItem = {
  slug: string
  title: string
  date: string
  abstract: string
  authors: string[]
  tags: string[]
  status: "draft" | "published"
  doi?: string
  citation?: string
  github?: string
  content: string
}

export type Project = {
  slug: string
  title: string
  date: string
  description: string
  authors: string[]
  tags: string[]
  url?: string
  github?: string
  status: "active" | "archived" | "shipped"
  content: string
}

export type Tool = {
  slug: string
  title: string
  description: string
  authors: string[]
  url?: string
  github?: string
  content: string
}

export type QuizQuestion = {
  question: string
  options: string[]
  answer: number
}

export type CurriculumLesson = {
  slug: string
  track: string
  title: string
  order: number
  authors: string[]
  quiz: QuizQuestion[]
  content: string
}

export type CurriculumTrack = {
  slug: string
  title: string
  description: string
  lessons: CurriculumLesson[]
}

export type BuilderProfile = {
  slug: string
  name: string
  posts: Pick<BlogPost, "slug" | "title" | "date" | "description">[]
  research: Pick<ResearchItem, "slug" | "title" | "date" | "abstract">[]
  projects: Pick<Project, "slug" | "title" | "date" | "description" | "status">[]
  tools: Pick<Tool, "slug" | "title" | "description">[]
}
