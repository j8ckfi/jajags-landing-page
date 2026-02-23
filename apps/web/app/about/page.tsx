import Image from "next/image"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="relative w-full min-h-[60vh] overflow-hidden">
        <Image
          src="/paintings/oarsmen_at_chatou_1951.5.2.jpg"
          alt="Oarsmen at Chatou by Renoir"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-16 max-w-7xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-3">est. 2023</p>
          <h1 className="font-display text-6xl md:text-8xl text-foreground leading-none">about</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-24">

        <section className="grid md:grid-cols-12 gap-12 mb-28">
          <div className="md:col-span-4 md:sticky md:top-24 self-start">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">who we are</p>
            <div className="w-8 h-px bg-foreground/10 mt-3" />
          </div>
          <div className="md:col-span-7 space-y-6">
            <p className="font-display text-2xl md:text-3xl text-foreground/80 italic leading-snug">
              jajags.tech is a student-run Hack Club chapter at Jefferson Academy Secondary.
              we make projects, study the systems underneath them, and learn by shipping.
            </p>
            <p className="text-lg text-foreground/60 leading-relaxed">
              we&apos;re part of{" "}
              <a href="https://hackclub.com/" className="underline underline-offset-2 hover:opacity-60 transition-opacity">
                Hack Club
              </a>
              , a global network of student-run coding clubs. our identity is humanist AI —
              building technology with the sensibility of the Impressionists: capturing human
              experience, not just optimizing for metrics.
            </p>
            <p className="text-lg text-foreground/60 leading-relaxed">
              our members come from diverse academic backgrounds, united by curiosity and a
              desire to build things that matter.
            </p>
          </div>
        </section>

        <div className="h-px bg-[#ebebeb] mb-28" />

        <section className="grid md:grid-cols-12 gap-12 mb-28">
          <div className="md:col-span-4 md:sticky md:top-24 self-start">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">how we work</p>
            <div className="w-8 h-px bg-foreground/10 mt-3" />
          </div>
          <div className="md:col-span-7 space-y-12">
            {[
              {
                heading: "ship small, ship often",
                body: "we build tools, experiments, and small products that make school life better. real users, real feedback, real learning.",
              },
              {
                heading: "study the systems underneath",
                body: "we ask how software shapes culture, governance, and daily life. the most interesting question is usually one layer below the obvious one.",
              },
              {
                heading: "learn in public",
                body: "we share demos, write-ups, and notes so others can build on what we find. the chronicle, research catalogue, and curriculum are all public.",
              },
            ].map(({ heading, body }) => (
              <div key={heading} className="space-y-2 border-b border-[#ebebeb] pb-12 last:border-0">
                <h3 className="font-display text-2xl text-foreground">{heading}</h3>
                <p className="text-foreground/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-[#ebebeb] mb-28" />

        <section className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 md:sticky md:top-24 self-start">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">what we publish</p>
            <div className="w-8 h-px bg-foreground/10 mt-3" />
          </div>
          <div className="md:col-span-7 space-y-0 divide-y divide-[#ebebeb]">
            {[
              {
                path: "/blog",
                label: "blog",
                desc: "Technical writing, project post-mortems, and essays on the systems we study.",
              },
              {
                path: "/research",
                label: "research",
                desc: "Papers and investigations by members. Real research, properly cited.",
              },
              {
                path: "/projects",
                label: "projects",
                desc: "Tools, experiments, and products we've shipped.",
              },
              {
                path: "/curriculum",
                label: "curriculum",
                desc: "Structured learning tracks written by members. Lessons and quizzes, no accounts needed.",
              },
              {
                path: "/tools",
                label: "tools",
                desc: "Open tools we built. Use them, fork them, improve them.",
              },
            ].map(({ path, label, desc }) => (
              <a
                key={path}
                href={path}
                className="group flex items-baseline justify-between py-7 hover:opacity-60 transition-opacity"
              >
                <div className="space-y-1">
                  <h3 className="font-display text-2xl text-foreground">{label}</h3>
                  <p className="text-foreground/50 leading-relaxed text-sm max-w-md">{desc}</p>
                </div>
                <span className="font-mono text-xs text-foreground/20 shrink-0 ml-8 group-hover:text-foreground/40 transition-colors">
                  jajags.tech{path}
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Footer />
      </div>
    </div>
  )
}
