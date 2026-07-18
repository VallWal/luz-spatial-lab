/**
 * Casa del Mar — all mock content for the prototype.
 * Everything in this file is fictional demonstration data.
 */

/* ————————————————————— Property ————————————————————— */

export const PROPERTY = {
  name: 'Casa del Mar',
  location: 'Bolonia, Cádiz',
  type: 'Four-bedroom villa with pool and garden',
  nextVisit: '15 August 2026',
  notes: [
    'Owner prefers shutters left partially closed.',
    'Garden contractor normally attends on Thursdays.',
    'Pool water level should remain around the midpoint of the skimmer.',
  ],
}

/* ————————————————————— Areas ————————————————————— */

export type AreaKind = 'room' | 'zone'

export interface Area {
  id: string
  name: string
  kind: AreaKind
  /** short line shown in walk overview */
  hint?: string
}

export const AREAS: Area[] = [
  { id: 'entrance', name: 'Entrance', kind: 'room', hint: 'Doorway identity, first impression' },
  { id: 'living-room', name: 'Living Room', kind: 'room', hint: 'Full discovery — the detailed example' },
  { id: 'kitchen', name: 'Kitchen', kind: 'room', hint: 'Appliances and water connections' },
  { id: 'main-bedroom', name: 'Main Bedroom', kind: 'room', hint: 'Windows, shutters, climate' },
  { id: 'guest-bedroom', name: 'Guest Bedroom', kind: 'room', hint: 'Quick capture' },
  { id: 'bathroom', name: 'Bathroom', kind: 'room', hint: 'Seals, moisture, ventilation' },
  { id: 'utility-room', name: 'Utility Room', kind: 'room', hint: 'Water heater, meters' },
  { id: 'technical-room', name: 'Technical Room', kind: 'room', hint: 'Pool equipment, electrical panel' },
  { id: 'pool-area', name: 'Pool Area', kind: 'zone', hint: 'Outdoor zone — no indoor scan needed' },
  { id: 'garden', name: 'Garden', kind: 'zone', hint: 'Irrigation, gate, planting' },
]

export const areaName = (id: string) => AREAS.find((a) => a.id === id)?.name ?? id

/* ————————————————————— Assets ————————————————————— */

export interface Asset {
  id: string
  name: string
  areaId: string
  category: string
  brand?: string
  model?: string
  serial?: string
  installed?: string
  warrantyUntil?: string
  condition: 'Good' | 'Fair' | 'Watch'
  isUtility?: boolean
}

export const ASSETS: Asset[] = [
  {
    id: 'ac-living',
    name: 'Air-conditioning unit',
    areaId: 'living-room',
    category: 'Climate',
    brand: 'Daikin',
    model: 'FTXM35R',
    serial: 'E008537-1AB4',
    installed: 'March 2022',
    warrantyUntil: 'March 2027',
    condition: 'Good',
  },
  { id: 'fireplace', name: 'Fireplace', areaId: 'living-room', category: 'Heating', condition: 'Good' },
  {
    id: 'dishwasher',
    name: 'Dishwasher',
    areaId: 'kitchen',
    category: 'Appliance',
    brand: 'Bosch',
    model: 'SMS4HVI33E',
    condition: 'Good',
  },
  { id: 'oven', name: 'Oven', areaId: 'kitchen', category: 'Appliance', brand: 'Balay', condition: 'Good' },
  { id: 'fridge', name: 'Refrigerator', areaId: 'kitchen', category: 'Appliance', condition: 'Good' },
  { id: 'ac-bedroom', name: 'Air-conditioning unit', areaId: 'main-bedroom', category: 'Climate', brand: 'Daikin', condition: 'Good' },
  { id: 'washing-machine', name: 'Washing machine', areaId: 'utility-room', category: 'Appliance', condition: 'Good' },
  {
    id: 'water-heater',
    name: 'Water heater',
    areaId: 'utility-room',
    category: 'Utility',
    brand: 'Junkers',
    condition: 'Good',
    isUtility: true,
  },
  { id: 'pool-pump', name: 'Pool pump', areaId: 'technical-room', category: 'Pool', brand: 'AstralPool', condition: 'Good' },
  { id: 'pool-filter', name: 'Pool filter', areaId: 'technical-room', category: 'Pool', condition: 'Good' },
  {
    id: 'electrical-panel',
    name: 'Electrical panel',
    areaId: 'technical-room',
    category: 'Utility',
    condition: 'Good',
    isUtility: true,
  },
  {
    id: 'irrigation',
    name: 'Irrigation controller',
    areaId: 'technical-room',
    category: 'Garden',
    brand: 'Hunter',
    condition: 'Good',
    isUtility: true,
  },
  { id: 'gate-motor', name: 'Gate motor', areaId: 'garden', category: 'Access', condition: 'Good' },
  { id: 'router', name: 'Internet router', areaId: 'living-room', category: 'Utility', condition: 'Good', isUtility: true },
]

export const assetById = (id: string) => ASSETS.find((a) => a.id === id)

/* ————————————————————— Utility hunt ————————————————————— */

export interface UtilityDef {
  id: string
  name: string
  suggestedLocation: string
  canBeAbsent?: boolean
  /** the one walked through in full detail */
  deepFlow?: boolean
}

export const UTILITIES: UtilityDef[] = [
  {
    id: 'water-main',
    name: 'Main water shut-off',
    suggestedLocation: 'Utility room, left wall, below the shelving unit.',
    deepFlow: true,
  },
  { id: 'electrical-panel', name: 'Electrical panel', suggestedLocation: 'Technical room, right of the entrance door, grey wall cabinet.' },
  { id: 'gas', name: 'Gas shut-off', suggestedLocation: '', canBeAbsent: true },
  { id: 'water-heater', name: 'Water heater', suggestedLocation: 'Utility room, back corner beside the washing machine.' },
  { id: 'router', name: 'Internet router', suggestedLocation: 'Living room, shelf beside the terrace door.' },
  { id: 'irrigation', name: 'Irrigation controller', suggestedLocation: 'Technical room, mounted above the workbench.' },
  { id: 'pool-equipment', name: 'Pool equipment', suggestedLocation: 'Technical room, pump and filter beside the pool wall.' },
]

/* ————————————————————— Checkpoints ————————————————————— */

export interface CheckpointSuggestion {
  id: string
  label: string
  areaId: string
}

export const LIVING_ROOM_CHECKPOINTS: CheckpointSuggestion[] = [
  { id: 'lr-door-lock', label: 'Check terrace-door lock', areaId: 'living-room' },
  { id: 'lr-shutters', label: 'Check shutters', areaId: 'living-room' },
  { id: 'lr-window-seals', label: 'Check window seals', areaId: 'living-room' },
  { id: 'lr-ac', label: 'Check air-conditioning operation', areaId: 'living-room' },
  { id: 'lr-ceiling', label: 'Check ceiling for humidity', areaId: 'living-room' },
  { id: 'lr-sweep', label: 'General visual sweep', areaId: 'living-room' },
]

export const POOL_CHECKPOINTS: CheckpointSuggestion[] = [
  { id: 'pool-level', label: 'Water level', areaId: 'pool-area' },
  { id: 'pool-clarity', label: 'Water clarity', areaId: 'pool-area' },
  { id: 'pool-pump-op', label: 'Pump operation', areaId: 'pool-area' },
  { id: 'pool-filter-pressure', label: 'Filter pressure', areaId: 'pool-area' },
  { id: 'pool-leaks', label: 'Visible leaks', areaId: 'pool-area' },
  { id: 'pool-cover', label: 'Pool cover condition', areaId: 'pool-area' },
]

export const KITCHEN_CHECKPOINTS: CheckpointSuggestion[] = [
  { id: 'k-sink', label: 'Check under-sink connections', areaId: 'kitchen' },
  { id: 'k-dishwasher', label: 'Run dishwasher briefly', areaId: 'kitchen' },
  { id: 'k-appliances', label: 'Check appliance operation', areaId: 'kitchen' },
  { id: 'k-sweep', label: 'General visual sweep', areaId: 'kitchen' },
]

export const UTILITY_ROOM_CHECKPOINTS: CheckpointSuggestion[] = [
  { id: 'u-heater', label: 'Check water-heater pressure', areaId: 'utility-room' },
  { id: 'u-meter', label: 'Record meter readings', areaId: 'utility-room' },
  { id: 'u-leaks', label: 'Check for leaks', areaId: 'utility-room' },
]

/** Checkpoint counts per area shown in the completed passport (sums to 48). */
export const PASSPORT_CHECKPOINTS: Record<string, string[]> = {
  entrance: ['Front-door lock and hinges', 'Intercom operation', 'Exterior light', 'Post and deliveries'],
  'living-room': [
    'Check terrace-door lock',
    'Check shutters',
    'Check window seals',
    'Check air-conditioning operation',
    'Check ceiling for humidity',
  ],
  kitchen: [
    'Check under-sink connections',
    'Run dishwasher briefly',
    'Check appliance operation',
    'Check window seal',
    'Check extractor',
    'General visual sweep',
  ],
  'main-bedroom': ['Check shutters', 'Check window seals', 'Check air-conditioning', 'General visual sweep'],
  'guest-bedroom': ['Check shutters', 'Check window', 'General visual sweep'],
  bathroom: ['Check silicone seals', 'Check for moisture', 'Run taps and shower', 'Check ventilation', 'Check drain flow'],
  'utility-room': [
    'Check water-heater pressure',
    'Record meter readings',
    'Check for leaks',
    'Check washing-machine hoses',
    'Check ventilation',
  ],
  'technical-room': [
    'Check electrical panel',
    'Check pool-pump operation',
    'Check filter pressure',
    'Check irrigation programme',
    'Check for damp',
    'General visual sweep',
  ],
  'pool-area': ['Water level', 'Water clarity', 'Pump operation', 'Filter pressure', 'Visible leaks', 'Pool cover condition'],
  garden: ['Irrigation coverage', 'Gate motor operation', 'Boundary walls', 'Terrace drainage'],
}

export const TOTAL_CHECKPOINTS = Object.values(PASSPORT_CHECKPOINTS).reduce((n, c) => n + c.length, 0)

/* ————————————————————— Passport summary ————————————————————— */

export const PASSPORT_SUMMARY = {
  areas: 10,
  identities: 8,
  assets: ASSETS.length,
  utilities: 7,
  checkpoints: TOTAL_CHECKPOINTS,
  photos: 63,
}

export interface LaterItem {
  id: string
  label: string
  detail: string
}

export const LATER_ITEMS: LaterItem[] = [
  {
    id: 'guest-tag',
    label: 'Add guest-bedroom doorway tag',
    detail: 'The room is captured with photos. Adding the doorway tag on the next visit completes its identity.',
  },
  {
    id: 'pump-manual',
    label: 'Upload pool-pump manual',
    detail: 'The manual makes servicing questions answerable directly from the passport.',
  },
  {
    id: 'gate-date',
    label: 'Confirm gate-motor installation date',
    detail: 'Helps estimate remaining service life and warranty coverage.',
  },
]

/* ————————————————————— Emergency card ————————————————————— */

export interface EmergencyEntry {
  id: string
  name: string
  location: string
  photoSeed: string
}

export const EMERGENCY_ENTRIES: EmergencyEntry[] = [
  { id: 'water-main', name: 'Main water shut-off', location: 'Utility room, left wall, below the shelving unit.', photoSeed: 'utility-valve' },
  { id: 'electrical-panel', name: 'Electrical panel', location: 'Technical room, right of the entrance door, grey wall cabinet.', photoSeed: 'panel' },
  { id: 'water-heater', name: 'Water heater', location: 'Utility room, back corner beside the washing machine.', photoSeed: 'heater' },
]

/* ————————————————————— History & activity ————————————————————— */

export interface TimelineEvent {
  id: string
  date: string
  title: string
  detail: string
  kind: 'inspection' | 'service' | 'passport' | 'note'
}

export const AC_TIMELINE: TimelineEvent[] = [
  {
    id: 'ac-registered',
    date: 'Today',
    title: 'Registered in Property Passport',
    detail: 'Identity tag attached. Nameplate captured — Daikin FTXM35R.',
    kind: 'passport',
  },
  {
    id: 'ac-service',
    date: '14 May 2025',
    title: 'Serviced — filters cleaned, refrigerant checked',
    detail: 'CoolTech Climatización, Cádiz. Unit reported in good condition.',
    kind: 'service',
  },
  {
    id: 'ac-installed',
    date: 'March 2022',
    title: 'Installed',
    detail: 'Installation recorded from owner documentation.',
    kind: 'note',
  },
]

export const RECENT_ACTIVITY: TimelineEvent[] = [
  {
    id: 'act-passport',
    date: 'Today',
    title: 'Property Passport created',
    detail: `Founding Walk completed. ${PASSPORT_SUMMARY.areas} areas, ${PASSPORT_SUMMARY.assets} assets and ${TOTAL_CHECKPOINTS} checkpoints are now remembered.`,
    kind: 'passport',
  },
  {
    id: 'act-emergency',
    date: 'Today',
    title: 'Emergency Card completed',
    detail: 'Water, electricity and heating shut-offs documented with photos and locations.',
    kind: 'passport',
  },
  {
    id: 'act-ac',
    date: 'Today',
    title: 'Air-conditioning unit registered',
    detail: 'Living room · Daikin FTXM35R with warranty until March 2027.',
    kind: 'passport',
  },
  {
    id: 'act-service',
    date: '14 May 2025',
    title: 'Air-conditioning service (imported)',
    detail: 'Historical record added from owner documentation.',
    kind: 'service',
  },
]

/* ————————————————————— Owner view ————————————————————— */

export const VISIT_STORY = {
  date: 'Today',
  inspector: 'Walter',
  text: 'Walter visited Casa del Mar today. All scheduled areas were checked. No urgent issues were found. The pool equipment is operating normally and the property was secure on departure.',
  highlights: [
    { label: 'Areas checked', value: '10 of 10' },
    { label: 'Urgent issues', value: 'None' },
    { label: 'Pool equipment', value: 'Normal' },
    { label: 'Secure on departure', value: 'Yes' },
  ],
}

export const OWNER_TIMELINE: TimelineEvent[] = [
  {
    id: 'ot-1',
    date: 'Today',
    title: 'Founding visit — Property Passport created',
    detail: 'Casa del Mar now has a living record of its rooms, equipment and condition.',
    kind: 'passport',
  },
  {
    id: 'ot-2',
    date: '14 May 2025',
    title: 'Air-conditioning serviced',
    detail: 'Filters cleaned and refrigerant checked by CoolTech Climatización.',
    kind: 'service',
  },
  {
    id: 'ot-3',
    date: 'Spring 2025',
    title: 'Garden maintenance visits',
    detail: 'Regular Thursday attendance by the garden contractor.',
    kind: 'note',
  },
]

/* ————————————————————— Baseline photo shots (Living Room) ————————————————————— */

export interface ShotDef {
  id: string
  label: string
  seed: string
}

export const LIVING_ROOM_SHOTS: ShotDef[] = [
  { id: 'overview', label: 'Room overview', seed: 'lr-overview' },
  { id: 'window-wall', label: 'Window wall', seed: 'lr-windows' },
  { id: 'terrace-door', label: 'Terrace door', seed: 'lr-terrace' },
  { id: 'ceiling', label: 'Ceiling', seed: 'lr-ceiling' },
  { id: 'floor', label: 'Floor', seed: 'lr-floor' },
  { id: 'detail', label: 'A detail worth remembering', seed: 'lr-detail' },
]

/* ————————————————————— Room-scan findings (Living Room) ————————————————————— */

export interface ScanItem {
  id: string
  label: string
  kind: 'structure' | 'context'
  removable?: boolean
}

export const LIVING_ROOM_SCAN_ITEMS: ScanItem[] = [
  { id: 'walls', label: '4 walls', kind: 'structure' },
  { id: 'windows', label: '2 windows', kind: 'structure' },
  { id: 'terrace-door', label: 'Terrace door', kind: 'structure' },
  { id: 'fireplace', label: 'Fireplace', kind: 'structure', removable: true },
  { id: 'ac', label: 'Air-conditioning unit', kind: 'structure', removable: true },
  { id: 'sofa', label: 'Sofa — kept as temporary room context', kind: 'context', removable: true },
]
