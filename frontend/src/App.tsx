// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import { Book } from './types';

const App: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const addBook = (book: Book) => {
        setBooks((prevBooks) => [...prevBooks, book]);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <h1 className="text-4xl text-center py-6">Welcome to the Library</h1>
                <nav className="bg-white shadow">
                    <ul className="flex justify-center space-x-4 p-4">
                        <li>
                            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link to="/add" className="text-blue-500 hover:underline">Add Book</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/add" element={<AddBook onAddBook={addBook} />} />
                    <Route path="/" element={<BookList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;