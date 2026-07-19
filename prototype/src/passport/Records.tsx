import { useState } from 'react'
import { BookOpen, Check, CircleAlert, FileText, History, Share2, Wrench } from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import {
  DOCUMENTS,
  MOISTURE_FINDING,
  REOBS_VOICE,
  TERRACE_FINDING,
  activityEvents,
} from '../scenario'
import { Card, Divider, ListRow, MockPhoto, SectionLabel, Shell, StatusBadge, TopBar } from '../ui'
import { BottomNav } from './Passport'

/* ————————————————— Finding detail (append-only timeline) ————————————————— */

export function FindingDetail({ id }: { id: string }) {
  const { back } = useRouter()
  const { state } = useStore()
  const approved = state.visit.approved
  const isMoisture = id !== TERRACE_FINDING.id

  if (!isMoisture) {
    return (
      <Shell>
        <div className="px-5 pb-28 pt-3">
          <TopBar onBack={back} title={state.visit.finding.description} subtitle="Living Room · finding" />
          <div className="flex items-center justify-between">
            <StatusBadge kind="neutral">{state.visit.finding.severity} · new today</StatusBadge>
            <span className="text-[13px] text-ink-500">Recorded today</span>
          </div>
          <SectionLabel>Evidence</SectionLabel>
          <MockPhoto seed="terrace-handle" ratio="16/10" rounded="rounded-2xl" label="Today" />
          <SectionLabel>Recommendation</SectionLabel>
          <Card pad={false} className="px-5 py-4">
            <p className="text-[15px] leading-relaxed text-ink-700">{state.visit.finding.recommendation}</p>
          </Card>
          <SectionLabel>Timeline</SectionLabel>
          <Card pad={false} className="px-5 py-1">
            <div className="py-3.5">
              <div className="text-[12px] font-semibold text-ink-400">Today</div>
              <div className="mt-0.5 text-[15px] font-medium text-ink-900">First observed · {state.visit.finding.severity}</div>
              <p className="mt-0.5 text-[13px] text-ink-500">Recorded at the terrace-door checkpoint with photo and voice note.</p>
            </div>
          </Card>
        </div>
        <BottomNav active="passport" />
      </Shell>
    )
  }

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title={MOISTURE_FINDING.title} subtitle="Kitchen · finding" />

        <div className="flex items-center justify-between">
          <StatusBadge kind={approved ? 'ok' : 'warn'}>
            {approved ? 'Improved · still open' : 'Open · moderate'}
          </StatusBadge>
          <span className="text-[13px] text-ink-500">First seen {MOISTURE_FINDING.firstSeen}</span>
        </div>

        {approved && (
          <>
            <SectionLabel>Then / now</SectionLabel>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <MockPhoto seed="k-sink-then" ratio="3/4" label="12 June" />
                <div className="mt-1.5 text-center text-[12px] font-medium text-ink-500">First observed</div>
              </div>
              <div>
                <MockPhoto seed="k-sink-now" ratio="3/4" label="Today" />
                <div className="mt-1.5 text-center text-[12px] font-medium text-ink-500">Rechecked — improved</div>
              </div>
            </div>
          </>
        )}
        {!approved && (
          <>
            <SectionLabel>Evidence</SectionLabel>
            <MockPhoto seed="k-sink-then" ratio="16/10" rounded="rounded-2xl" label="12 June 2026" />
          </>
        )}

        <SectionLabel>Recommendation</SectionLabel>
        <Card pad={false} className="px-5 py-4">
          <p className="text-[15px] leading-relaxed text-ink-700">{state.visit.reobsRecommendation}</p>
          <p className="mt-1.5 text-[13px] text-ink-500">Remains open until the seal is replaced and verified.</p>
        </Card>

        <SectionLabel>Timeline — nothing is overwritten</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          {approved && (
            <div className="py-3.5">
              <div className="text-[12px] font-semibold text-ink-400">19 July 2026 · today</div>
              <div className="mt-0.5 flex items-center gap-2 text-[15px] font-medium text-ink-900">
                Improved <Check size={15} strokeWidth={3} className="text-ok-500" />
              </div>
              <p className="mt-0.5 text-[13px] leading-snug text-ink-500">
                New comparable photo · “{REOBS_VOICE}” · recommendation remains open.
              </p>
            </div>
          )}
          <div className={approved ? 'border-t border-cream-200 py-3.5' : 'py-3.5'}>
            <div className="text-[12px] font-semibold text-ink-400">12 June 2026</div>
            <div className="mt-0.5 flex items-center gap-2 text-[15px] font-medium text-ink-900">
              First observed <CircleAlert size={15} className="text-warn-500" />
            </div>
            <p className="mt-0.5 text-[13px] leading-snug text-ink-500">
              Moderate · initial photo captured below the sink · seal already worn.
            </p>
          </div>
        </Card>
      </div>
      <BottomNav active="passport" />
    </Shell>
  )
}

/* ————————————————— Activity (filtered) ————————————————— */

const FILTERS = ['All', 'Visits', 'Findings', 'Assets', 'Services', 'Documents'] as const
type Filter = (typeof FILTERS)[number]

const FILTER_KIND: Record<Exclude<Filter, 'All'>, string[]> = {
  Visits: ['visit', 'passport'],
  Findings: ['finding'],
  Assets: ['asset'],
  Services: ['service'],
  Documents: ['document'],
}

export function ActivityScreen() {
  const { back } = useRouter()
  const { state } = useStore()
  const [filter, setFilter] = useState<Filter>('All')
  const events = activityEvents(state).filter(
    (e) => filter === 'All' || FILTER_KIND[filter].includes(e.kind),
  )

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title="Activity" subtitle="Casa del Mar · the connected history" />

        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                filter === f ? 'bg-navy-900 text-cream-50' : 'bg-cream-100 text-ink-500 active:bg-cream-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <Card pad={false} className="mt-3 px-5 py-1">
          {events.length === 0 && (
            <p className="py-6 text-center text-[14px] text-ink-500">Nothing here yet — it will fill with every visit.</p>
          )}
          {events.map((e, i) => (
            <div key={e.id} className={i > 0 ? 'border-t border-cream-200' : ''}>
              <div className="flex gap-3.5 py-3.5">
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    e.kind === 'finding'
                      ? 'bg-warn-100 text-warn-500'
                      : e.kind === 'service'
                        ? 'bg-gold-500/15 text-gold-600'
                        : 'bg-cream-100 text-navy-700'
                  }`}
                >
                  {e.kind === 'finding' ? <CircleAlert size={16} /> : e.kind === 'asset' ? <Wrench size={16} /> : <History size={16} />}
                </span>
                <div className="min-w-0">
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

/* ————————————————— Documents ————————————————— */

export function DocumentsScreen() {
  const { back, navigate } = useRouter()
  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title="Documents" subtitle={`${DOCUMENTS.length} in the property memory`} />
        <Card pad={false} className="px-5 py-1">
          {DOCUMENTS.map((d, i) => (
            <div key={d.id}>
              {i > 0 && <Divider />}
              <ListRow
                left={
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                    <FileText size={18} />
                  </span>
                }
                title={d.name}
                subtitle={`${d.kind} · ${d.meta}`}
                onClick={() => navigate(`/passport/doc/${d.id}`)}
              />
            </div>
          ))}
        </Card>
      </div>
      <BottomNav active="passport" />
    </Shell>
  )
}

export function DocumentDetail({ id }: { id: string }) {
  const { back } = useRouter()
  const doc = DOCUMENTS.find((d) => d.id === id) ?? DOCUMENTS[0]
  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title={doc.name} subtitle={doc.kind} />
        {/* simulated document page */}
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <div className="border-b border-cream-200 pb-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">{doc.kind}</div>
            <div className="font-display mt-1 text-[22px] font-semibold text-ink-900">{doc.name}</div>
            <div className="mt-1 text-[12px] text-ink-500">Casa del Mar · {doc.meta}</div>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-ink-700">{doc.summary}</p>
          <div className="mt-5 space-y-2.5">
            {[92, 100, 84, 96, 70].map((w, i) => (
              <div key={i} className="h-2.5 rounded-full bg-cream-100" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-cream-100 px-3.5 py-2.5">
            <BookOpen size={15} className="shrink-0 text-navy-700" />
            <span className="text-[12px] text-ink-500">Preview only — the full document opens in the real product.</span>
          </div>
        </div>
        <button className="mx-auto mt-4 flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-semibold text-gold-700 active:bg-black/5">
          <Share2 size={16} /> Share with a contractor — simulated
        </button>
      </div>
      <BottomNav active="passport" />
    </Shell>
  )
}
