# Deployment Guide — Render (backend) + Netlify (frontend)

This document describes how to connect the repository to Render (backend) and Netlify (frontend) using the provided templates and GitHub Actions workflows.

1) Add required GitHub Secrets

- Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret.
- Add the following secrets:
  - `RENDER_SERVICE_ID` — Render service id (for `renderinc/action-deploy`).
  - `RENDER_API_KEY` — Render API key with deploy permissions.
  - `NETLIFY_AUTH_TOKEN` — Personal access token for Netlify.
  - `NETLIFY_SITE_ID` — Netlify site id for your site.
  - `SENTRY_DSN` — (optional) Sentry DSN for error tracking.

2) Backend (Render)

- We included a `deployment/render.yaml` and a sample `deployment/Dockerfile`.
- The GitHub Action `backend-cd-render.yml` will call `renderinc/action-deploy` using `RENDER_SERVICE_ID` and `RENDER_API_KEY` secrets.
- Steps to deploy:
  1. Create a new Web Service in Render (select Node environment) and connect your GitHub repo OR use the `render.yaml` configuration.
  2. Set environment variables in Render's dashboard (e.g., `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`, `SENTRY_DSN`).
  3. Add `RENDER_SERVICE_ID` and `RENDER_API_KEY` to GitHub Secrets.
  4. Push to `main` — GitHub Actions will run CI and then `backend-cd-render.yml` will deploy.

3) MongoDB Atlas setup (backend)

- Create a MongoDB Atlas cluster if you haven't already.
- Create a database user with a strong password and give it access to the cluster.
- Obtain the connection string (connection URI). It will look like:

```
mongodb+srv://<dbUser>:<password>@cluster0.abcd123.mongodb.net/myDatabase?retryWrites=true&w=majority
```

- Add the connection string to your Render service environment variables as `MONGODB_URI` and (optionally) add the same string as a GitHub Actions secret `MONGODB_URI` if you need to reference it in workflows.
- In the sample backend, if `MONGODB_URI` is present the app will attempt to connect on startup and `/health` will include `dbStatus: connected|connecting|error`.

4) Frontend (Netlify)

- We included a `netlify.toml` and a minimal `frontend/` placeholder that builds to `frontend/build`.
- The GitHub Action `frontend-cd-netlify.yml` builds `frontend/` and uses `nwtgck/actions-netlify` to deploy using `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.
- Steps to deploy:
  1. Create a new site on Netlify and link the GitHub repository, or create a site and note the `Site ID`.
  2. In Netlify, set any required environment variables for build (if your React app needs them).
  3. Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` to GitHub Secrets.
  4. Push to `main` — the `frontend-cd-netlify.yml` workflow will build and deploy automatically.

4) Local testing

- Backend:
  - From the repo root:

```powershell
Push-Location .\backend
npm install
npm test
npm start
Pop-Location
```

- Frontend placeholder:
  - The `frontend` folder contains your Vite React app that builds to `frontend/dist/`. To build locally:

```powershell
Push-Location .\frontend
npm install
npm run build
Pop-Location
```

5) Sentry (optional)

- If you use Sentry, set `SENTRY_DSN` in GitHub Secrets and in your Render environment variables. The sample backend initializes Sentry when `SENTRY_DSN` is present.

6) Notes & troubleshooting

- If your repository already contains a frontend React app, it is now in `frontend/` (the Vite build outputs to `frontend/dist/`).
- For production, ensure proper security: use least-privilege DB user roles, restrict IP access, rotate credentials, enable backups.
