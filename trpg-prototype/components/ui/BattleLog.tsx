type BattleLogProps = {
  logs: string[]
  title?: string
  maxHeight?: string
  className?: string
}

export default function BattleLog({
  logs,
  title = "전투 로그",
  maxHeight = "h-56",
  className = "",
}: BattleLogProps) {
  return (
    <div
      className={`
        rounded-xl
        border
        border-slate-800
        bg-black/50
        p-4
        ${className}
      `}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-amber-300">
          {title}
        </h3>

        <span className="text-xs text-slate-600">
          {logs.length} lines
        </span>
      </div>

      <div
        className={`
          ${maxHeight}
          overflow-y-auto
          space-y-1
          pr-1
          text-sm
          leading-6
          text-slate-300
        `}
      >
        {logs.length === 0 ? (
          <p className="text-slate-600">
            아직 기록된 로그가 없습니다.
          </p>
        ) : (
          logs.map((log, index) => (
            <p
              key={`${log}-${index}`}
              className={`
                ${
                  log.includes("LEVEL UP") ||
                  log.includes("승리") ||
                  log.includes("획득")
                    ? "text-amber-200"
                    : ""
                }
                ${
                  log.includes("치명타")
                    ? "text-red-300 font-bold"
                    : ""
                }
                ${
                  log.includes("회피")
                    ? "text-sky-300"
                    : ""
                }
                ${
                  log.includes("쓰러졌다") ||
                  log.includes("패배")
                    ? "text-red-400"
                    : ""
                }
                ${
                  log.trim() === ""
                    ? "h-3"
                    : ""
                }
              `}
            >
              {log}
            </p>
          ))
        )}
      </div>
    </div>
  )
}