import { BookOpen, ChevronRight, Footprints, RotateCcw, UserRound } from 'lucide-react'
import { useRouter } from './lib/router'
import { useStore } from './store'
import { MockPhoto, Shell } from './ui'

/**
 * Prototype launcher — the tester chooses a journey.
 * The main tested journey is the Founding Walk.
 */
export function Launcher() {
  const { navigate } = useRouter()
  const { state, dispatch, reset } = useStore()

  const walkInProgress = state.walkStartedAt !== null && !state.passportCreated

  const start = () => {
    navigate('/walk')
  }

  return (
    <Shell tone="dark">
      <div className="flex min-h-dvh flex-col px-6 pb-8 pt-14">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500 font-display text-[17px] font-bold text-navy-950">
            L
          </div>
          <div>
            <div className="text-[15px] font-semibold tracking-wide text-cream-50">LUZ</div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-cream-50/50">Property Passport</div>
          </div>
        </div>

        <h1 className="font-display mt-6 text-[34px] font-semibold leading-[1.15] text-cream-50">
          Every property deserves a memory.
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-cream-50/60">
          A clickable prototype of the Founding Walk — how a property becomes a Property Passport during a single visit.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={start}
            className="group relative overflow-hidden rounded-3xl bg-gold-500 p-5 text-left active:bg-gold-600"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-950/15 text-navy-950">
                <Footprints size={26} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[18px] font-semibold text-navy-950">
                  {walkInProgress ? 'Resume Founding Walk' : 'Start Founding Walk'}
                </span>
                <span className="mt-0.5 block text-[13px] text-navy-950/70">
                  {walkInProgress ? 'Continue where you left off — nothing was lost' : 'The main journey · Casa del Mar'}
                </span>
              </span>
              <ChevronRight size={22} className="shrink-0 text-navy-950/60" />
            </div>
          </button>

          <button
            onClick={() => navigate('/passport')}
            className="rounded-3xl bg-white/[0.07] p-5 text-left active:bg-white/[0.11]"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cream-50">
                <BookOpen size={24} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] font-semibold text-cream-50">View Completed Property Passport</span>
                <span className="mt-0.5 block text-[13px] text-cream-50/50">The result — rooms, assets, Emergency Card</span>
              </span>
              <ChevronRight size={22} className="shrink-0 text-cream-50/40" />
            </div>
          </button>

          <button
            onClick={() => navigate('/owner')}
            className="rounded-3xl bg-white/[0.07] p-5 text-left active:bg-white/[0.11]"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cream-50">
                <UserRound size={24} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] font-semibold text-cream-50">View Owner Experience</span>
                <span className="mt-0.5 block text-[13px] text-cream-50/50">"Is my house okay?" — answered in seconds</span>
              </span>
              <ChevronRight size={22} className="shrink-0 text-cream-50/40" />
            </div>
          </button>
        </div>

        <div className="mt-auto pt-10">
          <div className="overflow-hidden rounded-3xl">
            <MockPhoto seed="villa-hero" ratio="16/6" rounded="" label="Casa del Mar · Bolonia, Cádiz" />
          </div>
          <button
            onClick={reset}
            className="mx-auto mt-5 flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-medium text-cream-50/50 active:bg-white/10"
          >
            <RotateCcw size={16} /> Reset prototype
          </button>
        </div>
      </div>
    </Shell>
  )
}
