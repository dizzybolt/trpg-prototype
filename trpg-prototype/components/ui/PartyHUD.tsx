import { Character } from "../../lib/types"
import StatusBar from "./StatusBar"
import Portrait from "./Portrait"

type PartyHUDProps = {
  members: Character[]
  title?: string
}

export default function PartyHUD({
  members,
  title = "PARTY",
}: PartyHUDProps) {
  return (
    <aside className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
      <div className="mb-3 text-center text-sm font-bold tracking-widest text-amber-200">
        {title}
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.name}
            className="rounded-lg border border-slate-800 bg-black/40 p-2"
          >
            <div className="flex gap-3">
              <Portrait name={member.name} size="sm" />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold text-amber-100">
                    {member.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Lv.{member.level}
                  </p>
                </div>

                <StatusBar
                  label="HP"
                  value={member.hp}
                  max={member.maxHp}
                  variant="hp"
                />

                <StatusBar
                  label="MP"
                  value={member.mp}
                  max={member.maxMp}
                  variant="mp"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}