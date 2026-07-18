import type { ReactNode } from 'react'
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  History,
  House,
  LayoutGrid,
  ShieldCheck,
  UserRound,
  Wrench,
} from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import {
  AREAS,
  ASSETS,
  EMERGENCY_ENTRIES,
  LATER_ITEMS,
  PASSPORT_CHECKPOINTS,
  PASSPORT_SUMMARY,
  PROPERTY,
  RECENT_ACTIVITY,
  areaName,
} from '../data'
import { Card, Divider, ListRow, MockPhoto, SectionLabel, Shell, StatusBadge, TopBar } from '../ui'

/* ————————————————— Bottom navigation (passport & owner only) ————————————————— */

export function BottomNav({ active }: { active: 'passport' | 'emergency' | 'owner' }) {
  const { navigate } = useRouter()
  const items = [
    { id: 'passport' as const, label: 'Passport', icon: <House size={22} />, to: '/passport' },
    { id: 'emergency' as const, label: 'Emergency', icon: <ShieldCheck size={22} />, to: '/passport/emergency' },
    { id: 'owner' as const, label: 'Owner view', icon: <UserRound size={22} />, to: '/owner' },
  ]
  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-[430px] border-t border-cream-200 bg-white/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm">
        <div className="flex">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => navigate(it.to)}
              className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 pt-1.5 ${
                active === it.id ? 'text-navy-900' : 'text-ink-400'
              }`}
            >
              {it.icon}
              <span className="text-[11px] font-semibold">{it.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ————————————————— Completed Property Passport dashboard ————————————————— */

export function PassportDashboard() {
  const { navigate } = useRouter()
  const { state } = useStore()

  const openLater = LATER_ITEMS.length

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={() => navigate('/')} />

        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl">
          <MockPhoto seed="villa-hero" ratio="16/9" rounded="rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <div>
              <h1 className="font-display text-[26px] font-semibold text-cream-50">{PROPERTY.name}</h1>
              <p className="text-[13px] text-cream-50/70">{PROPERTY.location}</p>
            </div>
            <StatusBadge kind="ok">Healthy</StatusBadge>
          </div>
        </div>

        {/* Supporting info */}
        <Card className="mt-4" pad={false}>
          <div className="grid grid-cols-2 px-5 py-1">
            <div className="border-b border-r border-cream-200 py-3 pr-4">
              <div className="text-[12px] text-ink-400">Last visit</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">Today</div>
            </div>
            <div className="border-b border-cream-200 py-3 pl-4">
              <div className="text-[12px] text-ink-400">Next visit</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{PROPERTY.nextVisit}</div>
            </div>
            <div className="border-r border-cream-200 py-3 pr-4">
              <div className="text-[12px] text-ink-400">Open findings</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">0</div>
            </div>
            <div className="py-3 pl-4">
              <div className="text-[12px] text-ink-400">Passport</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[15px] font-semibold text-ok-500">
                <CircleCheck size={16} /> Operational
              </div>
            </div>
          </div>
        </Card>

        {/* Property overview */}
        <SectionLabel>Property overview</SectionLabel>
        <Card pad={false} className="px-5 py-2">
          <p className="py-2 text-[14px] leading-relaxed text-ink-700">
            {PROPERTY.type}. {PASSPORT_SUMMARY.areas} areas, {PASSPORT_SUMMARY.assets} registered assets and{' '}
            {PASSPORT_SUMMARY.checkpoints} checkpoints — created during today's Founding Walk
            {state.passportCreated ? '' : ' (demonstration data)'}.
          </p>
        </Card>

        {/* Rooms and zones */}
        <SectionLabel>Rooms and zones</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {AREAS.map((a, i) => {
            const tappable = a.id === 'living-room' || a.id === 'pool-area'
            const checkpoints = PASSPORT_CHECKPOINTS[a.id]?.length ?? 0
            return (
              <div key={a.id}>
                {i > 0 && <Divider />}
                <ListRow
                  left={<MockPhoto seed={a.id} ratio="1/1" className="w-11" rounded="rounded-lg" />}
                  title={a.name}
                  subtitle={`${checkpoints} checkpoints${a.kind === 'zone' ? ' · outdoor zone' : ''}`}
                  onClick={tappable ? () => navigate(`/passport/room/${a.id}`) : undefined}
                  right={tappable ? undefined : <span className="text-[12px] text-ink-400">soon</span>}
                />
              </div>
            )
          })}
        </Card>

        {/* Assets */}
        <SectionLabel>Assets</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {ASSETS.slice(0, 6).map((a, i) => {
            const tappable = a.id === 'ac-living'
            return (
              <div key={a.id}>
                {i > 0 && <Divider />}
                <ListRow
                  left={
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                      <Wrench size={18} />
                    </span>
                  }
                  title={a.name}
                  subtitle={`${areaName(a.areaId)}${a.brand ? ` · ${a.brand}` : ''}`}
                  onClick={tappable ? () => navigate('/passport/asset/ac-living') : undefined}
                  right={tappable ? undefined : <span className="text-[12px] text-ink-400">soon</span>}
                />
              </div>
            )
          })}
          <Divider />
          <div className="py-3 text-center text-[13px] text-ink-500">+ {ASSETS.length - 6} more assets</div>
        </Card>

        {/* Utilities & Emergency Card */}
        <SectionLabel>Utilities & Emergency Card</SectionLabel>
        <Card
          pad={false}
          className="overflow-hidden"
          onClick={() => navigate('/passport/emergency')}
        >
          <div className="flex items-center gap-4 bg-navy-900 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400">
              <ShieldCheck size={26} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[16px] font-semibold text-cream-50">Emergency Card</div>
              <div className="mt-0.5 text-[13px] text-cream-50/60">
                {PASSPORT_SUMMARY.utilities} utilities · shut-offs with photos and directions
              </div>
            </div>
            <ChevronRight size={20} className="text-cream-50/50" />
          </div>
        </Card>
        <Card pad={false} className="mt-2.5 px-5 py-1">
          {EMERGENCY_ENTRIES.map((e, i) => (
            <div key={e.id}>
              {i > 0 && <Divider />}
              <ListRow
                left={<MockPhoto seed={e.photoSeed} ratio="1/1" className="w-11" rounded="rounded-lg" />}
                title={e.name}
                subtitle={e.location}
                onClick={() => navigate('/passport/emergency')}
              />
            </div>
          ))}
        </Card>

        {/* Checkpoints */}
        <SectionLabel>Checkpoints</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <ClipboardList size={19} />
              </span>
            }
            title={`${PASSPORT_SUMMARY.checkpoints} checkpoints across ${PASSPORT_SUMMARY.areas} areas`}
            subtitle="What every future visit will remember to check"
          />
        </Card>

        {/* Property memory */}
        <SectionLabel>Property memory</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <BookOpen size={19} />
              </span>
            }
            title="Notes, documents & history"
            subtitle={`${PROPERTY.notes.length} standing notes · 1 manual · ${PASSPORT_SUMMARY.photos} baseline photos`}
          />
          <Divider />
          {PROPERTY.notes.map((n) => (
            <p key={n} className="py-2.5 text-[14px] leading-snug text-ink-700">
              {n}
            </p>
          ))}
        </Card>

        {/* Items to complete */}
        <SectionLabel>Items to complete</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {LATER_ITEMS.map((item, i) => (
            <div key={item.id}>
              {i > 0 && <Divider />}
              <ListRow
                left={<span className="h-2.5 w-2.5 rounded-full bg-gold-500" />}
                title={item.label}
                subtitle="Waiting on a future visit"
              />
            </div>
          ))}
        </Card>

        {/* Recent activity */}
        <SectionLabel>Recent activity</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {RECENT_ACTIVITY.map((e, i) => (
            <div key={e.id}>
              {i > 0 && <Divider />}
              <ListRow
                left={
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                    {e.kind === 'service' ? <Wrench size={18} /> : <History size={18} />}
                  </span>
                }
                title={e.title}
                subtitle={e.date}
                onClick={() => navigate(`/passport/activity/${e.id}`)}
              />
            </div>
          ))}
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-ink-400">
          <CalendarDays size={15} />
          Next visit {PROPERTY.nextVisit} · {openLater} small items on its list
        </div>
      </div>
      <BottomNav active="passport" />
    </Shell>
  )
}
