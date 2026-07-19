import { useEffect, useState } from 'react'
import { Camera, Check, CircleAlert, MessageSquare, Plus, StickyNote } from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import {
  FINDING_VOICE,
  FREE_OBSERVATION,
  LIVING_VISIT_CHECKPOINTS,
  QUICK_AREAS,
  SKIP_REASONS,
} from '../scenario'
import { BottomBar, Button, Card, Lead, MockPhoto, SectionLabel, Title, TopBar } from '../ui'
import { ShutterButton, VoiceSim } from '../sims'
import { CheckpointRow } from './Visit'

/* ————————————————— Living Room: shutters + new finding ————————————————— */

type FindingPhase = null | 'photo' | 'voice' | 'saved'

function LivingRoom() {
  const { state, dispatch } = useStore()
  const { back } = useRouter()
  const v = state.visit
  const [phase, setPhase] = useState<FindingPhase>(null)
  const [photoTaken, setPhotoTaken] = useState(false)
  const results = v.livingCheckpoints
  const doneCount = Object.keys(results).length
  const allDone = doneCount === LIVING_VISIT_CHECKPOINTS.length && v.ownerRequestConfirmed

  /* new-finding subflow at the terrace-door checkpoint */
  if (phase) {
    return (
      <div className="px-5 pb-44 pt-3">
        <TopBar onBack={() => setPhase(null)} title="New finding" subtitle="Living Room · terrace door" />

        {phase === 'photo' && (
          <>
            <Lead>Photograph the loose handle.</Lead>
            <div className="relative mt-3 overflow-hidden rounded-3xl">
              <MockPhoto seed="terrace-handle" ratio="4/3" rounded="rounded-3xl" label={photoTaken ? 'Captured' : ''} />
              {!photoTaken && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/50 to-transparent pb-5 pt-10">
                  <ShutterButton onClick={() => setPhotoTaken(true)} />
                </div>
              )}
              {photoTaken && (
                <div className="anim-pop absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ok-500 text-white">
                  <Check size={20} strokeWidth={3} />
                </div>
              )}
            </div>
            <BottomBar>
              <Button variant="gold" disabled={!photoTaken} onClick={() => setPhase('voice')}>
                Continue
              </Button>
            </BottomBar>
          </>
        )}

        {phase === 'voice' && (
          <>
            <Lead>Say what you see. It becomes a draft for the visit review.</Lead>
            <div className="mt-4 flex flex-col gap-3">
              <VoiceSim prompt="Hold to talk" result={FINDING_VOICE} onResult={() => {}} />
              <Card pad={false} className="px-5 py-4">
                <div className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-400">Draft</div>
                <p className="mt-1.5 text-[16px] font-medium text-ink-900">{v.finding.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-warn-100 px-2.5 py-1 text-[12px] font-semibold text-warn-500">
                    {v.finding.severity}
                  </span>
                  <span className="text-[12px] text-ink-500">Living Room · terrace-door checkpoint</span>
                </div>
              </Card>
            </div>
            <BottomBar>
              <Button
                variant="gold"
                onClick={() => {
                  dispatch({ type: 'finding-saved' })
                  dispatch({ type: 'living-checkpoint', id: 'l-terrace', result: 'issue' })
                  setPhase('saved')
                }}
              >
                Save finding
              </Button>
            </BottomBar>
          </>
        )}

        {phase === 'saved' && (
          <>
            <div className="flex flex-col items-center py-8 text-center">
              <div className="anim-pop flex h-16 w-16 items-center justify-center rounded-full bg-warn-100">
                <StickyNote size={30} className="text-warn-500" />
              </div>
              <h2 className="font-display mt-4 text-[22px] font-semibold text-ink-900">Draft saved for visit review</h2>
              <p className="mt-2 max-w-[280px] text-[14px] text-ink-500">
                You'll confirm the wording and severity before anything becomes part of the record.
              </p>
            </div>
            <BottomBar>
              <Button variant="gold" onClick={() => setPhase(null)}>
                Back to the Living Room
              </Button>
            </BottomBar>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="px-5 pb-44 pt-3">
      <TopBar onBack={back} title="Living Room" subtitle={`${doneCount} of ${LIVING_VISIT_CHECKPOINTS.length} checkpoints`} />

      {/* Owner request */}
      <Card pad={false} className={v.ownerRequestConfirmed ? '' : 'ring-2 ring-gold-500/60'}>
        <div className="flex items-center gap-3.5 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-700">
            <MessageSquare size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-400">Owner request</div>
            <div className="mt-0.5 text-[15px] font-medium text-ink-900">Shutters remain partially closed</div>
          </div>
          {v.ownerRequestConfirmed ? (
            <span className="anim-pop flex h-9 w-9 items-center justify-center rounded-full bg-ok-100 text-ok-500">
              <Check size={18} strokeWidth={3} />
            </span>
          ) : (
            <button
              onClick={() => {
                dispatch({ type: 'owner-request-confirmed' })
                dispatch({ type: 'living-checkpoint', id: 'l-shutters', result: 'ok' })
              }}
              className="h-10 rounded-xl bg-navy-900 px-4 text-[14px] font-semibold text-cream-50 active:bg-navy-800"
            >
              Confirm
            </button>
          )}
        </div>
      </Card>

      <SectionLabel>Checkpoints</SectionLabel>
      <Card pad={false} className="px-5 py-1.5">
        {LIVING_VISIT_CHECKPOINTS.map((c) => (
          <CheckpointRow
            key={c.id}
            label={c.label}
            hint={c.hint || undefined}
            result={results[c.id]}
            onOk={() => {
              dispatch({ type: 'living-checkpoint', id: c.id, result: 'ok' })
              if (c.id === 'l-shutters') dispatch({ type: 'owner-request-confirmed' })
            }}
            onIssue={c.id === 'l-terrace' ? () => setPhase('photo') : undefined}
            onUndo={() => dispatch({ type: 'living-checkpoint', id: c.id, result: null })}
          />
        ))}
      </Card>
      {!v.findingSaved && (
        <p className="mt-3 text-[13px] leading-snug text-ink-500">
          The terrace-door handle feels loose — use <span className="font-semibold">Issue</span> on that checkpoint to
          record it.
        </p>
      )}

      <BottomBar>
        <Button variant="gold" disabled={!allDone} onClick={() => dispatch({ type: 'visit-stage', stage: 'areas' })}>
          {allDone ? 'Continue the round' : 'Finish this room first'}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— Remaining areas + free observation ————————————————— */

function QuickAreaCard({ area }: { area: (typeof QUICK_AREAS)[number] }) {
  const { state, dispatch } = useStore()
  const done = state.visit.areasDone.includes(area.id)
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    if (!busy) return
    const t = window.setTimeout(() => {
      setBusy(false)
      dispatch({ type: 'area-done', id: area.id })
    }, 700)
    return () => window.clearTimeout(t)
  }, [busy, area.id, dispatch])

  return (
    <Card pad={false}>
      <div className="flex items-center gap-3.5 p-4">
        <MockPhoto seed={area.id} ratio="1/1" className="w-12 shrink-0" rounded="rounded-xl" />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold text-ink-900">{area.name}</div>
          <div className={`mt-0.5 text-[13px] leading-snug ${done ? 'text-ok-500' : 'text-ink-500'}`}>
            {done ? area.result : area.action}
          </div>
        </div>
        {done ? (
          <span className="anim-pop flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ok-100 text-ok-500">
            <Check size={18} strokeWidth={3} />
          </span>
        ) : (
          <button
            onClick={() => setBusy(true)}
            disabled={busy}
            className="h-10 shrink-0 rounded-xl bg-navy-900 px-4 text-[13px] font-semibold text-cream-50 active:bg-navy-800 disabled:opacity-60"
          >
            {busy ? '…' : 'Check'}
          </button>
        )}
      </div>
    </Card>
  )
}

function AreasRound() {
  const { state, dispatch } = useStore()
  const { back } = useRouter()
  const v = state.visit
  const [noting, setNoting] = useState(false)
  const [notePhoto, setNotePhoto] = useState(false)
  const done = v.areasDone.length
  const canContinue = done >= QUICK_AREAS.length

  if (noting) {
    return (
      <div className="px-5 pb-44 pt-3">
        <TopBar onBack={() => setNoting(false)} title="Free observation" subtitle="Not on any checklist — noted anyway" />
        <Lead>Your judgment outranks the checklist. Capture it.</Lead>
        <div className="relative mt-3 overflow-hidden rounded-3xl">
          <MockPhoto seed="garden-debris" ratio="16/9" rounded="rounded-3xl" label={notePhoto ? 'Captured' : ''} />
          {!notePhoto && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/50 to-transparent pb-4 pt-8">
              <ShutterButton onClick={() => setNotePhoto(true)} />
            </div>
          )}
        </div>
        <div className="mt-3">
          <VoiceSim prompt="Describe it" result={FREE_OBSERVATION.text} onResult={() => {}} />
        </div>
        <Card pad={false} className="mt-3 px-5 py-4">
          <p className="text-[15px] text-ink-900">{FREE_OBSERVATION.text}</p>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[12px] font-semibold text-ink-700">Note</span>
            <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[12px] text-ink-500">not a finding</span>
          </div>
        </Card>
        <BottomBar>
          <Button
            variant="gold"
            disabled={!notePhoto}
            onClick={() => {
              dispatch({ type: 'free-note' })
              setNoting(false)
            }}
          >
            Save note
          </Button>
        </BottomBar>
      </div>
    )
  }

  return (
    <div className="px-5 pb-44 pt-3">
      <TopBar onBack={back} title="The round" subtitle={`${done} of ${QUICK_AREAS.length} areas`} />
      <div className="flex flex-col gap-2.5">
        {QUICK_AREAS.map((a) => (
          <QuickAreaCard key={a.id} area={a} />
        ))}
      </div>

      {v.freeNoteSaved ? (
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-ok-100/60 px-4 py-3">
          <StickyNote size={17} className="shrink-0 text-ok-500" />
          <span className="text-[13px] font-medium text-ink-700">Note saved: {FREE_OBSERVATION.text}</span>
        </div>
      ) : (
        <button
          onClick={() => setNoting(true)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-cream-300 py-3.5 text-[14px] font-semibold text-ink-500 active:bg-cream-100"
        >
          <Plus size={17} /> Note something the checklist doesn't know about
        </button>
      )}

      <BottomBar>
        <Button variant="gold" disabled={!canContinue} onClick={() => dispatch({ type: 'visit-stage', stage: 'exit' })}>
          {canContinue ? 'Wrap up the visit' : 'Check the remaining areas'}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— Exit gate ————————————————— */

function ExitGate() {
  const { state, dispatch } = useStore()
  const { back } = useRouter()
  const v = state.visit
  const [reasonFor, setReasonFor] = useState<null | 'guestBedroom' | 'wallPhoto'>(null)

  const items = [
    { key: 'guestBedroom' as const, label: 'Guest Bedroom skipped', detail: 'Not visited on this round', state: v.exitItems.guestBedroom },
    { key: 'wallPhoto' as const, label: 'Exterior wall photo missing', detail: 'Seasonal reference shot', state: v.exitItems.wallPhoto },
  ]
  const allResolved = items.every((i) => i.state.state !== 'open')

  return (
    <div className="px-5 pb-44 pt-3">
      <TopBar onBack={back} title="Before you leave" subtitle="Nothing disappears silently" />
      <Lead>Two loose ends. Complete them, or say why not.</Lead>

      <div className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <Card key={item.key} pad={false}>
            <div className="flex items-center gap-3.5 p-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  item.state.state === 'open' ? 'bg-warn-100 text-warn-500' : 'bg-ok-100 text-ok-500'
                }`}
              >
                {item.state.state === 'open' ? <CircleAlert size={18} /> : <Check size={18} strokeWidth={3} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-medium text-ink-900">{item.label}</div>
                <div className="mt-0.5 text-[13px] text-ink-500">
                  {item.state.state === 'skipped'
                    ? `Skipped — ${item.state.reason}`
                    : item.state.state === 'done'
                      ? 'Completed'
                      : item.detail}
                </div>
              </div>
            </div>
            {item.state.state === 'open' && (
              <div className="border-t border-cream-200 bg-cream-50/60 px-4 py-3">
                {reasonFor === item.key ? (
                  <div className="flex flex-wrap gap-2">
                    {SKIP_REASONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          dispatch({ type: 'exit-item', item: item.key, value: { state: 'skipped', reason: r } })
                          setReasonFor(null)
                        }}
                        className="rounded-full border border-cream-300 bg-white px-3.5 py-2 text-[13px] font-medium text-ink-700 active:bg-cream-100"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => dispatch({ type: 'exit-item', item: item.key, value: { state: 'done' } })}
                      className="h-10 flex-1 rounded-xl bg-navy-900 text-[13px] font-semibold text-cream-50 active:bg-navy-800"
                    >
                      {item.key === 'wallPhoto' ? 'Take it now' : 'Complete now'}
                    </button>
                    <button
                      onClick={() => setReasonFor(item.key)}
                      className="h-10 flex-1 rounded-xl border border-cream-300 bg-white text-[13px] font-medium text-ink-700 active:bg-cream-100"
                    >
                      Skip with reason
                    </button>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      <BottomBar>
        <Button variant="gold" disabled={!allResolved} onClick={() => dispatch({ type: 'visit-stage', stage: 'review' })}>
          {allResolved ? 'Review visit' : 'Resolve the loose ends first'}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— Stage switch (living → areas → exit) ————————————————— */

export function StageLiving() {
  const { state } = useStore()
  const stage = state.visit.stage
  if (stage === 'living') return <LivingRoom />
  if (stage === 'areas') return <AreasRound />
  return <ExitGate />
}
