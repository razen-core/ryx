# Ryx Language Specification: Symbols & Operators

This document lists the official symbols used in Ryx.  
**Core Rule:** Ryx uses a **"Constant Syntax"** pattern (`Name Space Type`) and unified dot access (`.`).

---

## 1. Variable & State Definitions

### 1.1 Declaration (Inference or Explicit)
- `:=` – Declare and initialize an immutable variable (Type Inferred).  
  - **Example:** `name := "Prathmesh"`
- `=` – Assign value to a mutable variable or initialize with explicit type.  
  - **Example:** `mut age int = 16` (Constant Syntax)  
  - **Update:** `age = 17`

### 1.2 Async Chaining
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
  - **Method Call:** `text.parse_int()`

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
  - **Array Literal:** `[1, 2, 3]`

---

## 3. Functions & Pattern Matching

### 3.1 Function Syntax
- `act` – Keyword to define a function/action.  
- `->` – **Expression Body / Return Map**.  
  - **One-line Function:** `act square(n int) int -> n * n`  
  - **Pattern Match:** `Status.Active -> print("Online")`  
  - **Match Expression:** 
    ```ryx
    result := match status {
        Status.Active -> "Online",
        Status.Idle -> "Away"
    }
    ```

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
- `**` – Power/Exponentiation.  
  - **Example:** `2 ** 8` → 256

---

## 5. Comparison & Logic
*Note: Parentheses are optional in control flow.*

- `==` – Check Equality.  
- `!=` – Check Inequality.  
- `<` / `>` – Less Than / Greater Than.  
- `<=` / `>=` – Less or Equal / Greater or Equal.  
- `&&` – Logical AND.  
- `||` – Logical OR.  
  - **Example:** `if x > 0 && y > 0 { ... }`

---

## 6. Bitwise Operations (Low Level)

- `&` – Bitwise AND.  
- `|` – Bitwise OR.  
- `^` – XOR (Bitwise Exclusive OR).  
- `~` – Bitwise NOT / Complement.  
- `<<` – Left Shift.  
- `>>` – Right Shift.

---

## 7. Iteration & Ranges

- `..` – Exclusive Range (Up to, but not including).  
  - **Loop:** `loop i in 0..10` (runs 0 to 9).  
  - **Array Slice:** `arr[0..5]` (elements 0 to 4).
- `..=` – Inclusive Range (Up to and including).  
  - **Loop:** `loop i in 0..=10` (runs 0 to 10).  
  - **Array Slice:** `arr[0..=5]` (elements 0 to 5).
- `in` – Membership check operator & iteration keyword.  
  - **Check:** `if user in admin_list`  
  - **Loop:** `loop item in collection`

---

## 8. Error Propagation

- `?` – **Error Propagation Operator**.  
  - **Usage:** Automatically returns `Err` if the expression fails.  
  - **Example:**  
    ```ryx
    act process() Result[int, Error] {
        data := fetch()?      // If fetch fails, return Err immediately
        value := parse(data)? // If parse fails, return Err immediately
        retn Ok(value)
    }
    ```

---

## 9. Type Annotations & Generics

- `:` – Type Annotation.  
  - **Variable:** `mut count int = 0`  
  - **Function:** `act process(data str) int`
- `[T]` – Generic Type Parameter.  
  - **Generic Function:** `act first[T](arr [T]) Option[T]`  
  - **Generic Struct:** `struct Box[T] { value T }`

---

## 10. Comments

- `//` – Single-line comment.  
  - **Example:** `// This is a comment`
- `/* ... */` – Multi-line block comment.  
  - **Example:**  
    ```ryx
    /*
     * Multi-line comment
     * for documentation
     */
    ```

---

## 11. String Interpolation

- `{expr}` – Embed expressions inside strings.  
  - **Example:** `"Hello, {name}!"`  
  - **Complex:** `"Result: {x + y}"`

---

## 12. Special Operators

### 12.1 Reference & Dereference (Unsafe Context Only)
- `&` – Take address (raw pointer).  
  - **Usage:** `unsafe { ptr := &value }`
- `*` – Dereference pointer.  
  - **Usage:** `unsafe { data := *ptr }`

*Note: These only work inside `unsafe` blocks.*

---

## Summary Table

| Symbol | Purpose | Example |
|--------|---------|---------|
| `:=` | Declare & initialize | `x := 10` |
| `=` | Assign | `x = 20` |
| `.` | Access | `user.name` |
| `->` | Expression body | `act add(a int, b int) int -> a + b` |
| `~>` | Async chain | `fetch() ~> process()` |
| `?` | Error propagation | `data := read()?` |
| `..` | Exclusive range | `0..10` |
| `..=` | Inclusive range | `0..=10` |
| `in` | Membership/iteration | `loop x in arr` |
| `{expr}` | String interpolation | `"Value: {x}"` |

---

## Design Principles

1. **Consistency** – One operator, one purpose (no overloading confusion).
2. **Readability** – No parentheses needed in `if`/`loop`.
3. **Safety** – Explicit types when needed, inferred when obvious.
4. **Modern** – Inspired by Rust, Go, Swift, and Kotlin.

**Next Steps:**
- See `Keywords.md` for language keywords
- See `DASO.md` for memory management details
