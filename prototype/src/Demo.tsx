import { useState } from 'react'
import type { ReactNode } from 'react'
import { Check, ChevronLeft, ChevronRight, CircleAlert, MessageSquare, RotateCcw, ShieldCheck, X } from 'lucide-react'
import { useRouter } from './lib/router'
import { MOISTURE_FINDING, OWNER_VISIT_STORY, REOBS_VOICE } from './scenario'
import { Card, MockPhoto, Shell, StatusBadge } from './ui'

/**
 * Guided demo — a five-minute curated walkthrough of the LUZ loop:
 * Create → Inspect → Report → Care. Manual navigation, value captions,
 * fully interactive (never a video).
 */

interface DemoStep {
  phase: string
  caption: string
  value: string
  scene: ReactNode
}

function PhotoPair({ then, now }: { then: string; now: string }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <div>
        <MockPhoto seed={then} ratio="3/4" label="12 June" />
        <div className="mt-1.5 text-center text-[12px] font-medium text-ink-500">Then</div>
      </div>
      <div>
        <MockPhoto seed={now} ratio="3/4" label="Today" />
        <div className="mt-1.5 text-center text-[12px] font-medium text-ink-500">Now</div>
      </div>
    </div>
  )
}

const STEPS: DemoStep[] = [
  {
    phase: 'The situation',
    caption: 'Casa del Mar needs attention.',
    value: 'Every LUZ property carries a live status — not a folder of old reports.',
    scene: (
      <Card pad={false} className="overflow-hidden">
        <div className="relative">
          <MockPhoto seed="villa-hero" ratio="16/9" rounded="" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="font-display text-[20px] font-semibold text-cream-50">Casa del Mar</div>
              <div className="text-[12px] text-cream-50/70">Bolonia, Cádiz</div>
            </div>
            <StatusBadge kind="warn">Attention needed</StatusBadge>
          </div>
        </div>
      </Card>
    ),
  },
  {
    phase: 'The situation',
    caption: 'One open finding, watched since June.',
    value: 'Findings never vanish into PDFs — they stay open until reality closes them.',
    scene: (
      <Card pad={false} className="overflow-hidden">
        <div className="flex gap-4 p-4">
          <MockPhoto seed="k-sink-then" ratio="1/1" className="w-20 shrink-0" rounded="rounded-xl" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-warn-500">
              <CircleAlert size={14} />
              <span className="text-[12px] font-semibold uppercase tracking-[0.07em]">Open finding</span>
            </div>
            <div className="mt-1 text-[15px] font-semibold text-ink-900">{MOISTURE_FINDING.title}</div>
            <div className="mt-0.5 text-[13px] text-ink-500">Moderate · first seen 12 June 2026</div>
          </div>
        </div>
      </Card>
    ),
  },
  {
    phase: 'Inspect',
    caption: 'The inspector starts today’s visit with a colleague-style briefing.',
    value: 'No archaeology in old reports — the property briefs its own inspector.',
    scene: (
      <Card className="bg-navy-900" pad={false}>
        <p className="p-5 text-[15px] leading-relaxed text-cream-50">
          Casa del Mar was stable at the last visit. Today, recheck the moisture below the kitchen sink, confirm the
          owner’s shutter request and inspect the pool equipment.
        </p>
      </Card>
    ),
  },
  {
    phase: 'Inspect',
    caption: 'One tap at the doorway — the Kitchen is identified.',
    value: 'The room recognises itself. No menus, no searching.',
    scene: (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ok-100">
          <Check size={40} strokeWidth={3} className="text-ok-500" />
        </div>
        <div className="font-display mt-4 text-[24px] font-semibold text-ink-900">Kitchen recognised</div>
        <p className="mt-1.5 max-w-[260px] text-[14px] text-ink-500">Everything that mattered here last time is already waiting.</p>
      </div>
    ),
  },
  {
    phase: 'Inspect',
    caption: 'The inspector sees what mattered last time.',
    value: 'June’s photo appears exactly where it was taken — memory in place.',
    scene: (
      <div>
        <MockPhoto seed="k-sink-then" ratio="16/10" label="12 June · below the sink" />
        <p className="mt-3 text-center text-[13px] text-ink-500">Moisture patch · moderate · seal worn</p>
      </div>
    ),
  },
  {
    phase: 'Inspect',
    caption: 'New evidence is compared with the previous visit.',
    value: 'Same angle, side by side — change becomes visible, not debatable.',
    scene: <PhotoPair then="k-sink-then" now="k-sink-now" />,
  },
  {
    phase: 'Inspect',
    caption: 'The finding is marked improved — and stays open.',
    value: 'History is append-only. Today’s good news never erases June’s evidence.',
    scene: (
      <Card pad={false} className="px-5 py-4">
        <div className="flex items-center gap-2 text-ok-500">
          <Check size={18} strokeWidth={3} />
          <span className="text-[16px] font-semibold">Improved</span>
        </div>
        <p className="mt-2 text-[14px] italic leading-snug text-ink-500">“{REOBS_VOICE}”</p>
        <div className="mt-3 rounded-xl bg-cream-100 px-3.5 py-2.5 text-[13px] text-ink-700">
          Finding remains <span className="font-semibold">open</span> · seal replacement still recommended
        </div>
      </Card>
    ),
  },
  {
    phase: 'Inspect',
    caption: 'A loose terrace-door handle is recorded in seconds.',
    value: 'Photo, a spoken sentence, done — the checklist never limits the inspector’s eyes.',
    scene: (
      <Card pad={false} className="overflow-hidden">
        <MockPhoto seed="terrace-handle" ratio="16/9" rounded="" />
        <div className="p-4">
          <div className="text-[15px] font-semibold text-ink-900">Loose terrace-door handle</div>
          <div className="mt-1 flex gap-2">
            <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[12px] font-semibold text-ink-700">Minor</span>
            <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[12px] text-ink-500">Draft for review</span>
          </div>
        </div>
      </Card>
    ),
  },
  {
    phase: 'Inspect',
    caption: 'Healthy checkpoints take one tap each.',
    value: 'The 90% case costs a second — attention goes where something is wrong.',
    scene: (
      <Card pad={false} className="px-5 py-2">
        {['Sink and plumbing', 'Dishwasher', 'Window seals', 'Shutters — as requested', 'Ceiling'].map((c, i) => (
          <div key={c} className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ok-100 text-ok-500">
              <Check size={15} strokeWidth={3} />
            </span>
            <span className="text-[14px] text-ink-700">{c}</span>
          </div>
        ))}
      </Card>
    ),
  },
  {
    phase: 'Report',
    caption: 'The visit is reviewed and approved — deliberately.',
    value: 'Approval is the inspector’s signature. Only then does today join the record.',
    scene: (
      <div>
        <Card pad={false} className="px-5 py-4">
          <div className="text-[14px] font-semibold text-ink-900">2 drafts · 32 checkpoints · 2 meters</div>
          <p className="mt-1.5 text-[13px] text-ink-500">Every draft confirmed by a person before it becomes permanent.</p>
        </Card>
        <div className="mt-3 rounded-2xl bg-navy-900 px-4 py-3.5 text-center">
          <p className="text-[13px] text-cream-50">Approving makes this visit part of the permanent property record.</p>
        </div>
      </div>
    ),
  },
  {
    phase: 'Care',
    caption: 'The owner receives clarity without reading an operational report.',
    value: 'The owner receives a calm update — evidence behind every sentence.',
    scene: (
      <Card pad={false} className="px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-[13px] font-semibold text-cream-50">
            W
          </span>
          <div>
            <div className="text-[14px] font-semibold text-ink-900">Walter visited today</div>
            <div className="text-[12px] text-ink-500">Everything checked · nothing urgent</div>
          </div>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{OWNER_VISIT_STORY.text.slice(0, 180)}…</p>
      </Card>
    ),
  },
  {
    phase: 'Care',
    caption: 'The property timeline now contains the new visit.',
    value: 'Every visit compounds — the house gets easier to care for, forever.',
    scene: (
      <Card pad={false} className="px-5 py-2">
        {[
          ['Today', 'Inspection completed · owner updated'],
          ['Today', 'Moisture rechecked — improved'],
          ['12 June', 'Moisture finding created'],
          ['12 June', 'Property Passport created'],
        ].map(([d, t], i) => (
          <div key={t} className={`flex gap-3 py-2.5 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
            <span className="w-14 shrink-0 text-[12px] font-semibold text-ink-400">{d}</span>
            <span className="text-[13px] text-ink-700">{t}</span>
          </div>
        ))}
      </Card>
    ),
  },
  {
    phase: 'Care',
    caption: 'Casa del Mar is now Stable.',
    value: 'Create → Inspect → Report → Care. Every loop makes the next one more informed.',
    scene: (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/15">
          <ShieldCheck size={38} className="text-gold-600" />
        </div>
        <div className="mt-4">
          <StatusBadge kind="ok">Stable</StatusBadge>
        </div>
        <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-ink-500">
          One issue improving, one minor issue recorded, an owner who can stop worrying.
        </p>
      </div>
    ),
  },
]

export function GuidedDemo() {
  const { navigate } = useRouter()
  const [i, setI] = useState(0)
  const step = STEPS[i]
  const last = i === STEPS.length - 1

  return (
    <Shell>
      <div className="flex min-h-dvh flex-col px-5 pb-44 pt-4">
        {/* header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-gold-700">{step.phase}</div>
            <div className="text-[13px] text-ink-500">
              Guided demo · {i + 1} of {STEPS.length}
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            aria-label="Exit demo"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-500 active:bg-black/5"
          >
            <X size={22} />
          </button>
        </div>

        {/* caption */}
        <h1 className="font-display text-[26px] font-semibold leading-[1.2] text-ink-900">{step.caption}</h1>

        {/* scene */}
        <div className="mt-5">{step.scene}</div>

        {/* value line */}
        <p className="mt-4 rounded-2xl bg-gold-500/10 px-4 py-3 text-[14px] leading-snug text-ink-700">{step.value}</p>

        <BottomControls
          onPrev={i > 0 ? () => setI(i - 1) : undefined}
          onNext={!last ? () => setI(i + 1) : undefined}
          onRestart={() => setI(0)}
          onFinish={last ? () => navigate('/passport') : undefined}
        />
      </div>
    </Shell>
  )
}

function BottomControls({
  onPrev,
  onNext,
  onRestart,
  onFinish,
}: {
  onPrev?: () => void
  onNext?: () => void
  onRestart: () => void
  onFinish?: () => void
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-[430px] bg-gradient-to-t from-cream-50 via-cream-50/95 to-transparent px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10">
        <div className="pointer-events-auto flex items-center gap-2.5">
          <button
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Previous"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cream-300 bg-white text-ink-700 active:bg-cream-100 disabled:opacity-30"
          >
            <ChevronLeft size={22} />
          </button>
          {onFinish ? (
            <button
              onClick={onFinish}
              className="h-14 flex-1 rounded-2xl bg-gold-500 text-[17px] font-semibold text-navy-950 active:bg-gold-600"
            >
              Explore the Passport
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gold-500 text-[17px] font-semibold text-navy-950 active:bg-gold-600"
            >
              Continue <ChevronRight size={20} />
            </button>
          )}
          <button
            onClick={onRestart}
            aria-label="Restart demo"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cream-300 bg-white text-ink-700 active:bg-cream-100"
          >
            <RotateCcw size={19} />
          </button>
        </div>
      </div>
    </div>
  )
}
