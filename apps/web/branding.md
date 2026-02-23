# jajags.tech brand guidelines

Visual identity and design system for jajags.tech.

---

## identity

**Name:** jajags.tech (always lowercase)
**Description:** a student-run Hack Club chapter at Jefferson Academy Secondary
**Established:** 2023
**Core stance:** humanist AI — building technology that stays human

**Reference point:** the Impressionists. Revolutionary in their time, they rejected rigid academic tradition to capture light, movement, and human experience. We sit at the same kind of inflection point with AI.

---

## voice

- direct, minimal, lowercase-friendly
- short sentences, active voice, no corporate buzzwords
- confident but not grandiose; curious, precise, and practical
- default to "we" for statements about the club
- no emojis in body copy or headers

**Key copy**
- tagline: "the club for builders/designers/makers/coders/roboticists/writers."
- core line: "we make projects, study the systems underneath them, and learn by shipping."

---

## color

| Token | Value | Usage |
|---|---|---|
| Background | `#FFFFFF` | page background |
| Foreground | `#2B2B2B` | body text, headings |
| Alt background | `#F9F8F6` | warm off-white, alternating sections |
| Border | `#EBEBEB` | dividers, subtle rules |

**No accent color.** The Impressionist paintings carry all color. The UI stays near-monochrome.

```css
--background: #ffffff;
--foreground: #2b2b2b;
--muted: #f9f8f6;
--border: #ebebeb;
```

---

## typography

| Role | Font | Notes |
|---|---|---|
| Display / headings | Instrument Serif | Google Fonts, 400 normal + italic |
| Body, nav, labels, buttons | Inter | Google Fonts, variable |
| Code blocks only | IBM Plex Mono | 400, 500 |

```css
--font-display: "Instrument Serif", Georgia, serif;
--font-sans:    "Inter", system-ui, sans-serif;
--font-mono:    "IBM Plex Mono", "Courier New", monospace;
```

**Scale**

| Element | Size | Notes |
|---|---|---|
| Hero / page title | `text-5xl` – `text-8xl` | Instrument Serif, leading-none |
| Section heading | `text-3xl` – `text-5xl` | Instrument Serif |
| Card / list heading | `text-xl` – `text-3xl` | Instrument Serif |
| Body | `text-sm` – `text-lg` | Inter, leading-relaxed |
| Labels / captions | `text-xs` | IBM Plex Mono, uppercase, tracking-widest |

---

## layout

- **VISUAL_DENSITY: 2** — art gallery mode. Huge section gaps (`py-24` to `py-36`). Everything breathes.
- **DESIGN_VARIANCE: 8** — asymmetric, left-aligned, massive empty zones. No centered hero text.
- Max content width: `max-w-7xl mx-auto`
- Section padding: `px-6 md:px-12`
- No card boxes. Use spacing, `divide-y`, and border rules instead.
- No `border-radius` on buttons — square edges only.

---

## buttons & links

**Primary button:** `bg-foreground text-white px-6 py-3 hover:opacity-80 transition-opacity`
No border radius. No icon unless contextually required.

**Links:** `text-foreground/50 hover:text-foreground transition-colors`
External links get `&nearr;` (↗) suffix in font-mono xs.

---

## paintings

Each Impressionist painting is a semantic anchor for a discipline, not decoration.

| Painting | Discipline |
|---|---|
| `cliffs_at_pourville` | hero anchor |
| `jeanne_samary` | artificial intelligence / language |
| `notre_dame_de_paris` | systems & architecture |
| `charing_cross_bridge_london` | developer tools |
| `oarsmen_at_chatou` | agents |
| `first_snow_at_veneux-nadon` | education & learning |
| `entrance_to_the_harbor_le_havre` | community |
| `poppies_isles_of_shoals` | design |

All paintings live in `apps/web/public/paintings/`. Reference as `/paintings/filename.jpg`.

**Image treatment:** grayscale at rest, color on hover (`grayscale hover:grayscale-0 transition-all duration-700`). When used as a hero, fade left-to-white with `bg-gradient-to-r from-white via-white/80 to-white/10`.

---

## file locations

```
apps/web/
├── app/globals.css         # color tokens, font variables
├── app/layout.tsx          # font imports
├── components/Nav.tsx      # navigation
├── components/Footer.tsx   # footer
├── lib/content/types.ts    # content type definitions
└── public/paintings/       # Impressionist painting assets
```

---

*Last updated: February 2026*
