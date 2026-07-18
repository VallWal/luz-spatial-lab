# The Inspection Visit — Experience Design

**Project:** LUZ Spatial Lab — Milestone 0 (Design)
**Date:** 18 July 2026
**Status:** Experience specification for validation. Companion to *The Property Passport — Design Document* (§6 is this document's contract).
**Scope:** The recurring inspection visit, from the drive to the property to the moment the approved visit leaves the phone. Onboarding (the founding walk) and the owner experience are out of scope here and will get their own specs.
**Perspectives applied:** Apple Human Interface design, hospitality-grade UX, product-tool interaction design, systems-of-record product design, service design.

---

## Part I — The Design Stance

### What this app must feel like

The inspector is a professional walking through someone's home. The phone is a notebook that fills itself in, not a terminal to be operated. Everything below serves five felt qualities: **calm** (the screen never competes with the room), **premium** (restraint, precision, and materials-grade polish), **trustworthy** (the app never lies about what it knows, what it saved, or what was skipped), **effortless** (the 90% case is one motion), and **almost magical** (the app already knows which room you're in, what was wrong here last time, and what today's visit is about — and never brags about it).

The magic budget is spent on *anticipation*, never on spectacle. No 3D flourishes, no AR-for-AR's-sake, no celebratory animations. The moment that should feel magical is the mundane one: you walk into the kitchen, tap the doorway tag, and the phone is already showing the kitchen — with last visit's leak photo waiting.

### The six laws of the visit

Every screen and every interaction in Part II is derivable from these. When a future design question comes up, answer it from the laws, not from precedent in other apps.

1. **One obvious action.** Every screen has exactly one visually dominant next action, placed in the thumb zone. Secondary actions exist but recede. If a screen ever has two plausible "what now?" answers, the screen is wrong.
2. **The app knows what's next.** The visit is a computed sequence, not a menu. At any moment the app holds a single answer to "what would a great inspector do next here?" and offers it quietly. The inspector may ignore it at zero cost — the sequence recomputes around them. Guidance, never rails.
3. **Speed is trust.** The healthy-checkpoint gesture is one tap, under 100 ms to respond, with haptic confirmation. At 50 checkpoints a visit, every extra gesture is a minute, and every extra minute is an inspector who stops using checkpoints. No interaction in the walk may ever wait on AI, network, or a spinner.
4. **Nothing blocks; everything degrades.** No signal, no NFC read, no relocalization, no LiDAR, locked room, dead tag — every failure has a designed fallback one tier down, and the fallback is offered in place, not hidden in settings. Tags guarantee; anchors enhance; words survive everything.
5. **Honest by design.** Skips are recorded with reasons, batch-OK is logged as batch, drafts are visibly drafts, and nothing is marked done that wasn't done. The UI never manufactures false completeness — an auditor's "did you actually look?" always has a true answer.
6. **The phone yields to the room.** Screens are glanceable in under two seconds, operable one-handed and half-attention, and designed to be *put away*. The measure of a great session screen is how little time is spent looking at it.

### The interaction spine

One mental model carries the whole visit: **the session is a thread of moments, and the current moment always owns the screen.** There is no tab bar during a visit, no hamburger, no navigation stack to get lost in. The inspector moves through physical space; the app follows via tags (guarantee) and relocalization (enhancement), and the screen simply *is* wherever they are. A single persistent element — the **Next ribbon**, a one-line footer — always names the computed next moment ("Next: pool plant room · 3 checkpoints") so the answer to "what now?" is on every screen without ever being a demand.

Three input grades, matched to the field: **tap** for judgment calls (OK, severity, approve), **hold-to-talk** for anything descriptive (findings, notes, renames), **camera/NFC** for evidence and identity. Typing exists everywhere as a silent fallback and is never the designed path.

---

## Part II — The Visit, Moment by Moment

### Moment 0 — The briefing (in the car, ~2 minutes)

**Screen: Visit Briefing.** Auto-prepared, zero back-office labour. A single scrollable card, in reading order: the property's one-line status; **what makes today's visit particular** — open findings to re-check (each with its last photo as a thumbnail), seasonal checkpoints due (pool opening, winterisation), owner requests since last visit, and any data flags ("electricity consumption doubled since May — investigate"); then the practical footer (access notes, today's checkpoint count, estimated duration).

The briefing is prose-shaped, not dashboard-shaped: it reads like a colleague's handover, because that is what it is. Nothing here is tappable-mandatory; the briefing is read, not operated.

*Primary action:* none — and that is deliberate. The card ends with the passive note "Visit starts automatically when you arrive." The inspector reads, pockets the phone, and drives.

### Moment 1 — Arrival (30 seconds)

Geofence raises a notification and, when the app opens, a full-screen **Arrival card**: property name, photo, today's shape in one line ("14 rooms · 46 checkpoints · 3 open findings · meters first").

*Primary action:* **Start visit** — one large button, thumb zone. This is the visit's single moment of ceremony, and its tap is the session's timestamp. From this tap forward the entire session is offline-first: everything writes locally, sync is a background concern for later, and no screen in the visit ever references connectivity.

Immediately after start, the app plays its first Next ribbon: "Meters first — they're by the entrance." Habit anchor, not enforcement: readings that depend on remembering get forgotten, so the app spends its first suggestion on them.

### Moment 2 — Meters (2 minutes)

**Screen: Meter capture.** Camera-first: point at the meter, the reading is OCR'd on-device and shown large over the live image, previous reading and delta beneath it ("18,412 · +34 m³ since March — normal for the season"). An anomalous delta gets one quiet line, not an alarm ("unusually high for an empty house — worth a look?").

*Primary action:* **Confirm reading** (one tap; the photo is kept as evidence automatically). Mis-OCR is corrected by tapping the number and speaking or typing it. Three meters, three confirms, done. The Next ribbon moves on: "Next: entrance hall."

### Moment 3 — Entering a room

The inspector taps the doorway tag — NFC tap, no aiming, works in the dark with wet gloves. Or ARKit relocalization has already recognised the room and pre-empted the tap, in which case the room card is simply *already there* when the phone comes up (the tag remains the guarantee; the anchor saved the tap). Or neither: the QR on the same tag scans with the camera, or the room is picked from a one-screen list. Four tiers, one outcome, no ceremony about which tier fired.

**Screen: the Room card.** The visit's home screen and its most important design object. Top to bottom:

1. **Room name and a thin progress tick** ("Kitchen · 2 of 5 done") — orientation, not gamification.
2. **Open findings here** — the "what was wrong in here again?" answer, each with its last photo, severity, and age ("moisture under sink · moderate · first seen Nov 2025"). This block exists only when it has content, and it sits *above* the checkpoints because re-observation is the highest-value work in the room.
3. **Today's checkpoints here** — an ordered list, each row a single line: name, guidance line in smaller type ("check seal and trap for moisture"), and the OK affordance.
4. Quietly, at the bottom: baseline photos for comparison, and the room's tools (add checkpoint, add free finding, room note).

*Primary action:* the top undone item's **OK** — the eye lands on the next question, the thumb rests on its answer.

### Moment 4 — The checkpoint gesture (the 90% case)

Look at the thing. If it's fine: **one tap on OK.** The row confirms with a soft haptic tick and a 150 ms settle animation, collapses to its done state, and the next checkpoint slides up under the thumb. Nothing else — no confirm, no note prompt, no "add photo?" nag. A checkpoint whose evidence rule requires a photo shows a camera glyph instead of OK, and its one motion is the shutter; the OK is implicit in the capture.

This gesture is the product. It is rehearsed, tuned, and profiled like a keyboard key: sub-100 ms visual response, distinct haptic, cancelable by immediate second tap ("undo" toast for 4 seconds, then committed). Fifty of these per visit must feel like *nothing*.

**Batch-OK** exists per room — "Mark remaining 3 OK" appears only after at least one individual interaction in the room (a speed bump against drive-by inspection) — and is logged as batch, visibly, in the record. Honest by design.

**A checkpoint that isn't fine** is one gesture away: **press-and-hold the same row** slides it open into finding capture (Moment 5), pre-anchored to this checkpoint. Tap = yes, hold = tell me more. Two intents, one thumb position, zero navigation.

### Moment 5 — Recording a finding (the 10% case, 30–60 seconds)

**Screen: Finding capture.** Camera live at the top (evidence is the point; the camera is already warm), a hold-to-talk button at the bottom, severity as four muted chips (note / minor / moderate / urgent).

The designed flow: hold, speak naturally — "moisture patch under the sink, maybe ten centimetres, seal looks perished, moderate, recommend replacing" — release, snap one or two photos, tap severity if it wasn't spoken, done. The waveform confirms the audio landed; a small "draft" chip confirms where it went. **Extraction to structured form happens in the background and the inspector never sees it happen** — drafts queue for the exit review, and the walk continues immediately. If the phone was pointed at a tagged asset or the room is relocalized, the finding self-locates; otherwise it lands at room level, which is a complete, legitimate resting state — pin-placement is offered at review, never demanded.

*Primary action:* the hold-to-talk button — except in discretion mode, where it yields.

**Discretion mode** is a first-class visit state, not a setting. Toggled from the session header in one tap (or suggested automatically when the visit's notes say the property is occupied), it swaps the capture flow: severity chips and photos on site, **no microphone UI shown at all**, and every silent finding queues for the **car prompt** — after the exit gate, the app replays each photo full-screen and takes the deferred narration one finding at a time. Dictating "significant mould, probably long-standing" in front of a tenant is a commercial harm; the silent path must feel equally designed, or inspectors will self-censor and the record corrupts.

### Moment 6 — Re-observation (where the passport pays interest)

Open findings sit at the top of their room card. Tapping one opens **Then/Now**: the previous photo displayed as a **ghost overlay** on the live camera, so reproducing the same angle is a matter of lining up shadows. Shutter, then one tap on the trajectory: **unchanged / improved / worsened / resolved.** Each re-observation appends to the finding's timeline; nothing overwrites. "Worsened" offers (never demands) a hold-to-talk addendum.

This 10-second loop quietly produces the passport's most persuasive artifact — comparable then-vs-now pairs across years — as a *by-product of the fastest path*, which is the only way field data of that quality ever actually gets made.

### Moment 7 — Moving through the house

Between rooms there is no screen to manage. The room card persists until the next doorway tag tap (or relocalization) replaces it; the Next ribbon names the suggested next room, computed from the property's usual route and what remains. Walking "out of order" requires nothing — tap whatever doorway you're at; the sequence reflows. Rooms with nothing due today still open on tag-tap to a minimal card ("nothing scheduled — add an observation?") because the inspector's eye outranks the schedule: seeing something in a hallway with no checkpoints must be two gestures from recorded, or it will go unrecorded.

The checkpoint set itself is editable mid-walk, because mid-walk is when the inspector notices it's wrong, and any friction means "I'll fix it later" — which means never. Hold-to-talk from any room card takes "add a checkpoint: gutter above the terrace, check each autumn" and files it into the suggestion tray for one-tap acceptance at the exit review; a checkpoint that's stopped earning its place is retired (never deleted) from the same review, keeping its history. The set breathes without ever interrupting the walk.

An interrupted session (phone call, owner conversation, lunch) simply resumes where it was — the lock screen shows a Live Activity with the property name and progress ("Kitchen · 31 of 46"), and reopening lands exactly in the last room card. No session timeout, ever, during a visit day.

### Moment 8 — The exit gate (3–5 minutes, at the property)

Attempting to end the visit opens the **Exit gate** — the session's conscience, and the one screen allowed to be demanding. A short list of what's incomplete: unvisited rooms, unanswered checkpoints, findings missing required evidence, meters unread. Each row has two equal affordances: **resolve it** (deep-links straight to the room card or capture screen) or **skip with a reason** (one tap opens four common reasons — locked, inaccessible, weather, owner declined — plus hold-to-talk for anything else). A locked cellar happens; it should cost five seconds to record and zero shame. What it may never be is silent.

*Primary action:* **Review visit** — enabled only when every item is resolved or reasoned.

**Then the review.** Draft findings appear one per screen: the photos, the AI-structured summary (location, description, severity, recommendation), and the inspector's own words a tap away beneath it. Corrections are by voice or keyboard, inline. This is where the background AI surfaces for the first and only time — as a *drafted document to be checked*, never as a mid-walk interruption. In discretion mode, this is also where the car prompt runs, photo by photo, before the drafts are assembled.

The final screen is the signature moment: the visit's summary (rooms, checkpoints, findings, skips-with-reasons — the honest number, batch-OKs marked) above a single button.

*Primary action:* **Approve visit.** This tap is the inspector's professional signature — the one deliberately weighty interaction in the entire app. It gets the one confirmation dialog the visit contains, a firm haptic, and a moment of stillness afterward. Everything before it was a draft; after it, the record is permanent, append-only, and on its way to the owner's visit story — never before.

### Moment 9 — Done

A calm closing card: "Visit approved · 46 checkpoints · 2 findings · syncs when you're back in signal." One glance, pocket the phone. If the car prompt has deferred narrations pending, the Next ribbon's final act says so. No fireworks. The reward for finishing is that it's finished — and that the admin tail that used to take 30–60 minutes at the office no longer exists.

---

## Part III — The System Beneath the Screens

### The gesture budget

The visit's cost model, stated as design contract. Field tests measure against these numbers; exceeding them is a design defect, not a training issue.

| Moment | Designed cost |
|---|---|
| Healthy checkpoint | 1 tap |
| Checkpoint with required photo | 1 shutter |
| Room transition | 1 NFC tap (0 when relocalized) |
| New finding | 1 hold-to-talk + 1–2 shutters + ≤1 severity tap |
| Re-observation | 1 tap + 1 shutter + 1 trajectory tap |
| Meter reading | 1 confirm tap |
| Skip with reason | 2 taps |
| Whole-visit chrome (start, gate, approve) | ≤6 taps total |

What was removed to hit these numbers: save buttons (everything commits on capture), confirmation dialogs (except the approval), photo-quality review prompts (retake is always available, never demanded), any form filled during the walk, any decision about where data goes (anchoring is automatic or deferred), and all settings access during a session.

### Visual and material language

**Restraint as identity.** A near-monochrome, warm-neutral surface — the app should feel like good paper. System type (SF Pro), generous spacing, true blacks avoided in favour of soft depth. Exactly **one accent colour, reserved exclusively for the primary action** — the inspector's eye learns that colour means "this is the next thing," and nothing else is allowed to use it. Severity uses a muted scale (slate / amber / orange / red) that stays quiet until a finding exists; the app at rest contains almost no colour at all.

Structure vs. scenery, felt not documented: wherever geometry appears (room thumbnails, pin-placement), walls are solid and confident; furniture is ghosted. The epistemic hierarchy of the passport rendered as line weight.

**Environmental adaptation, automatic:** plant rooms and cellars are dark — ambient-light sensing raises contrast and offers the torch in one tap from the camera; every touch target is glove-sized (≥48 pt) and every walk-phase interaction works one-handed on the largest iPhone. Outdoor Mediterranean sun gets the high-contrast treatment in reverse.

**Haptics as the confirmation channel.** The walk is designed to be operated half-looking, so touch confirms what the eye doesn't: a light tick for OK, a double tick for a captured finding, a distinct soft thud for a successful tag read, a firm resolve for the approval. Sound is off by default — this is someone's home.

**Motion** is functional and under 200 ms: rows settle, cards slide in the direction of the physical walk, the ghost overlay cross-fades. Nothing bounces. Nothing celebrates.

### The reliability ladder (felt experience of degradation)

Law 4, made concrete. Every tier drop is silent or one quiet line — never a modal, never a red banner, never a blocked path:

- **Relocalization fails** → nothing is even said; the doorway tag was always the designed path. The anchor saving a tap is the luxury tier.
- **NFC read fails** (dead tag, phone case) → the camera is one tap away for the QR on the same plate; three failed reads auto-suggest logging a "tag unreadable" finding, which schedules the replacement — the failure itself becomes record.
- **No tag** (fell off, never placed) → pick the room from a one-screen list; the app suggests re-tagging at the exit gate.
- **A finding can't self-locate** → it lives at room level, forever if need be. "In the kitchen" is a complete answer.
- **No signal** — not a degradation at all. The entire visit is designed offline; sync is invisible bookkeeping that happens from the car.

### What the AI is allowed to touch

During the walk: transcription queued in background, nameplate OCR, meter OCR, photo→room association — all silent, none load-bearing, none ever waited for. At the review: drafted structured findings, presented as checkable drafts beside the inspector's verbatim words. Never: auto-approving anything, mid-walk suggestions that interrupt the room, or any output entering the permanent record without the approval tap. The pattern is fixed: **AI proposes, the inspector disposes** — and during the walk, AI doesn't even propose out loud.

---

## Part IV — What Milestone 0 Must Measure

This spec places bets the field must be allowed to falsify, in priority order:

1. **The one-tap gesture holds the time inequality.** From visit two, a passport-backed inspection must take less inspector effort than the current checklist workflow. Instrument the build: taps per visit, seconds per checkpoint, time-in-app vs. time-in-room.
2. **The Next ribbon is followed or ignored — either is fine — but never fought.** If inspectors override the suggested route constantly *and* report friction, the sequencing model is wrong.
3. **Discretion mode produces findings as rich as live voice.** Compare deferred-narration findings against live-dictated ones for completeness. If thinner, the car prompt needs redesign before voice-first is trusted.
4. **The exit gate is experienced as a conscience, not a nag.** If inspectors start gaming reasons to get out faster, the gate's friction is mis-tuned.
5. **Glanceability is real:** median screen-attention per room interaction under 5 seconds, measured, not assumed.

A visit that ends with the inspector saying "I barely used the app" is this design working exactly as intended.
