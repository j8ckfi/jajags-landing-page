import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/content/blog"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

const paintingCycle = [
  "women_on_the_beach_at_berck_1970.17.15.jpg",
  "oarsmen_at_chatou_1951.5.2.jpg",
  "the_seine_at_giverny_1963.10.180.jpg",
  "notre_dame_de_paris_2015.19.79.jpg",
  "cliffs_at_pourville_1985.64.27.jpg",
  "poppies_isles_of_shoals_1997.135.1.jpg",
  "charing_cross_bridge_london_1985.64.32.jpg",
  "entrance_to_the_harbor_le_havre_1983.1.16.jpg",
  "first_snow_at_veneux-nadon_1983.98.1.jpg",
  "the_mussel_harvest_1954.8.1.jpg",
  "view_of_monte_carlo_from_cap_martin_2014.136.60.jpg",
  "simplon_pass_2014.79.31.jpg",
  "the_banks_of_the_oise_1963.10.214.jpg",
  "a_north_east_headland_2014.136.7.jpg",
  "jeanne_samary_1970.17.78.jpg",
]

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">blog</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            technical writing
          </h1>
          <p className="mt-4 text-foreground/50 leading-relaxed">
            member write-ups, project post-mortems, and essays on the systems we study.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="font-mono text-sm text-foreground/30">no posts yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {posts.map((post, i) => {
              const painting = post.painting ?? paintingCycle[i % paintingCycle.length]
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block break-inside-avoid mb-6 border border-[#ebebeb] hover:border-foreground/20 transition-colors"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={`/paintings/${painting}`}
                      alt=""
                      width={800}
                      height={500}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ aspectRatio: i % 3 === 1 ? "4/3" : i % 3 === 2 ? "3/4" : "16/9" }}
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="font-mono text-xs text-foreground/30">{post.date}</p>
                    <h2 className="font-display text-xl text-foreground leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      {post.description}
                    </p>
                    {post.authors.length > 0 && (
                      <p className="font-mono text-xs text-foreground/30 pt-1">
                        {post.authors.join(", ")}
                      </p>
                    )}
                  </div>
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
