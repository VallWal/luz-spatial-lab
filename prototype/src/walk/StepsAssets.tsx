import { useState } from 'react'
import { Camera, Check, ChevronDown, CircleCheck, Pencil, Sparkles, X } from 'lucide-react'
import { useStore } from '../store'
import { LIVING_ROOM_CHECKPOINTS } from '../data'
import { BottomBar, Button, Card, Divider, DoneItem, Lead, MockPhoto, NameplatePhoto, SectionLabel, Title, TopBar } from '../ui'
import { ShutterButton, TagScanSim } from '../sims'

/* ————————————————— 10 · Asset discovery ————————————————— */

interface SuggestedAsset {
  id: string
  name: string
  hint: string
  deep?: boolean
}

const SUGGESTED: SuggestedAsset[] = [
  { id: 'ac', name: 'Air-conditioning unit', hint: 'Wall-mounted, above the terrace door', deep: true },
  { id: 'fireplace', name: 'Fireplace', hint: 'Worth remembering for chimney checks' },
  { id: 'terrace-door', name: 'Terrace door', hint: 'Lock and seals get checked on every visit' },
]

type AcPhase = 'overview' | 'nameplate' | 'tag' | 'details'

export function StepAssets({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const decisions = state.walk.assetDecisions
  const [acPhase, setAcPhase] = useState<AcPhase | null>(null)
  const [overviewShot, setOverviewShot] = useState(false)
  const [nameplateShot, setNameplateShot] = useState(false)
  const [editing, setEditing] = useState(false)
  const [fields, setFields] = useState({ brand: 'Daikin', model: 'FTXM35R', serial: 'E008537-1AB4' })

  const decided = SUGGESTED.every((s) => decisions[s.id] !== undefined)

  /* ——— Air-conditioning deep registration flow ——— */
  if (acPhase) {
    const stepIndex = { overview: 1, nameplate: 2, tag: 3, details: 4 }[acPhase]
    return (
      <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
        <TopBar
          onBack={() => setAcPhase(null)}
          title="Air-conditioning unit"
          subtitle={`Step ${stepIndex} of 4 · Living Room`}
        />

        {acPhase === 'overview' && (
          <>
            <Lead>One photo of the whole unit.</Lead>
            <div className="relative mt-4 overflow-hidden rounded-3xl">
              <MockPhoto seed="ac-unit" ratio="4/3" rounded="rounded-3xl" label={overviewShot ? 'Captured' : ''} />
              {!overviewShot && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/50 to-transparent pb-5 pt-10">
                  <ShutterButton onClick={() => setOverviewShot(true)} />
                </div>
              )}
              {overviewShot && (
                <div className="anim-pop absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ok-500 text-white">
                  <Check size={20} strokeWidth={3} />
                </div>
              )}
            </div>
            <BottomBar>
              <Button variant="gold" disabled={!overviewShot} onClick={() => setAcPhase('nameplate')}>
                Continue
              </Button>
            </BottomBar>
          </>
        )}

        {acPhase === 'nameplate' && (
          <>
            <Lead>Now the label with the model details. Usually on the side or under the flap.</Lead>
            <div className="relative mt-4">
              {nameplateShot ? (
                <NameplatePhoto brand={fields.brand} model={fields.model} serial={fields.serial} />
              ) : (
                <div className="relative overflow-hidden rounded-3xl">
                  <MockPhoto seed="ac-side" ratio="4/3" rounded="rounded-3xl" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/50 to-transparent pb-5 pt-10">
                    <ShutterButton onClick={() => setNameplateShot(true)} />
                  </div>
                </div>
              )}
            </div>
            {nameplateShot && (
              <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-gold-500/10 px-4 py-3">
                <Sparkles size={18} className="shrink-0 text-gold-600" />
                <span className="text-[14px] text-ink-700">Reading the label for you — you'll confirm everything in a moment.</span>
              </div>
            )}
            <BottomBar>
              <Button variant="gold" disabled={!nameplateShot} onClick={() => setAcPhase('tag')}>
                Continue
              </Button>
            </BottomBar>
          </>
        )}

        {acPhase === 'tag' && (
          <div className="mt-2">
            <TagScanSim
              subject="Air-conditioning unit"
              onDone={() => setAcPhase('details')}
              onSkip={() => {
                dispatch({ type: 'defer', id: 'ac-tag' })
                setAcPhase('details')
              }}
            />
          </div>
        )}

        {acPhase === 'details' && (
          <>
            <Lead>Read from the label. Correct anything that looks wrong.</Lead>
            <Card className="mt-4" pad={false}>
              <div className="px-5 py-1">
                {(
                  [
                    ['Brand', 'brand'],
                    ['Model', 'model'],
                    ['Serial number', 'serial'],
                  ] as const
                ).map(([label, key], i) => (
                  <div key={key} className={`py-3 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
                    <div className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-400">{label}</div>
                    {editing ? (
                      <input
                        value={fields[key]}
                        onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
                        className="mt-1 h-10 w-full rounded-lg border border-cream-300 bg-cream-50 px-3 text-[16px] text-ink-900 outline-none focus:border-gold-500"
                      />
                    ) : (
                      <div className="mt-0.5 flex items-center justify-between">
                        <span className="text-[17px] font-medium text-ink-900">{fields[key]}</span>
                        <Sparkles size={15} className="text-gold-500" aria-label="Suggested from nameplate" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
            <button
              onClick={() => setEditing((e) => !e)}
              className="mt-3 flex items-center gap-2 self-start rounded-full px-2 py-1.5 text-[14px] font-semibold text-gold-700 active:bg-black/5"
            >
              <Pencil size={15} /> {editing ? 'Done editing' : 'Edit details'}
            </button>
            <BottomBar>
              <Button
                variant="gold"
                onClick={() => {
                  dispatch({ type: 'ac-registered' })
                  setAcPhase(null)
                }}
              >
                Save asset
              </Button>
            </BottomBar>
          </>
        )}
      </div>
    )
  }

  /* ——— Suggestion list ——— */
  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar onBack={onBack} />
      <Title>Noticed in this room</Title>
      <Lead>Equipment worth remembering. Under a minute each.</Lead>

      <div className="mt-6 flex flex-col gap-3">
        {SUGGESTED.map((s) => {
          const d = decisions[s.id]
          return (
            <Card key={s.id} pad={false} className="overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <MockPhoto seed={s.id} ratio="1/1" className="w-16 shrink-0" rounded="rounded-xl" />
                <div className="min-w-0 flex-1">
                  <div className="text-[16px] font-semibold text-ink-900">{s.name}</div>
                  <div className="mt-0.5 text-[13px] text-ink-500">{s.hint}</div>
                </div>
                {d === 'registered' && (
                  <span className="anim-pop flex h-8 w-8 items-center justify-center rounded-full bg-ok-100 text-ok-500">
                    <Check size={17} strokeWidth={3} />
                  </span>
                )}
              </div>
              {!d && (
                <div className="flex gap-2 border-t border-cream-200 bg-cream-50/60 px-4 py-3">
                  <button
                    onClick={() => (s.deep ? setAcPhase('overview') : dispatch({ type: 'asset-decision', id: s.id, decision: 'registered' }))}
                    className="h-10 flex-1 rounded-xl bg-navy-900 text-[14px] font-semibold text-cream-50 active:bg-navy-800"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'asset-decision', id: s.id, decision: 'ignored' })}
                    className="h-10 flex-1 rounded-xl border border-cream-300 bg-white text-[14px] font-medium text-ink-700 active:bg-cream-100"
                  >
                    Ignore
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: 'asset-decision', id: s.id, decision: 'unsure' })
                      dispatch({ type: 'defer', id: `asset-${s.id}` })
                    }}
                    className="h-10 flex-1 rounded-xl border border-cream-300 bg-white text-[14px] font-medium text-ink-700 active:bg-cream-100"
                  >
                    Not sure
                  </button>
                </div>
              )}
              {d && d !== 'registered' && (
                <div className="flex items-center justify-between border-t border-cream-200 bg-cream-50/60 px-4 py-2.5">
                  <span className="text-[13px] text-ink-500">
                    {d === 'ignored' ? 'Left out of the passport' : 'Kept aside — will be decided later'}
                  </span>
                  <button
                    onClick={() => dispatch({ type: 'asset-decision', id: s.id, decision: undefined as never })}
                    className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-gold-700 active:bg-black/5"
                  >
                    Undo
                  </button>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <BottomBar>
        <Button variant="gold" disabled={!decided} onClick={() => dispatch({ type: 'go', step: 'checkpoints' })}>
          {decided ? 'Continue' : 'Decide on each item to continue'}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 11 · Suggested checkpoints ————————————————— */

export function StepCheckpoints({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const [selected, setSelected] = useState<string[]>(
    state.walk.checkpointsAccepted.length > 0
      ? state.walk.checkpointsAccepted
      : LIVING_ROOM_CHECKPOINTS.map((c) => c.id).filter((id) => id !== 'lr-sweep'),
  )
  const [editingId, setEditingId] = useState<string | null>(null)
  const [labels, setLabels] = useState<Record<string, string>>({})

  const toggle = (id: string) =>
    setSelected((sel) => (sel.includes(id) ? sel.filter((s) => s !== id) : [...sel, id]))

  const allSelected = selected.length === LIVING_ROOM_CHECKPOINTS.length

  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar onBack={onBack} />
      <Title>What should future visits check here?</Title>
      <Lead>These are the things future inspections should remember to check here.</Lead>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[14px] font-medium text-ink-500">{selected.length} selected</span>
        <button
          onClick={() => setSelected(allSelected ? [] : LIVING_ROOM_CHECKPOINTS.map((c) => c.id))}
          className="rounded-full px-3 py-1.5 text-[14px] font-semibold text-gold-700 active:bg-black/5"
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </button>
      </div>

      <Card className="mt-2" pad={false}>
        <div className="px-5 py-1">
          {LIVING_ROOM_CHECKPOINTS.map((c, i) => {
            const on = selected.includes(c.id)
            const label = labels[c.id] ?? c.label
            return (
              <div key={c.id} className={i > 0 ? 'border-t border-cream-200' : ''}>
                {editingId === c.id ? (
                  <div className="flex items-center gap-2 py-2.5">
                    <input
                      autoFocus
                      value={label}
                      onChange={(e) => setLabels((l) => ({ ...l, [c.id]: e.target.value }))}
                      className="h-11 min-w-0 flex-1 rounded-xl border border-cream-300 bg-cream-50 px-3.5 text-[15px] text-ink-900 outline-none focus:border-gold-500"
                    />
                    <Button small full={false} onClick={() => setEditingId(null)}>
                      Done
                    </Button>
                  </div>
                ) : (
                  <div className="flex min-h-14 items-center gap-3 py-1.5">
                    <button
                      onClick={() => toggle(c.id)}
                      aria-pressed={on}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        on ? 'border-ok-500 bg-ok-500 text-white' : 'border-cream-300 bg-white'
                      }`}
                    >
                      {on ? <Check size={15} strokeWidth={3} /> : <X size={13} className="text-transparent" />}
                    </button>
                    <button onClick={() => toggle(c.id)} className={`flex-1 py-2 text-left text-[15px] ${on ? 'text-ink-900' : 'text-ink-400'}`}>
                      {label}
                    </button>
                    <button
                      onClick={() => setEditingId(c.id)}
                      aria-label={`Edit ${label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 active:bg-black/5"
                    >
                      <Pencil size={15} />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      <BottomBar>
        <Button
          variant="gold"
          disabled={selected.length === 0}
          onClick={() => {
            dispatch({ type: 'checkpoints', ids: selected })
            dispatch({ type: 'go', step: 'room-done' })
          }}
        >
          Add {selected.length} checkpoint{selected.length === 1 ? '' : 's'}
        </Button>
        <Button
          variant="ghost"
          small
          onClick={() => {
            dispatch({ type: 'checkpoints', ids: [] })
            dispatch({ type: 'go', step: 'room-done' })
          }}
        >
          Skip checkpoints for this room
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 12 · Room complete ————————————————— */

export function StepRoomDone({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const w = state.walk
  const [showDetail, setShowDetail] = useState(false)
  const assetCount = Object.values(w.assetDecisions).filter((d) => d === 'registered').length

  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar onBack={onBack} />
      <div className="mt-4 flex flex-col items-center text-center">
        <div className="anim-pop flex h-20 w-20 items-center justify-center rounded-full bg-ok-100">
          <CircleCheck size={44} className="text-ok-500" />
        </div>
        <h1 className="font-display mt-5 text-[28px] font-semibold text-ink-900">{w.roomName} added</h1>
        <p className="mt-2 max-w-[300px] text-[15px] leading-relaxed text-ink-500">
          Future visits will now remember what belongs here and what should be checked.
        </p>
      </div>

      <Card className="mt-7" pad={false}>
        <div className="px-5 py-3">
          <DoneItem>
            {state.walk.deferred.includes('lr-doorway-tag') ? 'Room identity — doorway tag on the list for next visit' : '1 room identity'}
          </DoneItem>
          <DoneItem>
            {w.photosTaken.length} baseline photo{w.photosTaken.length === 1 ? '' : 's'}
          </DoneItem>
          <DoneItem>
            {assetCount} registered asset{assetCount === 1 ? '' : 's'}
          </DoneItem>
          <DoneItem>
            {w.checkpointsAccepted.length} checkpoint{w.checkpointsAccepted.length === 1 ? '' : 's'}
          </DoneItem>
        </div>
        <button
          onClick={() => setShowDetail((s) => !s)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-cream-200 py-3 text-[14px] font-semibold text-gold-700 active:bg-cream-50"
        >
          {showDetail ? 'Hide details' : 'Review Living Room'}
          <ChevronDown size={16} className={`transition-transform ${showDetail ? 'rotate-180' : ''}`} />
        </button>
        {showDetail && (
          <div className="border-t border-cream-200 px-5 py-4">
            <div className="text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-400">Checkpoints</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {LIVING_ROOM_CHECKPOINTS.filter((c) => w.checkpointsAccepted.includes(c.id)).map((c) => (
                <span key={c.id} className="rounded-full bg-cream-100 px-3 py-1.5 text-[13px] text-ink-700">
                  {c.label}
                </span>
              ))}
            </div>
            <div className="mt-4 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-400">Photos</div>
            <div className="no-scrollbar -mx-1 mt-2 flex gap-2 overflow-x-auto px-1">
              {w.photosTaken.slice(0, 8).map((id) => (
                <MockPhoto key={id} seed={`lr-${id}`} ratio="1/1" className="w-16 shrink-0" rounded="rounded-lg" />
              ))}
            </div>
          </div>
        )}
      </Card>

      <BottomBar>
        <Button variant="gold" onClick={() => dispatch({ type: 'go', step: 'fast' })}>
          Next room
        </Button>
      </BottomBar>
    </div>
  )
}
