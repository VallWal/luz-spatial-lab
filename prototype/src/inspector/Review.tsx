import { useState } from 'react'
import { Check, ChevronDown, CircleAlert, CloudOff, Pencil, Play, ShieldCheck } from 'lucide-react'
import { useRouter } from '../lib/router'
import { useStore } from '../store'
import { FINDING_VOICE, MOISTURE_FINDING, REOBS_VOICE, REVIEW_STATS } from '../scenario'
import { BottomBar, Button, Card, Divider, Lead, MockPhoto, SectionLabel, Shell, Title, TopBar } from '../ui'

/* ————————————————— Draft card ————————————————— */

function VoiceNoteRow({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <button
      onClick={() => {
        setPlaying(true)
        window.setTimeout(() => setPlaying(false), 2200)
      }}
      className="mt-2.5 flex w-full items-center gap-3 rounded-xl bg-cream-100 px-3.5 py-2.5 text-left active:bg-cream-200"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-cream-50">
        <Play size={14} />
      </span>
      {playing ? (
        <span className="flex h-6 flex-1 items-center gap-1" aria-label="Playing voice note">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="anim-wave w-1 rounded-full bg-gold-500"
              style={{ height: 6 + ((i * 29) % 14), animationDelay: `${(i % 5) * 0.12}s` }}
            />
          ))}
        </span>
      ) : (
        <span className="flex-1 text-[13px] italic leading-snug text-ink-500">“{text}”</span>
      )}
    </button>
  )
}

function DraftCard({
  kind,
  title,
  status,
  severity,
  onSeverity,
  description,
  onDescription,
  recommendation,
  onRecommendation,
  voice,
  approved,
  onApprove,
  photoSeeds,
}: {
  kind: string
  title: string
  status?: string
  severity: 'Minor' | 'Moderate'
  onSeverity?: (s: 'Minor' | 'Moderate') => void
  description?: string
  onDescription?: (v: string) => void
  recommendation: string
  onRecommendation: (v: string) => void
  voice: string
  approved: boolean
  onApprove: () => void
  photoSeeds: [string, string?]
}) {
  const [editing, setEditing] = useState(false)
  return (
    <Card pad={false} className="overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-400">{kind}</span>
        <span
          className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
            severity === 'Minor' ? 'bg-cream-100 text-ink-700' : 'bg-warn-100 text-warn-500'
          }`}
        >
          {severity}
        </span>
      </div>
      <div className="px-5 pb-4 pt-1.5">
        {editing && onDescription !== undefined ? (
          <input
            value={description}
            onChange={(e) => onDescription(e.target.value)}
            className="h-11 w-full rounded-xl border border-cream-300 bg-cream-50 px-3.5 text-[16px] font-medium text-ink-900 outline-none focus:border-gold-500"
          />
        ) : (
          <div className="text-[17px] font-semibold text-ink-900">{description ?? title}</div>
        )}
        {status && <div className="mt-1 text-[13px] font-medium text-ok-500">{status}</div>}

        <div className="mt-3 flex gap-2">
          <MockPhoto seed={photoSeeds[0]} ratio="4/3" className="w-24" rounded="rounded-lg" />
          {photoSeeds[1] && <MockPhoto seed={photoSeeds[1]} ratio="4/3" className="w-24" rounded="rounded-lg" />}
        </div>

        <div className="mt-3.5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-400">Recommendation</div>
          {editing ? (
            <textarea
              value={recommendation}
              onChange={(e) => onRecommendation(e.target.value)}
              rows={2}
              className="mt-1 w-full resize-none rounded-xl border border-cream-300 bg-cream-50 p-3 text-[14px] leading-snug text-ink-900 outline-none focus:border-gold-500"
            />
          ) : (
            <p className="mt-1 text-[14px] leading-snug text-ink-700">{recommendation}</p>
          )}
        </div>

        {editing && onSeverity && (
          <div className="mt-3 flex gap-2">
            {(['Minor', 'Moderate'] as const).map((s) => (
              <button
                key={s}
                onClick={() => onSeverity(s)}
                className={`h-10 flex-1 rounded-xl border text-[14px] font-semibold ${
                  severity === s ? 'border-navy-900 bg-navy-900 text-cream-50' : 'border-cream-300 bg-white text-ink-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <VoiceNoteRow text={voice} />

        <div className="mt-3.5 flex gap-2">
          {approved ? (
            <div className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-ok-100 text-[14px] font-semibold text-ok-500">
              <Check size={16} strokeWidth={3} /> Approved
            </div>
          ) : (
            <>
              <button
                onClick={onApprove}
                className="h-11 flex-1 rounded-xl bg-navy-900 text-[14px] font-semibold text-cream-50 active:bg-navy-800"
              >
                Approve draft
              </button>
              <button
                onClick={() => setEditing((e) => !e)}
                className="flex h-11 items-center gap-1.5 rounded-xl border border-cream-300 bg-white px-4 text-[14px] font-medium text-ink-700 active:bg-cream-100"
              >
                <Pencil size={14} /> {editing ? 'Done' : 'Edit'}
              </button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

/* ————————————————— Visit review + completion ————————————————— */

export function VisitReview() {
  const { state, dispatch } = useStore()
  const { navigate, back } = useRouter()
  const v = state.visit
  const [confirming, setConfirming] = useState(false)
  const [showStats, setShowStats] = useState(false)

  /* ——— completion ——— */
  if (v.approved) {
    return (
      <Shell>
        <div className="px-5 pb-44 pt-3">
          <TopBar onBack={() => navigate('/inspector')} />
          <div className="flex flex-col items-center pt-6 text-center">
            <div className="anim-pop flex h-20 w-20 items-center justify-center rounded-full bg-ok-100">
              <ShieldCheck size={40} className="text-ok-500" />
            </div>
            <h1 className="font-display mt-5 text-[28px] font-semibold text-ink-900">Visit approved</h1>
            <p className="mt-2 max-w-[300px] text-[15px] leading-relaxed text-ink-500">
              Today is now part of Casa del Mar's permanent record.
            </p>
          </div>

          <Card className="mt-6" pad={false}>
            <div className="px-5 py-2">
              {[
                '32 checkpoints completed',
                '1 finding improved — moisture below the kitchen sink',
                '1 new minor finding — terrace-door handle',
                'Property secure on departure',
              ].map((t, i) => (
                <div key={t} className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
                  <Check size={17} strokeWidth={3} className="shrink-0 text-ok-500" />
                  <span className="text-[14px] text-ink-700">{t}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-navy-900/5 px-4 py-3">
            <CloudOff size={17} className="shrink-0 text-navy-700" />
            <span className="text-[13px] text-ink-700">Saved on this device. Ready to sync when connected.</span>
          </div>

          <BottomBar>
            <Button variant="gold" onClick={() => navigate('/owner')}>
              View owner update
            </Button>
            <Button variant="secondary" small onClick={() => navigate('/passport')}>
              View Property Passport
            </Button>
          </BottomBar>
        </div>
      </Shell>
    )
  }

  const bothApproved = v.draftsApproved.reobs && v.draftsApproved.finding

  return (
    <Shell>
      <div className="px-5 pb-48 pt-3">
        <TopBar onBack={back} title="Visit review" subtitle="Confirm before it becomes the record" />

        <SectionLabel>Drafts · 2</SectionLabel>
        <div className="flex flex-col gap-3.5">
          <DraftCard
            kind="Re-observation"
            title={MOISTURE_FINDING.title}
            status="Improved · finding stays open"
            severity="Moderate"
            recommendation={v.reobsRecommendation}
            onRecommendation={(val) => dispatch({ type: 'reobs-recommendation', value: val })}
            voice={REOBS_VOICE}
            approved={v.draftsApproved.reobs}
            onApprove={() => dispatch({ type: 'draft-approve', draft: 'reobs' })}
            photoSeeds={['k-sink-then', 'k-sink-now']}
          />
          <DraftCard
            kind="New finding"
            title={v.finding.description}
            severity={v.finding.severity}
            onSeverity={(s) => dispatch({ type: 'finding-severity', value: s })}
            description={v.finding.description}
            onDescription={(val) => dispatch({ type: 'finding-edit', field: 'description', value: val })}
            recommendation={v.finding.recommendation}
            onRecommendation={(val) => dispatch({ type: 'finding-edit', field: 'recommendation', value: val })}
            voice={FINDING_VOICE}
            approved={v.draftsApproved.finding}
            onApprove={() => dispatch({ type: 'draft-approve', draft: 'finding' })}
            photoSeeds={['terrace-handle']}
          />
        </div>

        <SectionLabel>Today in numbers</SectionLabel>
        <Card pad={false}>
          <div className="grid grid-cols-3 px-5 py-3 text-center">
            {[
              [REVIEW_STATS.areas, 'areas'],
              [REVIEW_STATS.checkpoints, 'checkpoints'],
              [REVIEW_STATS.findings, 'findings'],
            ].map(([val, label]) => (
              <div key={label as string}>
                <div className="font-display text-[22px] font-semibold text-ink-900">{val}</div>
                <div className="text-[12px] text-ink-500">{label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowStats((s) => !s)}
            className="flex w-full items-center justify-center gap-1.5 border-t border-cream-200 py-3 text-[13px] font-semibold text-gold-700 active:bg-cream-50"
          >
            {showStats ? 'Hide detail' : 'Full detail'}
            <ChevronDown size={15} className={`transition-transform ${showStats ? 'rotate-180' : ''}`} />
          </button>
          {showStats && (
            <div className="border-t border-cream-200 px-5 py-2">
              {[
                `${REVIEW_STATS.individual} checkpoints completed individually`,
                `${REVIEW_STATS.batch} completed as “mark remaining healthy”`,
                `1 area skipped — Guest Bedroom · ${
                  v.exitItems.guestBedroom.state === 'skipped' ? v.exitItems.guestBedroom.reason : 'completed'
                }`,
                `${REVIEW_STATS.meters} meter readings · both normal for the season`,
                v.freeNoteSaved ? '1 free observation — garden debris near the side entrance' : null,
              ]
                .filter(Boolean)
                .map((t, i) => (
                  <div key={t as string} className={`py-2.5 text-[13px] text-ink-700 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
                    {t}
                  </div>
                ))}
            </div>
          )}
        </Card>

        <BottomBar>
          {confirming ? (
            <>
              <div className="rounded-2xl bg-navy-900 px-4 py-3 text-center">
                <p className="text-[14px] leading-snug text-cream-50">
                  Approving makes this visit part of the permanent property record.
                </p>
              </div>
              <Button variant="gold" onClick={() => dispatch({ type: 'visit-approve' })}>
                Approve visit
              </Button>
              <Button variant="ghost" small onClick={() => setConfirming(false)}>
                Not yet
              </Button>
            </>
          ) : (
            <Button variant="gold" disabled={!bothApproved} onClick={() => setConfirming(true)}>
              {bothApproved ? 'Approve visit' : 'Approve both drafts first'}
            </Button>
          )}
        </BottomBar>
      </div>
    </Shell>
  )
}
