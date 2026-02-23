import Link from "next/link"
import { getAllBuilders } from "@/lib/content/builders"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export default function BuildersPage() {
  const builders = getAllBuilders()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">builders</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            the people
          </h1>
          <p className="mt-4 text-foreground/50 leading-relaxed">
            everyone who has shipped something here.
          </p>
        </div>

        {builders.length === 0 ? (
          <p className="font-mono text-sm text-foreground/30">no builders yet.</p>
        ) : (
          <div className="divide-y divide-[#ebebeb]">
            {builders.map((builder) => {
              const total =
                builder.posts.length +
                builder.research.length +
                builder.projects.length +
                builder.tools.length
              return (
                <Link
                  key={builder.slug}
                  href={`/builders/${builder.slug}`}
                  className="group flex items-baseline justify-between py-6 hover:opacity-60 transition-opacity"
                >
                  <span className="font-display text-2xl text-foreground">{builder.name}</span>
                  <span className="font-mono text-xs text-foreground/30">
                    {total} {total === 1 ? "contribution" : "contributions"}
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </main>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
