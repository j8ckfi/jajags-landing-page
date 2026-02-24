# jajags.tech branding + voice

## identity
- name: jajags.tech (always lowercase)
- description: a student-run Hack Club chapter at Jefferson Academy Secondary
- stance: humanist AI — building technology that stays human
- reference: the Impressionists — revolutionary, capturing human experience, rejecting rigid tradition

## voice
- direct, minimal, lowercase-friendly
- short sentences, active voice, no corporate buzzwords
- confident but not grandiose; curious, precise, and practical
- default to "we" language for statements about the club

## key copy
- tagline: "the club for builders/designers/makers/coders/roboticists/writers."
- core line: "we make projects, study the systems underneath them, and learn by shipping."
- join: "build with us." (keep join copy on `/join` only)
- how to join (keep on `/join` only):
  - "1. join the discord (discord.gg/cSSZGMMqSK) and introduce yourself."
  - "2. show up to the next meeting and share what you want to build."

## interaction detail
- hero word cycle: builders → designers → makers → coders → roboticists → writers

## visual system
- background: #FFFFFF (white)
- text: #2B2B2B (charcoal)
- alt section background: #F9F8F6 (warm off-white)
- borders: #EBEBEB
- no accent color — Impressionist paintings carry all color
- whitespace-first layout; art gallery density

## typography
- display/headings: Instrument Serif (Google Fonts)
- body, nav, labels, buttons: Inter
- code blocks only: IBM Plex Mono
- favor lowercase headings when the layout allows it

## ui tone
- buttons: charcoal fill with white text, no border radius
- links: charcoal with opacity hover (hover:opacity-60); avoid heavy color shifts
- no accent color in UI — keep UI monochrome

## painting → discipline map
- cliffs_at_pourville → hero anchor
- jeanne_samary → artificial intelligence / language
- notre_dame_de_paris → systems & architecture
- charing_cross_bridge_london → developer tools
- oarsmen_at_chatou → agents
- first_snow_at_veneux-nadon → education & learning
- entrance_to_the_harbor_le_havre → community
- poppies_isles_of_shoals → design

## site routes
- / — homepage
- /blog — technical blog (formerly /chronicle)
- /research — research catalogue
- /projects — projects database
- /builders — builder profiles (auto-derived from content authors)
- /builders/[slug] — individual builder profile
- /curriculum — learning track index
- /curriculum/[track]/[lesson] — lesson + quiz
- /tools — club-built tools showcase
- /library — external curated tools
- /now — current semester focus
- /about — about
- /join — join

## content schema
all content files live in apps/web/content/ and must include authors: string[]
builder profiles at /builders are auto-derived from all content with matching author names

- blog: title, date, description, authors, tags
- research: title, date, abstract, authors, tags, status (draft|published)
- projects: title, date, description, authors, tags, url?, github?, status (active|archived|shipped)
- tools: title, description, authors, url?, github?
- curriculum lesson: title, track, order, authors, quiz (question, options, answer)

## deployment
- platform: cloudflare pages
- project name: jajags-tech
- build output: apps/web/out (next.js static export)
- deploy command: `npx wrangler pages deploy out --project-name=jajags-tech` from apps/web/
