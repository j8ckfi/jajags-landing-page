import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { disciplines, getDisciplineBySlug, contentMatchesDiscipline } from "@/lib/disciplines"
import { getAllPosts } from "@/lib/content/blog"
import { getAllResearch } from "@/lib/content/research"
import { getAllProjects } from "@/lib/content/projects"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export function generateStaticParams() {
  return disciplines.map((d) => ({ slug: d.slug }))
}

export default async function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const discipline = getDisciplineBySlug(slug)
  if (!discipline) notFound()

  const allPosts = getAllPosts()
  const allResearch = getAllResearch().filter((r) => r.status === "published")
  const allProjects = getAllProjects()

  const posts = allPosts.filter((p) => contentMatchesDiscipline(p.tags, discipline))
  const research = allResearch.filter((r) => contentMatchesDiscipline(r.tags, discipline))
  const projects = allProjects.filter((p) => contentMatchesDiscipline(p.tags, discipline))

  const authorSet = new Set([
    ...posts.flatMap((p) => p.authors),
    ...research.flatMap((r) => r.authors),
    ...projects.flatMap((p) => p.authors),
  ])
  const contributors = [...authorSet].sort()

  const hasContent = posts.length > 0 || research.length > 0 || projects.length > 0

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={discipline.painting}
            alt={discipline.paintingAlt}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-14">
          <Link
            href="/"
            className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors mb-6 block"
          >
            &larr; home
          </Link>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            {discipline.label}
          </h1>
          <p className="mt-3 text-foreground/50 text-lg max-w-md leading-relaxed">
            {discipline.line}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">

        {!hasContent && (
          <p className="font-mono text-sm text-foreground/30">
            no content here yet. start tagging work with the right discipline.
          </p>
        )}

        {/* Contributors strip */}
        {contributors.length > 0 && (
          <div className="mb-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[#ebebeb] pb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/30 shrink-0">contributors</p>
            {contributors.map((name) => (
              <Link
                key={name}
                href={`/builders/${name.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-mono text-xs text-foreground/50 hover:text-foreground transition-colors"
              >
                {name}
              </Link>
            ))}
          </div>
        )}

        <div className="space-y-24">
          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <div className="flex items-baseline justify-between mb-10">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">projects</p>
                <Link href="/projects" className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
                  all projects &rarr;
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.slug} className="border border-[#ebebeb] p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl text-foreground leading-snug">{project.title}</h3>
                      <span className="font-mono text-xs text-foreground/30 border border-[#ebebeb] px-2 py-0.5 shrink-0">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/50 leading-relaxed">{project.description}</p>
                    <div className="flex gap-4 pt-1">
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
                          site ↗
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
                          github ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Research */}
          {research.length > 0 && (
            <section>
              <div className="flex items-baseline justify-between mb-10">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">research</p>
                <Link href="/research" className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
                  all research &rarr;
                </Link>
              </div>
              <div className="divide-y divide-[#ebebeb]">
                {research.map((item) => (
                  <Link key={item.slug} href={`/research/${item.slug}`}
                    className="group grid md:grid-cols-[120px_1fr] gap-4 md:gap-10 py-8 hover:opacity-60 transition-opacity">
                    <p className="font-mono text-xs text-foreground/30 pt-1">{item.date}</p>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl text-foreground leading-snug">{item.title}</h3>
                      <p className="text-sm text-foreground/50 leading-relaxed max-w-2xl">{item.abstract}</p>
                      <p className="font-mono text-xs text-foreground/30">{item.authors.join(", ")}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Blog */}
          {posts.length > 0 && (
            <section>
              <div className="flex items-baseline justify-between mb-10">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">writing</p>
                <Link href="/blog" className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
                  all posts &rarr;
                </Link>
              </div>
              <div className="divide-y divide-[#ebebeb]">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}
                    className="group grid md:grid-cols-[120px_1fr] gap-4 md:gap-10 py-8 hover:opacity-60 transition-opacity">
                    <p className="font-mono text-xs text-foreground/30 pt-1">{post.date}</p>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl text-foreground leading-snug">{post.title}</h3>
                      <p className="text-sm text-foreground/50 leading-relaxed max-w-2xl">{post.description}</p>
                      <p className="font-mono text-xs text-foreground/30">{post.authors.join(", ")}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
