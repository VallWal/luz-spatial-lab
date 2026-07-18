import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Droplets,
  Flame,
  Flower2,
  Gauge,
  MapPin,
  ShieldCheck,
  Sprout,
  Waves,
  Wifi,
  Zap,
} from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import { LATER_ITEMS, PASSPORT_SUMMARY, POOL_CHECKPOINTS, UTILITIES } from '../data'
import { BottomBar, Button, Card, Lead, MockPhoto, SectionLabel, Stat, Title, TopBar } from '../ui'
import { ShutterButton, TagScanSim, VoiceSim } from '../sims'

/* ————————————————— 14 · The Utility Hunt ————————————————— */

const UTILITY_ICONS: Record<string, ReactNode> = {
  'water-main': <Droplets size={20} />,
  'electrical-panel': <Zap size={20} />,
  gas: <Flame size={20} />,
  'water-heater': <Gauge size={20} />,
  router: <Wifi size={20} />,
  irrigation: <Sprout size={20} />,
  'pool-equipment': <Waves size={20} />,
}

type DeepPhase = 'tag' | 'closeup' | 'surroundings' | 'description'

export function StepUtilities({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const status = state.walk.utilities
  const [deepPhase, setDeepPhase] = useState<DeepPhase | null>(null)
  const [closeupShot, setCloseupShot] = useState(false)
  const [surroundShot, setSurroundShot] = useState(false)
  const [description, setDescription] = useState(UTILITIES[0].suggestedLocation)
  const [voiceUsed, setVoiceUsed] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)

  const resolved = UTILITIES.filter((u) => status[u.id] === 'registered' || status[u.id] === 'not-present').length
  const allResolved = resolved === UTILITIES.length

  /* ——— deep flow: main water shut-off ——— */
  if (deepPhase) {
    const idx = { tag: 1, closeup: 2, surroundings: 3, description: 4 }[deepPhase]
    return (
      <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
        <TopBar
          tone="dark"
          onBack={() => setDeepPhase(null)}
          title="Main water shut-off"
          subtitle={`Step ${idx} of 4 · Emergency Card`}
        />

        {deepPhase === 'tag' && (
          <div className="mt-2">
            <TagScanSim
              subject="Main water shut-off"
              onDone={() => setDeepPhase('closeup')}
              onSkip={() => setDeepPhase('closeup')}
              skipLabel="Tag later"
            />
          </div>
        )}

        {deepPhase === 'closeup' && (
          <>
            <Lead tone="dark">A clear close-up of the valve itself.</Lead>
            <div className="relative mt-4 overflow-hidden rounded-3xl">
              <MockPhoto seed="utility-valve" ratio="4/3" rounded="rounded-3xl" label={closeupShot ? 'Close-up captured' : ''} />
              {!closeupShot && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/50 to-transparent pb-5 pt-10">
                  <ShutterButton onClick={() => setCloseupShot(true)} />
                </div>
              )}
            </div>
            <BottomBar tone="dark">
              <Button variant="gold" disabled={!closeupShot} onClick={() => setDeepPhase('surroundings')}>
                Continue
              </Button>
            </BottomBar>
          </>
        )}

        {deepPhase === 'surroundings' && (
          <>
            <Lead tone="dark">Now step back — a photo of the surroundings, so anyone can find it under pressure.</Lead>
            <div className="relative mt-4 overflow-hidden rounded-3xl">
              <MockPhoto seed="utility-room-wide" ratio="4/3" rounded="rounded-3xl" label={surroundShot ? 'Surroundings captured' : ''} />
              {!surroundShot && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/50 to-transparent pb-5 pt-10">
                  <ShutterButton onClick={() => setSurroundShot(true)} />
                </div>
              )}
            </div>
            <BottomBar tone="dark">
              <Button variant="gold" disabled={!surroundShot} onClick={() => setDeepPhase('description')}>
                Continue
              </Button>
            </BottomBar>
          </>
        )}

        {deepPhase === 'description' && (
          <>
            <Lead tone="dark">In your own words — where is it? Plain language outlives every technology.</Lead>
            <div className="mt-4 flex flex-col gap-3">
              {!voiceUsed && (
                <VoiceSim
                  prompt="Say where it is"
                  result="Utility room, left wall, below the shelving unit."
                  onResult={(text) => {
                    setDescription(text)
                    setVoiceUsed(true)
                  }}
                />
              )}
              <div className="rounded-2xl bg-white/[0.07] p-4">
                <div className="text-[12px] font-semibold uppercase tracking-[0.07em] text-cream-50/50">
                  Location description {voiceUsed && '· from voice'}
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-navy-900/60 p-3 text-[16px] leading-relaxed text-cream-50 outline-none focus:border-gold-500"
                />
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl bg-gold-500/15 px-4 py-3">
                <ShieldCheck size={18} className="shrink-0 text-gold-400" />
                <span className="text-[13px] leading-snug text-cream-50/90">
                  This information becomes the property's Emergency Card.
                </span>
              </div>
            </div>
            <BottomBar tone="dark">
              <Button
                variant="gold"
                onClick={() => {
                  dispatch({ type: 'utility', id: 'water-main', status: 'registered' })
                  setDeepPhase(null)
                }}
              >
                Save utility
              </Button>
            </BottomBar>
          </>
        )}
      </div>
    )
  }

  /* ——— utility list ——— */
  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar tone="dark" onBack={onBack} />
      <Title tone="dark">The Utility Hunt</Title>
      <Lead tone="dark">
        Ten minutes now can save hours in an emergency. Everything found here becomes the property's Emergency Card.
      </Lead>

      <div className="mt-6 flex flex-col gap-2.5">
        {UTILITIES.map((u) => {
          const s = status[u.id] ?? 'pending'
          const open = openId === u.id
          return (
            <div key={u.id} className="overflow-hidden rounded-2xl bg-white/[0.06]">
              <button
                onClick={() => {
                  if (s !== 'pending') return
                  if (u.deepFlow) setDeepPhase('tag')
                  else setOpenId(open ? null : u.id)
                }}
                className="flex min-h-16 w-full items-center gap-4 px-4 py-3 text-left active:bg-white/[0.04]"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    s === 'registered'
                      ? 'bg-ok-500/20 text-ok-100'
                      : s === 'not-present'
                        ? 'bg-white/10 text-cream-50/50'
                        : 'bg-gold-500/15 text-gold-400'
                  }`}
                >
                  {s === 'registered' ? <Check size={19} strokeWidth={3} className="text-ok-100" /> : UTILITY_ICONS[u.id]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[16px] font-medium ${s === 'not-present' ? 'text-cream-50/50' : 'text-cream-50'}`}>
                    {u.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[13px] text-cream-50/50">
                    {s === 'registered'
                      ? u.suggestedLocation || 'Registered'
                      : s === 'not-present'
                        ? 'Not present at this property'
                        : u.deepFlow
                          ? 'Tap to register — the guided example'
                          : 'Tap to register'}
                  </span>
                </span>
                {s === 'pending' &&
                  (open ? (
                    <ChevronDown size={18} className="text-cream-50/40" />
                  ) : (
                    <ChevronRight size={18} className="text-cream-50/40" />
                  ))}
              </button>
              {open && s === 'pending' && (
                <div className="flex gap-2 border-t border-white/10 px-4 py-3">
                  <button
                    onClick={() => {
                      dispatch({ type: 'utility', id: u.id, status: 'registered' })
                      setOpenId(null)
                    }}
                    className="h-11 flex-1 rounded-xl bg-gold-500 text-[14px] font-semibold text-navy-950 active:bg-gold-600"
                  >
                    Tag + photo + location
                  </button>
                  {u.canBeAbsent && (
                    <button
                      onClick={() => {
                        dispatch({ type: 'utility', id: u.id, status: 'not-present' })
                        setOpenId(null)
                      }}
                      className="h-11 flex-1 rounded-xl border border-white/20 text-[14px] font-medium text-cream-50 active:bg-white/10"
                    >
                      Not present
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <BottomBar tone="dark">
        <Button variant="gold" disabled={!allResolved} onClick={() => dispatch({ type: 'go', step: 'exterior' })}>
          {allResolved ? 'Continue outside' : `${resolved} of ${UTILITIES.length} found — keep hunting`}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 15 · Exterior zones ————————————————— */

interface ZoneDef {
  id: string
  name: string
  seed: string
  icon: ReactNode
  actions: { id: string; label: string }[]
  summary: string
}

const ZONES: ZoneDef[] = [
  {
    id: 'pool-area',
    name: 'Pool Area',
    seed: 'pool',
    icon: <Waves size={20} />,
    actions: [
      { id: 'tag', label: 'Register zone tag' },
      { id: 'photos', label: 'Capture baseline photos (4)' },
      { id: 'checkpoints', label: `Accept pool checkpoints (${POOL_CHECKPOINTS.length})` },
    ],
    summary: 'Pool Area added — 6 checkpoints will keep the water honest.',
  },
  {
    id: 'garden',
    name: 'Garden',
    seed: 'garden',
    icon: <Flower2 size={20} />,
    actions: [
      { id: 'tag', label: 'Register zone tag' },
      { id: 'photos', label: 'Capture baseline photos (5)' },
      { id: 'checkpoints', label: 'Accept irrigation & boundary checkpoints (3)' },
    ],
    summary: 'Garden added — irrigation and boundaries under watch.',
  },
  {
    id: 'main-gate',
    name: 'Main Gate',
    seed: 'gate',
    icon: <MapPin size={20} />,
    actions: [
      { id: 'tag', label: 'Register zone tag' },
      { id: 'gate-motor', label: 'Register gate motor' },
    ],
    summary: 'Main Gate added — the gate motor now has its own history.',
  },
]

export function StepExterior({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const done = state.walk.exteriorDone
  const [actions, setActions] = useState<Record<string, string[]>>({})

  const complete = (zoneId: string, actionId: string, total: number) => {
    const list = actions[zoneId] ?? []
    if (list.includes(actionId)) return
    const nextList = [...list, actionId]
    setActions({ ...actions, [zoneId]: nextList })
    if (nextList.length >= total) dispatch({ type: 'exterior-done', id: zoneId })
  }

  const canFinish = done.includes('pool-area') && done.length >= 2

  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar onBack={onBack} />
      <Title>Outside, without the scanner</Title>
      <Lead>
        Outdoor areas don't need indoor scanning — a zone tag, good photos and the right checkpoints do everything needed.
      </Lead>

      <div className="mt-6 flex flex-col gap-3.5">
        {ZONES.map((z) => {
          const isDone = done.includes(z.id)
          const zActions = actions[z.id] ?? []
          return (
            <Card key={z.id} pad={false} className="overflow-hidden">
              <MockPhoto seed={z.seed} ratio="16/7" rounded="" />
              <div className="flex items-center gap-3 px-4 pt-3.5">
                <span className="text-navy-700">{z.icon}</span>
                <span className="flex-1 text-[17px] font-semibold text-ink-900">{z.name}</span>
                {isDone && (
                  <span className="anim-pop flex h-8 w-8 items-center justify-center rounded-full bg-ok-100 text-ok-500">
                    <Check size={17} strokeWidth={3} />
                  </span>
                )}
              </div>
              <div className="px-4 pb-4 pt-2">
                {isDone ? (
                  <p className="text-[13px] text-ok-500">{z.summary}</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {z.actions.map((a) => {
                      const doneAction = zActions.includes(a.id)
                      return doneAction ? (
                        <div key={a.id} className="flex h-11 items-center gap-2 rounded-xl bg-ok-100 px-4 text-[14px] font-semibold text-ok-500">
                          <Check size={16} strokeWidth={3} /> {a.label}
                        </div>
                      ) : (
                        <button
                          key={a.id}
                          onClick={() => complete(z.id, a.id, z.actions.length)}
                          className="flex h-11 items-center justify-center rounded-xl bg-navy-900 px-4 text-[14px] font-semibold text-cream-50 active:bg-navy-800"
                        >
                          {a.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      <BottomBar>
        <Button variant="gold" disabled={!canFinish} onClick={() => dispatch({ type: 'go', step: 'final' })}>
          {canFinish ? 'Review the passport' : 'Capture the pool and one more zone'}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 16 · Final completion review ————————————————— */

export function StepFinal({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const [openItem, setOpenItem] = useState<string | null>(null)
  const deferred = state.walk.deferred

  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar onBack={onBack} />
      <div className="flex items-center justify-between">
        <Title>Casa del Mar</Title>
        <span className="rounded-full bg-ok-100 px-4 py-1.5 text-[14px] font-bold text-ok-500">Operational</span>
      </div>
      <Lead>
        This passport is ready for recurring inspections — and it will improve with every future visit.
      </Lead>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <Stat value={PASSPORT_SUMMARY.areas} label="areas" />
        <Stat value={PASSPORT_SUMMARY.identities} label="room & zone identities" />
        <Stat value={PASSPORT_SUMMARY.assets} label="assets" />
        <Stat value={PASSPORT_SUMMARY.utilities} label="utilities on the Emergency Card" />
        <Stat value={PASSPORT_SUMMARY.checkpoints} label="checkpoints" />
        <Stat value={PASSPORT_SUMMARY.photos} label="baseline photos" />
      </div>

      <SectionLabel>To complete on a future visit</SectionLabel>
      <Card pad={false}>
        <div className="px-5 py-1">
          {LATER_ITEMS.map((item, i) => {
            const isOpen = openItem === item.id
            const isDeferred = deferred.includes(item.id)
            return (
              <div key={item.id} className={i > 0 ? 'border-t border-cream-200' : ''}>
                <button
                  onClick={() => setOpenItem(isOpen ? null : item.id)}
                  className="flex min-h-14 w-full items-center gap-3 py-2.5 text-left"
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${isDeferred ? 'bg-ink-400' : 'bg-gold-500'}`}
                  />
                  <span className={`flex-1 text-[15px] font-medium ${isDeferred ? 'text-ink-400' : 'text-ink-900'}`}>
                    {item.label}
                  </span>
                  {isDeferred ? (
                    <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[12px] font-semibold text-ink-500">
                      Next visit
                    </span>
                  ) : (
                    <ChevronDown size={17} className={`text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {isOpen && !isDeferred && (
                  <div className="pb-4 pl-5.5">
                    <p className="text-[14px] leading-relaxed text-ink-500">{item.detail}</p>
                    <button
                      onClick={() => {
                        dispatch({ type: 'defer', id: item.id })
                        setOpenItem(null)
                      }}
                      className="mt-2.5 rounded-full bg-cream-100 px-4 py-2 text-[13px] font-semibold text-ink-700 active:bg-cream-200"
                    >
                      Defer to next visit
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      <p className="mt-4 text-[13px] leading-relaxed text-ink-500">
        Nothing here blocks the passport — open items simply wait patiently on the next visit's briefing.
      </p>

      <BottomBar>
        <Button variant="gold" onClick={() => dispatch({ type: 'create-passport' })}>
          Create Property Passport
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 17 · Completion moment ————————————————— */

export function StepMoment() {
  const { navigate } = useRouter()
  const reduce = useReducedMotion()
  const [line2, setLine2] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setLine2(true), reduce ? 100 : 1400)
    return () => window.clearTimeout(t)
  }, [reduce])

  return (
    <div className="relative flex min-h-dvh flex-col px-5">
      <div className="absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_0%,rgba(68,103,138,0.30),transparent)]" />
      <div className="relative flex flex-1 flex-col items-center justify-center pb-32 text-center">
        <motion.div
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/15"
        >
          <ShieldCheck size={46} className="text-gold-400" />
        </motion.div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.5, duration: 0.6 }}
          className="font-display mt-8 max-w-[300px] text-[30px] font-semibold leading-[1.2] text-cream-50"
        >
          Casa del Mar is now protected by its Property Passport.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: line2 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 max-w-[280px] text-[16px] leading-relaxed text-cream-50/60"
        >
          Future inspections can build on today instead of starting from zero.
        </motion.p>
      </div>
      <BottomBar tone="dark">
        <Button variant="gold" onClick={() => navigate('/passport')}>
          View Property Passport
        </Button>
      </BottomBar>
    </div>
  )
}
