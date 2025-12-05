# Better Call Zool 🍔

Better Call Zool is a full-stack food ordering application built with React, Node.js, Express, and MySQL. It provides a seamless dining experience for users and a powerful dashboard for restaurant administrators.

## ✨ Features

### 👤 User Features
*   **User Authentication:** Secure Login and Registration (JWT-based).
*   **Menu Browsing:** View all dishes or filter by categories.
*   **Dish Details:** Detailed view with images, descriptions, and reviews.
*   **Shopping Cart:** Add, remove, and update item quantities.
*   **Order Management:** Place orders and view order history.
*   **Reviews:** Users can leave ratings and comments on dishes.
*   **Profile Management:** Update user details and password.

### 🛠 Admin Features
*   **Admin Dashboard:** Overview of platform statistics.
*   **Menu Management:** Add, edit, and delete dishes.
*   **Order Management:** View all orders and update their status (Pending, Preparing, Delivered).
*   **User Management:** View registered users.

## 🚀 Tech Stack

*   **Frontend:** React.js, React Router, Context API, Axios, CSS3
*   **Backend:** Node.js, Express.js
*   **Database:** MySQL
*   **Authentication:** JSON Web Tokens (JWT), Bcrypt

## 📦 Installation & Setup

### Prerequisites
*   Node.js installed
*   MySQL Server installed and running

### 1. Clone the Repository
```bash
git clone https://github.com/HassanH14/better-call-zool.git
cd better-call-zool
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
JWT_SECRET=your_secret_key
PORT=3000
```

Initialize the database:
```bash
node setup_db.js
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend/ordering-frontend
npm install
npm start
```

The app should now be running at `http://localhost:3000` (Backend) and `http://localhost:3001` (Frontend).

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | | |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| **Products** | | |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |
| **Orders** | | |
| POST | `/api/orders` | Create an order |
| GET | `/api/orders` | Get user orders (or all for Admin) |
| PUT | `/api/orders/:id/status` | Update order status (Admin) |

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

