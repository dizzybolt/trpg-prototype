import Link from "next/link"

export default function HomePage() {
  return (
    <main className="game-page">
      <div className="game-container min-h-[80vh] justify-center">
        <div className="game-panel text-center space-y-6">
          <div>
            <p className="text-sm text-slate-400 mb-2">TRPG Simulation DRPG</p>
            <h1 className="game-title text-4xl">판도라 미궁</h1>
            <p className="text-slate-400 mt-3">
              아카데미 탐험가를 위한 첫 번째 모험
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/character" className="game-button-primary">
              새 게임
            </Link>

            <Link href="/town" className="game-button">
              이어하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}