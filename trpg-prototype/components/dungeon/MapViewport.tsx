"use client"

import { useRef, useState } from "react"
import MiniMap from "./MiniMap"
import { DungeonMap } from "../../lib/dungeon/dungeonTypes"

type MapViewportProps = {
  map: DungeonMap
}

export default function MapViewport({ map }: MapViewportProps) {
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragStart = useRef<{ x: number; y: number } | null>(null)

  function zoomIn() {
    setZoom((prev) => Math.min(prev + 0.25, 2.5))
  }

  function zoomOut() {
    setZoom((prev) => Math.max(prev - 0.25, 0.75))
  }

  function resetView() {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragStart.current = {
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragStart.current) return

    setOffset({
      x: event.clientX - dragStart.current.x,
      y: event.clientY - dragStart.current.y,
    })
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    dragStart.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <div
        className="flex h-full w-full cursor-grab touch-none items-center justify-center active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStart.current = null
        }}
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "center",
          }}
        >
          <MiniMap map={map} tileSize={19} />
        </div>
      </div>

      <div className="absolute right-3 top-3 z-20 flex gap-1">
        <button
          onClick={zoomOut}
          className="h-8 w-8 rounded bg-slate-900/95 text-sm font-bold"
        >
          -
        </button>

        <button
          onClick={resetView}
          className="h-8 rounded bg-slate-900/95 px-3 text-xs font-bold"
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          onClick={zoomIn}
          className="h-8 w-8 rounded bg-slate-900/95 text-sm font-bold"
        >
          +
        </button>
      </div>
    </div>
  )
}