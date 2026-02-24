# jajags.tech brand guidelines

For projects under the jajags.tech club brand. Copy into new projects to maintain visual and verbal consistency.

---

## identity

| Field | Value |
|-------|-------|
| Name | jajags.tech (always lowercase) |
| Description | a student-run Hack Club chapter at Jefferson Academy Secondary |
| Established | 2023 |
| Stance | humanist AI — building technology that stays human |

**Reference:** the Impressionists. Revolutionary in their time, they rejected rigid academic tradition to capture light, movement, and human experience. We sit at the same inflection point with AI.

**Institutional line:** Jefferson Academy Secondary / Hack Club chapter · est. 2023

---

## voice

- direct, minimal, lowercase-friendly
- short sentences, active voice, no corporate buzzwords
- confident but not grandiose; curious, precise, and practical
- default to "we" for statements about the club
- no emojis in body copy or headers

---

## key copy

| Context | Copy |
|---------|------|
| Tagline | the club for builders/designers/makers/coders/roboticists/writers. |
| Core line | we make projects, study the systems underneath them, and learn by shipping. |
| Join CTA | build with us. |
| Hero word cycle | builders → designers → makers → coders → roboticists → writers |

**How to join:**
1. join the discord (discord.gg/cSSZGMMqSK) and introduce yourself.
2. show up to the next meeting and share what you want to build.

**Join subcopy:** if you want to learn by doing and ask deeper questions about software, you belong here.

**Meeting info:** 1st and 3rd Thursdays of each month, lunch, Room 202.

---

## how we work

- **ship small, ship often** — we build tools, experiments, and small products that make school life better. real users, real feedback, real learning.
- **study the systems underneath** — we ask how software shapes culture, governance, and daily life. the most interesting question is usually one layer below the obvious one.
- **learn in public** — we share demos, write-ups, and notes so others can build on what we find.

---

## external links

| Service | URL |
|---------|-----|
| Discord | https://discord.gg/cSSZGMMqSK |
| GitHub | https://github.com/jajags-tech |
| Hack Club | https://hackclub.com/ |

---

## color

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#FFFFFF` | page background |
| Foreground | `#2B2B2B` | body text, headings |
| Muted | `#F9F8F6` | alternating sections, subtle surfaces |
| Muted foreground | `#7A7A7A` | secondary text |
| Border | `#EBEBEB` | dividers, rules |

No accent color. Impressionist paintings carry all color. UI stays near-monochrome.

```css
:root {
  --background: #ffffff;
  --foreground: #2b2b2b;
  --card: #ffffff;
  --card-foreground: #2b2b2b;
  --primary: #2b2b2b;
  --primary-foreground: #ffffff;
  --muted: #f9f8f6;
  --muted-foreground: #7a7a7a;
  --accent: #f9f8f6;
  --accent-foreground: #2b2b2b;
  --border: #ebebeb;
  --input: #ebebeb;
  --ring: #2b2b2b;
  --radius: 0.25rem;
}
```

---

## typography

| Role | Font | Source | Notes |
|------|------|--------|-------|
| Display / headings | Instrument Serif | Google Fonts | 400 normal + italic |
| Body, nav, labels, buttons | Inter | Google Fonts | variable |
| Code blocks only | IBM Plex Mono | Google Fonts | 400, 500 |

```css
--font-display: "Instrument Serif", Georgia, serif;
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "IBM Plex Mono", "Courier New", monospace;
```

**Scale**

| Element | Tailwind | Notes |
|---------|----------|-------|
| Hero / page title | `text-5xl` – `text-8xl` | Instrument Serif, leading-none |
| Section heading | `text-3xl` – `text-5xl` | Instrument Serif |
| Card / list heading | `text-xl` – `text-3xl` | Instrument Serif |
| Body | `text-sm` – `text-lg` | Inter, leading-relaxed |
| Labels / captions | `text-xs` | IBM Plex Mono, uppercase, tracking-widest |

Favor lowercase headings when layout allows.

---

## layout

- **VISUAL_DENSITY: 2** — art gallery mode. Section gaps `py-24` to `py-36`.
- **DESIGN_VARIANCE: 8** — asymmetric, left-aligned, massive empty zones. No centered hero text.
- Max content width: `max-w-7xl mx-auto`
- Section padding: `px-6 md:px-12`
- No card boxes. Use spacing, `divide-y`, and border rules instead.
- No border-radius on buttons — square edges only.
- Full-height sections: `min-h-[100dvh]` not `h-screen` (avoids mobile layout jump).

---

## component patterns

**Section label:** `font-mono text-xs uppercase tracking-widest text-foreground/30` (or `tracking-[0.25em]` for page-level labels)

**Page intro:** label above, then title (`font-display`), then body. Spacing: `mb-4` label, `mb-6` title, `mb-10` or `mb-16` body.

**Divider:** `border-t border-[#ebebeb]` or `h-px bg-[#ebebeb]`

**Primary button:** `bg-foreground text-white px-6 py-3 hover:opacity-80 transition-opacity`

**Links:** `text-foreground/50 hover:text-foreground transition-colors` or `hover:opacity-60` for inline. Internal links: `&rarr;` suffix. External links: `↗` suffix in `font-mono text-xs`.

**Nav:** fixed, `bg-white/95 backdrop-blur-sm border-b border-[#ebebeb]`, `py-4 px-6 md:px-12`. Logo: `text-base tracking-tight`. Links: `text-sm text-foreground/60` with `hover:text-foreground`. Join button: `bg-foreground text-white px-4 py-1.5`.

**Footer:** `border-t border-[#ebebeb] pt-12 pb-16`. Section labels: `font-mono text-xs uppercase tracking-widest text-foreground/30`. Links: `text-sm text-foreground/60 hover:text-foreground`.

**Empty state:** `text-sm text-foreground/40` (e.g. "No posts yet.")

**Time-sensitive content:** `font-mono text-xs text-foreground/20` (e.g. "last updated February 2026")

---

## paintings

Each Impressionist painting is a semantic anchor for a discipline.

| Painting filename | Discipline |
|-------------------|------------|
| cliffs_at_pourville | hero anchor |
| jeanne_samary | artificial intelligence / language |
| notre_dame_de_paris | systems & architecture |
| charing_cross_bridge_london | developer tools |
| oarsmen_at_chatou | agents |
| first_snow_at_veneux-nadon | education & learning |
| entrance_to_the_harbor_le_havre | community |
| poppies_isles_of_shoals | design |
| the_seine_at_giverny | data & research |
| the_mussel_harvest | misc |

**Image treatment:** `grayscale hover:grayscale-0 transition-all duration-700`

**Hero overlay:** `bg-gradient-to-r from-white via-white/80 to-white/10` (fade left-to-white). Add `bg-gradient-to-t from-white via-transparent to-transparent` for bottom fade.

---

## implementation

**Next.js font loading**

```tsx
import { Instrument_Serif, Inter, IBM_Plex_Mono } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: "400",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

// body: className={`${instrumentSerif.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
```

**Base styles**

```css
body { @apply bg-background text-foreground font-sans; }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-display); }
* { @apply border-border outline-ring/50; }
```

**Metadata**

```
title: jajags.tech — Jefferson Academy Secondary Hack Club chapter
description: A student-run Hack Club chapter at Jefferson Academy Secondary. We make projects, study the systems underneath them, and learn by shipping.
```
