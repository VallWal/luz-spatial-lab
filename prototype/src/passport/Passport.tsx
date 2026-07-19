import { useState } from 'react'
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  ClipboardList,
  FileText,
  History,
  House,
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
  areaName,
} from '../data'
import { DOCUMENTS, activityEvents, openFindings, propertyStatus, statusExplanation } from '../scenario'
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
  const [showAllAssets, setShowAllAssets] = useState(false)
  const status = propertyStatus(state)
  const approved = state.visit.approved
  const findings = openFindings(state)
  const activity = activityEvents(state)

  return (
    <Shell>
      <div className="mx-auto md:max-w-[760px]">
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
              <StatusBadge kind={approved ? 'ok' : 'warn'}>{status}</StatusBadge>
            </div>
          </div>

          {/* Supporting info */}
          <Card className="mt-4" pad={false}>
            <div className="grid grid-cols-2 px-5 py-1">
              <div className="border-b border-r border-cream-200 py-3 pr-4">
                <div className="text-[12px] text-ink-400">Last inspection</div>
                <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{approved ? 'Today' : '12 June 2026'}</div>
              </div>
              <div className="border-b border-cream-200 py-3 pl-4">
                <div className="text-[12px] text-ink-400">Next visit</div>
                <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{PROPERTY.nextVisit}</div>
              </div>
              <div className="border-r border-cream-200 py-3 pr-4">
                <div className="text-[12px] text-ink-400">Open findings</div>
                <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{findings.length}</div>
              </div>
              <div className="py-3 pl-4">
                <div className="text-[12px] text-ink-400">Passport</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[15px] font-semibold text-ok-500">
                  <CircleCheck size={16} /> Operational
                </div>
              </div>
            </div>
          </Card>

          {/* Property health */}
          <SectionLabel>Property health</SectionLabel>
          <Card pad={false} className="overflow-hidden">
            <div className="flex items-center gap-4 p-5">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  approved ? 'bg-ok-100 text-ok-500' : 'bg-warn-100 text-warn-500'
                }`}
              >
                {approved ? <CircleCheck size={26} /> : <CircleAlert size={26} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[17px] font-semibold text-ink-900">{status}</div>
                <p className="mt-0.5 text-[13px] leading-snug text-ink-500">
                  {approved ? 'No urgent action is needed.' : 'Today’s visit will recheck the open item.'}
                </p>
              </div>
            </div>
            <div className="border-t border-cream-200 bg-cream-50/60 px-5 py-3.5">
              <p className="text-[13px] leading-snug text-ink-700">{statusExplanation(state)}</p>
              <button
                onClick={() => navigate('/passport/findings/moisture-kitchen')}
                className="mt-2 flex items-center gap-1 text-[13px] font-semibold text-gold-700"
              >
                Open the evidence behind this <ChevronRight size={14} />
              </button>
            </div>
          </Card>

          {/* Open findings */}
          <SectionLabel>Open findings · {findings.length}</SectionLabel>
          <Card pad={false} className="px-5 py-1">
            {findings.map((f, i) => (
              <div key={f.id}>
                {i > 0 && <Divider />}
                <ListRow
                  left={
                    <MockPhoto
                      seed={f.id === 'moisture-kitchen' ? 'k-sink-then' : 'terrace-handle'}
                      ratio="1/1"
                      className="w-11"
                      rounded="rounded-lg"
                    />
                  }
                  title={f.title}
                  subtitle={`${f.severity} · ${f.status} · ${areaName(f.roomId)}`}
                  onClick={() => navigate(`/passport/findings/${f.id}`)}
                />
              </div>
            ))}
          </Card>

          {/* Rooms and zones */}
          <SectionLabel>Rooms and zones</SectionLabel>
          <Card pad={false} className="px-5 py-1">
            {AREAS.map((a, i) => {
              const checkpoints = PASSPORT_CHECKPOINTS[a.id]?.length ?? 0
              const hasFinding = findings.some((f) => f.roomId === a.id)
              return (
                <div key={a.id}>
                  {i > 0 && <Divider />}
                  <ListRow
                    left={<MockPhoto seed={a.id} ratio="1/1" className="w-11" rounded="rounded-lg" />}
                    title={a.name}
                    subtitle={`${checkpoints} checkpoints${a.kind === 'zone' ? ' · outdoor zone' : ''}${
                      hasFinding ? ' · 1 open finding' : ''
                    }`}
                    onClick={() => navigate(`/passport/room/${a.id}`)}
                  />
                </div>
              )
            })}
          </Card>

          {/* Assets */}
          <SectionLabel>Assets</SectionLabel>
          <Card pad={false} className="px-5 py-1">
            {(showAllAssets ? ASSETS : ASSETS.slice(0, 6)).map((a, i) => (
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
                  onClick={() => navigate(`/passport/asset/${a.id}`)}
                />
              </div>
            ))}
            <Divider />
            <button
              onClick={() => setShowAllAssets((s) => !s)}
              className="w-full py-3 text-center text-[13px] font-semibold text-gold-700 active:bg-cream-50"
            >
              {showAllAssets ? 'Show fewer' : `Show all ${ASSETS.length} assets`}
            </button>
          </Card>

          {/* Utilities & Emergency Card */}
          <SectionLabel>Utilities & Emergency Card</SectionLabel>
          <Card pad={false} className="overflow-hidden" onClick={() => navigate('/passport/emergency')}>
            <div className="flex items-center gap-4 bg-navy-900 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400">
                <ShieldCheck size={26} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[16px] font-semibold text-cream-50">Emergency Card</div>
                <div className="mt-0.5 text-[13px] text-cream-50/70">
                  {PASSPORT_SUMMARY.utilities} utilities · shut-offs with photos and directions
                </div>
              </div>
              <ChevronRight size={20} className="text-cream-50/65" />
            </div>
          </Card>
          <Card pad={false} className="mt-2.5 px-5 py-1">
            {EMERGENCY_ENTRIES.map((e, i) => (
              <div key={e.id}>
                {i > 0 && <Divider />}
                <ListRow
                  left={<MockPhoto seed={e.photoSeed} ratio="1/1" className="w-11" rounded="rounded-lg" />}
                  title={e.name}
                  subtitle={approved ? `Checked today · ${e.location}` : e.location}
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
              subtitle={approved ? '32 checked today · all others on their seasonal rhythm' : 'What every visit remembers to check'}
            />
          </Card>

          {/* Documents */}
          <SectionLabel>Documents</SectionLabel>
          <Card pad={false} className="px-5 py-1">
            <ListRow
              left={
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                  <FileText size={19} />
                </span>
              }
              title={`${DOCUMENTS.length} documents`}
              subtitle="Manuals, diagrams, policies and contacts"
              onClick={() => navigate('/passport/documents')}
            />
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
          <SectionLabel>Activity</SectionLabel>
          <Card pad={false} className="px-5 py-1">
            {activity.slice(0, 4).map((e, i) => (
              <div key={e.id}>
                {i > 0 && <Divider />}
                <ListRow
                  left={
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        e.kind === 'finding' ? 'bg-warn-100 text-warn-500' : 'bg-cream-100 text-navy-700'
                      }`}
                    >
                      {e.kind === 'finding' ? <CircleAlert size={18} /> : <History size={18} />}
                    </span>
                  }
                  title={e.title}
                  subtitle={e.date}
                  onClick={() => navigate('/passport/activity')}
                />
              </div>
            ))}
            <Divider />
            <button
              onClick={() => navigate('/passport/activity')}
              className="w-full py-3 text-center text-[13px] font-semibold text-gold-700 active:bg-cream-50"
            >
              Full timeline
            </button>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-ink-400">
            <CalendarDays size={15} />
            Next visit {PROPERTY.nextVisit}
          </div>
        </div>
      </div>
      <BottomNav active="passport" />
    </Shell>
  )
}
