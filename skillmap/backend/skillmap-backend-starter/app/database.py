import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Read database URL from environment for production; keep local fallback
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://postgres:rememberit@localhost:5432/skillmap",
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
from sqlalchemy.orm import Session


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

