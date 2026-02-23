import Link from "next/link"
import { getAllResearch } from "@/lib/content/research"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export default function ResearchPage() {
  const items = getAllResearch().filter((r) => r.status === "published")

  const authorSet = new Set(items.flatMap((r) => r.authors))
  const tagSet = new Set(items.flatMap((r) => r.tags))

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">

        <div className="mb-20 border-b border-[#ebebeb] pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">research</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight max-w-3xl">
            research catalogue
          </h1>
          <p className="mt-4 text-foreground/50 leading-relaxed max-w-xl">
            papers, investigations, and long-form explorations by club members.
            everything is open access and published with a DOI.
          </p>

          <div className="mt-12 grid grid-cols-3 md:grid-cols-4 gap-px bg-[#ebebeb]">
            <div className="bg-white px-6 py-5">
              <p className="font-display text-3xl text-foreground">{items.length}</p>
              <p className="font-mono text-xs text-foreground/30 mt-1 uppercase tracking-widest">papers</p>
            </div>
            <div className="bg-white px-6 py-5">
              <p className="font-display text-3xl text-foreground">{authorSet.size}</p>
              <p className="font-mono text-xs text-foreground/30 mt-1 uppercase tracking-widest">authors</p>
            </div>
            <div className="bg-white px-6 py-5">
              <p className="font-display text-3xl text-foreground">{tagSet.size}</p>
              <p className="font-mono text-xs text-foreground/30 mt-1 uppercase tracking-widest">topics</p>
            </div>
            <div className="hidden md:block bg-white px-6 py-5">
              <p className="font-display text-3xl text-foreground">
                {items.filter((r) => r.doi).length}
              </p>
              <p className="font-mono text-xs text-foreground/30 mt-1 uppercase tracking-widest">on zenodo</p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="font-mono text-sm text-foreground/30">no research published yet.</p>
        ) : (
          <div className="divide-y divide-[#ebebeb]">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/research/${item.slug}`}
                className="group grid md:grid-cols-[140px_1fr] gap-4 md:gap-12 py-10 hover:opacity-60 transition-opacity"
              >
                <div className="space-y-1">
                  <p className="font-mono text-xs text-foreground/30">{item.date}</p>
                  {item.doi && (
                    <p className="font-mono text-xs text-foreground/20">DOI</p>
                  )}
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-2xl md:text-3xl text-foreground leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-sm text-foreground/50 leading-relaxed max-w-2xl">
                    {item.abstract}
                  </p>
                  {item.authors.length > 0 && (
                    <p className="font-mono text-xs text-foreground/30">
                      {item.authors.join(", ")}
                    </p>
                  )}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs text-foreground/30 border border-[#ebebeb] px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
