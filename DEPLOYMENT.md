# Deployment Guide for NewYonoGamess (https://newyonogamess.tech)

This guide explains how to deploy your new web app and how the shared backend/database setup works in production.

---

## 🏗️ Architecture Options

You have two simple options for deployment:

### Recommended Option: Share the Existing Backend
Since your backend is already deployed on Render (`https://diwalatestgames.onrender.com/api`):
- You **only need to deploy this new frontend** (e.g. to Vercel).
- Set `NEXT_PUBLIC_API_URL=https://diwalatestgames.onrender.com/api` on Vercel.
- On your Render backend dashboard, update the `FRONTEND_URL` environment variable to include your new domain:
  ```env
  FRONTEND_URL=https://diwalatestgames.com,https://newyonogamess.tech
  ```
- **Benefit**: Zero extra hosting cost for backend, instant real-time sync across both sites!

### Option B: Deploy a Second Backend Instance
If you prefer a separate backend service for the new domain:
- Deploy `f:\yonodiwagames\backend` to Render or Railway.
- In the new backend environment variables, provide the **same MongoDB URI**:
  ```env
  MONGODB_URI=mongodb+srv://thakoranil2020_db_user:eDAjLkBYDZqE7b3D@cluster0.fq0xij1.mongodb.net/diwalatestgames?appName=Cluster0
  ```
- Because both backends point to the identical MongoDB database cluster, every game added from either backend or admin panel is instantly in the same database.

---

## 🚀 Step-by-Step Frontend Deployment (Vercel)

1. **Push your code to GitHub / GitLab:**
   ```bash
   cd f:\yonodiwagames
   git init
   git add .
   git commit -m "Initial commit for Yono & Diwa Games App"
   git remote add origin https://github.com/your-username/your-new-repo.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your new repository.
   - Set **Root Directory** to `frontend`.

3. **Configure Environment Variables in Vercel:**
   | Variable | Value |
   | :--- | :--- |
   | `NEXT_PUBLIC_API_URL` | `https://diwalatestgames.onrender.com/api` |
   | `NEXT_PUBLIC_SITE_URL` | `https://newyonogamess.tech` |
   | `REVALIDATION_TOKEN` | (Same token as configured in backend) |

4. **Deploy:**
   - Click **Deploy**. Vercel will build the Next.js application and provide your live URL.
   - Add your custom domain in Vercel project settings (`Domains` tab).

---

## 🔒 Render Backend CORS Update

To ensure the backend accepts API requests from your new Vercel domain:
1. Go to your [Render Dashboard](https://dashboard.render.com).
2. Open your backend web service (`diwalatestgames`).
3. Go to **Environment**.
4. Update `FRONTEND_URL`:
   ```
   https://diwalatestgames.com,https://newyonogamess.tech
   ```
5. Save changes. Render will automatically redeploy with the updated CORS settings.

