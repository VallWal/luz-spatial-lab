# LUZ Spatial Lab

## Purpose

LUZ Spatial Lab is the research and development project for the next generation of the LUZ property inspection platform.

Its purpose is to explore how spatial computing, lightweight digital twins and AI-assisted inspections can make recurring property inspections faster, more consistent and more valuable for both inspectors and property owners.

This project is **not** the production inspection application.

The current **LUZ Inspector** app remains the operational product used for customer inspections. LUZ Spatial Lab is a separate environment where new concepts can be prototyped, tested and validated before selected components are integrated into the production platform.

---

# Vision

Every property should have a living digital memory.

Instead of creating isolated inspection reports, every inspection contributes to a continuously evolving understanding of the property's condition over time.

The system should know:

- how the property is structured;
- where important assets are located;
- what has been inspected previously;
- which findings are still open;
- how findings evolve over months and years;
- what maintenance has been performed.

The spatial model becomes the navigation layer for this history—not the product itself.

---

# Design Principles

The project follows several core principles:

## Voice first

Inspectors should spend their time observing the property, not interacting with the phone.

Voice is the primary input method.

---

## Human in control

AI assists the inspector but never replaces professional judgement.

The inspector always confirms findings and inspection results.

---

## Practical over perfect

The goal is not to create photorealistic digital twins.

Instead, create lightweight spatial models that improve inspection workflows.

---

## Reusable architecture

Every component should be designed so it can later be integrated into the existing LUZ Inspector application.

Nothing in this repository should require replacing the current production system.

---

## Modular experimentation

This repository is allowed to experiment.

Technologies may change.

Ideas may fail.

Only validated concepts will eventually move into production.

---

# Initial Research Areas

Current focus areas include:

- Apple RoomPlan
- ARKit
- LiDAR
- Spatial checkpoints
- QR and NFC asset identification
- Voice-driven inspections
- AI-assisted finding extraction
- Simplified indoor digital twins
- Property history visualisation

---

# Long-Term Goal

The long-term goal is to create a reusable Spatial Engine that can power future versions of the LUZ platform while keeping the existing production inspection workflow stable and reliable.

This project exists to discover the best path toward that future through careful experimentation rather than large-scale rewrites.
