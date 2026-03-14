# Ali Maher — Portfolio Website

A full-stack, single-page portfolio website built with **React + Vite** (frontend) and **Node.js + Express** (backend), featuring GSAP animations, Framer Motion, and a contact form that delivers beautifully formatted emails directly to Gmail.

---

## 🗂️ Project Structure

```
portfolio/
├── frontend/          ← React + Vite SPA
│   ├── src/
│   │   ├── components/    ← Navbar, Hero, About, Skills, Services, Projects, Contact, Footer
│   │   ├── data/          ← portfolio.js  (all your info — edit this!)
│   │   ├── hooks/         ← useScrollSpy
│   │   ├── styles/        ← global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   └── .env.example
│
└── backend/           ← Node.js + Express API
    ├── api/
    │   └── index.js       ← all routes (contact, health, download-tracker)
    ├── package.json
    ├── vercel.json
    └── .env.example
```

---

## ✨ Features

### Frontend
- **One-page SPA** — React 18 + Vite 5, zero page reloads
- **GSAP animations** — 3D tilt on hero image, floating idle animation
- **Framer Motion** — staggered reveals, layout animations, scroll-triggered entries
- **Animated navbar logo** — drifts smoothly across the full nav width on `requestAnimationFrame`
- **Active nav tracking** — scroll-spy highlights current section
- **Skills section** — animated progress bars with category filter tabs
- **Projects grid** — category filtering with `AnimatePresence`, featured cards
- **Contact form** — project type, budget selector, validation, loading/success states
- **Performance** — CSS Modules (zero runtime), lazy `useInView`, passive scroll listeners
- **Responsive** — mobile-first, works on all screen sizes

### Backend
- **Contact form → Gmail** — beautifully HTML-formatted emails to you + auto-reply to sender
- **Rate limiting** — 5 messages per IP per 15 min (no spam)
- **Input validation & sanitization** — `validator.js`, length checks, email format
- **Helmet** security headers
- **CORS** — allow-list based
- **Resume download tracker** — optional email notification when someone downloads your CV
- **Vercel-ready** — single `api/index.js` serverless function

---

## 🚀 Local Development

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your Gmail credentials (see Gmail App Password section below)
npm run dev
# → Server on http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
npm install
# No .env needed for local dev — vite.config.js proxies /api → localhost:4000
npm run dev
# → App on http://localhost:5173
```

---

## 📧 Gmail App Password Setup

The backend uses **Nodemailer with Gmail**. You need a Gmail **App Password** (not your real password):

1. Enable **2-Step Verification** on your Google account:
   https://myaccount.google.com/security

2. Go to **App Passwords**:
   https://myaccount.google.com/apppasswords

3. Select **Mail** → **Other (custom name)** → name it "Portfolio"

4. Copy the generated 16-character password

5. Put it in `backend/.env`:
   ```
   GMAIL_USER=your.gmail@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

---

## 🌐 Deploy to Vercel

### Deploy Backend

```bash
cd backend
# Install Vercel CLI if needed: npm i -g vercel
vercel
# Follow prompts → set environment variables:
#   GMAIL_USER
#   GMAIL_APP_PASSWORD
#   NOTIFY_DOWNLOADS (optional, "true" to get notified on resume downloads)
```

Note your backend URL, e.g. `https://ali-portfolio-api.vercel.app`

### Deploy Frontend

```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=https://ali-portfolio-api.vercel.app/api
vercel
```

### Add Your Photo

Put your photo at `frontend/src/assets/ali.jpg`, then update `Hero.jsx`:

```jsx
// Replace the avatarPlaceholder div with:
<img src={aliPhoto} alt="Ali Maher" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

// And add this import at the top of Hero.jsx:
import aliPhoto from '../assets/ali.jpg';
```

---

## 🎨 Customization

All your personal data is in one file:

```
frontend/src/data/portfolio.js
```

Edit `PERSONAL`, `PROJECTS`, `SKILLS`, `SERVICES`, and `EDUCATION` — the rest updates automatically.

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend framework | React 18 + Vite 5 |
| Animations | GSAP 3 + Framer Motion 11 |
| Styling | CSS Modules + CSS Variables |
| Backend | Node.js + Express 4 |
| Email | Nodemailer (Gmail SMTP) |
| Security | Helmet + express-rate-limit + validator.js |
| Deployment | Vercel (both frontend + backend) |
| Fonts | Syne + DM Sans + JetBrains Mono |
