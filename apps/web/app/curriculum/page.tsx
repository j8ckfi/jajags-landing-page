import Link from "next/link"
import { getAllTracks } from "@/lib/content/curriculum"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export default function CurriculumPage() {
  const tracks = getAllTracks()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">curriculum</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            learn by building
          </h1>
          <p className="mt-4 text-foreground/50 leading-relaxed">
            structured tracks written by members. read the lessons, check your understanding.
            no accounts, no grades.
          </p>
        </div>

        {tracks.length === 0 ? (
          <p className="font-mono text-sm text-foreground/30">no tracks yet.</p>
        ) : (
          <div className="divide-y divide-[#ebebeb]">
            {tracks.map((track) => (
              <div key={track.slug} className="py-10 space-y-4">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-2xl md:text-3xl text-foreground">{track.title}</h2>
                  <span className="font-mono text-xs text-foreground/30">
                    {track.lessons.length} {track.lessons.length === 1 ? "lesson" : "lessons"}
                  </span>
                </div>
                <p className="text-sm text-foreground/50 max-w-xl">{track.description}</p>
                <div className="pt-2 space-y-2">
                  {track.lessons.map((lesson, i) => (
                    <Link
                      key={lesson.slug}
                      href={`/curriculum/${track.slug}/${lesson.slug}`}
                      className="flex items-baseline gap-4 group hover:opacity-60 transition-opacity"
                    >
                      <span className="font-mono text-xs text-foreground/20 w-6 shrink-0">{i + 1}.</span>
                      <span className="font-display text-lg text-foreground">{lesson.title}</span>
                      {lesson.quiz.length > 0 && (
                        <span className="font-mono text-xs text-foreground/20">
                          {lesson.quiz.length}q quiz
                        </span>
                      )}
                    </Link>
                  ))}
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
