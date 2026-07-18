import { useMemo, useState } from 'react'
import { Camera, Check, Pencil, Plus, RotateCcw, ScanLine, Tag, X } from 'lucide-react'
import { useStore } from '../store'
import { LIVING_ROOM_SCAN_ITEMS, LIVING_ROOM_SHOTS } from '../data'
import { BottomBar, Button, Card, Lead, MockPhoto, SectionLabel, Title, TopBar } from '../ui'
import { RoomScanSim, ShutterButton, TagScanSim } from '../sims'

/* ————————————————— 6 · Room discovery ————————————————— */

export function StepDiscover({ onBack }: { onBack: () => void }) {
  const { dispatch } = useStore()
  const [phase, setPhase] = useState<'explain' | 'tag'>('explain')

  if (phase === 'tag') {
    return (
      <div className="flex flex-1 flex-col px-5 pb-10 pt-2">
        <TopBar onBack={() => setPhase('explain')} title="Living Room" subtitle="Doorway identity" />
        <div className="mt-2">
          <TagScanSim
            subject="Living Room doorway"
            onDone={() => dispatch({ type: 'go', step: 'scan' })}
            onSkip={() => {
              dispatch({ type: 'defer', id: 'lr-doorway-tag' })
              dispatch({ type: 'go', step: 'scan' })
            }}
          />
        </div>
      </div>
    )
  }

  const steps = [
    { icon: <Tag size={20} />, label: 'Register the doorway', hint: 'A small tag at the door frame — the room’s name badge' },
    { icon: <ScanLine size={20} />, label: 'Walk the room once', hint: 'The phone sketches the room while you walk' },
    { icon: <Camera size={20} />, label: 'Capture how it looks today', hint: 'A handful of baseline photos' },
  ]

  return (
    <div className="flex flex-1 flex-col px-5 pb-40 pt-2">
      <TopBar onBack={onBack} />
      <Title>Let's discover this room.</Title>
      <Lead>The Living Room becomes the first room Casa del Mar will remember.</Lead>

      <Card className="mt-6" pad={false}>
        <div className="px-5 py-2">
          {steps.map((s, i) => (
            <div key={s.label} className={`flex items-start gap-4 py-3.5 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-700">
                {s.icon}
              </span>
              <span>
                <span className="block text-[16px] font-medium text-ink-900">{s.label}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-ink-500">{s.hint}</span>
              </span>
            </div>
          ))}
        </div>
      </Card>

      <BottomBar>
        <Button variant="gold" onClick={() => setPhase('tag')}>
          Register room
        </Button>
        <Button
          variant="ghost"
          small
          onClick={() => {
            dispatch({ type: 'defer', id: 'lr-doorway-tag' })
            dispatch({ type: 'go', step: 'scan' })
          }}
        >
          Skip — tag it later
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 7 · Room scan ————————————————— */

export function StepScan({ onBack }: { onBack: () => void }) {
  const { dispatch } = useStore()
  return (
    <div className="flex flex-1 flex-col px-5 pb-10 pt-2">
      <TopBar onBack={onBack} title="Living Room" subtitle="Walk the room slowly" />
      <RoomScanSim
        roomName="Living Room"
        onFinish={() => {
          dispatch({ type: 'scan-outcome', outcome: 'scanned' })
          dispatch({ type: 'go', step: 'review' })
        }}
        onPhotosOnly={() => {
          dispatch({ type: 'scan-outcome', outcome: 'photos-only' })
          dispatch({ type: 'go', step: 'photos' })
        }}
      />
    </div>
  )
}

/* ————————————————— 8 · Room review ————————————————— */

const QUICK_ADDS = ['Ceiling fan', 'Built-in shelving', 'Radiator']

export function StepReview({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const { roomName, scanItemsRemoved, scanItemsAdded } = state.walk
  const [editingName, setEditingName] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  const items = LIVING_ROOM_SCAN_ITEMS

  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar onBack={onBack} />
      <Title>Here's what the room shared</Title>
      <Lead>Keep what's right, remove what isn't. You stay in charge of what the passport remembers.</Lead>

      <SectionLabel>Room name</SectionLabel>
      <Card pad={false} className="px-5">
        {editingName ? (
          <div className="flex items-center gap-2 py-3">
            <input
              autoFocus
              value={roomName}
              onChange={(e) => dispatch({ type: 'room-name', name: e.target.value })}
              className="h-11 min-w-0 flex-1 rounded-xl border border-cream-300 bg-cream-50 px-3.5 text-[16px] text-ink-900 outline-none focus:border-gold-500"
            />
            <Button small full={false} variant="primary" onClick={() => setEditingName(false)}>
              Done
            </Button>
          </div>
        ) : (
          <button onClick={() => setEditingName(true)} className="flex min-h-14 w-full items-center justify-between py-2 text-left">
            <span className="text-[17px] font-semibold text-ink-900">{roomName}</span>
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-gold-700">
              <Pencil size={15} /> Rename
            </span>
          </button>
        )}
      </Card>

      <SectionLabel>Noticed while scanning</SectionLabel>
      <Card pad={false} className="px-5 py-1">
        {items.map((item, i) => {
          const removed = scanItemsRemoved.includes(item.id)
          return (
            <div key={item.id} className={`flex min-h-13 items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  removed ? 'bg-cream-100 text-ink-400' : 'bg-ok-100 text-ok-500'
                }`}
              >
                {removed ? <X size={15} /> : <Check size={15} strokeWidth={3} />}
              </span>
              <span className={`flex-1 text-[15px] ${removed ? 'text-ink-400 line-through' : 'text-ink-900'} ${item.kind === 'context' ? 'italic' : ''}`}>
                {item.label}
              </span>
              {item.removable && (
                <button
                  onClick={() => dispatch({ type: removed ? 'scan-item-restore' : 'scan-item-remove', id: item.id })}
                  className="rounded-full px-3 py-1.5 text-[13px] font-medium text-ink-500 active:bg-black/5"
                >
                  {removed ? 'Restore' : 'Remove'}
                </button>
              )}
            </div>
          )
        })}
        {scanItemsAdded.map((label) => (
          <div key={label} className="flex min-h-13 items-center gap-3 border-t border-cream-200 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ok-100 text-ok-500">
              <Check size={15} strokeWidth={3} />
            </span>
            <span className="flex-1 text-[15px] text-ink-900">{label}</span>
            <span className="text-[12px] font-medium text-gold-700">added</span>
          </div>
        ))}
      </Card>

      {showAdd ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_ADDS.filter((q) => !scanItemsAdded.includes(q)).map((q) => (
            <button
              key={q}
              onClick={() => {
                dispatch({ type: 'scan-item-add', label: q })
                setShowAdd(false)
              }}
              className="rounded-full border border-cream-300 bg-white px-4 py-2 text-[14px] font-medium text-ink-700 active:bg-cream-100"
            >
              + {q}
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="mt-3 flex items-center gap-2 self-start rounded-full px-2 py-1.5 text-[14px] font-semibold text-gold-700 active:bg-black/5"
        >
          <Plus size={17} /> Add something the scan missed
        </button>
      )}

      <BottomBar>
        <Button variant="gold" onClick={() => dispatch({ type: 'go', step: 'photos' })}>
          Confirm {roomName || 'room'}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 9 · Baseline photos ————————————————— */

export function StepPhotos({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const taken = state.walk.photosTaken
  const [skipped, setSkipped] = useState<string[]>([])
  const [extraCount, setExtraCount] = useState(() => taken.filter((t) => t.startsWith('extra')).length)

  const pending = useMemo(
    () => LIVING_ROOM_SHOTS.filter((s) => !taken.includes(s.id) && !skipped.includes(s.id)),
    [taken, skipped],
  )
  const current = pending[0]
  const capturedCount = taken.length
  const allDone = pending.length === 0

  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar
        onBack={onBack}
        title="Baseline photos"
        subtitle={`${capturedCount} of ${LIVING_ROOM_SHOTS.length} captured`}
      />

      {!allDone && current ? (
        <>
          <div className="relative overflow-hidden rounded-3xl">
            <MockPhoto seed={current.seed} ratio="4/5" rounded="rounded-3xl" />
            <div className="absolute inset-x-0 top-0 flex justify-center pt-4">
              <span className="rounded-full bg-navy-950/55 px-4 py-1.5 text-[14px] font-medium text-cream-50">
                {current.label}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/50 to-transparent pb-5 pt-10">
              <ShutterButton onClick={() => dispatch({ type: 'photo', id: current.id })} />
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => setSkipped((s) => [...s, current.id])}
              className="rounded-full px-4 py-2 text-[14px] font-medium text-ink-500 active:bg-black/5"
            >
              Skip this one
            </button>
          </div>
        </>
      ) : (
        <Card className="mt-1 bg-ok-100/60">
          <div className="flex items-center gap-3">
            <Check size={22} strokeWidth={3} className="text-ok-500" />
            <p className="text-[15px] font-medium text-ink-900">
              {capturedCount > 0
                ? `Baseline captured — ${capturedCount} photo${capturedCount === 1 ? '' : 's'} remembered.`
                : 'Baseline skipped — it can be captured on any future visit.'}
            </p>
          </div>
        </Card>
      )}

      {(taken.length > 0 || skipped.length > 0) && (
        <>
          <SectionLabel>Captured</SectionLabel>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
            {LIVING_ROOM_SHOTS.filter((s) => taken.includes(s.id)).map((s) => (
              <div key={s.id} className="w-28 shrink-0">
                <MockPhoto seed={s.seed} ratio="1/1" label="" />
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="truncate text-[12px] text-ink-500">{s.label}</span>
                  <button
                    onClick={() => dispatch({ type: 'photo-remove', id: s.id })}
                    aria-label={`Retake ${s.label}`}
                    className="ml-1 shrink-0 text-ink-400 active:text-ink-700"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>
            ))}
            {Array.from({ length: extraCount }).map((_, i) => (
              <div key={i} className="w-28 shrink-0">
                <MockPhoto seed={`lr-extra-${i}`} ratio="1/1" />
                <span className="mt-1.5 block truncate text-[12px] text-ink-500">Extra photo</span>
              </div>
            ))}
            {allDone && (
              <button
                onClick={() => {
                  dispatch({ type: 'photo', id: `extra-${extraCount + 1}` })
                  setExtraCount((c) => c + 1)
                }}
                className="flex aspect-square w-28 shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-cream-300 text-ink-500 active:bg-cream-100"
              >
                <Plus size={22} />
                <span className="text-[12px] font-medium">Add photo</span>
              </button>
            )}
          </div>
        </>
      )}

      <BottomBar>
        <Button variant="gold" disabled={!allDone} onClick={() => dispatch({ type: 'go', step: 'assets' })}>
          {allDone ? 'Continue' : 'A few photos to go…'}
        </Button>
      </BottomBar>
    </div>
  )
}
