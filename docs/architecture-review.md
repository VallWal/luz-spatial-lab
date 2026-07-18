# LUZ Spatial Lab — Architecture Review

**Reviewer:** Principal Software Architect
**Date:** 18 July 2026
**Scope:** Complete project documentation (`README.md`, `vision.md`, `architecture.md`, `system-overview.md`, `product-requirements.md`, `roadmap.md`, `implementation-plan.md`)
**Status of project:** Pre-code. No implementation exists. This review evaluates the documented intent.

---

## 1. Overall Assessment of the Vision

The vision is sound, and it is sound for a reason that is easy to miss on first reading: **this is not actually a 3D/AR vision — it is a data continuity vision wearing spatial clothes.** The documents repeatedly and correctly state that "the spatial model is a navigation layer, not the product." The real product thesis is the *Living Property History*: every inspection appends to a permanent, structured memory of the property instead of producing another disconnected PDF. That thesis is strong, differentiated, and — critically — does not depend on any fragile technology to be true. Spatial computing is positioned as an accelerant, not a foundation.

The market framing is also right. Recurring residential inspections are an underserved niche between "one-off home inspection report" tools and heavyweight facilities-management/BIM platforms. The explicit non-goals (no BIM, no CAD, no Matterport clone, no photorealistic twins) show unusual discipline for a project at this stage.

The structural decision to run this as a firewalled research lab beside a stable production product (LUZ Inspector) is the correct organizational architecture for a small company. It is how innovation should be done next to a revenue-generating system.

My overall verdict: **the vision deserves investment; the plan for validating it needs restructuring.** The documentation front-loads certainty (scaffolding, tooling, backend setup) and defers the assumptions that can kill the concept (anchor persistence, voice capture in the field, identity across re-scans) into the middle phases. A research lab should do the exact opposite. The remainder of this review is largely an elaboration of that one sentence.

---

## 2. Strengths

**Explicit non-goals.** The PRD's non-goals list (no BIM, no CAD, no Matterport replacement, no full FM platform) is the single most valuable paragraph in the documentation. Most early-stage projects die of scope; this one has written down what it refuses to become.

**Production firewall.** Every document restates that LUZ Spatial Lab must never modify, delay, or destabilise LUZ Inspector. This constraint is stated as an architectural principle, an organizational rule, and a roadmap guardrail. Redundancy here is a feature.

**Decision gates per phase.** The implementation plan attaches a falsifiable-ish question to each phase ("Is RoomPlan good enough?", "Are checkpoints more intuitive than checklists?"). The instinct to structure work as hypothesis → validation → gate is exactly right for a lab, even though the gates currently lack measurement criteria (see §4).

**Shared business vocabulary.** `system-overview.md` deliberately aligns the lab's domain language (Property, Room, Inspection Item, Checkpoint, Finding, Observation, Evidence) with production's. This is the cheapest possible insurance for future integration and is usually forgotten until migration time.

**Append-only history instinct.** "Findings never overwrite previous history; every update creates a new observation" is the correct data philosophy for this product, stated before any schema exists. It just needs to be formalised (see §4 and §7).

**Human-in-control AI posture.** AI transcribes, extracts, suggests, and compares; the inspector approves. This is the right liability posture for a professional inspection product and the right UX posture for adoption.

**Lightweight-model principle.** "Practical over perfect" — room boundaries, names, doors, windows, checkpoints; explicitly *not* photorealism. This keeps storage, performance, and scan-time budgets achievable on consumer hardware.

---

## 3. Weaknesses

**W1 — The phase ordering optimises for the wrong risk.** Implementation Phase 1 is: Expo project, TypeScript, ESLint, Prettier, Supabase, auth placeholder, navigation, design system, logging. That is a production skeleton, and it directly contradicts the project's own principle "never optimise before validation." Nothing in that list answers a research question. Meanwhile the assumption the entire concept rests on — that a checkpoint placed today can be found at the same physical spot months later — appears as a single bullet ("spatial anchors") in the middle of the roadmap.

**W2 — The platform choice conflicts with the risk profile.** The stack is React Native + Expo with Swift native modules, yet every genuinely risky technology in the project (RoomPlan, ARKit, RealityKit, anchor persistence, on-device speech) is native Apple. This puts a custom bridge — which must be designed, built, and maintained — between the team and every answer the lab exists to produce. The bridge is also premature: it will be built against an engine API that hasn't stabilised, guaranteeing rework.

**W3 — QR/NFC is underweighted.** Tag-based identification appears only as "QR/NFC support research" in roadmap Phase 2, while AR anchoring carries the architectural load. This is backwards relative to reliability: tags solve room-level and asset-level identity deterministically, offline, on any phone, forever. AR anchoring solves only the last tier (precise in-space position) and is the most fragile technology in the stack.

**W4 — The data model is asserted but not designed.** "Nothing is overwritten" is event sourcing; the docs never say so, and none of the hard consequences are addressed: how observations reference checkpoints, how a checkpoint keeps its identity when the property is re-scanned into a new coordinate frame, how schemas are versioned, how erasure requests coexist with an immutable log (see §5, R8).

**W5 — Offline is a stated constraint but an online architecture.** The PRD requires offline workflows (inspections happen in basements and pool/plant rooms with no signal), yet the first implementation phase configures a cloud backend (Supabase) before any local persistence exists. Backends configured on day one quietly breed online-first assumptions in every subsequent module.

**W6 — Success criteria are not measurable as written.** "Inspector understands the floor plan immediately," "inspectors can navigate naturally," "faster than with a checklist alone" — none of these have a baseline, a metric, a sample, or a protocol. Without an experiment design, every decision gate degrades into a demo followed by a gut feeling.

**W7 — Voice-first is a founding principle validated last.** Voice is declared the primary input method (README, vision), yet it is not touched until Phase 5/6 (AI Assistant). If voice capture fails in the field — noise, dialect, social awkwardness in occupied homes — the interaction model of the entire product changes, and that should be known early.

**W8 — Internal inconsistencies between documents.** The roadmap defines six phases; the implementation plan defines eight, with different orderings (e.g., checkpoints are roadmap Phase 2 but implementation Phase 4; AI is roadmap Phase 5 but implementation Phase 6). The architecture diagram includes *Exterior Zones* as a core model element, while the roadmap defers "exterior mapping" to long-term future work — and RoomPlan, the chosen capture technology, is indoor-only, so no documented technology covers exterior zones at all. These are small today; they become expensive when two documents claim authority.

---

## 4. Missing Documentation

The following documents do not exist and should, roughly in this priority order:

1. **Data contracts / schema specification.** Versioned schemas for Property Passport, Room, Asset, Checkpoint, Inspection, Finding, Observation, Evidence. This is the most likely artifact to migrate into production and currently the least specified. It should make the append-only Observation event log explicit and define stable logical identifiers decoupled from scan geometry.
2. **Experiment protocol.** Baseline measurements of the current LUZ Inspector workflow (minutes per inspection, items missed, admin time), 2–3 real properties designated for repeat visits, defined metrics per decision gate, and a revisit calendar. Recurring-inspection value only reveals itself on visit two, so elapsed time is on the critical path.
3. **Architecture Decision Records (ADRs).** The docs contain decisions (React Native, Supabase, RoomPlan) with no recorded alternatives or rationale. A lightweight ADR log turns "why did we choose X?" from archaeology into a lookup, and makes reversals cheap and blameless — essential in a lab where reversals are the point.
4. **Production integration contract.** A snapshot of what LUZ Inspector / Airtable / n8n actually expose and expect: current Airtable schema, inspection item taxonomy, report structure. "Compatible with future integration" is unverifiable without knowing what production's data actually looks like.
5. **Privacy and data protection note (GDPR/DSGVO).** The system records voice audio inside private homes, photographs interiors, and builds a permanent spatial model of someone's residence — processed in the EU. Lawful basis, consent flow (owners *and* tenants/occupants), retention, and the tension between "nothing is ever deleted" and Art. 17 right-to-erasure all need at least a one-page position before field recordings begin (crypto-shredding of evidence blobs referenced by the immutable log is the standard resolution).
6. **Device and OS constraints matrix.** RoomPlan requires a LiDAR-equipped iPhone Pro / iPad Pro and a recent iOS. This constrains which inspectors can use the system and belongs in writing as a product constraint, not tribal knowledge.
7. **Glossary.** The shared vocabulary in `system-overview.md` should graduate into a canonical glossary with one definition per term (what exactly distinguishes a Finding from an Observation?), since the whole integration strategy leans on shared language.
8. **Risk register.** Sections 5 and 6 of this review can seed it.
9. **Storage and cost model.** Expected scan sizes (USDZ/parametric), photo volume per inspection, audio retention, and AI token costs per inspection — the PRD lists "minimise storage" and "avoid unnecessary AI costs" as constraints with no numbers attached.

---

## 5. Technical Risks

**R1 — Cross-session relocalization (the existential risk).** RoomPlan produces per-scan geometry with no persistent world anchoring. ARKit `ARWorldMap` relocalization is fragile across lighting changes, moved furniture, and seasonal variation — precisely the conditions of an inspection three months later. If a checkpoint placed in January cannot be reliably re-found in April, "spatial checkpoints" silently degrade to "rooms as labels." That may still be a fine product — but it must be discovered in week two, not month six. *Severity: existential to the spatial thesis. Mitigation: make this the first spike; test tag-assisted relocalization as the fallback tier.*

**R2 — Identity across re-scans.** A re-scanned property produces a new coordinate frame with no built-in mapping to the previous scan. Without geometry-independent logical IDs, the Property Passport cannot survive its own updates, and history fractures at every re-scan. *Mitigation: design identity into the data contracts before any persistence code exists.*

**R3 — RoomPlan capability boundaries.** Indoor-only (the architecture's "Exterior Zones" have no capture technology); LiDAR-only devices; known weakness in small, cluttered, mirrored, or glass-heavy spaces — which describes many real plant rooms and bathrooms; merged multi-room scanning is comparatively recent and evolving; output is parametric and simplified, which is aligned with the lightweight principle but caps future precision. *Mitigation: Phase-1 spike must include worst-case rooms, not show homes.*

**R4 — The React Native bridge.** Bridging RoomPlan/ARKit sessions, delegates, and 3D view hierarchies into RN is substantial engineering with poor community coverage; it sits on the critical path of every experiment while producing no research findings itself. *Mitigation: remove it from the research phase entirely (see §8).*

**R5 — Speech recognition in the field.** Austrian German — plausibly Vorarlberg dialect — recorded in echoing tiled rooms, near running pumps, hands busy. Generic models degrade badly under exactly these conditions, and transcription quality gates the entire AI extraction pipeline. *Mitigation: standalone on-device speech spike early (Apple Speech vs. WhisperKit); capture a raw field-audio corpus from the very first test inspections so later models can be evaluated against reality.*

**R6 — Offline sync (deferred, but real).** Local-first with eventual sync means conflict resolution, partial uploads of large media, and idempotent event append. Not a now-problem, but the event-log data model chosen now determines whether sync later is straightforward (append-only logs merge well) or painful (mutable rows do not). *Mitigation: another reason the event-sourced model must be explicit from day one.*

**R7 — Apple platform coupling vs. the "platform independent where possible" principle.** RoomPlan, ARKit, and RealityKit are permanent iOS commitments. The principle is achievable only at the data layer, and the docs should say so honestly: capture is Apple-native for the foreseeable future; portability lives in the contracts, not the capture code.

**R8 — Immutability vs. erasure.** An append-only history colliding with GDPR erasure rights is a legal-technical risk with a known solution (evidence blobs encrypted per-property with destroyable keys; the log keeps tombstoned references), but only if designed in from the start.

---

## 6. Product Risks

**P1 — The value proposition matures on visit two.** The Living History only demonstrates value on a *recurring* inspection of the same property. The feedback loop is therefore months long, and no amount of engineering velocity shortens it. If real-property scans don't start immediately, the lab will have code but no evidence.

**P2 — Passport onboarding cost.** The one-time Property Passport (scan every room, name everything, place checkpoints, baseline photos, attach documents) is a real cost per property, paid up front, before any recurring value accrues. Who pays — in time or money — and at what property count does it amortise? The 5-minute success criterion covers a single room scan, not passport creation.

**P3 — Voice in occupied homes.** Speaking findings aloud in front of an owner or tenant ("significant mould behind the wardrobe") is socially and commercially awkward. Inspectors may refuse, or self-censor, which corrupts the data. This is a field-research question, not an engineering one, and it strikes at a founding principle.

**P4 — Hardware gate.** LiDAR-equipped iOS Pro devices are required for capture. For a research lab this is fine; for production adoption it is a per-inspector hardware cost and an Android-shaped wall that should be acknowledged in any integration business case.

**P5 — Owner privacy perception.** "We built a 3D model of your home and keep a permanent recorded history of it" delights some owners and alarms others — and tenants, whose consent nobody asked, live in many of these properties. Trust is the vision's stated foundation; privacy posture is part of the product, not compliance overhead.

**P6 — The cheap tier may capture most of the value.** It is plausible that room-level context plus asset tags (achievable with QR/NFC and no AR at all) delivers 80% of the inspection-speed and history value. That would be a *successful research outcome* — but a threatening one for a lab emotionally invested in spatial computing. The experiment design must be able to detect it, and the team must be willing to hear it.

**P7 — Opportunity cost against production.** Every lab hour is an hour not spent on LUZ Inspector. The strongest guardrail is the one already written ("production always takes priority") — but it needs a capacity statement: who works on the lab, how much, and what pauses it.

---

## 7. Assumptions That Should Be Challenged

1. **"The Property Passport is created once."** Properties are renovated, refurnished, extended. The passport is a living artifact needing an update/re-scan strategy — which is exactly where risk R2 (identity across re-scans) lives. "Created once" should be reworded to "created first."
2. **"Spatial context makes inspections faster."** This is the lab's core hypothesis and is properly framed as a question elsewhere — but several documents drift into treating it as established. The null hypothesis (a well-ordered checklist plus tags is just as fast) must remain live until measured.
3. **"Voice is the primary input."** Challenge against P3 and R5 in real occupied properties before building the interaction model around it. The fallback (quick-tap structured input with optional voice) should be designed, not improvised.
4. **"React Native, because that eases production integration."** What is the production LUZ Inspector actually built with, and what will it be built with in two years? The integration surface most likely to matter is data contracts, not UI framework. This assumption is driving the single biggest architectural cost (the bridge) and deserves an ADR with alternatives honestly weighed.
5. **"Checkpoints replace checklists."** More likely they *index* checklists spatially. The distinction matters: replacement demands near-perfect relocalization; indexing tolerates failure gracefully.
6. **"AI extraction saves time."** Only if correction cost stays below typing cost. Inspectors reviewing and fixing wrong extractions can be slower than writing. The Phase-5 gate ("corrections remain minimal") is right — make it numeric.
7. **"Owners want to explore a spatial model."** Owners may simply want a trustworthy timeline and a health summary. The spatial viewer for owners is an assumption about a *secondary* persona and should not drive architecture until the primary persona's value is proven.
8. **"Nothing is ever deleted."** Legally untenable in the EU as an absolute (R8). The principle should be restated as "history is never silently rewritten," which preserves the intent and permits lawful erasure.
9. **"Supabase from day one."** Challenge whether the research phases need a backend at all. Exported JSON from a local-first app validates every hypothesis through Phase 5.

---

## 8. Recommended Technology Stack

The guiding principle: **put the research where the risk is, and put the durability where the value is.** The risk is native Apple spatial tech; the durable value is the data model.

| Layer | Recommendation | Rationale / trade-off |
|---|---|---|
| Capture & spatial | **Swift + RoomPlan/ARKit/RealityKit**, packaged as a standalone **Swift Package** (`SpatialEngine`) with protocol-based interfaces | The risky tech, native and unbridged. Isolating it behind protocols honours the existing "Apple functionality behind reusable interfaces" principle. |
| Lab app shell | **SwiftUI demo app** (thin, throwaway-grade) | Fastest path from idea to device for every experiment. Trade-off: no code shared with a future RN production app — accepted, because the shell is scaffolding, not product. |
| Domain model | **Pure Swift package** (`InspectionKit`): entities, append-only observation log, identity rules — zero Apple-spatial imports | Keeps business logic framework-free per the docs' own principle; portable by translation because it's small and pure. |
| Contracts | **Versioned JSON Schema** in-repo; Swift types generated/validated against them | The actual production deliverable. JSON Schema is consumable from TypeScript/RN/Airtable/n8n tooling alike — this, not the UI framework, is the integration insurance. |
| Persistence | **SQLite via GRDB, local-first**; media as files on device; JSON export | Honours the offline constraint structurally. Append-only tables map cleanly to future sync. |
| Backend | **None initially.** Introduce Supabase only when sync/portal is the hypothesis under test (roadmap Phase 4+) | Defers cost and online-first bias. Trade-off: multi-device demos are harder early; mitigated by JSON export. |
| Speech | **On-device first** (Apple Speech; WhisperKit as comparator), evaluated on real field audio | Offline requirement + privacy + latency. Cloud LLM extraction can sit downstream, applied to transcripts asynchronously. |
| AI extraction | Cloud LLM on transcripts, batch/async, behind a provider-agnostic interface | Extraction is not latency-critical; keep it swappable and off the capture path. |
| React Native / Expo | **Deferred to Phase-6 integration research** — where "can the SpatialEngine embed in an RN host?" is itself the experiment | The bridge becomes one contained, well-scoped question instead of a standing tax on every phase. |

If the team's RN fluency makes an all-native lab genuinely unstaffable, the fallback is a bare (non-Expo-Go) RN shell around the same native `SpatialEngine` package — but this should be a consciously accepted cost, recorded in an ADR, not a default.

---

## 9. Repository Structure

```
luz-spatial-lab/
├── README.md
├── docs/
│   ├── vision.md, roadmap.md, ...          # existing docs (reconciled, see W8)
│   ├── adr/                                 # 0001-native-first.md, 0002-local-first.md, ...
│   ├── contracts/                           # human-readable contract docs
│   ├── experiments/                         # protocol + one report per decision gate
│   └── glossary.md
├── contracts/                               # versioned JSON Schemas (the durable asset)
│   └── v0/  property.schema.json, checkpoint.schema.json, observation.schema.json, ...
├── packages/
│   ├── SpatialEngine/                       # Swift package: RoomPlan/ARKit capture, anchoring,
│   │                                        #   relocalization strategies behind protocols
│   └── InspectionKit/                       # Swift package: domain model, event log, identity,
│                                            #   persistence (GRDB), export — no Apple-spatial imports
├── apps/
│   └── LabApp/                              # SwiftUI shell wiring packages into runnable experiments
├── spikes/                                  # dated, quarantined, deletable
│   ├── 2026-07-relocalization/
│   └── 2026-07-speech-field-test/
└── corpus/                                  # field-test metadata + manifest
                                             #   (media itself stays out of git; manifest points to storage)
```

Three enforced rules: `spikes/` may import packages but nothing may ever import from `spikes/`; `InspectionKit` never imports ARKit/RoomPlan/RealityKit; `contracts/` changes require a version bump and a note. These three rules *are* the architecture — everything else is arrangement.

---

## 10. First Implementation Milestone

**Milestone 0 — "Can a checkpoint survive time?" (target: ~3 weeks of work, ~6 weeks of calendar)**

Not the app skeleton. A spike answering the existential question, plus the two cheap parallel tracks that need calendar time to mature.

*Track A — Relocalization spike (primary).* A minimal native app that scans one real room with RoomPlan, places five checkpoints, persists everything, and then — on returns after 1 day, 1 week, and 4 weeks, with normal life happening to the room in between — attempts to re-find them via three strategies: (1) raw `ARWorldMap` anchor relocalization, (2) matching against RoomPlan parametric geometry, (3) QR-tag-assisted: tag establishes room/asset identity, anchor refines position. Run it in at least three rooms including a worst case (small tiled bathroom or cluttered plant room). Measure re-find rate and positional error per strategy per interval.

*Track B — Field voice spike (parallel, cheap).* Record real inspection narration on-device in occupied properties; transcribe with Apple Speech and WhisperKit; measure word error rate on dialect-inflected Austrian German in noisy rooms. Every recording enters the corpus with consent documented.

*Track C — Contracts v0 (parallel, paper).* Draft the JSON Schemas for Property, Room, Checkpoint, Finding, Observation with the identity and event-log rules from §5 R2/R6 — reviewed against a snapshot of the production Airtable schema.

*Exit criteria (the decision gate, made numeric):* Track A yields a written recommendation — which relocalization tier is dependable enough to architect around, with re-find rates per strategy (e.g., "tag-assisted ≥95% room/asset identity, anchor refinement ≥70% within 30 cm at 4 weeks" — thresholds to be agreed before the spike runs, not after). Track B yields a WER number and a go/caution/no-go on voice-first. Track C yields `contracts/v0` merged. The deliverable of Milestone 0 is a **decision memo, not code** — the spike code is expected to be thrown away.

Only after Milestone 0 does it make sense to assemble `SpatialEngine` and `InspectionKit` properly, because only then do you know which tier of spatial fidelity you are engineering for.

---

## Closing Note

The documentation reads like a team that has already internalised the hardest lesson — that production stability and research speed are both non-negotiable and must be structurally separated. What remains is to apply the same discipline to *risk ordering*: let the scariest assumptions go first, let the data contracts be the only thing built to last, and let everything else be cheerfully disposable. If Milestone 0 returns bad news about anchors, the project has not failed — it has succeeded at exactly what a lab is for, several months and one React Native bridge earlier than the current plan would have.
