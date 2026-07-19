# Prototype 2 — Test Script

**Prototype:** `prototype/` · run per `prototype-guide.md` (`npm install && npm run dev`), ideally on an iPhone.
**Scenario baseline:** Casa del Mar starts at *Attention needed* with an open moisture finding (June) and an owner request. Reset from the launcher between testers — reset restores this exact starting point.
**Facilitator rule:** observe silently. Every explanation you give is a design defect, not a tester failure.

---

## Scenario 1 — Inspector test

*Tester: a LUZ inspector or an external field inspector. Device: phone.*

**Setup line (read aloud, then stop):**
> "You look after Casa del Mar. Your visit is scheduled for today. The phone has your work tool open on the launcher — choose *Start Today's Inspection* and take it from there."

**Tasks (give one at a time, phrased as goals):**
1. Understand what today's visit involves before entering the house.
2. Begin the inspection and record what the meters say.
3. Deal with the Kitchen — including whatever mattered there last time.
4. Handle the owner's request.
5. The terrace-door handle feels loose — deal with it.
6. Finish the round and leave the property properly.
7. Make today part of the property's record.

**Success criteria:**
- [ ] Finds and reads the briefing unaided; can say what the three priorities are.
- [ ] Completes both meter readings.
- [ ] Opens the kitchen finding, captures a comparable photo, marks it Improved, and can state that it *remains open*.
- [ ] Records the new finding with photo and voice.
- [ ] Resolves both exit-gate items (one skip with reason).
- [ ] Edits or knowingly accepts both drafts, then approves — and can explain what approval means.

**Time targets:** briefing understood < 90 s · re-observation < 2 min · new finding < 90 s · full visit < 15 min in prototype time.

**Observe:** first tap after each task; whether "Mark remaining healthy" is discovered; whether the Issue affordance is found without help; hesitation at the approval confirmation (healthy hesitation is good — panic is not); any attempt to skip the exit gate.

**Post-test questions:** What did the app already know that a paper checklist wouldn't? What would you refuse to do on a hot August day? What did approval feel like — signature or bureaucracy? What was missing?

## Scenario 2 — Owner test

*Tester: a second-home owner (or proxy). Device: phone, launcher → View Owner Portal. Run AFTER an inspection has been approved (or use the guided demo state).*

**Setup line:**
> "This is your holiday home's app. You're 1,800 km away and you have two minutes. Find out how your house is doing."

**Tasks:**
1. Is the house okay? (Say your answer aloud when you have it.)
2. What changed today?
3. What needs attention, and how worried should you be?
4. Find the photos that prove the sink issue is improving.
5. What happens next — and does anything need you?

**Success criteria:**
- [ ] Answers "is it okay?" correctly within 10 seconds.
- [ ] Names both items (sink improving, handle loose) and correctly ranks neither as urgent.
- [ ] Finds the then/now comparison photos unaided.
- [ ] States what happens next without reading it aloud from the screen (comprehension, not recitation).
- [ ] Never encounters checkpoint administration or inspector jargon.

**Time targets:** first-glance answer < 10 s · full story read < 3 min · evidence found < 45 s.

**Observe:** where the eyes go first; whether "Stable" and "not urgent" actually reassure (watch the face, not the screen); whether they tap "Ask about an item" or "Coordinate repairs" unprompted — that's purchase intent showing itself.

**Post-test questions:** How does this compare with what you get today? Would you forward this visit story to anyone? What would you pay monthly for the feeling you just had? What's missing before you'd trust it?

## Scenario 3 — Product demo test

*Tester: a partner, investor, or new team member who has never seen LUZ. Device: phone or desktop, launcher → Play Guided Demo.*

**Setup line:**
> "Walk through this at your own pace. Afterwards, you'll explain to me what this company does."

**Tasks:**
1. Complete the guided story start to finish (5 minutes).
2. Explain in your own words what LUZ does.
3. Explain what the Property Passport is and why it matters.
4. Explain how an inspection turns into what the owner sees.

**Success criteria:**
- [ ] Completes the demo without navigation help.
- [ ] Their explanation contains the loop (visits build a record → the record informs visits) in any wording.
- [ ] Identifies the passport as the property's memory, not "an app for inspections".
- [ ] Connects the then/now photos to owner trust unprompted.
- [ ] Can name one thing that makes the *next* visit better because of this one.

**Time targets:** demo completed 4–7 min; explanation attempted immediately (hesitation = the story didn't land).

**Observe:** which step makes them lean in (candidates: then/now compare, the owner story, the append-only line); which caption they re-read; whether they use back navigation (a back-step means a caption failed); the first adjective they use afterwards.

**Post-test questions:** Which single screen would you show a friend who owns a house in Spain? What seemed like magic (bad — we must explain it) versus obviously sensible (good)? What would you expect this to cost?

---

## Logging

Per tester: pass/fail per criterion, timings, verbatim quotes, and every facilitator explanation (verbatim, with screen). Reset the prototype between testers. Compare all sessions the same day and write the findings note into `docs/` — these results decide what carries from Prototype 2 into the v1.0 production scope (`product-review-board.md`).
