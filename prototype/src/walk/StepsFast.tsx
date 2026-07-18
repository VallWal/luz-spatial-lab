import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Bath, Bed, Check, CookingPot, Tag, Wrench } from 'lucide-react'
import { useStore } from '../store'
import { BottomBar, Button, Card, Lead, MockPhoto, Title, TopBar } from '../ui'

/* ————————————— 13 · Accelerated remaining-room journey ————————————— */

/**
 * After the detailed Living Room, the remaining rooms move quickly:
 * each keeps one believable interactive moment instead of the full flow.
 */

function MiniAction({
  label,
  done,
  onClick,
  busyLabel,
}: {
  label: string
  done: boolean
  onClick: () => void
  busyLabel?: string
}) {
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    if (!busy) return
    const t = window.setTimeout(() => {
      setBusy(false)
      onClick()
    }, 900)
    return () => window.clearTimeout(t)
  }, [busy, onClick])

  if (done)
    return (
      <div className="flex h-11 items-center gap-2 rounded-xl bg-ok-100 px-4 text-[14px] font-semibold text-ok-500">
        <Check size={16} strokeWidth={3} /> {label}
      </div>
    )
  return (
    <button
      onClick={() => setBusy(true)}
      disabled={busy}
      className="flex h-11 items-center justify-center rounded-xl bg-navy-900 px-4 text-[14px] font-semibold text-cream-50 active:bg-navy-800 disabled:opacity-70"
    >
      {busy ? (busyLabel ?? 'One moment…') : label}
    </button>
  )
}

interface FastRoom {
  id: string
  name: string
  icon: ReactNode
  seed: string
  intro: string
  actions: { id: string; label: string; busyLabel?: string }[]
  summary: string
  troubled?: boolean
}

const FAST_ROOMS: FastRoom[] = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: <CookingPot size={20} />,
    seed: 'kitchen',
    intro: 'Doorway tagged and scanned — two things worth a decision:',
    actions: [
      { id: 'dishwasher', label: 'Register dishwasher', busyLabel: 'Tagging…' },
      { id: 'checkpoints', label: 'Accept sink & appliance checkpoints (4)' },
    ],
    summary: 'Kitchen added — 1 asset, 4 checkpoints, 7 baseline photos.',
  },
  {
    id: 'main-bedroom',
    name: 'Main Bedroom',
    icon: <Bed size={20} />,
    seed: 'bedroom',
    intro: 'Tagged and scanned in under two minutes:',
    actions: [
      { id: 'photos', label: 'Capture baseline photos', busyLabel: 'Capturing…' },
      { id: 'checkpoints', label: 'Accept shutter & window checkpoints (4)' },
    ],
    summary: 'Main Bedroom added — 4 checkpoints, 5 baseline photos.',
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    icon: <Bath size={20} />,
    seed: 'bathroom',
    troubled: true,
    intro: 'The mirrors are confusing the scan — no problem at all:',
    actions: [
      { id: 'identity', label: 'Continue with doorway identity + photos', busyLabel: 'Capturing…' },
      { id: 'checkpoints', label: 'Accept seal & moisture checkpoints (5)' },
    ],
    summary: 'Bathroom added with photos — its shape can be scanned any other day.',
  },
  {
    id: 'utility-room',
    name: 'Utility Room',
    icon: <Wrench size={20} />,
    seed: 'utility',
    intro: 'A small room with important tenants:',
    actions: [
      { id: 'heater', label: 'Identify water heater', busyLabel: 'Tagging…' },
      { id: 'meter', label: 'Add meter-reading checkpoint' },
    ],
    summary: 'Utility Room added — water heater registered, meters will be read every visit.',
  },
]

export function StepFastRooms({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const done = state.walk.fastRoomsDone
  const [actions, setActions] = useState<Record<string, string[]>>({})
  const [scanState, setScanState] = useState<Record<string, number>>({})

  // simulate the bathroom scan stalling
  useEffect(() => {
    const pending = FAST_ROOMS.filter((r) => r.troubled && scanState[r.id] !== undefined && scanState[r.id] < 42)
    if (pending.length === 0) return
    const t = window.setInterval(
      () =>
        setScanState((s) => {
          const next = { ...s }
          for (const r of pending) next[r.id] = Math.min(42, (next[r.id] ?? 0) + 7)
          return next
        }),
      250,
    )
    return () => window.clearInterval(t)
  }, [scanState])

  const roomActions = (id: string) => actions[id] ?? []
  const completeAction = (roomId: string, actionId: string, total: number) => {
    const list = actions[roomId] ?? []
    if (list.includes(actionId)) return
    const nextList = [...list, actionId]
    setActions({ ...actions, [roomId]: nextList })
    if (nextList.length >= total) dispatch({ type: 'fast-room-done', id: roomId })
  }

  const canContinue = done.length >= 2

  return (
    <div className="flex flex-1 flex-col px-5 pb-48 pt-2">
      <TopBar onBack={onBack} />
      <Title>Four rooms, the quick way</Title>
      <Lead>
        You've seen the full discovery once. The remaining rooms keep the same rhythm — tag, scan, photos — with only the
        decisions surfacing.
      </Lead>

      <div className="mt-6 flex flex-col gap-3.5">
        {FAST_ROOMS.map((room) => {
          const isDone = done.includes(room.id)
          const troubledUnresolved =
            room.troubled && !roomActions(room.id).includes('identity') && (scanState[room.id] ?? 0) < 42

          return (
            <Card key={room.id} pad={false} className="overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <MockPhoto seed={room.seed} ratio="1/1" className="w-14 shrink-0" rounded="rounded-xl" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[16px] font-semibold text-ink-900">
                    <span className="text-navy-700">{room.icon}</span>
                    {room.name}
                  </div>
                  {!isDone && <div className="mt-0.5 text-[13px] leading-snug text-ink-500">{room.intro}</div>}
                  {isDone && <div className="mt-0.5 text-[13px] leading-snug text-ok-500">{room.summary}</div>}
                </div>
                {isDone && (
                  <span className="anim-pop flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ok-100 text-ok-500">
                    <Check size={17} strokeWidth={3} />
                  </span>
                )}
              </div>

              {!isDone && room.troubled && scanState[room.id] === undefined && (
                <div className="border-t border-cream-200 bg-cream-50/60 px-4 py-3">
                  <button
                    onClick={() => setScanState((s) => ({ ...s, [room.id]: 1 }))}
                    className="flex h-11 w-full items-center justify-center rounded-xl bg-navy-900 text-[14px] font-semibold text-cream-50 active:bg-navy-800"
                  >
                    Scan room
                  </button>
                </div>
              )}

              {!isDone && room.troubled && scanState[room.id] !== undefined && troubledUnresolved && (
                <div className="border-t border-cream-200 bg-cream-50/60 px-4 py-3">
                  <div className="mb-2 flex items-center justify-between text-[13px]">
                    <span className="font-medium text-warn-500">
                      {(scanState[room.id] ?? 0) < 42 ? 'Scanning…' : ''}
                    </span>
                    <span className="font-mono text-ink-500">{scanState[room.id]}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-cream-200">
                    <div className="h-full rounded-full bg-warn-500 transition-all" style={{ width: `${scanState[room.id]}%` }} />
                  </div>
                </div>
              )}

              {!isDone && (!room.troubled || (scanState[room.id] ?? 0) >= 42) && (
                <div className="flex flex-col gap-2 border-t border-cream-200 bg-cream-50/60 px-4 py-3">
                  {room.troubled && !roomActions(room.id).includes('identity') && (
                    <p className="text-[13px] font-medium text-warn-500">
                      Mirrors and glass are making this room hard to read.
                    </p>
                  )}
                  {room.actions.map((a) => (
                    <MiniAction
                      key={a.id}
                      label={a.label}
                      busyLabel={a.busyLabel}
                      done={roomActions(room.id).includes(a.id)}
                      onClick={() => completeAction(room.id, a.id, room.actions.length)}
                    />
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-navy-900/5 px-4 py-3.5">
        <Tag size={18} className="shrink-0 text-navy-700" />
        <p className="text-[13px] leading-snug text-ink-700">
          The Guest Bedroom and Technical Room are captured the same way during the walk — they'll appear in the passport
          alongside everything else.
        </p>
      </div>

      <BottomBar>
        <Button variant="gold" disabled={!canContinue} onClick={() => dispatch({ type: 'go', step: 'utilities' })}>
          {canContinue ? 'Continue to the Utility Hunt' : 'Complete at least two rooms'}
        </Button>
        {canContinue && done.length < FAST_ROOMS.length && (
          <p className="text-center text-[13px] text-ink-500">
            Skipping ahead is fine — unfinished rooms stay on the list for later.
          </p>
        )}
      </BottomBar>
    </div>
  )
}
