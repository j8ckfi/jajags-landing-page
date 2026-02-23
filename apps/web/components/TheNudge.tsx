import Link from "next/link"
import Image from "next/image"

// In a real app, this would accept props. For now we use the latest one.
export function TheNudge({ latestPost }: { latestPost: any }) {
    if (!latestPost) return null;

    return (
        <section className="py-8">
            <div className="font-mono text-center text-muted-foreground/30 text-xs tracking-[1em] py-4">
                ❦ ❦ ❦
            </div>
            <div className="mb-6 flex items-baseline justify-between border-b border-border/50 pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="mr-2 text-base">☛</span>
                    Latest from the Chronicle
                </span>
                <Link href="/chronicle" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                    Full Index ⟶
                </Link>
            </div>

            <Link href={`/chronicle/${latestPost.slug}`} className="block group">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted">
                        {latestPost.meta.image && (
                            <Image
                                src={latestPost.meta.image}
                                alt={latestPost.meta.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs text-primary">{latestPost.meta.date}</span>
                            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground group-hover:underline decoration-primary/50 underline-offset-4 decoration-1">
                                {latestPost.meta.title}
                            </h3>
                        </div>
                        <p className="font-sans text-xl text-muted-foreground leading-relaxed max-w-md">
                            {latestPost.meta.description}
                        </p>
                        <div className="font-mono text-sm text-primary flex items-center gap-2">
                            <span className="text-lg">☞</span> Read Entry <span className="group-hover:translate-x-1 transition-transform">⟶</span>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    )
}
