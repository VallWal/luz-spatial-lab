import type { ReactNode } from 'react'
import {
  BookOpen,
  ChevronRight,
  CircleCheck,
  Footprints,
  Monitor,
  Play,
  Presentation,
  RotateCcw,
  Smartphone,
  UserRound,
} from 'lucide-react'
import { useRouter } from './lib/router'
import { useStore } from './store'
import { propertyStatus } from './scenario'
import { MockPhoto, Shell, StatusBadge } from './ui'

/**
 * Prototype launcher — a polished internal demo environment.
 * Every journey of the LUZ loop starts here.
 */

function Entry({
  icon,
  title,
  subtitle,
  onClick,
  primary,
}: {
  icon: ReactNode
  title: string
  subtitle: string
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={
        primary
          ? 'rounded-3xl bg-gold-500 p-5 text-left active:bg-gold-600'
          : 'rounded-3xl bg-white/[0.07] p-5 text-left active:bg-white/[0.11]'
      }
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
            primary ? 'bg-navy-950/15 text-navy-950' : 'bg-white/10 text-cream-50'
          }`}
        >
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block text-[17px] font-semibold ${primary ? 'text-navy-950' : 'text-cream-50'}`}>{title}</span>
          <span className={`mt-0.5 block text-[13px] ${primary ? 'text-navy-950/70' : 'text-cream-50/65'}`}>{subtitle}</span>
        </span>
        <ChevronRight size={22} className={`shrink-0 ${primary ? 'text-navy-950/60' : 'text-cream-50/40'}`} />
      </div>
    </button>
  )
}

export function Launcher() {
  const { navigate } = useRouter()
  const { state, reset } = useStore()

  const visitApproved = state.visit.approved
  const walkInProgress = state.walkStartedAt !== null && !state.passportCreated

  return (
    <Shell tone="dark">
      <div className="flex min-h-dvh flex-col px-6 pb-8 pt-12">
        {/* brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 font-display text-[17px] font-bold text-navy-950">
              L
            </div>
            <div>
              <div className="text-[15px] font-semibold tracking-wide text-cream-50">LUZ Spatial Lab</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-cream-50/65">Prototype 2 · simulated</div>
            </div>
          </div>
        </div>

        {/* property + state */}
        <div className="relative mt-6 overflow-hidden rounded-3xl">
          <MockPhoto seed="villa-hero" ratio="16/8" rounded="rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <div>
              <div className="font-display text-[22px] font-semibold text-cream-50">Casa del Mar</div>
              <div className="text-[12px] text-cream-50/70">Bolonia, Cádiz · the demonstration property</div>
            </div>
            <StatusBadge kind={visitApproved ? 'ok' : 'warn'}>{propertyStatus(state)}</StatusBadge>
          </div>
        </div>

        {/* state indicator */}
        <div className="mt-3 flex gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3 py-1.5 text-[12px] font-medium text-cream-50/80">
            <CircleCheck size={13} className="text-ok-500" /> Passport created
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3 py-1.5 text-[12px] font-medium text-cream-50/80">
            {visitApproved ? (
              <>
                <CircleCheck size={13} className="text-ok-500" /> Today's visit approved
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-gold-500" /> Today's visit pending
              </>
            )}
          </span>
        </div>

        {/* entries */}
        <div className="mt-6 flex flex-col gap-2.5">
          <Entry
            primary
            icon={<Play size={26} />}
            title="Play Guided Demo"
            subtitle="The whole LUZ loop in five minutes"
            onClick={() => navigate('/demo')}
          />
          <Entry
            icon={<Smartphone size={24} />}
            title="Start Today's Inspection"
            subtitle={visitApproved ? 'Approved — view the completed visit' : 'The recurring visit · Prototype 2'}
            onClick={() => navigate('/inspector')}
          />
          <Entry
            icon={<Footprints size={24} />}
            title="Create Property Passport"
            subtitle={walkInProgress ? 'Resume the Founding Walk' : 'The Founding Walk · Prototype 1'}
            onClick={() => navigate('/walk')}
          />
          <Entry
            icon={<BookOpen size={24} />}
            title="View Property Passport"
            subtitle="The living record — rooms, findings, Emergency Card"
            onClick={() => navigate('/passport')}
          />
          <Entry
            icon={<UserRound size={24} />}
            title="View Owner Portal"
            subtitle="“Is my house okay?” — answered in seconds"
            onClick={() => navigate('/owner')}
          />
        </div>

        {/* secondary */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => navigate('/operations')}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 py-3 text-[13px] font-semibold text-cream-50/80 active:bg-white/10"
          >
            <Monitor size={16} /> Operations Preview
          </button>
          <button
            onClick={() => navigate('/presentation')}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 py-3 text-[13px] font-semibold text-cream-50/80 active:bg-white/10"
          >
            <Presentation size={16} /> Presentation
          </button>
        </div>

        <div className="mt-auto pt-8">
          <button
            onClick={reset}
            className="mx-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-medium text-cream-50/65 active:bg-white/10"
          >
            <RotateCcw size={16} /> Reset prototype
          </button>
          <p className="mt-2 text-center text-[11px] text-cream-50/40">
            Simulated prototype · mock data only · nothing real is captured or sent
          </p>
        </div>
      </div>
    </Shell>
  )
}
