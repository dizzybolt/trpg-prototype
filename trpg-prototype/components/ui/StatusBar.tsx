type StatusBarProps = {
  label: string
  value: number
  max: number
  variant?: "hp" | "mp" | "exp" | "neutral"
  showText?: boolean
  className?: string
}

export default function StatusBar({
  label,
  value,
  max,
  variant = "neutral",
  showText = true,
  className = "",
}: StatusBarProps) {
  const safeMax = Math.max(max, 1)
  const safeValue = Math.max(0, Math.min(value, safeMax))
  const percent = Math.round((safeValue / safeMax) * 100)

  const barColor = {
    hp: "bg-red-500",
    mp: "bg-blue-500",
    exp: "bg-amber-400",
    neutral: "bg-slate-400",
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">{label}</span>

        {showText && (
          <span className="text-slate-400">
            {safeValue}/{safeMax}
          </span>
        )}
      </div>

      <div className="h-3 overflow-hidden rounded-full border border-slate-700 bg-slate-950">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor[variant]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}