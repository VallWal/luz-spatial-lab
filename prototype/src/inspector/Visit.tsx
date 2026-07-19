import { useEffect, useState } from 'react'
import { Camera, Check, ChevronRight, CircleAlert, Gauge, MessageSquare, Undo2, Zap } from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import type { CheckpointResult } from '../store'
import {
  KITCHEN_VISIT_CHECKPOINTS,
  METERS,
  MOISTURE_FINDING,
  OWNER_REQUEST,
  REOBS_VOICE,
  VISIT_META,
} from '../scenario'
import { PROPERTY } from '../data'
import { BottomBar, Button, Card, Lead, MockPhoto, SectionLabel, Shell, Title, TopBar } from '../ui'
import { ShutterButton, TagScanSim, VoiceSim } from '../sims'
import { StageLiving } from './VisitAreas'

/* ————————————————— Shared checkpoint row ————————————————— */

export function CheckpointRow({
  label,
  hint,
  result,
  onOk,
  onIssue,
  onUndo,
  focused,
}: {
  label: string
  hint?: string
  result: CheckpointResult | undefined
  onOk: () => void
  onIssue?: () => void
  onUndo: () => void
  focused?: boolean
}) {
  const [justDone, setJustDone] = useState(false)
  useEffect(() => {
    if (!result) return
    setJustDone(true)
    const t = window.setTimeout(() => setJustDone(false), 3000)
    return () => window.clearTimeout(t)
  }, [result])

  if (result)
    return (
      <div className="flex min-h-14 items-center gap-3 py-1.5">
        <span
          className={`anim-pop flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            result === 'issue' ? 'bg-warn-100 text-warn-500' : 'bg-ok-100 text-ok-500'
          }`}
        >
          {result === 'issue' ? <CircleAlert size={17} /> : <Check size={17} strokeWidth={3} />}
        </span>
        <span className="flex-1 text-[15px] text-ink-500">
          {label}
          {result === 'batch' && <span className="ml-2 text-[12px] text-ink-400">· marked healthy</span>}
          {result === 'issue' && <span className="ml-2 text-[12px] font-medium text-warn-500">· finding recorded</span>}
        </span>
        {justDone && (
          <button
            onClick={onUndo}
            className="flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-ink-500 active:bg-black/5"
          >
            <Undo2 size={14} /> Undo
          </button>
        )}
      </div>
    )

  return (
    <div className={`-mx-2 flex min-h-14 items-center gap-3 rounded-xl px-2 py-1.5 ${focused ? 'bg-gold-500/10' : ''}`}>
      <button
        onClick={onOk}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ok-500/60 bg-white text-ok-500 active:bg-ok-100"
        aria-label={`Mark healthy: ${label}`}
      >
        <Check size={22} strokeWidth={2.6} />
      </button>
      <button onClick={onOk} className="min-w-0 flex-1 py-1 text-left">
        <span className="block text-[16px] font-medium text-ink-900">{label}</span>
        {hint && <span className="mt-0.5 block text-[12px] text-ink-500">{hint}</span>}
      </button>
      {onIssue && (
        <button
          onClick={onIssue}
          className="flex h-9 items-center rounded-full border border-cream-300 bg-white px-3 text-[13px] font-medium text-ink-700 active:bg-cream-100"
        >
          Issue
        </button>
      )}
    </div>
  )
}

/* ————————————————— Stage: arrival ————————————————— */

function StageArrival() {
  const { dispatch } = useStore()
  const { back } = useRouter()
  return (
    <div className="px-5 pb-40 pt-3">
      <TopBar onBack={back} />
      <Card pad={false} className="overflow-hidden">
        <MockPhoto seed="villa-hero" ratio="16/8" rounded="" label={PROPERTY.location} />
        <div className="p-5">
          <h1 className="font-display text-[26px] font-semibold text-ink-900">{PROPERTY.name}</h1>
          <p className="mt-1 text-[14px] text-ink-500">You've arrived. Here's the shape of today:</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {[
              ['10', 'areas'],
              ['32', 'checkpoints'],
              ['1', 'open finding to recheck'],
              ['1', 'owner request'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-cream-100 px-3.5 py-2.5">
                <span className="font-display text-[20px] font-semibold text-ink-900">{v}</span>
                <span className="ml-1.5 text-[13px] text-ink-500">{l}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-navy-900/5 px-3.5 py-2.5">
            <Gauge size={17} className="shrink-0 text-navy-700" />
            <span className="text-[13px] font-medium text-ink-700">Meters first — they're by the entrance.</span>
          </div>
        </div>
      </Card>
      <BottomBar>
        <Button
          variant="gold"
          onClick={() =>
            dispatch({
              type: 'visit-start',
              at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            })
          }
        >
          Start inspection
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— Stage: meters ————————————————— */

function StageMeters() {
  const { state, dispatch } = useStore()
  const { back } = useRouter()
  const meters = state.visit.meters
  const current = METERS.find((m) => !meters[m.id])
  const [captured, setCaptured] = useState(false)
  const [correcting, setCorrecting] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    setCaptured(false)
    setCorrecting(false)
    setValue(current?.reading ?? '')
  }, [current?.id])

  if (!current) {
    return (
      <div className="px-5 pb-40 pt-3">
        <TopBar onBack={back} title="Meters" subtitle="2 of 2 recorded" />
        <Card className="bg-ok-100/60">
          <div className="flex items-center gap-3">
            <Check size={22} strokeWidth={3} className="text-ok-500" />
            <p className="text-[15px] font-medium text-ink-900">
              Both readings recorded — consumption looks normal for the season.
            </p>
          </div>
        </Card>
        <BottomBar>
          <Button variant="gold" onClick={() => dispatch({ type: 'visit-stage', stage: 'identify' })}>
            Continue inside
          </Button>
        </BottomBar>
      </div>
    )
  }

  return (
    <div className="px-5 pb-44 pt-3">
      <TopBar
        onBack={back}
        title="Meter readings"
        subtitle={`${Object.values(meters).filter(Boolean).length + 1} of 2 · ${current.name}`}
      />

      {!captured ? (
        <>
          <div className="relative overflow-hidden rounded-3xl">
            <MockPhoto seed={`${current.id}-meter`} ratio="4/5" rounded="rounded-3xl" />
            <div className="absolute inset-x-0 top-0 flex justify-center pt-4">
              <span className="flex items-center gap-2 rounded-full bg-navy-950/55 px-4 py-1.5 text-[14px] font-medium text-cream-50">
                {current.id === 'water' ? <Gauge size={15} /> : <Zap size={15} />} {current.name} meter
              </span>
            </div>
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 rounded-xl border-2 border-gold-400/80 bg-navy-950/30 px-4 py-3 text-center">
              <span className="font-mono text-[22px] font-semibold tracking-wider text-cream-50">{current.reading}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/50 to-transparent pb-5 pt-10">
              <ShutterButton onClick={() => setCaptured(true)} />
            </div>
          </div>
          <p className="mt-3 text-center text-[13px] text-ink-500">Frame the dial — the reading is picked up for you.</p>
        </>
      ) : (
        <>
          <Card pad={false}>
            <div className="px-5 py-4">
              <div className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-400">Detected reading</div>
              {correcting ? (
                <input
                  autoFocus
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-1.5 h-12 w-full rounded-xl border border-cream-300 bg-cream-50 px-3.5 font-mono text-[20px] text-ink-900 outline-none focus:border-gold-500"
                />
              ) : (
                <div className="mt-1 font-mono text-[28px] font-semibold text-ink-900">{value}</div>
              )}
            </div>
            <div className="grid grid-cols-2 border-t border-cream-200 px-5 py-1">
              <div className="border-r border-cream-200 py-3 pr-4">
                <div className="text-[12px] text-ink-400">Previous</div>
                <div className="mt-0.5 font-mono text-[14px] font-medium text-ink-900">{current.previous}</div>
              </div>
              <div className="py-3 pl-4">
                <div className="text-[12px] text-ink-400">Change</div>
                <div className="mt-0.5 text-[14px] font-medium text-ink-900">{current.delta}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-cream-200 bg-ok-100/50 px-5 py-3">
              <Check size={16} strokeWidth={3} className="text-ok-500" />
              <span className="text-[13px] font-medium text-ok-500">{current.note}</span>
            </div>
          </Card>
          <button
            onClick={() => setCorrecting((c) => !c)}
            className="mt-3 rounded-full px-3 py-2 text-[14px] font-semibold text-gold-700 active:bg-black/5"
          >
            {correcting ? 'Done correcting' : 'Correct reading'}
          </button>
          <BottomBar>
            <Button variant="gold" onClick={() => dispatch({ type: 'meter-confirm', id: current.id })}>
              Confirm reading
            </Button>
          </BottomBar>
        </>
      )}
    </div>
  )
}

/* ————————————————— Stage: room identification ————————————————— */

function StageIdentify() {
  const { state, dispatch } = useStore()
  const { back } = useRouter()
  const [manual, setManual] = useState(false)

  if (state.visit.kitchenIdentified) {
    return (
      <div className="px-5 pb-40 pt-3">
        <TopBar onBack={back} />
        <div className="flex flex-col items-center py-8 text-center">
          <div className="anim-pop flex h-20 w-20 items-center justify-center rounded-full bg-ok-100">
            <Check size={40} strokeWidth={3} className="text-ok-500" />
          </div>
          <h2 className="font-display mt-5 text-[26px] font-semibold text-ink-900">Kitchen recognised</h2>
          <p className="mt-2 max-w-[280px] text-[15px] text-ink-500">
            Everything that mattered here last time is already waiting for you.
          </p>
        </div>
        <BottomBar>
          <Button variant="gold" onClick={() => dispatch({ type: 'visit-stage', stage: 'kitchen' })}>
            Open Kitchen
          </Button>
        </BottomBar>
      </div>
    )
  }

  return (
    <div className="px-5 pb-10 pt-3">
      <TopBar onBack={back} title="First room" subtitle="Walk to the Kitchen" />
      <Lead>Tap the doorway tag as you enter.</Lead>
      <div className="mt-4">
        <TagScanSim
          subject="Kitchen doorway"
          onDone={() => dispatch({ type: 'kitchen-identified' })}
          onSkip={() => setManual(true)}
          skipLabel="Choose room manually"
        />
      </div>
      {manual && (
        <Card pad={false} className="mt-4 px-5 py-1">
          {['Kitchen', 'Living Room', 'Main Bedroom'].map((r, i) => (
            <div key={r} className={i > 0 ? 'border-t border-cream-200' : ''}>
              <button
                onClick={() => r === 'Kitchen' && dispatch({ type: 'kitchen-identified' })}
                className="flex min-h-13 w-full items-center justify-between py-2.5 text-left"
              >
                <span className="text-[15px] font-medium text-ink-900">{r}</span>
                <ChevronRight size={18} className="text-ink-400" />
              </button>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}

/* ————————————————— Stage: Kitchen ————————————————— */

type ReobsPhase = null | 'compare' | 'judge' | 'voice' | 'saved'

function StageKitchen() {
  const { state, dispatch } = useStore()
  const { back } = useRouter()
  const v = state.visit
  const [reobsPhase, setReobsPhase] = useState<ReobsPhase>(null)
  const [overlay, setOverlay] = useState(true)

  const results = v.kitchenCheckpoints
  const doneCount = Object.keys(results).length
  const allDone = doneCount === KITCHEN_VISIT_CHECKPOINTS.length
  const nextOpen = KITCHEN_VISIT_CHECKPOINTS.find((c) => !results[c.id])
  const canLeave = allDone && v.reobs.done

  /* ——— re-observation subflow ——— */
  if (reobsPhase) {
    return (
      <div className="px-5 pb-44 pt-3">
        <TopBar
          onBack={() => setReobsPhase(null)}
          title={MOISTURE_FINDING.title}
          subtitle="Re-observation · then / now"
        />

        {reobsPhase === 'compare' && (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <MockPhoto seed="k-sink-then" ratio="3/4" label="12 June" />
                <div className="mt-1.5 text-center text-[12px] font-medium text-ink-500">Then</div>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl">
                  <MockPhoto seed={v.reobs.photo ? 'k-sink-now' : 'k-sink-live'} ratio="3/4" rounded="rounded-2xl" />
                  {overlay && !v.reobs.photo && (
                    <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-luminosity">
                      <MockPhoto seed="k-sink-then" ratio="3/4" rounded="rounded-2xl" />
                    </div>
                  )}
                  {!v.reobs.photo && (
                    <div className="absolute inset-x-0 top-0 flex justify-center pt-3">
                      <span className="rounded-full bg-navy-950/55 px-3 py-1 text-[12px] font-medium text-cream-50">
                        Match the June angle
                      </span>
                    </div>
                  )}
                  {v.reobs.photo && (
                    <div className="anim-pop absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-ok-500 text-white">
                      <Check size={17} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="mt-1.5 text-center text-[12px] font-medium text-ink-500">Now</div>
              </div>
            </div>

            {!v.reobs.photo ? (
              <>
                <button
                  onClick={() => setOverlay((o) => !o)}
                  className="mx-auto mt-3 block rounded-full bg-cream-100 px-4 py-2 text-[13px] font-semibold text-ink-700 active:bg-cream-200"
                >
                  {overlay ? 'Hide alignment overlay' : 'Show alignment overlay'}
                </button>
                <div className="mt-4 rounded-3xl bg-navy-950 py-3.5">
                  <ShutterButton onClick={() => dispatch({ type: 'reobs-photo' })} />
                </div>
              </>
            ) : (
              <BottomBar>
                <Button variant="gold" onClick={() => setReobsPhase('judge')}>
                  Compare and judge
                </Button>
              </BottomBar>
            )}
          </>
        )}

        {reobsPhase === 'judge' && (
          <>
            <Lead>Against June — how does it look?</Lead>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {(['Unchanged', 'Improved', 'Worsened', 'Resolved'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (s === 'Improved') {
                      dispatch({ type: 'reobs-status', status: 'Improved' })
                      setReobsPhase('voice')
                    }
                  }}
                  className={`h-14 rounded-2xl border text-[16px] font-semibold transition-colors ${
                    s === 'Improved'
                      ? 'border-ok-500 bg-white text-ok-500 active:bg-ok-100'
                      : 'border-cream-300 bg-white text-ink-700 active:bg-cream-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-[13px] text-ink-500">
              For this demonstration, choose <span className="font-semibold">Improved</span>.
            </p>
          </>
        )}

        {reobsPhase === 'voice' && (
          <>
            <Lead>Improved — noted. Add a word for the record?</Lead>
            <div className="mt-4 flex flex-col gap-3">
              {!v.reobs.voice && (
                <VoiceSim prompt="Speak a short note" result={REOBS_VOICE} onResult={() => dispatch({ type: 'reobs-voice' })} />
              )}
              {v.reobs.voice && (
                <Card pad={false} className="px-5 py-4">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-400">From voice</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-900">“{REOBS_VOICE}”</p>
                </Card>
              )}
              <div className="rounded-2xl bg-navy-900/5 px-4 py-3">
                <p className="text-[13px] leading-snug text-ink-700">
                  The finding stays <span className="font-semibold">open</span> — today's evidence joins its timeline.
                  Nothing is overwritten.
                </p>
              </div>
            </div>
            <BottomBar>
              <Button
                variant="gold"
                onClick={() => {
                  dispatch({ type: 'reobs-done' })
                  setReobsPhase('saved')
                }}
              >
                Save re-observation
              </Button>
              {!v.reobs.voice && (
                <Button
                  variant="ghost"
                  small
                  onClick={() => {
                    dispatch({ type: 'reobs-done' })
                    setReobsPhase('saved')
                  }}
                >
                  Save without a note
                </Button>
              )}
            </BottomBar>
          </>
        )}

        {reobsPhase === 'saved' && (
          <>
            <div className="flex flex-col items-center py-8 text-center">
              <div className="anim-pop flex h-16 w-16 items-center justify-center rounded-full bg-ok-100">
                <Check size={32} strokeWidth={3} className="text-ok-500" />
              </div>
              <h2 className="font-display mt-4 text-[22px] font-semibold text-ink-900">Added to the finding's timeline</h2>
              <p className="mt-2 max-w-[280px] text-[14px] text-ink-500">
                Improved · seal replacement still recommended · finding remains open.
              </p>
            </div>
            <BottomBar>
              <Button variant="gold" onClick={() => setReobsPhase(null)}>
                Back to the Kitchen
              </Button>
            </BottomBar>
          </>
        )}
      </div>
    )
  }

  /* ——— kitchen room card ——— */
  return (
    <div className="px-5 pb-44 pt-3">
      <TopBar onBack={back} title="Kitchen" subtitle={`${doneCount} of ${KITCHEN_VISIT_CHECKPOINTS.length} checkpoints`} />

      {/* Open finding first — what mattered last time */}
      <Card pad={false} className={`overflow-hidden ${v.reobs.done ? '' : 'ring-2 ring-gold-500/60'}`}>
        <div className="flex gap-4 p-4">
          <MockPhoto seed="k-sink-then" ratio="1/1" className="w-20 shrink-0" rounded="rounded-xl" label="June" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <CircleAlert size={15} className="shrink-0 text-warn-500" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.07em] text-warn-500">Open finding</span>
            </div>
            <div className="mt-1 text-[15px] font-semibold text-ink-900">{MOISTURE_FINDING.title}</div>
            <div className="mt-0.5 text-[13px] text-ink-500">
              {MOISTURE_FINDING.severity} · first seen {MOISTURE_FINDING.firstSeen}
            </div>
          </div>
        </div>
        <div className="border-t border-cream-200 bg-cream-50/60 px-4 py-3">
          {v.reobs.done ? (
            <div className="flex items-center gap-2 text-[14px] font-semibold text-ok-500">
              <Check size={16} strokeWidth={3} /> Rechecked — improved, still open
            </div>
          ) : (
            <button
              onClick={() => setReobsPhase('compare')}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-navy-900 text-[14px] font-semibold text-cream-50 active:bg-navy-800"
            >
              <Camera size={16} /> Recheck finding
            </button>
          )}
        </div>
      </Card>

      {/* Owner request */}
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-navy-900/5 px-4 py-3">
        <MessageSquare size={17} className="shrink-0 text-navy-700" />
        <span className="flex-1 text-[13px] leading-snug text-ink-700">
          Owner asks: shutters partially closed. You'll confirm this in the Living Room.
        </span>
      </div>

      {/* Checkpoints */}
      <SectionLabel>Checkpoints</SectionLabel>
      <Card pad={false} className="px-5 py-1.5">
        {KITCHEN_VISIT_CHECKPOINTS.map((c) => (
          <CheckpointRow
            key={c.id}
            label={c.label}
            hint={c.hint}
            result={results[c.id]}
            focused={nextOpen?.id === c.id}
            onOk={() => dispatch({ type: 'kitchen-checkpoint', id: c.id, result: 'ok' })}
            onIssue={() => dispatch({ type: 'kitchen-checkpoint', id: c.id, result: 'issue' })}
            onUndo={() => dispatch({ type: 'kitchen-checkpoint', id: c.id, result: null })}
          />
        ))}
      </Card>

      {doneCount >= 1 && !allDone && (
        <button
          onClick={() => dispatch({ type: 'kitchen-batch', ids: KITCHEN_VISIT_CHECKPOINTS.map((c) => c.id) })}
          className="mt-3 w-full rounded-2xl border border-cream-300 bg-white py-3 text-[14px] font-semibold text-ink-700 active:bg-cream-100"
        >
          Mark remaining healthy
        </button>
      )}

      <BottomBar>
        <Button variant="gold" disabled={!canLeave} onClick={() => dispatch({ type: 'visit-stage', stage: 'living' })}>
          {canLeave ? 'Next: Living Room' : v.reobs.done ? 'Finish the checkpoints' : 'Recheck the finding first'}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— Visit orchestrator ————————————————— */

export function VisitFlow() {
  const { state } = useStore()
  const { navigate } = useRouter()
  const stage = state.visit.stage

  useEffect(() => {
    if (stage === 'review' || stage === 'done') navigate('/inspector/review')
  }, [stage, navigate])

  return (
    <Shell>
      {stage === 'arrival' && <StageArrival />}
      {stage === 'meters' && <StageMeters />}
      {stage === 'identify' && <StageIdentify />}
      {stage === 'kitchen' && <StageKitchen />}
      {(stage === 'living' || stage === 'areas' || stage === 'exit') && <StageLiving />}
      {(stage === 'review' || stage === 'done') && <div className="min-h-dvh" />}
    </Shell>
  )
}

export { VISIT_META }
