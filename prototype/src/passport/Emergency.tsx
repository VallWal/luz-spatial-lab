import { useState } from 'react'
import { KeyRound, MapPin, Share2, ShieldCheck } from 'lucide-react'
import { useRouter } from '../lib/router'
import { EMERGENCY_ENTRIES } from '../data'
import { Card, MockPhoto, SectionLabel, Shell, TopBar } from '../ui'
import { BottomNav } from './Passport'

/**
 * Emergency Card — designed to be readable in a hurry:
 * large type, photo + context photo, plain-language directions.
 */
export function EmergencyCard() {
  const { back } = useRouter()
  const [shared, setShared] = useState(false)
  const [located, setLocated] = useState<string | null>(null)

  return (
    <Shell>
      <div className="px-5 pb-28 pt-3">
        <TopBar onBack={back} title="Emergency Card" subtitle="Casa del Mar" />

        <div className="flex items-center gap-4 rounded-3xl bg-navy-900 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400">
            <ShieldCheck size={26} />
          </span>
          <p className="text-[14px] leading-snug text-cream-50/90">
            Where to act when every minute counts — shut-offs and key equipment, with photos and plain directions.
          </p>
        </div>

        {EMERGENCY_ENTRIES.map((e) => (
          <div key={e.id}>
            <SectionLabel>{e.name}</SectionLabel>
            <Card pad={false} className="overflow-hidden">
              <div className="grid grid-cols-2 gap-0.5">
                <MockPhoto seed={e.photoSeed} ratio="4/3" rounded="" label="Close-up" />
                <MockPhoto seed={`${e.photoSeed}-wide`} ratio="4/3" rounded="" label="Surroundings" />
              </div>
              <div className="p-4">
                <p className="text-[16px] font-medium leading-snug text-ink-900">{e.location}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setLocated(located === e.id ? null : e.id)}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-navy-900 text-[14px] font-semibold text-cream-50 active:bg-navy-800"
                  >
                    <MapPin size={16} /> Open location
                  </button>
                </div>
                {located === e.id && (
                  <div className="mt-3 rounded-xl bg-cream-100 p-3.5">
                    <svg viewBox="0 0 280 90" className="w-full" aria-label="Location on plan">
                      <rect x="6" y="6" width="268" height="78" rx="5" fill="#fff" stroke="#1b2a3a" strokeWidth="2" />
                      <line x1="100" y1="6" x2="100" y2="84" stroke="#1b2a3a" strokeWidth="1.5" opacity="0.35" />
                      <line x1="190" y1="6" x2="190" y2="84" stroke="#1b2a3a" strokeWidth="1.5" opacity="0.35" />
                      <circle cx="52" cy="58" r="9" fill="#b3452f">
                        <animate attributeName="r" values="7;10;7" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                      <text x="40" y="30" fontSize="10" fill="#5c6d80" fontFamily="sans-serif">
                        Utility room
                      </text>
                    </svg>
                    <p className="mt-2 text-[13px] text-ink-500">Marked on the simplified plan — follow the photos from here.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}

        <SectionLabel>Gate access</SectionLabel>
        <Card pad={false} className="px-5 py-1">
          <div className="flex items-center gap-4 py-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-navy-700">
              <KeyRound size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-medium text-ink-900">Access details stored securely</div>
              <div className="mt-0.5 text-[13px] leading-snug text-ink-500">
                Codes are never shown here. They are shared only when you choose to share emergency access.
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <button
            onClick={() => setShared(true)}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gold-500 text-[16px] font-semibold text-navy-950 active:bg-gold-600"
          >
            <Share2 size={19} /> Share emergency access
          </button>
          {shared && (
            <div className="anim-pop mt-3 rounded-2xl bg-ok-100 px-4 py-3.5 text-center">
              <p className="text-[14px] font-medium text-ok-500">
                A time-limited emergency sheet is ready to send to a person you trust.
              </p>
              <p className="mt-1 text-[12px] text-ink-500">Simulated — nothing is sent in this prototype.</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav active="emergency" />
    </Shell>
  )
}
