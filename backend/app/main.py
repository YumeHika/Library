# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints.book import router as book_router
import logging

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include routers from different modules
app.include_router(book_router, prefix="/api/book", tags=["books"])

# Root endpoint
@app.get("/")
async def read_root():
    # logger.info("Welcome to the FastAPI application!")
    return {"message": "Welcome to the FastAPI application!"}