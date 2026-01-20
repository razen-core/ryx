# DASO.md

## Deterministic Automatic Scoped Ownership

### The Memory Management Model of the Ryx Programming Language

---

## 1. Overview

**DASO (Deterministic Automatic Scoped Ownership)** is Ryx’s native memory management model.

It is designed to achieve:

* **Performance near C/C++**
* **Deterministic memory behavior (no GC pauses)**
* **Memory safety by default**
* **Minimal syntax and low cognitive load**
* **Less verbosity than Rust**
* **No runtime garbage collector**
* **95–100% of the time developers do not think about memory**

DASO is a **hybrid compile-time + deterministic runtime model** that combines the **best proven parts** of:

* Manual memory (C/C++)
* Ownership systems (Rust)
* Automatic management (GC languages)
* Region-based allocation (systems research)

Without inheriting their weaknesses.

---

## 2. Design Philosophy

Ryx follows three core principles:

1. **Determinism over heuristics**
   Memory must be freed at known points in time.

2. **Safety without ceremony**
   The compiler enforces rules; developers write simple code.

3. **Pay only for what you use**
   No global GC, no hidden runtime costs.

---

## 3. Core Concept: Implicit Scoped Regions

### 3.1 Function-Level Memory Regions

Every `act` in Ryx implicitly creates a **memory region**.

* All allocations inside the scope go into that region
* The region is freed **entirely and instantly** when the scope ends
* Deallocation is **O(1)**

```ryx
act compute() {
    a := Vec
    b := Map[str, int]()
    c := User { id 1, name "Ryx" }
}
// entire region freed here
```

### 3.2 Why Regions Matter

| Model          | Deallocation Cost        |
| -------------- | ------------------------ |
| C              | Manual, error-prone      |
| Rust           | Drop per value (O(n))    |
| GC             | Deferred, unpredictable  |
| **Ryx (DASO)** | One pointer reset (O(1)) |

This is the foundation of Ryx’s performance.

---

## 4. Escape Analysis (Zero-Syntax Automation)

If a value **escapes its defining scope**, the compiler automatically promotes it.

```ryx
act make_user() User {
    u := User { id 1, name "A" }
    retn u
}
```

**Compiler behavior:**

* Detects `u` escapes the region
* Moves it to heap storage
* Assigns ownership

**No annotations. No keywords. No developer action.**

---

## 5. Ownership Model (Lite, Implicit, Inferred)

Ryx uses **ownership semantics**, but avoids Rust’s verbosity.

### 5.1 Ownership Rules

* Single owner by default
* Moves are implicit
* Borrows are inferred
* No lifetime syntax exists in the language

```ryx
u := User()
v := u       // move
// u is now invalid
```

```ryx
act print(user User) {
    std.io.print(user.name)
}

u := User()
print(u)     // inferred borrow
```

The compiler ensures safety without exposing complexity.

---

## 6. Shared Memory (Explicit and Controlled)

Shared ownership is **opt-in** using `shared`.

```ryx
shared cache := Map[str, Data]()
```

### Properties

* Uses reference counting
* Non-atomic by default
* Atomic when crossing `async` / `fork`
* Compiler warns on excessive sharing

```ryx
shared node := Node()
a := node
b := node
```

This avoids Rust’s `Rc<RefCell<T>>` patterns and runtime borrow failures.

---

## 7. Deterministic Resource Cleanup with `defer`

`defer` schedules code to run when a scope exits.

```ryx
act read() {
    f := File.open("a.txt")
    defer f.close()
    data := f.read()
}
```

* Used for OS resources, locks, files, GPU buffers
* Memory itself does not require `defer`

---

## 8. Unsafe Manual Memory (Explicit Escape Hatch)

For low-level systems code:

```ryx
unsafe {
    buf := alloc(1024)
    use(buf)
    free(buf)
}
```

* Zero runtime overhead
* No safety checks
* Fully isolated from safe code

---

## 9. Comparison with Other Languages

### 9.1 Ryx vs C/C++

| Aspect        | C/C++     | Ryx                    |
| ------------- | --------- | ---------------------- |
| Memory safety | Manual    | Compiler-enforced      |
| Leaks         | Common    | Impossible (safe code) |
| Performance   | Excellent | Excellent              |
| Determinism   | Yes       | Yes                    |

---

### 9.2 Ryx vs Rust

| Aspect         | Rust         | Ryx               |
| -------------- | ------------ | ----------------- |
| Lifetimes      | Explicit     | None              |
| Borrow checker | User-visible | Compiler-internal |
| Verbosity      | High         | Low               |
| Safety         | Excellent    | Excellent         |

Ryx keeps Rust’s guarantees while removing its friction.

---

### 9.3 Ryx vs GC Languages (Java, Python, Go)

| Aspect          | GC Languages | Ryx       |
| --------------- | ------------ | --------- |
| GC pauses       | Yes          | Never     |
| Memory overhead | High         | Low       |
| Predictability  | Medium       | Exact     |
| Runtime cost    | Continuous   | Near-zero |

---

## 10. Performance Characteristics

* Region allocation: pointer bump (stack-like)
* Region deallocation: O(1)
* Ownership moves: zero cost
* Shared memory: localized ARC only
* No background threads
* No global runtime GC

This makes Ryx suitable for:

* Game engines
* Compilers
* Databases
* Operating systems
* High-performance servers

---

## 11. Developer Mental Model

> “If it doesn’t escape, I don’t think about memory.”
> “If it escapes, Ryx handles it.”
> “If I share, I say `shared`.”
> “If I need raw power, I use `unsafe`.”

This simplicity is intentional and enforced.

---

## 12. Why DASO Is Optimal

DASO represents the **best-known achievable balance** between:

* Safety
* Performance
* Simplicity
* Determinism

Anything beyond this would require:

* Hardware-level support, or
* Giving up determinism or safety

---

## 13. Summary

**DASO makes Ryx:**

* Faster than GC-based languages
* Safer than C/C++
* Less verbose than Rust
* Predictable and deterministic
* Scalable from scripts to systems

DASO is not experimental.
It is a **carefully integrated synthesis** of proven techniques.

---

**Ryx Memory Model:**
**Deterministic. Automatic. Safe. Fast.**