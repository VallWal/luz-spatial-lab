# System Overview

## The LUZ Ecosystem

The LUZ platform consists of multiple independent applications that work together.

Each application has a clear responsibility.

No application should try to solve every problem.

---

# Current Platform

```text
                    LUZ Platform
                         │
 ┌───────────────────────┼────────────────────────┐
 │                       │                        │
 ▼                       ▼                        ▼
LUZ Inspector      LUZ Owner Portal      LUZ Admin (future)
       │
       ▼
 Airtable + n8n

```

The production system already exists and continues to evolve independently.

---

# Spatial Lab

LUZ Spatial Lab is **not** part of the production platform.

It is an innovation laboratory.

Its responsibility is to answer questions such as:

- Can spatial models improve inspections?
- Can RoomPlan simplify onboarding?
- Can checkpoints replace long checklists?
- Can AI reduce inspector workload?
- Can property history become visual?

Only validated ideas move into production.

---

# Relationship with LUZ Inspector

LUZ Inspector remains the operational application.

Responsibilities:

- inspections
- findings
- reports
- customers
- Airtable
- n8n

LUZ Spatial Lab must never directly modify production behaviour.

Instead, it develops reusable components that can later be adopted.

---

# Shared Concepts

Both systems share the same business language.

Examples:

Property

Room

Inspection

Inspection Item

Checkpoint

Finding

Observation

Health Category

Evidence

Report

Using the same terminology allows future integration without data migration.

---

# Integration Strategy

The Spatial Lab should communicate through well-defined interfaces.

It should never depend directly on Airtable tables or n8n workflows.

Instead, future integrations should exchange structured data through APIs or service layers.

This keeps both systems independent.

---

# Long-Term Architecture

```text
                   LUZ Platform

          ┌─────────────────────────────┐
          │      Shared Services         │
          └─────────────┬───────────────┘
                        │
     ┌──────────────────┼──────────────────┐
     │                  │                  │
     ▼                  ▼                  ▼
Inspector         Owner Portal        Admin Portal
     │
     │
     ▼
Spatial Engine (future reusable module)

```

The Spatial Engine is not an application.

It is a reusable capability.

Any future application can consume it.

---

# Design Philosophy

The platform should evolve through small, validated improvements.

Large rewrites are avoided.

Production remains stable.

Innovation remains fast.

Both goals can coexist by keeping clear architectural boundaries.
