# Better Call Zool - Project Documentation

**Project Name:** Better Call Zool  
**Developer:** [Your Name]  
**Date:** December 2025  

---

## 1. Problem Statement

In the rapidly growing digital market, many small to medium-sized businesses struggle to transition from physical retail to online sales. Customers often face difficulties in finding specialized products, tracking their orders, and trusting online platforms due to a lack of transparent review systems.

"Better Call Zool" aims to solve these issues by providing a streamlined, user-friendly food ordering platform. The current market solutions are either too complex for simple users or lack essential features like real-time order tracking and an integrated review system. This project addresses the need for a reliable, easy-to-navigate online food court that bridges the gap between restaurants and customers, ensuring a secure and efficient dining experience.

## 2. Project Objectives

The primary objectives of the "Better Call Zool" project are:

1.  **To Develop a Full-Stack Food Ordering Solution:** Create a robust web application using modern technologies (React, Node.js, MySQL) that handles the entire ordering lifecycle.
2.  **To Enhance User Experience:** Provide an intuitive interface for browsing menus, managing carts, and placing orders with minimal friction.
3.  **To Implement Secure Authentication:** Ensure user data privacy and security through encrypted login and registration systems (JWT & Bcrypt).
4.  **To Empower Administration:** Build a comprehensive admin dashboard for managing menus (CRUD operations for food items), monitoring user activity, and updating order statuses.
5.  **To Facilitate Feedback:** Integrate a review and rating system to build community trust and provide valuable feedback to restaurant managers.
6.  **To Ensure Scalability:** Design a database schema and backend architecture that can handle growing amounts of data and traffic.

## 3. System Scope & Features

### User Module
*   **Registration & Login:** Secure access for hungry customers.
*   **Menu Browsing:** Browse food items by category with search functionality.
*   **Shopping Cart:** Add/remove dishes and calculate totals dynamically.
*   **Checkout System:** Secure order placement.
*   **Order History:** View past orders and current status (Preparing, Shipped, etc.).
*   **Reviews:** Rate and review dishes.

### Admin Module
*   **Dashboard:** Overview of sales and system status.
*   **Menu Management:** Add new dishes, update prices/descriptions, and remove out-of-stock items.
*   **Order Management:** View all customer orders and update their fulfillment status.

## 4. Entity Relationship Diagram (ERD)

*[Please insert your ERD image here]*

**Description of Entities:**
*   **Users:** Stores customer and admin information.
*   **Products:** Contains details of food items (menu) available for order.
*   **Orders:** Records food purchase transactions.
*   **Order_Details:** Links orders to specific dishes and quantities.
*   **Reviews:** Stores user feedback for products.

## 5. Technology Stack

*   **Frontend:** React.js, CSS3, Axios
*   **Backend:** Node.js, Express.js
*   **Database:** MySQL
*   **Deployment:** Vercel (Frontend), Render (Backend), Aiven (Database)

---

