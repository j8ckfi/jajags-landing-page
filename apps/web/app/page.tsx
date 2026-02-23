import Image from "next/image"
import Link from "next/link"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import { Pulse } from "@/components/Pulse"
import { WordCycle } from "@/components/WordCycle"
import { getAllPosts } from "@/lib/content/blog"
import { getAllResearch } from "@/lib/content/research"
import { getAllProjects } from "@/lib/content/projects"

const disciplines = [
  {
    slug: "artificial-intelligence",
    painting: "/paintings/jeanne_samary_1970.17.78.webp",
    alt: "Jeanne Samary by Renoir",
    label: "artificial intelligence",
    line: "language, vision, and the models underneath.",
  },
  {
    slug: "systems",
    painting: "/paintings/notre_dame_de_paris_2015.19.79.webp",
    alt: "Notre-Dame de Paris",
    label: "systems",
    line: "architecture, compilers, operating systems.",
  },
  {
    slug: "agents",
    painting: "/paintings/oarsmen_at_chatou_1951.5.2.webp",
    alt: "Oarsmen at Chatou by Renoir",
    label: "agents",
    line: "computers building computers.",
  },
  {
    slug: "data",
    painting: "/paintings/the_seine_at_giverny_1963.10.180.webp",
    alt: "The Seine at Giverny",
    label: "data & research",
    line: "questions that take longer than a sprint.",
  },
  {
    slug: "misc",
    painting: "/paintings/the_mussel_harvest_1954.8.1.webp",
    alt: "The Mussel Harvest",
    label: "misc",
    line: "everything else.",
  },
]

const cycleWords = ["builders", "designers", "makers", "coders", "roboticists", "writers"]

export default function Home() {
  const posts = getAllPosts().slice(0, 1)
  const research = getAllResearch().slice(0, 1)
  const projects = getAllProjects().slice(0, 1)

  const latestPost = posts[0]
  const latestResearch = research[0]
  const latestProject = projects[0]

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/paintings/cliffs_at_pourville_1985.64.27.webp"
            alt="Cliffs at Pourville by Monet"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-foreground/40 mb-6">
            jajags.tech
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] mb-6 max-w-3xl">
            the club for{" "}
            <WordCycle words={cycleWords} className="font-display italic" />
          </h1>
          <p className="text-lg text-foreground/60 max-w-md leading-relaxed mb-10">
            a student-run Hack Club chapter at Jefferson Academy Secondary.
            humanist AI — building technology that stays human.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/projects"
              className="bg-foreground text-white text-sm px-6 py-3 hover:opacity-80 transition-opacity"
            >
              see our work
            </Link>
            <Link
              href="/about"
              className="text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              about the chapter
            </Link>
          </div>
        </div>
      </section>

      {/* Pulse */}
      <div className="border-y border-[#ebebeb] py-4 px-6 md:px-12 bg-[#f9f8f6]">
        <Pulse />
      </div>

      {/* Disciplines grid */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-16">
            what we work on
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-12">
            {disciplines.map(({ slug, painting, alt, label, line }) => (
              <Link key={slug} href={`/tracks/${slug}`} className="group space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f9f8f6]">
                  <Image
                    src={painting}
                    alt={alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div>
                  <p className="font-display text-base text-foreground group-hover:opacity-60 transition-opacity">{label}</p>
                  <p className="text-sm text-foreground/40 mt-1 leading-snug">{line}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest content */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#f9f8f6]">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-16">
            recently
          </p>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 border-t border-[#ebebeb]">
            {latestPost && (
              <div className="pt-8 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">blog</p>
                <Link href={`/blog/${latestPost.slug}`} className="group block space-y-2">
                  <h3 className="font-display text-2xl text-foreground group-hover:opacity-60 transition-opacity leading-snug">
                    {latestPost.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{latestPost.description}</p>
                  <p className="font-mono text-xs text-foreground/30 mt-3">{latestPost.date}</p>
                </Link>
                <Link href="/blog" className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                  all posts &rarr;
                </Link>
              </div>
            )}
            {!latestPost && (
              <div className="pt-8 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">blog</p>
                <p className="text-sm text-foreground/40">No posts yet.</p>
                <Link href="/blog" className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                  all posts &rarr;
                </Link>
              </div>
            )}

            {latestResearch && (
              <div className="pt-8 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">research</p>
                <Link href={`/research/${latestResearch.slug}`} className="group block space-y-2">
                  <h3 className="font-display text-2xl text-foreground group-hover:opacity-60 transition-opacity leading-snug">
                    {latestResearch.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{latestResearch.abstract}</p>
                  <p className="font-mono text-xs text-foreground/30 mt-3">{latestResearch.date}</p>
                </Link>
                <Link href="/research" className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                  all research &rarr;
                </Link>
              </div>
            )}
            {!latestResearch && (
              <div className="pt-8 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">research</p>
                <p className="text-sm text-foreground/40">No research yet.</p>
                <Link href="/research" className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                  all research &rarr;
                </Link>
              </div>
            )}

            {latestProject && (
              <div className="pt-8 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">projects</p>
                <Link href={`/projects/${latestProject.slug}`} className="group block space-y-2">
                  <h3 className="font-display text-2xl text-foreground group-hover:opacity-60 transition-opacity leading-snug">
                    {latestProject.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{latestProject.description}</p>
                  <p className="font-mono text-xs text-foreground/30 mt-3">{latestProject.date}</p>
                </Link>
                <Link href="/projects" className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                  all projects &rarr;
                </Link>
              </div>
            )}
            {!latestProject && (
              <div className="pt-8 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">projects</p>
                <p className="text-sm text-foreground/40">No projects yet.</p>
                <Link href="/projects" className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                  all projects &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* /now strip */}
      <section className="py-16 px-6 md:px-12 border-t border-[#ebebeb]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30">now</p>
            <p className="font-display text-xl text-foreground/70 italic">
              building AI tools for student researchers.
            </p>
          </div>
          <Link href="/now" className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors whitespace-nowrap">
            what we&apos;re building this semester &rarr;
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
