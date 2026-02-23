import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/content/blog"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import { CodeBlock } from "@/components/CodeBlock"

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

const components = {
  pre: ({ children, ...props }: any) => (
    <CodeBlock {...props}>{children?.props?.children}</CodeBlock>
  ),
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl mb-4">
          <Link
            href="/blog"
            className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors"
          >
            &larr; blog
          </Link>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-16 items-start">
          <div>
            <div className="mb-12 space-y-4">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-foreground/30">
                <span>{post.date}</span>
                {post.authors.length > 0 && (
                  <span>
                    {post.authors.map((a, i) => (
                      <span key={a}>
                        {i > 0 && ", "}
                        <Link href={`/builders/${a.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-foreground transition-colors">
                          {a}
                        </Link>
                      </span>
                    ))}
                  </span>
                )}
              </div>
              {post.description && (
                <p className="text-lg text-foreground/60 leading-relaxed max-w-xl">
                  {post.description}
                </p>
              )}
            </div>

            <article className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-normal prose-p:leading-relaxed prose-p:text-foreground/80 prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 prose-code:font-mono prose-code:text-sm prose-code:bg-[#f9f8f6] prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
              <MDXRemote source={post.content} components={components} />
            </article>
          </div>

          <aside className="hidden md:block sticky top-24 space-y-8 text-sm">
            {post.tags.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-foreground/40 border border-[#ebebeb] px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {post.authors.length > 0 && (
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">authors</p>
                <div className="space-y-2">
                  {post.authors.map((a) => (
                    <Link
                      key={a}
                      href={`/builders/${a.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block font-display text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {a}
                    </Link>
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
