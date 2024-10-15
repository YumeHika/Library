import React, { useEffect, useState } from 'react';
import '../index.css';

const BookList: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/book/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <h2 className="text-center text-lg">Loading...</h2>;
    }

    if (error) {
        return <h2 className="text-center text-red-500">Error: {error}</h2>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Books</h2>
            <ul role="list" className="grid gap-x-8 gap-y-10 sm:grid-cols-5 sm:gap-y-16 xl:col-span-10">
                {data.map((item, index) => (
                    <li>
                        <div className="flex items-center gap-x-6">
                            <div>
                                <h1 className="text-base font-semibold tracking-tight text-gray-900">{item.title}</h1>
                                <h5 className="text-base tracking-tight text-gray-900">{item.author}</h5>
                                <p className="text-sm font-semibold text-indigo-600">{item.description}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;