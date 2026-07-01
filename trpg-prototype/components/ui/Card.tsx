type CardProps = {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
}

export default function Card({
  children,
  title,
  subtitle,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        border
        border-slate-700
        bg-slate-900/80
        p-4
        shadow-lg
        shadow-black/30
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-3">
          {subtitle && (
            <p className="text-xs text-slate-500">
              {subtitle}
            </p>
          )}

          {title && (
            <h2 className="text-lg font-bold text-amber-200">
              {title}
            </h2>
          )}
        </div>
      )}

      {children}
    </div>
  )
}