import Link from "next/link"

function getNextMeetingDate(): Date | null {
  const today = new Date()
  const d = new Date(today)
  for (let i = 0; i < 60; i++) {
    if (d.getDay() === 4) {
      const weekNum = Math.ceil(d.getDate() / 7)
      if ((weekNum === 1 || weekNum === 3) && d >= today) return new Date(d)
    }
    d.setDate(d.getDate() + 1)
  }
  return null
}

export function Pulse() {
  const nextMeeting = getNextMeetingDate()
  const nextMeetingString = nextMeeting
    ? nextMeeting.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "TBA"

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-8 font-mono text-sm">
      <div className="flex items-center gap-3">
        <span className="text-foreground/20">&#9658;</span>
        <span className="uppercase tracking-wider text-xs text-foreground/30">next meeting</span>
        <span className="text-foreground/70">{nextMeetingString}</span>
        <span className="text-foreground/20">HS Lunch &middot; Rm 202</span>
      </div>

      <span className="hidden sm:block text-foreground/10">|</span>

      <Link href="/now" className="flex items-center gap-3 group hover:opacity-60 transition-opacity">
        <span className="text-foreground/20">&#9658;</span>
        <span className="uppercase tracking-wider text-xs text-foreground/30">now</span>
        <span className="text-foreground/70 group-hover:text-foreground transition-colors">AI tools for student research</span>
      </Link>
    </div>
  )
}
