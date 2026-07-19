import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'

/**
 * Prototype state — local only, persisted to localStorage so a refresh
 * never loses the tester's place. `Reset prototype` restores the
 * original pre-visit scenario.
 *
 * Two connected slices:
 *  - walk:  Prototype 1 — creating the Property Passport
 *  - visit: Prototype 2 — today's recurring inspection, whose approval
 *           updates the passport, findings, activity and owner portal.
 */

/* ————————————————— Walk (Prototype 1) ————————————————— */

export type WalkStep =
  | 'intro'
  | 'prep'
  | 'entrance'
  | 'overview'
  | 'discover'
  | 'scan'
  | 'review'
  | 'photos'
  | 'assets'
  | 'checkpoints'
  | 'room-done'
  | 'fast'
  | 'utilities'
  | 'exterior'
  | 'final'
  | 'moment'

export type UtilityStatus = 'pending' | 'registered' | 'not-present' | 'later'

export interface WalkState {
  step: WalkStep
  prep: Record<string, boolean>
  entrance: 'pending' | 'registered' | 'later'
  roomName: string
  scanOutcome: 'scanned' | 'photos-only' | null
  scanItemsRemoved: string[]
  scanItemsAdded: string[]
  photosTaken: string[]
  acRegistered: boolean
  assetDecisions: Record<string, 'registered' | 'ignored' | 'unsure'>
  checkpointsAccepted: string[]
  fastRoomsDone: string[]
  utilities: Record<string, UtilityStatus>
  exteriorDone: string[]
  deferred: string[]
}

const initialWalk: WalkState = {
  step: 'intro',
  prep: {},
  entrance: 'pending',
  roomName: 'Living Room',
  scanOutcome: null,
  scanItemsRemoved: [],
  scanItemsAdded: [],
  photosTaken: [],
  acRegistered: false,
  assetDecisions: {},
  checkpointsAccepted: [],
  fastRoomsDone: [],
  utilities: {},
  exteriorDone: [],
  deferred: [],
}

/* ————————————————— Visit (Prototype 2) ————————————————— */

export type VisitStage =
  | 'arrival'
  | 'meters'
  | 'identify'
  | 'kitchen'
  | 'living'
  | 'areas'
  | 'exit'
  | 'review'
  | 'done'

export type CheckpointResult = 'ok' | 'issue' | 'batch'
export type ExitItemState = { state: 'open' | 'done' } | { state: 'skipped'; reason: string }

export interface VisitState {
  started: boolean
  stage: VisitStage
  startedAt: string | null
  meters: { electricity: boolean; water: boolean }
  kitchenIdentified: boolean
  kitchenCheckpoints: Record<string, CheckpointResult>
  reobs: { done: boolean; photo: boolean; status: 'Improved' | null; voice: boolean }
  ownerRequestConfirmed: boolean
  livingCheckpoints: Record<string, CheckpointResult>
  findingSaved: boolean
  finding: { description: string; severity: 'Minor' | 'Moderate'; recommendation: string }
  reobsRecommendation: string
  areasDone: string[]
  freeNoteSaved: boolean
  exitItems: { guestBedroom: ExitItemState; wallPhoto: ExitItemState }
  draftsApproved: { reobs: boolean; finding: boolean }
  approved: boolean
}

const initialVisit: VisitState = {
  started: false,
  stage: 'arrival',
  startedAt: null,
  meters: { electricity: false, water: false },
  kitchenIdentified: false,
  kitchenCheckpoints: {},
  reobs: { done: false, photo: false, status: null, voice: false },
  ownerRequestConfirmed: false,
  livingCheckpoints: {},
  findingSaved: false,
  finding: {
    description: 'Loose terrace-door handle',
    severity: 'Minor',
    recommendation: 'Tighten or replace handle fixing.',
  },
  reobsRecommendation: 'Replace worn sink seal during next contractor visit.',
  areasDone: [],
  freeNoteSaved: false,
  exitItems: { guestBedroom: { state: 'open' }, wallPhoto: { state: 'open' } },
  draftsApproved: { reobs: false, finding: false },
  approved: false,
}

/* ————————————————— App state ————————————————— */

export interface AppState {
  v: 3
  walk: WalkState
  walkStartedAt: number | null
  passportCreated: boolean
  visit: VisitState
}

const initialState: AppState = {
  v: 3,
  walk: initialWalk,
  walkStartedAt: null,
  passportCreated: false,
  visit: initialVisit,
}

type Action =
  | { type: 'reset' }
  /* walk (Prototype 1) */
  | { type: 'start-walk' }
  | { type: 'go'; step: WalkStep }
  | { type: 'prep-toggle'; id: string }
  | { type: 'entrance'; status: WalkState['entrance'] }
  | { type: 'room-name'; name: string }
  | { type: 'scan-outcome'; outcome: 'scanned' | 'photos-only' }
  | { type: 'scan-item-remove'; id: string }
  | { type: 'scan-item-restore'; id: string }
  | { type: 'scan-item-add'; label: string }
  | { type: 'photo'; id: string }
  | { type: 'photo-remove'; id: string }
  | { type: 'asset-decision'; id: string; decision: 'registered' | 'ignored' | 'unsure' }
  | { type: 'ac-registered' }
  | { type: 'checkpoints'; ids: string[] }
  | { type: 'fast-room-done'; id: string }
  | { type: 'utility'; id: string; status: UtilityStatus }
  | { type: 'exterior-done'; id: string }
  | { type: 'defer'; id: string }
  | { type: 'undefer'; id: string }
  | { type: 'create-passport' }
  /* visit (Prototype 2) */
  | { type: 'visit-start'; at: string }
  | { type: 'visit-stage'; stage: VisitStage }
  | { type: 'meter-confirm'; id: 'electricity' | 'water' }
  | { type: 'kitchen-identified' }
  | { type: 'kitchen-checkpoint'; id: string; result: CheckpointResult | null }
  | { type: 'kitchen-batch'; ids: string[] }
  | { type: 'reobs-photo' }
  | { type: 'reobs-status'; status: 'Improved' }
  | { type: 'reobs-voice' }
  | { type: 'reobs-done' }
  | { type: 'owner-request-confirmed' }
  | { type: 'living-checkpoint'; id: string; result: CheckpointResult | null }
  | { type: 'finding-saved' }
  | { type: 'finding-edit'; field: 'description' | 'recommendation'; value: string }
  | { type: 'finding-severity'; value: 'Minor' | 'Moderate' }
  | { type: 'reobs-recommendation'; value: string }
  | { type: 'area-done'; id: string }
  | { type: 'free-note' }
  | { type: 'exit-item'; item: 'guestBedroom' | 'wallPhoto'; value: ExitItemState }
  | { type: 'draft-approve'; draft: 'reobs' | 'finding' }
  | { type: 'visit-approve' }

function reducer(state: AppState, action: Action): AppState {
  const w = state.walk
  const v = state.visit
  switch (action.type) {
    case 'reset':
      return initialState
    /* ——— walk ——— */
    case 'start-walk':
      return { ...state, walkStartedAt: state.walkStartedAt ?? Date.now(), walk: { ...w, step: 'prep' } }
    case 'go':
      return { ...state, walk: { ...w, step: action.step } }
    case 'prep-toggle':
      return { ...state, walk: { ...w, prep: { ...w.prep, [action.id]: !w.prep[action.id] } } }
    case 'entrance':
      return { ...state, walk: { ...w, entrance: action.status } }
    case 'room-name':
      return { ...state, walk: { ...w, roomName: action.name } }
    case 'scan-outcome':
      return { ...state, walk: { ...w, scanOutcome: action.outcome } }
    case 'scan-item-remove':
      return { ...state, walk: { ...w, scanItemsRemoved: [...w.scanItemsRemoved, action.id] } }
    case 'scan-item-restore':
      return { ...state, walk: { ...w, scanItemsRemoved: w.scanItemsRemoved.filter((i) => i !== action.id) } }
    case 'scan-item-add':
      return { ...state, walk: { ...w, scanItemsAdded: [...w.scanItemsAdded, action.label] } }
    case 'photo':
      return w.photosTaken.includes(action.id)
        ? state
        : { ...state, walk: { ...w, photosTaken: [...w.photosTaken, action.id] } }
    case 'photo-remove':
      return { ...state, walk: { ...w, photosTaken: w.photosTaken.filter((p) => p !== action.id) } }
    case 'asset-decision':
      return { ...state, walk: { ...w, assetDecisions: { ...w.assetDecisions, [action.id]: action.decision } } }
    case 'ac-registered':
      return { ...state, walk: { ...w, acRegistered: true, assetDecisions: { ...w.assetDecisions, ac: 'registered' } } }
    case 'checkpoints':
      return { ...state, walk: { ...w, checkpointsAccepted: action.ids } }
    case 'fast-room-done':
      return w.fastRoomsDone.includes(action.id)
        ? state
        : { ...state, walk: { ...w, fastRoomsDone: [...w.fastRoomsDone, action.id] } }
    case 'utility':
      return { ...state, walk: { ...w, utilities: { ...w.utilities, [action.id]: action.status } } }
    case 'exterior-done':
      return w.exteriorDone.includes(action.id)
        ? state
        : { ...state, walk: { ...w, exteriorDone: [...w.exteriorDone, action.id] } }
    case 'defer':
      return w.deferred.includes(action.id) ? state : { ...state, walk: { ...w, deferred: [...w.deferred, action.id] } }
    case 'undefer':
      return { ...state, walk: { ...w, deferred: w.deferred.filter((d) => d !== action.id) } }
    case 'create-passport':
      return { ...state, passportCreated: true, walk: { ...w, step: 'moment' } }
    /* ——— visit ——— */
    case 'visit-start':
      return { ...state, visit: { ...v, started: true, startedAt: action.at, stage: 'meters' } }
    case 'visit-stage':
      return { ...state, visit: { ...v, stage: action.stage } }
    case 'meter-confirm':
      return { ...state, visit: { ...v, meters: { ...v.meters, [action.id]: true } } }
    case 'kitchen-identified':
      return { ...state, visit: { ...v, kitchenIdentified: true } }
    case 'kitchen-checkpoint': {
      const next = { ...v.kitchenCheckpoints }
      if (action.result === null) delete next[action.id]
      else next[action.id] = action.result
      return { ...state, visit: { ...v, kitchenCheckpoints: next } }
    }
    case 'kitchen-batch': {
      const next = { ...v.kitchenCheckpoints }
      for (const id of action.ids) if (!next[id]) next[id] = 'batch'
      return { ...state, visit: { ...v, kitchenCheckpoints: next } }
    }
    case 'reobs-photo':
      return { ...state, visit: { ...v, reobs: { ...v.reobs, photo: true } } }
    case 'reobs-status':
      return { ...state, visit: { ...v, reobs: { ...v.reobs, status: action.status } } }
    case 'reobs-voice':
      return { ...state, visit: { ...v, reobs: { ...v.reobs, voice: true } } }
    case 'reobs-done':
      return { ...state, visit: { ...v, reobs: { ...v.reobs, done: true } } }
    case 'owner-request-confirmed':
      return { ...state, visit: { ...v, ownerRequestConfirmed: true } }
    case 'living-checkpoint': {
      const next = { ...v.livingCheckpoints }
      if (action.result === null) delete next[action.id]
      else next[action.id] = action.result
      return { ...state, visit: { ...v, livingCheckpoints: next } }
    }
    case 'finding-saved':
      return { ...state, visit: { ...v, findingSaved: true } }
    case 'finding-edit':
      return { ...state, visit: { ...v, finding: { ...v.finding, [action.field]: action.value } } }
    case 'finding-severity':
      return { ...state, visit: { ...v, finding: { ...v.finding, severity: action.value } } }
    case 'reobs-recommendation':
      return { ...state, visit: { ...v, reobsRecommendation: action.value } }
    case 'area-done':
      return v.areasDone.includes(action.id)
        ? state
        : { ...state, visit: { ...v, areasDone: [...v.areasDone, action.id] } }
    case 'free-note':
      return { ...state, visit: { ...v, freeNoteSaved: true } }
    case 'exit-item':
      return { ...state, visit: { ...v, exitItems: { ...v.exitItems, [action.item]: action.value } } }
    case 'draft-approve':
      return { ...state, visit: { ...v, draftsApproved: { ...v.draftsApproved, [action.draft]: true } } }
    case 'visit-approve':
      return { ...state, visit: { ...v, approved: true, stage: 'done' } }
    default:
      return state
  }
}

const KEY = 'luz-passport-prototype-v3'

function load(): AppState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as AppState
    if (parsed.v !== 3) return initialState
    return {
      ...initialState,
      ...parsed,
      walk: { ...initialWalk, ...parsed.walk },
      visit: { ...initialVisit, ...parsed.visit, finding: { ...initialVisit.finding, ...parsed.visit?.finding } },
    }
  } catch {
    return initialState
  }
}

interface StoreCtx {
  state: AppState
  dispatch: (a: Action) => void
  reset: () => void
}

const Ctx = createContext<StoreCtx | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage may be unavailable — prototype continues in memory */
    }
  }, [state])

  const value = useMemo<StoreCtx>(
    () => ({
      state,
      dispatch,
      reset: () => {
        try {
          window.localStorage.removeItem(KEY)
        } catch {
          /* ignore */
        }
        dispatch({ type: 'reset' })
      },
    }),
    [state],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
