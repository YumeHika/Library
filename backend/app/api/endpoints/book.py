# books.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.models import Book

router = APIRouter()

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
async def get_books(db: Session = Depends(get_db)):
    books = db.query(Book).all()
    return books

@router.post("/")
async def create_book(book: dict, db: Session = Depends(get_db)):
    db_book = Book(title=book['title'], author=book['author'])
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return {"message": "Book created", "book": db_book}