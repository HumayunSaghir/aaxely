# aaxely — URL Shortener Service

> Shorten. Share. Track.

A full-stack URL shortening web application built with **Node.js**, **Express**, and **MongoDB**. Transform long, messy URLs into clean, shareable links — with built-in click analytics, JWT-based authentication, and a sleek dark-themed UI.

![Made with Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue.svg)
![Railway](https://img.shields.io/badge/Deployed-Railway-0B0D0E?logo=railway&logoColor=white)

**Live:** https://aaxely-production.up.railway.app

---

## Preview

| Landing & Shortener | Login |
|:---:|:---:|
| ![Home](docs/screenshots/home.png) | ![Login](docs/screenshots/login.png) |

| How it works & Link list | Mobile (Sign up) |
|:---:|:---:|
| ![Steps](docs/screenshots/steps.png) | ![Mobile](docs/screenshots/mobile.png) |

---

## Features

- 🔐 **JWT Authentication** — Sign up and log in with secure, cookie-based JWT sessions
- 🔒 **Password Hashing** — Passwords are hashed with HMAC-SHA256 and a random salt before storage; plain-text passwords are never saved
- 🔗 **One-Click Shortening** — Generate compact, unique short IDs using `nanoid`
- 📊 **Click Tracking** — Every redirect increments a per-link click counter
- 👤 **Per-User Links** — Each user only sees and manages their own URLs
- 📝 **Request Logging** — Custom middleware logs every request to `logs.txt`
- 🎨 **Modern Dark UI** — Polished, responsive interface served via EJS templates
- ⚡ **Lightweight Stack** — No frontend framework needed; pure Express + EJS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Web framework | Express 5 |
| Database | MongoDB + Mongoose |
| Templating | EJS |
| Auth | `jsonwebtoken`, `cookie-parser` |
| Password hashing | Node.js built-in `crypto` (HMAC-SHA256 + salt) |
| Short ID | `nanoid` |
| Config | `dotenv` |
| Dev tooling | `nodemon` |

---

## Getting Started

### Prerequisites

- **Node.js** v14 or higher
- **MongoDB** running locally, or a MongoDB Atlas connection string
- **npm** (ships with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HumayunSaghir/urlShortnerService.git
cd urlShortnerService

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
MONGO_URL=mongodb://127.0.0.1:27017/urlShortner
secretKey=replace-with-a-long-random-secret
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on |
| `MONGO_URL` | MongoDB connection string (local or Atlas) |
| `secretKey` | Secret used to sign and verify JWTs |

### Running the App

```bash
# Development (auto-reload on changes)
npm run dev

# Production
npm start
```

Then open **http://localhost:8000** in your browser.

---

## Project Structure

```
urlShortnerService/
├── app.js                  # Application entry point
├── connection.js           # MongoDB connection helper
├── package.json
├── .env                    # Environment variables (not committed)
├── logs.txt                # Auto-generated request log
│
├── controllers/
│   ├── url.js              # Home, create short URL, redirect
│   └── users.js            # Signup, login & logout handlers
│
├── middlewares/
│   ├── auth.js             # JWT cookie verification
│   └── logs.js             # Request logger to logs.txt
│
├── models/
│   ├── urlModel.js         # URL schema (originalUrl, shortId, totalClicks, createdBy)
│   └── users.js            # User schema with pre-save password hashing
│
├── routes/
│   ├── urlRouter.js        # /, /url, /url/:id
│   └── users.js            # /users/signup, /users/login, /users/logout
│
├── service/
│   └── auth.js             # createToken / verifyToken helpers
│
└── views/
    ├── home.ejs            # Dashboard + shortener form + link list
    ├── login.ejs
    └── signup.ejs
```

---

## API Endpoints

All non-`/users/*` routes are protected by the JWT middleware. Unauthenticated requests are redirected to the login page.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| `GET` | `/users/signup` | — | Render the signup page |
| `POST` | `/users/signup` | — | Hash password, create user, set JWT cookie, redirect to `/` |
| `GET` | `/users/login` | — | Render the login page |
| `POST` | `/users/login` | — | Validate credentials, set JWT cookie, redirect to `/` |
| `GET` | `/users/logout` | — | Clear JWT cookie, redirect to login |
| `GET` | `/` | ✅ | Render the dashboard with the user's links |
| `POST` | `/url` | ✅ | Create a short URL from `originalUrl` in the request body |
| `GET` | `/url/:id` | ✅ | Look up `:id`, increment click count, 301-redirect to the original URL |

### Example: creating a short URL

```http
POST /url
Content-Type: application/x-www-form-urlencoded
Cookie: token=<jwt>

originalUrl=https://example.com/some/very/long/path
```

The dashboard re-renders with the new short ID (e.g. `/8c2Vu-`) appended to the user's link list.

---

## How It Works

1. **Sign up** — Password is hashed using HMAC-SHA256 with a random 16-byte salt (via Node's `crypto` module) inside a Mongoose `pre("save")` hook before the document is stored. The plain-text password never touches the database.
2. **Log in** — `User.matchPassword(email, password)` retrieves the stored salt, re-hashes the input, and compares it to the stored hash. On match, a JWT signed with `secretKey` is issued and stored in an HTTP cookie named `token`.
3. **Auth middleware** — On every protected request, `middlewares/auth.js` reads the cookie, verifies the JWT, and attaches the decoded user to `req.user`.
4. **Shorten** — `nanoid(6)` generates a unique 6-character ID, which is saved alongside the original URL and the user's `_id`.
5. **Redirect & track** — Visiting `/url/:id` looks up the document, increments `totalClicks`, and issues a 301 redirect to the original URL.
6. **Logging** — Every incoming request is appended to `logs.txt` by the custom logging middleware.

---

## Deployment

This project is deployed on **Railway** with a Railway-managed MongoDB instance.

### Deploy your own

1. Push the repo to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Inside the project, click **+ New** → **Database** → **MongoDB** (Railway provisions it automatically)
4. In your Node.js service → **Variables** tab, add:
   - `MONGO_URL` → reference the `MONGO_URL` variable from the MongoDB service
   - `secretKey` → any long random secret string
5. Go to **Settings** → **Networking** → **Generate Domain**

Railway injects `PORT` automatically — do not set it manually.

---

## Author

**Humayun Saghir**

If you find this project useful, consider giving it a ⭐ on GitHub!
