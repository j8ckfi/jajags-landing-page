import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllTracks, getLessonBySlug, getTrackBySlug } from "@/lib/content/curriculum"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import { Quiz } from "@/components/Quiz"

export async function generateStaticParams() {
  const tracks = getAllTracks()
  return tracks.flatMap((track) =>
    track.lessons.map((lesson) => ({ track: track.slug, lesson: lesson.slug }))
  )
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ track: string; lesson: string }>
}) {
  const { track: trackSlug, lesson: lessonSlug } = await params
  const lesson = getLessonBySlug(trackSlug, lessonSlug)
  if (!lesson) notFound()

  const track = getTrackBySlug(trackSlug)
  const lessonIndex = track?.lessons.findIndex((l) => l.slug === lessonSlug) ?? -1
  const prev = track?.lessons[lessonIndex - 1]
  const next = track?.lessons[lessonIndex + 1]

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="mb-4 flex items-center gap-3 font-mono text-xs text-foreground/30">
          <Link href="/curriculum" className="hover:text-foreground transition-colors">curriculum</Link>
          <span>/</span>
          <Link href={`/curriculum/${trackSlug}`} className="hover:text-foreground transition-colors">
            {track?.title ?? trackSlug}
          </Link>
        </div>

        <div className="grid md:grid-cols-[1fr_240px] gap-16 items-start">
          <div>
            <div className="mb-12 space-y-3 border-b border-[#ebebeb] pb-10">
              <p className="font-mono text-xs text-foreground/30">
                lesson {lessonIndex + 1} of {track?.lessons.length ?? 1}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
                {lesson.title}
              </h1>
              {lesson.authors.length > 0 && (
                <p className="font-mono text-xs text-foreground/30">
                  written by {lesson.authors.join(", ")}
                </p>
              )}
            </div>

            <article className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-normal prose-p:leading-relaxed prose-p:text-foreground/80 prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 prose-code:font-mono prose-code:text-sm prose-code:bg-[#f9f8f6] prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
              <MDXRemote source={lesson.content} />
            </article>

            <Quiz questions={lesson.quiz} />

            <div className="flex items-center justify-between mt-16 pt-8 border-t border-[#ebebeb]">
              {prev ? (
                <Link href={`/curriculum/${trackSlug}/${prev.slug}`} className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                  &larr; {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/curriculum/${trackSlug}/${next.slug}`} className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors">
                  {next.title} &rarr;
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>

          <aside className="hidden md:block sticky top-24 space-y-6">
            {track && (
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">{track.title}</p>
                <div className="space-y-1">
                  {track.lessons.map((l, i) => (
                    <Link
                      key={l.slug}
                      href={`/curriculum/${trackSlug}/${l.slug}`}
                      className={`flex items-baseline gap-2 py-1.5 text-sm transition-colors hover:opacity-100 ${l.slug === lessonSlug ? "text-foreground" : "text-foreground/30"}`}
                    >
                      <span className="font-mono text-xs w-4 shrink-0">{i + 1}.</span>
                      <span className={l.slug === lessonSlug ? "font-display" : ""}>{l.title}</span>
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
