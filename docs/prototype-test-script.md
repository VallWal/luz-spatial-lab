# Property Passport Prototype — Test Script

**For:** Walter (facilitator/tester), Maria, and one external inspector
**Prototype:** `prototype/` — run per `docs/prototype-guide.md`, ideally on an iPhone
**Session length:** ~30 minutes per tester
**Facilitator rule:** you are a silent observer. The prototype must explain itself — every explanation you give is a defect logged against the design, not against the tester.

---

## Scenario (read aloud to the tester, then stop talking)

> "You look after holiday properties for absent owners. Today you're visiting **Casa del Mar**, a four-bedroom villa with pool and garden in Bolonia, that LUZ has just taken under management. Your company has a new tool: on this first visit, you create the property's **Passport** — so every future visit builds on today instead of starting from zero. The phone in your hand has the tool open. Begin whenever you're ready."

Do **not** explain: what tagging is for, what a checkpoint is, what the Utility Hunt is, how to skip anything, or where the Emergency Card lives. Whether testers work these out unaided is precisely what is being measured.

## Tasks

Give tasks one at a time, only after the previous is finished. Phrase them as goals, never as UI instructions ("register the entrance", not "tap the gold button").

1. **Begin the Founding Walk** for Casa del Mar and get through the preparation step.
2. **Register the property entrance.**
3. **Discover the Living Room completely** — identity, scan, baseline photos, the air-conditioning unit, and the checkpoints you think this room deserves. (The tester decides what to accept, reject or skip.)
4. **Handle the remaining rooms** however the tool suggests — including the bathroom, where something will not go to plan. *(Watch: does the scan failure fluster them or do they continue without pausing?)*
5. **Complete the Utility Hunt**, including the main water shut-off in full.
6. **Capture the outdoor areas** (pool, garden, gate).
7. **Review and create the Property Passport.** *(Watch: do they understand the "items to complete later" are not blockers? Ask nothing yet.)*
8. In the finished passport: **"A pipe has burst and you're not at the property — show me what you'd send to the neighbour."** *(Success = they find the Emergency Card and Share emergency access unaided.)*
9. **Switch to what the owner would see** and describe, in one sentence, what the owner learns today.

## Observations to capture (per task)

- **First tap** after the task is given — was it the intended one?
- **Hesitations** longer than ~5 seconds: where, and what were they looking at?
- **Wrong turns**: any tap that took them somewhere they didn't want to be, and whether they recovered without help.
- **Skips**: what they chose to skip or reject (skipping is a designed behaviour, not a failure — but note *why* if they verbalise it).
- **Verbatim quotes** — especially the first words after the scan failure, after "room complete", and at the completion moment.
- **Explanations required** — every single one, verbatim, with the screen it happened on.

## Time measurements

Record with a stopwatch, per tester:

| Measurement | Target | Notes |
|---|---|---|
| Launcher → walk actually started | < 60 s | orientation cost |
| Living Room, complete (task 3) | 3–6 min | the core effort-profile question |
| Air-conditioning registration within task 3 | 30–45 s feel | ask afterwards: "how long did that feel?" |
| Bathroom scan failure → tester continues | < 20 s | graceful-degradation cost |
| Utility Hunt, complete | 3–5 min | |
| Full walk, start to completion moment | 12–20 min | prototype-compressed; note where time pools |
| Task 8: find Emergency Card + share | < 45 s | trust-critical path |

## Post-test questions (ask in this order, after all tasks)

1. "Walk me through what you just created for this property — in your own words." *(Tests the passport mental model.)*
2. "Why did the tool ask you to put tags on doorways and machines?" *(Identity comprehension.)*
3. "The passport said 'Operational' but listed three unfinished items. Is that acceptable to hand over? Why?" *(Operational-not-finished model.)*
4. "Next month you visit again. What's different from a visit without the passport?" *(The recurring payoff — the core value hypothesis.)*
5. "What was the most annoying moment?" and "What would you skip on a real visit under time pressure?" *(The honest answers that predict field behaviour.)*
6. "On a real first visit, how much extra time would you accept for this? Would you do the tagging?" *(Willingness-to-pay in minutes.)*
7. For Maria / the external inspector only: "Would you trust another inspector's passport, made this way, on a property you've never seen?" *(Institutional-knowledge transfer.)*

## Success criteria

The prototype session passes if, per tester:

- [ ] Tester starts without instruction.
- [ ] Tester always knows the next action (no dead-stop longer than ~10 s anywhere in the flow).
- [ ] Tester can articulate why room and asset tagging matter (question 2 answered without prompting concepts).
- [ ] Tester completes the detailed Living Room flow unaided.
- [ ] Tester locates the Emergency Card within 45 seconds in task 8.
- [ ] Tester understands the passport is operational **and** still evolving (question 3).
- [ ] Tester describes a concrete recurring-inspection benefit (question 4).
- [ ] No major task required facilitator explanation.

Log results per tester as pass/fail per criterion plus the observation notes. Two of three testers failing any single criterion means that part of the design is reworked before the concept moves further — that is the point of testing it now, while it is only a prototype.

## After the sessions

Reset the prototype between testers (launcher → **Reset prototype**). Keep each tester's notes separate; do not let later testers watch earlier ones. Compare the three sessions in one sitting while they are fresh, and write the outcomes straight into a short findings note in `docs/` — the decision this prototype feeds is whether the Founding Walk design carries into the next validation phase (real capture technology, real property).
