import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllBuilders, getBuilderBySlug } from "@/lib/content/builders"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export async function generateStaticParams() {
  return getAllBuilders().map((b) => ({ slug: b.slug }))
}

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const builder = getBuilderBySlug(slug)
  if (!builder) notFound()

  const hasContent =
    builder.posts.length > 0 ||
    builder.research.length > 0 ||
    builder.projects.length > 0 ||
    builder.tools.length > 0

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="mb-4">
          <Link href="/builders" className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
            &larr; builders
          </Link>
        </div>

        <div className="mb-20 pt-8 border-b border-[#ebebeb] pb-12">
          <h1 className="font-display text-5xl md:text-6xl text-foreground">{builder.name}</h1>
        </div>

        {!hasContent && (
          <p className="font-mono text-sm text-foreground/30">nothing published yet.</p>
        )}

        <div className="space-y-20">
          {builder.projects.length > 0 && (
            <section className="space-y-8">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">projects</p>
              <div className="divide-y divide-[#ebebeb]">
                {builder.projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group flex items-baseline justify-between py-5 hover:opacity-60 transition-opacity"
                  >
                    <div className="space-y-1">
                      <p className="font-display text-xl text-foreground">{project.title}</p>
                      <p className="text-sm text-foreground/40">{project.description}</p>
                    </div>
                    <span className="font-mono text-xs text-foreground/30 shrink-0 ml-8">{project.status}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {builder.posts.length > 0 && (
            <section className="space-y-8">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">blog</p>
              <div className="divide-y divide-[#ebebeb]">
                {builder.posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-baseline justify-between py-5 hover:opacity-60 transition-opacity"
                  >
                    <div className="space-y-1">
                      <p className="font-display text-xl text-foreground">{post.title}</p>
                      <p className="text-sm text-foreground/40">{post.description}</p>
                    </div>
                    <span className="font-mono text-xs text-foreground/30 shrink-0 ml-8">{post.date}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {builder.research.length > 0 && (
            <section className="space-y-8">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">research</p>
              <div className="divide-y divide-[#ebebeb]">
                {builder.research.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/research/${item.slug}`}
                    className="group flex items-baseline justify-between py-5 hover:opacity-60 transition-opacity"
                  >
                    <div className="space-y-1">
                      <p className="font-display text-xl text-foreground">{item.title}</p>
                      <p className="text-sm text-foreground/40 italic">{item.abstract}</p>
                    </div>
                    <span className="font-mono text-xs text-foreground/30 shrink-0 ml-8">{item.date}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {builder.tools.length > 0 && (
            <section className="space-y-8">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">tools</p>
              <div className="divide-y divide-[#ebebeb]">
                {builder.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools`}
                    className="group flex items-baseline justify-between py-5 hover:opacity-60 transition-opacity"
                  >
                    <div className="space-y-1">
                      <p className="font-display text-xl text-foreground">{tool.title}</p>
                      <p className="text-sm text-foreground/40">{tool.description}</p>
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
