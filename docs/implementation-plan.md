# Implementation Plan

## Goal

Build LUZ Spatial Lab as an independent prototype that validates the concept of spatial property inspections.

The project is not intended to become a production application.

Its purpose is to prove ideas that can later be integrated into LUZ Inspector.

---

# Development Principles

- Build the smallest possible proof of concept.
- Validate one assumption at a time.
- Keep every module replaceable.
- Never optimise before validation.
- Avoid unnecessary dependencies.
- Keep business logic independent of Apple frameworks.

---

# Phase 1 — Foundation

Objective:

Create the minimum application skeleton.

Tasks:

- Create Expo project
- Configure TypeScript
- Configure ESLint
- Configure Prettier
- Configure Supabase
- Configure authentication placeholder
- Create navigation
- Create design system
- Create logging

Deliverable:

Running application with project structure.

---

# Phase 2 — RoomPlan Prototype

Objective:

Validate RoomPlan.

Tasks:

- Native Swift bridge
- RoomPlan integration
- Scan room
- Save room
- Reload room
- Display floor plan

Deliverable:

Persistent room model.

Decision Gate:

Is RoomPlan good enough?

---

# Phase 3 — Property Model

Objective:

Move from rooms to properties.

Tasks:

- Multiple rooms
- Property structure
- Floors
- Assets
- Model versioning

Deliverable:

Property Passport v1.

Decision Gate:

Can the model support recurring inspections?

---

# Phase 4 — Checkpoints

Objective:

Create reusable inspection locations.

Tasks:

- Place checkpoint
- Edit checkpoint
- Remove checkpoint
- Assign inspection item
- Save checkpoint

Deliverable:

Reusable inspection map.

Decision Gate:

Are checkpoints more intuitive than today's checklist?

---

# Phase 5 — Inspection Prototype

Objective:

Run an inspection.

Tasks:

- Load Property Passport
- Select room
- Complete checkpoints
- Create finding
- Add photo
- Add voice
- Save inspection

Deliverable:

First spatial inspection.

Decision Gate:

Does spatial context improve the workflow?

---

# Phase 6 — AI Assistant

Objective:

Reduce documentation effort.

Tasks:

- Speech transcription
- Finding extraction
- Duplicate suggestions
- Report summary

Deliverable:

AI-assisted inspection.

Decision Gate:

Does AI save meaningful time?

---

# Phase 7 — Property History

Objective:

Visualise change over time.

Tasks:

- Timeline
- Historical findings
- Photo history
- Observation history
- Room history

Deliverable:

Living Property History.

Decision Gate:

Is this valuable enough to become a core product feature?

---

# Phase 8 — Integration Strategy

Objective:

Prepare for future production adoption.

Tasks:

- Define APIs
- Define shared models
- Export inspection payload
- Compatibility with LUZ Inspector

Deliverable:

Integration specification.

---

# Out of Scope

The following are intentionally excluded until the core concept is proven:

- Android support
- Matterport
- Drone integration
- Automatic defect detection
- BIM compatibility
- Live video analysis
- Predictive maintenance
- Multi-user collaboration

---

# Success Definition

The project succeeds if it proves that spatial context makes recurring inspections faster, easier and more valuable than the current workflow.

Only then should individual components be migrated into the production LUZ Inspector application.
