"use client"

import { useEffect, useRef } from "react"

type LogEntry = {
  text: string
  type?: "normal" | "battle" | "story" | "heal"
}

type GameLogProps = {
  title?: string
  logs: LogEntry[]
}

export default function GameLog({
  title = "탐험 기록",
  logs,
}: GameLogProps) {
  const logEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }, [logs])

  function getColor(type?: LogEntry["type"]) {
    switch (type) {
      case "battle":
        return "text-red-300"
      case "story":
        return "text-sky-300"
      case "heal":
        return "text-emerald-300"
      default:
        return "text-slate-300"
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <div className="mb-3 text-sm font-bold tracking-widest text-amber-200">
        {title}
      </div>

      <div className="h-36 space-y-2 overflow-y-auto pr-2">
        {logs.map((log, index) => (
          <div key={index} className={`text-sm ${getColor(log.type)}`}>
            ▶ {log.text}
          </div>
        ))}

        <div ref={logEndRef} />
      </div>
    </div>
  )
}