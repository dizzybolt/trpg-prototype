import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">
        TRPG Prototype
      </h1>

      <Link
        href="/character"
        className="border px-6 py-3 hover:bg-white hover:text-black"
      >
        New Game
      </Link>
    </main>
  )
}