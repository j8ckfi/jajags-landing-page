import Link from "next/link"
import { getAllTools } from "@/lib/content/tools"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export default function ToolsPage() {
  const tools = getAllTools()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">tools</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            things we built
          </h1>
          <p className="mt-4 text-foreground/50 leading-relaxed">
            open tools made by club members. use them, fork them, improve them.
          </p>
        </div>

        {tools.length === 0 ? (
          <p className="font-mono text-sm text-foreground/30">no tools yet.</p>
        ) : (
          <div className="divide-y divide-[#ebebeb]">
            {tools.map((tool) => (
              <div key={tool.slug} className="py-10 space-y-3">
                <div className="flex items-baseline gap-4">
                  <h2 className="font-display text-2xl md:text-3xl text-foreground">{tool.title}</h2>
                  <div className="flex items-center gap-3 font-mono text-xs text-foreground/30">
                    {tool.url && (
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        open ↗
                      </a>
                    )}
                    {tool.github && (
                      <a href={tool.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                        source ↗
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground/50 max-w-2xl leading-relaxed">{tool.description}</p>
                {tool.authors.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {tool.authors.map((a) => (
                      <Link
                        key={a}
                        href={`/builders/${a.toLowerCase().replace(/\s+/g, "-")}`}
                        className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors"
                      >
                        {a}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
