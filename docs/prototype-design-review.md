# External Design Review — Property Passport Founding Walk Prototype

**Panel:** Apple Human Interface · IDEO · Airbnb Product Design · Linear Design · Nielsen Norman Group
**Reviewed as:** a submission from an outside company. Experience critique only; no implementation notes.
**Method:** full journey walkthrough at iPhone 13 size, from launcher through owner experience, plus reset/replay.
**Severity scale:** Critical (blocks shipping) · Major (fix before real users) · Minor (polish).

---

## 1. Dimension-by-dimension evaluation

**First impression — strong.** The launcher is the best single screen in the product: dark, confident, one gold action, a thesis statement ("Every property deserves a memory") instead of a feature list. It sets a premium expectation the rest of the flow mostly keeps. *Issue (Minor): the tagline block plus explainer sentence plus photo footer is one element too many; the screen says the same thing three times.*

**Clarity — good, with vocabulary drift.** Each screen states its purpose in plain words, and the "future visits will remember…" framing lands. But the flow uses at least five verbs for closely related acts — *discover, register, confirm, capture, add* — and a first-time user cannot tell whether "Register room" and "Confirm Living Room" are different commitments. *(Major: unify the verb system.)* The walk's eight progress pips are unlabeled; users know they are *somewhere*, not *where*. *(Minor.)*

**Trust — very good.** The three best trust moves: the inspector explicitly confirms everything AI suggests (sparkle icon = suggestion, human taps Save); "nothing is ever silently lost" is enacted, not claimed (skips become visible list items); the Emergency Card's "codes are never shown here." *Issue (Major): the sparkle icon carrying the meaning "suggested, please verify" is never introduced — trust semantics live in an unexplained glyph.*

**Inspector confidence — good.** Skips are everywhere, degradation is graceful (the bathroom failure is handled with more dignity than most real products), and the exit review makes the inspector the authority. *Issue (Major): the three-way asset decision — Register / Ignore / Not sure — undermines confidence at exactly the moment the product should project it. "Not sure" is the interface admitting its own model is unclear; two options plus an obvious way back would feel more decisive.*

**Cognitive load — mostly low, with two spikes.** Checkpoint defaults are pre-selected and sensible (accept is one tap); the fast-rooms pattern compresses well. Spikes: the room-review screen mixes four mental modes (rename, verify, remove, add) on one card *(Major)*; and the walk header stacks two different exits — chevron (back) and X (pause) — with no visual explanation of the difference *(Major: identical-looking escape hatches with different consequences is a classic error trap, even though both are currently safe).*

**Interaction cost — the weakest dimension.** Counted across the full journey: the NFC simulation requires a tap to *start* listening (real NFC just reads — the simulation's needs leaked into the UX; on a real device this must be zero-tap) *(Major)*. Six baseline photos require six aimed taps plus optional skips — no burst/bulk affordance *(Major)*. The quick-register utilities need two taps each (row → action) where one would do *(Minor)*. The "Discover this room" explainer is a full screen whose only outcome is a tap *(Major — see §4)*. The accelerated rooms insert an artificial ~1-second "One moment…" wait per action; across eight actions that is designed-in slowness *(Minor)*.

**Navigation — sound in the walk, slightly muddled after it.** The sequential walk with no free navigation is the right call for a field flow. After completion, three surfaces (dashboard, Emergency, Owner) share a bottom nav — clean — but "Owner view" inside the inspector's nav confuses roles: it is a prototype-tester affordance wearing a product costume *(Minor, but it will mislead demo audiences about who sees what).* Rows marked "soon" are honest for a prototype but read as broken product *(Minor).*

**Visual hierarchy — very good.** One gold action per walk screen is consistently held; serif display + quiet labels give clear reading order. *Issue (Minor): gold means "primary" on walk screens but navy means "primary" inside cards (asset Register, utility actions); two primary colors weakens the grammar. Issue (Minor): the dashboard is eight stacked sections of equal visual weight — a long corridor with no landmark after the header.*

**Accessibility — adequate skeleton, real gaps.** Touch targets are consistently large; reduced motion is respected; nothing relies on color alone. But low-opacity text on navy (50–60% cream) and `ink-400` metadata on cream are likely WCAG AA failures at their sizes *(Major)*; the 12–13px uppercase tracked labels are at the legibility floor in sunlight — the stated field condition *(Major)*; and the progress pips have no text equivalent *(Minor).*

**Emotional response — the product's signature strength.** The completion moment is restrained and earns its sentiment; "Casa del Mar will remember" personifies the house rather than the software; the Utility Hunt reframes drudgery as a mission. The panel's IDEO seat calls the arc "onboarding as a founding ceremony" and considers it the concept's emotional moat. *Issue (Minor): the ceremony language occasionally overreaches for a professional tool — "important tenants," "keep the water honest" — charming once, cloying on the fortieth property.*

**Speed perception — mixed.** Transitions are fast and the one-tap checkpoint gesture feels instant. But the 7-second scan cannot be finished early even when the user understands it *(Minor — in a prototype demo it will be watched forty times)*, the NFC theater adds ~2s per tag × many tags *(Major in aggregate)*, and the MiniAction delays add fake latency precisely where the design promises speed *(Minor).*

**Realism — good for flow, weak for imagery.** The scripted content (Daikin nameplate, skimmer note, Thursday gardener) is excellent testing material. The gradient "photos" are elegant but uniformly abstract; testers asked to "photograph the window wall" see a teal wash, which breaks the pretend-play the rest of the prototype sustains so carefully *(Major for its stated purpose of testing with real inspectors).* The always-canonical final numbers (63 photos regardless of behavior) will be noticed by any tester who skipped things *(Minor).*

**Consistency — good.** Cards, list rows, section labels, and status colors behave identically everywhere; the dark Utility Hunt is a deliberate, successful exception. Deviations noted above (two primary colors, verb drift, heading punctuation varying between "Let's discover this room." and unpunctuated titles) are real but small *(Minor).*

---

## 2. The five biggest UX problems

1. **The NFC/photo interaction tax.** (Major) Tap-to-arm NFC, six aimed photo taps, two-tap utility registration, artificial waits — the flow's *choreography* contradicts its *promise* of a sub-minute asset and a 90-minute walk. The prototype teaches testers a slower rhythm than the product intends.
2. **Contrast and legibility below field-tool standards.** (Major) Low-opacity captions on navy and small tracked labels will not survive Cádiz sunlight or older inspectors' eyes. A tool whose stated environment is "standing, walking, outdoors" must be readable in exactly those conditions.
3. **The three-way asset decision.** (Major) Register / Ignore / Not sure is a committee where a decision should be; it triples the choice cost of the flow's most repeated judgment and introduces a state ("unsure") whose consequence is invisible.
4. **Unexplained symbolic language.** (Major) The sparkle (AI suggestion), the pips (phases), X vs chevron (pause vs back) — three load-bearing symbols, zero introductions. Each is one lost tester away from being discovered in testing anyway; cheaper to fix now.
5. **Abstract imagery undermining the pretend-play.** (Major) The prototype asks testers to *behave* photographically while showing them non-photographs; the fiction breaks at its most repeated moment.

## 3. The five strongest UX decisions

1. **One gold action per screen, bottom-anchored.** Held with discipline across ~20 screens; the inspector's thumb always knows where "forward" lives.
2. **Failure as a first-class path.** The bathroom scan degrading to "photos instead," with no apology-modal and no dead end, is better failure design than most shipping products.
3. **The Utility Hunt as a premium set piece.** Elevating the least glamorous task into the flow's most distinctive section — dark, focused, mission-framed — is the memorable idea of the product.
4. **Progressive disclosure of effort.** Teach the full ritual once (Living Room), then compress (fast rooms) — respecting both the learning curve and the user's time. Rare and correct.
5. **The completion moment's restraint.** No confetti; one sentence about protection, one about the future. It converts 90 minutes of labor into meaning — the emotional receipt the whole concept depends on.

## 4. Three screens to redesign completely

1. **Room discovery explainer ("Let's discover this room.").** A full interstitial whose content is three list items and whose only outcome is a tap. Its information belongs *inside* the doorway-tag screen as a header. As built, it is the flow's clearest tax with no revenue.
2. **Asset suggestions ("Noticed in this room").** Three cards × three buttons = nine competing actions on one screen, plus a forced decision gate before Continue. Should become a single-decision-at-a-time pattern with one primary act (Register) and one quiet escape.
3. **Walk overview ("The walk ahead").** A numbered list restating what the next screens will show anyway, plus four decorative capability chips ("Skip an area ✓") that assert flexibility instead of demonstrating it. Either become a real, reorderable route (a map of the visit) or shrink to a two-line preface on the first room.

## 5. Cuts

**Unnecessary screens:** the room-discovery explainer (fold into tag registration); the activity-detail screen (one paragraph re-stating a list row — a sheet at most); arguably the preparation checklist as a *screen* (its reassurance could live as three quiet chips on the intro).

**Unnecessary text:** the launcher's third self-description; the intro's "what will be created" list duplicating the overview's list; "Nothing here blocks the passport — open items simply wait patiently…" (the deferral chip already says this); the dashboard repeating all three property notes verbatim in Property Memory after summarizing them above; most sentences beginning "Future visits will…" after its second use — the point is made.

**Unnecessary interactions:** tap-to-arm NFC (should be proximity-only); the mandatory decision on all three suggested assets before Continue; per-photo Skip as a separate reach-away target; two-tap quick-registration of utilities; "I'm ready" as the only exit from a checklist that is already all green.

**Tap-reduction opportunities (counted):** auto-advance on tag success everywhere (−4 taps); one-tap utility quick-register (−5); merge discover-explainer (−1); bulk "capture remaining" after three baseline photos (−3); auto-continue when the last photo lands (−1). Roughly **14 taps** — about 15% of the journey — removable without losing a single decision the inspector actually makes.

---

## 6. Verdicts

**Would Apple ship this experience?** Not as-is. The information architecture and restraint would survive Cupertino review; the contrast failures, the unexplained glyph language, the dual-exit header, and the tap-to-arm NFC would not. Apple would also insist the serif display type earn its place or leave. Verdict: *strong concept review, rejected at QA — resubmit in two sprints.*

**Would Airbnb ship this experience?** Closest fit of the panel. The warmth, the narrative framing, the host-like "visit story" are native to Airbnb's language; they would ship the *owner* experience nearly unchanged. They would halt the inspector flow on imagery (Airbnb would never ship abstract gradients where photography is the product's evidence) and on copy volume, then ship. Verdict: *yes, after a photography pass and a 30% copy cut.*

**Would this panel ship it?** As a product, no — the five Majors in §2 are real. As what it claims to be — a clickable prototype for testing whether inspectors can create a Property Passport intuitively — **yes, today.** It is unusually complete, its failure paths are honest, its emotional thesis is testable, and its flaws are exactly the kind user testing should adjudicate rather than a review panel. The panel's one warning: fix the interaction tax (§2.1) *before* testing, because testers will correctly perceive the slowness, and it will contaminate the answer to the only question that matters — whether the Founding Walk feels worth an inspector's morning.

*NN/g footnote: every severity above assumes the stated context — a field tool used standing, one-handed, in bright light, by professionals who will run this flow hundreds of times. Judged as a desk app, several Majors soften to Minors. Judged in a plant room in August, none of them do.*
