# The Property Passport — Design Document

**Project:** LUZ Spatial Lab — Milestone 0 (Design)
**Date:** 18 July 2026
**Status:** Design for validation. No implementation implied.
**Perspectives applied:** product design, professional inspection practice, software architecture, Apple spatial computing.

---

## The One Idea That Governs Everything Else

Before answering the eight questions, one framing decision shapes every answer below, so it needs to be stated first.

**The Property Passport is not a 3D model with data attached. It is an identity-and-memory system with geometry attached.**

The passport's job is to guarantee three things across years, device generations, re-scans, renovations, and staff changes:

1. **Identity** — "this pump" is the same pump it was in 2026, even after the app was rewritten twice and the room was re-scanned four times.
2. **Location** — everything knows *where* it is, at the best fidelity currently available (room → tagged position → precise anchor), degrading gracefully rather than failing.
3. **Memory** — everything that ever happened to the property attaches to the identity it happened to, permanently.

Geometry is the *presentation layer* of this system. It will be re-captured, improved, and replaced many times over a property's life. Identity and memory must never be. Every design decision below follows from ranking these correctly: identity > memory > location > geometry.

A second governing observation, from the inspection-expert perspective: LUZ's properties are largely **cared-for homes with absent owners** — pools, irrigation, gate motors are the signature of second homes whose owners are far away most of the year. This changes the design brief profoundly. The passport is not a document generator; it is **the owner's eyes**. Trust-at-a-distance is the actual product. Several answers below (owner experience, evidence discipline, the emergency card) are designed for that reality rather than for a generic "inspection app."

---

## 1. Property Onboarding

### The assumption to challenge first: "onboarding is a one-time project"

Every LUZ document says the passport is "created once." I recommend abandoning both words. **The passport is created *first* and completed *never*.** It should emerge progressively, reaching "operational" quickly and growing richer with every subsequent visit. Three reasons:

- A "complete the passport perfectly" mandate front-loads cost into a visit that produces no inspection revenue, and perfectionism at onboarding is where field-data projects die.
- The inspector doesn't yet know the property. The best checkpoint set for a house is *discovered* over two or three seasons (the drain that clogs every autumn, the shutter that jams), not enumerated on day one.
- Properties change. A passport designed to be "finished" has no graceful way to be wrong later; a passport designed to be living treats every visit as a chance to correct itself.

Therefore the design target is: **a passport that is operational after one visit, good after three, and excellent after a year** — with an explicit, visible *completeness score* so nobody confuses "operational" with "done."

### Phase A — Desk preparation (office, ~15 minutes, before any visit)

Created by the inspector or back office, no property access needed:

1. Create the property record: address, owner, access notes, property archetype (villa-with-pool, apartment, townhouse, finca…).
2. The archetype instantiates a **template**: expected rooms, expected asset categories, and a starter checkpoint library (every villa-with-pool template includes pool pump, filter, skimmers, gate motor, irrigation controller, water main, electrical panel…).
3. Import whatever already exists: old reports, owner-supplied photos, manuals, contractor invoices. These land in an **inbox**, not the memory — they get anchored to rooms/assets later (see §5).
4. Print/prepare the tag kit: a pouch of NFC+QR tags pre-registered to this property (see §4).

What this phase buys: the on-site visit starts with a *hypothesis of the property* to confirm, rather than a blank page to fill. Confirming is fast; authoring is slow.

### Phase B — The founding walk (on site, folded into the first inspection)

**Challenged assumption: that onboarding is a separate visit.** It should not be. The passport is built *during* the first regular inspection, adding a bounded overhead — target **+45–90 minutes** on top of a normal first inspection for a 4-bedroom villa with pool and garden. A separate "scanning appointment" doubles travel cost and produces a passport untested by real inspection use.

The walk proceeds room by room, in the inspector's natural route. Per room, the loop is designed to take **3–5 minutes** and to be interruptible at any point:

1. **Tag the doorway** (~20 seconds). Affix the room's NFC+QR plate at the door frame, scan it once. From this moment the room has permanent identity, before and independent of any geometry. *This ordering is deliberate: identity first, so that if everything else fails or is skipped, photos and findings still attach to the right room.*
2. **Scan the room** (60–120 seconds). RoomPlan capture. The system auto-detects walls, doors, windows, ceiling height, openings, and object categories, and proposes a room type (RoomPlan classifies rooms natively). A room that resists scanning — mirrored bathroom, glass walls, tiny plant room — is *skipped without ceremony*: the room falls back to tag+photos fidelity and the passport records "geometry pending." Scanning failure must never block onboarding.
3. **Confirm by voice** (~10 seconds). "Master bedroom, first floor." The inspector confirms/renames the room and floor verbally; typing is a fallback, not the norm.
4. **Baseline sweep** (~60 seconds). Guided photo set: four corners, floor, ceiling, plus anything notable. These become the reference images every future inspection compares against. The app auto-associates every photo with the room (and position, when available).
5. **Register assets as encountered** (~60–90 seconds per asset, only in rooms that have them). See §4 — tag it, photograph it plus its nameplate, speak what it is. Nameplate OCR extracts make/model/serial automatically.
6. **Accept or dismiss suggested checkpoints** (~30 seconds). The template + the scan propose; the inspector swipes yes/no. See §3.

Exterior zones (pool area, garden sectors, gate, roof line, terraces) get the same treatment *minus RoomPlan*: tag or geo-pin the zone, name it by voice, baseline photos. Honesty matters here — no current Apple technology gives us exterior geometry worth storing, and the design should not pretend otherwise. An optional hand-placed site sketch over a satellite image is the ceiling of exterior "geometry" for now, and it is enough, because exterior value lives in zones, assets, and photo history, not walls.

Two special stops close the founding walk:

- **The utility hunt** (10 minutes, highest value-per-minute in the entire onboarding): locate and register the water main shut-off, electrical panel, gas shut-off, water heater, main valves. These become the **Emergency Card** (§5) — for an absent owner with a burst pipe, this is worth more than every floor plan combined.
- **Meter registration** (5 minutes): photograph and register water/electricity/gas meters. Every future visit records readings; consumption history is a leak detector and an occupancy detector (see §8).

### Phase C — Same-day curation (~15 minutes, at the car or office)

The inspector reviews what the walk produced: confirms AI-extracted asset data, anchors inbox documents to the assets/rooms they belong to, dictates any deferred notes, and approves the passport's founding state. The passport goes live with its completeness score displayed (e.g., "Passport 70% — geometry missing for 2 rooms, 3 assets lack nameplate data").

### What is automatic vs. manual — and why the line sits where it sits

**Automatic** (machine is better or the cost of error is low): geometry capture; door/window/opening detection; ceiling heights and dimensions; floor plan assembly; room-type *suggestion*; photo→room association; nameplate OCR; checkpoint *suggestions*; document text extraction; completeness scoring.

**Manual — deliberately** (judgment, accountability, or trust is at stake): room names (the inspector's mental map, and the owner's language, must win over a classifier); the decision of what counts as an asset worth tracking; every checkpoint's *acceptance*; access and safety notes; anything entering the permanent record's authoritative layer. The principle from the vision docs applies at onboarding exactly as it does at inspection: **AI proposes, the inspector disposes.** A passport auto-populated without human confirmation would be fluent, complete-looking, and quietly wrong — and its wrongness would compound for years.

**Time budget summary:** 15 min desk + 45–90 min on-site overhead + 15 min curation. If field tests show the on-site overhead exceeding ~90 minutes for a normal villa, the design is wrong and should be cut — most likely by thinning the baseline photo protocol, never by skipping tags or the utility hunt.

---

## 2. The Spatial Model

The question posed is *what to store*. The governing test, from the architecture principle "practical over perfect," is three-fold: store what is **(a) stable across years, (b) inspection-relevant, and (c) cheap to capture.** Anything failing two of the three stays out. Applying the test to each candidate:

**Walls / room boundaries — store.** Stable for decades, cheap (RoomPlan gives them free), and the substrate of everything spatial: the floor plan, room areas, finding placement, navigation. Store them *parametrically* (simplified polygons, per the "lightweight" principle), not as meshes. The mesh is scan by-product; keep the raw scan archived per version for future reprocessing, but the model of record is the simplified geometry.

**Doors and windows — store, and not only as geometry.** They pass all three tests, but the deeper reason is an inspection-expert one: doors and windows are among the most inspected objects in a property — seals, locks, shutters, hinges, condensation, drafts. Each door/window detected should therefore be *promotable* to a lightweight identity (this window, with this history of a sticking shutter), making it checkpoint-capable. They are also the natural landmarks humans navigate by ("the window wall in the master bedroom"), which makes them anchors for describing finding locations in words.

**Ceiling height — store.** Free from the scan, perfectly stable, and quietly useful for years: locating moisture ("stain at 2.4 m, likely roof not plumbing"), ladder/equipment planning, room volume for dehumidifier or heating questions. Near-zero cost, nonzero recurring value: store.

**Furniture — capture, but do not enshrine. This is the trap answer in the list.** Furniture fails the stability test spectacularly — it moves, leaves, gets replaced — and granting it identity in the passport would guarantee model rot: within two years the "model" would describe a home that no longer exists, eroding trust in everything else the passport claims. But RoomPlan detects furniture categories anyway, and the *context* has real value ("humidity behind the wardrobe" needs the wardrobe). Resolution: furniture lives in a **scenery layer, versioned with each scan** — category boxes (bed, wardrobe, sofa) that belong to *that scan*, usable for context in findings and for change awareness between scans, but carrying no identity, no history, and no promise of currency. Structure is permanent; scenery is dated. The UI should visually distinguish the two (solid walls, ghosted furniture) so the epistemic difference is felt, not documented.

**Technical assets — store, as the crown jewels, but not as geometry.** An asset is an *identity object* (§4) that *has* a location in the model. The distinction matters: when the boiler is replaced, the geometry didn't change but the asset did; when the room is re-scanned, the asset didn't change but its coordinates did. Assets referencing rooms (always) and positions (when available) — rather than being baked into the spatial model — is what lets both evolve independently.

**Checkpoints — store, same architecture as assets.** Logical identity first, room association always, precise position as an optional refinement (§3). A checkpoint whose anchor is lost degrades to "in the kitchen, at the sink" — annoying, not fatal. A checkpoint whose *identity* is lost orphans years of observations — fatal. The storage design must make the second impossible.

**Utilities — store, emphatically, as a privileged asset class.** Shut-offs, mains, panels, valves, meters. They are the highest-stakes lookups the passport will ever serve (emergency, absent owner, possibly a third party on site) and they justify redundant representation: position in the model, photo of the thing, photo of its surroundings, and a plain-words route description ("garage, back-left corner, behind the paint shelf"). Words survive every technology failure; for utilities, always capture the words.

**Explicitly not stored:** photorealistic meshes and textures as the model of record; decorative contents; anything claiming millimetre precision. And one more, easy to miss: **no data of record inside the geometry files.** The scan formats (USDZ etc.) are treated as replaceable renderings; every fact lives in the passport's own structures, keyed to logical identities. The day a better capture technology than RoomPlan appears — and over a passport's multi-decade life, it will — the geometry is re-shot and the passport doesn't notice.

**Versioning rule:** every scan is a new version; versions are kept; identities persist *across* versions via the room/asset/checkpoint logical IDs (with the doorway tags as physical ground truth for re-binding after a re-scan). The model of record is "current version per room," so one re-scanned room doesn't force a whole-property re-scan.

---

## 3. Checkpoints

### What a checkpoint actually is

A checkpoint is **a standing question the property asks the inspector**: "check the seal under this sink." It is not a location dot; the location is just where the question lives. Anatomy: permanent logical ID; name; room association (mandatory); what-to-check guidance (one line, written by inspectors for inspectors); required evidence rule (photo always / photo on finding / reading required); cadence (every visit, seasonal — pool opening, winterisation — or annual); and location at the best available fidelity tier (room-only → near-tagged-asset → precisely anchored). Most checkpoints attach to an asset (§4); some attach to building fabric (ceiling corner with historic moisture; window seals; roof line).

### Creation: all three modes, in a strict trust hierarchy

The question posed is automatic vs. manual vs. AI-suggested. The answer is all three as *sources*, with a single hard rule that resolves the governance question: **nothing becomes a checkpoint without an inspector's explicit accept.** Suggestions flow into a suggestion tray; the inspector swipes. Accepting takes one second; the accountability is total. The three sources, in descending trust:

1. **Template checkpoints** (from the property archetype, ~70% of the eventual set). Every villa-with-pool gets the pool-plant set; every property gets the utilities set. These encode LUZ's institutional inspection knowledge — and this is strategically important: **the template library is where the company's expertise becomes a compounding software asset.** When one inspector learns that a certain irrigation controller brand fails at the solenoid, that checkpoint guidance improves every property's template. Templates deserve their own curation workflow (an inspection-expert role, not a developer role).
2. **Scan-derived suggestions.** RoomPlan detected a dishwasher, an oven, six windows: propose the corresponding checkpoints, pre-placed at the detected object's position. High precision, low judgment — ideal automation.
3. **AI-derived suggestions.** From founding-walk photos and voice ("propose a checkpoint where the inspector said 'this drain looks slow'"), and — the most valuable variant — **from history**: any finding recurring twice at the same spot triggers "make this a standing checkpoint?" This is the passport *learning the property's weak points*, and it is the mechanism by which the checkpoint set gets better every year instead of staling.

### Editing

Editing must be effortless *mid-inspection*, because that is when the inspector notices the set is wrong, and any friction means it never happens ("I'll fix it later" = never). Four surfaces, same operations everywhere (create, rename, move, re-scope, retire): tap-hold on the floor plan; AR placement standing in the room (point, tap, name by voice); pure voice ("add a checkpoint: gutter above the terrace, check each autumn"); and list view for desk-time curation. Two lifecycle rules: checkpoints **retire, never delete** — a retired checkpoint keeps its observation history forever, visible in the room's past; and every edit is itself an event in the property memory (who changed the questions we ask about this house, and when — that's part of the audit trail an inspection business needs).

### The discipline question nobody asked

**Challenged assumption: more checkpoints = better inspections.** False, and the failure mode is fatal to the whole concept: a 200-checkpoint villa turns the spatial inspection back into the very checklist-grind the project exists to escape, plus taps. Checkpoint inflation is *the* product-death risk of this feature. Countermeasures belong in the design, not in a training slide: a soft budget per property surfaced in the UI (a villa wants ~40–70, not 200); an earn-your-place bar for suggestions (would skipping this plausibly cost real money or damage? if not, it's not a checkpoint — it's covered by the general room sweep); and **checkpoint analytics** — any checkpoint that has produced zero findings and zero owner value in N visits becomes a candidate for retirement, suggested by the system, decided by a human. The set should breathe: grow where the property shows weakness, shrink where it has proven boring.

---

## 4. Assets

### Identity: yes, absolute, and deeper than the question implies

Should every asset have its own identity? **Yes — and identity is precisely what makes an asset an asset.** The boiler, the electrical panel, the irrigation controller, the pool pump, the gate motor: each is a first-class entity with a permanent ID, its own timeline, its own document shelf, and its own relationships (located in a room; watched by checkpoints; serviced by contractors; covered by a warranty).

The subtle rule that proves the design: **when a pump is replaced, the new pump is a *new asset***, linked as successor to its retired predecessor. The old pump's history closes with honour (installed 2019, four services, died January 2028 — of the same capacitor failure as the neighbour's, see §8); the new one starts clean but linked. Merging them into one mutable "the pump" record would silently falsify history — the append-only philosophy from the vision docs, applied to things instead of findings. Meanwhile the *checkpoint* ("check the pool pump") survives the replacement unchanged, re-pointing to the successor: the standing question outlives the object, which is exactly right.

Per asset, captured at registration (90 seconds, §1): category; make/model/serial via **nameplate photo + OCR** (the nameplate photo is mandatory even when OCR fails — it is the asset's fingerprint, and re-OCR-able forever as models improve); location (room always, position when available, plain-words route for utilities); a context photo; install date and installer if known; service cadence; linked documents. All of it except the photos is correctable later — capture speed beats capture completeness in the field.

### Tags: yes — and this is the load-bearing decision of the whole passport

Should QR or NFC be used? **Yes, both, on one physical tag — and tagging is not an optional convenience feature. It is the passport's physical ground truth.** The architecture review established tag-based identity as the reliability backbone beneath the fragile AR tier; here is what that means concretely.

**The tag carries only an opaque ID.** No property data, no URL with meaning, nothing readable into significance. All data lives in the passport; the tag is a pointer. This makes a lost/photographed/stolen tag worthless (privacy), makes tags reassignable-never-reusable, and means tag hardware can change brands freely.

**Why both radios on one tag:** NFC is the primary for the inspector — works through grime, in the dark, with no line of sight or focusing, and a tap is faster than a camera aim; plant rooms and pump pits are dirty, dark places. QR on the same tag is the universal fallback — any camera, any phone, no NFC hardware, and crucially it works for *third parties*: a contractor sent to "the asset with this code" can identify it with nothing but a phone camera (the scoped-access scenario in §8). Engraved/laminated combo tags cost €1–3; against the cost of one mis-attributed repair, the economics are not a discussion.

**Where tags go:** every registered asset gets one; every room doorway gets one (room identity + relocalization assist + the "which room am I in" answer that never fails); exterior zones get weatherproof ones. Sun-exposed QR fades in a few years — Mediterranean UV is brutal — so exterior placements favour engraved tags and shaded mounting, and a "tag unreadable" observation is itself a finding type that triggers replacement.

**What tags buy the spatial architecture:** a deterministic identity layer that makes the AR layer safe to be experimental. Tap the pump's tag and the right asset opens with certainty — whether or not ARKit relocalized today, whether or not this phone has LiDAR, whether or not it's 2031 and the scan format changed twice. The AR anchor, when it works, saves the tap and adds precision. That asymmetry — *tags guarantee, anchors enhance* — is the entire risk architecture of the passport in one sentence.

**Challenged assumption (from my own architecture review, in the other direction):** could tags alone suffice — skip AR anchoring entirely? For asset-identity purposes, honestly, almost. The genuine residue that needs *positions* rather than *identities*: findings on building fabric ("crack, north wall, 1.9 m up" has no tag to tap), density (a plant room with eight tagged assets still benefits from knowing which valve), and the owner's floor-plan experience (§7), which needs things *placed* to be explorable. So: positions matter; fragile positions are acceptable because tags catch every fall.

---

## 5. Property Memory

### The organizing rule: nothing floats

The vision documents diagnose the disease precisely: the information exists, "scattered across reports, photos, emails and invoices." The naive cure — put all the files in one app — merely relocates the disease. A folder of PDFs inside the passport is still a folder of PDFs. The cure is structural: **every item in the property memory must be anchored (to the property, a room, an asset, or a checkpoint) and typed (what kind of memory it is). Unanchored, untyped storage is prohibited by design** — the import inbox exists precisely so that anchoring is a deliberate act, done in seconds during curation, and the inbox nags until empty.

The second organizing rule: **the memory is a timeline, not a filing cabinet.** Everything that belongs to the property permanently is either an *event* (something happened: an inspection, a repair, a storm, a reading) or an *attachment to an identity* (a manual belongs to the boiler; a warranty belongs to the gate motor). Ask "what happened to this house in 2027?" or "tell me everything about this pump" and the memory should answer both from the same substrate.

### What belongs permanently — the inventory

- **Inspections and observations** — the spine of the memory. Every visit, every checkpoint outcome, every finding and its subsequent life (the kitchen-sink story from the vision doc: 2019 fine → 2021 leak → 2022 seal replaced → 2024 humidity → 2025 dry).
- **Photos** — every one anchored to room/asset/checkpoint and timestamped; baseline sets flagged as reference. Twenty years of the same corner, comparable at a swipe, is the single most persuasive artifact the passport will ever show an owner.
- **Documents, manuals, warranties** — anchored to their asset. Warranties carry expiry dates the system watches ("gate motor warranty lapses in 60 days — last chance for the free repair"). Manuals become AI-answerable ("what does error E4 on this controller mean?" — answered from *this* controller's manual, §8).
- **Measurements** — meter readings each visit (water, electricity, gas), plus any recurring physical readings (boiler pressure, pool chemistry if in scope). Consumption curves are a leak detector, an occupancy sanity-check for an absent owner, and free — the meters are read anyway.
- **Service history and contractor registry** — who touched what, when, for how much, with which outcome; contractors as identities linked to the assets they've serviced. "Which electrician knows this house?" is a question with monetary value.
- **Incidents** — storms, freezes, power cuts, break-ins, water events. Context that explains later findings ("the terrace cracks date to the February 2027 freeze").
- **Owner instructions and preferences** — standing requests ("never enter the studio," "ventilate the cellar every visit"), the owner's language, notification preferences.
- **Access information — in a vault, not in the memory proper.** Codes, key locations, alarm procedures: encrypted separately, access-audited, shown only at need, *never* in reports or owner-facing exports. The passport's trust story dies instantly if a report PDF ever leaks a gate code.
- **The Emergency Card** — the distilled utilities sheet (§1): every shut-off with photo, position, and plain-words route. Deliberately exportable/printable on its own, because its consumers include panicked neighbours and third-party plumbers at 2 a.m.

**Deliberately excluded:** legal title documents, financial records, anything belonging to the *owner's* life rather than the *property's* physical life. Scope discipline is what keeps the memory trustworthy; the passport is the property's medical record, not its biography.

**The GDPR note that must be designed in, not bolted on:** "permanent" means *the property's memory outlives any one owner* — and that collides with erasure rights unless designed for. The resolution (consistent with the architecture review): the event log's *structure* is append-only, but evidence blobs are encrypted per scope with destroyable keys, so lawful erasure is possible without silently rewriting history — an erased item leaves an honest tombstone ("evidence removed 2029, retention/erasure request"). And on ownership transfer, the memory is the *selling point*: a passport-backed house hands its new owner two decades of provenance (§8), with the previous owner's personal items scrubbed and the property's physical history intact.

---

## 6. Inspector Workflow — the Recurring Inspection

The design goal, stated as an inequality: **from visit two onward, a passport-backed inspection must take less inspector effort than the current checklist workflow, while producing more.** If field measurement ever shows otherwise, the passport has failed its primary user regardless of how good the owner experience is. Every interaction below is designed against that inequality.

**Before arrival (2 minutes, in the car).** The passport auto-prepares a briefing — no back-office labour: open findings to re-check (with last photos), seasonal checkpoints due this visit (pool opening; winterisation), owner requests since last time, and anything flagged by consumption or incident data ("electricity usage doubled — investigate"). The inspector arrives already knowing this visit's *particular* shape.

**Arrival (30 seconds).** Geofence surfaces the property; one tap starts the session. Everything from here works offline — basements and plant rooms are dead zones, and the design assumes no signal until the car. Habit anchor: meters first (they're usually near the entrance), because readings that depend on remembering get forgotten.

**The walk — room context.** Entering a room, the inspector taps the doorway tag (or ARKit relocalization pre-empts the tap when it's feeling confident — the tag is the guarantee, the anchor is the luxury). The room card appears: today's checkpoints, open findings *here* with their last photos, and this room's baseline for comparison. The mental load of "what was wrong in here again?" — today solved by scrolling old PDFs or by memory — simply evaporates. This moment is the spatial thesis cashing out or not; it is what Milestone 0's field tests must time.

**The checkpoint gesture — the 90% case must be one motion.** Look at the thing; if it's fine, one thumb-reachable tap: OK. Nothing else. A design that demands two taps and a confirm per healthy checkpoint loses the time-inequality by itself — at 50 checkpoints per visit, every extra gesture is a minute, and every extra minute is an inspector who stops using checkpoints. Batch affordance included ("all remaining in this room OK") — with the inspection-expert caveat that batch-OK is logged as batch, because an auditor's "did you actually look?" deserves an honest answer.

**Recording a finding (the 10% case, ~30–60 seconds).** Hold-to-talk, speak naturally — "moisture patch under the sink, maybe ten centimetres, seal looks perished, moderate, recommend replacing" — snap photos, move on. Extraction to structured form (location, severity, recommendation) happens in the background; **the inspector never waits for AI.** Drafts queue for the exit review. If the phone is pointed at a tagged asset or the room is relocalized, the finding self-locates; otherwise it lands at room level and can be pin-placed later or never — a finding without coordinates is still a finding.

**Re-observation — where the passport pays compound interest.** Open findings resurface in their room automatically. The re-photograph flow shows the previous photo as a ghost overlay to reproduce the same angle — then-vs-now pairs become effortless and *comparable*, which is the owner-facing gold (§7). One tap classifies the trajectory: unchanged / improved / worsened / resolved. Each re-observation appends; nothing overwrites (the kitchen-sink timeline builds itself).

**Voice and the social reality — challenged assumption: "voice-first" everywhere.** Dictating "significant mould, probably long-standing" *in front of the owner or a tenant* ranges from awkward to commercially harmful, and inspectors will self-censor, which corrupts the record. The workflow therefore has an explicit **discretion mode**: quick-tap severity + photos on site, dictation deferred to a "notes at the car" prompt that replays each photo for narration. Voice-first must mean voice-*preferred*, with a first-class silent path — occupied properties are not an edge case, and this is a design decision, not a settings toggle buried three menus deep.

**The exit gate (3–5 minutes, at the property).** The session won't close silently incomplete: unvisited rooms, unanswered checkpoints, findings lacking required evidence, missing meter readings — all surfaced, each skippable *with a reason* (locked room happens; it should be recorded, not fudged). Then the review: AI-drafted findings checked against what the inspector actually said, corrected by voice or keyboard, and **explicitly approved — the approval is the inspector's professional signature**, the moment the human-in-control principle becomes a concrete UI act. Then done; sync happens whenever signal returns; the owner's visit story (§7) goes out after approval, never before.

**What disappeared versus the current workflow:** transcribing notes at the office; hunting the previous report for open items; describing locations in prose; assembling the report; remembering which season's tasks apply. The admin tail of an inspection — today often 30–60 minutes — collapses into the exit gate. That is the inequality won, if the walk itself doesn't get slower; measuring exactly that is Milestone 0's field protocol.

---

## 7. Owner Experience

**The reframe:** these owners are mostly far away. They don't experience inspections; they experience *reports about their distant, expensive, beloved house*. The passport's owner product is therefore not "access to inspection data" — it is **a standing answer to the question "is my house okay?"**, backed by evidence they can explore when they want depth. Design for the anxious glance from 1,400 km away first, the deep-dive second.

**The glance (10 seconds, the most common interaction by far).** Property health at the top: overall status in plain words, last visit date, next visit date, open issues count with severity, anything needing an owner decision. An owner who checks in monthly and sees "All well — inspected 12 June — nothing needs you" has received the core product.

**The visit story (5 minutes, after each inspection).** Not a PDF. A short narrative with photos, in the owner's language (the inspector spoke dialect German; the owner may read English — translation is a first-class feature, not a nicety): what was checked, what changed since last time, then-vs-now photo pairs for anything evolving, what LUZ recommends, what it costs to act. Findings translated from inspector-speak into consequence-speak — "perished sink seal" becomes "small leak risk under the kitchen sink; cheap to fix now, expensive if ignored." One tap on any recommendation: *approve the repair* — closing the loop from finding to fix inside the passport, which is where an inspection company quietly becomes a property-care platform.

**Exploring — the floor plan as the index of memory.** Here the spatial model earns its owner-facing keep: the floor plan is the *map interface to the property's history*. Tap the kitchen → the kitchen's timeline, findings, photos through the years. Tap the pool pump → its life story, services, warranty, manual. Slide time backward and watch the property's condition history play. The geometry that guided the inspector now anchors the owner's mental model — same substrate, second dividend. **Challenged assumption: owners want 3D.** They don't, generally; a clean 2D plan with tappable rooms and assets beats a rotatable dollhouse for every real owner task. The 3D dollhouse is a demo asset and an occasional delight — never the primary navigation, and never a dependency for any owner-critical task (plenty of value must survive for the rooms that never scanned well).

**The asset shelf and the money view.** Every asset: age, condition trajectory, service history, warranty countdown, manual. Aggregated: what the house is likely to need spent on it and roughly when — the boiler is 14 years old; the pool pump is mid-life; the gate motor was just replaced. For a remote owner, turning unpredictable emergency calls into a foreseeable maintenance rhythm is arguably the passport's largest emotional deliverable: **the product is fewer surprises.**

**Trust mechanics, designed not asserted.** Every claim in every visit story links to its evidence (tap the sentence, see the photo, its timestamp, its place on the plan). The owner sees each visit's completeness ("41 of 43 checkpoints — cellar locked, rescheduled"). Nothing is silently rewritten, and the owner-visible history says so. And the owner's data is *theirs*: full export, always available — the confidence to leave is a reason to stay.

**What owners are protected from:** the checkpoint firehose, inspector working notes, raw transcripts, the access vault (never), and unexplained jargon. Curation is a feature; the passport's owner surface is edited, the way a physician's letter is edited relative to the chart.

---

## 8. Future Expansion

The passport's expansion potential is a direct consequence of its three primitives — identity, location, memory. Each future capability below exists *because* those primitives exist; almost none of them require the 3D model to improve at all. That asymmetry is the strongest available confirmation that the identity-first architecture is the right one.

**From memory (history × time):**
- **Predictive maintenance.** Asset age + service history + observation trajectories across a *fleet* of managed properties → "irrigation controllers of this brand fail at year 6; yours is entering year 6." LUZ's portfolio becomes an actuarial dataset no single-property tool can match — a genuine moat, and it prices maintenance contracts.
- **Consumption intelligence.** Meter history → leak detection between visits, occupancy anomalies (a spike in an empty house is a finding), energy-upgrade evidence.
- **Change detection.** Each re-scan and re-photo diffed against baseline — geometry diffs (new wall, missing partition) and image diffs (crack propagation measured, not eyeballed) — surfacing *suggested* findings for the inspector, in the established propose/dispose pattern.

**From identity (things and people as addressable):**
- **Contractor mode.** The plumber gets scoped, expiring access to exactly one asset: its history, photos, manual, location on the plan — via the QR tag on the machine itself. Their repair report becomes a memory event. The passport starts orchestrating *all* care of the property, not just inspections — this is the platform play, and tags make it possible for people who will never install the app.
- **Handover dossier.** At sale, the passport transfers: two decades of documented care, every asset's provenance. A passport-backed house is worth more — at which point owners *demand* passports, which is the market pulling instead of LUZ pushing.
- **Insurance evidence.** Timestamped, located, continuous condition records before and after an event; claims documentation becomes a query, and insurer partnerships (discounts for passport-backed homes) become negotiable.

**From location (the spatial layer, maturing on its own schedule):**
- **Guided inspections for new staff.** The passport *is* the property's institutional knowledge; a new inspector's first solo visit is competent because forty visits of accumulated context walk with them. Onboarding time for staff on a portfolio collapses.
- **Owner self-checks.** Between visits, the passport guides an owner or keyholder through a 10-minute seasonal check ("photograph the pool pump gauge; tap OK on each shutter") — feeding the same memory, extending presence between professional visits.
- **Emergency mode.** Anyone the owner authorises gets the Emergency Card: shut-off locations with photos and routes, at 2 a.m., in their language.
- **AR guidance and indoor navigation** — the deferred spatial luxuries, layering onto positions whenever the anchor technology proves itself, required by nothing above.

**And the one the lab exists for:** every primitive here — identities, tags, the event log, contracts — is the integration payload for LUZ Inspector. The passport is designed so that production can adopt the *memory* without the AR, the *tags* without RoomPlan, the *checkpoints* without the floor plan: each layer valuable alone, because that is how validated components actually migrate into a stable product — one at a time.

---

## Closing: What Milestone 0 Must Now Test

A design is a set of bets. The ones this document places, ranked by how urgently the field should be allowed to falsify them:

1. **The founding walk fits in +45–90 minutes** and inspectors complete tagging without skipping it under time pressure — if tagging gets skipped, the entire identity backbone is theoretical.
2. **The one-tap checkpoint gesture keeps recurring visits under the current checklist time** from visit two — the inspector inequality is the make-or-break metric.
3. **Discretion mode preserves data quality** — deferred dictation must not produce thinner findings than live voice, or voice-first needs deeper rethinking.
4. **Owners actually open the visit story** — if read-rates are low, the owner surface, not the data model, is wrong.
5. **Anchors re-find well enough to be worth their capture cost** — the one bet that is allowed to fail, by design, because tags are underneath it.

Everything else in this document survives any single bet failing. That is what it means to design the passport around identity and memory first: the parts that can break are the parts that were built to be optional.

