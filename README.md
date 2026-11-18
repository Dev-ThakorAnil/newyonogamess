# NewYonoGamess Portal (https://newyonogamess.tech) (Multi-Game Web App)

A modern, fast, SEO-optimized web application for downloading APK games, focusing on **both Yono Games and Diwa Games** (Rummy, Teen Patti, Casino, and Slots).

This app is connected to the **same shared database** as `diwalatestgames.com`. When an admin adds, edits, or deletes a game from either admin panel, it is immediately updated across **both websites**!

---

## 🚀 Key Features

1. **Shared Database & Unified Content**:
   - Single MongoDB Atlas database.
   - Any game created in the admin panel automatically appears on both `diwalatestgames.com` and this new portal.
2. **Three-Way Filtering**:
   - **All Games Tab**: Shows both Diwa and Yono games together.
   - **Yono Games Tab**: Filters only games tagged as `yono`.
   - **Diwa Games Tab**: Filters only games tagged as `diwa`.
3. **SEO & Performance**:
   - Next.js 16 (App Router) + React 19 + Tailwind CSS.
   - Automated sitemaps (`/sitemap.xml`), `robots.txt`, Schema.org structured data, and dynamic OpenGraph previews.
4. **Cloudinary Asset Storage**:
   - Fast CDN delivery for logos, banners, and screenshots.
5. **Admin Panel Included**:
   - Accessible at `/admin` to manage games, categories, positions, and download stats.

---

## 📁 Project Structure

```
f:\yonodiwagames\
├── backend/                  # Node.js / Express API
│   ├── config/               # Database connection (MongoDB)
│   ├── models/               # Game, Category, Admin schemas
│   ├── routes/               # API routes (/api/games, /api/admin, etc.)
│   ├── utils/                # Cloudinary upload helpers
│   ├── server.js             # Main server entrypoint
│   └── .env                  # Backend configuration & MongoDB URI
│
├── frontend/                 # Next.js 16 Frontend
│   ├── app/                  # App router pages (Home, Game details, Admin, Search)
│   ├── components/           # UI components, layout, navbar, cards
│   ├── lib/                  # API client, types, utilities
│   ├── public/               # Static assets & logos
│   └── .env.local            # Frontend environment variables
│
└── DEPLOYMENT.md             # Complete deployment guide
```

---

## ⚡ Quick Start (Local Development)

### 1. Run Backend
```bash
cd f:\yonodiwagames\backend
npm install
npm start
```
Runs on `http://localhost:5000`.

### 2. Run Frontend
```bash
cd f:\yonodiwagames\frontend
npm install
npm run dev
```
Runs on `http://localhost:3000` (or `3001`).

---

## 🏷️ How to Change the Brand Name Later

When you decide on the final name of your app (e.g. `yonorummygames.com`):
1. **Frontend App Title & SEO**: Open `frontend/app/layout.tsx` and change `title`, `description`, and `siteName`.
2. **Navbar & Footer**: Open `frontend/components/layout/Navbar.tsx` and `Footer.tsx` and replace "Yono & Diwa Games" with your brand name.
3. **Hero Banner**: Open `frontend/components/home/TopSection.tsx` to customize the main header text.
4. **Logo**: Replace `frontend/public/logo.png` and `logo1.png` with your new brand's logo.

