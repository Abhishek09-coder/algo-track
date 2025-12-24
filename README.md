# AlgoTrack 🚀

AlgoTrack is a **full‑stack MERN application** designed to help developers **track coding practice, analyze progress, and improve weak areas** using real analytics instead of manual spreadsheets.

This is **not a basic CRUD app**. It focuses on real‑world engineering concepts such as authentication, analytics, production deployment, and SPA routing.

---

## 🌐 Live Demo

* **Frontend (Vercel):** [https://algotrack-tau.vercel.app](https://algotrack-tau.vercel.app)
* **Backend (Render):** [https://algo-track-backend.onrender.com/api/v1/health](https://algo-track-backend.onrender.com/api/v1/health)

---

## 🧠 Core Features

### 🔐 Authentication

* JWT‑based authentication
* Secure protected routes (backend + frontend)
* Axios interceptor for automatic token injection

### 📘 Problem Management

* Add / view coding problems
* Track platform, difficulty, and topics
* User‑specific private data

### 📝 Practice Logging

* Log daily practice
* Mark solved problems
* Automatic dashboard updates without refresh

### 📊 Analytics Dashboard

* Difficulty‑wise solved stats (Easy / Medium / Hard)
* Practice **heatmap** (GitHub‑style)
* Weak topic detection
* Revision recommendations engine

### 📱 Responsive UI

* Mobile‑first responsive design
* Works seamlessly on phones and desktops

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* React Router (SPA routing)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

### Deployment

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas**

---

## 🧩 Architecture Overview

```
repo-root
├── client        # React frontend (Vite)
│   ├── src/api   # Axios + API services
│   ├── src/pages
│   ├── src/components
│   └── vercel.json (SPA rewrite)
│
├── server        # Express backend
│   ├── src/routes
│   ├── src/controllers
│   ├── src/models
│   ├── src/middleware
│   └── src/tests
```

### Key Design Decisions

* **Axios interceptor** for auth instead of prop drilling or Redux
* **Service‑based API layer** (`api/*.js`)
* Clear separation of routes, controllers, and middleware

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
NODE_ENV=production
```

### Frontend (`client/.env`)

```
VITE_API_BASE_URL=https://algo-track-backend.onrender.com/api/v1
```

---

## 🚀 Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Abhishek09-coder/algo-track.git
cd algo-track
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🧪 Testing

* Basic API tests using Jest
* Auth‑protected route testing

---

## 🧠 Key Learnings

* JWT authentication lifecycle
* Axios interceptors in production
* CORS handling between Vercel & Render
* SPA routing issues and fixes (`vercel.json`)
* Debugging real deployment issues

---

## 📌 Future Enhancements

* Streak tracking
* Charts & visual analytics
* Notifications for revision reminders
* Public profile & sharing

---

## 👤 Author

**Abhishek Kumar Jha**
Final‑year B.Tech CSE student

---

> *"Built to replace guesswork with data‑driven practice."*
