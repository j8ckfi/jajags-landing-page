import Link from "next/link"

const sections = [
  {
    label: "work",
    links: [
      { href: "/blog", label: "blog" },
      { href: "/research", label: "research" },
      { href: "/projects", label: "projects" },
      { href: "/projects/library", label: "library" },
    ],
  },
  {
    label: "people",
    links: [
      { href: "/builders", label: "builders" },
      { href: "/now", label: "now" },
      { href: "/about", label: "about" },
      { href: "/join", label: "join" },
    ],
  },
  {
    label: "elsewhere",
    links: [
      { href: "https://github.com/jajags-tech", label: "github" },
      { href: "https://discord.gg/cSSZGMMqSK", label: "discord" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[#ebebeb] pt-12 pb-16">
      <div className="flex flex-col md:flex-row md:justify-between gap-12">
        <div className="space-y-3">
          <Link href="/" className="text-base text-foreground hover:opacity-60 transition-opacity">
            jajags.tech
          </Link>
          <p className="font-mono text-xs text-foreground/40 leading-relaxed">
            Jefferson Academy Secondary<br />
            Hack Club chapter · est. 2023
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {sections.map(({ label, links }) => (
            <div key={label} className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">{label}</p>
              <ul className="space-y-2">
                {links.map(({ href, label: linkLabel }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {linkLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
