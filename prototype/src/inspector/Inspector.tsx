import { CalendarDays, ChevronRight, CircleAlert, CircleCheck, Clock, KeyRound, MessageSquare, Sun } from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import { MOISTURE_FINDING, OWNER_REQUEST, VISIT_META, propertyStatus } from '../scenario'
import { PROPERTY } from '../data'
import { BottomBar, Button, Card, Divider, Lead, ListRow, MockPhoto, SectionLabel, Shell, StatusBadge, Title, TopBar } from '../ui'

/* ————————————————— Inspector home ————————————————— */

export function InspectorHome() {
  const { navigate } = useRouter()
  const { state } = useStore()
  const status = propertyStatus(state)
  const done = state.visit.approved

  return (
    <Shell>
      <div className="px-5 pb-40 pt-3">
        <TopBar onBack={() => navigate('/')} />
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-400">Today</div>
            <Title>Good morning, Walter</Title>
          </div>
          <span className="mb-1 flex items-center gap-1.5 text-[13px] text-ink-500">
            <Sun size={15} /> 29° Bolonia
          </span>
        </div>

        {/* Today's visit */}
        <SectionLabel>Scheduled visit</SectionLabel>
        <Card pad={false} className="overflow-hidden">
          <div className="relative">
            <MockPhoto seed="villa-hero" ratio="16/7" rounded="" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <div>
                <div className="font-display text-[20px] font-semibold text-cream-50">{PROPERTY.name}</div>
                <div className="text-[12px] text-cream-50/70">{PROPERTY.location}</div>
              </div>
              <StatusBadge kind={done ? 'ok' : 'warn'}>{status}</StatusBadge>
            </div>
          </div>
          <div className="grid grid-cols-2 px-5 py-1">
            <div className="border-b border-r border-cream-200 py-3 pr-4">
              <div className="text-[12px] text-ink-400">Scheduled</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{VISIT_META.scheduled}</div>
            </div>
            <div className="border-b border-cream-200 py-3 pl-4">
              <div className="text-[12px] text-ink-400">Estimated</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{VISIT_META.estimated}</div>
            </div>
            <div className="border-r border-cream-200 py-3 pr-4">
              <div className="text-[12px] text-ink-400">Open findings</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[15px] font-semibold text-ink-900">
                <CircleAlert size={15} className="text-warn-500" /> {done ? '2 · none urgent' : '1 · recheck today'}
              </div>
            </div>
            <div className="py-3 pl-4">
              <div className="text-[12px] text-ink-400">Owner request</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">1 waiting</div>
            </div>
          </div>
          <div className="border-t border-cream-200 bg-cream-50/60 px-5 py-3">
            <div className="flex items-start gap-2.5">
              <MessageSquare size={16} className="mt-0.5 shrink-0 text-navy-700" />
              <p className="text-[13px] leading-snug text-ink-700">“{OWNER_REQUEST}”</p>
            </div>
          </div>
        </Card>

        {/* Recent context */}
        <SectionLabel>Last visit</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow
            left={<MockPhoto seed="k-sink-then" ratio="1/1" className="w-11" rounded="rounded-lg" />}
            title={MOISTURE_FINDING.title}
            subtitle={`${MOISTURE_FINDING.severity} · first seen ${MOISTURE_FINDING.firstSeen}`}
            onClick={() => navigate('/passport/findings/moisture-kitchen')}
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <CalendarDays size={18} />
              </span>
            }
            title={`Inspected ${VISIT_META.lastVisit}`}
            subtitle="Everything else was healthy"
          />
        </Card>

        {/* Upcoming / drafts / completed */}
        <SectionLabel>This week</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <Clock size={18} />
              </span>
            }
            title="Villa Mirador · Tarifa"
            subtitle="Tomorrow · 09:30 · routine visit"
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <Clock size={18} />
              </span>
            }
            title="Casa Almadraba · Zahara"
            subtitle="Thursday · 11:00 · pre-arrival check"
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ok-100 text-ok-500">
                <CircleCheck size={18} />
              </span>
            }
            title="Finca La Breña · completed"
            subtitle="Tuesday · approved and delivered"
          />
        </Card>

        <BottomBar>
          {done ? (
            <Button variant="gold" onClick={() => navigate('/inspector/review')}>
              View today's approved visit
            </Button>
          ) : (
            <Button variant="gold" onClick={() => navigate('/inspector/briefing')}>
              Review visit briefing
            </Button>
          )}
        </BottomBar>
      </div>
    </Shell>
  )
}

/* ————————————————— Visit briefing ————————————————— */

export function Briefing() {
  const { navigate, back } = useRouter()

  return (
    <Shell>
      <div className="px-5 pb-40 pt-3">
        <TopBar onBack={back} title="Visit briefing" subtitle="Casa del Mar · today" />

        <Card className="bg-navy-900" pad={false}>
          <p className="p-5 text-[16px] leading-relaxed text-cream-50">{VISIT_META.briefing}</p>
        </Card>

        <SectionLabel>Recheck today</SectionLabel>
        <Card pad={false} className="overflow-hidden">
          <div className="flex gap-4 p-4">
            <MockPhoto seed="k-sink-then" ratio="1/1" className="w-20 shrink-0" rounded="rounded-xl" />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-semibold text-ink-900">{MOISTURE_FINDING.title}</div>
              <div className="mt-0.5 text-[13px] text-ink-500">
                {MOISTURE_FINDING.severity} · first seen {MOISTURE_FINDING.firstSeen}
              </div>
              <div className="mt-1.5 text-[13px] leading-snug text-ink-700">
                Compare against the June photo. The seal was already worn.
              </div>
            </div>
          </div>
        </Card>

        <SectionLabel>Owner request</SectionLabel>
        <Card pad={false} className="px-5 py-4">
          <p className="text-[15px] leading-relaxed text-ink-700">“{OWNER_REQUEST}”</p>
        </Card>

        <SectionLabel>Today at a glance</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow title="Seasonal focus" subtitle={VISIT_META.seasonalFocus} />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <KeyRound size={18} />
              </span>
            }
            title="Access"
            subtitle={VISIT_META.accessNote}
          />
          <Divider />
          <div className="grid grid-cols-3 py-3 text-center">
            <div>
              <div className="font-display text-[20px] font-semibold text-ink-900">{VISIT_META.checkpoints}</div>
              <div className="text-[12px] text-ink-500">checkpoints</div>
            </div>
            <div className="border-x border-cream-200">
              <div className="font-display text-[20px] font-semibold text-ink-900">10</div>
              <div className="text-[12px] text-ink-500">areas</div>
            </div>
            <div>
              <div className="font-display text-[20px] font-semibold text-ink-900">75</div>
              <div className="text-[12px] text-ink-500">minutes est.</div>
            </div>
          </div>
        </Card>

        <BottomBar>
          <Button variant="gold" onClick={() => navigate('/inspector/visit')}>
            Start visit
          </Button>
        </BottomBar>
      </div>
    </Shell>
  )
}
