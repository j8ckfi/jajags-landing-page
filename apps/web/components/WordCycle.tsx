"use client"

import { useEffect, useState } from "react"

type WordCycleProps = {
  words: string[]
  intervalMs?: number
  className?: string
}

export function WordCycle({ words, intervalMs = 2200, className }: WordCycleProps) {
  const [index, setIndex] = useState(0)
  const wordsKey = words.join("|")

  useEffect(() => {
    if (words.length <= 1) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length)
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [wordsKey, words.length, intervalMs])

  const current = words[index] ?? words[0] ?? ""

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="inline-block min-w-[12ch]">
        {current}
      </span>
    </span>
  )
}
