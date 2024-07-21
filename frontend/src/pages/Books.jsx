import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Update } from './Update';
import { Add } from './Add';

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/books');
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedBook(null);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleBookAdded = () => {
    fetchBooks(); // Refresh book list after adding a new book
  };

  const handleBookUpdated = () => {
    fetchBooks(); // Refresh book list after updating a book
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
            <div className="book-buttons">
              <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
              <button className="update" onClick={() => handleUpdateClick(book)}>Update</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-book-button" onClick={handleAddClick} style={{ color: '#fff', textDecoration: 'none' }}>
        Add new book
      </button>
      <Update isOpen={showUpdateModal} onClose={closeUpdateModal} bookInfo={selectedBook} onBookUpdated={handleBookUpdated} />
      <Add isOpen={showAddModal} onClose={closeAddModal} onBookAdded={handleBookAdded} />
    </div>
  );
};
