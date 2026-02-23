"use client"

import { useState } from "react"
import type { QuizQuestion } from "@/lib/content/types"

type Props = {
  questions: QuizQuestion[]
}

type AnswerState = "unanswered" | "correct" | "wrong"

export function Quiz({ questions }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null)
  )
  const [submitted, setSubmitted] = useState(false)

  if (questions.length === 0) return null

  function select(qIdx: number, optIdx: number) {
    if (submitted) return
    setAnswers((prev) => {
      const next = [...prev]
      next[qIdx] = optIdx
      return next
    })
  }

  function submit() {
    if (answers.some((a) => a === null)) return
    setSubmitted(true)
  }

  function reset() {
    setAnswers(questions.map(() => null))
    setSubmitted(false)
  }

  const score = submitted
    ? answers.filter((a, i) => a === questions[i]!.answer).length
    : 0

  return (
    <div className="mt-16 border-t border-[#ebebeb] pt-12 space-y-10">
      <div className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/30">check your understanding</p>
        {submitted && (
          <p className="font-display text-2xl text-foreground">
            {score}/{questions.length} correct
          </p>
        )}
      </div>

      <div className="space-y-10">
        {questions.map((q, qIdx) => {
          const chosen = answers[qIdx]
          let state: AnswerState = "unanswered"
          if (submitted && chosen !== null) {
            state = chosen === q.answer ? "correct" : "wrong"
          }

          return (
            <div key={qIdx} className="space-y-4">
              <p className="font-display text-lg text-foreground">
                <span className="font-mono text-xs text-foreground/30 mr-3">{qIdx + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isChosen = chosen === optIdx
                  const isCorrect = q.answer === optIdx
                  let classes = "flex items-center gap-3 px-4 py-3 border text-sm cursor-pointer transition-colors "
                  if (!submitted) {
                    classes += isChosen
                      ? "border-foreground bg-[#f9f8f6]"
                      : "border-[#ebebeb] hover:border-foreground/30"
                  } else {
                    if (isCorrect) classes += "border-foreground/60 bg-[#f9f8f6]"
                    else if (isChosen && !isCorrect) classes += "border-[#ebebeb] opacity-50"
                    else classes += "border-[#ebebeb] opacity-30"
                  }

                  return (
                    <button
                      key={optIdx}
                      className={classes}
                      onClick={() => select(qIdx, optIdx)}
                      disabled={submitted}
                    >
                      <span className="font-mono text-xs text-foreground/30 w-4 shrink-0">
                        {String.fromCharCode(97 + optIdx)}.
                      </span>
                      <span className="text-foreground/80">{opt}</span>
                      {submitted && isCorrect && (
                        <span className="ml-auto font-mono text-xs text-foreground/40">correct</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-4">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={answers.some((a) => a === null)}
            className="bg-foreground text-white text-sm px-6 py-2.5 hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            check answers
          </button>
        ) : (
          <button
            onClick={reset}
            className="font-mono text-xs text-foreground/40 hover:text-foreground transition-colors"
          >
            try again
          </button>
        )}
      </div>
    </div>
  )
}
