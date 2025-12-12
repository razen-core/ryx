# Ryx Keywords

This document lists all reserved keywords in the Ryx programming language.  
*(Updated for innovation: Added reactive flows, safer guards, and ML-friendly tweaks while keeping it simple and Go-inspired. Total keywords stay lightweight at ~25 for easy learning.)*

---

## 1. Variables & Constants

- `mut` – Declare a mutable variable.
- `const` – Declare a compile-time constant.
- `flow` – Declare a reactive variable (auto-tracks changes in async/AI flows).  
  *Tip:* Great for live crypto prices—`flow rate = fetchAPI()` updates UIs automatically.

---

## 2. Types & Structures

- `alias` – Create a type alias.  
  *Example:* `alias Vec2 = [float; 2]` for quick ML vector shortcuts.
- `struct` – Define a data structure.
- `enum` – Define an enumeration or tagged union.
- `trait` – Define a shared interface or behavior.
- `impl` – Implement a trait for a type.
- `union` – Define an untagged union (e.g., `union Num = int || float`).  
  *Learning tip:* Use for fast numerics in backend math—compiler optimizes without tags.

---

## 3. Functions & Modules

- `act` – Define a function or action.  
  *Example:* `act encrypt(data bytes) bytes { ... }`—feels event-driven for frontend handlers.
- `retn` – Return a value from a function.
- `use` – Import items from another module.
- `pub` – Make an item publicly visible.

---

## 4. Control Flow

- `if` – Conditional branching.
- `else` – Alternative branch for conditionals.
- `loop` – Universal loop construct.
- `break` – Exit a loop immediately.
- `next` – Skip to the next loop iteration.
- `match` – Pattern match against a value.
- `guard` – Pre-condition check (e.g., `guard input is valid { process() }`).  
  *Innovative tip:* Auto-adds error enums—perfect for validating AI inputs without extra code.

---

## 5. Concurrency & Deferred Execution

- `fork` – Spawn a concurrent task.  
  *Example:* `fork trainModel(data1), trainModel(data2)`—Ryx merges similar forks for efficiency.
- `async` – Define an asynchronous function.
- `await` – Wait for an async operation to complete.
- `defer` – Execute code at the end of the current scope.

---

## 6. Operators & Built-in Values

- `in` – Check membership or iterate over a collection.
- `as` – Perform a type cast.
- `is` – Check if a value is of a certain type.
- `self` – Reference to the current instance.
- `nil` – Null or empty value.
- `true` – Boolean true literal.
- `false` – Boolean false literal.
- `inf` – Infinity literal (e.g., `const max = inf` for ML optimizers).  
  *Tech tip:* Handles big-number edges in crypto—pair with unions for robust floats.

## 7. Built-in Types (Reserved Keywords)

These are the core data types you can use directly in Ryx. No imports needed.

- `bool`      – True or false values
- `int`       – Signed integer (64-bit by default)
- `uint`      – Unsigned integer
- `float`     – 64-bit floating-point number (double precision)
- `string`    – UTF-8 text
- `bytes`     – Raw byte array
- `tensor`    – Multi-dimensional array optimized for AI/ML (with GPU support)
- `grad`      – Marks a tensor for automatic gradient tracking (used with autodiff)
- `autodiff`  – Marks a block or function for automatic differentiation
- `nan`       – Not-a-Number special float value
- `void`      – No return value (used in function signatures)
- `any`       – Dynamic type (use only when needed)

*Tip:* `tensor` and `grad` make Ryx super powerful for AI without adding extra complexity.  