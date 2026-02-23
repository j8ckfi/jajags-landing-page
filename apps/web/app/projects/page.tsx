import Link from "next/link"
import type { CSSProperties } from "react"
import { getAllProjects } from "@/lib/content/projects"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

const statusColors: Record<string, string> = {
  active: "text-foreground border-foreground/30",
  shipped: "text-foreground/50 border-[#ebebeb]",
  archived: "text-foreground/30 border-[#ebebeb]",
}

// Painterly palettes: each is [from, to] in impressionist tones
const palettes: [string, string][] = [
  ["#c8d8e0", "#e8d4b0"],  // Monet sky + warm sand
  ["#d4c8e0", "#e8c8b8"],  // Renoir lavender + blush
  ["#b8d4c8", "#e4ddb0"],  // Pissarro sage + straw
  ["#e0c8b8", "#c8b8d4"],  // Sisley ochre + muted violet
  ["#c0d4e0", "#d4e0c0"],  // Boudin coastal + meadow
  ["#e0d0b8", "#c8d8d0"],  // warm linen + seafoam
  ["#d8c0c8", "#c8d4e0"],  // dusty rose + slate
  ["#c8d8b8", "#e4d0a8"],  // Morisot green + golden wheat
]

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.18'/%3E%3C/svg%3E")`

function slugHash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

function cardGradient(slug: string): CSSProperties {
  const h = slugHash(slug)
  const [from, to] = palettes[h % palettes.length]
  const angle = 110 + (h % 7) * 11
  return {
    backgroundImage: `${grain}, linear-gradient(${angle}deg, ${from}, ${to})`,
  }
}

// Library card gets its own fixed palette
const libraryGradient: CSSProperties = {
  backgroundImage: `${grain}, linear-gradient(118deg, #c8d4e0, #e4d8c0)`,
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">projects</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            what we&apos;ve built
          </h1>
          <p className="mt-4 text-foreground/50 leading-relaxed">
            tools, experiments, and products shipped by club members.
          </p>
        </div>

        {/* featured library card */}
        <Link
          href="/projects/library"
          className="group block mb-10 border border-[#ebebeb] hover:border-foreground/20 transition-colors overflow-hidden"
        >
          <div className="h-32 w-full" style={libraryGradient} />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 p-8 md:p-10">
            <div className="space-y-3 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">club resource</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground leading-snug">Library</h2>
              <p className="text-foreground/50 leading-relaxed">
                A curated set of tools worth your time — IDEs, AI tools, design software, infrastructure, and more.
                Filterable by free and ChromeOS/web-accessible.
              </p>
            </div>
            <span className="font-mono text-sm text-foreground/30 group-hover:text-foreground transition-colors shrink-0">
              browse &rarr;
            </span>
          </div>
        </Link>

        {/* member projects grid */}
        {projects.length === 0 ? (
          <p className="font-mono text-sm text-foreground/30 py-4">no member projects yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.slug} className="border border-[#ebebeb] flex flex-col">
                <div className="h-28 w-full" style={cardGradient(project.slug)} />
                <div className="p-7 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-xl text-foreground leading-snug">
                      {project.title}
                    </h2>
                    <span className={`font-mono text-xs border px-2 py-0.5 shrink-0 ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-sm text-foreground/50 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="space-y-3 mt-auto">
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono text-xs text-foreground/30 border border-[#ebebeb] px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {project.authors.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {project.authors.map((a) => (
                            <Link
                              key={a}
                              href={`/builders/${a.toLowerCase().replace(/\s+/g, "-")}`}
                              className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors"
                            >
                              {a}
                            </Link>
                          ))}
                        </div>
                      ) : <span />}

                      <div className="flex gap-4">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors"
                          >
                            site ↗
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors"
                          >
                            github ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
