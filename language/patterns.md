# Razen Language Specification: Patterns

This document covers the complete Razen pattern system — exhaustive match, the wildcard `_`,
destructuring, struct spread, named enum variants, and `if let` / `while let`.

---

## 1. Pattern Contexts

Patterns appear in four places in Razen:

```razen
// 1. match arms
match value {
    pattern -> expression,
}

// 2. Variable binding with destructuring
(x, y) := point
{ name, age } := user

// 3. if let — conditional bind
if let some(user) = find_user(id) {
    println(user.name)
}

// 4. loop let — iterate while pattern matches
loop let some(item) = queue.dequeue() {
    process(item)
}
```

---

## 2. The Wildcard Pattern — `_`

`_` matches any value and **discards** it. No binding is created.

```razen
// In match — catch-all arm (must be last)
match status {
    Status.Active  -> println("active"),
    Status.Pending -> println("pending"),
    _              -> println("other"),    // catches Inactive and any future variants
}

// In destructuring — ignore specific positions
(first, _, third) := (1, 2, 3)
(_, y)            := point                // only care about y

// Ignore specific fields in enum data
match event {
    Event.Click { x, y }           -> handle_click(x, y),
    Event.Resize { width, _ }      -> handle_width(width),   // ignore height
    Event.KeyPress { key, _ }      -> handle_key(key),
    _                               -> {},
}

// Suppress "unused binding" warnings
_ := expensive_side_effect()

// In function parameter — accept but ignore
act on_event(_: Event) void {
    println("event received")
}
```

---

## 3. Exhaustive Match

`match` in Razen is **exhaustive** — the compiler rejects a match that doesn't cover
all possible values. Use `_` as the catch-all to satisfy exhaustiveness.

```razen
enum Color { Red, Green, Blue }

// COMPILE ERROR — missing Blue
match color {
    Color.Red   -> println("red"),
    Color.Green -> println("green"),
    // ← compiler error: non-exhaustive match, Color.Blue not covered
}

// CORRECT — exhaustive
match color {
    Color.Red   -> println("red"),
    Color.Green -> println("green"),
    Color.Blue  -> println("blue"),
}

// CORRECT — catch-all
match color {
    Color.Red -> println("red"),
    _         -> println("not red"),
}
```

**Why exhaustiveness matters:** When you add a new variant to an enum, the compiler
flags every match that doesn't handle it — you can't accidentally forget a case.

---

## 4. Match Guards

A match arm can have an `if` condition. The arm only matches if both the pattern
and the guard are true.

```razen
match score {
    n if n >= 90 -> println("A"),
    n if n >= 80 -> println("B"),
    n if n >= 70 -> println("C"),
    n            -> println("F — got {n}"),
}

// Guard on enum pattern
match shape {
    Shape.Circle(r) if r > 100.0 -> println("large circle"),
    Shape.Circle(r)               -> println("circle r={r}"),
    Shape.Rectangle(w, h) if w == h -> println("square"),
    Shape.Rectangle(w, h)           -> println("rect {w}x{h}"),
}

// Guard on option
match find_user(id) {
    some(user) if user.is_active -> println("active user: {user.name}"),
    some(user)                   -> println("inactive: {user.name}"),
    none                         -> println("not found"),
}
```

---

## 5. Named Enum Variant Fields

Enum variants can use either **positional** or **named** fields.

### 5.1 Positional variants (current, unchanged)

```razen
enum Shape {
    Circle(float),
    Rectangle(float, float),
    Point,
}

match shape {
    Shape.Circle(r)       -> 3.14159 * r * r,
    Shape.Rectangle(w, h) -> w * h,
    Shape.Point           -> 0.0,
}
```

### 5.2 Named field variants

```razen
enum Event {
    Click   { x: float, y: float },
    Resize  { width: int, height: int },
    KeyPress { key: char, shift: bool, ctrl: bool },
    Scroll  { delta: float, horizontal: bool },
    Quit,
}

// Create named variant
click_ev  := Event.Click { x: 100.0, y: 200.0 }
resize_ev := Event.Resize { width: 1920, height: 1080 }
key_ev    := Event.KeyPress { key: 'a', shift: false, ctrl: true }

// Match named variant — bind by name
match event {
    Event.Click { x, y }                          -> handle_click(x, y),
    Event.Resize { width, height }                -> resize(width, height),
    Event.KeyPress { key, shift: false, ctrl }    -> handle_key(key, ctrl),
    Event.KeyPress { key, shift: true, _ }        -> handle_shifted(key),
    Event.Scroll { delta, _ }                     -> scroll(delta),
    Event.Quit                                     -> {},
}

// Rename while binding
match event {
    Event.Click { x: px, y: py } -> println("clicked at {px},{py}"),
    _                             -> {},
}

// Partial match — use _ for unnamed fields
match event {
    Event.Resize { width, _ } -> println("width: {width}"),
    _                         -> {},
}
```

### 5.3 Mixed enums

An enum can have both positional and named variants:

```razen
enum ApiError {
    NotFound,                           // unit variant
    Timeout(int),                       // positional — timeout ms
    ParseError { line: int, msg: str }, // named fields
    Network { code: int, reason: str }, // named fields
}

match err {
    ApiError.NotFound                   -> println("404"),
    ApiError.Timeout(ms)                -> println("timed out after {ms}ms"),
    ApiError.ParseError { line, msg }   -> println("parse error line {line}: {msg}"),
    ApiError.Network { code, reason }   -> println("{code}: {reason}"),
}
```

---

## 6. Struct Destructuring

Bind struct fields directly into variables by name.

```razen
struct User {
    id:        int,
    name:      str,
    email:     str,
    is_active: bool,
}

alice := User { id: 1, name: "Alice", email: "alice@razen.dev", is_active: true }

// Destructure — bind all fields
{ id, name, email, is_active } := alice

// Destructure — bind some, ignore rest with _
{ name, email, _ } := alice

// Destructure — rename while binding
{ name: user_name, email: user_email, _ } := alice

// In function parameters
act greet({ name, is_active, _ }: User) str {
    if is_active {
        "Hello, {name}!"
    } else {
        "{name} is inactive"
    }
}
```

---

## 7. Struct Update Syntax — `..`

Copy a struct with some fields overridden. The `..source` syntax fills in any
fields not explicitly listed.

```razen
struct User {
    id:        int,
    name:      str,
    email:     str,
    is_active: bool,
    score:     float,
}

alice := User {
    id:        1,
    name:      "Alice",
    email:     "alice@razen.dev",
    is_active: true,
    score:     91.5,
}

// Create a copy with only name changed
renamed := User { name: "Alicia", ..alice }

// Create a copy with multiple fields changed
updated := User {
    name:      "Alicia",
    is_active: false,
    ..alice            // id, email, score come from alice
}

// Useful for builder-style updates
deactivated := User { is_active: false, ..alice }
promoted    := User { score: alice.score + 10.0, ..alice }

// Works with any struct
struct Config {
    host:    str,
    port:    int,
    timeout: int,
    debug:   bool,
}

default_cfg := Config { host: "localhost", port: 8080, timeout: 30, debug: false }
prod_cfg    := Config { host: "0.0.0.0", debug: false, ..default_cfg }
dev_cfg     := Config { debug: true, ..default_cfg }
```

---

## 8. Tuple Destructuring

```razen
// Simple
(x, y)       := (10, 20)
(a, b, c)    := (1, "hello", true)

// Nested
((x1, y1), (x2, y2)) := ((0, 0), (100, 100))

// With wildcard
(first, _, third) := (1, 2, 3)    // ignore middle
(_, last)         := (1, 99)       // ignore first

// In loop
pairs := vec[(1, "one"), (2, "two"), (3, "three")]
loop (num, word) in pairs {
    println("{num} = {word}")
}

// Returning and destructuring
act bounding_box(points: vec[(float, float)]) ((float, float), (float, float)) {
    // returns (min_point, max_point)
    // ...
}

((min_x, min_y), (max_x, max_y)) := bounding_box(pts)
```

---

## 9. `if let` — Conditional Pattern Binding

Match a single pattern without a full `match` block.

```razen
// option
if let some(user) = find_user(id) {
    println("Found: {user.name}")
}

// result
if let ok(data) = fs.read("config.json") {
    process(data)
}

// Enum with data
if let Shape.Circle(r) = shape {
    println("Circle with radius {r}")
}

// Named enum variant
if let Event.Click { x, y } = event {
    println("Clicked at {x}, {y}")
}

// With else
if let some(user) = find_user(id) {
    println("Found: {user.name}")
} else {
    println("Not found")
}

// Chaining — both bindings must succeed
if let some(user) = find_user(id) && let ok(score) = get_score(user.id) {
    println("{user.name}: {score}")
}
```

---

## 10. `loop let` — Loop While Pattern Matches

Iterate while a pattern keeps matching. Stops when the pattern fails.

```razen
// Drain a queue
mut queue: vec[str] = vec["task_1", "task_2", "task_3"]
loop let some(task) = queue.pop() {
    process(task)
}

// Read lines until EOF
loop let some(line) = reader.next_line() {
    println(line)
}

// Process results until error
loop let ok(item) = stream.next() {
    handle(item)
}
```

---

## 11. Labeled Loops

Labels allow `break` and `next` to target an outer loop.
Labels use the `'name:` prefix and `'name` at the break/next site.

```razen
// Break the outer loop
'outer: loop i in 0..10 {
    loop j in 0..10 {
        if i * j > 50 {
            break 'outer    // exits both loops
        }
        println("{i} * {j} = {i * j}")
    }
}

// Skip the outer loop's current iteration
'outer: loop i in 0..5 {
    loop j in 0..5 {
        if j == i {
            next 'outer     // jump to next i
        }
        println("{i},{j}")
    }
}

// break with value from labeled loop
result := 'search: loop i in 0..100 {
    loop j in 0..100 {
        if is_match(i, j) {
            break 'search (i, j)    // return (i, j) as the loop value
        }
    }
    (-1, -1)    // default if inner loop completes without break
}
(found_i, found_j) := result
```

---

## 12. `loop` as Expression

A `loop` block can produce a value when exited with `break value`.

```razen
// Loop until a condition, then return the value
result: int := loop {
    candidate := compute_candidate()
    if is_valid(candidate) {
        break candidate    // this is the loop's value
    }
}

// Find the first matching item
first_even: option[int] := loop i in 0..items.len() {
    if items[i] % 2 == 0 {
        break some(items[i])
    }
} else {
    none    // the else runs if loop completes without break
}

// Retry with backoff
response := loop attempt in 0..3 {
    match try_connect() {
        ok(r)    -> break r,
        err(msg) -> {
            if attempt == 2 { break_err(msg) }   // propagate as error
            wait(attempt * 100)
        },
    }
}
```

---

## 13. Pattern Matching Summary

| Pattern                    | Syntax                            | Where            |
|----------------------------|-----------------------------------|------------------|
| Literal                    | `42`, `"hello"`, `true`, `'a'`   | match, if let    |
| Wildcard                   | `_`                               | everywhere       |
| Binding                    | `name`                            | match, let       |
| Tuple                      | `(a, b, c)`                       | match, let, loop |
| Struct                     | `{ field, other_field, _ }`       | match, let       |
| Struct rename              | `{ field: new_name, _ }`          | match, let       |
| Enum unit                  | `Status.Active`                   | match            |
| Enum positional            | `Shape.Circle(r)`                 | match            |
| Enum named                 | `Event.Click { x, y }`            | match            |
| Option `some`              | `some(val)`                       | match, if let    |
| Option `none`              | `none`                            | match            |
| Result `ok`                | `ok(val)`                         | match, if let    |
| Result `err`               | `err(e)`                          | match, if let    |
| Range                      | `'a'..='z'`, `0..=9`             | match            |
| With guard                 | `pattern if condition`            | match            |

---

**See also:**
- `keywords.md` — `match`, `if let`, `loop let`, `loop`
- `types.md` — enums, structs, option, result
- `symbols.md` — `_`, `..`, `'label:`