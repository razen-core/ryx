# Ryx Symbols & Operators

This document lists the core symbols used in Ryx.
**Note:** Ryx uses a unified dot syntax (`.`) for all member and namespace access.

---

## 1. Variable Definition

### 1.1 Declaration (Immutable by default)
- `:=` – Declare and initialize an immutable variable.
  - **Example:** `name := "Prathmesh"`

### 1.2 Mutable Variables
- `=` – Assign or reassign a mutable variable.
  - **Example:** `mut age = 16`
  - **Update:** `age = 17`

---

## 2. Structure & Access

### 2.1 Unified Access
- `.` – Universal access operator. Used for struct fields, methods, modules, and static items.
  - **Field:** `user.name`
  - **Module:** `std.io.print`
  - **Static:** `Math.PI`

### 2.2 Blocks & Groups
- `{ ... }` – Code block / scope.
- `( ... )` – Grouping expressions or parameters.
- `[ ... ]` – Array index or Generic type parameters.
  - **Example:** `arr[0]` or `List[int]`

---

## 3. Functions & Pattern Matching

### 3.1 Function Definitions
- `def` – Keyword to define functions.
- **(Space)** – Arguments and return types use spaces only. No colons or arrows.
  - **Example:** `def add(a int, b int) int { ... }`

### 3.2 Match Syntax
- `->` – Maps patterns to actions inside a `match` block.
  - **Example:** 
    ```
    match x {
        0 -> print("Zero"),
        1 -> print("One"),
        _ -> print("Other")
    }
    ```

---

## 4. Arithmetic Operators

- `+` – Add
- `-` – Subtract
- `*` – Multiply
- `/` – Divide
- `%` – Modulo

---

## 5. Comparison Operators

- `==` – Equal
- `!=` – Not Equal
- `<` – Less Than
- `>` – Greater Than
- `<=` – Less/Equal
- `>=` – Greater/Equal

---

## 6. Boolean Logic

- `&&` – Logical AND
- `||` – Logical OR
- `!` – Logical NOT

---

## 7. Bitwise Operators

- `&` – Bitwise AND
- `|` – Bitwise OR
- `^` – XOR
- `~` – Bitwise NOT
- `<<` – Left Shift
- `>>` – Right Shift

---

## 8. Iteration & Comments

- `..` – Range iterator (e.g., `0..10`).
- `..=` - Range interator with inclusion (e.g., `0..=10`)
- `,` – Separator for lists/args.
- `//` – Single-line comment.
- `/* ... */` – Multi-line comment.