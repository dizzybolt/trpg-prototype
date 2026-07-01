type PortraitProps = {
  name: string
  image?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Portrait({
  name,
  image,
  size = "md",
  className = "",
}: PortraitProps) {
  const sizes = {
    sm: "w-16 h-16 text-xl",
    md: "w-24 h-24 text-3xl",
    lg: "w-32 h-32 text-5xl",
  }

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-xl
        border-2
        border-slate-700
        bg-slate-900
        overflow-hidden
        flex
        items-center
        justify-center
        shadow-lg
        shadow-black/40
        ${className}
      `}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="text-slate-400">👤</div>

          <div className="mt-1 text-[10px] text-slate-500 text-center px-1 truncate w-full">
            {name}
          </div>
        </div>
      )}
    </div>
  )
}