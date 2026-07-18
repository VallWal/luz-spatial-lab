# Architecture

## Overview

LUZ Spatial Lab is designed as a modular research platform for evaluating spatial inspection technologies.

It is intentionally independent from the production LUZ Inspector application.

The goal is to validate new technologies and workflows before integrating proven components into the production platform.

---

# High-Level Architecture

```
                  Property Passport
                         │
                         ▼
               Spatial Property Model
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
     Rooms          Exterior Zones     Assets
        │                │                │
        └────────────────┼────────────────┘
                         │
                  Inspection Checkpoints
                         │
                         ▼
               Recurring Inspection
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
      Voice            Photos         Inspector Input
        │                │                │
        └────────────────┼────────────────┘
                         ▼
                 Structured Findings
                         │
                         ▼
                Property History

```

---

# Core Components

## Property Passport

Created once.

Contains:

- property metadata
- simplified geometry
- rooms
- floors
- technical assets
- checkpoints
- baseline photographs
- documentation

This becomes the permanent reference for all future inspections.

---

## Spatial Model

The spatial model is intentionally lightweight.

It should contain:

- room boundaries
- room names
- floors
- doors
- windows
- important fixed objects
- checkpoint locations

It is **not** intended to be a photorealistic digital twin.

---

## Checkpoints

Checkpoints are the core operational element.

Examples:

Kitchen

- Sink
- Dishwasher
- Refrigerator
- Window
- Ceiling
- Electrical sockets

Pool Room

- Pump
- Filter
- Electrical cabinet
- Valves

Every checkpoint is linked to an inspection item.

---

## Inspection Session

A recurring inspection loads:

- Property Passport
- previous findings
- checkpoints
- inspection template

During inspection the user confirms checkpoint status and creates findings.

---

## Findings

A finding contains:

- room
- checkpoint
- description
- severity
- evidence
- timestamp
- inspector
- status

Findings never overwrite previous history.

Every update creates a new observation.

---

## Property History

Everything contributes to a continuous property history.

Examples:

- inspections
- findings
- repairs
- contractor visits
- maintenance
- events

The history becomes searchable and visual.

---

# AI Responsibilities

AI should only assist.

Responsibilities include:

- speech transcription
- structured extraction
- duplicate detection
- report drafting
- comparison with previous inspections

AI must never autonomously approve inspections.

---

# Mobile Application

The mobile application should remain simple.

Primary interactions:

- select property
- view checkpoints
- capture finding
- take photos
- record voice
- review inspection

Typing should be minimal.

---

# Data Flow

```
Inspector

      │

Voice + Photo

      │

Structured Finding

      │

Inspection Results

      │

Property History

```

The inspector always remains the final authority.

---

# Technology Stack (Initial)

Mobile

- React Native
- Expo
- Swift native modules

Spatial

- Apple RoomPlan
- ARKit
- RealityKit

Storage

- Supabase
- Object Storage

AI

- Whisper
- LLM extraction

Future integrations

- LUZ Inspector
- Airtable
- n8n
- Owner Portal

---

# Architecture Principles

The architecture should always remain:

- modular
- offline capable
- human-centred
- extensible
- maintainable
- platform independent where possible

Native Apple functionality should remain isolated behind reusable interfaces.

The production LUZ Inspector should be able to adopt individual components without requiring a complete rewrite.

---

# Success Criteria

The architecture is successful if:

- components can evolve independently;
- experimental features do not affect production;
- the spatial model remains lightweight;
- recurring inspections become faster;
- inspectors require fewer manual interactions;
- owners gain a clearer understanding of their property's history.
