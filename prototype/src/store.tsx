import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'

/**
 * Prototype state — local only, persisted to localStorage so a refresh
 * never loses the tester's place. `Reset prototype` clears everything.
 */

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

export interface AppState {
  v: 2
  walk: WalkState
  walkStartedAt: number | null
  passportCreated: boolean
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

const initialState: AppState = {
  v: 2,
  walk: initialWalk,
  walkStartedAt: null,
  passportCreated: false,
}

type Action =
  | { type: 'reset' }
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

function reducer(state: AppState, action: Action): AppState {
  const w = state.walk
  switch (action.type) {
    case 'reset':
      return initialState
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
      return {
        ...state,
        walk: { ...w, acRegistered: true, assetDecisions: { ...w.assetDecisions, ac: 'registered' } },
      }
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
      return w.deferred.includes(action.id)
        ? state
        : { ...state, walk: { ...w, deferred: [...w.deferred, action.id] } }
    case 'undefer':
      return { ...state, walk: { ...w, deferred: w.deferred.filter((d) => d !== action.id) } }
    case 'create-passport':
      return { ...state, passportCreated: true, walk: { ...w, step: 'moment' } }
    default:
      return state
  }
}

const KEY = 'luz-passport-prototype-v2'

function load(): AppState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as AppState
    if (parsed.v !== 2) return initialState
    return { ...initialState, ...parsed, walk: { ...initialWalk, ...parsed.walk } }
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
      /* storage may be unavailable in private mode — prototype continues in memory */
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
