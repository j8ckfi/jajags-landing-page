# jajags.tech

The website for jajags.tech — a student-run Hack Club chapter at Jefferson Academy Secondary.

## stack

- **Next.js 16** (App Router, static export)
- **Tailwind CSS v4**
- **MDX** via `next-mdx-remote` for all content
- **Turborepo** monorepo at the workspace root

## running locally

```bash
cd apps/web
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## adding content

All content lives in `apps/web/content/`. Every content type uses MDX with YAML frontmatter. See `branding.md` for visual guidelines and `lib/content/types.ts` for the full schema.

### blog post

```
apps/web/content/blog/your-post-slug.mdx
```

```yaml
---
title: "Post title"
date: "2026-02-23"
description: "One sentence description."
authors: ["Your Name"]
tags: ["tag"]
---
```

### research item

```
apps/web/content/research/your-item-slug.mdx
```

```yaml
---
title: "Research title"
date: "2026-02-23"
abstract: "What it's about."
authors: ["Your Name"]
tags: ["tag"]
status: published
---
```

### project

```
apps/web/content/projects/your-project-slug.mdx
```

```yaml
---
title: "Project name"
date: "2026-02-23"
description: "What it does."
authors: ["Your Name"]
tags: ["tag"]
url: "https://example.com"
github: "https://github.com/jajags-tech/repo"
status: active
---
```

### club-built tool

```
apps/web/content/tools/your-tool-slug.mdx
```

```yaml
---
title: "Tool name"
description: "What it does."
authors: ["Your Name"]
url: "https://example.com"
github: "https://github.com/jajags-tech/repo"
---
```

### curriculum lesson

```
apps/web/content/curriculum/[track-slug]/lesson-slug.mdx
```

Create a `_meta.json` in the track directory:

```json
{ "title": "Track Title", "description": "What this track covers." }
```

Lesson frontmatter:

```yaml
---
title: "Lesson title"
track: "track-slug"
order: 1
authors: ["Your Name"]
quiz:
  - question: "What does X do?"
    options: ["A", "B", "C", "D"]
    answer: 0
---
```

## builder profiles

Builder profiles at `/builders/[slug]` are auto-derived. Add your name to the `authors` field on any content and your profile is created automatically at build time.

## routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/blog` | Technical blog |
| `/research` | Research catalogue |
| `/projects` | Projects database |
| `/builders` | All builder profiles |
| `/builders/[slug]` | Individual builder |
| `/curriculum` | Learning tracks |
| `/curriculum/[track]/[lesson]` | Lesson + quiz |
| `/tools` | Club-built tools |
| `/library` | External curated tools |
| `/now` | Current semester focus |
| `/about` | About |
| `/join` | Join |
