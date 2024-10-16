// src/components/AddBook.tsx
import React, { useState } from 'react';
import { Book } from '../types';
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface AddBookProps {
    onAddBook: (book: Book) => void;
}

const AddBook: React.FC<AddBookProps> = ({ onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState('');
    const [file_name, setFileName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newBook: Book = {
            title,
            author,
            description,
            file_name,
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

            const data = await response.json();
            const presignedUrl = data.presigned_url;

            // Log the presigned URL and the file name
            console.log('Presigned URL:', presignedUrl);
            console.log('File to upload:', file);
            console.log('File name:', file_name);

            // Upload the file to MinIO using the presigned URL
            if (file && presignedUrl) {
                const uploadResponse = await fetch(presignedUrl, {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': file.type, // Set the content type based on the file
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error('File upload failed');
                }
            }
            onAddBook(data); // Use the response data if necessary
            setNotification('Book added successfully!'); // Set success message
            setTimeout(() => {
                navigate('/'); // Navigate to book list after 2 seconds
            }, 2000);
        } catch (error) {
            console.error('Error adding book:', error);
            setNotification('Failed to add book. Please try again.'); // Set error message
        }
        setTitle('');
        setAuthor('');
        setDescription('');
        setFileName('');
        setFile(null);
    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                    </label>
                    <div className="mt-2">
                        <input
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Author
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Upload File
                    </label>
                    <div className="mt-2">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                        />
                        {file_name && (
                            <p className="mt-1 text-sm text-gray-600">
                                Selected file: {file_name}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;