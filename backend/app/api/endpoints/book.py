# books.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.models import Book, File
from lib.minio import MinioClientAPI
import logging
logger = logging.getLogger(__name__)

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
    # log get books
    logger.info("get books success: %s", books)
    return books

@router.post("/")
async def create_book(book: dict, db: Session = Depends(get_db)):
    db_book = Book(title=book['title'], author=book['author'])
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    # upload file to minio
    minio_api = MinioClientAPI("localhost:9000", "saa", "su290303", secure=False)
    url = minio_api.generate_presigned_url("mybucket", book['file_name'])
    # log create book
    logger.info("create book success")
    return {"message": "Book created", "book": db_book, "presigned_url": url}



