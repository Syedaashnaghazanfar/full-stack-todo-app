from sqlalchemy.orm import Session
from fastapi import Depends
from src.database.connection import SessionLocal

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
