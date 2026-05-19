# 🚀 Backend Structure — Express + TypeScript + PostgreSQL

A modular, production-ready REST API backend built with **Express.js**, **TypeScript**, and **PostgreSQL**. Supports JWT-based authentication, bcrypt password hashing, and is ready for deployment on **Vercel**.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Language | TypeScript |
| Framework | Express.js v5 |
| Database | PostgreSQL (`pg`) |
| Auth | JWT (`jsonwebtoken`) |
| Password | bcryptjs |
| Dev Runner | tsx (watch mode) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
Backend-structure/
├── src/
│   ├── server.ts          # Entry point — starts the HTTP server
│   ├── app.ts             # Express app setup, middleware, routes
│   ├── config/
│   │   └── db.ts          # PostgreSQL connection pool
│   ├── modules/
│   │   └── user/
│   │       ├── user.routes.ts      # Route definitions
│   │       ├── user.controller.ts  # Request/Response handlers
│   │       ├── user.service.ts     # Business logic
│   │       └── user.model.ts       # DB queries / types
│   ├── middlewares/
│   │   └── auth.middleware.ts      # JWT verification middleware
│   └── utils/
│       └── response.ts             # Standardized API response helpers
├── .env                   # Environment variables (never commit this)
├── .gitignore
├── tsconfig.json
├── vercel.json            # Vercel deployment config
└── package.json
```

### Module Explanation

Each feature lives in its own folder under `src/modules/`. This is the **modular (feature-based)** pattern — every module is self-contained and responsible for its own routes, controller, service, and model.

| File | Responsibility |
|---|---|
| `*.routes.ts` | Defines API endpoints and links them to controllers |
| `*.controller.ts` | Handles HTTP req/res; calls service layer |
| `*.service.ts` | Contains all business logic; calls model layer |
| `*.model.ts` | Runs raw SQL queries against PostgreSQL |

> This separation ensures each layer has a **single responsibility**, making the codebase easy to scale and test.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) running locally or a cloud DB (e.g., Neon, Supabase)
- npm or yarn

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/st-shourov12/Backend-structure.git
cd Backend-structure
```

---

### Step 2 — Install dependencies

```bash
npm install
```

---

### Step 3 — Set up environment variables

Create a `.env` file in the root of the project:

```bash
touch .env
```

Add the following variables:

```env
# Server
PORT=5000

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

> ⚠️ Never commit your `.env` file to Git. It is already listed in `.gitignore`.

---

### Step 4 — Set up the PostgreSQL database

Connect to your PostgreSQL instance and create the database:

```sql
CREATE DATABASE your_db_name;
```

Then run your table migrations (example for a users table):

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Step 5 — Run the development server

```bash
npm run dev
```

The server starts with **hot reload** via `tsx watch`. You should see:

```
Server running on http://localhost:5000
```

---

## 🔑 API Endpoints (Example)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/users/register` | Register a new user | ❌ |
| POST | `/api/users/login` | Login and get JWT token | ❌ |
| GET | `/api/users/profile` | Get logged-in user profile | ✅ |

> Pass the JWT token in the `Authorization` header as `Bearer <token>`.

---

## 🧪 Testing the API

You can use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) (VS Code extension).

**Example — Register:**
```http
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Shourov",
  "email": "shourov@example.com",
  "password": "securepassword123"
}
```

**Example — Protected route:**
```http
GET http://localhost:5000/api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 🌐 Deploying to Vercel

Vercel supports Node.js serverless functions. Follow these steps:

### Step 1 — Add a `vercel.json` config file

Create `vercel.json` in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.ts"
    }
  ]
}
```

---

### Step 2 — Install Vercel CLI (already in your dependencies)

```bash
npx vercel login
```

Follow the prompts to authenticate with your Vercel account.

---

### Step 3 — Set environment variables on Vercel

Go to your [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → **Settings → Environment Variables** and add all the keys from your `.env` file:

```
PORT
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
JWT_SECRET
JWT_EXPIRES_IN
```

> ✅ Use a cloud PostgreSQL provider like [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) for production — Vercel does not host databases.

---

### Step 4 — Deploy

```bash
npx vercel
```

For production deployment:

```bash
npx vercel --prod
```

Vercel will provide a live URL like:
```
https://backend-structure-xyz.vercel.app
```

---

### Step 5 — Push to GitHub for auto-deploy (recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your `Backend-structure` repository
4. Add environment variables in the Vercel UI
5. Click **Deploy**

Every future `git push` to `main` will trigger an automatic redeployment. 🎉

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm test` | Placeholder for test runner |

---

## 🔒 Security Notes

- Passwords are hashed using **bcryptjs** before being stored
- JWT tokens are signed with a secret and expire after the configured duration
- Never expose your `.env` file or commit secrets to version control

---

## 📄 License

ISC

---

> Built with ❤️ by [st-shourov12](https://github.com/st-shourov12)