/**
 * Prototype 2 scenario — Casa del Mar, today's recurring inspection.
 * All content is fictional demonstration data. The scenario has two phases:
 * pre-visit ("Attention needed") and post-approval ("Stable").
 */

import type { AppState } from './store'

/* ————————————————— The open finding ————————————————— */

export const MOISTURE_FINDING = {
  id: 'moisture-kitchen',
  title: 'Moisture below the kitchen sink',
  severity: 'Moderate' as const,
  firstSeen: '12 June 2026',
  roomId: 'kitchen',
  recommendation: 'Replace worn sink seal during next contractor visit.',
  ownerTranslation: 'This needs attention, but it is not urgent.',
  ownerDetail:
    'A damp patch below the kitchen sink, first noticed in June. It is drying out, but the worn seal should still be replaced to stop it returning.',
}

export const TERRACE_FINDING = {
  id: 'terrace-handle',
  title: 'Loose terrace-door handle',
  severity: 'Minor' as const,
  roomId: 'living-room',
  recommendation: 'Tighten or replace handle fixing.',
  ownerTranslation: 'A small thing, easily fixed.',
  ownerDetail: 'The terrace-door handle has worked itself loose. A quick tighten or a new fixing solves it.',
}

export const OWNER_REQUEST = 'Please confirm that the shutters remain partially closed.'

/* ————————————————— Visit structure ————————————————— */

export const VISIT_META = {
  scheduled: 'Today · 10:00',
  areas: 10,
  checkpoints: 32,
  estimated: '75 minutes',
  accessNote: 'Keys from the LUZ office · alarm details stored securely',
  seasonalFocus: 'Mid-summer — pool equipment under heaviest load, irrigation running daily.',
  briefing:
    'Casa del Mar was stable at the last visit. Today, recheck the moisture below the kitchen sink, confirm the owner’s shutter request and inspect the pool equipment.',
  lastVisit: '12 June 2026',
}

export interface MeterDef {
  id: 'electricity' | 'water'
  name: string
  reading: string
  previous: string
  delta: string
  note: string
}

export const METERS: MeterDef[] = [
  {
    id: 'electricity',
    name: 'Electricity',
    reading: '46,218 kWh',
    previous: '45,981 kWh',
    delta: '+237 kWh since last visit',
    note: 'Normal for the season',
  },
  {
    id: 'water',
    name: 'Water',
    reading: '18,412 m³',
    previous: '18,378 m³',
    delta: '+34 m³ since last visit',
    note: 'Normal for the season',
  },
]

export const KITCHEN_VISIT_CHECKPOINTS = [
  { id: 'k-sink', label: 'Sink and plumbing', hint: 'Look under the unit — the finding lives here' },
  { id: 'k-dishwasher', label: 'Dishwasher', hint: 'Brief run, check the door seal' },
  { id: 'k-window', label: 'Window seals', hint: 'Press gently along the frame' },
  { id: 'k-shutters', label: 'Shutters', hint: 'Owner asks: partially closed' },
  { id: 'k-ceiling', label: 'Ceiling', hint: 'Corners and above the extractor' },
  { id: 'k-visual', label: 'General visual check', hint: 'Anything the list doesn’t know about' },
]

export const LIVING_VISIT_CHECKPOINTS = [
  { id: 'l-shutters', label: 'Shutters — owner request', hint: 'Confirm partially closed' },
  { id: 'l-terrace', label: 'Terrace-door lock & handle', hint: 'Lock, hinges, handle' },
  { id: 'l-window', label: 'Window seals', hint: '' },
  { id: 'l-visual', label: 'General visual check', hint: '' },
]

export interface QuickArea {
  id: string
  name: string
  action: string
  result: string
}

export const QUICK_AREAS: QuickArea[] = [
  { id: 'main-bedroom', name: 'Main Bedroom', action: 'Confirm shutters & climate', result: 'All healthy — 4 checkpoints' },
  { id: 'bathroom', name: 'Bathroom', action: 'Record all checkpoints healthy', result: 'Seals dry, drains clear — 5 checkpoints' },
  { id: 'utility-room', name: 'Utility Room', action: 'Confirm water heater condition', result: 'Pressure in the green band — 4 checkpoints' },
  { id: 'pool-area', name: 'Pool Area', action: 'Water · level · pump · filter · leaks', result: 'Pool healthy — level at skimmer midpoint' },
  { id: 'garden', name: 'Garden', action: 'Irrigation & boundaries', result: 'Running to schedule — 3 checkpoints' },
  { id: 'main-gate', name: 'Main Gate', action: 'Confirm gate motor functioning', result: 'Opens and closes cleanly' },
  { id: 'exterior', name: 'Exterior', action: 'Walls, terraces, drainage', result: 'No new cracks — 3 checkpoints' },
  { id: 'technical-room', name: 'Technical Room', action: 'Panel & pool equipment', result: 'All equipment nominal — 4 checkpoints' },
]

export const FREE_OBSERVATION = {
  text: 'Small amount of garden debris near the side entrance.',
  kind: 'note',
}

export const SKIP_REASONS = ['Locked', 'Inaccessible', 'Weather', 'Owner requested', 'Not applicable', 'Other']

export const REVIEW_STATS = {
  areas: 10,
  checkpoints: 32,
  individual: 29,
  batch: 3,
  findings: 2,
  skipped: 1,
  meters: 2,
}

export const REOBS_VOICE = 'Area is drier than at the previous visit. The seal should still be replaced.'
export const FINDING_VOICE = 'Terrace door handle has come loose — minor, but worth tightening before it worsens.'

/* ————————————————— Documents ————————————————— */

export interface DocDef {
  id: string
  name: string
  kind: string
  meta: string
  summary: string
}

export const DOCUMENTS: DocDef[] = [
  { id: 'overview', name: 'Property overview', kind: 'LUZ document', meta: 'Updated today', summary: 'Rooms, zones, assets and key contacts for Casa del Mar in one sheet.' },
  { id: 'ac-manual', name: 'Air-conditioning manual', kind: 'Manual · Daikin FTXM-R', meta: 'Added at passport setup', summary: 'Operating and maintenance manual, including error-code reference.' },
  { id: 'pump-manual', name: 'Pool pump manual', kind: 'Manual · AstralPool', meta: 'To be added', summary: 'Requested from the owner — noted on the items-to-complete list.' },
  { id: 'electrical', name: 'Electrical diagram', kind: 'Drawing', meta: 'From owner documentation', summary: 'Circuit overview for the main panel in the technical room.' },
  { id: 'insurance', name: 'Insurance policy', kind: 'Policy summary', meta: 'Valid until Feb 2027', summary: 'Cover summary — the full policy stays with the owner.' },
  { id: 'contractors', name: 'Contractor contact sheet', kind: 'LUZ document', meta: 'Updated May 2026', summary: 'Trusted local contractors: pool, electrical, plumbing, garden.' },
]

/* ————————————————— Derived scenario ————————————————— */

export type PropertyHealth = 'Healthy' | 'Stable' | 'Attention needed' | 'Action required'

export function visitApproved(state: AppState): boolean {
  return state.visit.approved
}

export function propertyStatus(state: AppState): PropertyHealth {
  return state.visit.approved ? 'Stable' : 'Attention needed'
}

export function statusExplanation(state: AppState): string {
  return state.visit.approved
    ? 'One moderate issue is improving. One new minor issue was recorded. No urgent action is required.'
    : 'One moderate issue is waiting to be rechecked at today’s visit.'
}

export function openFindingsCount(state: AppState): number {
  return state.visit.approved ? 2 : 1
}

export interface ActivityEvent {
  id: string
  date: string
  title: string
  detail: string
  kind: 'visit' | 'finding' | 'asset' | 'service' | 'document' | 'passport'
}

export function activityEvents(state: AppState): ActivityEvent[] {
  const post: ActivityEvent[] = state.visit.approved
    ? [
        { id: 'a-owner-update', date: 'Today', title: 'Owner update delivered', detail: 'Calm visit story sent — moisture improving, one new minor item.', kind: 'visit' },
        { id: 'a-terrace', date: 'Today', title: 'New finding — loose terrace-door handle', detail: 'Minor · recorded at the terrace-door checkpoint with photo and voice note.', kind: 'finding' },
        { id: 'a-pool', date: 'Today', title: 'Pool checked', detail: 'Water clear, level at skimmer midpoint, pump and filter normal.', kind: 'visit' },
        { id: 'a-recheck', date: 'Today', title: 'Moisture finding rechecked — improved', detail: 'Comparable photo captured. Seal replacement still recommended.', kind: 'finding' },
        { id: 'a-visit', date: 'Today', title: 'Inspection completed and approved', detail: '10 areas · 32 checkpoints · 2 meter readings · approved by Walter.', kind: 'visit' },
      ]
    : []
  const base: ActivityEvent[] = [
    { id: 'a-moisture', date: '12 June 2026', title: 'Moisture finding created', detail: 'Below the kitchen sink · moderate · photo evidence attached.', kind: 'finding' },
    { id: 'a-baseline', date: '12 June 2026', title: 'Initial baseline captured', detail: '63 reference photos across 10 areas.', kind: 'visit' },
    { id: 'a-ac', date: '12 June 2026', title: 'Air-conditioning registered', detail: 'Daikin FTXM35R · living room · warranty until March 2027.', kind: 'asset' },
    { id: 'a-passport', date: '12 June 2026', title: 'Property Passport created', detail: 'Founding Walk completed — Casa del Mar’s memory begins.', kind: 'passport' },
  ]
  return [...post, ...base]
}

export interface FindingView {
  id: string
  title: string
  severity: 'Minor' | 'Moderate'
  status: string
  roomId: string
  recommendation: string
}

export function openFindings(state: AppState): FindingView[] {
  const list: FindingView[] = [
    {
      id: MOISTURE_FINDING.id,
      title: MOISTURE_FINDING.title,
      severity: 'Moderate',
      status: state.visit.approved ? 'Improved · still open' : 'Open · recheck today',
      roomId: 'kitchen',
      recommendation: state.visit.reobsRecommendation,
    },
  ]
  if (state.visit.approved)
    list.push({
      id: TERRACE_FINDING.id,
      title: state.visit.finding.description,
      severity: state.visit.finding.severity,
      status: 'New · recorded today',
      roomId: 'living-room',
      recommendation: state.visit.finding.recommendation,
    })
  return list
}

/* ————————————————— Owner content ————————————————— */

export function ownerHeadline(state: AppState): { line: string; sub: string } {
  return state.visit.approved
    ? { line: 'Everything is under control.', sub: 'Walter completed today’s inspection. No urgent issues were found.' }
    : { line: 'Attention needed — visit today.', sub: 'One item below the kitchen sink is being watched. Today’s inspection will recheck it.' }
}

export const OWNER_VISIT_STORY = {
  headline: 'A thorough summer visit — and good news under the sink',
  text: 'Walter visited Casa del Mar today and completed the scheduled inspection. The moisture below the kitchen sink has improved since the last visit, although the seal should still be replaced. A loose terrace-door handle was also recorded as a minor issue. The pool equipment is operating normally, the shutters were left partially closed as requested and the property was secure on departure.',
  checked: [
    'All scheduled areas checked or explained',
    'Moisture below the kitchen sink — improved',
    'Minor terrace-door handle issue recorded',
    'Pool equipment operating normally',
    'Shutters left partially closed, as requested',
    'Property secured on departure',
  ],
  next: 'The sink seal will be replaced at the next contractor visit — we will propose a date. The terrace-door handle will be tightened at the same time. Nothing needs you before then.',
}
