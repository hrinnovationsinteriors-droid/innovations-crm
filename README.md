# Innovations Interior & Exterior — CRM

A project/team operations dashboard, ready to deploy live in about 10 minutes.

## What's in this folder
- `src/App.jsx` — your CRM (all the code you built)
- `src/main.jsx`, `index.html`, `vite.config.js`, `package.json` — the wrapper that turns it into a deployable website

## Step 1 — Put this on GitHub (5 min)
1. Go to https://github.com and create a free account if you don't have one.
2. Click the **+** icon top-right → **New repository**.
3. Name it `innovations-crm`, leave it Public or Private (either works), click **Create repository**.
4. On the next page, click **uploading an existing file**.
5. Drag this ENTIRE folder's contents into the upload box (all files, including the `src` folder).
6. Click **Commit changes**.

## Step 2 — Deploy on Vercel (3 min)
1. Go to https://vercel.com and click **Sign Up** → choose **Continue with GitHub** (uses the account from Step 1).
2. Click **Add New... → Project**.
3. Find `innovations-crm` in the list and click **Import**.
4. Leave all settings as default (Vercel auto-detects Vite) and click **Deploy**.
5. Wait ~1 minute. You'll get a live link like `innovations-crm.vercel.app` — this is your CRM, live on the internet.

## Step 3 — Making changes later
Once this is on GitHub, you (or Claude Code) can edit `src/App.jsx` and push the change —
Vercel automatically redeploys within about a minute. No re-uploading, no manual steps.

If you're using **Claude Code**: just open this project folder and type what you want changed
(e.g. "add a filter for Hospitality projects" or "make the status badges bigger") — it will edit
the file and push it for you if connected to git.

## Important note on data
This CRM currently stores data (progress, uploads, settings) in the browser's local storage.
That means each person's device keeps its own copy — team members won't automatically see each
other's updates. This is fine for solo/testing use. If you want everyone on the team to see the
same live data, the next step is adding a small shared database (e.g. Supabase — free tier is
enough for this size of team). Happy to help with that whenever you're ready.
