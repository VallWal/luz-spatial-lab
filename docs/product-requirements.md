# Product Requirements Document (PRD)

## Project

LUZ Spatial Lab

Version: 0.1

Status: Draft

---

# Purpose

LUZ Spatial Lab exists to discover and validate the next generation of property inspection technology.

It is an independent research platform that explores how spatial computing, lightweight digital twins and AI-assisted workflows can improve recurring property inspections.

The project must not disrupt the production LUZ Inspector application.

---

# Problem Statement

Current property inspections are efficient but largely linear.

Inspectors move through predefined inspection items and manually record findings.

While this produces reliable reports, the software has little understanding of:

- the physical structure of a property;
- relationships between rooms and assets;
- the historical evolution of findings;
- the inspector's spatial context.

As a result:

- property history is fragmented;
- navigation relies on lists rather than context;
- recurring issues are harder to visualise;
- inspections remain document-centric instead of property-centric.

---

# Vision

Transform inspections from isolated reports into a continuously evolving digital memory of each property.

Every inspection should increase the platform's understanding of the property rather than simply generating another PDF.

---

# Target Users

## Primary

Professional property inspectors.

Goals:

- inspect faster;
- miss fewer issues;
- reduce administration;
- improve evidence quality.

---

## Secondary

Property owners.

Goals:

- understand property condition;
- monitor long-term changes;
- access maintenance history;
- build trust.

---

## Non-Goals

The project is **not** intended to become:

- a BIM platform;
- a CAD system;
- a Matterport replacement;
- a photorealistic digital twin;
- a full facilities management platform.

The focus remains recurring residential property inspections.

---

# Core Product Pillars

## 1. Property Passport

One-time onboarding that captures the structure of a property.

Outputs:

- rooms;
- assets;
- checkpoints;
- baseline documentation.

---

## 2. Spatial Inspection

Recurring inspections use the Property Passport to provide context.

The inspector is guided by rooms and checkpoints instead of disconnected lists.

---

## 3. Living Property History

Every inspection contributes to a permanent history.

Nothing is overwritten.

Every observation is preserved.

---

## 4. AI Assistant

AI reduces documentation effort.

It never replaces inspector judgement.

---

# MVP Scope

The first prototype should prove only the following:

- scan a room;
- save a simplified model;
- reload the model;
- create checkpoints;
- attach findings;
- capture photo;
- capture voice;
- persist history.

Everything else is intentionally deferred.

---

# Success Metrics

The prototype is successful if it demonstrates:

- reliable room capture;
- stable checkpoint placement;
- intuitive navigation;
- faster recurring inspections;
- clear property history;
- acceptable performance on consumer hardware.

---

# Constraints

The project must:

- remain modular;
- support offline workflows;
- minimise storage requirements;
- avoid unnecessary AI costs;
- remain compatible with future LUZ Inspector integration.

---

# Guiding Principle

Every feature should answer one question:

**Does this make recurring property inspections more valuable for inspectors and owners?**

If the answer is no, the feature does not belong in LUZ Spatial Lab.
