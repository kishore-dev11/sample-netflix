# 🎬 Netflix Login Clone — React + Node.js + Express

A pixel-faithful Netflix login page clone with full frontend + backend integration.

---

## 📁 Project Structure

```
netflix-login/
├── frontend/          # React (Vite) app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx   ← Netflix-style login UI
│   │   │   ├── LoginPage.css
│   │   │   ├── Dashboard.jsx   ← Post-login dashboard
│   │   │   └── Dashboard.css
│   │   ├── App.jsx             ← React Router setup
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js          ← proxies /api → backend
│   └── package.json
│
└── backend/           # Express API
    ├── server.js      ← /api/login endpoint + mock users
    └── package.json
```

---

## 🔑 Test Credentials (Mock Users)

| Email               | Password    |
|---------------------|-------------|
| user@netflix.com    | netflix123  |
| admin@netflix.com   | admin123    |
| test@example.com    | password    |

---

## 🚀 Local Setup & Run

### Prerequisites
- **Node.js** v18+ → https://nodejs.org
- **npm** v9+ (comes with Node)

---

### Step 1 — Install Backend Dependencies

```bash
cd netflix-login/backend
npm install
```

### Step 2 — Start the Backend Server

```bash
npm start
# → Server running at http://localhost:5000
```

Leave this terminal running.

---

### Step 3 — Install Frontend Dependencies (new terminal)

```bash
cd netflix-login/frontend
npm install
```

### Step 4 — Start the Frontend Dev Server

```bash
npm run dev
# → App running at http://localhost:5173
```

### Step 5 — Open in Browser

Go to **http://localhost:5173**

Sign in with any test credential above. ✅

---

## ⚙️ How It Works

1. **Frontend validation** — checks empty fields, email format, password length before any network call.
2. **Axios POST** — sends `{ email, password }` to `/api/login` (proxied by Vite to `localhost:5000`).
3. **Express backend** — checks credentials against mock user array, returns JSON with a mock JWT token.
4. **Success** → user stored in `sessionStorage`, redirected to `/dashboard`.
5. **Failure** → orange error box shown on the card with the server's message.

---

## 🌐 Deploying to Production

### Option A — Deploy to Render (free, recommended)

#### Backend on Render
1. Push the project to GitHub.
2. Go to https://render.com → New → Web Service.
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Note your Render URL, e.g. `https://netflix-backend.onrender.com`

#### Frontend on Render (Static Site)
1. New → Static Site → same repo.
2. Root directory: `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://netflix-backend.onrender.com`

Update `frontend/src/pages/LoginPage.jsx`:
```js
const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, ...);
```

---

### Option B — Deploy to Vercel (frontend) + Railway (backend)

#### Backend on Railway
1. https://railway.app → New Project → Deploy from GitHub.
2. Select the `backend` folder.
3. Railway auto-detects Node; set start command: `node server.js`
4. Copy the Railway URL.

#### Frontend on Vercel
1. https://vercel.com → New Project → import repo.
2. Root directory: `frontend`
3. Framework: Vite
4. Add env var: `VITE_API_URL=https://your-railway-url.railway.app`
5. Deploy.

---

### Option C — Deploy Both on a VPS (e.g., DigitalOcean / AWS EC2)

```bash
# On your server
git clone <your-repo>

# Backend
cd backend && npm install
npm install -g pm2
pm2 start server.js --name netflix-backend

# Frontend
cd ../frontend
npm install
npm run build
# Serve dist/ with Nginx or serve package
npm install -g serve
serve -s dist -l 3000
```

Set up Nginx to reverse-proxy `/api` to port 5000 and serve the static frontend.

---

## 🛠 Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React 18, Vite, React Router v6 |
| Styling   | Plain CSS (Netflix design tokens) |
| HTTP      | Axios                         |
| Backend   | Node.js, Express 4            |
| Auth      | Mock static credentials (no DB) |

---

## 🔒 For Real Authentication (Next Steps)

To extend this to a real app:
1. Add MongoDB/PostgreSQL with hashed passwords (bcrypt).
2. Replace mock token with real JWT (jsonwebtoken package).
3. Add refresh tokens + HTTP-only cookies.
4. Move credentials to `.env` (dotenv package).

---

Made with ❤️ as a frontend + backend learning project.
