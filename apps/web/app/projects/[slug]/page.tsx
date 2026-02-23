import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="mb-4">
          <Link href="/projects" className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
            &larr; projects
          </Link>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-16 items-start">
          <div>
            <div className="mb-12 space-y-4 border-b border-[#ebebeb] pb-10">
              <p className="font-mono text-xs text-foreground/30">{project.date} &middot; {project.status}</p>
              <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
                {project.title}
              </h1>
              <p className="text-lg text-foreground/60 leading-relaxed max-w-xl">
                {project.description}
              </p>
              <div className="flex items-center gap-4 font-mono text-xs text-foreground/30 pt-2">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    visit site ↗
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    view source ↗
                  </a>
                )}
              </div>
            </div>

            <article className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-normal prose-p:leading-relaxed prose-p:text-foreground/80 prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 prose-code:font-mono prose-code:text-sm prose-code:bg-[#f9f8f6] prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
              <MDXRemote source={project.content} />
            </article>
          </div>

          <aside className="hidden md:block sticky top-24 space-y-8 text-sm">
            {project.authors.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">built by</p>
                <div className="space-y-2">
                  {project.authors.map((a) => (
                    <Link key={a} href={`/builders/${a.toLowerCase().replace(/\s+/g, "-")}`} className="block font-display text-foreground/70 hover:text-foreground transition-colors">
                      {a}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {project.tags.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">tags</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-foreground/40 border border-[#ebebeb] px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
