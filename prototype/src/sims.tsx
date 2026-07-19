import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Camera, Check, Mic, Nfc, QrCode, RotateCcw } from 'lucide-react'
import { Button } from './ui'

/**
 * All hardware interactions are simulated. Nothing here touches a real
 * camera, NFC reader or microphone — the choreography exists purely to
 * let testers feel the intended field workflow.
 */

/* ————————————————————— Tag scan (NFC / QR) ————————————————————— */

export function TagScanSim({
  subject,
  onDone,
  onSkip,
  skipLabel = 'Skip for now',
}: {
  subject: string
  onDone: () => void
  onSkip?: () => void
  skipLabel?: string
}) {
  const [mode, setMode] = useState<'nfc' | 'qr'>('nfc')
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'success'>('idle')
  const reduce = useReducedMotion()

  useEffect(() => {
    if (phase !== 'scanning') return
    const t = window.setTimeout(() => setPhase('success'), reduce ? 400 : 1700)
    return () => window.clearTimeout(t)
  }, [phase, reduce])

  useEffect(() => {
    if (phase !== 'success') return
    const t = window.setTimeout(onDone, reduce ? 500 : 1100)
    return () => window.clearTimeout(t)
  }, [phase, onDone, reduce])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-3xl bg-navy-950 p-6" style={{ minHeight: 300 }}>
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(68,103,138,0.35),transparent)]" />
        <div className="relative flex h-full flex-col items-center justify-center gap-5 py-6 text-center">
          {phase === 'success' ? (
            <>
              <div className="anim-pop flex h-20 w-20 items-center justify-center rounded-full bg-ok-500">
                <Check size={40} strokeWidth={3} className="text-white" />
              </div>
              <div>
                <div className="text-[18px] font-semibold text-cream-50">Tag linked</div>
                <div className="mt-1 text-[14px] text-cream-50/70">{subject}</div>
              </div>
            </>
          ) : mode === 'nfc' ? (
            <>
              <div className="relative flex h-36 w-36 items-center justify-center">
                {phase === 'scanning' && (
                  <>
                    <div className="anim-ring absolute inset-0 rounded-full border-2 border-gold-400/70" />
                    <div
                      className="anim-ring absolute inset-0 rounded-full border-2 border-gold-400/40"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </>
                )}
                <div className="flex h-24 w-24 items-center justify-center rounded-[1.6rem] border border-white/15 bg-navy-800">
                  <Nfc size={40} className={phase === 'scanning' ? 'anim-breathe text-gold-400' : 'text-cream-50/70'} />
                </div>
              </div>
              <div>
                <div className="text-[18px] font-semibold text-cream-50">
                  {phase === 'scanning' ? 'Hold near the tag…' : `Tag the ${subject.toLowerCase()}`}
                </div>
                <div className="mx-auto mt-1 max-w-[260px] text-[14px] leading-relaxed text-cream-50/70">
                  {phase === 'scanning'
                    ? 'Keep the top of the phone close to the tag.'
                    : 'Hold the top of your phone against the small round tag.'}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20" />
                {(['top-0 left-0 border-t-4 border-l-4', 'top-0 right-0 border-t-4 border-r-4', 'bottom-0 left-0 border-b-4 border-l-4', 'bottom-0 right-0 border-b-4 border-r-4'] as const).map(
                  (pos) => (
                    <div key={pos} className={`absolute h-7 w-7 rounded-sm border-gold-400 ${pos}`} />
                  ),
                )}
                {phase === 'scanning' && (
                  <div className="absolute inset-x-3 top-1/2 h-16 -translate-y-1/2 overflow-hidden">
                    <div className="anim-scanline h-0.5 w-full bg-gold-400 shadow-[0_0_12px_2px_rgba(203,167,110,0.8)]" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <QrCode size={54} className="text-white/30" />
                </div>
              </div>
              <div>
                <div className="text-[18px] font-semibold text-cream-50">
                  {phase === 'scanning' ? 'Looking for the code…' : 'Point at the printed code'}
                </div>
                <div className="mt-1 text-[14px] text-cream-50/70">The square code on the same tag.</div>
              </div>
            </>
          )}
        </div>
      </div>

      {phase !== 'success' && (
        <div className="flex flex-col gap-2.5">
          <Button variant="gold" onClick={() => setPhase('scanning')} disabled={phase === 'scanning'}>
            {phase === 'scanning' ? 'Scanning…' : mode === 'nfc' ? 'Tap NFC tag' : 'Scan code'}
          </Button>
          <div className="flex gap-2.5">
            <Button
              variant="secondary"
              small
              onClick={() => {
                setMode(mode === 'nfc' ? 'qr' : 'nfc')
                setPhase('idle')
              }}
            >
              {mode === 'nfc' ? 'Scan QR instead' : 'Use NFC instead'}
            </Button>
            {onSkip && (
              <Button variant="quiet" small onClick={onSkip}>
                {skipLabel}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ————————————————————— Room scan ————————————————————— */

const GUIDANCE = ['Move slowly', 'Capture the corners', 'Include doors and windows', 'Lovely — almost there']

export function RoomScanSim({
  roomName,
  troubled = false,
  onFinish,
  onPhotosOnly,
}: {
  roomName: string
  /** simulate a difficult room (e.g. bathroom mirrors) */
  troubled?: boolean
  onFinish: () => void
  onPhotosOnly: () => void
}) {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [stalled, setStalled] = useState(false)
  const [attempt, setAttempt] = useState(1)
  const raf = useRef<number>(0)

  useEffect(() => {
    const started = performance.now()
    const duration = reduce ? 1500 : 7000
    const cap = troubled && attempt === 1 ? 42 : 100
    const tick = (now: number) => {
      const pct = Math.min(cap, ((now - started) / duration) * 100)
      setProgress(pct)
      if (pct >= cap) {
        if (cap < 100) setStalled(true)
        return
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [attempt, troubled, reduce])

  const msg = stalled
    ? 'Mirrors and glass are making this room hard to read'
    : GUIDANCE[Math.min(GUIDANCE.length - 1, Math.floor(progress / (100 / GUIDANCE.length)))]

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          minHeight: 380,
          background: 'linear-gradient(170deg,#1c2f45 0%,#12233a 55%,#0a1624 100%)',
        }}
      >
        {/* simulated viewfinder */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,rgba(201,169,110,0.10),transparent)]" />
        <svg viewBox="0 0 400 380" className="absolute inset-0 h-full w-full" aria-hidden>
          {/* softly animated room outline */}
          <g fill="none" stroke="#cba76e" strokeWidth="2" opacity="0.9">
            <path
              key={attempt}
              className="anim-dash"
              d="M60 300 L60 140 L200 80 L340 140 L340 300 M60 140 L200 200 L340 140 M200 200 L200 340 M60 300 L200 340 L340 300 M110 160 l0 70 M110 160 l50 -18 0 68 -50 20 M255 132 l60 24 0 64 -60 -22 z"
            />
          </g>
          <g fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.14">
            <path d="M20 360 L200 250 L380 360 M200 250 L200 20" />
          </g>
        </svg>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <div className="rounded-full bg-navy-950/60 px-3 py-1.5 text-[13px] font-medium text-cream-50">
            {roomName}
          </div>
          <div className="rounded-full bg-navy-950/60 px-3 py-1.5 font-mono text-[13px] text-gold-400">
            {Math.round(progress)}%
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className={`mb-3 text-center text-[15px] font-medium ${stalled ? 'text-warn-100' : 'text-cream-50/90'}`}>
            {msg}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div
              className={`h-full rounded-full transition-[width] duration-300 ${stalled ? 'bg-warn-500' : 'bg-gold-400'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {stalled ? (
          <>
            <Button
              variant="gold"
              icon={<Camera size={20} />}
              onClick={onPhotosOnly}
            >
              Continue with photos instead
            </Button>
            <Button
              variant="secondary"
              icon={<RotateCcw size={18} />}
              onClick={() => {
                setStalled(false)
                setProgress(0)
                setAttempt((a) => a + 1)
              }}
            >
              Try again
            </Button>
          </>
        ) : (
          <>
            <Button variant="gold" disabled={progress < 99} onClick={onFinish}>
              {progress < 99 ? 'Walk the room slowly…' : 'Finish scan'}
            </Button>
            <Button variant="quiet" small onClick={onPhotosOnly}>
              Scan unavailable — continue with photos
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

/* ————————————————————— Voice note ————————————————————— */

export function VoiceSim({
  prompt,
  result,
  onResult,
}: {
  prompt: string
  result: string
  onResult: (text: string) => void
}) {
  const [phase, setPhase] = useState<'idle' | 'listening' | 'done'>('idle')
  const reduce = useReducedMotion()

  useEffect(() => {
    if (phase !== 'listening') return
    const t = window.setTimeout(() => {
      setPhase('done')
      onResult(result)
    }, reduce ? 400 : 2100)
    return () => window.clearTimeout(t)
  }, [phase, onResult, result, reduce])

  if (phase === 'done') return null

  return (
    <button
      onClick={() => setPhase('listening')}
      className={`flex w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-colors ${
        phase === 'listening' ? 'border-gold-500 bg-gold-500/10' : 'border-cream-300 bg-white active:bg-cream-100'
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
          phase === 'listening' ? 'bg-gold-500 text-navy-950' : 'bg-navy-900 text-cream-50'
        }`}
      >
        <Mic size={20} />
      </div>
      {phase === 'listening' ? (
        <div className="flex h-8 flex-1 items-center gap-1" aria-label="Listening">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="anim-wave w-1 rounded-full bg-gold-500"
              style={{ height: 8 + ((i * 37) % 18), animationDelay: `${(i % 6) * 0.11}s` }}
            />
          ))}
        </div>
      ) : (
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-medium text-ink-900">{prompt}</div>
          <div className="text-[13px] text-ink-500">Speak it — typing is always optional</div>
        </div>
      )}
    </button>
  )
}

/* ————————————————————— Photo capture ————————————————————— */

export function ShutterButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      disabled={disabled}
      aria-label="Take photo"
      className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white/80 bg-white/20 disabled:opacity-40"
    >
      <div className="h-14 w-14 rounded-full bg-white" />
    </motion.button>
  )
}
