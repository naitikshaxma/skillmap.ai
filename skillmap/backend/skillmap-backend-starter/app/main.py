from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base
from app.routes.auth import router as auth_router
from app.routes.skillgap import router as skillgap_router

app = FastAPI(title="SkillMap AI Backend")

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Uncomment if you want DB tables auto-create
# Base.metadata.create_all(bind=engine)

# Existing routes
app.include_router(auth_router)

# Skill Gap route
app.include_router(skillgap_router)

@app.get("/")
def root():
    return {"message": "SkillMap AI backend is running"}

