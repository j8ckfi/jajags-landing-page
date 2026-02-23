import Link from "next/link"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">join</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight mb-6">
            build with us.
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed mb-16">
            if you want to learn by doing and ask deeper questions about software, you belong here.
          </p>

          <div className="space-y-12 border-t border-[#ebebeb] pt-12">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">how to join</p>
              <ol className="space-y-4">
                <li className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-foreground/20 w-4 shrink-0">1.</span>
                  <p className="text-foreground/70">join the discord and introduce yourself.</p>
                </li>
                <li className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-foreground/20 w-4 shrink-0">2.</span>
                  <p className="text-foreground/70">show up to the next meeting and share what you want to build.</p>
                </li>
              </ol>
            </div>

            <Link
              href="https://discord.gg/cSSZGMMqSK"
              className="inline-block bg-foreground text-white text-sm px-8 py-3 hover:opacity-80 transition-opacity"
            >
              join the discord
            </Link>
          </div>
        </div>
      </main>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
