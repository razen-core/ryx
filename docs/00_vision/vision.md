# Razen Programming Language

## Vision & Core Philosophy

---

## 1. What Razen Is

**Razen is a deterministic, systems-level programming language designed for performance-critical, safety-critical, and large-scale software—without imposing cognitive or syntactic burden on developers.**

Razen is built on the belief that:

> **The compiler should perform complex reasoning so developers can write simple, direct code.**

Razen achieves this by combining:

* Deterministic memory behavior
* Compiler-enforced safety
* Minimal, expressive syntax
* Zero-cost abstractions
* Source-to-source compilation (Razen → C → Machine)

---

## 2. Primary Goals

Razen is designed to satisfy **all** of the following simultaneously:

1. **Native-level performance**
   Performance comparable to C, C++, and Rust.

2. **Deterministic behavior**
   Memory allocation and deallocation occur at known, predictable points.

3. **Memory safety by default**
   No use-after-free, double-free, data races, or undefined behavior in safe code.

4. **Low cognitive load**
   No visible lifetimes, no borrow annotations, no memory keywords in common code.

5. **Minimal syntax, maximal meaning**
   Every keyword exists for a reason. No ceremonial constructs.

6. **Scalability from scripts to systems**
   The same language is suitable for tooling, servers, compilers, games, and OS components.

---

## 3. Non-Goals (Explicitly Rejected)

Razen intentionally does **not** aim to be:

* A garbage-collected language
* A dynamically typed language
* A scripting-first language
* A macro-heavy or metaprogramming-centric language
* A language with implicit runtime costs
* A language that exposes compiler internals to users

If a feature compromises determinism, predictability, or safety, it is rejected.

---

## 4. Determinism as a First-Class Principle

Razen treats **determinism** as non-negotiable.

This means:

* No global garbage collector
* No background runtime threads
* No unpredictable pauses
* No hidden allocations beyond compiler-defined rules

If a Razen program compiles, its memory behavior is:

* **Predictable**
* **Reproducible**
* **Architecturally analyzable**

---

## 5. The DASO Memory Model (High-Level Vision)

Razen’s memory model is **Deterministic Automatic Scoped Ownership (DASO)**.

At a conceptual level:

* Every `act` introduces a lexical memory region
* Allocations go into that region by default
* The entire region is freed at scope exit in **O(1)**
* Values that escape are **automatically promoted**
* Ownership is enforced by the compiler, not the developer

The developer’s mental model is intentionally simple:

> “If it doesn’t escape, I don’t think about memory.”
> “If it escapes, Razen handles it.”
> “If I share, I say `shared`.”
> “If I need raw power, I use `unsafe`.”

---

## 6. Safety Contract

For all **safe Razen code**, the language guarantees:

* No use-after-free
* No double-free
* No dangling references
* No memory leaks
* No data races
* No undefined memory behavior
* Deterministic memory release

These are **language guarantees**, not best-effort behaviors.

Unsafe code exists as an **explicit escape hatch**, isolated and opt-in.

---

## 7. Compiler-Centric Design Philosophy

Razen follows a strict separation of responsibility:

| Responsibility        | Owner                |
| --------------------- | -------------------- |
| Safety                | Compiler             |
| Lifetime reasoning    | Compiler             |
| Ownership enforcement | Compiler             |
| Allocation strategy   | Compiler             |
| Promotion decisions   | Compiler             |
| Performance           | Compiler + C backend |
| Simplicity            | Language design      |

The developer is **never required** to:

* Annotate lifetimes
* Manually manage memory in safe code
* Reason about borrow graphs
* Tune allocation tiers

All such complexity is intentionally hidden.

---

## 8. Syntax Philosophy

Razen syntax is designed to be:

* Flat
* Readable
* Explicit
* Consistent

Key principles:

* Everything is private by default
* Dot (`.`) is the universal access operator
* Keywords are minimal and semantically strong
* No mandatory parentheses in control flow
* Trailing commas are valid and encouraged
* Expression-oriented where it improves clarity

Razen prefers **clarity over cleverness**.

---

## 9. Explicit Power, Never Implicit Cost

Razen allows:

* Concurrency
* Shared memory
* Unsafe operations
* Low-level control
* Manual allocation

But **never implicitly**.

Every operation that introduces risk or cost must be:

* Explicit
* Visible in syntax
* Deliberately chosen

This ensures:

* Predictable performance
* Auditable code
* Clear ownership boundaries

---

## 10. Source-to-Source Compilation Strategy

Razen compiles as follows:

```
Razen Source
  → Rust Compiler Frontend
  → Verified IR
  → C Source Code
  → System C Compiler
  → Native Machine Code
```

This approach provides:

* Maximum portability
* Proven backend optimizations
* Easy debugging
* Stable ABI integration
* Long-term maintainability

C is treated as a **transport language**, not a semantic layer.

---

## 11. Target Domains

Razen is designed for:

* Compilers and language tools
* Game engines
* High-performance servers
* Databases
* Operating systems
* AI/ML infrastructure
* Embedded and systems software

Razen is **not** optimized for:

* Rapid scripting
* UI-heavy application glue
* Dynamic runtime experimentation

---

## 12. Long-Term Stability Philosophy

Razen follows a **conservative evolution model**:

* Core semantics are stable
* Breaking changes are rare and versioned
* Experimental features are isolated
* Safety guarantees are never weakened

Once a rule is part of the language contract, it is treated as permanent.

---

## 13. Guiding Principle (Final)

Razen exists to prove that:

> **High performance, strong safety, deterministic behavior, and low cognitive load are not trade-offs.**

They are design choices.

---

### Razen Vision Statement

**Razen is a language where developers write simple code,
the compiler does the hard work,
and the machine executes with zero ambiguity.**