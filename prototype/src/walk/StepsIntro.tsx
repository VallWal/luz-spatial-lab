import { useState } from 'react'
import {
  Battery,
  Camera,
  Check,
  CircleCheck,
  CloudOff,
  DoorOpen,
  Images,
  ListChecks,
  MapPin,
  Mic,
  Tag,
  Wrench,
} from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import { AREAS, PROPERTY } from '../data'
import { BottomBar, Button, Card, Divider, Lead, ListRow, MockPhoto, SectionLabel, Title, TopBar } from '../ui'
import { TagScanSim } from '../sims'

/* ————————————————— 2 · Property introduction ————————————————— */

export function StepIntro() {
  const { dispatch } = useStore()
  const { navigate } = useRouter()
  const [showInfo, setShowInfo] = useState(false)

  const creations = [
    { icon: <DoorOpen size={20} />, label: 'Room identities', hint: 'So every room remembers itself' },
    { icon: <Images size={20} />, label: 'Baseline photos', hint: 'How the property looks today' },
    { icon: <Wrench size={20} />, label: 'Important equipment', hint: 'Boiler, pool pump, and friends' },
    { icon: <MapPin size={20} />, label: 'Utility locations', hint: 'Where to act in an emergency' },
    { icon: <ListChecks size={20} />, label: 'Inspection checkpoints', hint: 'What future visits should check' },
  ]

  return (
    <div className="flex flex-1 flex-col px-5 pb-40 pt-3">
      <TopBar onBack={() => navigate('/')} />
      <MockPhoto seed="villa-hero" ratio="16/10" rounded="rounded-3xl" label="Casa del Mar" />
      <div className="mt-5">
        <Title>{PROPERTY.name}</Title>
        <p className="mt-1 text-[15px] text-ink-500">
          {PROPERTY.location} · {PROPERTY.type}
        </p>
        <Lead>
          Today, this property gets its passport — a lasting memory of its rooms, equipment and condition that every
          future visit will build on.
        </Lead>
      </div>

      <Card className="mt-6" pad={false}>
        <div className="flex items-center justify-between px-5 pt-4">
          <span className="text-[14px] font-semibold text-ink-900">Added to today's visit</span>
          <span className="rounded-full bg-gold-500/15 px-3 py-1 text-[13px] font-semibold text-gold-700">
            about 60–90 min
          </span>
        </div>
        <div className="px-5 pb-2 pt-3">
          {creations.map((c) => (
            <ListRow key={c.label} left={<span className="text-gold-600">{c.icon}</span>} title={c.label} subtitle={c.hint} />
          ))}
        </div>
      </Card>

      <SectionLabel>Property notes</SectionLabel>
      <Card pad={false} className="px-5 py-1">
        {PROPERTY.notes.map((n, i) => (
          <div key={n}>
            {i > 0 && <Divider />}
            <p className="py-3 text-[14px] leading-relaxed text-ink-700">{n}</p>
          </div>
        ))}
      </Card>

      {showInfo && (
        <>
          <SectionLabel>Property information</SectionLabel>
          <Card pad={false} className="px-5 py-1">
            <ListRow title="Owner" subtitle="Available in the office record" />
            <Divider />
            <ListRow title="Access" subtitle="Keys held by LUZ · alarm details stored securely" />
            <Divider />
            <ListRow title="Visit rhythm" subtitle="Monthly · next visit 15 August 2026" />
          </Card>
        </>
      )}

      <BottomBar>
        <Button variant="gold" onClick={() => dispatch({ type: 'start-walk' })}>
          Start Founding Walk
        </Button>
        <Button variant="ghost" small onClick={() => setShowInfo((s) => !s)}>
          {showInfo ? 'Hide property information' : 'Review property information'}
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 3 · Preparation ————————————————— */

const PREP_ITEMS = [
  { id: 'battery', icon: <Battery size={22} />, label: 'Phone battery', hint: 'Enough charge for the full walk' },
  { id: 'tags', icon: <Tag size={22} />, label: 'Tag kit', hint: 'The pouch of small round tags for doorways and equipment' },
  { id: 'camera', icon: <Camera size={22} />, label: 'Camera ready', hint: 'For photos and printed codes' },
  { id: 'voice', icon: <Mic size={22} />, label: 'Voice capture', hint: 'Speak notes instead of typing — always optional' },
]

export function StepPrep({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const prep = state.walk.prep

  const checked = (id: string) => prep[id] !== false // reassuring default: ready unless unchecked

  return (
    <div className="flex flex-1 flex-col px-5 pb-40 pt-2">
      <TopBar onBack={onBack} />
      <Title>A quick look before we begin</Title>
      <Lead>Everything you need is probably already in your hands.</Lead>

      <Card className="mt-6" pad={false}>
        <div className="px-5 py-1">
          {PREP_ITEMS.map((item, i) => (
            <div key={item.id}>
              {i > 0 && <Divider />}
              <button
                onClick={() => dispatch({ type: 'prep-toggle', id: item.id })}
                className="flex min-h-16 w-full items-center gap-4 py-3 text-left"
              >
                <span className={checked(item.id) ? 'text-ok-500' : 'text-ink-400'}>{item.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-medium text-ink-900">{item.label}</span>
                  <span className="mt-0.5 block text-[13px] text-ink-500">{item.hint}</span>
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    checked(item.id) ? 'border-ok-500 bg-ok-500 text-white' : 'border-cream-300 bg-white'
                  }`}
                >
                  {checked(item.id) && <Check size={16} strokeWidth={3} />}
                </span>
              </button>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-navy-900/5 px-4 py-3.5">
        <CloudOff size={20} className="shrink-0 text-navy-700" />
        <p className="text-[14px] leading-snug text-ink-700">
          <span className="font-semibold">No internet required.</span> Everything works offline and is kept safely on
          this phone.
        </p>
      </div>

      <BottomBar>
        <Button variant="gold" onClick={() => dispatch({ type: 'go', step: 'entrance' })}>
          I'm ready
        </Button>
      </BottomBar>
    </div>
  )
}

/* ————————————————— 4 · Property entrance ————————————————— */

export function StepEntrance({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()
  const registered = state.walk.entrance === 'registered'

  if (registered) {
    return (
      <div className="flex flex-1 flex-col px-5 pb-40 pt-2">
        <TopBar onBack={onBack} />
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <div className="anim-pop flex h-24 w-24 items-center justify-center rounded-full bg-ok-100">
            <CircleCheck size={52} className="text-ok-500" />
          </div>
          <h2 className="font-display mt-6 text-[26px] font-semibold text-ink-900">Property entrance registered</h2>
          <p className="mt-2.5 max-w-[300px] text-[15px] leading-relaxed text-ink-500">
            Future visits can now identify this property immediately.
          </p>
        </div>
        <BottomBar>
          <Button variant="gold" onClick={() => dispatch({ type: 'go', step: 'overview' })}>
            Continue inside
          </Button>
        </BottomBar>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col px-5 pb-10 pt-2">
      <TopBar onBack={onBack} />
      <Title>Give Casa del Mar its identity</Title>
      <Lead>Place the first tag beside the main entrance — the property's permanent welcome.</Lead>
      <div className="mt-6">
        <TagScanSim
          subject="Property entrance"
          onDone={() => dispatch({ type: 'entrance', status: 'registered' })}
          onSkip={() => {
            dispatch({ type: 'entrance', status: 'later' })
            dispatch({ type: 'defer', id: 'entrance-tag' })
            dispatch({ type: 'go', step: 'overview' })
          }}
        />
      </div>
    </div>
  )
}

/* ————————————————— 5 · Founding Walk overview ————————————————— */

export function StepOverview({ onBack }: { onBack: () => void }) {
  const { state, dispatch } = useStore()

  const status = (id: string): 'done' | 'next' | 'ahead' => {
    if (id === 'entrance') return state.walk.entrance === 'registered' ? 'done' : 'ahead'
    if (id === 'living-room') return 'next'
    return 'ahead'
  }

  return (
    <div className="flex flex-1 flex-col px-5 pb-44 pt-2">
      <TopBar onBack={onBack} />
      <Title>The walk ahead</Title>
      <Lead>A calm route through the property. Take the rooms in any order — nothing is lost by changing course.</Lead>

      <Card className="mt-6" pad={false}>
        <div className="px-5 py-2">
          {AREAS.map((a, i) => {
            const s = status(a.id)
            return (
              <div key={a.id} className={i > 0 ? 'border-t border-cream-200' : ''}>
                <div className="flex min-h-14 items-center gap-3.5 py-2">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                      s === 'done'
                        ? 'bg-ok-100 text-ok-500'
                        : s === 'next'
                          ? 'bg-gold-500 text-navy-950'
                          : 'bg-cream-100 text-ink-500'
                    }`}
                  >
                    {s === 'done' ? <Check size={16} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[16px] ${s === 'next' ? 'font-semibold' : 'font-medium'} text-ink-900`}>
                      {a.name}
                      {a.kind === 'zone' && <span className="ml-2 text-[12px] font-medium text-ink-400">outdoor</span>}
                    </span>
                    {s === 'next' && <span className="block text-[13px] text-gold-700">Up next — full discovery</span>}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {['Change the order', 'Skip an area', 'Add an area', 'Resume later'].map((t) => (
          <div key={t} className="flex items-center gap-2 rounded-xl bg-cream-100 px-3.5 py-2.5 text-[13px] font-medium text-ink-500">
            <Check size={14} strokeWidth={3} className="shrink-0 text-ok-500" /> {t}
          </div>
        ))}
      </div>

      <BottomBar>
        <Button variant="gold" onClick={() => dispatch({ type: 'go', step: 'discover' })}>
          Discover first room
        </Button>
      </BottomBar>
    </div>
  )
}
