# 🛒 CartCraft - Simple Shopping Cart Project

A full-stack e-commerce application featuring product listing, cart management, and order checkout functionality. Built with Express.js backend and Next.js frontend.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Goals & Evaluation](#project-goals--evaluation)

---

## 🎯 Overview

CartCraft is a minimal e-commerce application designed to demonstrate full-stack development skills with clean separation between frontend and backend, effective state management, and RESTful API design.

**Core Functionality:**

- Browse products in a responsive grid layout
- Add/remove items from shopping cart
- Adjust product quantities
- Persistent cart using localStorage
- Complete checkout process
- Real-time order creation

---

## ✨ Features

### Backend Features

- ✅ RESTful API with Express.js
- ✅ Product listing endpoint with pagination support
- ✅ Individual product details endpoint
- ✅ Order creation with automatic calculation
- ✅ Structured API responses with consistent format
- ✅ Error handling and validation
- ✅ CORS enabled for frontend communication

### Frontend Features

- ✅ Product grid with search and category filters
- ✅ Real-time cart management
- ✅ Persistent cart (localStorage)
- ✅ Quantity adjustment in cart
- ✅ Cart drawer with totals and tax calculation
- ✅ Checkout integration with backend
- ✅ Toast notifications for user feedback
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling

### Bonus Features Implemented

- ✅ Cart quantity management
- ✅ localStorage persistence
- ✅ Undo remove item functionality
- ✅ Product pagination (Load More)
- ✅ Search and filter capabilities
- ✅ Mock data fallback system

---

## 🛠 Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Testing:** Jest

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **HTTP Client:** Fetch API

---

## 📁 Project Structure

```
cartcraft/
├── server/                  # Backend Express application
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Data models
│   │   └── utils/          # Helper functions
│   ├── package.json
│   └── README.md           # Backend-specific docs
│
├── cartcraft/              # Frontend Next.js application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities and API client
│   │   └── hooks/         # Custom React hooks
│   ├── package.json
│   └── README.md          # Frontend-specific docs
│
└── README.md              # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd cartcraft
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../cartcraft
npm install
```

---

## ▶️ Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

The backend server will start at `http://localhost:8000`

### Start the Frontend Application

Open a new terminal window:

```bash
cd cartcraft
npm run dev
```

The frontend application will start at `http://localhost:3000`

### Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Endpoints

#### 1. Get All Products (Paginated)

```http
GET /products?limit=12&skip=0
```

**Response:**

```json
{
  "status": 200,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Smartphone X1",
      "price": 699.99,
      "imageUrl": "https://images.unsplash.com/...",
      "category": "Electronics",
      "stock": 25,
      "description": "Latest smartphone with 5G...",
      "brand": "TechTrend",
      "rating": 4.5,
      "discountPercentage": 10,
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ],
  "success": true
}
```

#### 2. Get Product by ID

```http
GET /products/:id
```

**Response:**

```json
{
  "status": 200,
  "message": "Product fetched successfully",
  "data": {
    "id": 9,
    "name": "Portable Charger 20,000mAh",
    "price": 59.99,
    "imageUrl": "https://images.unsplash.com/...",
    "category": "Electronics",
    "stock": 50,
    "description": "High-capacity portable charger...",
    "brand": "PowerUp",
    "rating": 4.3,
    "discountPercentage": 20,
    "createdAt": "2025-09-01T09:00:00Z"
  },
  "success": true
}
```

#### 3. Create Order

```http
POST /orders
Content-Type: application/json
```

**Request Body:**

```json
{
  "productIds": [1, 6, 5, 4, 7, 8, 9, 6, 5, 4, 3]
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Order placed successfully",
  "data": {
    "id": 15702,
    "userId": 1,
    "productIds": [1, 6, 5, 4, 7, 8, 9, 3],
    "products": [
      {
        "id": 1,
        "name": "Smartphone X1",
        "price": 699.99,
        "quantity": 1
      }
    ],
    "totalAmount": 4489.89,
    "status": "pending",
    "createdAt": "2025-09-29T12:03:05.623Z",
    "updatedAt": "2025-09-29T12:03:05.636Z"
  },
  "success": true
}
```

---

## 🔐 Environment Variables

### Backend (`server/.env`)

```env
PORT=8000
NODE_ENV=development
```

### Frontend (`cartcraft/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🧪 Testing

### Backend Tests

```bash
cd server
npm test
```

Tests include:

- `/products` endpoint validation
- `/products/:id` endpoint validation
- `/orders` endpoint validation
- Response structure verification

### Frontend Tests

```bash
cd cartcraft
npm test
```

---

## 📊 Project Goals & Evaluation

### ✅ Core Requirements Met

**Backend:**

- ✅ API endpoint returning product list
- ✅ Order creation endpoint accepting product IDs
- ✅ Console logging for orders
- ✅ Success message responses

**Frontend:**

- ✅ Product grid display
- ✅ Add to Cart functionality
- ✅ Client-side cart state management
- ✅ Cart view with quantities and totals
- ✅ Checkout button with API integration

### ✅ Evaluation Criteria

**Dev Skills & Code Quality:**

- ✅ Clear separation between frontend and backend
- ✅ Well-defined RESTful API with consistent structure
- ✅ Effective state management using React hooks
- ✅ TypeScript for type safety
- ✅ Reusable components and utilities

**Completion:**

- ✅ Users can view products
- ✅ Users can add items to cart
- ✅ Users can simulate checkout
- ✅ Full end-to-end workflow functional

**Bonus Features:**

- ✅ Cart quantity adjustment
- ✅ localStorage persistence
- ✅ Backend tests implemented
- ✅ Additional features: search, filters, pagination

---

## 🎨 Features in Detail

### Cart Management

- Real-time updates
- Persistent across sessions
- Quantity controls (increase/decrease)
- Remove items with undo functionality
- Automatic total calculation (subtotal + 8% tax)

### Product Browsing

- Category filtering
- Search functionality
- Pagination (Load More)
- Low stock indicators
- Discount badges
- Star ratings

### User Experience

- Toast notifications for actions
- Loading states
- Error handling with user-friendly messages
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Built with ❤️ using Node.js, Express.js, Next.js, and TypeScript**
