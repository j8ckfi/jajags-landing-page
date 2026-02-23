import { WordCycle } from "@/components/WordCycle"

export function WhoWeAre() {
    const cycleWords = ["builders", "designers", "makers", "coders", "roboticists", "writers"]

    return (
        <section>

            <div className="max-w-4xl space-y-10">
                <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase">
                        jajags.tech
                    </span>
                    <div className="flex-1 border-t border-border/30"></div>
                </div>

                {/* Main quote with corner brackets */}
                <div className="relative pl-4 md:pl-8">
                    <span className="absolute left-0 top-0 font-display text-4xl md:text-5xl text-primary/20">「</span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight pl-4">
                        the club for{" "}
                        <WordCycle words={cycleWords} className="font-display" />.
                    </h2>
                    <span className="font-display text-4xl md:text-5xl text-primary/20 ml-auto block text-right mt-2">」</span>
                </div>

                {/* Two-column content */}
                <div className="grid md:grid-cols-5 gap-8 items-start pt-4">
                    {/* Main text - takes 3 cols */}
                    <div className="md:col-span-3 space-y-4">
                        <p className="font-sans text-xl text-foreground leading-relaxed">
                            ☞ we&apos;re a student-run hack club chapter at jefferson academy secondary.
                        </p>
                        <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                            we make projects, study the systems underneath them, and learn by shipping.
                        </p>
                    </div>

                    {/* Sidebar list - takes 2 cols */}
                    <div className="md:col-span-2">
                        <div className="border border-border/30 rounded-sm p-4 bg-muted/5">
                            <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span>┌</span> What We Do <span>┐</span>
                            </div>
                            <ul className="font-mono text-sm text-muted-foreground space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">▸</span> ship work that matters
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">▸</span> study the systems underneath
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">▸</span> research before answers
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">▸</span> learn by shipping
                                </li>
                            </ul>
                            <div className="font-mono text-xs text-muted-foreground/50 mt-3">
                                <span>└───────┘</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
