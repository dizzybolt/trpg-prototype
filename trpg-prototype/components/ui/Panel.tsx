type PanelProps = {
  children: React.ReactNode
  title?: string
  rightContent?: React.ReactNode
  className?: string
}

export default function Panel({
  children,
  title,
  rightContent,
  className = "",
}: PanelProps) {
  return (
    <section
      className={`
        rounded-xl
        border
        border-slate-800
        bg-slate-950/80
        p-4
        backdrop-blur-sm
        ${className}
      `}
    >
      {(title || rightContent) && (
        <div className="mb-4 flex items-center justify-between">
          {title ? (
            <h3 className="text-base font-bold text-amber-300 tracking-wide">
              {title}
            </h3>
          ) : (
            <div />
          )}

          {rightContent}
        </div>
      )}

      {children}
    </section>
  )
}