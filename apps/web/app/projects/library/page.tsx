"use client"

import { useState } from "react"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

type LibraryTool = {
  name: string
  url: string
  description: string
  free: boolean
  chromeos: boolean
  category: string
}

const tools: LibraryTool[] = [
  { name: "Google AI Studio", url: "https://aistudio.google.com", description: "Fast prototyping for static web pages, landing pages, one-off scripts. Browser-based, no setup.", free: true, chromeos: true, category: "AI & Development" },
  { name: "Claude Code", url: "https://claude.ai", description: "Autonomous AI agent that lives in your terminal. Builds full apps, runs tests, manages files. Probably the future of programming.", free: false, chromeos: false, category: "AI & Development" },
  { name: "Antigravity", url: "https://antigravity.google", description: "Google's VS Code fork with unlimited access to the best coding models. Great for learning, don't use for anything private.", free: true, chromeos: false, category: "AI & Development" },
  { name: "GitHub Codespaces", url: "https://github.com/features/codespaces", description: "Full VS Code in your browser with terminal, extensions, everything. Real dev environment from any device. Free with Student Pack.", free: true, chromeos: true, category: "AI & Development" },
  { name: "Replit", url: "https://replit.com", description: "Quick prototyping, runs basically any language. Good for learning and small projects.", free: true, chromeos: true, category: "AI & Development" },
  { name: "GitHub Student Developer Pack", url: "https://education.github.com/pack", description: "Hundreds of dollars in free tools: domains, cloud credits, Copilot Pro, JetBrains IDEs, and 80+ other things. Do this one first.", free: true, chromeos: true, category: "AI & Development" },
  { name: "Firebase Studio", url: "https://firebase.studio", description: "Google's visual app builder. Prototype full-stack apps with AI assistance, deploy to Firebase. Browser-based.", free: true, chromeos: true, category: "AI & Development" },
  { name: "Gemini CLI", url: "https://github.com/google-gemini/gemini-cli", description: "Google's official command-line interface for Gemini. Chat, generate code, and automate tasks from your terminal.", free: true, chromeos: false, category: "AI & Development" },
  { name: "OpenRouter", url: "https://openrouter.ai", description: "One API for all the best models (GPT-4, Claude, Gemini, Llama). Pay per token, no subscriptions. Great for experimenting.", free: false, chromeos: true, category: "AI & Development" },
  { name: "Cursor", url: "https://cursor.sh", description: "AI-native code editor built on VS Code. Tab-complete entire functions, chat with your codebase.", free: false, chromeos: false, category: "AI & Development" },
  { name: "LM Studio", url: "https://lmstudio.ai", description: "Run open-source LLMs locally. Llama, Mistral, Phi — download and chat, no cloud required.", free: true, chromeos: false, category: "AI & Development" },
  { name: "Vercel", url: "https://vercel.com", description: "Deploy frontend apps in seconds. The home of Next.js. Free tier is generous.", free: true, chromeos: true, category: "Infrastructure & Design" },
  { name: "Railway", url: "https://railway.app", description: "Deploy backends, databases, and services with zero config. Postgres, Redis, whatever. $5/month free credit.", free: true, chromeos: true, category: "Infrastructure & Design" },
  { name: "Supabase", url: "https://supabase.com", description: "Open-source Firebase alternative. Postgres, auth, storage, realtime — all in one.", free: true, chromeos: true, category: "Infrastructure & Design" },
  { name: "Figma", url: "https://figma.com", description: "Industry-standard UI design tool. Free for students. Collaborative, browser-based.", free: true, chromeos: true, category: "Infrastructure & Design" },
  { name: "Homebrew", url: "https://brew.sh", description: "The missing package manager for macOS. Install anything with one command.", free: true, chromeos: false, category: "Terminal" },
  { name: "Ghostty", url: "https://ghostty.org", description: "A fast, feature-rich terminal emulator. Native, GPU-accelerated, beautiful.", free: true, chromeos: false, category: "Terminal" },
  { name: "Affinity Studio", url: "https://affinity.serif.com", description: "Professional photo editing, vector graphics, and page layout. Completely free. This is the one.", free: true, chromeos: false, category: "Creative Tools" },
  { name: "remove.bg", url: "https://remove.bg", description: "Background removal in seconds. No installation needed.", free: true, chromeos: true, category: "Creative Tools" },
  { name: "DaVinci Resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve", description: "Hollywood-grade video editor. The free version is more than most people will ever need.", free: true, chromeos: false, category: "Creative Tools" },
  { name: "OBS", url: "https://obsproject.com", description: "Screen recording and streaming. The standard.", free: true, chromeos: false, category: "Creative Tools" },
  { name: "Audacity", url: "https://www.audacityteam.org", description: "Audio editing, podcast production, basic recording. Free forever, open source.", free: true, chromeos: false, category: "Creative Tools" },
  { name: "PowerToys", url: "https://github.com/microsoft/PowerToys", description: "Window snapping, quick launcher, bulk rename, color picker. Windows utilities you should have.", free: true, chromeos: false, category: "Utilities" },
  { name: "Cobalt.tools", url: "https://cobalt.tools", description: "Downloads video/audio from Instagram, Twitter, TikTok. No ads, no tracking, open source. Bookmark this.", free: true, chromeos: true, category: "Utilities" },
  { name: "uBlock Origin", url: "https://ublockorigin.com", description: "Ad blocking extension. Non-negotiable in the modern internet.", free: true, chromeos: true, category: "Utilities" },
  { name: "NotebookLM", url: "https://notebooklm.google.com", description: "Upload notes, PDFs, slides — it synthesizes everything and lets you ask questions. The podcast feature is wild.", free: true, chromeos: true, category: "Research & Learning" },
  { name: "Zenodo", url: "https://zenodo.org", description: "Free DOI for your work. Makes student research citable and legitimate. If you do real research, publish it here.", free: true, chromeos: true, category: "Research & Learning" },
  { name: "HuggingFace", url: "https://huggingface.co", description: "The GitHub of ML. 1.5M+ models, datasets, and Spaces. This is where cutting-edge AI actually lives.", free: true, chromeos: true, category: "Data Science & ML" },
  { name: "Google Colab", url: "https://colab.research.google.com", description: "Jupyter notebooks with free access to GPUs. Train models, run inference, all from a browser.", free: true, chromeos: true, category: "Data Science & ML" },
  { name: "Seaborn", url: "https://seaborn.pydata.org", description: "Python library for beautiful statistical plots with minimal code.", free: true, chromeos: true, category: "Data Science & ML" },
  { name: "Pandas", url: "https://pandas.pydata.org", description: "Data manipulation in Python. If you're doing anything with data, you're using this.", free: true, chromeos: true, category: "Data Science & ML" },
]

const categories = [...new Set(tools.map((t) => t.category))]

export default function LibraryPage() {
  const [showFreeOnly, setShowFreeOnly] = useState(false)
  const [showChromeOSOnly, setShowChromeOSOnly] = useState(false)

  const filtered = tools.filter((t) => {
    if (showFreeOnly && !t.free) return false
    if (showChromeOSOnly && !t.chromeos) return false
    return true
  })

  const byCategory = categories
    .map((c) => ({ category: c, tools: filtered.filter((t) => t.category === c) }))
    .filter((c) => c.tools.length > 0)

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/30 mb-4">projects / library</p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight">
            tools we use
          </h1>
          <p className="mt-4 text-foreground/50 leading-relaxed">
            external tools that are genuinely worth your time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-16 font-mono text-xs">
          <button
            onClick={() => setShowFreeOnly(!showFreeOnly)}
            className={`px-4 py-2 border transition-colors ${showFreeOnly ? "bg-foreground text-white border-foreground" : "border-[#ebebeb] text-foreground/50 hover:border-foreground/30"}`}
          >
            {showFreeOnly ? "free only" : "free only"}
          </button>
          <button
            onClick={() => setShowChromeOSOnly(!showChromeOSOnly)}
            className={`px-4 py-2 border transition-colors ${showChromeOSOnly ? "bg-foreground text-white border-foreground" : "border-[#ebebeb] text-foreground/50 hover:border-foreground/30"}`}
          >
            {showChromeOSOnly ? "web/chromeos" : "web/chromeos"}
          </button>
        </div>

        {byCategory.length === 0 ? (
          <p className="font-mono text-sm text-foreground/30">no tools match your filters.</p>
        ) : (
          <div className="space-y-20">
            {byCategory.map(({ category, tools: catTools }) => (
              <section key={category}>
                <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/30 mb-8 pb-4 border-b border-[#ebebeb]">
                  {category}
                </h2>
                <div className="divide-y divide-[#ebebeb]">
                  {catTools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between py-6 hover:opacity-60 transition-opacity"
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-xl text-foreground">{tool.name}</span>
                          <span className="font-mono text-xs text-foreground/20">
                            {tool.free ? "free" : "paid"}
                            {tool.chromeos ? " · web" : ""}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/50 leading-relaxed">{tool.description}</p>
                      </div>
                      <span className="font-mono text-xs text-foreground/20 shrink-0 ml-8 group-hover:text-foreground/40 transition-colors">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </section>
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
