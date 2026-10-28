# MERN Tic Tac Toe + GitHub Actions

A small React + Vite frontend and Express backend for learning CI.

## Requirements
- Node.js 20+
- npm

## Run locally
From this folder:
```bash
npm install
npm run install:all
npm run dev
```
Open the Vite URL shown in the terminal (usually http://localhost:5173).
Backend health endpoint: http://localhost:5000/api/health

## CI
`.github/workflows/ci-cd.yml` installs dependencies, tests the Express API, and builds React on pushes and pull requests to `main`.

Note: GitHub Pages hosts static frontend files only, not the Express backend. Deployment can be added after CI works.
