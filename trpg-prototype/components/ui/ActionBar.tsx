type ActionButton = {
  label: string
  hotkey?: string
  icon: string
  onClick: () => void
  variant?: "default" | "primary" | "danger"
}

type ActionBarProps = {
  actions: ActionButton[]
}

export default function ActionBar({
  actions,
}: ActionBarProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className={`
            rounded-lg
            border
            p-3
            transition-all
            duration-150
            ${
              action.variant === "primary"
                ? "border-amber-500 bg-amber-700/20 hover:bg-amber-600/30"
                : action.variant === "danger"
                ? "border-red-700 bg-red-900/20 hover:bg-red-800/30"
                : "border-slate-700 bg-slate-900 hover:bg-slate-800"
            }
          `}
        >
          <div className="text-2xl">{action.icon}</div>

          <div className="mt-2 text-sm font-semibold">
            {action.label}
          </div>

          {action.hotkey && (
            <div className="mt-1 text-xs text-slate-500">
              [{action.hotkey}]
            </div>
          )}
        </button>
      ))}
    </div>
  )
}