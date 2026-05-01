# URL Shortener Service

A full-stack URL shortening application built with Node.js, Express, and MongoDB. Create custom short links, manage your URLs, and track usage through a modern dark-themed interface.

## Features

- **User Authentication** — Sign up and log in to manage your personal links
- **Custom Short URLs** — Create personalized short links instead of random ones
- **Link Management** — View, edit, and delete your shortened URLs
- **Cookie-based Sessions** — Secure authentication with JWT tokens
- **Request Logging** — Built-in logging middleware for debugging
- **Modern UI** — Sleek dark-themed interface with smooth animations

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Templating:** EJS
- **Authentication:** JWT, cookie-parser
- **ID Generation:** nanoid

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd urlShortnerService

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URL=mongodb://127.0.0.1:27017/urlShortner
secretKey=your-secret-key
```

### Run the Application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Visit `http://localhost:8000` to use the application.

## Project Structure

```
urlShortnerService/
├── app.js              # Main application entry point
├── connection.js       # MongoDB connection
├── package.json        # Dependencies and scripts
├── .env                # Environment variables
├── controllers/        # Route handlers
│   ├── url.js
│   └── users.js
├── middlewares/        # Express middlewares
│   ├── auth.js         # JWT authentication
│   └── logs.js         # Request logging
├── models/             # Mongoose schemas
│   ├── urlModel.js
│   └── users.js
├── routes/             # Route definitions
│   ├── urlRouter.js
│   └── users.js
├── service/            # Business logic
│   └── auth.js
└── views/              # EJS templates
    ├── home.ejs
    ├── login.ejs
    └── signup.ejs
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page (requires auth) |
| GET | `/signup` | Sign up page |
| POST | `/users/signup` | Create new account |
| GET | `/login` | Login page |
| POST | `/users/login` | Authenticate user |
| GET | `/logout` | Log out user |
| POST | `/url` | Create short URL |
| GET | `/url/:shortId` | Redirect to original URL |
| DELETE | `/url/:id` | Delete a URL |

## License

ISC © 2025 Humayun Saghir