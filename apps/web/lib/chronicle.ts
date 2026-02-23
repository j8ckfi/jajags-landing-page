import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/chronicle')

const DEFAULT_IMAGES = [
  '/images/wanderer.jpg',
  '/images/socrates.jpg',
  '/images/temeraire.jpg',
]

function getDefaultImage(slug: string): string {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i)
    hash = hash & hash
  }
  return DEFAULT_IMAGES[Math.abs(hash) % DEFAULT_IMAGES.length]
}

export type Post = {
  slug: string
  meta: {
    title: string
    date: string
    description: string
    image: string
    [key: string]: any
  }
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      meta: {
        ...data,
        image: data.image || getDefaultImage(slug),
      } as Post['meta'],
      content,
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    meta: {
      ...data,
      image: data.image || getDefaultImage(slug),
    } as Post['meta'],
    content,
  }
}

