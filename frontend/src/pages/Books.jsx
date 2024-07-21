import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Update } from './Update';
import '../Modal.css'; // Import the CSS file

export const Books = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/books')
            .then(res => {
                setBooks(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/books/${id}`);
            if (response.status === 200) {
                console.log('Book deleted');
                setBooks(books.filter(book => book.id !== id));
            } else {
                console.log('Error deleting book');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateClick = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBook(null);
    };

    return (
        <div>
            <h1>Melbat's Cozy Book Corner</h1>
            <div className='books'>
                {books.map(book => (
                    <div key={book.id} className='book'>
                        {book.cover && <img src={book.cover} alt={book.title} />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className="update" onClick={() => handleUpdateClick(book)}>Update</button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add new book</Link></button>
            <Update isOpen={showModal} onClose={closeModal} bookInfo={selectedBook} />
        </div>
    );
};
