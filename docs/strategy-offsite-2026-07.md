# LUZ Founding Strategy Off-site — Readout

**July 2026 · Two days · Full leadership team**
CEO · CPO · CTO · COO · Head of Operations · Head of Customer Success · Property Manager (20 yrs field) · Investor-Owner (15 holiday homes) · VC · Competitor Founder (invited hostile)

Ground rule honoured: nobody's previous work was protected, including the prototype everyone is proud of. This readout keeps the disagreements visible — where the room split, both positions are recorded.

---

## Part 1 — Business

**What problem are we actually solving?**
The room converged fast, and not on inspections. The Investor-Owner said it in one sentence: *"I don't buy inspections. I buy the ability to not think about my house."* The problem is **absent-owner anxiety plus unaccountable care**: something is always quietly wrong with a second home, the owner can't see it, and everyone currently touching the house — cleaner, gardener, pool guy, neighbour with a key — is unaccountable, undocumented, and un-coordinated. Inspection efficiency, our engineering obsession for months, is an *internal cost lever*, not the customer problem. The CEO's correction stands as the off-site's first headline: **we are a trust company that uses software, not a software company that does inspections.**

**Who suffers most?** Foreign owners (German, Swiss, British, Scandinavian) 1,500+ km from a house worth €500k–3M, in a jurisdiction and language not their own, burned at least once — by silent water damage, by a contractor invoice they couldn't verify, by a "caretaker" who stopped caring. Second tier: the owners' *insurers*, who pay for what nobody noticed. Third: property-care operators themselves (us included), running on WhatsApp, memory, and hero employees.

**Who pays first?** Uncomfortable and unanimous: **LUZ's own care operation is customer #1**, and for the next 18 months probably the only one that matters. Owners pay for *care contracts* — the software is why the contract is worth a premium and why margins survive. The VC's warning is recorded verbatim: *"Operator-first is a fine strategy — Toast did it. But be honest in your accounting: you are building an internal tool. It becomes a 'platform' the day a stranger pays for it, not before."*

**Where is the most value created?** Ranked by the room: (1) the **evidence-backed trust relationship** — the visit story an anxious owner reads on a Tuesday in Munich; (2) the **compounding property record** — worth most at moments of transfer: sale, insurance claim, inheritance, dispute; (3) operational leverage — more properties per inspector without quality loss. Notably *not* on the list: the 3D model, the AR layer, the app itself.

**What should never be automated?** The field PM owned this answer: the walk through the house by a person who knows it; severity judgment; the phone call after the storm ("if my house floods and a bot texts the owner first, we're finished"); the relationship. Automate the *paperwork around* care, never the care.

## Part 2 — Product

**Is the Property Passport the right entry point?** Split vote, productively. CPO: yes — it's the differentiator and the data moat's foundation. Investor-Owner + Head of CS: **no — the *visit story* is the entry point.** An owner falls in love with the first beautiful, honest, evidence-linked report about *their* house; they never see the passport being built and shouldn't. Resolution adopted: **passport = infrastructure, story = product.** We sell "you'll finally know your house is okay"; the passport is how it's true. Marketing never says "onboarding".

**Should inspections come first?** Yes — reframed. The recurring visit is the heartbeat of the business and the passport is a *by-product of visits done well*, not a prerequisite ceremony. This inverts our roadmap emotionally if not technically: the Founding Walk survives as an internal method, but the first thing a new customer experiences must be a *visit and a story within one week*, not a mapping project.

**Should onboarding be shorter?** Field PM, brutal: *"Ninety minutes is what you got because you asked a prototype. Multiply by 200 properties and it's five working weeks of unbilled time. It will be skipped the first August we're busy — unless it's billable or invisible."* Decisions: (a) sell the founding visit as a paid product ("Property Baseline", it produces the first story + Emergency Card); (b) allow a 25-minute *minimum viable passport* — entrance, utilities, meters, 10 photos — with everything else accreting across normal visits. The 90-minute version is the premium path, not the default.

**What would inspectors refuse to do?** From twenty years of watching field staff: narrate aloud in occupied houses (confirmed; discretion mode is load-bearing); fuss with ghost-overlay re-photography when late; tag *every* asset (they'll tag the pump, not the fifth socket); maintain 200 checkpoints; type anything longer than a name; care about our data model in August at 38°C with 4% battery. Design consequence: everything optional except identity, photos, and the one-tap OK.

**What feels over-engineered?** The room, protecting nothing: the AR/anchor precision tier (nobody could name the inspection it improves); 3D ambitions generally; NFC *everywhere* (tag logistics — buying, encoding, gluing, replacing — is an operations program; QR stickers do 90% at 10% of the cost; NFC earns its place only on utilities and grimy plant-room assets); per-room scan ceremony; arguably the serif-and-gold ceremony itself, though CS defended it: *"the owner-facing warmth is the product — keep it there, tone it down in the field tool."*

**What is missing completely?** The longest list of the off-site, and the most important:
1. **Scheduling & routing** — the actual daily operating pain of a care company; nothing in our product touches it.
2. **Work orders** — finding → decision → contractor dispatched → quote → owner approval → repair verified → invoice. This loop is where money changes hands and where trust is won or lost; today it's a gap between "finding recorded" and "history updated".
3. **Owner communication & approvals** — the "yes, fix it, here's my limit" moment has no home.
4. **Key & access custody** — the most sensitive physical asset we hold; barely represented.
5. **Incident intake** — storm, alarm, neighbour's call at 02:00; the Emergency Card serves it but nothing *captures* it.
6. **Billing/invoicing integration** — care is a subscription business; we have no billing model in the product.
7. **Multi-inspector reality** — teams, handovers, quality review of a junior's visit.
The CPO's closing concession: *"We built the memory and the eyes. We haven't built the hands or the calendar."*

## Part 3 — Operations at 10 / 100 / 1,000 / 10,000

**10 properties** — Walter with a phone. Everything works, including nothing. The only thing the software must do: produce stories owners forward to friends. Referral is the entire growth engine.

**100 properties** — first real test. Two-three inspectors; scheduling becomes daily pain (see gap #1); passport quality diverges by author; August surge (every owner wants pre-arrival checks the same fortnight) meets winter trough — seasonal staffing whiplash. Breaks first: consistency and the founding-visit backlog. The passport quietly pays its first dividend: a new hire can competently visit a house they've never seen.

**1,000 properties** — a different company. Hubs or franchise-like local teams; hiring and training *is* the product; tag/key logistics is a department; quality assurance of inspections needs sampling and review tooling; the data platform matters more than the app; emergency SLA across a coastline requires a contractor network with our standards. Breaks: anything requiring Walter's judgment; any process living in one person's head; single-region assumptions. Becomes impossible: bespoke handling per property — the templates and checkpoint analytics stop being nice-to-have and become the operating system.

**10,000 properties** — LUZ cannot be the operator. Either we franchise the brand + platform to local operators (we become standards + software + trust mark, taking a platform fee), or we don't play at this scale. Direct operation breaks on: key custody liability, emergency response geography, seasonal labour, and management span. The VC: *"10,000 is only reachable as a platform company. Decide by 1,000 whether you want that company — it has different founders' lives attached."* Noted, not decided.

## Part 4 — Competition (hostile guest speaking)

*"Here's how I kill you.* I don't out-engineer you — I out-simple you. WhatsApp Business, a Google Form, a €12/h retiree with a good camera, and a Canva template that looks 80% like your visit story. I undercut your care contract by 30% and I start *tomorrow* — no founding visit, no tags, no app to install. Your owner can't tell our reports apart for six months.

*What I'd copy:* the visit story format, week one — it's visible, it's paper-thin to imitate superficially, and it's your best marketing. The Emergency Card, week two. Your copywriting voice, immediately.

*What I'd attack:* the onboarding ('LUZ needs a mapping ceremony; we just start'), iOS-only field kit, your single-region single-team dependency, and your price. I'd poach your best inspector with €200/month and no tagging duties.

*What I couldn't copy:* three years of asset-level history on a specific house; your relationship density in one town; checkpoint templates refined by real failures; and — if you get there — insurers and notaries treating a LUZ dossier as a standard. Your software isn't your moat. Your *accumulated evidence* and your *local density* are. So my honest advice as your enemy: go deep in few places, never wide in many; make the history legally and financially meaningful as fast as possible; and ship the story quality so high that my Canva version embarrasses me."*

Board takeaway: our defensibility timeline has a dangerous first 18 months where everything visible is copyable and nothing accumulated is decisive yet. Density and referral speed are the bridge.

## Part 5 — AI

**Extraordinary value:** (1) **Story generation + translation** — turning an inspector's 40 fragmented captures into a warm, correct narrative in the owner's language is the single highest-leverage AI application in the company; it's also the one that scales CS. (2) Structured extraction from speech/photos — removes the admin tail. (3) **Fleet intelligence** at 1,000+ properties — brand-level failure curves, pre-emptive advisories ("your controller model fails at year 6"), insurance-grade risk data. (4) Owner Q&A over the property memory ("when was the boiler serviced?" — answered with sources). (5) Photo-pair change flagging *as a suggestion queue* for humans.

**Never:** final severity judgment; anything in the emergency path; unreviewed owner-facing messages; auto-approved quotes; anything that makes an owner ask "did a human actually look?" — the entire brand is the answer *yes*.

**Unrealistic assumptions we've been carrying:** that dialect German in echoing tiled rooms transcribes reliably (unproven — corpus first); that photo change-detection works on hand-held, differently-lit, differently-angled shots (it mostly won't; the ghost overlay exists precisely because physics); that AI reduces headcount (it raises *quality per head*; plan zero staffing savings); that per-visit frontier-model costs are negligible at scale (price it per story now); that owners want to chat with an AI about their house (they want to *not need to*).

## Part 6 — LUZ 2031

The consensus scenario — deliberately the *credible* one, not the pitch-deck one:

**Company:** the trust standard for second-home care in 3–4 Southern-European regions (Andalusian coast, Balearics, Algarve, one more), ~50–70 people, profitable on care operations, venture-optional. **Products:** the care platform (field + memory + stories + work orders) run by LUZ directly in home regions and licensed to 8–12 vetted partner operators elsewhere; the owner app; the **LUZ Dossier** — a property's certified care history, purchasable at sale/insurance events. **Customers:** ~700 properties direct, ~2,500 via partners; owners pay €200–450/month care contracts; partners pay platform + brand fees; first insurer partnership piloting premium discounts for dossier-backed homes. **Revenue:** €10–16M, ~70% care contracts, ~20% platform/licence, ~10% dossiers & services. **Team:** field ops majority; ~12 product/engineering; CS in three languages. **Technology:** the iOS field system, the memory platform, the AI story/extraction layer — and the fleet dataset nobody can buy. **Brand:** "the property's memory" — the company owners name-drop at dinner parties as the reason they sleep. **Market position:** category creator of *documented care*; not the biggest operator, the one others are measured against.

The VC's minority report, recorded: *"That's a lovely €15M company. The billion-euro version is Part 8, item 1 — and it requires choosing, around year 3, to become a data-standard company that also operates, instead of an operator with nice data. Calendar that decision."*

## Part 7 — Kill list (attached to, should abandon)

1. **AR spatial anchors / precise indoor positioning** — years of fragile work for a tier of precision no inspection needs; tags + rooms deliver the value. Kill the tier, keep the fallback that was designed anyway.
2. **The 3D digital-twin dream** — every non-goal document said no, and it still haunts roadmaps. Formal burial: LUZ renders floor sketches, never dollhouses.
3. **RoomPlan as centrepiece** — demoted to an optional floor-plan generator inside the baseline visit. The walk works without it; August works without it.
4. **NFC everywhere** — QR-first; NFC only where grime and darkness earn it (plant rooms, utilities). The tag *logistics program* was the hidden cost nobody priced.
5. **The 90-minute Founding Walk as the front door** — survives as the premium "Baseline" product; the default onboarding is 25 minutes and invisible (Part 2).
6. **Owner self-service inspections** — undermines the core promise ("a professional looked"); revisit only as guided emergency checks.
7. **Drone / exterior mapping** — a demo in search of a job.
8. **Predictive maintenance as a near-term promise** — real at fleet scale (Part 5), vapor before ~1,000 properties; stop putting it on slides dated before 2029.
9. **Voice-first as identity** — voice is a great *option*; the identity is *evidence-first*. Discretion mode taught us this; believe it.
10. **Architecting for 10,000 properties now** — multi-tenant platform generality before 100 delighted properties is how the 100 never happen.

## Part 8 — Double down (foundations of a billion-euro company)

1. **The transferable Property Dossier — "the Carfax of homes."** A certified, evidence-backed care history that changes a property's *price* and an insurer's *premium*. This is the only idea in the room with network effects and standard-setting economics: once agents ask "does it have a LUZ dossier?", every operator must produce one — on our platform. Everything we build (append-only memory, evidence discipline, asset identities) is, correctly, infrastructure for this.
2. **The visit story as an emotional product.** Anxiety → reassurance, monthly, in your language, with proof. It's the referral engine, the retention engine, and the brand — and it compounds because each story adds to the memory that makes the next one richer.
3. **Local density + platform licensing — the operating system for a cottage industry.** Home-watch is thousands of tiny, standardless operators. Whoever gives them standards, software, and a trust mark aggregates the industry without employing it. Our own operation is the proof-of-standards, not the endgame.
4. **Fleet failure intelligence.** At thousands of homes, we know which pumps die, which roofs leak, which brands lie — actuarial data that insurers, manufacturers, and warranty providers will pay for, and that makes our own care pre-emptive. Data with a real buyer, produced as exhaust from work we're paid to do anyway.
5. **The emergency/trust layer.** Emergency Card, shut-off knowledge, incident response — low tech, extreme trust density. It's why an owner *stays* after year one, why insurers care, and why the brand means something at 02:00. The cheapest moat we own.

**Common thread the room signed:** every double-down is *evidence compounding into trust*; every kill is *technology performing for its own sake*. That's the company: **LUZ is the institution that remembers houses — and is believed.**

---

*Follow-ups assigned: reprice the founding visit as a product (CEO/COO); work-order loop into the roadmap as M4-adjacent scope (CPO/CTO — supersedes nothing in `production-roadmap.md` MVP); QR-first tag costing (Ops); dossier legal groundwork — what makes a care history *certifiable* (CEO/VC); decision date for the platform-vs-operator fork: upon reaching 1,000 properties or Jan 2029, whichever first.*
