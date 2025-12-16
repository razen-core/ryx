# Ryx Language Specification: Symbols & Operators

This document lists the official symbols used in Ryx.  
**Core Rule:** Ryx uses a **"Constant Syntax"** pattern (`Name Space Type`) and unified dot access (`.`).  
*(Updated: Added one-line function syntax, fixed `retn` usage, and finalized async chaining).*

---

## 1. Variable & State Definitions

### 1.1 Declaration (Inference or Explicit)
- `:=` – Declare and initialize an immutable variable (Type Inferred).  
  - **Example:** `name := "Prathmesh"`
- `=` – Assign value to a defined variable.  
  - **Example:** `mut age int = 16` (Constant Syntax)  
  - **Update:** `age = 17`

### 1.2 Reactive & Special Assignment
- `~>` – Async Pipeline / Chaining Operator.  
  - **Usage:** Passes the result of the left side to the function on the right.  
  - **Example:** `fetch_data() ~> parse() ~> save()`  
  *Tip:* Eliminates nested function calls; reads like a flowchart.

---

## 2. Structure, Scope & Access

### 2.1 Hierarchy Access
- `.` – **Universal Dot Operator**. Access everything.  
  - **Struct Field:** `user.name`  
  - **Module Function:** `std.io.print`  
  - **Enum Variant:** `Status.Active`

### 2.2 Grouping & Initialization
- `{ ... }` – Scope Block & Data Initialization.  
  - **Scopes:** `if x > 0 { ... }` (No parentheses needed).  
  - **Structs:** `User { id, name }` (Supports field shorthand & trailing commas).  
- `( ... )` – Grouping expressions or function arguments.  
  - **Math:** `(a + b) * c`  
  - **Args:** `act add(a int, b int)`  
- `[ ... ]` – Arrays, Generics, or Collections.  
  - **Array:** `arr[0]`  
  - **Generic:** `List[int]`

---

## 3. Functions & Pattern Matching

### 3.1 Function Syntax
- `act` – Keyword to define a function/action.  
- `->` – **Expression Body / Return Map**.  
  - **One-line Function:** `act square(n int) int -> n * n`  
  - **Pattern Match:** `Status.Active -> print("Online")`

### 3.2 Separators
- `,` – List Separator.  
  - **Feature:** **Trailing Commas are valid** (and encouraged) in Structs, Enums, and Match blocks.  
  - **Example:** `User { name "Ryx", age 1, }`

---

## 4. Arithmetic & Math

- `+` – Add / String Concatenation.  
- `-` – Subtract.  
- `*` – Multiply.  
- `/` – Divide.  
- `%` – Modulo (Remainder).  

---

## 5. Comparison & Logic
*Note: Parentheses are optional in control flow.*

- `==` – Check Equality.  
- `!=` – Check Inequality.  
- `<` / `>` – Less Than / Greater Than.  
- `<=` / `>=` – Less or Equal / Greater or Equal.  
- `&&` – Logical AND.  
- `||` – Logical OR / **Union Type Definition**.  
  - **Logic:** `if x > 0 && y > 0`  
  - **Type:** `union ID = int || str`

---

## 6. Bitwise Operations (Low Level)

- `&` – Bitwise AND.  
- `|` – Bitwise OR.  
- `^` – XOR.  
- `~` – Bitwise NOT.  
- `<<` – Left Shift.  
- `>>` – Right Shift.

---

## 7. Iteration & Ranges

- `..` – Exclusive Range (Up to, but not including).  
  - **Loop:** `loop i in 0..10` (runs 0 to 9).  
- `..=` – Inclusive Range (Up to and including).  
  - **Loop:** `loop i in 0..=10` (runs 0 to 10).  
- `in` – Membership check operator.  
  - **Check:** `if user in admin_list`

---

## 8. Comments

- `//` – Single-line comment.
- `/* ... */` – Multi-line block comment.