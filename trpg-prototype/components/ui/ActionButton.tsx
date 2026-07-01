type ActionButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "danger"
  className?: string
}

export default function ActionButton({
  children,
  onClick,
  disabled = false,
  variant = "secondary",
  className = "",
}: ActionButtonProps) {
  const styles = {
    primary:
      "bg-amber-500 hover:bg-amber-400 text-black border-amber-300",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white border-slate-500",
    danger:
      "bg-red-700 hover:bg-red-600 text-white border-red-500",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        rounded-lg
        border
        px-4
        py-3
        font-semibold
        transition-all
        duration-150
        disabled:opacity-40
        disabled:cursor-not-allowed
        active:scale-95
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}