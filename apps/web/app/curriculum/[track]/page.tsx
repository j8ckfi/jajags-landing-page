import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllTracks, getTrackBySlug } from "@/lib/content/curriculum"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export const dynamicParams = false

export function generateStaticParams() {
  const tracks = getAllTracks()
  if (tracks.length === 0) return [{ track: "_" }]
  return tracks.map((t) => ({ track: t.slug }))
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>
}) {
  const { track: trackSlug } = await params
  const track = getTrackBySlug(trackSlug)
  if (!track) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="mb-4">
          <Link href="/curriculum" className="font-mono text-xs text-foreground/30 hover:text-foreground transition-colors">
            &larr; curriculum
          </Link>
        </div>

        <div className="max-w-2xl mb-20 pt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/30 mb-4">
            {track.lessons.length} {track.lessons.length === 1 ? "lesson" : "lessons"}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            {track.title}
          </h1>
          <p className="mt-4 text-foreground/50 leading-relaxed">{track.description}</p>
        </div>

        <div className="divide-y divide-[#ebebeb]">
          {track.lessons.map((lesson, i) => (
            <Link
              key={lesson.slug}
              href={`/curriculum/${trackSlug}/${lesson.slug}`}
              className="group flex items-baseline justify-between py-8 hover:opacity-60 transition-opacity"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-foreground/20 w-6 shrink-0">{i + 1}.</span>
                <div className="space-y-1">
                  <p className="font-display text-2xl text-foreground">{lesson.title}</p>
                  {lesson.authors.length > 0 && (
                    <p className="font-mono text-xs text-foreground/30">{lesson.authors.join(", ")}</p>
                  )}
                </div>
              </div>
              {lesson.quiz.length > 0 && (
                <span className="font-mono text-xs text-foreground/20 shrink-0 ml-8">
                  {lesson.quiz.length}q quiz
                </span>
              )}
            </Link>
          ))}
        </div>
      </main>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
