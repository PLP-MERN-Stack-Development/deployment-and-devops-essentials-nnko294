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

3) Frontend (Netlify)

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
  - The `frontend` folder contains a minimal static site and a `build` script that copies `public/` to `build/` for Netlify. To build locally:

```powershell
Push-Location .\frontend
npm install
npm run build
Pop-Location
```

5) Sentry (optional)

- If you use Sentry, set `SENTRY_DSN` in GitHub Secrets and in your Render environment variables. The sample backend initializes Sentry when `SENTRY_DSN` is present.

6) Notes & troubleshooting

- If your repository already contains a frontend React app, move it into `frontend/` or update the workflows to point to your existing path.
- The minimal frontend placeholder is intended only to allow CI/CD flow demonstration; replace it with your real app before final submission.
