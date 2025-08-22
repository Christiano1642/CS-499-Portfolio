# Christian Wallace – Computer Science ePortfolio

Welcome to my professional ePortfolio for the **CS 499 Capstone at Southern New Hampshire University (SNHU)**.  
This portfolio demonstrates my skills and growth in **software engineering and design**, **algorithms and data structures**, and **databases** through enhanced technical artifacts and reflections.

---

## 📌 About Me
I am a full-stack software developer with experience in **.NET, C#, JavaScript, MySQL, MongoDB, and cloud technologies**.  
Over the course of my Computer Science degree, I have developed expertise in **systems design, problem-solving with data structures and algorithms, secure coding practices, and database management**.  
This ePortfolio represents the culmination of my program and demonstrates my readiness to contribute as a professional in the field.

---

## 📂 Artifacts & Enhancements

### 1️⃣ Software Design & Engineering
**Artifact:** Travlr Getaways Full-Stack Application  
**Enhancement:** Refactored the Express.js backend for improved modularity, introduced error-handling middleware, and added query-based pagination and filtering.  

📄 **Narrative – Software Design & Engineering:** [Milestone_Two_Enhancement_Narrative_with_Screenshots.docx](Milestone_Two_Enhancement_Narrative_with_Screenshots.docx)  
💻 **View Enhanced Code:** [travel.js](travel.js)

**Narrative (inline):**  
**Overview:** This enhancement focused on modernizing the Travlr project’s software design. I improved modularity, centralized configuration and error handling, refactored outdated patterns, and clarified controller logic structure.  

**Enhancement Summary:**  
- Refactored `app.js` to use `const`/`let`, added centralized error handler middleware, and imported configuration from a new `config.js`.  
- Created `middleware/errorHandler.js` for standardized JSON and HBS error responses.  
- Introduced `config.js` to centralize API base URLs, request options, and environment variables.  
- Updated `routes/index.js` to include logging middleware and proper scoping.  
- Refactored `controllers/travel.js` to use `async/await`, read API config from `config.js`, and improve error-safety and logic clarity.  

**Rationale:** These changes align the app with modern Node.js practices. Centralized config improves security and maintainability. Middleware-based error handling produces consistent responses for APIs and the UI. Moving to `const`/`let` avoids scoping pitfalls and modernizes the codebase.  

**Highlights:**  
- Added error handler middleware in `middleware/errorHandler.js`  
- New centralized configuration in `config.js`  
- Route cleanup and logging middleware in `app_server/routes/index.js`  
- Major controller refactor for `travel.js`  
- Updated `app.js` with modular imports and cleaner structure  

**Skills & Outcomes:**  
- Designed, developed, and delivered professional-quality software that is modular and maintainable.  
- Implemented secure and efficient practices such as scoped variables, configuration management, and error abstraction.  
- Applied clean coding and middleware principles in a full-stack context.  

**Reflection:** Separating concerns (configuration, error handling, controller logic) improved testability and readability. The `async/await` refactor clarified logic flow and reinforced modern async patterns. :contentReference[oaicite:0]{index=0}

---

### 2️⃣ Algorithms & Data Structures
**Artifact:** Grant Management System  
**Enhancement:** Optimized SQL queries and LINQ expressions for efficiency, added pagination for large datasets, and improved data retrieval algorithms.  

📄 **Narrative – Algorithms & Data Structures:** [Milestone_Four_Final_Enhancement_Narrative.docx](Milestone_Four_Final_Enhancement_Narrative.docx)  
💻 **View Enhanced Code:** [config.js](config.js)

**Narrative (inline):**  
**Overview:** This artifact showcases controller and routing logic that supports algorithmic manipulation of trip data. The initial version returned a static list; the enhanced version supports dynamic inputs and efficient data operations.  

**Enhancements:**  
- Implemented pagination via `page` and `limit` query parameters.  
- Added filtering (`destination`, `minPrice`, `maxPrice`) and sorting (e.g., `sortBy=price` or `date`).  
- Structured flow to sanitize inputs and handle edge cases reliably.  

**Why This Artifact:** It clearly demonstrates array operations (filtering, sorting, slicing) and robust query parsing/validation—practical algorithmic thinking in a real API.  

**Outcome Alignment:** Meets the CS 499 outcome: “Design and evaluate computing solutions using algorithmic principles and CS practices while managing design trade-offs.”  

**Reflection:** Building scalable endpoints that accept multiple query params required modular helper functions, defensive programming for invalid values, and consistent validation of numeric params. Updating the routing layer and documentation cemented understanding of middleware, route-level validation, and response shaping for paginated results. :contentReference[oaicite:1]{index=1}

---

### 3️⃣ Databases
**Artifact:** Travlr Getaways Trip Management  
**Enhancement:** Implemented **audit fields** (`CreatedAt`, `UpdatedAt`, `UpdatedBy`, `IsDeleted`, `DeletedAt`) with Mongoose schema hooks, added **soft-delete and restore** functionality, and ensured default query filtering for active data.  

📄 **Narrative – Databases:** [Milestone_Five_Database_Enhancement.docx](Milestone_Five_Database_Enhancement.docx)  
💻 **View Enhanced Code:** [audit.plugin.js](audit.plugin.js)

**Narrative (inline):**  
**What Changed:**  
- Added a reusable Mongoose **audit plugin** (`app_api/models/plugins/audit.plugin.js`).  
- Injected audit fields: `CreatedAt`, `UpdatedAt`, `UpdatedBy`, `IsDeleted`, `DeletedAt`.  
- Enabled timestamps mapped to `CreatedAt`/`UpdatedAt`.  
- Default query behavior excludes soft-deleted records (`IsDeleted: false`).  
- Pre-hooks to stamp `UpdatedAt`/`UpdatedBy` on updates and saves.  
- Static helpers: `softDeleteById(id, updatedBy)` and `restoreById(id, updatedBy)`.  
- Controllers pass `updatedBy` from request context and call soft-delete/restore.  
- Replaced destructive deletes: `DELETE` performs a soft delete; added a REST endpoint to restore.  

**Why It Matters:**  
- **Compliance & Auditability:** Capture who changed what and when; soft delete preserves history but hides inactive records by default.  
- **Safety & Reversibility:** Avoids accidental data loss; supports restoration.  
- **Maintainability:** Centralizes cross-cutting concerns in a plugin for consistency.  
- **Performance:** Index `IsDeleted` and common fields to keep defaults fast.  

**Technical Details:**  
1) **Audit Fields & Timestamps:** Adds `IsDeleted`/`DeletedAt`/`UpdatedBy` and maps timestamps.  
2) **Default Filtering:** Query pre-hooks inject `{ IsDeleted: false }` unless overridden.  
3) **UpdatedBy Propagation:** For updates, read `options.context.updatedBy`; for saves, use `doc.$locals.updatedBy`.  
4) **Helpers:** `softDeleteById` / `restoreById` toggle soft delete and stamp `UpdatedBy`.  
5) **Accessing Deleted:** `.withDeleted()` opt-in when auditing/reporting requires deleted docs.  

**API Usage Examples:**  
- **Create:** set `doc.$locals.updatedBy` before `save()`.  
- **Update:** pass `{ context: { updatedBy } }` to `updateOne`/`findOneAndUpdate`.  
- **Soft Delete:** `Trip.softDeleteById(id, updatedBy)`.  
- **Restore:** `Trip.restoreById(id, updatedBy)`.  
- **Include Deleted:** `Trip.find(query).withDeleted()`.  

**Migration/Backfill:**  
- Initialize soft-delete fields on existing docs:  
  `updateMany({ IsDeleted: { $exists: false } }, { $set: { IsDeleted: false, DeletedAt: null } })`  
- Add indexes on `IsDeleted` and compound business fields for performance.  

**Trade-offs:**  
- Slightly larger documents; complexity of default filters; restore semantics must follow business rules (enforced in controller/service layer).  

**Outcomes Demonstrated:**  
- **Software Engineering/Databases:** Reusable plugin for cross-cutting concerns.  
- **Security Mindset:** Prevent destructive deletes; preserve history and provenance (`UpdatedBy`).  
- **Communication:** Documented behavior and simple helpers reduce team error. :contentReference[oaicite:2]{index=2}

---

## 🚀 Skills Demonstrated
- ✅ Full-stack web application development (MEAN & .NET stack)  
- ✅ Database design & optimization (MySQL, MongoDB)  
- ✅ Software architecture & design patterns  
- ✅ Secure coding & audit logging  
- ✅ Agile development and collaborative workflows
