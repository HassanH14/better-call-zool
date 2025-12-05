# Team Task Distribution - Better Call Zool (Technical Vertical Split)

**Strategy:** Layered Architecture. Separation of concerns between Frontend and Backend.

---

## 🔹 Group A: Infrastructure & Core Database (2 Members)
**Focus:** The Backbone of the System.
*   **Member 1 (DevOps & DB Architect):**
    *   **Schema Design:** Design 3NF Normalized ERD and write optimized `setup_db.js`.
    *   **Infrastructure:** Setup Aiven (MySQL), Render (Backend), and Vercel (Frontend).
    *   **Environment:** Manage `.env` configuration, Connection Pooling (`db.js`), and SSL Mode.
    *   **CI/CD:** Manage Git merge conflicts and deployment pipelines.
*   **Member 2 (Core Backend Engineer):**
    *   **Server Setup:** Initialize Express App, CORS configuration, and Body Parsers.
    *   **Security Layer:** Implement `bcrypt` hashing, `jsonwebtoken` (JWT) signing, and Auth Middleware (`verifyToken`).
    *   **Error Handling:** Implement centralized Error Handling Middleware for the entire API.

## 🔹 Group B: Backend API Development (3 Members)
**Focus:** Business Logic & Data Processing.
*   **Member 3 (Auth & User API Dev):**
    *   **Endpoints:** `/api/auth/register`, `/api/auth/login`, `/api/users/profile`.
    *   **Logic:** Validation (Regex for emails), Password updates, and Role management logic.
*   **Member 4 (Product Catalog API Dev):**
    *   **Endpoints:** `/api/products` (CRUD), `/api/reviews`.
    *   **Logic:** Implement complex filtering (WHERE clauses), Search logic (LIKE operators), and Pagination.
*   **Member 5 (Transactional API Dev):**
    *   **Endpoints:** `/api/orders`, `/api/orders/:id/status`.
    *   **Logic:** Handle Order placement using **MySQL Transactions** (ACID compliance).
    *   **Calculation:** Server-side price verification to prevent tampering.

## 🔹 Group C: Customer Frontend Experience (3 Members)
**Focus:** User Interface & State Management.
*   **Member 6 (UI Architect):**
    *   **Global Layout:** Navbar, Footer, Responsive CSS Grid/Flexbox system.
    *   **Context API:** Setup `AuthContext` (Session management) and `ThemeContext`.
*   **Member 7 (Catalog Frontend Dev):**
    *   **Components:** `ProductCard`, `ProductList`, `FilterSidebar`.
    *   **Integration:** Fetch data from Product API and handle Loading/Error states.
*   **Member 8 (Cart & Checkout Dev):**
    *   **State:** Implement `CartContext` (Add/Remove/Update Qty).
    *   **Flow:** Checkout Form validation and Order History page.

## 🔹 Group D: Admin Dashboard Frontend (2 Members)
**Focus:** Internal Management Tools.
*   **Member 9 (Admin UI Lead):**
    *   **Layout:** Create a dedicated Admin Sidebar and Protected Route wrapper (Admin Only).
    *   **Product Manager:** Forms to Add/Edit dishes (Image URL handling).
*   **Member 10 (Operations Frontend Dev):**
    *   **Order Manager:** Table view of all orders with "Status Change" dropdowns.
    *   **User Manager:** View registered users and assign roles.

---

## 🛠 Technical Standards
*   **Backend:** Node.js (Express), MySQL2 (Promise-based).
*   **Frontend:** React 18, Context API, Axios.
*   **Security:** JWT (HttpOnly preferred), BCrypt.
*   **Version Control:** Git Feature Branch Workflow.
