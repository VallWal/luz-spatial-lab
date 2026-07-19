import { CalendarDays, ChevronRight, CircleAlert, CircleCheck, Clock, Hammer, Plane, UserRound } from 'lucide-react'
import { useRouter } from './lib/router'
import { useStore } from './store'
import { propertyStatus } from './scenario'

/**
 * Operations Preview — a deliberately lightweight, desktop-oriented glimpse
 * of the future connected platform. One dashboard, one property. Not a product.
 */

export function Operations() {
  const { navigate } = useRouter()
  const { state } = useStore()
  const approved = state.visit.approved
  const casaStatus = propertyStatus(state)

  const visits = [
    { name: 'Casa del Mar', place: 'Bolonia', time: '10:00', state: approved ? 'Approved' : 'In progress', ok: approved },
    { name: 'Villa Mirador', place: 'Tarifa', time: '13:30', state: 'Scheduled', ok: false },
    { name: 'Casa Almadraba', place: 'Zahara', time: '16:00', state: 'Scheduled', ok: false },
  ]

  const properties = [
    { name: 'Casa del Mar', status: casaStatus, warn: !approved },
    { name: 'Villa Mirador', status: 'Healthy', warn: false },
    { name: 'Casa Almadraba', status: 'Stable', warn: false },
    { name: 'Finca La Breña', status: 'Healthy', warn: false },
  ]

  return (
    <div className="min-h-dvh bg-cream-50">
      <div className="mx-auto max-w-[1100px] px-6 pb-16 pt-8">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 font-display text-[16px] font-bold text-cream-50">
              L
            </div>
            <div>
              <h1 className="font-display text-[24px] font-semibold text-ink-900">Operations Preview</h1>
              <p className="text-[13px] text-ink-500">A glimpse of the connected platform — not a full product</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-700 active:bg-cream-100"
          >
            Back to launcher
          </button>
        </div>

        {/* KPI row */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ['3', 'visits today', <CalendarDays key="i" size={18} />],
            [approved ? '0' : '1', 'awaiting review', <Clock key="i" size={18} />],
            ['0', 'urgent findings', <CircleAlert key="i" size={18} />],
            ['2', 'contractor actions open', <Hammer key="i" size={18} />],
          ].map(([v, l, icon]) => (
            <div key={l as string} className="rounded-3xl bg-white p-5 shadow-card">
              <div className="flex items-center gap-2 text-navy-700">{icon}<span className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-400">{l}</span></div>
              <div className="font-display mt-2 text-[30px] font-semibold text-ink-900">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* today's visits */}
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <h2 className="text-[15px] font-semibold text-ink-900">Today's visits</h2>
            <div className="mt-3">
              {visits.map((vt, i) => (
                <div key={vt.name} className={`flex items-center gap-4 py-3.5 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
                  <span className="w-12 font-mono text-[13px] text-ink-500">{vt.time}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-medium text-ink-900">{vt.name}</div>
                    <div className="text-[12px] text-ink-500">{vt.place} · Walter</div>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${
                      vt.ok ? 'bg-ok-100 text-ok-500' : 'bg-cream-100 text-ink-500'
                    }`}
                  >
                    {vt.ok && <CircleCheck size={13} />} {vt.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* property statuses */}
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <h2 className="text-[15px] font-semibold text-ink-900">Property statuses</h2>
            <div className="mt-3">
              {properties.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => p.name === 'Casa del Mar' && navigate('/passport')}
                  className={`flex w-full items-center gap-4 py-3.5 text-left ${i > 0 ? 'border-t border-cream-200' : ''} ${
                    p.name === 'Casa del Mar' ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-medium text-ink-900">{p.name}</div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                      p.warn ? 'bg-warn-100 text-warn-500' : 'bg-ok-100 text-ok-500'
                    }`}
                  >
                    {p.status}
                  </span>
                  {p.name === 'Casa del Mar' && <ChevronRight size={17} className="text-ink-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* contractor actions */}
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <h2 className="text-[15px] font-semibold text-ink-900">Contractor actions</h2>
            <div className="mt-3">
              {[
                ['Casa del Mar', 'Replace kitchen sink seal', approved ? 'Ready to schedule' : 'Waiting for today’s recheck'],
                ['Casa del Mar', approved ? 'Tighten terrace-door handle' : '—', approved ? 'Bundle with seal visit' : ''],
              ]
                .filter((r) => r[1] !== '—')
                .map(([prop, what, when], i) => (
                  <div key={what as string} className={`py-3.5 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
                    <div className="text-[14px] font-medium text-ink-900">{what}</div>
                    <div className="mt-0.5 text-[12px] text-ink-500">
                      {prop} · {when}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* upcoming arrivals */}
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <h2 className="text-[15px] font-semibold text-ink-900">Upcoming owner arrivals</h2>
            <div className="mt-3">
              {[
                ['Weber family', 'Casa Almadraba', '26 July — pre-arrival check booked'],
                ['M. & D. Hartley', 'Finca La Breña', '2 August — readiness visit to schedule'],
              ].map(([who, prop, when], i) => (
                <div key={who as string} className={`flex items-center gap-3.5 py-3.5 ${i > 0 ? 'border-t border-cream-200' : ''}`}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-navy-700">
                    <Plane size={16} />
                  </span>
                  <div>
                    <div className="text-[14px] font-medium text-ink-900">{who}</div>
                    <div className="text-[12px] text-ink-500">
                      {prop} · {when}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[12px] text-ink-400">
          Operations Preview · simulated data · demonstrates the future connected platform only
        </p>
      </div>
    </div>
  )
}
