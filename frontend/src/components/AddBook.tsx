// src/components/AddBook.tsx
import React, { useState } from 'react';
import { Book } from '../types';
import '../index.css';

interface AddBookProps {
    onAddBook: (book: Book) => void;
}

const AddBook: React.FC<AddBookProps> = ({ onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newBook: Book = {
            title,
            author,
            description: '',
        };
    
        // API request to add the new book
        try {
            const response = await fetch('http://127.0.0.1:8000/api/book/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Optionally handle the response if needed
            const data = await response.json();
            onAddBook(data); // Use the response data if necessary
        } catch (error) {
            console.error('Error adding book:', error);
        }
        setTitle('');
        setAuthor('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;