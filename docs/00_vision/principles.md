# Core Principles

This document defines the **non-negotiable design principles** of the Ryx programming language. All language features, compiler behavior, tooling, and ecosystem decisions **must conform** to these principles.

These principles are **normative**. If a proposal violates any principle here, it is rejected unless the principle itself is formally amended.

---

## 1. Safety by Construction

Ryx prioritizes **compile-time safety guarantees** over runtime checks.

* Memory safety must be provable at compile time
* Data races are forbidden by default
* Undefined behavior is not exposed to safe code
* Unsafe operations must be **explicit, isolated, and auditable**

> If the compiler cannot prove safety, the program is invalid.

---

## 2. Zero-Cost Abstractions

Abstractions in Ryx must not impose runtime overhead.

* High-level constructs compile to predictable, minimal machine code
* No hidden allocations
* No implicit reference counting
* No mandatory garbage collection

> What you do not write should not cost you.

---

## 3. Explicitness Over Implicitness

Ryx favors **clear intent** over convenience.

* Ownership and borrowing are explicit
* Mutability is explicit
* Lifetimes are inferred but never ambiguous
* Control flow must be readable from syntax alone

> The reader of the code is more important than the writer.

---

## 4. Deterministic Resource Management

All resources in Ryx have **well-defined lifetimes**.

* Memory, file handles, sockets, and locks are released deterministically
* Destruction order is guaranteed
* No finalizers or unpredictable cleanup phases

> Resource behavior must be explainable without runtime inspection.

---

## 5. Strong but Practical Typing

Ryx uses a strong, static type system designed for real systems programming.

* Types prevent invalid states
* No implicit type coercions that hide cost or risk
* Generics are monomorphized
* Type inference must never reduce clarity

> Types exist to eliminate entire classes of bugs.

---

## 6. Concurrency Without Fear

Concurrency is a first-class feature and must be **safe by default**.

* Shared mutable state is restricted
* Message passing and ownership transfer are preferred
* Data-race freedom is enforced at compile time
* Parallelism should scale without sacrificing correctness

> Correct concurrent code should be the default, not the exception.

---

## 7. Predictable Performance

Ryx targets **systems-level performance**.

* Execution cost must be analyzable
* Compilation must produce consistent results
* No runtime magic that affects performance invisibly

> Performance surprises are bugs.

---

## 8. Minimal Runtime, Powerful Compiler

Complexity belongs in the compiler, not the runtime.

* Runtime is small, transparent, and replaceable
* Optimizations are performed statically whenever possible
* The language does not rely on heavyweight runtime services

> Pay complexity once, at compile time.

---

## 9. Interoperability as a First-Class Goal

Ryx must integrate cleanly with existing ecosystems.

* C ABI compatibility is mandatory
* Clear FFI boundaries
* Predictable data layouts

> A systems language must live in the real world.

---

## 10. Evolution Without Fragmentation

Ryx evolves cautiously and coherently.

* Backward compatibility is preserved whenever possible
* Breaking changes require strong justification
* No feature creep
* One correct way is preferred over many optional ones

> Stability is a feature.

---

## 11. Tooling Is Part of the Language

The language is incomplete without excellent tooling.

* Compiler diagnostics must be precise and actionable
* Formatting is standardized
* IDE support is not optional

> Developer experience is a correctness issue.

---

## 12. Simplicity Over Cleverness

Ryx rejects unnecessary complexity.

* Features must be explainable
* Orthogonal design is preferred
* Clever tricks that reduce clarity are forbidden

> Simple systems scale. Clever ones break.

---

## Status of This Document

This document is **authoritative**.

All other documentation must defer to these principles. If conflict arises, this document takes precedence.
