# The Ryx Module System: `use` and `pub`

Ryx has a simple yet powerful module system designed to be predictable and scale from small scripts to massive projects without complex configuration files.

**Core Philosophy:**
1.  **Every file is a module.**
2.  **Folders are namespaces.**
3.  **Everything is private by default.** You must explicitly export what you want to share.

---

## 1. Exporting with `pub`

To make a function, struct, enum, or constant accessible to other files, you must mark it as public with the `pub` keyword. If `pub` is not present, the item can only be used inside its own file.

**Example: `math.ryx`**
```
// This struct is public and can be imported by other files.
pub struct Vector {
    x float,
    y float,
}

// This action is also public.
pub act add(a int, b int) int -> a + b

// This action is private. No other file can see or use it.
act internal_helper() {
    // ... secret logic
}
```

---

## 2. Importing with `use`

The `use` keyword is the universal way to bring code from other modules into the current file. Ryx automatically handles file extensions; you never need to type `.ryx`.

### 2.1. Basic Import (Sibling Files)

If files are in the same folder, just `use` the filename.

**File Structure:**
```
/project
  ├── main.ryx
  └── math.ryx
```

**Code in `main.ryx`:**
```
// Import the 'math' module
use math

act main() {
    // Access public items with dot syntax
    sum := math.add(10, 20)
    v := math.Vector { x 1.0, y 2.0, }
}
```

### 2.2. Folder Import (Dot Syntax)

Folders act as namespaces. To import from a sub-folder, replace the `/` with a `.`.

**File Structure:**
```
/project
  ├── main.ryx
  └── utils
      └── network.ryx
```

**Code in `main.ryx`:**
```
// Import the 'network' module from the 'utils' folder
use utils.network

act main() {
    utils.network.connect("https://ryx.dev")
}
```

### 2.3. Importing Specific Items

To avoid typing the module name repeatedly, you can import specific items directly into your scope using `{ }`.

**Code in `main.ryx`:**
```
// Import only the 'add' action and 'Vector' struct
use math { add, Vector, }

act main() {
    // Now you can use them directly
    sum := add(5, 5)
    v := Vector { x 0, y 0, }
}
```

### 2.4. Renaming with `as`

If you have a naming conflict or want a shorter name, use the `as` keyword.

**Code in `main.ryx`:**
```
use utils.network as net
use my_long_database_module as db

act main() {
    net.connect("...")
    db.query("...")
}
```

---

## 3. Advanced Organization

### 3.1. Folder as a Module: `mod.ryx`

Sometimes you want to import a whole folder as a single unit. If you place a special file named `mod.ryx` inside a folder, it acts as the "entry point" for that module. It can re-export public items from its sibling files.

**File Structure:**
```
/project
  └── database
      ├── mod.ryx  <-- The folder's public API
      ├── connection.ryx
      └── query.ryx
```

**Code in `database/mod.ryx`:**
```
// Re-export the public items from other files in this folder
pub use connection { connect, }
pub use query { run_query, }
```

**Code in `main.ryx`:**
```
// Now you can import the entire 'database' folder as one module
use database

act main() {
    // Access the re-exported items
    db := database.connect()
    database.run_query(db, "SELECT *")
}
```

### 3.2. Root Imports: The `~` Symbol

In deeply nested projects, using relative paths like `../../` is confusing. To import from the **root of your project**, start the path with a `~`.

**File Structure:**
```
/project
  ├── config.ryx
  └── app
      └── http
          └── controllers
              └── auth.ryx
```

**Code in `auth.ryx`:**
```
// Instead of '../../../../config', we use the clean root path
use ~.config

act handle_login() {
    api_key := config.get_api_key()
    // ...
}
```

### Summary of Import Styles

| Syntax | Description | When to Use |
| :--- | :--- | :--- |
| `use math` | Imports an entire module. | When you use many items from the module. |
| `use math { add, }` | Imports specific, named items. | When you only need a few items frequently. |
| `use math as m` | Imports a module with a new name. | To resolve name conflicts or for brevity. |
| `use ~.config` | Imports from the project root. | To avoid confusing `../` paths in deep folders. |
