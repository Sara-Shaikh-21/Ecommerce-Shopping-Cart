# 🛒 Simple E-commerce Shopping Cart

A minimal e-commerce application built with **React** (frontend) and **Node.js + Express** (backend) that allows users to browse products, add them to a cart, and checkout.

---

## Features

### Frontend
- Display a grid of products with images, names, and prices.
- Add products to cart with a quantity counter.
- View cart with the ability to increase or decrease product quantity.
- Persist cart contents in `localStorage` so they are not lost on page refresh.
- Navigate between **Home**, **Cart**, and **Checkout** pages.
- Responsive and user-friendly UI.

### Backend
- REST API endpoints:
  - `GET /api/products` → Returns list of products.
  - `POST /api/checkout` → Receives cart items and returns success message.
- Hardcoded product data (50 products with images).
- Test cases using **Jest** + **Supertest** to validate `/api/products` and `/api/checkout`.



## Installation
### Backend
1. Navigate to the backend folder:
```
cd backend
```
2. Install dependencies:
```
npm install
```
3. Start the server:
```
node server.js
# or using nodemon
nodemon server.js
```

Server runs at http://localhost:5001

## Frontend
1. cd frontend/
2. npm install
3. npm start


## Backend
1. cd backend/
2. npm install
3. npm start


## Run backend tests with Jest:
```
npm test
```

## Link to video description
https://www.loom.com/share/c918ddb6ce3a420898c562c75644f31d?sid=716b45b1-d87a-4c7b-b79c-1538f6a0136e


