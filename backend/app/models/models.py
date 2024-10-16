# book.py
from sqlalchemy import Column, Integer, String
from db.session import Base
from pydantic import BaseModel

class Book(Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String)
    description = Column(String)

class File(BaseModel):
    file_path: str
    file_name: str




