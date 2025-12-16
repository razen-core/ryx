# Ryx Language Specification: Keywords 

This document serves as the official reference for the Ryx programming language.  
**Philosophy:** Ryx combines the simplicity of Go, the safety of Rust, and the power of Python for AI/ML.  
**Total Keywords:** ~28 (Lightweight & Modern).

---

## 1. Variables & Constants
*Core definitions for state management.*

- `mut`   – Declare a mutable variable. (Variables are immutable by default).
- `const` – Declare a compile-time constant value.
- `flow`  – Declare a reactive variable.  
  *Feature:* Automatically updates UI or logic when the underlying data stream changes (e.g., live crypto prices).

---

## 2. Types & Data Structures
*Defining the shape of your data.*

- `struct` – Define a custom data structure with named fields.
- `enum`   – Define a set of named variants or a tagged union.
- `union`  – Define a high-performance untagged union (e.g., `union Num = int || float`).
- `trait`  – Define a shared behavior or interface.
- `impl`   – Implement a trait or method for a specific type.
- `alias`  – Create a shortcut name for a complex type.  
  *Example:* `alias Vector = [float; 3]`

---

## 3. Functions & Modules
*Building blocks of logic and organization.*

- `act`  – Define a function or action.  
  *Note:* Uses "expression body" syntax (`->`) for one-liners.
- `retn` – Return a value from an action.
- `use`  – Import modules or specific items.
- `pub`  – Mark a function, struct, or field as public (visible to other modules).

---

## 4. Control Flow & Logic
*Directing the execution path.*

- `if`    – Conditional branching (No parentheses required).
- `else`  – Alternative branch.
- `loop`  – Universal loop construct (replaces `for`/`while`).
- `break` – Exit a loop immediately.
- `next`  – Skip to the next iteration of a loop.
- `match` – Powerful pattern matching (supports unions and enums).
- `guard` – Early exit condition.  
  *Usage:* `guard user.isValid else { retn Error }` — Keeps code flat.

---

## 5. Modern Error Handling (New)
*Robust, flat, and readable error management.*

- `try`   – Attempt an action; automatically propagates errors up the stack if they occur.
- `catch` – Provide a fallback value if an expression fails.  
  *Example:* `result := try fetch() catch "Default"`
- `defer` – Schedule code to run when the current scope ends (replaces `finally`).  
  *Usage:* `defer file.close()`

---

## 6. Concurrency & AI
*Native support for parallel tasks and machine learning.*

- `async` – Define an asynchronous action.
- `await` – Pause execution until an async task completes.
- `fork`  – Spawn a parallel task. Ryx optimizes and merges similar forks.
- `grad`  – Mark a tensor for automatic gradient tracking (AutoDiff).
- `autodiff` – Define a block where automatic differentiation is active.

---

## 7. Operators & Special Values
*Built-in logic and literals.*

- `in`    – Check membership (`x in list`) or iteration (`loop i in range`).
- `as`    – Safe type casting.
- `is`    – Type checking (`if x is int`).
- `self`  – Reference to the current instance in methods.
- `nil`   – Represents the absence of a value.
- `true`  – Boolean true.
- `false` – Boolean false.
- `inf`   – Positive infinity (Optimization/ML).
- `neg_inf` – Negative infinity.
- `pi`    – Constant: 3.14159...
- `e`     – Constant: 2.71828...

---

## 8. Primitive Types (Built-in)
*No imports required. Optimized for 64-bit systems.*

- `bool`   – Logical value (true/false).
- `int`    – Signed 64-bit integer.
- `uint`   – Unsigned 64-bit integer.
- `float`  – 64-bit floating-point number.
- `str`    – UTF-8 string.
- `bytes`  – Raw byte array (Buffer).
- `void`   – Indicates no return value.
- `tensor` – N-dimensional array with GPU acceleration support.
- `nan`    – Not-a-Number (Float error state).
