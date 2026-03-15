# Razen Language Specification: Type System

This document covers the complete Razen type system — primitive types, numeric hierarchy,
the `char` and `never` types, operator traits, the Iterator protocol, and type casting.

---

## 1. Primitive Types Overview

| Type     | Description                          | Default? |
|----------|--------------------------------------|----------|
| `bool`   | Logical value — `true` / `false`     | —        |
| `int`    | Signed 64-bit integer                | ✓ default signed |
| `uint`   | Unsigned 64-bit integer              | ✓ default unsigned |
| `float`  | 64-bit floating-point (`f64` alias)  | ✓ default float |
| `str`    | UTF-8 string                         | —        |
| `char`   | Single Unicode scalar value          | —        |
| `bytes`  | Raw byte buffer                      | —        |
| `void`   | No return value                      | —        |
| `never`  | A type that never has a value        | —        |
| `tensor` | N-dimensional float array (AI/ML)    | —        |

---

## 2. Numeric Type Hierarchy

`int` and `uint` are the **default** integer types. Use them unless you have a specific
reason to care about width — systems code, FFI, GPU, network protocols, file formats.

### 2.1 Signed Integers

| Type  | Width   | Range                                      | Suffix  |
|-------|---------|--------------------------------------------|---------|
| `i8`  | 8-bit   | -128 to 127                                | `i8`    |
| `i16` | 16-bit  | -32,768 to 32,767                          | `i16`   |
| `i32` | 32-bit  | -2,147,483,648 to 2,147,483,647            | `i32`   |
| `i64` | 64-bit  | -9,223,372,036,854,775,808 to …,807        | `i64`   |
| `int` | 64-bit  | alias for `i64` — the default signed type  | —       |

### 2.2 Unsigned Integers

| Type   | Width   | Range                                      | Suffix  |
|--------|---------|--------------------------------------------|---------|
| `u8`   | 8-bit   | 0 to 255                                   | `u8`    |
| `u16`  | 16-bit  | 0 to 65,535                                | `u16`   |
| `u32`  | 32-bit  | 0 to 4,294,967,295                         | `u32`   |
| `u64`  | 64-bit  | 0 to 18,446,744,073,709,551,615            | `u64`   |
| `uint` | 64-bit  | alias for `u64` — the default unsigned type | `u`    |

### 2.3 Floating-Point

| Type    | Width  | Precision     | Notes                              |
|---------|--------|---------------|------------------------------------|
| `f32`   | 32-bit | ~7 digits     | Required for GPU, tensors, ML ops  |
| `f64`   | 64-bit | ~15 digits    | General-purpose float              |
| `float` | 64-bit | ~15 digits    | alias for `f64` — the default float |

```razen
// Default types — use these 95% of the time
count:  int   := 42
size:   uint  := 1024u
ratio:  float := 0.75

// Sized types — when the width matters
pixel:  u8   := 255u8
port:   u16  := 8080u16
flags:  u32  := 0xFFFF_FFFFu32
node_id: u64 := 9_999_999_999u64

offset: i8   := -5i8
delta:  i16  := -1000i16
index:  i32  := 2_147_483_647i32
big:    i64  := -9_223_372_036_854_775_808i64

weight: f32  := 0.5f32    // 32-bit — for GPU / tensor ops
pi:     f64  := 3.14159   // 64-bit — same as float

// Digit separators — _ is ignored in numeric literals
million  := 1_000_000
hex_mask := 0xFF_FF_FF_FFu32
fp_val   := 3.141_592_653
```

### 2.4 Numeric Literal Suffixes

| Suffix   | Type   | Example            |
|----------|--------|--------------------|
| (none)   | `int`  | `42`               |
| `u`      | `uint` | `1024u`            |
| `i8`     | `i8`   | `-5i8`             |
| `i16`    | `i16`  | `1000i16`          |
| `i32`    | `i32`  | `100_000i32`       |
| `i64`    | `i64`  | `9999i64`          |
| `u8`     | `u8`   | `255u8`            |
| `u16`    | `u16`  | `8080u16`          |
| `u32`    | `u32`  | `0xFFu32`          |
| `u64`    | `u64`  | `0xFFFF_FFFFu64`   |
| `f32`    | `f32`  | `0.5f32`           |
| (float)  | `f64`  | `3.14` (inferred)  |

---

## 3. The `char` Type

A `char` is a single **Unicode scalar value** — a valid Unicode codepoint, represented
as a `u32` internally. `char` literals use single quotes.

```razen
// char literals
letter:  char := 'a'
digit:   char := '9'
symbol:  char := '!'
space:   char := ' '
newline: char := '\n'
emoji:   char := '😀'
unicode: char := '\u{1F600}'   // same as above

// char operations
is_alpha   := letter.is_alphabetic()    // true
is_digit   := digit.is_numeric()        // true
is_upper   := letter.is_uppercase()     // false
upper_c    := letter.to_uppercase()     // 'A'
lower_c    := 'Z'.to_lowercase()        // 'z'
codepoint  := letter.to_u32()           // 97
as_str     := letter.to_string()        // "a"

// char from u32
c := char.from_u32(65u32)              // some('A')

// char ranges
loop c in 'a'..='z' {
    print(c)    // a b c ... z
}

loop c in '0'..='9' {
    print(c)    // 0 1 2 ... 9
}

// String iteration yields chars
text := "Hello"
loop c in text.chars() {
    println(c)    // 'H', 'e', 'l', 'l', 'o'
}

// char in match
act classify(c: char) str {
    match c {
        'a'..='z' -> "lowercase",
        'A'..='Z' -> "uppercase",
        '0'..='9' -> "digit",
        ' '       -> "space",
        _         -> "other",
    }
}
```

---

## 4. The `never` Type

`never` is the type of an expression that **never produces a value** — it represents
computations that always diverge: panics, process exits, infinite loops.

`never` is a subtype of every type, so it can appear anywhere a value is expected.
The compiler uses this to verify exhaustive control flow.

```razen
// Functions that never return
act panic(msg: str) never {
    println("PANIC: {msg}")
    std.process.exit(1)
}

act unreachable() never {
    panic("reached unreachable code")
}

act server_loop(port: int) never {
    sock := net.bind(port).unwrap()
    loop {
        conn := sock.accept().unwrap()
        handle(conn)
    }
}

// never in match arms — compiler knows these arms are exhaustive
act divide(a: int, b: int) result[int, str] {
    if b == 0 { ret err("division by zero") }
    ok(a / b)
}

// never coerces to any type — useful in match
x: int := if condition { 42 } else { panic("bad state") }
//                                   ^^^^^^^^^^^^^^^^^^^^
//                         panic() returns never — coerces to int here

// loop { } without break also has type never
```

---

## 5. Numeric Type Casting with `as`

`as` performs explicit type conversion. Widening is always safe; narrowing truncates.

```razen
// Widening — always safe, no data loss
small: i32  := 100i32
big:   i64  := small as i64     // i32 → i64

byte:  u8   := 200u8
wide:  u32  := byte as u32      // u8 → u32

// Narrowing — truncates high bits
big_val: i64 := 300i64
trunced: i8  := big_val as i8   // 300 % 256 = 44

// int ↔ float
count: int   := 42
ratio: float := count as float  // int → float
back:  int   := ratio as int    // float → int (truncates toward zero)

// Numeric to char
ascii: u8   := 65u8
c:     char := ascii as char    // u8 → char ('A')

// char to numeric
code: u32 := 'A' as u32         // char → u32 (65)

// Sized integer conversions
n: i32  := 1000i32
m: u16  := n as u16             // i32 → u16

// f32 ↔ f64
hp: f32  := 0.5f32
dp: f64  := hp as f64           // f32 → f64 (widens)
bp: f32  := dp as f32           // f64 → f32 (may lose precision)
```

**Rules:**
- `as` never panics — it always produces a value by truncation or reinterpretation.
- For safe narrowing with bounds checking, use `.try_as()` which returns `option[T]`.

```razen
safe := big_val.try_as[i8]()    // option[i8] — none if out of range
```

---

## 6. Operator Overloading Traits

These standard traits let custom types work with built-in operators.
Implement them with `impl Trait for Type`.

### 6.1 Arithmetic

```razen
trait Add[Rhs, Output] {
    act add(self, other: Rhs) Output
}

trait Sub[Rhs, Output] {
    act sub(self, other: Rhs) Output
}

trait Mul[Rhs, Output] {
    act mul(self, other: Rhs) Output
}

trait Div[Rhs, Output] {
    act div(self, other: Rhs) Output
}

trait Rem[Rhs, Output] {
    act rem(self, other: Rhs) Output
}

trait Neg {
    act neg(self) Self    // unary minus -x
}
```

### 6.2 Equality & Ordering

```razen
trait Eq {
    act eq(self, other: Self) bool

    // Default implementation — override if needed
    act ne(self, other: Self) bool {
        not self.eq(other)
    }
}

enum Ordering {
    Less,
    Equal,
    Greater,
}

trait Ord: Eq {
    act cmp(self, other: Self) Ordering

    // Defaults derived from cmp — rarely need to override
    act lt(self, other: Self) bool { self.cmp(other) == Ordering.Less }
    act gt(self, other: Self) bool { self.cmp(other) == Ordering.Greater }
    act le(self, other: Self) bool { not self.gt(other) }
    act ge(self, other: Self) bool { not self.lt(other) }
    act min(self, other: Self) Self {
        if self.le(other) { self } else { other }
    }
    act max(self, other: Self) Self {
        if self.ge(other) { self } else { other }
    }
}
```

### 6.3 Display & Debug

```razen
trait Display {
    act to_string(self) str
}

trait Debug {
    act debug_str(self) str
}
```

### 6.4 Cloning

```razen
trait Clone {
    act clone(self) Self
}
```

### 6.5 Indexing

```razen
trait Index[Idx, Output] {
    act index(self, idx: Idx) Output
}

trait IndexMut[Idx, Output] {
    act index_mut(mut self, idx: Idx) Output
}
```

### 6.6 Implementation Example

```razen
struct Vector2 {
    x: float,
    y: float,
}

impl Add[Vector2, Vector2] for Vector2 {
    act add(self, other: Vector2) Vector2 {
        Vector2 { x: self.x + other.x, y: self.y + other.y }
    }
}

impl Sub[Vector2, Vector2] for Vector2 {
    act sub(self, other: Vector2) Vector2 {
        Vector2 { x: self.x - other.x, y: self.y - other.y }
    }
}

impl Mul[float, Vector2] for Vector2 {
    act mul(self, scalar: float) Vector2 {
        Vector2 { x: self.x * scalar, y: self.y * scalar }
    }
}

impl Neg for Vector2 {
    act neg(self) Vector2 {
        Vector2 { x: -self.x, y: -self.y }
    }
}

impl Eq for Vector2 {
    act eq(self, other: Vector2) bool {
        self.x == other.x && self.y == other.y
    }
}

impl Display for Vector2 {
    act to_string(self) str {
        "({self.x}, {self.y})"
    }
}

impl Clone for Vector2 {
    act clone(self) Vector2 {
        Vector2 { x: self.x, y: self.y }
    }
}

// Using operator overloads
a := Vector2 { x: 1.0, y: 2.0 }
b := Vector2 { x: 3.0, y: 4.0 }

c := a + b            // Vector2 { x: 4.0, y: 6.0 }
d := b - a            // Vector2 { x: 2.0, y: 2.0 }
e := a * 3.0          // Vector2 { x: 3.0, y: 6.0 }
f := -a               // Vector2 { x: -1.0, y: -2.0 }
g := a.clone()        // new Vector2 { x: 1.0, y: 2.0 }

if a == b { println("equal") }
println(a.to_string())    // "(1, 2)"
```

---

## 7. The `@derive` Attribute for Auto-Implementation

Common traits can be automatically derived by the compiler using the `@derive` attribute.

```razen
@derive[Debug, Clone, Eq]
struct Point {
    x: float,
    y: float,
}

// Compiler generates Debug, Clone, and Eq implementations automatically
p := Point { x: 1.0, y: 2.0 }
q := p.clone()
if p == q { println("equal") }
println(p.debug_str())    // "Point { x: 1.0, y: 2.0 }"
```

**Derivable traits:** `Debug`, `Clone`, `Eq`, `Ord`, `Display`, `Hash`

`Ord` requires `Eq` to also be derived or implemented.
`Hash` is used for map keys — automatically derived when needed.

---

## 8. The Iterator Protocol

Any type can become iterable by implementing `Iterator[T]`.
The `loop item in collection` syntax desugars to calling `.next()` in a loop.

```razen
trait Iterator[T] {
    act next(mut self) option[T]
}
```

**The loop desugar:**

```razen
// This:
loop item in collection {
    do_something(item)
}

// Becomes:
mut iter := collection.iter()
loop {
    match iter.next() {
        some(item) -> do_something(item),
        none       -> break,
    }
}
```

**Making a custom type iterable:**

```razen
struct Counter {
    current: int,
    max:     int,
}

impl Iterator[int] for Counter {
    act next(mut self) option[int] {
        if self.current >= self.max { ret none }
        val := self.current
        self.current = self.current + 1
        some(val)
    }
}

// Now Counter works with loop
mut counter := Counter { current: 0, max: 5 }
loop n in counter {
    println(n)    // 0, 1, 2, 3, 4
}

// Also works with all collection methods
result := counter.map(|n| n * n).filter(|n| n > 4).collect[vec[int]]()
```

**Iterable types (implement `.iter()` automatically):**

```razen
// All built-in collections
loop item in my_vec    { }
loop item in my_array  { }
loop (k, v) in my_map  { }
loop item in my_set    { }
loop c in my_str.chars() { }
loop b in my_bytes     { }
loop i in 0..10        { }

// Chaining iterator adapters
nums := vec[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

result := nums
    .filter(|x| x % 2 == 0)         // [2, 4, 6, 8, 10]
    .map(|x| x * x)                  // [4, 16, 36, 64, 100]
    .take(3)                          // [4, 16, 36]
    .collect[vec[int]]()

// Common adapters
.map(|x| f(x))                        // transform each item
.filter(|x| pred(x))                  // keep items matching pred
.reduce(init, |acc, x| f(acc, x))     // fold to single value
.fold(init, |acc, x| f(acc, x))       // same as reduce
.any(|x| pred(x))                     // true if any item matches
.all(|x| pred(x))                     // true if all items match
.find(|x| pred(x))                    // option[T] — first match
.position(|x| pred(x))               // option[int] — first index
.enumerate()                           // (int, T) pairs
.zip(other)                            // (T, U) pairs
.take(n)                               // first n items
.skip(n)                               // skip first n items
.chain(other)                          // concatenate two iterables
.flat_map(|x| iter_of(x))             // map then flatten
.collect[vec[T]]()                    // materialize into collection
.count()                               // number of items
.sum()                                 // sum (requires Add)
.product()                             // product (requires Mul)
.min()                                 // option[T] (requires Ord)
.max()                                 // option[T] (requires Ord)
.sort()                                // sorted vec (requires Ord)
.sort_by(|a, b| a.cmp(b))            // sorted with custom comparator
```

---

## 9. Type Aliases & Newtype Pattern

```razen
// Simple alias — transparent, no type safety
alias UserId    = int
alias Score     = float
alias Matrix4x4 = [[float; 4]; 4]

// Generic alias
alias ApiResult[T] = result[T, str]
alias MaybeUser    = option[User]

// Newtype pattern — wrapping creates a distinct type
struct UserId(int)       // newtype over int
struct Email(str)        // newtype over str
struct Meters(float)     // newtype over float

impl UserId {
    act new(id: int) result[UserId, str] {
        if id <= 0 { ret err("UserId must be positive") }
        ok(UserId(id))
    }
    act value(self) int { self.0 }
}

impl Email {
    act new(addr: str) result[Email, str] {
        if not addr.contains("@") { ret err("Invalid email") }
        ok(Email(addr))
    }
    act value(self) str { self.0 }
}

// Now int and UserId are different types — can't mix them
user_id := UserId.new(42).unwrap()
raw_id  := user_id.value()           // 42

// This would be a compile error:
// act process(id: UserId) void { }
// process(42)    ← ERROR: expected UserId, got int
```

---

## 10. `Self` Type

Inside `impl` and `trait` blocks, `Self` refers to the type being implemented.
Use it to write methods that return or accept the same type without naming it explicitly.

```razen
trait Builder {
    act set_name(mut self, name: str) Self
    act set_active(mut self, active: bool) Self
    act build(self) Self
}

struct UserBuilder {
    name:      str,
    email:     str,
    is_active: bool,
}

impl UserBuilder {
    act new() Self {
        UserBuilder { name: "", email: "", is_active: false }
    }

    act name(mut self, name: str) Self {
        self.name = name
        self
    }

    act email(mut self, email: str) Self {
        self.email = email
        self
    }

    act active(mut self) Self {
        self.is_active = true
        self
    }

    act build(self) result[User, str] {
        if self.name == "" { ret err("Name required") }
        ok(User {
            id:        0,
            name:      self.name,
            email:     self.email,
            is_active: self.is_active,
        })
    }
}

// Builder pattern
user := UserBuilder.new()
    .name("Alice")
    .email("alice@razen.dev")
    .active()
    .build()
    .unwrap()
```

---

## 11. String Escape Sequences

| Sequence       | Meaning                                    |
|----------------|--------------------------------------------|
| `\n`           | Newline (LF)                               |
| `\r`           | Carriage return (CR)                       |
| `\t`           | Horizontal tab                             |
| `\\`           | Literal backslash `\`                      |
| `\"`           | Literal double quote `"`                   |
| `\'`           | Literal single quote `'` (in char literal) |
| `\0`           | Null byte                                  |
| `\x41`         | Hex byte — `A` (must be valid ASCII)       |
| `\u{1F600}`    | Unicode codepoint (1–6 hex digits)         |

```razen
tab_sep   := "col1\tcol2\tcol3"
two_lines := "line one\nline two"
path      := "C:\\Users\\razen\\file.txt"
quoted    := "She said \"hello\""
null_byte := "\0"
smiley    := "\u{1F600}"    // "😀"
hex_A     := "\x41"         // "A"

// Raw strings use r"..." — no escape processing
raw_path  := r"C:\Users\razen\file.txt"
raw_regex := r"\d+\.\d+"
```

---

## Summary

| Type     | Default? | Width  | Use when                            |
|----------|----------|--------|-------------------------------------|
| `int`    | ✓        | 64-bit | General-purpose signed integer      |
| `uint`   | ✓        | 64-bit | General-purpose unsigned integer    |
| `float`  | ✓        | 64-bit | General-purpose floating-point      |
| `i8`     | —        | 8-bit  | Tiny signed values, C interop       |
| `i16`    | —        | 16-bit | Small signed values                 |
| `i32`    | —        | 32-bit | 32-bit signed, common in APIs       |
| `i64`    | —        | 64-bit | Explicit alias for `int`            |
| `u8`     | —        | 8-bit  | Bytes, pixel values, ASCII          |
| `u16`    | —        | 16-bit | Ports, small counters               |
| `u32`    | —        | 32-bit | File sizes, common in C APIs        |
| `u64`    | —        | 64-bit | Explicit alias for `uint`           |
| `f32`    | —        | 32-bit | GPU buffers, tensor weights, ML ops |
| `f64`    | —        | 64-bit | Explicit alias for `float`          |
| `char`   | —        | 32-bit | Single Unicode scalar value         |
| `never`  | —        | —      | Functions that never return         |

**See also:**
- `keywords.md` — language keywords
- `patterns.md` — pattern matching and destructuring
- `symbols.md` — operators and syntax