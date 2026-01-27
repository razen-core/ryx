# Roadmap

This document defines the **end-to-end roadmap** for building the Ryx programming language from zero to production-ready.

The roadmap is structured in **phases**, each with clear goals, deliverables, and exit criteria. Progression is linear by default; skipping phases is strongly discouraged.

---

## Phase 0 – Foundation & Clarity

### Goal

Establish absolute clarity of intent before any compiler code is written.

### Deliverables

* `principles.md` (authoritative)
* `vision.md`
* `design_goals.md`
* `non_goals.md`
* Initial language positioning (systems, embedded, backend, etc.)

### Exit Criteria

* Every core decision can be justified using the principles
* No ambiguity about what Ryx is **not** trying to be

---

## Phase 1 – Language Specification (Paper Design)

### Goal

Define Ryx completely **on paper**.

### Deliverables

* `language_overview.md`
* `syntax.md`
* `lexical_structure.md`
* `tokens.md`
* `grammar.ebnf`
* `type_system.md`
* `memory_model.md`
* `error_handling.md`
* `concurrency_model.md`

### Exit Criteria

* A programmer can write valid Ryx code without a compiler
* Syntax and semantics are unambiguous
* No feature contradicts core principles

---

## Phase 2 – Minimal Compiler Skeleton (Rust)

### Goal

Create a working compiler pipeline without full language support.

### Deliverables

* Rust workspace structure
* CLI (`ryx build`, `ryx check`)
* Lexer (token stream)
* Parser (AST generation)
* Error reporting framework
* Basic test harness

### Exit Criteria

* Ryx source parses into a stable AST
* Errors are precise and actionable
* Compiler runs deterministically

---

## Phase 3 – Semantic Analysis

### Goal

Make Ryx **correct**, not yet powerful.

### Deliverables

* Name resolution
* Scope rules
* Type checking
* Ownership and borrowing analysis
* Mutability enforcement
* Lifetime inference (minimal)

### Exit Criteria

* Invalid programs are rejected reliably
* No undefined behavior reaches later stages

---

## Phase 4 – Core Language Features

### Goal

Implement the essential systems-language feature set.

### Deliverables

* Functions and control flow
* Structs and enums
* Pattern matching
* Generics (monomorphized)
* Traits / interfaces (if included)
* Modules and visibility rules

### Exit Criteria

* Real programs can be written
* Feature interactions are stable

---

## Phase 5 – Source-to-Source Compilation (Ryx → C)

### Goal

Lower Ryx into **portable, analyzable C**.

### Deliverables

* C code generator
* Stable C ABI mapping
* Deterministic name mangling
* Layout guarantees
* Minimal runtime support (if required)

### Exit Criteria

* Generated C compiles with standard compilers
* No semantic loss during lowering

---

## Phase 6 – Optimization Pipeline

### Goal

Achieve predictable, high performance.

### Deliverables

* AST / IR optimizations
* Dead code elimination
* Inlining
* Escape analysis
* Optional backend-specific tuning

### Exit Criteria

* Performance matches or exceeds equivalent C
* Optimizations preserve semantics

---

## Phase 7 – Tooling & Developer Experience

### Goal

Make Ryx usable day-to-day.

### Deliverables

* Formatter (`ryx fmt`)
* Linter (`ryx lint`)
* Language Server Protocol (LSP)
* Documentation generator
* Debug symbol support

### Exit Criteria

* IDE usage is practical
* Diagnostics are best-in-class

---

## Phase 8 – Interoperability & Ecosystem

### Goal

Integrate Ryx into real-world systems.

### Deliverables

* C FFI
* Build system integration
* Package manager (optional)
* Standard library (minimal, audited)

### Exit Criteria

* Ryx can replace C in selected domains

---

## Phase 9 – Stabilization

### Goal

Prepare Ryx for long-term use.

### Deliverables

* Versioning policy
* Stability guarantees
* Migration strategy
* Extensive test suite

### Exit Criteria

* Language core is frozen
* Breaking changes are rare and controlled

---

## Phase 10 – Production & Evolution

### Goal

Sustain Ryx without fragmentation.

### Deliverables

* Governance model
* RFC process
* Release cadence
* Long-term support strategy

### Exit Criteria

* Ryx evolves without losing coherence

---

## Guiding Rule

> **If a phase is not complete, do not advance.**

This roadmap exists to prevent premature optimization, architectural drift, and complexity leakage.
