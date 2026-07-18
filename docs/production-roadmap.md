# Production Roadmap — Property Passport (iOS)

**Role:** Lead iOS Architect / Technical Lead
**Source of truth for UX:** the clickable prototype in `prototype/` (per decision of 18 July 2026). No redesigns except where a platform limitation forces one; every such case is flagged inline as **UX-DEVIATION**.
**Status:** planning document. No production code exists or is implied. LUZ Inspector (production) remains untouched.

---

## 1. Feature Inventory

Every user-facing feature in the prototype, grouped by domain.

**Property Passport (the artifact)**
P1 Property record (name, location, type, notes) · P2 Passport status model (Operational + completeness, never a percentage) · P3 Items-to-complete list with defer-to-next-visit · P4 Passport creation moment · P5 Dashboard (header, visit facts, rooms/zones, assets, utilities, checkpoints, memory, items, activity)

**Founding Walk (the flow)**
F1 Walk launcher/resume with persistent progress · F2 Property introduction with notes and time expectation · F3 Preparation readiness check · F4 Entrance identity registration · F5 Walk overview (route preview) · F6 Room discovery (doorway tag → scan → review → photos) · F7 Simulated-in-prototype room scan with progress guidance and failure fallback · F8 Scan review (detected elements, remove/restore, add missed, rename room) · F9 Baseline photo sequence (guided shots, retake, skip, extras) · F10 Accelerated room flow (compressed per-room decisions) · F11 Pause anywhere / resume later · F12 Skip-anything-defer-it model

**Recurring Inspection** *(implied by the prototype's dashboard and design docs; thin in prototype)*
R1 Load passport context per room · R2 One-tap checkpoint OK · R3 Finding capture (photo + note/voice) · R4 Re-observation with prior-photo comparison · R5 Exit completeness review and explicit approval

**Assets**
A1 Asset suggestion cards per room · A2 Full registration flow (overview photo → nameplate photo → tag → confirm extracted fields) · A3 Nameplate field extraction (brand/model/serial) · A4 Asset detail (facts, documents, warranty, checkpoints, timeline) · A5 Asset service timeline with imported events

**Utilities**
U1 Utility Hunt guided section · U2 Deep registration (tag → close-up → surroundings → plain-language location, voice-assisted) · U3 Quick registration · U4 "Not present" recording · U5 Utility rows on dashboard

**Emergency Card**
E1 Dedicated high-legibility view · E2 Per-entry photo pair + location description · E3 Open-location on simplified plan · E4 Share emergency access (time-limited) · E5 Access-details-never-shown security posture

**Property Memory**
M1 Standing property notes · M2 Documents/manuals/warranty records · M3 Recent activity feed + activity detail · M4 Baseline photo history per room · M5 Meter-reading checkpoint concept

**Owner Experience**
O1 "Is my house okay" hero answer · O2 Visit story (narrative + highlights + photos) · O3 At-a-glance tiles (pool, utilities, water, history) · O4 Explore (passport, rooms, assets, timeline) · O5 Property timeline

**Shared Components**
S1 Design system (navy/cream/gold, serif display, cards, list rows, status badges) · S2 Bottom action bar with single primary · S3 Tag interaction (NFC + QR fallback) · S4 Camera capture surface · S5 Voice capture surface · S6 Progress pips · S7 Local persistence of all state · S8 Reset (prototype-only; becomes "new property" in production)

---

## 2. Technical Dependencies

Legend: ✓ required · (✓) later phase. Everything not listed for a feature is not needed for it.

| Feature group | UI | Local state | Backend | Camera | Photos | NFC | QR | RoomPlan | ARKit | Location | Voice | AI | Offline DB | Sync | Push |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P1–P5 Passport | ✓ | ✓ | (✓) | | ✓ | | | | | | | | ✓ | (✓) | |
| F1–F5, F11–F12 Walk shell | ✓ | ✓ | | | | | | | | (✓ geofence) | | | ✓ | | |
| F4/F6 Identity (tags) | ✓ | ✓ | | ✓ | | ✓ | ✓ | | | | | | ✓ | | |
| F7–F8 Room scan | ✓ | ✓ | | ✓ | | | | ✓ | ✓ | | | | ✓ | | |
| F9 Baseline photos | ✓ | ✓ | | ✓ | ✓ | | | | | | | | ✓ | | |
| R1–R5 Recurring | ✓ | ✓ | (✓) | ✓ | ✓ | ✓ | ✓ | | (✓ anchors) | | (✓) | (✓) | ✓ | (✓) | |
| A1–A5 Assets | ✓ | ✓ | | ✓ | ✓ | ✓ | ✓ | | | | | ✓ OCR | ✓ | | |
| U1–U5 Utilities | ✓ | ✓ | | ✓ | ✓ | ✓ | ✓ | | | | ✓ | | ✓ | | |
| E1–E5 Emergency | ✓ | ✓ | ✓ share | | ✓ | | | | | | | | ✓ | ✓ share | |
| M1–M5 Memory | ✓ | ✓ | (✓) | | ✓ | | | | | | | | ✓ | (✓) | |
| O1–O5 Owner | ✓ | | ✓ | | ✓ | | | | | | | (✓ story) | | ✓ | (✓) |

**Blockers (must be resolved before the features they gate):**

- **B1 — NFC platform constraints gate S3.** Core NFC requires a foreground reader session (user-initiated) *or* background NDEF reading, which only fires for NDEF-formatted tags encoding a URL and delivers via Universal Link. Zero-tap tagging — which the design review demands and real fieldwork deserves — therefore **requires deciding the tag payload format (NDEF URL + app universal link, opaque ID in path) before the first tag is ordered or glued to a wall.** **UX-DEVIATION (forced):** the prototype's "Tap NFC tag" button becomes "hold phone to tag" with an automatically arming session where backgrounding rules allow, and an explicit arm button only inside the app on older devices. This is the platform's constraint, not a redesign.
- **B2 — RoomPlan gates F7 and constrains devices.** LiDAR-equipped iPhone Pro/iPad Pro only; indoor only; no persistent anchors across sessions. The prototype's photos-only fallback (F7's failure path) is what makes this a constraint rather than a blocker: **the fallback ships first, the scan is an enhancement** (see §3).
- **B3 — Anchor persistence gates R4's precise tier only.** Cross-session relocalization is unproven (see §6/§7). Nothing in the MVP depends on it; recurring-inspection precision does.
- **B4 — Sharing (E4) and Owner (O*) gate on backend existence.** Everything else runs device-local. These two are the *only* near-term features that force a server.
- **B5 — Voice transcription quality gates AI extraction, not capture.** Raw audio capture has no dependency; everything downstream of it does.

---

## 3. MVP — the smallest production build one real inspector can test

**MVP = the Founding Walk on real hardware with real media, minus RoomPlan, minus AI, minus backend.** One inspector, one LiDAR-irrelevant iPhone, one real property, producing a real passport stored on device.

**In (and why):**

- Property record + walk shell + pause/resume/defer (F1–F5, F11–F12) — the spine; nothing testable exists without it.
- Tag registration for rooms, entrance, assets, utilities via **NFC + QR** (S3, F4, F6a) — identity is the architecture's load-bearing decision (passport design doc); it must be validated with real tags on real doorframes, and it needs no server.
- **Photos-only room capture** (F9, plus F7's fallback path as the *primary* path) — the prototype already contains this UX for the bathroom; the MVP simply makes the graceful-degradation path the default. Real camera, guided shots, retake/skip.
- Asset registration with **on-device nameplate OCR** (A1–A3 via Vision framework) — high value, zero cloud dependency, and the 30–45-second target is only measurable with a real camera and a real grimy nameplate.
- Utility Hunt + Emergency Card, view-only sharing deferred (U1–U4, E1–E3) — the highest value-per-engineering-hour in the entire product, and pure local tech.
- Checkpoint acceptance from templates (F10's decisions) — data entry, no exotic tech, needed so the passport is *operational* in the product's own definition.
- Passport dashboard + detail views, local (P5, A4, M1, M3) — the payoff screen; the inspector must see what the walk built.
- Voice as **raw audio memo attached to entities** — capture is trivial and builds the field-audio corpus for later AI phases; transcription is explicitly *not* in MVP.
- Local persistence of everything + JSON/media export — the escape hatch that substitutes for sync during testing.

**Out (and why):**

- RoomPlan scanning — the riskiest tech; excluded so that MVP feedback measures the *workflow*, not scan quality. Enters at M3 behind the already-designed fallback.
- AI extraction / transcription — quality risk contaminates trust if premature; corpus first (B5).
- Backend, sync, sharing, owner experience — one inspector on one device needs none of it (B4); every week spent here before workflow validation is premature.
- Recurring inspection — needs a passport to exist for weeks first; it is M4 by calendar necessity, not preference.
- Push, geofencing, plan rendering from scans — enhancements of things not yet validated.

## 4. Development Phases

**M0 — Spikes & decisions (see §7).** *Complexity: S per spike.* Dependencies: hardware + tags ordered day one. Risk: skipping this and paying in M3. Acceptance: every §7 spike has a written verdict; tag payload format (B1) is decided and test tags are deployed on a real property.

**M1 — Foundation.** Domain model + persistence + design system + walk state machine, no capture tech. *Complexity: M.* Depends: contracts from spikes S0. Risks: over-modeling; mitigated by porting the prototype's store shape (it is the proven interaction model). Acceptance: walk runs end-to-end on device with stub capture, survives kill/relaunch mid-walk, export produces a valid passport JSON.

**M2 — MVP capture (= §3).** Camera, photo pipeline, NFC/QR, OCR, voice memos, Emergency Card, dashboard. *Complexity: L.* Depends: M1, B1 decision. Risks: NFC session UX friction; photo pipeline storage growth. Acceptance: **one LUZ inspector creates a real passport for a real villa in ≤ 90 added minutes, unaided, and can find the water shut-off from the Emergency Card afterwards** — the prototype's test-script criteria, on production code.

**M3 — RoomPlan enhancement.** Scan behind the fallback; parametric model storage; scan review mapped to detected surfaces; simplified plan rendering. *Complexity: L.* Depends: M2; spike S2 verdict. Risks: R1/R2 of §8; device gate (B2). Acceptance: a scan-capable room upgrades an existing photos-only room without data loss; scan failure lands exactly on the prototype's fallback path.

**M4 — Recurring inspection.** Briefing, room context via tag/room entry, one-tap OK, findings, re-observation ghost overlay, exit review + approval. *Complexity: L.* Depends: passports aged ≥ 1 visit cycle; M2. Risks: this is where the time-inequality (faster than checklist) is finally measured. Acceptance: a repeat visit on a real passport completes faster than the inspector's current workflow, with all checkpoint outcomes recorded.

**M5 — Voice→AI assistance.** On-device transcription, structured finding extraction, duplicate suggestion; inspector-confirm pattern per the prototype's sparkle semantics. *Complexity: M–L.* Depends: audio corpus from M2–M4; spike S7. Risks: dialect WER; correction cost exceeding typing. Acceptance: extraction-accepted-without-edit rate ≥ 70% on real field audio, measured, or the feature stays flagged experimental.

**M6 — Backend, sync, sharing, owner.** Op-log sync to hosted Postgres+storage (Supabase-class), Emergency-Card share links, owner read-only surface (web first), LUZ Inspector integration contracts. *Complexity: L–XL.* Depends: stable local schema (post-M4). Risks: sync conflicts, GDPR surface. Acceptance: two devices converge on one property; a shared emergency link works, expires, and never exposes codes; production LUZ Inspector remains untouched.

## 5. Technical Architecture

- **Language/UI:** Swift 6 + SwiftUI, per the standing architecture decision (native-first; the lab's web prototype was UX exploration, not a platform choice). iOS 17 minimum (Observation framework, mature RoomPlan APIs); capture-device gate applies only to the scan feature, not the app.
- **State management:** the prototype's reducer store ports almost 1:1 — a single `WalkState` value type + action enum per flow, held in `@Observable` stores; unidirectional, no third-party framework. *Why:* the walk is a step machine already proven interactively; value-type reducers make pause/resume and persistence trivial and testable.
- **Navigation:** `NavigationStack` for post-walk browsing (dashboard/details mirror the hash routes); the walk itself is **state-driven, not navigation-driven** — one container view switching on `step`, exactly like the prototype. *Why:* the prototype proved a walk step must survive relaunch; serialized state does that, navigation stacks fight it.
- **Local database:** **SQLite via GRDB.** Append-only tables for observations/events (the memory), regular tables for current-state projections (rooms, assets, checkpoints), FTS for memory search later. *Why:* offline-first is a product constraint; GRDB gives migrations, value-type records, and no ORM magic; append-only mirrors the "nothing silently rewritten" product promise at the schema level and makes M6 sync an op-log replay, not an invention.
- **Synchronisation (M6):** device-generated ULIDs everywhere; an operations log (entity, op, payload, device, timestamp) pushed/pulled against the backend; last-writer-wins only for scalar edits, append-merge for events/media. *Why:* the domain is overwhelmingly append-only, which is the one sync problem that stays simple if the schema respects it from M1.
- **Backend APIs (M6):** hosted Postgres + object storage + auth (Supabase-class) behind a thin typed API layer owned by us; share links as signed, expiring tokens. Never direct-to-Airtable — integration with production goes through the exported contracts (per the standing system-overview rule).
- **Image handling:** originals to per-property directories in Application Support (excluded-from-backup evaluated per GDPR stance), HEIC; on-capture downsampled derivative (~2048px) + thumbnail stored via content hash; DB stores references + capture context (room/asset/checkpoint, shot type, timestamp). *Why:* a villa passport is hundreds of images; derivatives keep the UI instant and future sync affordable, hashes deduplicate retakes.
- **Offline strategy:** the app *is* offline; there is no online mode to fall back from. All features complete locally; M6 sync is a background reconciliation, and share/owner features are the only ones allowed to say "needs connection."
- **File structure:** exactly the standing repo plan —
  `packages/InspectionKit` (domain, reducers, GRDB, export — zero Apple-capture imports) · `packages/SpatialEngine` (RoomPlan/ARKit/anchoring behind protocols; M3+) · `packages/CaptureKit` (camera, NFC/QR, OCR, audio — thin wrappers, protocol-fronted for simulator work) · `apps/PassportApp` (SwiftUI app, design system, flows) · `contracts/` (versioned JSON Schemas: the export format and the future integration surface). *Why:* the engine stays replaceable, the domain stays testable on any Mac, and the simulator (no NFC/LiDAR) can run the whole app against `CaptureKit` fakes — which the prototype has already defined the behavior of.

## 6. Unknowns Requiring Validation

1. RoomPlan accuracy/completeness in real Cádiz-style rooms (small tiled baths, mirrored wardrobes, bright terraces) — and merged multi-room behavior.
2. Cross-session relocalization decay over weeks (the standing lab question; only affects M4's precise tier).
3. NFC background-read reliability through doorframe materials, paint, and metal boxes (electrical panels are Faraday-adjacent).
4. QR durability: Andalusian UV, pool chemicals, cleaning staff; engraved vs printed.
5. Doorway recognition ergonomics: tag height/position conventions that survive real doors and one-handed reach.
6. Inspector behaviour: does tagging survive time pressure; is voice used or avoided in occupied homes (discretion mode usage rate).
7. Nameplate OCR hit-rate on aged/curved/reflective plates; Latin serials vs stylized brand fonts.
8. Property size limits: passport data volume for a 300 m² villa (photos, scan payloads) vs device storage and future sync cost.
9. Time budget truth: does the founding walk really fit +45–90 min on production hardware.
10. Dialect German transcription WER on-device (Speech vs WhisperKit-class models).
11. GDPR posture for interior imagery + audio: consent capture flow, retention, crypto-shredding design (must be written before M2 field tests, not after).
12. Whether the accelerated-room pattern (prototype's compression) maps to reality or real rooms all need the full loop.

## 7. Technical Spikes (before M1 code)

- **S0 Contracts draft** — turn the prototype's data.ts shapes into `contracts/v0` JSON Schemas; ½ day; unblocks everything.
- **S1 NFC end-to-end** — write NDEF URL tags, background read → Universal Link → correct entity opened; foreground session fallback; panel-adjacent metal test. 2 days + hardware. *Decides B1 and the tag order.*
- **S2 RoomPlan reality check** — scan 6 real rooms incl. worst cases; export parametric + USDZ; re-scan same rooms; measure. 2 days + LiDAR device.
- **S3 Relocalization decay** — place ARWorldMap anchors, re-find at day 1/7/28; tag-assisted vs raw. Calendar-bound: **start immediately** even though results land mid-M2.
- **S4 Nameplate OCR** — Vision text recognition against 20 photographed real nameplates; measure field-level accuracy. 1 day.
- **S5 Photo pipeline** — HEIC capture → derivative → hashed store → 500-photo synthetic passport; measure size, list scroll performance. 1 day.
- **S6 Op-log sync rehearsal** — two simulators, one seeded Postgres, replay/converge the draft op-log; conflicts on scalar rename. 2 days. (Informs schema, even though M6 is far away — this is the anti-rework spike.)
- **S7 Field speech** — record 10 real inspection narrations (with consent), on-device transcribe both engines, compute WER. 2 days spread across real visits.
- **S8 Tag hardware trial** — order 3 candidate NFC+QR tag products now, mount at one property, inspect monthly. Zero engineering, pure calendar.

## 8. Top 10 Technical Risks

| # | Risk | Prob. | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Cross-session relocalization unreliable | High | High (kills precise tier only) | Tiered fidelity is already the architecture; S3 early; ship tags-first |
| 2 | RoomPlan output poor in real rooms | Med | High (M3 value) | S2 with worst cases; photos-only path is the shipped default |
| 3 | NFC read friction (materials, sessions) makes tagging annoying | Med | High (identity backbone) | S1; QR fallback on every tag; tag-placement conventions from field trial |
| 4 | Founding walk exceeds time budget on production hardware | Med | High (product economics) | M2 acceptance measures it; cut baseline-photo protocol first, never tags/utilities |
| 5 | Photo/scan data volume breaks device storage or future sync cost | Med | Med | S5 numbers; derivatives + hashing from day one; scan raw kept but exportable/prunable |
| 6 | Sync conflicts corrupt trust once multi-device (M6) | Med | High (later) | Append-only op-log schema from M1 (S6); scalar LWW documented |
| 7 | OCR misreads pollute asset records | Med | Med | Confirm-before-save UX already in prototype; nameplate photo always kept for re-OCR |
| 8 | Dialect transcription too weak → AI phase disappoints | Med | Med | Corpus from M2; M5 acceptance gate (≥70% accept rate) keeps it honest |
| 9 | Scope creep from prototype's breadth (owner, sharing pulled early) | High | Med | This document is the fence; B4 states the only server-forcing features |
| 10 | GDPR/consent gap discovered after real-home media exists | Low | High | Unknown #11 resolved on paper before M2 field testing; per-property encryption keys designed into media store |

## 9. Build Order (rework-minimising, always-usable)

1. `contracts/v0` schemas (S0 output) — the vocabulary everything compiles against.
2. `InspectionKit`: entities + append-only event log + GRDB persistence + passport export. *(Usable: unit-tested library.)*
3. Walk state machine in `InspectionKit` (port of prototype store + step graph). *(Usable: walk runs headless in tests.)*
4. `PassportApp` shell: design system, launcher, walk container with stubbed capture, dashboard read-only. *(Usable: the prototype, native, on a phone.)*
5. `CaptureKit` camera + photo pipeline; wire baseline photos and asset photos. *(Usable: real media in real passports.)*
6. `CaptureKit` NFC/QR per S1 decision; entrance/room/asset/utility identity. *(Usable: the identity backbone, field-testable.)*
7. Vision OCR into asset registration; voice memo capture. *(Usable: full MVP = M2; first real-inspector test happens here.)*
8. Emergency Card views + export/print.
9. Feedback pass from M2 field test (the one sanctioned source of UX change).
10. `SpatialEngine`: RoomPlan capture behind protocol; scan review; plan rendering; upgrade-in-place for photo-only rooms. *(M3.)*
11. Recurring-inspection flow: briefing, room context, checkpoint OK, findings, re-observation overlay, exit approval. *(M4; usable end-to-end product.)*
12. Speech transcription + extraction with confirm UX. *(M5.)*
13. Op-log sync + backend + share links + owner web surface. *(M6.)*
14. Integration contracts freeze + LUZ Inspector adoption plan (separate document, production team's call).

Each numbered step leaves a runnable, demonstrably better app than the step before; nothing later forces rewriting anything earlier except by decision of a spike verdict — which is what the spikes are for.

---

*Companion documents: `architecture-review.md` (standing technical positions), `property-passport-design.md` (product design source), `prototype-design-review.md` (UX findings to fold into M2's feedback pass), `prototype-guide.md` / `prototype-test-script.md` (the UX source of truth and its test protocol).*
