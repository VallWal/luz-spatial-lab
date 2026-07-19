# Prototype 2 — Completion Report

**Date:** 18 July 2026 · **Status:** presentation-ready · **Location:** `prototype/` · **Screens:** `docs/screenshots-p2/`

---

## What Prototype 2 demonstrates

The complete LUZ loop — **Create → Inspect → Report → Care** — as one connected product. The single most important behaviour: **approving the visit changes everything downstream.** Before approval, Casa del Mar is *Attention needed* with one open finding; after approval the passport reads *Stable* with an explained health status, the moisture finding's timeline carries both June's and today's evidence side by side (append-only, nothing overwritten), the new terrace-handle finding exists everywhere it should, the activity timeline gains the visit's events, the owner portal flips from "visit today" to "Everything is under control" with the full visit story, and the launcher's state chips update. Reset restores the exact pre-visit scenario.

## Implemented journey

**Inspector:** home dashboard → colleague-style briefing → arrival card → meter capture with detected readings, previous values, consumption deltas and correction → kitchen identified by doorway tag (QR/manual fallbacks) → kitchen card leading with the open finding → Then/Now re-observation with alignment overlay, judgment (Improved), optional voice note, append to timeline → one-tap checkpoints with Issue action, undo, and "Mark remaining healthy" after the first individual completion → Living Room owner-request confirmation → new finding with photo, hold-to-talk, draft transcription → eight accelerated areas with one meaningful interaction each → free observation (note, not finding) → exit gate where nothing disappears silently (complete or skip-with-reason) → visit review with editable drafts, playable voice notes, full statistics including batch completions and skip reasons → deliberate approval confirmation → completion with sync message.

**Passport:** status-led dashboard with the restrained four-state health model and its explanation ("open the evidence behind this"), open findings, all rooms/assets tappable, utilities + Emergency Card, filtered activity timeline, six documents with detail views, items to complete.

**Owner:** ten-second answer, key facts, today's-visit card, calm visit story with overall result / checked / attention / photos / meters / what-happens-next, translated finding details ("This needs attention, but it is not urgent."), simulated ask/coordinate/download actions.

**Plus:** 13-step interactive guided demo with value captions; polished launcher with five entries, state indicators, reset, and simulation labelling; desktop Operations Preview (one dashboard, clearly labelled); presentation route with phone-framed screens for partners.

## Verification against the 20 completion criteria

All twenty verified by an automated end-to-end journey at iPhone 13 size plus desktop passes: full inspection completes; re-observation and new finding work; review/approval updates passport and owner; finding history confirmed append-only (June entry present before and after; reset removes only today's); guided demo runs start to finish; state survives reload; reset restores the initial scenario (checked against the finding timeline); all primary routes render their content; no dead controls encountered on the scripted paths; mobile layouts verified by screenshot review; desktop Passport/Operations/Presentation laid out for width; TypeScript clean; zero console errors or warnings across both full tours; no developer placeholders; Prototype 1 (Founding Walk) still passes its own full tour unchanged.

*Build caveat (unchanged from Prototype 1):* this sandbox cannot reach npm, so `npm run build` itself ran via the equivalent verified harness (typecheck + real-browser bundle + scripted journeys). Run `npm install && npm run build` once on a normal machine as the final confirmation.

## Simulated interactions

NFC/QR/manual room identification · meter "OCR" (detected readings are scripted, correctable) · all photography (designed placeholders; the damp-blue/dry-warm then-now pair is deliberate) · voice capture and transcription · haptics (visual pop + brief undo stand in) · sync message · owner actions (ask, coordinate, download) · document previews · Operations data beyond Casa del Mar.

## Remaining limitations

One property and one scripted visit narrative (judging the re-observation as anything but Improved is guided back — the demo story is fixed); review statistics use the scenario's canonical numbers (32/29/3) rather than live counts; the guided demo shows curated scenes, not the live app; Operations and Presentation are desktop-oriented single views by design; localStorage persistence per browser.

## Future production work

Per `production-roadmap.md`, re-scoped by the review board's v1.0 recommendation: real capture (camera, QR; NFC where earned), real meter OCR spike, voice corpus collection before AI extraction, the work-order loop after the finding, story delivery as email/PDF, and the append-only memory as real schema. The prototype's connected-state behaviour is the specification for that work.

## Recommended next milestone

Run `prototype-2-test-script.md` with one inspector, one owner-proxy, and one cold audience member. The loop is now demonstrable end to end — the next evidence must come from people who didn't build it.
