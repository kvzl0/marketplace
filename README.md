# Marketplace E-Commerce Web Application

A full-stack e-commerce platform designed to manage products, orders, and user accounts. The system includes both customer-facing pages and administrative tools similar to modern commercial product websites.

---

## Table of Contents
- [About](#about)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Status](#development-status)
- [Author](#author)
- [Project Purpose](#project-purpose)

---

## About

This project is a school-developed full-stack e-commerce application that demonstrates frontend development, backend API creation, and relational database management. The platform enables users to browse items and place orders, while administrators can manage inventory, user accounts, and the overall system.

---

## Technologies Used

### Frontend
- React.js  
- CSS  
- JavaScript  

### Backend
- Node.js  
- Express.js  

### Database
- MySQL  

---

## Features

### Customer-Side
- Browse and view product details  
- Place orders and view order information  

### Admin-Side
- Create, update, delete, and view product records  
- Manage user accounts  
- Monitor and manage order records  

### Additional
- API-based communication between frontend and backend  
- Responsive design (UI improvements ongoing)  

---

## Project Structure
```
marketplace/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

Install the following before setup:
- **Node.js**  
  https://nodejs.org  
- **MySQL Server**  
  https://dev.mysql.com/downloads/mysql/  
- **npm** (included with Node.js)

### Installation Steps

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

#### 4. Configure Database
Update your MySQL credentials in the backend configuration (usually `.env` or a config file).

#### 5. Start the application

**Backend server:**
```bash
cd backend
npm start
```

**Frontend development server:**
```bash
cd frontend
npm start
```

---

## Development Status

This project has been completed. All core features have been fully implemented.

**Completed features include:**
- Full CRUD for products, orders, and users
- Shopping cart system
- Authentication and authorization
- Mobile-responsive layout
- UI/UX design inspired by OnePlus

**Completed:** December 8, 2025

> Pre-deployment improvements (mobile layout refinements, branding updates, code quality fixes) were applied on November 23, 2026.

---

## Author

**Kiev Gonzales**  
GitHub Profile: https://github.com/kvzl0

---

## Project Purpose

This application was created for academic purposes to demonstrate:
- Full-stack web development  
- CRUD operations using modern frameworks  
- SQL database design and management  
- Integration of React, Express, and MySQL  

> **Inspiration:** The design and UI of this project is inspired by the [OnePlus official website](https://www.oneplus.com). This project is not affiliated with, endorsed by, or connected to OnePlus in any way. It is a non-commercial academic project created for educational purposes only.

**Target Completion Date:** December 8, 2025

---
