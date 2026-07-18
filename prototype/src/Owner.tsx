import { useState } from 'react'
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  Droplets,
  History,
  Waves,
  Wrench,
  Zap,
} from 'lucide-react'
import { useRouter } from './lib/router'
import { OWNER_TIMELINE, PROPERTY, VISIT_STORY } from './data'
import { Card, Divider, ListRow, MockPhoto, SectionLabel, Shell, TopBar } from './ui'
import { BottomNav } from './passport/Passport'

/**
 * Owner experience — warmer and simpler than the inspector tool.
 * It must answer "Is my house okay?" within ten seconds.
 */

export function OwnerHome() {
  const { navigate } = useRouter()

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
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ok-500">
                <CircleCheck size={19} className="text-white" />
              </span>
              <span className="text-[18px] font-semibold text-cream-50">Everything looks good</span>
            </div>
            <p className="mt-1.5 text-[13px] text-cream-50/70">
              Last inspected today · Next visit {PROPERTY.nextVisit} · No open issues
            </p>
          </div>
        </div>

        {/* Visit story */}
        <SectionLabel>Latest visit</SectionLabel>
        <Card pad={false} className="overflow-hidden" onClick={() => navigate('/owner/story')}>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-[15px] font-semibold text-cream-50">
                W
              </span>
              <div>
                <div className="text-[15px] font-semibold text-ink-900">{VISIT_STORY.inspector} visited today</div>
                <div className="text-[13px] text-ink-500">Founding visit · everything checked</div>
              </div>
            </div>
            <p className="mt-3.5 text-[15px] leading-relaxed text-ink-700">{VISIT_STORY.text}</p>
            <div className="mt-3.5 flex items-center gap-1 text-[14px] font-semibold text-gold-700">
              Read the full visit story <ChevronRight size={16} />
            </div>
          </div>
        </Card>

        {/* Status tiles */}
        <SectionLabel>At a glance</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5">
          <Card pad={false} className="p-4" onClick={() => navigate('/passport/room/pool-area')}>
            <div className="flex items-center gap-2 text-navy-700">
              <Waves size={18} />
              <span className="text-[13px] font-semibold text-ink-500">Pool</span>
            </div>
            <div className="mt-1.5 text-[16px] font-semibold text-ink-900">Water healthy</div>
            <div className="text-[12px] text-ink-500">Level at skimmer midpoint</div>
          </Card>
          <Card pad={false} className="p-4">
            <div className="flex items-center gap-2 text-navy-700">
              <Zap size={18} />
              <span className="text-[13px] font-semibold text-ink-500">Utilities</span>
            </div>
            <div className="mt-1.5 text-[16px] font-semibold text-ink-900">Usage normal</div>
            <div className="text-[12px] text-ink-500">Similar to recent months</div>
          </Card>
          <Card pad={false} className="p-4">
            <div className="flex items-center gap-2 text-navy-700">
              <Droplets size={18} />
              <span className="text-[13px] font-semibold text-ink-500">Water</span>
            </div>
            <div className="mt-1.5 text-[16px] font-semibold text-ink-900">No leaks found</div>
            <div className="text-[12px] text-ink-500">Meters read today</div>
          </Card>
          <Card pad={false} className="p-4" onClick={() => navigate('/owner/timeline')}>
            <div className="flex items-center gap-2 text-navy-700">
              <History size={18} />
              <span className="text-[13px] font-semibold text-ink-500">History</span>
            </div>
            <div className="mt-1.5 text-[16px] font-semibold text-ink-900">Timeline started</div>
            <div className="text-[12px] text-ink-500">Every visit adds to it</div>
          </Card>
        </div>

        {/* Explore */}
        <SectionLabel>Explore your property</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <BookOpen size={19} />
              </span>
            }
            title="Property Passport"
            subtitle="Rooms, equipment and everything remembered"
            onClick={() => navigate('/passport')}
          />
          <Divider />
          <ListRow
            left={<MockPhoto seed="pool" ratio="1/1" className="w-10" rounded="rounded-lg" />}
            title="Pool Area"
            subtitle="Checked today — operating normally"
            onClick={() => navigate('/passport/room/pool-area')}
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <Wrench size={19} />
              </span>
            }
            title="Equipment history"
            subtitle="Air-conditioning, pool pump and more"
            onClick={() => navigate('/passport/asset/ac-living')}
          />
          <Divider />
          <ListRow
            left={
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
                <CalendarDays size={19} />
              </span>
            }
            title="Property timeline"
            subtitle="The story of Casa del Mar, visit by visit"
            onClick={() => navigate('/owner/timeline')}
          />
        </Card>
      </div>
      <BottomNav active="owner" />
    </Shell>
  )
}

/* ————————————————— Visit story ————————————————— */

export function OwnerStory() {
  const { back } = useRouter()
  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title="Visit story" subtitle="Today" />
        <MockPhoto seed="villa-hero" ratio="16/9" rounded="rounded-3xl" />
        <h1 className="font-display mt-5 text-[24px] font-semibold leading-snug text-ink-900">
          A calm first visit — and the start of Casa del Mar's memory
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-700">{VISIT_STORY.text}</p>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {VISIT_STORY.highlights.map((h) => (
            <div key={h.label} className="rounded-2xl bg-cream-100 px-4 py-3">
              <div className="text-[12px] text-ink-500">{h.label}</div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink-900">{h.value}</div>
            </div>
          ))}
        </div>

        <SectionLabel>From today's visit</SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          {['lr-overview', 'pool', 'garden'].map((s) => (
            <MockPhoto key={s} seed={s} ratio="1/1" />
          ))}
        </div>

        <p className="mt-6 rounded-2xl bg-navy-900/5 px-4 py-3.5 text-[14px] leading-relaxed text-ink-700">
          From now on, every visit will compare the property against today — so even small changes get noticed early.
        </p>
      </div>
      <BottomNav active="owner" />
    </Shell>
  )
}

/* ————————————————— Owner timeline ————————————————— */

export function OwnerTimeline() {
  const { back } = useRouter()
  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title="Property timeline" subtitle="Casa del Mar" />
        <Card pad={false} className="px-5 py-1">
          {OWNER_TIMELINE.map((e, i) => (
            <div key={e.id}>
              {i > 0 && <Divider />}
              <div className="flex gap-3.5 py-4">
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
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
        <p className="mt-4 text-center text-[13px] text-ink-400">
          The timeline grows with every inspection, repair and visit.
        </p>
      </div>
      <BottomNav active="owner" />
    </Shell>
  )
}
