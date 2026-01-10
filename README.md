# Skillmap

This repository contains the Skillmap project (backend and frontend). It has been prepared for submission and easy running by judges.

## Contents
- `backend/skillmap-backend-starter` — FastAPI backend
- `frontend/skillmap-insights-main` — Vite + React frontend

## Quickstart (Docker Compose - recommended)
Requires Docker and Docker Compose.

From repository root:

```bash
docker-compose up --build
```

This will start:
- Backend on `http://localhost:8000`
- Frontend on `http://localhost:5173` (or Vite default port)

## Quickstart (Local, without Docker)

Backend:

```bash
cd backend/skillmap-backend-starter
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
# source .venv/bin/activate
pip install -r requirements.txt
# Run (common pattern for FastAPI projects)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Frontend:

```bash
cd frontend/skillmap-insights-main
# Using npm
npm install
npm run dev
```

If the frontend uses `bun` you can run `bun install` then `bun run dev`.

## Windows (PowerShell) — explicit steps for judges

**Backend (Windows PowerShell)**

- **Path**: `backend/skillmap-backend-starter`
- **Setup & run**:

```powershell
cd backend\skillmap-backend-starter
python -m venv .venv
# Activate (PowerShell)
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
# Run FastAPI app
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- **If `uvicorn` not installed**: `pip install "uvicorn[standard]"`

**Frontend (Windows PowerShell)**

- **Path**: `frontend/skillmap-insights-main`
- **Using npm**:

```powershell
cd frontend\skillmap-insights-main
npm ci
npm run dev
```

- **Using bun (if project uses bun)**:

```powershell
cd frontend\skillmap-insights-main
bun install
bun run dev
```

**Run both**
- Open two PowerShell windows: run backend in one, frontend in the other.
- Backend default: `http://localhost:8000` — Frontend default: `http://localhost:5173`

**Troubleshooting / notes**
- If PowerShell blocks activation, run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
- If ports conflict, change `--port` flags or stop the conflicting process.
- If `pip install` errors, run `python -m pip install --upgrade pip setuptools wheel` first.
- Ensure Node 18+ for the frontend; check with `node -v`.

## GitHub Actions (CI)
A workflow is included to validate that the backend and frontend install correctly.

## Notes for judges
- No application code was modified.
- If ports conflict, stop the occupying process or change ports in `docker-compose.yml`.
- If any dependency fails to install, please open an issue in the repo and include the OS and error log.

## License
This repository contains a `LICENSE` file (MIT). If your project has a different license, replace it.

