# Team Task Distribution - Better Call Zool

**Team Size:** 10 Members  
**Goal:** Evenly distribute development, design, and documentation tasks.

---

## 🔹 Group A: Core Architecture & Database (2 Members)
**Focus:** Setting up the foundation, database schema, and server config.

*   **Member 1 (Database Specialist):**
    *   Design the Entity Relationship Diagram (ERD).
    *   Write the `setup_db.js` script to initialize tables (Users, Products, Orders).
    *   Manage Cloud Database setup (TiDB/Aiven).
    *   Write SQL queries for complex data retrieval (e.g., "Top selling products").
*   **Member 2 (Backend Architect):**
    *   Initialize the Node.js/Express project structure.
    *   Configure database connection (`db.js`) and environment variables.
    *   Implement global error handling middleware.
    *   Set up deployment pipelines (Render/Vercel).

## 🔹 Group B: Authentication & Security (1 Member)
**Focus:** User safety and access control.

*   **Member 3 (Security Specialist):**
    *   Implement User Registration & Login APIs (`authController.js`).
    *   Handle Password Encryption (Bcrypt) and JWT Token generation.
    *   Create the `auth` middleware to protect routes.
    *   Create the `admin` middleware to restrict access to dashboard features.

## 🔹 Group C: Product & Order API (2 Members)
**Focus:** The business logic of the application.

*   **Member 4 (Product API Developer):**
    *   Create API routes for Products (CRUD: Create, Read, Update, Delete).
    *   Implement filtering and search logic on the backend.
    *   Handle image URL storage/management.
*   **Member 5 (Order & Review API Developer):**
    *   Create API routes for placing Orders and Order Details.
    *   Implement logic to calculate total prices and validate stock.
    *   Create API routes for Reviews (Adding ratings/comments).

## 🔹 Group D: Frontend - Customer Experience (3 Members)
**Focus:** What the regular user sees and interacts with.

*   **Member 6 (UI/UX Lead):**
    *   Design the Global Theme, Navbar, and Footer.
    *   Ensure the site is Mobile Responsive (CSS/Media Queries).
    *   Create the Home Page layout.
*   **Member 7 (Catalog Developer):**
    *   Build the `ProductList` and `ProductDetail` pages.
    *   Implement Search and Category filtering on the frontend.
    *   Connect Frontend to Backend Product APIs.
*   **Member 8 (Cart & Checkout Developer):**
    *   Build the `Cart` page and logic (State Management).
    *   Implement the Checkout flow.
    *   Build the User Order History page.

## 🔹 Group E: Frontend - Admin Dashboard (2 Members)
**Focus:** The control panel for store owners.

*   **Member 9 (Admin UI Developer):**
    *   Build the Admin Dashboard layout (Sidebar, Charts).
    *   Create the "Manage Products" page (Forms to add/edit dishes).
*   **Member 10 (Operations Developer):**
    *   Create the "Manage Orders" page (View orders, change status to 'Delivered').
    *   Create the "Manage Users" page.
    *   Ensure Admin routes are protected (redirect if not admin).

---

## 📅 Collaboration Workflow
1.  **Git Strategy:** Everyone works on their own branch (e.g., `feature/login`, `feature/cart`).
2.  **Daily Standup:** 10-minute meeting to discuss progress and blockers.
3.  **Integration:** Merge branches into `main` one feature at a time to avoid conflicts.

