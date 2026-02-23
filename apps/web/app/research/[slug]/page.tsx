import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getAllResearch, getResearchBySlug } from "@/lib/content/research"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export async function generateStaticParams() {
  return getAllResearch().map((r) => ({ slug: r.slug }))
}

export default async function ResearchItemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getResearchBySlug(slug)
  if (!item) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="mb-4">
          <Link href="/research" className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
            &larr; research
          </Link>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-16 items-start">
          <div>
            <div className="mb-12 space-y-4 border-b border-[#ebebeb] pb-10">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">
                {item.status === "draft" ? "draft" : "published"} &middot; {item.date}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
                {item.title}
              </h1>
              <p className="text-lg text-foreground/60 leading-relaxed max-w-xl italic font-display">
                {item.abstract}
              </p>
              {item.authors.length > 0 && (
                <p className="font-mono text-xs text-foreground/30">
                  {item.authors.map((a, i) => (
                    <span key={a}>
                      {i > 0 && ", "}
                      <Link href={`/builders/${a.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-foreground transition-colors">
                        {a}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>

            <article className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-normal prose-p:leading-relaxed prose-p:text-foreground/80 prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 prose-code:font-mono prose-code:text-sm prose-code:bg-[#f9f8f6] prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-table:text-sm prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:tracking-widest prose-th:text-foreground/40 prose-td:text-foreground/70 prose-thead:border-b prose-thead:border-[#ebebeb] prose-tr:border-b prose-tr:border-[#ebebeb]">
              <MDXRemote source={item.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </article>
          </div>

          <aside className="hidden md:block sticky top-24 space-y-8 text-sm">
            {item.doi && (
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">doi</p>
                <a
                  href={item.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-foreground/50 hover:text-foreground transition-colors break-all"
                >
                  {item.doi.replace("https://doi.org/", "")} ↗
                </a>
              </div>
            )}
            {item.github && (
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">code</p>
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-foreground/50 hover:text-foreground transition-colors"
                >
                  github ↗
                </a>
              </div>
            )}
            {item.tags.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-foreground/40 border border-[#ebebeb] px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {item.citation && (
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">cite as</p>
                <p className="font-mono text-xs text-foreground/40 leading-relaxed">{item.citation}</p>
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
