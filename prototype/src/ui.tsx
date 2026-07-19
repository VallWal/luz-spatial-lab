import { motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, CircleCheck } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'

/* ————————————————————— Layout ————————————————————— */

/**
 * Phone-width column. On desktop the experience stays centred at iPhone width
 * so the prototype remains honest about its mobile-first design.
 */
export function Shell({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <div className={tone === 'dark' ? 'min-h-dvh bg-navy-950' : 'min-h-dvh bg-cream-50'}>
      <div className="mx-auto min-h-dvh w-full max-w-[430px]">{children}</div>
    </div>
  )
}

export function Screen({
  children,
  tone = 'light',
  padBottom = true,
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
  padBottom?: boolean
}) {
  return (
    <Shell tone={tone}>
      <div className={`flex min-h-dvh flex-col px-5 pt-4 ${padBottom ? 'pb-40' : 'pb-8'}`}>{children}</div>
    </Shell>
  )
}

export function TopBar({
  title,
  onBack,
  right,
  tone = 'light',
  subtitle,
}: {
  title?: string
  subtitle?: string
  onBack?: () => void
  right?: ReactNode
  tone?: 'light' | 'dark'
}) {
  const fg = tone === 'dark' ? 'text-cream-50' : 'text-ink-900'
  const sub = tone === 'dark' ? 'text-cream-50/70' : 'text-ink-500'
  return (
    <div className="-mx-1 mb-4 flex min-h-11 items-center gap-2">
      {onBack ? (
        <button
          onClick={onBack}
          aria-label="Back"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full active:bg-black/5 ${fg}`}
        >
          <ChevronLeft size={26} strokeWidth={2.2} />
        </button>
      ) : (
        <div className="w-1" />
      )}
      <div className="min-w-0 flex-1">
        {title && <div className={`truncate text-[17px] font-semibold ${fg}`}>{title}</div>}
        {subtitle && <div className={`truncate text-[13px] ${sub}`}>{subtitle}</div>}
      </div>
      {right}
    </div>
  )
}

/** Fixed bottom action area — primary actions stay in thumb reach. */
export function BottomBar({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  const bg =
    tone === 'dark'
      ? 'bg-gradient-to-t from-navy-950 via-navy-950/95 to-transparent'
      : 'bg-gradient-to-t from-cream-50 via-cream-50/95 to-transparent'
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className={`mx-auto w-full max-w-[430px] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-10 ${bg}`}>
        <div className="pointer-events-auto flex flex-col gap-2.5">{children}</div>
      </div>
    </div>
  )
}

/* ————————————————————— Buttons ————————————————————— */

type ButtonVariant = 'primary' | 'gold' | 'secondary' | 'ghost' | 'dark-ghost' | 'quiet'

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled,
  icon,
  small,
  full = true,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  disabled?: boolean
  icon?: ReactNode
  small?: boolean
  full?: boolean
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors select-none disabled:opacity-40'
  const size = small ? 'h-11 px-4 text-[15px]' : 'h-14 px-6 text-[17px]'
  const width = full ? 'w-full' : ''
  const style: Record<ButtonVariant, string> = {
    primary: 'bg-navy-900 text-cream-50 active:bg-navy-800',
    gold: 'bg-gold-500 text-navy-950 active:bg-gold-600',
    secondary: 'border border-cream-300 bg-white text-ink-900 active:bg-cream-100',
    ghost: 'text-ink-700 active:bg-black/5',
    'dark-ghost': 'text-cream-50/80 active:bg-white/10',
    quiet: 'bg-cream-100 text-ink-700 active:bg-cream-200',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${size} ${width} ${style[variant]}`}>
      {icon}
      {children}
    </button>
  )
}

/* ————————————————————— Surfaces & text ————————————————————— */

export function Card({
  children,
  onClick,
  className = '',
  pad = true,
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  pad?: boolean
}) {
  const base = `rounded-3xl bg-white shadow-card ${pad ? 'p-5' : ''} ${className}`
  if (onClick)
    return (
      <button onClick={onClick} className={`${base} block w-full text-left active:bg-cream-50`}>
        {children}
      </button>
    )
  return <div className={base}>{children}</div>
}

export function SectionLabel({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <div
      className={`mb-2.5 mt-7 text-[13px] font-semibold uppercase tracking-[0.08em] ${
        tone === 'dark' ? 'text-cream-50/65' : 'text-ink-400'
      }`}
    >
      {children}
    </div>
  )
}

export function Title({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <h1
      className={`font-display text-[30px] leading-[1.15] font-semibold tracking-[-0.01em] ${
        tone === 'dark' ? 'text-cream-50' : 'text-ink-900'
      }`}
    >
      {children}
    </h1>
  )
}

export function Lead({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p className={`mt-2.5 text-[16px] leading-relaxed ${tone === 'dark' ? 'text-cream-50/70' : 'text-ink-500'}`}>
      {children}
    </p>
  )
}

export function ListRow({
  title,
  subtitle,
  left,
  right,
  onClick,
}: {
  title: ReactNode
  subtitle?: ReactNode
  left?: ReactNode
  right?: ReactNode
  onClick?: () => void
}) {
  const inner = (
    <>
      {left && <div className="shrink-0">{left}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[16px] font-medium text-ink-900">{title}</div>
        {subtitle && <div className="mt-0.5 truncate text-[13px] text-ink-500">{subtitle}</div>}
      </div>
      {right ?? (onClick && <ChevronRight size={20} className="shrink-0 text-ink-400" />)}
    </>
  )
  if (onClick)
    return (
      <button onClick={onClick} className="flex min-h-14 w-full items-center gap-3.5 py-2.5 text-left active:bg-black/[0.03]">
        {inner}
      </button>
    )
  return <div className="flex min-h-14 w-full items-center gap-3.5 py-2.5">{inner}</div>
}

export function Divider() {
  return <div className="h-px bg-cream-200" />
}

/* ————————————————————— Status ————————————————————— */

export function StatusBadge({
  kind,
  children,
}: {
  kind: 'ok' | 'warn' | 'info' | 'neutral'
  children: ReactNode
}) {
  const style = {
    ok: 'bg-ok-100 text-ok-500',
    warn: 'bg-warn-100 text-warn-500',
    info: 'bg-navy-900/5 text-navy-700',
    neutral: 'bg-cream-100 text-ink-500',
  }[kind]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold ${style}`}>
      {kind === 'ok' && <Check size={14} strokeWidth={3} />}
      {children}
    </span>
  )
}

export function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="rounded-2xl bg-cream-100 px-4 py-3.5">
      <div className="font-display text-[24px] font-semibold text-ink-900">{value}</div>
      <div className="mt-0.5 text-[13px] text-ink-500">{label}</div>
    </div>
  )
}

/** Small check bullet used in summaries. */
export function DoneItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <CircleCheck size={20} className="shrink-0 text-ok-500" />
      <span className="text-[15px] text-ink-700">{children}</span>
    </div>
  )
}

/* ————————————————————— Progress ————————————————————— */

export function ProgressPips({ total, done, tone = 'light' }: { total: number; done: number; tone?: 'light' | 'dark' }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${done} of ${total} complete`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i < done
              ? 'w-5 bg-gold-500'
              : tone === 'dark'
                ? 'w-1.5 bg-white/20'
                : 'w-1.5 bg-ink-900/15'
          }`}
        />
      ))}
    </div>
  )
}

/* ————————————————————— Mock photography ————————————————————— */

const PALETTES: Record<string, [string, string, string]> = {
  warm: ['#e8d9c3', '#c9a97e', '#8a6f52'],
  terracotta: ['#e9cdb4', '#c98d64', '#7d543c'],
  sea: ['#cfe3e4', '#7fa9b5', '#33566b'],
  pool: ['#bfe0e2', '#5ea3b0', '#1f4e63'],
  garden: ['#dbe3c8', '#93a86e', '#4c5f3a'],
  stone: ['#e3ded4', '#a9a294', '#5c574c'],
  night: ['#3a4a5c', '#23425f', '#102338'],
  metal: ['#d8dadc', '#a2a7ac', '#5c6166'],
}

function seedPalette(seed: string): [string, string, string] {
  if (seed.includes('villa')) return PALETTES.terracotta
  if (seed.endsWith('-wide')) return PALETTES.warm
  if (seed.includes('pool')) return PALETTES.pool
  if (seed.includes('garden') || seed.includes('irrigation')) return PALETTES.garden
  if (seed.includes('terrace') || seed.includes('gate')) return PALETTES.terracotta
  if (seed.includes('panel') || seed.includes('valve') || seed.includes('heater') || seed.includes('meter') || seed.includes('nameplate'))
    return PALETTES.metal
  if (seed.startsWith('ac-')) return PALETTES.stone
  if (seed.includes('ceiling') || seed.includes('wall')) return PALETTES.stone
  if (seed.includes('window')) return PALETTES.sea
  let h = 0
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) % 997
  const keys = Object.keys(PALETTES)
  return PALETTES[keys[h % (keys.length - 2)]]
}

/**
 * Designed photo placeholder — the prototype has no real photography,
 * so every "photo" is a calm, warm composition derived from its subject.
 */
export function MockPhoto({
  seed,
  label,
  ratio = '4/3',
  className = '',
  rounded = 'rounded-2xl',
}: {
  seed: string
  label?: string
  ratio?: string
  className?: string
  rounded?: string
}) {
  const [a, b, c] = seedPalette(seed)
  const style: CSSProperties = {
    aspectRatio: ratio,
    background: `
      radial-gradient(120% 90% at 15% 0%, ${a} 0%, transparent 60%),
      radial-gradient(120% 110% at 100% 20%, ${b} 0%, transparent 70%),
      linear-gradient(160deg, ${a} 0%, ${b} 55%, ${c} 100%)`,
  }
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`} style={style}>
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_110%,rgba(10,22,36,0.35),transparent)]" />
      {label && (
        <div className="absolute bottom-2 left-2.5 rounded-full bg-navy-950/45 px-2.5 py-1 text-[11px] font-medium text-cream-50">
          {label}
        </div>
      )}
    </div>
  )
}

/** Simulated nameplate photo with etched text. */
export function NameplatePhoto({ brand, model, serial }: { brand: string; model: string; serial: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: '4/3', background: 'linear-gradient(150deg,#565d64 0%,#3c4248 60%,#2b3036 100%)' }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full rounded-lg border border-white/25 bg-[#c7ccd1] p-4 shadow-raised">
          <div className="text-[15px] font-bold tracking-wide text-[#2b3036]">{brand}</div>
          <div className="mt-1.5 font-mono text-[12px] text-[#3c4248]">MODEL {model}</div>
          <div className="font-mono text-[12px] text-[#3c4248]">S/N {serial}</div>
          <div className="mt-1.5 font-mono text-[9px] text-[#6a7076]">220–240 V ~ 50 Hz · R-32</div>
        </div>
      </div>
      <div className="absolute bottom-2 left-2.5 rounded-full bg-navy-950/45 px-2.5 py-1 text-[11px] font-medium text-cream-50">
        Nameplate
      </div>
    </div>
  )
}

/* ————————————————————— Motion helpers ————————————————————— */

export function StepFade({ children, k }: { children: ReactNode; k: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      key={k}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.25, 0.6, 0.3, 1] }}
      className="flex min-h-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  )
}
