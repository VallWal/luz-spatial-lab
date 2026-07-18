import { AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import type { WalkStep } from '../store'
import { ProgressPips, Shell, StepFade } from '../ui'
import { StepEntrance, StepIntro, StepOverview, StepPrep } from './StepsIntro'
import { StepDiscover, StepPhotos, StepReview, StepScan } from './StepsRoom'
import { StepAssets, StepCheckpoints, StepRoomDone } from './StepsAssets'
import { StepFastRooms } from './StepsFast'
import { StepExterior, StepFinal, StepMoment, StepUtilities } from './StepsFinish'

/** Major phases shown as quiet progress pips during the walk. */
const PHASES: WalkStep[][] = [
  ['prep'],
  ['entrance'],
  ['overview'],
  ['discover', 'scan', 'review', 'photos', 'assets', 'checkpoints', 'room-done'],
  ['fast'],
  ['utilities'],
  ['exterior'],
  ['final'],
]

const BACK: Partial<Record<WalkStep, WalkStep>> = {
  prep: 'intro',
  entrance: 'prep',
  overview: 'entrance',
  discover: 'overview',
  scan: 'discover',
  review: 'scan',
  photos: 'review',
  assets: 'photos',
  checkpoints: 'assets',
  'room-done': 'checkpoints',
  fast: 'room-done',
  utilities: 'fast',
  exterior: 'utilities',
  final: 'exterior',
}

export function WalkFlow() {
  const { state, dispatch } = useStore()
  const { navigate } = useRouter()
  const step = state.walk.step

  const phaseIndex = PHASES.findIndex((p) => p.includes(step))
  const showChrome = step !== 'intro' && step !== 'moment'

  const goBack = () => {
    const prev = BACK[step]
    if (prev) dispatch({ type: 'go', step: prev })
    else navigate('/')
  }

  const tone = step === 'moment' || step === 'utilities' ? 'dark' : 'light'

  return (
    <Shell tone={tone}>
      {showChrome && (
        <div
          className={`sticky top-0 z-30 ${
            tone === 'dark' ? 'bg-navy-950/90' : 'bg-cream-50/90'
          } backdrop-blur-sm`}
        >
          <div className="flex h-14 items-center justify-between px-5">
            <div className="flex flex-col gap-1">
              <span
                className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${
                  tone === 'dark' ? 'text-cream-50/50' : 'text-ink-400'
                }`}
              >
                Founding Walk · Casa del Mar
              </span>
              <ProgressPips total={PHASES.length} done={Math.max(0, phaseIndex)} tone={tone} />
            </div>
            <button
              onClick={() => navigate('/')}
              aria-label="Pause the walk — progress is saved"
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                tone === 'dark' ? 'text-cream-50/70 active:bg-white/10' : 'text-ink-500 active:bg-black/5'
              }`}
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <StepFade k={step}>
          {step === 'intro' && <StepIntro />}
          {step === 'prep' && <StepPrep onBack={goBack} />}
          {step === 'entrance' && <StepEntrance onBack={goBack} />}
          {step === 'overview' && <StepOverview onBack={goBack} />}
          {step === 'discover' && <StepDiscover onBack={goBack} />}
          {step === 'scan' && <StepScan onBack={goBack} />}
          {step === 'review' && <StepReview onBack={goBack} />}
          {step === 'photos' && <StepPhotos onBack={goBack} />}
          {step === 'assets' && <StepAssets onBack={goBack} />}
          {step === 'checkpoints' && <StepCheckpoints onBack={goBack} />}
          {step === 'room-done' && <StepRoomDone onBack={goBack} />}
          {step === 'fast' && <StepFastRooms onBack={goBack} />}
          {step === 'utilities' && <StepUtilities onBack={goBack} />}
          {step === 'exterior' && <StepExterior onBack={goBack} />}
          {step === 'final' && <StepFinal onBack={goBack} />}
          {step === 'moment' && <StepMoment />}
        </StepFade>
      </AnimatePresence>
    </Shell>
  )
}
