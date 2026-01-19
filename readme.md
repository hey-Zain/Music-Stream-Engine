MusicApp

A full-stack music web application with user authentication, media uploads, real-time chat, and admin tools. The project includes an Express + MongoDB backend and a React + Vite frontend with Clerk for authentication and Socket.IO for real-time features.

## Features

- User registration and authentication (Clerk)
- Upload and serve songs and album cover images (Cloudinary)
- Real-time messaging between users (Socket.IO)
- Notifications and admin endpoints
- Usage tracking and basic stats
- Error monitoring with Sentry

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose), Socket.IO, Cloudinary, Sentry, Clerk
- Frontend: React, Vite, TypeScript, Zustand, Clerk, Tailwind CSS, Socket.IO client
- Dev / tooling: Nodemon, ESLint, Vite

## Environment Variables

Add the following variables to the backend `.env` file (backend/.env) and the frontend `.env` file (frontend/.env). Do NOT commit secrets to source control.

### Backend `.env` (required keys)

- `PORT` — Port the backend server listens on (e.g. 5000)
- `MONGO_URL` — MongoDB connection string (mongodb+srv://...)
- `ADMIN_EMAIL` — Admin account email
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `NODE_ENV` — `development` or `production`
- `CLERK_PUBLISHABLE_KEY` — Clerk publishable key for server-side usage (if used)
- `CLERK_SECRET_KEY` — Clerk secret key (server-side)
- `SENTRY_DSN` — Sentry DSN for error reporting

Example (do NOT use real secrets in repo):

```
PORT=5000
MONGO_URL=mongodb+srv://username:password@cluster0.example.mongodb.net/musicapp
ADMIN_EMAIL=admin@example.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=development
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
SENTRY_DSN=https://example@sentry.io/12345
```

### Frontend `.env` (required keys)

- `VITE_CLERK_PUBLISHABLE_KEY` — Clerk publishable key used by the frontend

Example:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

## Images

Place screenshots and images in the frontend `public/` folder. Example placeholders:

- `frontend/public/albums/` — album cover images
- `frontend/public/cover-images/` — app cover images
- `frontend/public/songs/` — static songs (if any)

Add images to the README using relative paths, for example:

![App home](/frontend/public/cover-images/MusicApp-Home.png)

## Run Locally

1. Backend

```bash
cd backend
npm install
# create .env with the keys above
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
# create frontend/.env with VITE_CLERK_PUBLISHABLE_KEY
npm run dev
```

Open the frontend URL from Vite (usually http://localhost:5173) and the backend (http://localhost:5000) depending on your `PORT`.

## Notes & Troubleshooting

- If real-time chat or online user status is not working, ensure both frontend and backend are using the same Socket.IO protocol version and the frontend is connecting to the correct backend URL.
- Ensure Clerk keys are configured for both frontend and backend, and the Authorization header is set for API calls.
- Check browser console and backend logs for socket connect events and errors.


