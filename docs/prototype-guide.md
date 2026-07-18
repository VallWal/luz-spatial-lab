# Property Passport Prototype — Guide

**Location:** `prototype/` in this repository
**Purpose:** a polished, clickable UX prototype of the **Founding Walk** — the guided first visit that turns Casa del Mar into a Property Passport — plus the resulting Passport dashboard and the owner experience.
**Status:** prototype only. Mock data, local state, no backend. It must never touch the production LUZ Inspector app.

---

## Install & run

Requirements: Node 20+ and npm.

```bash
cd prototype
npm install
npm run dev
```

Vite prints a local URL (typically `http://localhost:5173`). Open it:

- **On desktop** — the experience stays centred at iPhone width, so it remains honest about its mobile-first design.
- **On an iPhone** (recommended for testing) — run `npm run dev -- --host`, then open `http://<your-mac-ip>:5173` in Safari on a phone on the same Wi-Fi. Optimised for an iPhone 13-sized viewport.

Production build & preview: `npm run build` then `npm run preview`. The output in `dist/` is fully static and deployable to Vercel (or any static host) with no configuration — routing is hash-based, so no rewrite rules are needed.

## Routes

The prototype uses hash routes (`/#/...`):

| Route | Screen |
|---|---|
| `/#/` | Prototype launcher (Start Founding Walk · View Completed Passport · View Owner Experience · Reset) |
| `/#/walk` | The Founding Walk — a sequential step flow driven by saved state |
| `/#/passport` | Completed Property Passport dashboard |
| `/#/passport/room/living-room` · `/#/passport/room/pool-area` | Room / zone detail |
| `/#/passport/asset/ac-living` | Asset detail (air-conditioning unit) |
| `/#/passport/emergency` | Emergency Card |
| `/#/passport/activity/<id>` | Activity detail |
| `/#/owner` · `/#/owner/story` · `/#/owner/timeline` | Owner experience |

The walk itself is not routed per step — its position lives in saved state, so a refresh resumes exactly where the tester was.

## Mock state & reset

All prototype state (walk progress, decisions, deferred items, passport creation) is held in React state and persisted to `localStorage` under the key `luz-passport-prototype-v2`. Refreshing never loses progress.

To restart the experience: use **Reset prototype** on the launcher screen (or clear the site's localStorage in the browser). The Completed Passport and Owner views work at any time — they render the canonical demonstration dataset even if the walk was never run, so each of the three journeys can be tested independently.

## What is simulated

Nothing in the prototype touches real hardware or services. Specifically simulated:

- **NFC tag taps and QR scans** — animated choreography with a timed success; no radio, no camera.
- **Room scanning** — an animated wireframe sketch with progress and guidance messages; the bathroom deliberately "struggles" with mirrors to demonstrate graceful degradation to photos.
- **Photo capture** — the shutter produces designed placeholder imagery; no camera access is requested.
- **Voice input** — the waveform listens for a moment, then produces a pre-written transcription.
- **Nameplate reading** — the extracted brand/model/serial fields are pre-scripted suggestions the inspector confirms.
- **Sharing emergency access** — shows a confirmation only; nothing is sent.

Deliberately absent: Airtable, Supabase, n8n, RoomPlan, ARKit, AI services, authentication, and any real photography.

## What the prototype is intended to test

The single question: **can an inspector intuitively create an operational Property Passport during a first property visit?** Broken into the assumptions each part of the flow probes:

1. **Orientation** — does a first-time user start and proceed without instruction? (launcher → intro → preparation)
2. **Identity-first capture** — does doorway/asset tagging feel natural and worth the seconds it costs, and is its purpose understood? (entrance, room discovery, asset tagging)
3. **Graceful degradation** — when the scan fails (bathroom mirrors), does the tester continue confidently rather than feeling blocked?
4. **Effort profile** — does the detailed room flow feel like ~5 minutes of real work, and asset registration like under a minute?
5. **Checkpoint mental model** — is "what future visits should remember to check" understood without explanation, and do testers curate rather than accept everything blindly?
6. **The Utility Hunt's value** — do testers feel why shut-off locations deserve a premium, dedicated section?
7. **Operational, not finished** — at the final review, do testers understand the passport is usable now and improves later (deferred items are fine)?
8. **The payoff** — after completion, do testers connect today's effort to faster, context-rich future visits (dashboard) and to owner trust (owner view)?

## Known prototype limitations

- One property, one scripted dataset; the dashboard always shows the canonical completed passport regardless of choices made during the walk.
- Only the Living Room, Pool Area, air-conditioning unit and Emergency Card entries open detail views; other rows are marked "soon".
- The accelerated rooms (Kitchen, Main Bedroom, Bathroom, Utility Room) compress the full flow into one-tap moments by design.
- "Photos" are designed placeholders, not photography; floor plans are illustrative sketches.
- No orientation/tablet layouts; portrait phone and centred desktop only.
