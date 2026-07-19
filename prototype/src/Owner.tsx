import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Download,
  Hammer,
  History,
  MessageSquare,
  ShieldCheck,
  Waves,
  Wrench,
} from 'lucide-react'
import { useRouter } from './lib/router'
import { PROPERTY } from './data'
import {
  MOISTURE_FINDING,
  OWNER_VISIT_STORY,
  TERRACE_FINDING,
  activityEvents,
  ownerHeadline,
  propertyStatus,
} from './scenario'
import { useStore } from './store'
import { Card, Divider, ListRow, MockPhoto, SectionLabel, Shell, StatusBadge, TopBar } from './ui'
import { BottomNav } from './passport/Passport'

/**
 * Owner experience — warmer and simpler than the inspector tool.
 * It must answer "Is Casa del Mar okay?" within ten seconds.
 */

function SimulatedAction({ icon, label, done }: { icon: ReactNode; label: string; done: string }) {
  const [used, setUsed] = useState(false)
  return (
    <button
      onClick={() => setUsed(true)}
      className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-[13px] font-semibold transition-colors ${
        used ? 'border-ok-100 bg-ok-100 text-ok-500' : 'border-cream-300 bg-white text-ink-700 active:bg-cream-100'
      }`}
    >
      {used ? <Check size={15} strokeWidth={3} /> : icon}
      {used ? done : label}
    </button>
  )
}

/* ————————————————— Owner dashboard ————————————————— */

export function OwnerHome() {
  const { navigate } = useRouter()
  const { state } = useStore()
  const approved = state.visit.approved
  const head = ownerHeadline(state)

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={() => navigate('/')} />

        {/* Hero answer */}
        <div className="relative overflow-hidden rounded-3xl">
          <MockPhoto seed="villa-hero" ratio="16/11" rounded="rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h1 className="font-display text-[28px] font-semibold text-cream-50">{PROPERTY.name}</h1>
            <div className="mt-2 flex items-center gap-2.5">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${approved ? 'bg-ok-500' : 'bg-warn-500'}`}
              >
                {approved ? (
                  <CircleCheck size={19} className="text-white" />
                ) : (
                  <CircleAlert size={19} className="text-white" />
                )}
              </span>
              <span className="text-[18px] font-semibold text-cream-50">{head.line}</span>
            </div>
            <p className="mt-1.5 text-[13px] text-cream-50/70">{head.sub}</p>
          </div>
        </div>

        {/* Key facts */}
        <Card className="mt-4" pad={false}>
          <div className="grid grid-cols-2 px-5 py-1">
            <div className="border-b border-r border-cream-200 py-3 pr-4">
              <div className="text-[12px] text-ink-400">Status</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{propertyStatus(state)}</div>
            </div>
            <div className="border-b border-cream-200 py-3 pl-4">
              <div className="text-[12px] text-ink-400">Last inspected</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{approved ? 'Today' : '12 June 2026'}</div>
            </div>
            <div className="border-r border-cream-200 py-3 pr-4">
              <div className="text-[12px] text-ink-400">Next visit</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{PROPERTY.nextVisit}</div>
            </div>
            <div className="py-3 pl-4">
              <div className="text-[12px] text-ink-400">Open · urgent</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{approved ? '2 · 0' : '1 · 0'}</div>
            </div>
          </div>
        </Card>

        {/* Today's visit */}
        <SectionLabel>{approved ? "Today's visit" : 'Coming up'}</SectionLabel>
        {approved ? (
          <Card pad={false} className="overflow-hidden" onClick={() => navigate('/owner/visits/latest')}>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-[15px] font-semibold text-cream-50">
                  W
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-ink-900">Walter visited today</div>
                  <div className="text-[13px] text-ink-500">Scheduled inspection · complete</div>
                </div>
              </div>
              <div className="mt-3.5">
                {OWNER_VISIT_STORY.checked.map((c) => (
                  <div key={c} className="flex items-center gap-2.5 py-1">
                    <Check size={15} strokeWidth={3} className="shrink-0 text-ok-500" />
                    <span className="text-[13px] text-ink-700">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1 text-[14px] font-semibold text-gold-700">
                View visit <ChevronRight size={16} />
              </div>
            </div>
          </Card>
        ) : (
          <Card pad={false} className="px-5 py-4">
            <p className="text-[14px] leading-relaxed text-ink-700">
              Walter inspects Casa del Mar today, including a recheck of the item below the kitchen sink and your shutter
              request. You'll receive the visit story right after.
            </p>
          </Card>
        )}

        {/* At a glance */}
        <SectionLabel>At a glance</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Card pad={false} className="p-4" onClick={() => navigate('/passport/room/pool-area')}>
            <div className="flex items-center gap-2 text-navy-700">
              <Waves size={18} />
              <span className="text-[13px] font-semibold text-ink-500">Pool</span>
            </div>
            <div className="mt-1.5 text-[16px] font-semibold text-ink-900">
              {approved ? 'Operating normally' : 'Checked today'}
            </div>
            <div className="text-[12px] text-ink-500">Level at skimmer midpoint</div>
          </Card>
          <Card pad={false} className="p-4" onClick={() => navigate('/owner/findings/moisture-kitchen')}>
            <div className="flex items-center gap-2 text-navy-700">
              <CircleAlert size={18} />
              <span className="text-[13px] font-semibold text-ink-500">Being watched</span>
            </div>
            <div className="mt-1.5 text-[16px] font-semibold text-ink-900">
              {approved ? 'Sink issue improving' : 'Sink issue — recheck today'}
            </div>
            <div className="text-[12px] text-ink-500">Not urgent</div>
          </Card>
        </div>

        {/* Explore */}
        <SectionLabel>Your property</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <BookOpen size={19} />
              </span>
            }
            title="Property record"
            subtitle="Rooms, equipment and everything remembered"
            onClick={() => navigate('/passport')}
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <CircleAlert size={19} />
              </span>
            }
            title="Open items"
            subtitle={approved ? 'Two small things, neither urgent' : 'One item, being watched'}
            onClick={() => navigate('/owner/findings/moisture-kitchen')}
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <History size={19} />
              </span>
            }
            title="Property timeline"
            subtitle="The story of Casa del Mar, visit by visit"
            onClick={() => navigate('/passport/activity')}
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <ShieldCheck size={19} />
              </span>
            }
            title="Emergency information"
            subtitle="Shut-offs and directions, always ready"
            onClick={() => navigate('/passport/emergency')}
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <CalendarDays size={19} />
              </span>
            }
            title="Documents & services"
            subtitle="Manuals, policies, trusted contractors"
            onClick={() => navigate('/passport/documents')}
          />
        </Card>
      </div>
      <BottomNav active="owner" />
    </Shell>
  )
}

/* ————————————————— Owner visit story ————————————————— */

export function OwnerStory() {
  const { back, navigate } = useRouter()
  const { state } = useStore()
  const approved = state.visit.approved

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title="Visit story" subtitle={approved ? 'Today' : 'After today’s visit'} />
        <MockPhoto seed="villa-hero" ratio="16/9" rounded="rounded-3xl" />
        <h1 className="font-display mt-5 text-[24px] font-semibold leading-snug text-ink-900">
          {OWNER_VISIT_STORY.headline}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-700">{OWNER_VISIT_STORY.text}</p>

        <SectionLabel>Overall result</SectionLabel>
        <Card pad={false} className="px-5 py-4">
          <div className="flex items-center gap-3">
            <StatusBadge kind="ok">Stable</StatusBadge>
            <span className="text-[14px] text-ink-700">Nothing needs you before the next visit.</span>
          </div>
        </Card>

        <SectionLabel>What was checked</SectionLabel>
        <Card pad={false} className="px-5 py-2">
          {OWNER_VISIT_STORY.checked.map((c) => (
            <div key={c} className="flex items-center gap-3 py-2">
              <Check size={16} strokeWidth={3} className="shrink-0 text-ok-500" />
              <span className="text-[14px] text-ink-700">{c}</span>
            </div>
          ))}
        </Card>

        <SectionLabel>Items requiring attention</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow
            left={<MockPhoto seed="k-sink-now" ratio="1/1" className="w-11" rounded="rounded-lg" />}
            title="Below the kitchen sink — improving"
            subtitle="Not urgent · seal will be replaced"
            onClick={() => navigate('/owner/findings/moisture-kitchen')}
          />
          <Divider />
          <ListRow
            left={<MockPhoto seed="terrace-handle" ratio="1/1" className="w-11" rounded="rounded-lg" />}
            title="Terrace-door handle — loose"
            subtitle="A small thing, easily fixed"
            onClick={() => navigate('/owner/findings/terrace-handle')}
          />
        </Card>

        <SectionLabel>Photos from today</SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          {['k-sink-now', 'pool', 'villa-hero'].map((s) => (
            <MockPhoto key={s} seed={s} ratio="1/1" />
          ))}
        </div>

        <SectionLabel>Meter readings</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow title="Water · 18,412 m³" subtitle="+34 m³ since last visit · normal for the season" />
          <Divider />
          <ListRow title="Electricity · 46,218 kWh" subtitle="+237 kWh since last visit · normal for the season" />
        </Card>

        <SectionLabel>What happens next</SectionLabel>
        <Card pad={false} className="px-5 py-4">
          <p className="text-[14px] leading-relaxed text-ink-700">{OWNER_VISIT_STORY.next}</p>
        </Card>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <SimulatedAction icon={<MessageSquare size={15} />} label="Ask about an item" done="We'll reply shortly" />
          <SimulatedAction icon={<Hammer size={15} />} label="Coordinate repairs" done="Request received" />
          <SimulatedAction icon={<Download size={15} />} label="Download report" done="Prepared" />
          <button
            onClick={() => navigate('/owner/findings/moisture-kitchen')}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-cream-300 bg-white text-[13px] font-semibold text-ink-700 active:bg-cream-100"
          >
            View evidence
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-ink-400">Actions are simulated in this prototype</p>
      </div>
      <BottomNav active="owner" />
    </Shell>
  )
}

/* ————————————————— Owner finding detail ————————————————— */

export function OwnerFinding({ id }: { id: string }) {
  const { back } = useRouter()
  const { state } = useStore()
  const approved = state.visit.approved
  const isMoisture = id !== 'terrace-handle'
  const f = isMoisture ? MOISTURE_FINDING : TERRACE_FINDING

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title={isMoisture ? 'Below the kitchen sink' : 'Terrace-door handle'} subtitle="Being looked after" />

        <Card pad={false} className="overflow-hidden">
          <div className="bg-navy-900 p-5">
            <p className="text-[17px] font-semibold text-cream-50">{f.ownerTranslation}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-cream-50/70">{f.ownerDetail}</p>
          </div>
        </Card>

        {isMoisture && approved && (
          <>
            <SectionLabel>June, and today</SectionLabel>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <MockPhoto seed="k-sink-then" ratio="3/4" label="12 June" />
                <div className="mt-1.5 text-center text-[12px] font-medium text-ink-500">When it was found</div>
              </div>
              <div>
                <MockPhoto seed="k-sink-now" ratio="3/4" label="Today" />
                <div className="mt-1.5 text-center text-[12px] font-medium text-ink-500">Clearly drier</div>
              </div>
            </div>
          </>
        )}
        {!isMoisture && (
          <>
            <SectionLabel>The handle</SectionLabel>
            <MockPhoto seed="terrace-handle" ratio="16/10" rounded="rounded-2xl" label="Today" />
          </>
        )}
        {isMoisture && !approved && (
          <>
            <SectionLabel>What we're watching</SectionLabel>
            <MockPhoto seed="k-sink-then" ratio="16/10" rounded="rounded-2xl" label="12 June" />
          </>
        )}

        <SectionLabel>Latest</SectionLabel>
        <Card pad={false} className="px-5 py-4">
          <p className="text-[14px] leading-relaxed text-ink-700">
            {isMoisture
              ? approved
                ? 'Rechecked today — clearly improving. The worn seal still needs replacing so it doesn’t come back.'
                : 'Being rechecked at today’s visit. We’ll update you right after.'
              : 'Recorded today. It will be tightened at the same contractor visit as the sink seal.'}
          </p>
        </Card>

        <SectionLabel>Proposed next step</SectionLabel>
        <Card pad={false} className="px-5 py-4">
          <p className="text-[14px] leading-relaxed text-ink-700">
            {isMoisture
              ? 'A contractor replaces the seal — about 30 minutes of work. We propose bundling it with the terrace-door handle.'
              : 'Tighten or replace the handle fixing — minutes of work, bundled with the seal replacement.'}
          </p>
        </Card>

        <div className="mt-5">
          <SimulatedAction icon={<Hammer size={15} />} label="Request coordination" done="Request received — we'll propose a date" />
        </div>
        <p className="mt-2 text-center text-[11px] text-ink-400">Simulated in this prototype</p>
      </div>
      <BottomNav active="owner" />
    </Shell>
  )
}

/* ————————————————— Owner timeline (kept for compatibility) ————————————————— */

export function OwnerTimeline() {
  const { back } = useRouter()
  const { state } = useStore()
  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title="Property timeline" subtitle="Casa del Mar" />
        <Card pad={false} className="px-5 py-1">
          {activityEvents(state).map((e, i) => (
            <div key={e.id}>
              {i > 0 && <Divider />}
              <div className="flex gap-3.5 py-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-100 text-navy-700">
                  {e.kind === 'asset' ? <Wrench size={17} /> : <History size={17} />}
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-ink-400">{e.date}</div>
                  <div className="mt-0.5 text-[15px] font-medium text-ink-900">{e.title}</div>
                  <p className="mt-0.5 text-[13px] leading-snug text-ink-500">{e.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>
        <p className="mt-4 text-center text-[13px] text-ink-400">The timeline grows with every inspection, repair and visit.</p>
      </div>
      <BottomNav active="owner" />
    </Shell>
  )
}
