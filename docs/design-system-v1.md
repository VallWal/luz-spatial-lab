# LUZ Design System — v1

**Status:** Official product language, extracted from the Property Passport prototype (the reference experience).
**Scope:** every future LUZ screen — inspector, owner, and internal — is built from this document. It is not a UI kit; it is the set of rules a team should be able to build the next 500 screens from without asking questions the prototype has already answered.
**Change control:** deviations require an entry in this document, not a local exception.

---

## 1. Design Philosophy

LUZ should feel **calm, premium, trustworthy, warm, quiet, confident — with invisible technology.** In practice:

**Calm** — one decision per screen, generous whitespace, no badges begging for attention, no red unless something is actually wrong. Practical test: a screenshot at arm's length should have exactly one obvious thing to do.

**Premium** — quality signaled through restraint: deep navy and warm cream instead of white-and-blue SaaS; a serif display voice used sparingly; large soft-cornered cards; no gradients-as-decoration. Premium is *fewer* elements, better placed.

**Trustworthy** — the interface shows its evidence. Every claim links to a photo, a timestamp, a place. Suggestions are visibly suggestions (the sparkle) and become facts only when a person confirms them. Nothing disappears silently; skipped work becomes a visible list item, never a lost state.

**Warm** — the product speaks about *the property*, not about itself. "Future visits will remember what belongs here" instead of "Data saved." The house is personified gently; the software never is.

**Quiet** — the interface narrates less as the user gets further. Explanations appear once, at first need, then get out of the way. No confirmations for reversible acts. Success is acknowledged in one line, not celebrated in three.

**Confident** — buttons state outcomes ("Create Property Passport"), never hedge ("Submit?"). Defaults are opinionated (checkpoints pre-selected). Failure paths are presented as normal routes, not apologies: "Continue with photos instead."

**Invisible technology** — no technical vocabulary anywhere in the UI. Users tag, scan, capture, and remember; they never encounter RoomPlan, ARKit, NFC, NDEF, sync, or "AI" as words. The most advanced feature should read like the most obvious one.

## 2. Design Principles

1. **One obvious action.** Every screen has exactly one gold action, bottom-anchored. Secondary paths are visually quiet. If a screen needs two primaries, it is two screens.
2. **One-handed first.** All commit actions live in the bottom 40% of the screen. Nothing critical is placed top-right except exit.
3. **The room matters more than the phone.** Field screens are glanceable in ≤ 2 seconds; long reading belongs to desk and owner surfaces, never to the walk.
4. **Everything can be resumed.** Any flow survives interruption, app death, and a phone call. Progress is persisted continuously; "resume where you left off" is a guarantee, not a feature.
5. **Nothing blocks progress.** Every step can be skipped; every skip becomes a visible later-item. The only hard gates are the user's own explicit approvals.
6. **Voice preferred, typing avoided, silence respected.** Speech is the primary input for prose; every voice affordance has a silent tap path of equal standing (discretion mode is a first-class context, not a setting).
7. **AI never interrupts, never decides.** Suggestions arrive marked, wait quietly, and require a human confirm. AI work happens in the background; the inspector never waits for it.
8. **Every action leaves evidence.** Acts produce records — photo, timestamp, place, author. History is append-only in the UI's language: things are *retired* or *corrected by a new entry*, never silently rewritten.
9. **Failure is a route, not an error.** Degraded paths (photos instead of scan) are designed with the same care as happy paths and never apologise.
10. **Explain once, then trust the user.** First occurrence gets one plain sentence; later occurrences get none.

## 3. Colour System

Palette (authoritative hex values):

| Token | Hex | Role |
|---|---|---|
| `navy-950` | `#0A1624` | App-level dark background (launcher, ceremony moments, Utility Hunt) |
| `navy-900` | `#102338` | Primary buttons, dark cards, hero scrims |
| `navy-800/700` | `#18324C` / `#23425F` | Pressed states, secondary dark surfaces, icons on light |
| `cream-50` | `#FAF7F2` | Default screen background; text on dark |
| `cream-100/200` | `#F4EFE6` / `#EAE2D4` | Quiet fills, tiles, dividers |
| `white` | `#FFFFFF` | Cards on cream |
| `gold-500` | `#B9935A` | **The** primary action colour; progress; selected |
| `gold-400/600/700` | `#CBA76E` / `#A67F44` / `#8A6836` | Gold on dark / pressed / gold text on light |
| `ink-900/700/500/400` | `#1B2A3A`…`#7D8C9E` | Text ramp on light: heading / body / secondary / metadata |
| `ok-500` on `ok-100` | `#2E7D5B` / `#E2EFE8` | Success, health, completion |
| `warn-500` on `warn-100` | `#A8752A` / `#F4E9D7` | Attention, degraded, watch |
| `danger-500` on `danger-100` | `#B3452F` / `#F5E3DE` | Problems, emergencies only |

**Usage rules.** Gold is reserved for *the* action and *the* progress — never for decoration, icons-at-rest, or more than one element per screen region; if gold appears twice at rest, one of them is wrong. Navy-900 is the primary *within cards* and on dark surfaces' secondary actions; it never competes with gold on the same surface for the same rank. Backgrounds are cream-50 (field/light) or navy-950 (ceremony/dark); no third background exists. Success/warn/danger are **status colours only** — they may tint chips, dots, and fills but never buttons except a true destructive action (danger). Disabled is the element at 40% opacity, never a new grey. Pure black and pure decorative colours (blues, purples, teals) are forbidden; imagery supplies variety, the UI does not.

**Dark-surface text floor:** on navy, body text is cream-50, secondary text cream-50 at **≥ 72% opacity**, metadata ≥ 60% and never for load-bearing information. (The prototype dips below this in places; new screens must not.)

## 4. Typography

Two voices: **Display serif** (`New York` / Georgia fallback) for moments of meaning — property names, screen titles, big numbers; **Text sans** (SF Pro) for everything operational.

| Style | Face / size / weight | Use |
|---|---|---|
| Display XL | Serif 34 semibold | Launcher thesis, ceremony lines |
| Display / Title | Serif 30 semibold, tracking −1% | Screen titles in flows |
| Display S | Serif 24–28 semibold | Card heroes, celebration headings, stat numbers (24) |
| Headline | Sans 17–18 semibold | Card titles, top-bar titles |
| Body | Sans 16 regular | Primary reading, inputs |
| Row title | Sans 15–16 medium | List rows, options |
| Support | Sans 14 regular | Explanations under controls |
| Caption | Sans 13 regular | Row subtitles, metadata |
| Label | Sans 12–13 semibold UPPERCASE, tracking +7–8% | Section labels, field labels |
| Micro | Sans 11–12 medium | Bottom-nav labels, photo badges |
| Numbers | Serif for meaningful counts (stats); sans tabular for data (serials, readings, %) |
| Status text | Sans 13–14 semibold, always paired with its status colour *and* a shape (chip/dot/icon) |
| Button | Sans 17 semibold (primary), 14–15 semibold (small) |

**Emphasis rules:** emphasis is achieved by weight (medium→semibold) or colour step (ink-500→ink-900), never italics (reserved for provisional/scenery content, e.g. "sofa — temporary context"), never underline (links don't exist in-app), never ALL CAPS outside the Label style, and never bold runs inside body paragraphs longer than three words. Serif never appears below 24pt and never in controls. Minimum text size in field flows: 13pt; nothing the inspector must act on is below 15pt.

## 5. Spacing System

Base unit **4pt**; everything is a multiple.

- **Screen margins:** 20pt horizontal, everywhere.
- **Card padding:** 20pt (standard), 16pt (compact tiles).
- **Between cards:** 12–14pt; between a card and its section label: 10pt.
- **Between sections:** 28pt (the section label carries the gap above it).
- **List rows:** ≥ 56pt height, 14pt internal gap between leading element and text.
- **Touch targets:** 44×44pt absolute minimum; primary buttons 56pt tall; field-flow commit gestures (checkpoint OK) ≥ 48pt.
- **Thumb zone:** the bottom action bar is fixed, safe-area padded, with a fade so content never hides under it; content scrolls, actions don't. Top-of-screen interactions are limited to back/exit.
- **Maximum content width:** 430pt column, centred on anything wider (tablet/desktop render the phone column; wide layouts are a future, deliberate decision — not an accident of stretching).
- **Vertical rhythm:** title → 10pt → lead paragraph → 24pt → first content block; inside cards, 12pt between distinct ideas; dividers are hairlines in cream-200, inset to the text column.
- **Corner radii:** cards 24pt, buttons/inputs 16pt, small tiles 12pt, chips/pills full. Radius signals importance; don't mix radii within one component.

## 6. Components

Format — **Purpose · Behaviour · States · Spacing · Animation · Accessibility.**

**Primary button (gold).** The screen's single forward action. · Full-width, bottom bar; label states the outcome ("Save asset"). · rest / pressed (gold-600) / disabled (40%, label may explain: "A few photos to go…"). · 56pt tall, 16pt radius. · colour transition 150ms; no scale. · Always reachable, `Button` role, disabled state announced with reason.

**Secondary button.** Coequal alternative below primary. · White fill, cream-300 border. · rest / pressed (cream-100) / disabled. · 44–56pt. · none. · Never the only path.

**Ghost/quiet button.** Escape hatches: skip, later, hide. · Text-only or cream-100 fill; verb + consequence ("Skip — tag it later"). · rest/pressed. · ≥ 44pt hit area even when visually small. · none. · Must not disappear on small screens.

**Card.** The unit of content. · White, 24pt radius, soft shadow; tappable cards darken on press and carry a chevron or clear affordance. · rest / pressed / (never "selected" — selection is for rows). · §5. · none on appear (content doesn't animate in after first paint). · Tappable card = single accessible element with combined label.

**Property card.** Hero for one property. · Image with bottom scrim, serif name, location, one status chip top-/bottom-right. · statuses via chip only. · text 20pt from edges. · none. · Image is decorative; label carries name + status.

**Room card / row.** A room in lists or the walk. · Thumbnail (44pt, 12pt radius) + name + one-line state ("5 checkpoints"); tappable when a detail exists. · pending / in-progress (gold accent) / done (ok check) / degraded (warn note, plain words). · row spec §5. · pop-in check on completion. · State is text + colour, never colour alone.

**Checkpoint row.** A standing question. · One-tap toggle circle + label + quiet edit affordance; tap anywhere toggles. · selected (ok fill, check) / unselected (outline, label at ink-400) / editing (inline field). · ≥ 56pt. · 150ms colour; check pop. · `aria-pressed`; label read in full.

**Finding row.** An observation with consequence. · Severity dot/chip + description + place + time; opens detail with evidence. · open / re-checked (trajectory: unchanged, improved, worsened) / resolved. · row spec. · none. · Severity announced first.

**Status chip.** Compact state declaration. · Tinted fill + semibold text (+ check icon for ok). · ok / warn / danger / info / neutral. · 12pt horizontal padding, full radius. · none. · Text always present; icon optional.

**Tag (identity).** Represents a physical NFC/QR tag binding. · Shown as small tag icon + "Tagged"/"Tag later" state; interaction happens in the Tag scan surface (below). · linked / deferred / unreadable (warn, prompts replacement). · inline. · none. · Deferred state must be reachable later from the entity.

**Timeline.** An entity's life story. · Newest first; icon bubble + date label + title + one-line detail; service events gold-tinted. · event kinds: inspection/service/passport/note. · 14pt gaps, hairline between entries. · none. · Chronology conveyed by order and dates, not visuals alone.

**Metric / stat tile.** One meaningful number. · Serif number + sans label in a cream-100 tile. · static only — metrics never blink or tick. · 16pt padding, 16pt radius. · none. · Number and label one accessible string.

**Progress indicator.** Location within a flow. · Pips: done = gold elongated, remaining = dots; phase-level only, never percentages of quality ("Operational", not "83%"). · n of m. · 6pt gaps. · width transition 200ms. · Hidden text equivalent "step n of m".

**Section header.** Label of a content band. · Uppercase 12–13pt tracked, ink-400 (cream-50/50 on dark). · none. · 28pt above, 10pt below. · none. · Rendered as heading for VoiceOver navigation.

**Bottom action bar.** Home of the primary action. · Fixed, gradient fade above, safe-area padded; one primary + optional one quiet action; never three. · per buttons. · 20pt margins. · none (no slide-in). · Focus order: content, then bar.

**Modal / confirmation sheet.** Rare; only for destructive or irreversible acts (reset, retire, share access). · Bottom sheet, one sentence of consequence, destructive action in danger, cancel equal weight. · default/destructive. · 20pt padding. · 250ms slide-up; dims backdrop. · Focus trapped; escape = cancel.

**Toast.** Quiet confirmation of a background result. · One line, bottom-anchored above bar, self-dismissing ~2.5s; never for errors that need action; never stacked. · info/success. · pill, 16pt padding. · fade 200ms. · Announced politely; not focusable.

**Skeleton.** Loading placeholder for post-walk browsing surfaces only (field flows must never need one — they are local). · Grey-cream blocks in final layout. · shimmer allowed at ≤ 1 cycle/1.5s, honours reduced motion. · matches target layout. · Announced as "loading".

**Camera overlay.** Guided capture. · Full-bleed viewfinder, shot label chip top-centre, shutter bottom-centre (72pt), quiet skip below; guidance text one line max. · aiming / captured (check pop + thumbnail) / retake. · shutter in thumb zone. · shutter press scale 0.88; check pop. · Shutter labelled; guidance readable at arm's length (≥ 15pt on scrim).

**Voice capture.** Speak-instead-of-type affordance. · Mic row: idle prompt → listening (waveform) → result inserted as editable text marked "from voice". · idle / listening / done / (error → falls back to keyboard silently). · row spec. · waveform CSS-cheap, honours reduced motion. · Always paired with a text path of equal prominence.

**Asset card.** Equipment identity. · Photo thumb + name + place/brand line + registered check or decision actions. · suggested / registered / ignored / kept-aside (with visible Undo). · card spec. · check pop on registration. · Decision buttons ≥ 44pt.

**Emergency card entry.** Life-safety lookup. · Close-up + surroundings photo pair, location sentence at ≥ 16pt, one navy "Open location" action; codes never displayed. · normal / located (plan snippet expands). · card spec, photos edge-to-edge. · plan pin may pulse (exempt from "no decoration" because it is functional pointing). · Highest contrast text in the app; works in direct sun.

**Property memory item.** A remembered fact/document. · Icon bubble + title + anchored-to line (room/asset) + date. · types: note/document/warranty (expiry chip when near) /reading. · row spec. · none. · Anchor always stated — memory is never floating.

**Owner story card.** The visit, told humanly. · Inspector avatar + one-paragraph narrative + "read more"; consequence-speak, no jargon, owner's language. · unread/read (no badges — calm). · card spec. · none. · Full story readable by VoiceOver as one article.

## 7. Motion

**Principles:** motion explains, never entertains; everything under 300ms except deliberate ceremony; the walk must feel *faster* than the inspector, never slower; all motion collapses gracefully under Reduce Motion (state changes become instant, progress remains visible).

**Durations:** state/colour 150ms · step transition 280ms (fade + 14pt rise, curve 0.25/0.6/0.3/1) · sheet 250ms · success pop 450ms (single overshoot) · ceremony spring (completion): stiffness ~200, damping ~18, once per flow.

**Allowed:** step fades; success check pops; width/colour transitions on progress; simulation choreography with meaning (NFC rings, scanline, waveform, wireframe draw); shutter press-scale; one pulsing pin on the emergency plan.

**Forbidden:** parallax; looping decoration; bouncing lists; attention-seeking idle animation; skeleton shimmer in field flows; animated numbers; anything blocking input while it plays; confetti — forever.

**Navigation transitions:** forward = rise+fade; back = reverse; post-walk browsing uses standard platform push. The walk never slides horizontally (steps are states, not pages).

**Success feedback:** small acts → check pop only; room complete → pop + one sentence; passport creation → the one ceremony spring. Three tiers, no inflation.

**Room changes / loading:** room context appears immediately with whatever is local (always everything, in field flows); never a spinner during the walk. **Haptics (production):** light tick on checkpoint OK and photo capture; success notification haptic on tag link and room complete; warning haptic on scan degradation; nothing else. Haptics accompany, never replace, visible feedback.

## 8. Icons

**Family:** Lucide (outline, 2pt stroke) — the single icon language. No mixing families; no filled variants (state is shown by the container: a tinted circle, not a filled glyph).

**Sizes:** 14–16 inline · 18–20 rows/buttons · 22–26 feature spots · larger only inside illustration circles (ceremony shield).

**Rules:** icons accompany text; icon-only is permitted solely for back (chevron), close/pause (X), and the shutter — each with an accessibility label. One icon per row, leading position. Icons inherit semantic colour; gold icons only inside gold-tinted feature spots. **When unnecessary:** section headers, buttons whose verb is clear ("Continue"), stat tiles, anywhere the icon would merely repeat the noun beside it — when in doubt, omit; text is the interface, icons are wayfinding.

## 9. Photography

Photography is the product's evidence and its warmth; it must be *useful first, beautiful second, comparable always*.

- **Room/baseline photos:** landscape, chest height, from a corner, two walls visible; the standard set (overview, window wall, distinctive feature, ceiling, floor, one detail worth remembering) shot in the same order every property so future visits compare like-for-like. Lights on, shutters as found.
- **Asset photos:** two per asset, always — the whole unit in context (shows *where*), then the nameplate square-on, filling the frame (shows *what*). Grime is information; don't stage.
- **Evidence photos:** context first (where in the room), then close-up (what exactly); a finding without both is half a finding. Re-observations reproduce the original angle (ghost overlay) — comparability beats composition.
- **Utility/emergency photos:** close-up + step-back surroundings pair, wide enough that a stranger under stress can navigate by them.
- **Owner-facing photos:** selected, not raw — the visit story shows the property at its truthful best; never publish clutter that embarrasses without informing. No people, ever; avoid personal items where possible (privacy is part of trust).
- **Framing rules:** horizon level; no flash unless needed for legibility; thumbnails square-cropped centre; UI never overlays text on the informative area of an evidence photo (badges sit in corners).

## 10. Copywriting

**Tone:** a calm, senior colleague — warm, brief, certain. The app talks about the property and the future, not about itself. Contractions welcome; exclamation marks are not (the sole exception: nowhere).

**How the app speaks:** outcomes, not mechanics — "Future visits can now identify this property immediately", never "Tag ID stored". Buttons are verb-first outcomes ("Create Property Passport"). Explanations are one sentence, delivered at first need, then never again. The property may be personified gently ("Casa del Mar will remember"); the software never says "I".

**Errors:** never blame, never alarm, always include the road forward, in plain words: "Mirrors are making this room hard to read — continue with photos, or try again." No error codes on screen, no "failed", no "invalid". If nothing can proceed, say what will happen to the work so far (it is kept — say so).

**Findings:** inspector-facing = precise and neutral ("Moisture patch under sink, ~10 cm, seal perished; moderate; recommend replacement"). Owner-facing = consequence-speak, translated: what it is, what it means, what it costs to act now versus later — without fear ("A small leak risk under the kitchen sink. Cheap to fix now; more expensive if it waits.").

**Guidance:** imperative, short, sensory: "Move slowly. Capture the corners." Never more than one instruction visible at a time in a capture surface.

**Forbidden vocabulary in UI:** RoomPlan, ARKit, LiDAR, NFC/NDEF, QR (say "tag" / "code"), sync, upload, database, AI/model, session, error, invalid, %, "operational" is the *only* status word for passport readiness. **Language note:** copy ships in English and German; German follows the same rules and prefers Sie-form warmth; idioms must survive translation or be cut.

## 11. Accessibility

- **Outdoor readability:** field flows assume direct sunlight — body ≥ 15pt, no light-on-light, key surfaces avoid mid-opacity text (see §3 floor), and critical information never relies on subtle shade differences.
- **Contrast:** WCAG AA minimum everywhere (4.5:1 body, 3:1 large text/essential icons); the Emergency Card targets AAA — it is read in the worst moments.
- **Touch:** 44pt minimum, 56pt for commit actions; interactive elements never closer than 8pt edge-to-edge.
- **One-handed:** everything committing is thumb-reachable on a 6.1" phone; top of screen holds only exits.
- **Reduced motion:** every animation has a defined reduced variant (instant state + visible result); simulations/ceremonies included.
- **VoiceOver:** every screen navigable by headings; controls labelled with outcome ("Mark checkpoint done: terrace-door lock"); status conveyed as text; decorative imagery hidden; capture surfaces fully operable (shutter, skip, finish all labelled).
- **Colour independence:** every state carries a shape or word alongside its colour (check, dot, chip text).
- **Voice + silence parity:** every voice input has a typing path; every audio cue has a visual one.

## 12. Future Rules

Every proposed feature must answer **yes** to all six, in writing, before design starts:

1. Does it reduce inspector effort?
2. Does it improve trust (owner's or inspector's)?
3. Can it work offline?
4. Can it be skipped without blocking anything?
5. Does it avoid unnecessary typing?
6. Does it create lasting property memory?

A "no" anywhere sends the feature back — either reshaped until the answers turn yes, or declined. Two standing corollaries: a feature that adds a second primary action to an existing screen is two features (split it or drop it); and any feature whose best demo is on a desk, not in a property, probably belongs to a different product.

---

*Companions: `prototype-guide.md` (the reference experience), `prototype-design-review.md` (known deviations in the current prototype: dark-surface contrast, tap-to-arm tag interaction, asset three-way decision — new screens follow this document, not those deviations), `production-roadmap.md` (implementation sequence).*
