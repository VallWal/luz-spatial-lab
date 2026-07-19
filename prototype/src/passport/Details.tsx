import { useState } from 'react'
import {
  BookOpen,
  Check,
  ClipboardList,
  FileText,
  History,
  Pencil,
  ShieldCheck,
  Tag,
  Wrench,
} from 'lucide-react'
import { useRouter } from '../lib/router'
import {
  AC_TIMELINE,
  ASSETS,
  PASSPORT_CHECKPOINTS,
  RECENT_ACTIVITY,
  areaName,
  assetById,
} from '../data'
import { openFindings } from '../scenario'
import { useStore } from '../store'
import { Card, Divider, ListRow, MockPhoto, SectionLabel, Shell, StatusBadge, TopBar } from '../ui'
import { BottomNav } from './Passport'

/* ————————————————— Floor-plan placeholder ————————————————— */

function RoomPlan({
  zone = false,
  name = 'Living Room',
  checkpointCount = 5,
  scanned = true,
}: {
  zone?: boolean
  name?: string
  checkpointCount?: number
  scanned?: boolean
}) {
  if (zone)
    return (
      <div className="flex aspect-[16/8] w-full items-center justify-center rounded-2xl bg-cream-100 px-6">
        <div className="text-center">
          <div className="text-[13px] font-semibold text-ink-500">Outdoor zone</div>
          <div className="mt-1 text-[12px] text-ink-400">Located by its zone tag and photos — no plan needed</div>
        </div>
      </div>
    )
  if (!scanned)
    return (
      <div className="flex aspect-[16/8] w-full items-center justify-center rounded-2xl bg-cream-100 px-6">
        <div className="text-center">
          <div className="text-[13px] font-semibold text-ink-500">Captured with photos</div>
          <div className="mt-1 text-[12px] text-ink-400">The room's shape can be added on any future visit</div>
        </div>
      </div>
    )
  return (
    <div className="rounded-2xl bg-cream-100 p-4">
      <svg viewBox="0 0 320 170" className="w-full" aria-label="Simplified room plan">
        <rect x="12" y="12" width="296" height="146" rx="6" fill="#ffffff" stroke="#1b2a3a" strokeWidth="2.5" />
        {/* windows on top wall */}
        <line x1="60" y1="12" x2="120" y2="12" stroke="#b9935a" strokeWidth="6" />
        <line x1="170" y1="12" x2="230" y2="12" stroke="#b9935a" strokeWidth="6" />
        {/* terrace door on right wall */}
        <line x1="308" y1="55" x2="308" y2="115" stroke="#b9935a" strokeWidth="6" />
        <path d="M308 55 A60 60 0 0 0 248 115" fill="none" stroke="#dcd2bd" strokeWidth="1.5" />
        {/* fireplace */}
        <rect x="12" y="70" width="14" height="40" fill="#1b2a3a" opacity="0.85" />
        {/* checkpoint dots */}
        {[
          [292, 85],
          [95, 24],
          [200, 24],
          [160, 85],
          [40, 140],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="#b9935a" opacity="0.9" />
        ))}
        <text x="24" y="150" fontSize="11" fill="#7d8c9e" fontFamily="sans-serif">
          {name} · {checkpointCount} checkpoints
        </text>
      </svg>
    </div>
  )
}

/* ————————————————— Room / zone detail ————————————————— */

export function RoomDetail({ id }: { id: string }) {
  const { navigate, back } = useRouter()
  const { state } = useStore()
  const approved = state.visit.approved
  const [renaming, setRenaming] = useState(false)
  const [name, setName] = useState(areaName(id))
  const isZone = id === 'pool-area' || id === 'garden'
  const checkpoints = PASSPORT_CHECKPOINTS[id] ?? []
  const assets = ASSETS.filter((a) => a.areaId === id || (id === 'pool-area' && a.category === 'Pool'))
  const roomFindings = openFindings(state).filter((f) => f.roomId === id)

  const observations =
    id === 'kitchen'
      ? approved
        ? [
            { date: 'Today', text: 'Moisture below the sink rechecked — improved. Seal replacement still recommended.' },
            { date: 'Today', text: 'All other checkpoints healthy. Shutter position noted for the owner.' },
            { date: '12 June 2026', text: 'Moisture patch first observed below the sink. Moderate.' },
          ]
        : [{ date: '12 June 2026', text: 'Moisture patch first observed below the sink. Moderate — recheck scheduled today.' }]
      : id === 'pool-area'
        ? [
            { date: approved ? 'Today' : '12 June 2026', text: 'Water level at skimmer midpoint — exactly where the owner likes it.' },
            { date: approved ? 'Today' : '12 June 2026', text: 'Pump running quietly, filter pressure in the green band.' },
          ]
        : [
            { date: approved ? 'Today' : '12 June 2026', text: 'Room inspected in good condition. No findings.' },
            { date: '12 June 2026', text: 'Baseline photos and checkpoints established.' },
          ]

  const roomOk = roomFindings.length === 0

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title={name} subtitle={isZone ? 'Outdoor zone' : 'Room'} />

        <div className="flex items-center justify-between">
          <StatusBadge kind={roomOk ? 'ok' : 'warn'}>
            {roomOk ? 'All well' : approved ? 'Watched · improving' : 'Open finding'}
          </StatusBadge>
          <span className="text-[13px] text-ink-500">{approved ? 'Inspected today' : 'Last inspected 12 June'}</span>
        </div>

        {roomFindings.length > 0 && (
          <>
            <SectionLabel>Open findings</SectionLabel>
            <Card pad={false} className="px-5 py-1">
              {roomFindings.map((f) => (
                <ListRow
                  key={f.id}
                  left={
                    <MockPhoto
                      seed={f.id === 'moisture-kitchen' ? 'k-sink-then' : 'terrace-handle'}
                      ratio="1/1"
                      className="w-11"
                      rounded="rounded-lg"
                    />
                  }
                  title={f.title}
                  subtitle={`${f.severity} · ${f.status}`}
                  onClick={() => navigate(`/passport/findings/${f.id}`)}
                />
              ))}
            </Card>
          </>
        )}

        <SectionLabel>Latest baseline</SectionLabel>
        <MockPhoto seed={id === 'pool-area' ? 'pool' : `${id}-overview`} ratio="16/9" rounded="rounded-2xl" />

        <SectionLabel>{isZone ? 'Zone' : 'Room plan'}</SectionLabel>
        <RoomPlan
          zone={isZone}
          name={name}
          checkpointCount={checkpoints.length}
          scanned={!['bathroom', 'guest-bedroom'].includes(id)}
        />

        {assets.length > 0 && (
          <>
            <SectionLabel>Registered assets</SectionLabel>
            <Card pad={false} className="px-5 py-1">
              {assets.map((a, i) => (
                <div key={a.id}>
                  {i > 0 && <Divider />}
                  <ListRow
                    left={
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                        <Wrench size={18} />
                      </span>
                    }
                    title={a.name}
                    subtitle={a.brand ? `${a.brand}${a.model ? ` ${a.model}` : ''}` : a.category}
                    onClick={a.id === 'ac-living' ? () => navigate('/passport/asset/ac-living') : undefined}
                  />
                </div>
              ))}
            </Card>
          </>
        )}

        <SectionLabel>Checkpoints</SectionLabel>
        <Card pad={false} className="px-5 py-2">
          {checkpoints.map((c) => (
            <div key={c} className="flex items-center gap-3 py-2">
              <Check size={16} strokeWidth={3} className="shrink-0 text-ok-500" />
              <span className="text-[14px] text-ink-700">{c}</span>
            </div>
          ))}
        </Card>

        <SectionLabel>Recent observations</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {observations.map((o, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div className="py-3">
                <div className="text-[12px] font-semibold text-ink-400">{o.date}</div>
                <p className="mt-1 text-[14px] leading-snug text-ink-700">{o.text}</p>
              </div>
            </div>
          ))}
        </Card>

        <SectionLabel>Photo history</SectionLabel>
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-32 shrink-0">
              <MockPhoto seed={`${id}-hist-${i}`} ratio="4/3" />
              <span className="mt-1 block text-[12px] text-ink-500">Today</span>
            </div>
          ))}
        </div>

        <SectionLabel>Identity</SectionLabel>
        <Card pad={false} className="px-5">
          {renaming ? (
            <div className="flex items-center gap-2 py-3">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 min-w-0 flex-1 rounded-xl border border-cream-300 bg-cream-50 px-3.5 text-[16px] outline-none focus:border-gold-500"
              />
              <button
                onClick={() => setRenaming(false)}
                className="h-11 rounded-xl bg-navy-900 px-4 text-[14px] font-semibold text-cream-50"
              >
                Done
              </button>
            </div>
          ) : (
            <ListRow
              left={
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                  <Tag size={18} />
                </span>
              }
              title={name}
              subtitle={
                id === 'guest-bedroom'
                  ? 'Doorway tag on the list for the next visit'
                  : isZone
                    ? 'Zone tag registered today'
                    : 'Doorway tag registered today'
              }
              right={
                <button onClick={() => setRenaming(true)} className="flex items-center gap-1.5 text-[13px] font-semibold text-gold-700">
                  <Pencil size={14} /> Edit
                </button>
              }
            />
          )}
        </Card>
      </div>
      <BottomNav active="passport" />
    </Shell>
  )
}

/* ————————————————— Asset detail (air-conditioning unit) ————————————————— */

export function AssetDetail({ id }: { id: string }) {
  const { back } = useRouter()
  const { state } = useStore()
  const asset = assetById(id) ?? assetById('ac-living')!
  const isAc = asset.id === 'ac-living'

  const timeline = isAc
    ? [
        ...(state.visit.approved
          ? [
              {
                id: 'ac-today',
                date: 'Today',
                title: 'Operation confirmed during inspection',
                detail: 'Running normally at the living-room checkpoint.',
                kind: 'service' as const,
              },
            ]
          : []),
        ...AC_TIMELINE,
      ]
    : [
        {
          id: `${asset.id}-registered`,
          date: 'Today',
          title: 'Registered in Property Passport',
          detail: `Identity tag attached in the ${areaName(asset.areaId).toLowerCase()}.`,
          kind: 'passport' as const,
        },
      ]

  const facts: [string, string][] = [
    ['Condition', asset.condition],
    ['Make & model', `${asset.brand ?? '—'} ${asset.model ?? ''}`.trim()],
    ['Serial number', asset.serial ?? '—'],
    ['Location', areaName(asset.areaId)],
    ['Installed', asset.installed ?? '—'],
    ['Warranty', asset.warrantyUntil ? `Until ${asset.warrantyUntil}` : '—'],
  ]

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title={asset.name} subtitle={areaName(asset.areaId)} />

        <div className="flex items-center justify-between">
          <StatusBadge kind="ok">{asset.condition} condition</StatusBadge>
          <span className="flex items-center gap-1.5 text-[13px] text-ink-500">
            <Tag size={14} /> Tagged
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <MockPhoto seed={isAc ? 'ac-unit' : asset.id} ratio="1/1" label="Unit" />
          <MockPhoto seed={isAc ? 'ac-nameplate' : `${asset.id}-detail`} ratio="1/1" label={isAc ? 'Nameplate' : 'Detail'} />
        </div>

        <SectionLabel>Details</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {facts.map(([k, v], i) => (
            <div key={k}>
              {i > 0 && <Divider />}
              <div className="flex items-center justify-between py-3">
                <span className="text-[13px] text-ink-500">{k}</span>
                <span className="text-[15px] font-medium text-ink-900">{v}</span>
              </div>
            </div>
          ))}
        </Card>

        <SectionLabel>Documents</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {isAc ? (
            <>
              <ListRow
                left={
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                    <FileText size={18} />
                  </span>
                }
                title="Operating manual"
                subtitle="Daikin FTXM-R series · added today"
              />
              <Divider />
              <ListRow
                left={
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                    <ShieldCheck size={18} />
                  </span>
                }
                title="Warranty"
                subtitle={`Valid until ${asset.warrantyUntil ?? '—'}`}
              />
            </>
          ) : (
            <ListRow
              left={
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                  <FileText size={18} />
                </span>
              }
              title="No documents yet"
              subtitle="Manuals and warranties can be added on any visit"
            />
          )}
        </Card>

        <SectionLabel>Checkpoints watching this asset</SectionLabel>
        <Card pad={false} className="px-5 py-2">
          {(isAc
            ? ['Check air-conditioning operation', 'Clean filters each season']
            : [`Check ${asset.name.toLowerCase()} operation`]
          ).map((c) => (
            <div key={c} className="flex items-center gap-3 py-2">
              <ClipboardList size={16} className="shrink-0 text-navy-700" />
              <span className="text-[14px] text-ink-700">{c}</span>
            </div>
          ))}
        </Card>

        <SectionLabel>Timeline</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {timeline.map((e, i) => (
            <div key={e.id}>
              {i > 0 && <Divider />}
              <div className="flex gap-3.5 py-3.5">
                <span
                  className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    e.kind === 'service' ? 'bg-gold-500/15 text-gold-600' : 'bg-cream-100 text-navy-700'
                  }`}
                >
                  {e.kind === 'service' ? <Wrench size={17} /> : <History size={17} />}
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
      </div>
      <BottomNav active="passport" />
    </Shell>
  )
}

/* ————————————————— Activity detail ————————————————— */

export function ActivityDetail({ id }: { id: string }) {
  const { back } = useRouter()
  const event = RECENT_ACTIVITY.find((e) => e.id === id) ?? RECENT_ACTIVITY[0]

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title="Activity" subtitle={event.date} />
        <Card>
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream-100 text-navy-700">
              {event.kind === 'service' ? <Wrench size={20} /> : <BookOpen size={20} />}
            </span>
            <div>
              <h2 className="text-[18px] font-semibold text-ink-900">{event.title}</h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-700">{event.detail}</p>
              <p className="mt-3 text-[13px] text-ink-400">
                Recorded in the property memory — it will stay part of Casa del Mar's history.
              </p>
            </div>
          </div>
        </Card>
      </div>
      <BottomNav active="passport" />
    </Shell>
  )
}
