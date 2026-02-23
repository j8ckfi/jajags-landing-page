"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const links = [
  { href: "/blog", label: "blog" },
  { href: "/research", label: "research" },
  { href: "/projects", label: "projects" },
  { href: "/builders", label: "builders" },
]

export function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const close = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener("resize", close)
    return () => window.removeEventListener("resize", close)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#ebebeb] py-4 px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-base tracking-tight text-foreground hover:opacity-70 transition-opacity">
          jajags.tech
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-foreground/60">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-foreground transition-colors ${pathname.startsWith(href) ? "text-foreground" : ""}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/join"
            className="bg-foreground text-white text-sm px-4 py-1.5 hover:opacity-80 transition-opacity"
          >
            join
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden font-mono text-sm text-foreground/70 hover:text-foreground transition-colors p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? "close" : "menu"}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 px-6 md:hidden">
          <div className="flex flex-col pt-8 gap-0">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-4 border-b border-[#ebebeb] text-foreground text-lg font-display hover:opacity-60 transition-opacity"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/join"
              className="mt-8 bg-foreground text-white text-center py-3 text-sm font-sans hover:opacity-80 transition-opacity"
            >
              join
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
