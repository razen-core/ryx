# ALL RYX DATA TYPES - Complete Examples

---

## 1. PRIMITIVES

```ryx
// bool
isActive := true
hasError := false

// int (64-bit signed)
count    := 42
negative := -100
hex      := 0xFF
binary   := 0b1010
octal    := 0o755

// uint (64-bit unsigned)
index    := 0u
size     := 1024u

// float (64-bit)
pi       := 3.14159
price    := 99.99
scientific := 1.5e-10

// str (UTF-8)
name     := "Ryx"
emoji    := "🚀💻"
template := "Hello, {name}!"

// bytes (raw binary)
data     := bytes[0x48, 0x65, 0x6C, 0x6C, 0x6F]
buffer   := bytes[1024]  // 1024 zero bytes
```

---

## 2. ARRAYS - Fixed Size

```ryx
// Fixed-size array [type; size]
numbers  := [int; 5]           // [0, 0, 0, 0, 0]
values   := [1, 2, 3, 4, 5]    // Type inferred: [int; 5]

// Multi-dimensional
matrix   := [[int; 3]; 3]      // 3x3 matrix
grid     := [[1, 2, 3],
             [4, 5, 6],
             [7, 8, 9]]

// Array operations
arr := [10, 20, 30, 40, 50]

first    := arr[0]              // 10
last     := arr[arr.len() - 1]  // 50
slice    := arr[1..4]           // [20, 30, 40]
sliceInc := arr[1..=4]          // [20, 30, 40, 50]

// Iteration
loop item in arr {
    println(item)
}

loop (index, value) in arr.enumerate() {
    println("arr[{index}] = {value}")
}
```

---

## 3. VECTORS - Dynamic Size

```ryx
// Vec[T] - growable array
mut nums := Vec[int]()

// Add elements
nums.push(10)
nums.push(20)
nums.push(30)

// Initialize with values
values := Vec[1, 2, 3, 4, 5]

// Vec operations
nums.pop()              // Remove last → Some(30)
nums.insert(1, 15)      // Insert at index
nums.remove(0)          // Remove at index
nums.clear()            // Remove all

length := nums.len()
isEmpty := nums.isEmpty()

// Access
first := nums[0]
last  := nums[nums.len() - 1]

// With capacity
mut buffer := Vec[int].withCapacity(100)

// Vector of structs
mut users := Vec[User]()
users.push(User { id 1, name "Alice" })
users.push(User { id 2, name "Bob" })

// Nested vectors
mut matrix := Vec[Vec[int]]()
matrix.push(Vec[1, 2, 3])
matrix.push(Vec[4, 5, 6])
```

---

## 4. MAPS - Key-Value Storage

```ryx
// Map[K, V]
mut scores := Map[str, int]()

// Insert
scores.insert("Alice", 95)
scores.insert("Bob", 87)
scores.insert("Charlie", 92)

// Initialize with values
ages := Map {
    "Alice"   25,
    "Bob"     30,
    "Charlie" 28,
}

// Access
aliceScore := scores.get("Alice")  // Option[int] → Some(95)
unknown    := scores.get("Dave")   // None

// Get with default
score := scores.get("Alice").unwrap_or(0)

// Update
scores.insert("Alice", 98)  // Replaces 95

// Remove
scores.remove("Bob")  // Removes Bob

// Check existence
hasAlice := scores.contains("Alice")

// Iteration
loop (key, value) in scores {
    println("{key}: {value}")
}

// Just keys
loop key in scores.keys() {
    println(key)
}

// Just values
loop value in scores.values() {
    println(value)
}

// Map operations
size := scores.len()
scores.clear()

// Complex maps
mut cache := Map[str, User]()
cache.insert("user_1", User { id 1, name "Alice" })

mut nested := Map[str, Vec[int]]()
nested.insert("primes", Vec[2, 3, 5, 7, 11])
```

---

## 5. SETS - Unique Values

```ryx
// Set[T]
mut tags := Set[str]()

// Add
tags.insert("rust")
tags.insert("python")
tags.insert("go")
tags.insert("rust")  // Duplicate ignored

// Initialize
languages := Set["Ryx", "Rust", "Go", "Python"]

// Check membership
hasRust := tags.contains("rust")  // true
hasJava := tags.contains("java")  // false

// Remove
tags.remove("python")

// Set operations
set1 := Set[1, 2, 3, 4]
set2 := Set[3, 4, 5, 6]

union        := set1.union(set2)        // {1,2,3,4,5,6}
intersection := set1.intersection(set2) // {3,4}
difference   := set1.difference(set2)   // {1,2}

// Iteration
loop item in tags {
    println(item)
}

// Set of structs (must implement Hash + Eq)
mut userSet := Set[UserId]()
userSet.insert(123)
userSet.insert(456)
```

---

## 6. TUPLES - Fixed Groups

```ryx
// Tuple (unnamed fields)
point    := (10, 20)
person   := ("Alice", 25, true)
coords   := (1.5, 2.3, 4.7)

// Access by index
x := point.0    // 10
y := point.1    // 20

name := person.0    // "Alice"
age  := person.1    // 25
active := person.2  // true

// Destructuring
(x, y) := point
(name, age, isActive) := person

// Return multiple values
act divmod(a int, b int) (int, int) {
    retn (a / b, a % b)
}

(quotient, remainder) := divmod(17, 5)

// Tuple in struct
struct Response {
    data   str
    status (int, str)  // (code, message)
}

response := Response {
    data   "Success",
    status (200, "OK"),
}

// Nested tuples
nested := ((1, 2), (3, 4))
first  := nested.0     // (1, 2)
value  := nested.0.1   // 2
```

---

## 7. OPTION - Nullable Values

```ryx
// Option[T] - Some(value) or None
act findUser(id int) Option[User] {
    if id == 1 {
        retn Some(User { id 1, name "Alice" })
    }
    retn None
}

// Using Option
result := findUser(1)

match result {
    Some(user) -> println("Found: {user.name}"),
    None       -> println("Not found"),
}

// Unwrap methods
user   := result.unwrap()           // Panics if None
user   := result.unwrap_or(default) // Returns default if None
user   := result.expect("No user")  // Panics with message

// Check if has value
if result.isSome() {
    user := result.unwrap()
}

if result.isNone() {
    println("Empty")
}

// Map and transform
names := Option[str]
    .Some("alice")
    .map(|s| s.toUpperCase())  // Some("ALICE")

// Option in collections
mut maybeValues := Vec[Option[int]]()
maybeValues.push(Some(10))
maybeValues.push(None)
maybeValues.push(Some(20))

// Filter out None
loop item in maybeValues {
    if let Some(value) = item {
        println(value)
    }
}
```

---

## 8. RESULT - Error Handling

```ryx
// Result[T, E] - Ok(value) or Err(error)
act parseAge(input str) Result[int, str] {
    age := input.parse_int()?
    
    if age < 0 {
        retn Err("Negative age")
    }
    
    if age > 150 {
        retn Err("Invalid age")
    }
    
    retn Ok(age)
}

// Using Result
result := parseAge("25")

match result {
    Ok(age)  -> println("Age: {age}"),
    Err(msg) -> eprintln("Error: {msg}"),
}

// Unwrap methods
age := result.unwrap()           // Panics if Err
age := result.unwrap_or(0)       // Default if Err
age := result.expect("Invalid")  // Panics with message

// Check result
if result.isOk() {
    age := result.unwrap()
}

if result.isErr() {
    error := result.unwrapErr()
}

// Map and transform
result := Ok(10)
    .map(|x| x * 2)           // Ok(20)
    .mapErr(|e| "Error: {e}") // Transform error

// Chaining with ?
act process() Result[int, str] {
    age  := parseAge(input())?
    user := createUser(age)?
    id   := save(user)?
    retn Ok(id)
}
```

---

## 9. STRINGS - Text Operations

```ryx
// String creation
text := "Hello, Ryx!"
empty := ""
multiline := "Line 1
Line 2
Line 3"

// Interpolation
name := "Alice"
age  := 25
msg  := "Name: {name}, Age: {age}"

// String operations
length := text.len()              // 11
isEmpty := text.isEmpty()         // false

upper := text.toUpperCase()       // "HELLO, RYX!"
lower := text.toLowerCase()       // "hello, ryx!"

trimmed := "  spaces  ".trim()    // "spaces"

// Contains and search
hasRyx := text.contains("Ryx")    // true
startsH := text.startsWith("Hello") // true
endsEx := text.endsWith("!")      // true

index := text.find("Ryx")         // Some(7)

// Split and join
parts := "a,b,c,d".split(",")     // ["a", "b", "c", "d"]
joined := parts.join("-")         // "a-b-c-d"

lines := multiline.split("\n")

// Replace
replaced := text.replace("Ryx", "World")

// Substring
slice := text[0..5]               // "Hello"
chars := text.chars()             // Iterator of chars

// String builder
mut builder := StringBuilder()
builder.append("Hello")
builder.append(" ")
builder.append("World")
result := builder.toString()      // "Hello World"

// Raw strings (no escaping)
path := r"C:\Users\Ryx\file.txt"
regex := r"\d+\.\d+"
```

---

## 10. SLICES - Views into Arrays/Vecs

```ryx
// Slice - borrowed view
arr := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Slice syntax
first5   := arr[0..5]      // [1, 2, 3, 4, 5]
middle   := arr[3..7]      // [4, 5, 6, 7]
last5    := arr[5..10]     // [6, 7, 8, 9, 10]

// Inclusive slicing
range    := arr[2..=5]     // [3, 4, 5, 6]

// From start
prefix   := arr[..4]       // [1, 2, 3, 4]

// To end
suffix   := arr[5..]       // [6, 7, 8, 9, 10]

// Full slice
all      := arr[..]        // [1, 2, 3, ..., 10]

// Slice a Vec
mut vec := Vec[1, 2, 3, 4, 5]
portion := vec[1..4]       // [2, 3, 4]

// Slice operations
length := portion.len()
first  := portion[0]

loop item in portion {
    println(item)
}
```

---

## 11. RANGES - Iterators

```ryx
// Exclusive range
range1 := 0..10           // 0 to 9

loop i in range1 {
    println(i)
}

// Inclusive range
range2 := 0..=10          // 0 to 10

loop i in range2 {
    println(i)
}

// Step ranges (via iterator)
loop i in (0..100).step(10) {
    println(i)  // 0, 10, 20, ..., 90
}

// Reverse
loop i in (0..10).reverse() {
    println(i)  // 9, 8, 7, ..., 0
}

// Range in array indexing
arr := [10, 20, 30, 40, 50]
slice := arr[1..4]

// Char ranges
loop c in 'a'..'z' {
    print(c)  // a to y
}

loop c in 'a'..='z' {
    print(c)  // a to z
}
```

---

## 12. TENSORS - Multi-Dimensional Arrays (AI/ML)

```ryx
// 1D tensor (vector)
vec := tensor[1.0, 2.0, 3.0, 4.0]

// 2D tensor (matrix)
matrix := tensor[
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
]

// 3D tensor
cube := tensor[
    [[1.0, 2.0], [3.0, 4.0]],
    [[5.0, 6.0], [7.0, 8.0]],
]

// Tensor operations
shape := matrix.shape()       // (2, 3)
size  := matrix.size()        // 6
dtype := matrix.dtype()       // float

// Reshaping
reshaped := matrix.reshape([3, 2])

// Math operations
a := tensor[1.0, 2.0, 3.0]
b := tensor[4.0, 5.0, 6.0]

sum  := a + b                 // Element-wise
prod := a * b                 // Element-wise
dot  := a.dot(b)              // Dot product

// Matrix multiplication
m1 := tensor[[1.0, 2.0], [3.0, 4.0]]
m2 := tensor[[5.0, 6.0], [7.0, 8.0]]
result := m1.matmul(m2)

// Indexing
value := matrix[0, 1]         // 2.0
row   := matrix[0]            // tensor[1.0, 2.0, 3.0]

// Slicing
submatrix := matrix[0..1, 1..3]

// GPU acceleration
gpuTensor := tensor[1.0, 2.0, 3.0].toGpu()
result := gpuTensor * 2.0
cpuResult := result.toCpu()
```

---

## 13. CUSTOM COLLECTIONS

```ryx
// Stack
struct Stack[T] {
    items Vec[T]
}

impl Stack[T] {
    act new() Stack[T] {
        retn Stack { items Vec[T]() }
    }
    
    act push(mut self, item T) {
        self.items.push(item)
    }
    
    act pop(mut self) Option[T] {
        retn self.items.pop()
    }
    
    act peek(self) Option[T] {
        retn self.items.last()
    }
}

// Queue
struct Queue[T] {
    items Vec[T]
}

impl Queue[T] {
    act new() Queue[T] {
        retn Queue { items Vec[T]() }
    }
    
    act enqueue(mut self, item T) {
        self.items.push(item)
    }
    
    act dequeue(mut self) Option[T] {
        if self.items.isEmpty() {
            retn None
        }
        retn Some(self.items.remove(0))
    }
}

// LinkedList
struct Node[T] {
    value T
    next  Option[shared Node[T]]
}

struct LinkedList[T] {
    head Option[shared Node[T]]
    size int
}
```

---

## 14. COMPLETE DATA STRUCTURE EXAMPLE

```ryx
struct Database {
    users      Map[int, User]
    sessions   Map[str, Session]
    tags       Set[str]
    logs       Vec[LogEntry]
    cache      Map[str, bytes]
}

struct User {
    id       int
    name     str
    email    str
    roles    Set[Role]
    metadata Map[str, str]
}

struct Session {
    token     str
    userId    int
    createdAt int
    expiresAt int
    data      Map[str, str]
}

struct LogEntry {
    timestamp int
    level     LogLevel
    message   str
    context   Map[str, str]
}

enum LogLevel {
    Debug,
    Info,
    Warning,
    Error,
}

enum Role {
    Admin,
    Moderator,
    User,
}

act main() {
    mut db := Database {
        users    Map[int, User](),
        sessions Map[str, Session](),
        tags     Set[str](),
        logs     Vec[LogEntry](),
        cache    Map[str, bytes](),
    }
    
    // Add user
    user := User {
        id       1,
        name     "Alice",
        email    "alice@ryx.dev",
        roles    Set[Role.Admin, Role.User],
        metadata Map {
            "country" "USA",
            "city"    "SF",
        },
    }
    
    db.users.insert(user.id, user)
    
    // Add session
    session := Session {
        token     "abc123",
        userId    1,
        createdAt now(),
        expiresAt now() + 3600,
        data      Map[str, str](),
    }
    
    db.sessions.insert(session.token, session)
    
    // Add tags
    db.tags.insert("active")
    db.tags.insert("premium")
    
    // Add log
    entry := LogEntry {
        timestamp now(),
        level     LogLevel.Info,
        message   "User logged in",
        context   Map {
            "userId" "1",
            "ip"     "192.168.1.1",
        },
    }
    
    db.logs.push(entry)
}
```

---

**That's ALL data types with complete examples!** 