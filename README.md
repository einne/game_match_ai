# GameMatch AI (Student Full-Stack Skeleton)

GameMatch AI is a beginner-friendly full-stack project for finding suitable gaming teammates.

This repository is prepared for classroom learning with clear separation between frontend and backend.

## Tech Stack

- Frontend: Vue 3 + Vue Router + Bootstrap + Axios
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JWT + bcrypt
- AI usage (later stage): text generation only (not implemented in this step)

## Project Structure

```text
group/
  frontend/
    src/
      components/
      router/
      services/
      views/
    index.html
    package.json
    vite.config.js
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
    package.json
  README.md
```

## Setup Steps

### 1. Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Configure environment variables

Backend:

```bash
cd backend
cp .env.example .env
```

Frontend (optional, if backend runs on non-default URL):

```bash
cd frontend
cp .env.example .env
```

### 3. Start MongoDB

Ensure MongoDB is running locally (default URI in `.env.example`):

`mongodb://127.0.0.1:27017/gamematch-ai`

### 4. Run backend

```bash
cd backend
npm run dev
```

Backend default URL: `http://localhost:5001`

### 5. Run frontend

```bash
cd frontend
npm run dev
```

Frontend default URL (Vite): shown in terminal, usually `http://localhost:5173`

## Available Placeholder Pages (Frontend)

- `/` Home
- `/find` Find Teammates
- `/login` Login
- `/register` Register
- `/profile` Profile
- `*` 404 Not Found

## Available Starter API Endpoints (Backend)

- `GET /` backend root message
- `GET /api/health` health check
- `POST /api/auth/register` register (bcrypt + JWT)
- `POST /api/auth/login` login (bcrypt + JWT)
- `GET /api/users/me` protected profile route
- `GET /api/matches/suggestions` protected placeholder for future matching logic

## Scope Notes for This Step

- Core business logic remains in our codebase.
- No external AI API integration yet.
- AI features will be added later only for text assistance (description polishing, recommendation text, optional tags).
- CRUD, matching score, auth, and rating logic stay in backend/frontend project code.
