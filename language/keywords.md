# Razen Language Specification: Keywords

This document serves as the official reference for the Razen programming language.  
**Philosophy:** Razen combines the simplicity of Go, the safety of Rust, and the power of Python for AI/ML.  
**Total Keywords:** ~25 (Lightweight & Modern).

---

## 1. Variables & Constants
*Core definitions for state management.*

- `mut`   – Declare a mutable variable. (Variables are immutable by default).
- `const` – Declare a compile-time constant value.
- `shared` – Declare a reference-counted shared value (opt-in for shared ownership).  
  *Usage:* `shared cache := Map[str, Data]()`

---

## 2. Types & Data Structures
*Defining the shape of your data.*

- `struct` – Define a custom data structure with named fields.
- `enum`   – Define a set of named variants or a tagged union.
- `trait`  – Define a shared behavior or interface.
- `impl`   – Implement a trait or method for a specific type.
- `alias`  – Create a shortcut name for a complex type.  
  *Example:* `alias Vector = [float; 3]`

---

## 3. Functions & Modules
*Building blocks of logic and organization.*

- `act`  – Define a function or action. Creates a scoped memory region (DASO).  
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
- `match` – Powerful pattern matching (supports enums and Result/Option types).
- `guard` – Early exit condition.  
  *Usage:* `guard user.isValid else { retn Error }` — Keeps code flat and readable.

---

## 5. Error Handling & Resource Management
*Robust, explicit error management.*

- `defer` – Schedule code to run when the current scope ends (guaranteed cleanup).  
  *Usage:* `defer file.close()`
- **Note:** Error handling uses `Result<T, E>` and `Option<T>` types (see Standard Library).  
  *Propagation:* Use `?` operator to propagate errors automatically.

---

## 6. Concurrency
*Native support for asynchronous operations.*

- `async` – Define an asynchronous action.
- `await` – Pause execution until an async task completes.

---

## 7. Memory Safety
*Low-level control when needed.*

- `unsafe` – Mark a block where safety guarantees are disabled.  
  *Usage:* For raw pointers, manual allocation, FFI.  
  *Example:* `unsafe { ptr := alloc(1024) }`

---

## 8. Operators & Special Values
*Built-in logic and literals.*

- `in`    – Check membership (`x in list`) or iteration (`loop i in range`).
- `as`    – Safe type casting.
- `is`    – Type checking (`if x is int`).
- `self`  – Reference to the current instance in methods.

---

## 9. Boolean Literals
*Logical values.*

- `true`  – Boolean true.
- `false` – Boolean false.

---

## 10. Primitive Types (Built-in)
*No imports required. Optimized for 64-bit systems.*

- `bool`   – Logical value (true/false).
- `int`    – Signed 64-bit integer.
- `uint`   – Unsigned 64-bit integer.
- `float`  – 64-bit floating-point number.
- `str`    – UTF-8 string.
- `bytes`  – Raw byte array (Buffer).
- `void`   – Indicates no return value.
- `tensor` – N-dimensional array with GPU acceleration support (AI/ML).

---

## 11. Standard Library Types
*Available in prelude (auto-imported).*

These are **not keywords** but are always available:

- `Option<T>` – Enum with variants `Some(T)` or `None` (represents optional values).
- `Result<T, E>` – Enum with variants `Ok(T)` or `Err(E)` (represents operations that can fail).

*Example:*
```razen
age := input().parse_int()  // Returns Result<int, ParseError>
user := users.get(id)       // Returns Option<User>
```

---

## 12. Standard Library Constants
*Available in `std.math` (import when needed).*

- `PI`     – 3.14159... (π)
- `E`      – 2.71828... (Euler's number)
- `INF`    – Positive infinity
- `NEG_INF` – Negative infinity
- `NAN`    – Not-a-Number

*Usage:*
```razen
use std.math

area := math.PI * r * r
growth := math.E ** x
```

---

## Summary

**Core Philosophy:**
- Immutable by default (`mut` for mutability)
- Explicit over implicit (`shared` for reference counting)
- Memory safety without garbage collection (DASO)
- Clean syntax (no parentheses in `if`, trailing commas allowed)
- Modern error handling (Result/Option instead of exceptions)

**Next Steps:**
- See `Symbols.md` for operators and syntax
- See `DASO.md` for memory management details
