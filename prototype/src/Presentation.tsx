import type { ReactNode } from 'react'
import { Check, CircleAlert, MessageSquare, ShieldCheck } from 'lucide-react'
import { useRouter } from './lib/router'
import { MOISTURE_FINDING, OWNER_VISIT_STORY } from './scenario'
import { Card, MockPhoto, StatusBadge } from './ui'

/**
 * Presentation route — selected mobile screens in polished iPhone frames
 * beside concise explanatory text. For showing partners and customers.
 */

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[300px] shrink-0">
      <div className="rounded-[2.6rem] border-[10px] border-navy-950 bg-navy-950 shadow-raised">
        <div className="relative overflow-hidden rounded-[2rem] bg-cream-50">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-950" />
          <div className="pointer-events-none h-[560px] overflow-hidden pt-9">
            <div className="px-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Slide {
  title: string
  text: string
  screen: ReactNode
}

const SLIDES: Slide[] = [
  {
    title: 'Every property carries its status',
    text: 'Casa del Mar is not a folder of reports. It is a living record with a current, explained status — and an inspector who is briefed by the property itself before every visit.',
    screen: (
      <div>
        <div className="relative overflow-hidden rounded-3xl">
          <MockPhoto seed="villa-hero" ratio="16/10" rounded="rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between">
            <div>
              <div className="font-display text-[18px] font-semibold text-cream-50">Casa del Mar</div>
              <div className="text-[11px] text-cream-50/70">Bolonia, Cádiz</div>
            </div>
            <StatusBadge kind="warn">Attention needed</StatusBadge>
          </div>
        </div>
        <Card pad={false} className="mt-3 overflow-hidden">
          <div className="flex gap-3 p-3.5">
            <MockPhoto seed="k-sink-then" ratio="1/1" className="w-14 shrink-0" rounded="rounded-lg" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-warn-500">
                <CircleAlert size={12} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.07em]">Open finding</span>
              </div>
              <div className="mt-0.5 text-[13px] font-semibold text-ink-900">{MOISTURE_FINDING.title}</div>
              <div className="text-[11px] text-ink-500">Moderate · first seen 12 June</div>
            </div>
          </div>
        </Card>
        <Card className="mt-3 bg-navy-900" pad={false}>
          <p className="p-4 text-[12px] leading-relaxed text-cream-50">
            Casa del Mar was stable at the last visit. Today, recheck the moisture below the kitchen sink and confirm the
            owner’s shutter request.
          </p>
        </Card>
      </div>
    ),
  },
  {
    title: 'Evidence compares itself',
    text: 'The inspector re-photographs the June finding from the same angle. Change becomes visible, not debatable — and history is append-only: today’s improvement never erases June’s evidence.',
    screen: (
      <div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <MockPhoto seed="k-sink-then" ratio="3/4" label="12 June" />
            <div className="mt-1 text-center text-[11px] font-medium text-ink-500">Then</div>
          </div>
          <div>
            <MockPhoto seed="k-sink-now" ratio="3/4" label="Today" />
            <div className="mt-1 text-center text-[11px] font-medium text-ink-500">Now</div>
          </div>
        </div>
        <Card pad={false} className="mt-3 px-4 py-3">
          <div className="flex items-center gap-2 text-ok-500">
            <Check size={15} strokeWidth={3} />
            <span className="text-[14px] font-semibold">Improved · still open</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-snug text-ink-500">
            “Area is drier than at the previous visit. The seal should still be replaced.”
          </p>
        </Card>
        <div className="mt-3 rounded-xl bg-cream-100 px-3.5 py-2.5 text-[11px] leading-snug text-ink-700">
          Nothing is overwritten. Every visit adds a layer to the property's memory.
        </div>
      </div>
    ),
  },
  {
    title: 'The owner receives calm, not paperwork',
    text: 'Minutes after approval, the owner sees a clear answer — everything under control, what improved, what was found, what happens next. Every sentence is backed by evidence they can open.',
    screen: (
      <div>
        <div className="relative overflow-hidden rounded-3xl">
          <MockPhoto seed="villa-hero" ratio="16/11" rounded="rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="font-display text-[18px] font-semibold text-cream-50">Casa del Mar</div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ok-500">
                <Check size={13} strokeWidth={3} className="text-white" />
              </span>
              <span className="text-[14px] font-semibold text-cream-50">Everything is under control</span>
            </div>
          </div>
        </div>
        <Card pad={false} className="mt-3 px-4 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-[11px] font-semibold text-cream-50">
              W
            </span>
            <span className="text-[12px] font-semibold text-ink-900">Walter visited today</span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-700">{OWNER_VISIT_STORY.text.slice(0, 150)}…</p>
        </Card>
      </div>
    ),
  },
  {
    title: 'Ready for the worst moment',
    text: 'The Emergency Card puts every shut-off — photographed, located, described in plain words — one tap away. Shareable with a neighbour at 2 a.m., without ever exposing a code.',
    screen: (
      <div>
        <div className="flex items-center gap-3 rounded-2xl bg-navy-900 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400">
            <ShieldCheck size={22} />
          </span>
          <p className="text-[11px] leading-snug text-cream-50/90">
            Where to act when every minute counts — shut-offs with photos and plain directions.
          </p>
        </div>
        <Card pad={false} className="mt-3 overflow-hidden">
          <div className="grid grid-cols-2 gap-0.5">
            <MockPhoto seed="utility-valve" ratio="4/3" rounded="" label="Close-up" />
            <MockPhoto seed="utility-valve-wide" ratio="4/3" rounded="" label="Surroundings" />
          </div>
          <div className="p-3.5">
            <div className="text-[12px] font-semibold text-ink-900">Main water shut-off</div>
            <p className="mt-1 text-[11px] leading-snug text-ink-700">Utility room, left wall, below the shelving unit.</p>
          </div>
        </Card>
      </div>
    ),
  },
]

export function PresentationRoute() {
  const { navigate } = useRouter()
  return (
    <div className="min-h-dvh bg-navy-950">
      <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 font-display text-[16px] font-bold text-navy-950">
              L
            </div>
            <div>
              <h1 className="font-display text-[24px] font-semibold text-cream-50">LUZ — the property that remembers</h1>
              <p className="text-[13px] text-cream-50/65">Create → Inspect → Report → Care</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="rounded-xl border border-white/20 px-4 py-2.5 text-[13px] font-semibold text-cream-50/80 active:bg-white/10"
          >
            Back to launcher
          </button>
        </div>

        <div className="mt-12 flex flex-col gap-16">
          {SLIDES.map((s, i) => (
            <div
              key={s.title}
              className={`flex flex-col items-center gap-8 md:flex-row md:gap-14 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <PhoneFrame>{s.screen}</PhoneFrame>
              <div className="max-w-[420px]">
                <div className="text-[13px] font-semibold uppercase tracking-[0.1em] text-gold-400">{`0${i + 1}`}</div>
                <h2 className="font-display mt-2 text-[28px] font-semibold leading-[1.2] text-cream-50">{s.title}</h2>
                <p className="mt-3.5 text-[16px] leading-relaxed text-cream-50/70">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-[12px] text-cream-50/40">
          Simulated prototype · designed imagery · LUZ Spatial Lab 2026
        </p>
      </div>
    </div>
  )
}
