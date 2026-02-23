import Link from "next/link"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export default function NowPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">now</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight mb-10">
            spring 2026
          </h1>

          <div className="space-y-12 text-foreground/70 leading-relaxed">
            <section className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">building</p>
              <p className="font-display text-2xl text-foreground/80 italic leading-snug">
                AI tools for student researchers — a small suite of open tools that help students
                at Jefferson Academy search, annotate, and synthesize academic literature.
              </p>
            </section>

            <div className="h-px bg-[#ebebeb]" />

            <section className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">studying</p>
              <p className="text-lg leading-relaxed">
                the attention mechanism, how transformers encode context, and what it means
                to fine-tune a model responsibly. we&apos;re reading Karpathy&apos;s lectures and
                Anthropic&apos;s Constitutional AI paper.
              </p>
            </section>

            <div className="h-px bg-[#ebebeb]" />

            <section className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">next meeting</p>
              <p className="text-lg">
                1st and 3rd Thursdays of each month, lunch, Room 202.
              </p>
              <Link href="/join" className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                how to join &rarr;
              </Link>
            </section>
          </div>

          <p className="font-mono text-xs text-foreground/20 mt-20">
            last updated February 2026
          </p>
        </div>
      </main>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
