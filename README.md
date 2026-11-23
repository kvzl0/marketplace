# PlusOne — E-Commerce Web Application

A full-stack e-commerce platform inspired by the OnePlus official website. Built to manage products, orders, and user accounts with both customer-facing pages and an admin dashboard.

**Live Demo:** https://plusone-flax.vercel.app

---

## Table of Contents
- [About](#about)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Security](#security)
- [Development Status](#development-status)
- [Author](#author)
- [Project Purpose](#project-purpose)

---

## About

PlusOne is a school-developed full-stack e-commerce application that demonstrates frontend development, backend API design, and relational database management. The platform lets customers browse products, manage a cart, and place orders — while administrators can manage inventory, users, and order records through a dedicated dashboard.

---

## Technologies Used

### Frontend
- React.js
- CSS (with dedicated `mobile.css` for responsive layout)
- JavaScript

### Backend
- Node.js
- Express.js
- helmet (secure HTTP headers)
- express-rate-limit (brute-force protection)
- express-validator (input validation)
- bcrypt (password hashing)

### Database
- MySQL

### Deployment
- **Frontend** — Vercel
- **Backend** — Render
- **Database** — Clever Cloud (MySQL)

---

## Features

### Customer-Side
- Browse products by category (Phones, Audio, Tablets)
- View product details and pricing
- Shopping cart with quantity management
- Place orders with shipping address
- View order history

### Admin-Side
- Full CRUD for products (create, read, update, delete)
- Manage user accounts
- Monitor and update order records

### Additional
- JWT-free session auth using localStorage with bcrypt password verification
- API-based communication between frontend and backend
- Mobile-responsive layout with hamburger menu
- Secure HTTP headers via Helmet
- Rate limiting on login, registration, and order endpoints
- Input validation and sanitization on all write endpoints

---

## Project Structure

```
marketplace/
│
├── backend/
│   ├── index.js          # Express server, all API routes
│   ├── .env.example      # Environment variable template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/        # React page components
│   │   ├── App.js
│   │   └── CartContext.js
│   ├── public/
│   │   └── products/     # Product images served by Vercel
│   └── package.json
│
└── README.md
```

---

## Deployment

The application is deployed across three services:

| Layer    | Service      | URL                                          |
|----------|--------------|----------------------------------------------|
| Frontend | Vercel       | https://plusone-flax.vercel.app              |
| Backend  | Render       | https://marketplace-backend-mp5a.onrender.com |
| Database | Clever Cloud | MySQL (free DEV plan)                        |

> **Note:** Render's free tier spins down after inactivity. The first request after idle may take ~50 seconds to wake the backend.

---

## Getting Started

### Prerequisites

- **Node.js** — https://nodejs.org
- **MySQL Server** — https://dev.mysql.com/downloads/mysql/
- **npm** (included with Node.js)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/kvzl0/marketplace.git
cd marketplace
```

#### 2. Install backend dependencies
```bash
cd backend
npm install
```

#### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

#### 4. Configure environment variables

Copy the example files and fill in your values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**backend/.env**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=marketplace
DB_PORT=3306
PORT=8800
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:8800
```

#### 5. Set up the database

Run `MySQL Query.txt` on your local MySQL instance to create the tables.

#### 6. Start the application

```bash
# Backend
cd backend
npm start

# Frontend (separate terminal)
cd frontend
npm start
```

---

## Security

The following measures are implemented in the backend:

| Measure | Implementation |
|---|---|
| Secure HTTP headers | `helmet` |
| CORS | Restricted to Vercel frontend origin only |
| Brute-force protection | `express-rate-limit` on login (10/15min), register (5/hr), orders (20/15min) |
| Input validation | `express-validator` on all write endpoints |
| Password storage | `bcrypt` with 10 salt rounds |
| SQL injection | Parameterized queries throughout (`?` placeholders) |

---

## Development Status

This project has been completed. All core features are fully implemented and deployed.

**Completed features:**
- Full CRUD for products, orders, and users
- Shopping cart system
- Authentication and authorization
- Mobile-responsive layout
- Security hardening (rate limiting, helmet, input validation)
- Full cloud deployment (Vercel + Render + Clever Cloud)

**Completed:** December 8, 2025

> Pre-deployment improvements (mobile layout, branding, security hardening, cloud deployment) were applied on November 23, 2026.

---

## Author

**Kiev Gonzales**  
GitHub: https://github.com/kvzl0

---

## Project Purpose

This application was created for academic purposes to demonstrate:
- Full-stack web development
- CRUD operations using modern frameworks
- SQL database design and management
- Integration of React, Express, and MySQL
- REST API design
- Cloud deployment across multiple services
- Backend security best practices

> **Inspiration:** The design and UI of this project is inspired by the [OnePlus official website](https://www.oneplus.com). This project is not affiliated with, endorsed by, or connected to OnePlus in any way. It is a non-commercial academic project created for educational purposes only.

---
