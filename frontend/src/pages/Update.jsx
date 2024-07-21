import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

export const Update = ({ isOpen, onClose, bookInfo, onBookUpdated }) => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    cover: ''
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    if (bookInfo) {
      setBook(bookInfo);
    }
  }, [bookInfo]);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/books/${book.id}`, book);
      onBookUpdated(); // Call the callback function
      onClose();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Book"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button className="close-button" onClick={onClose}>&times;</button>
      <div className="form">
        <h1>Update the Book</h1>
        <input
          type="text"
          value={book.title}
          placeholder="Book title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          rows={5}
          value={book.desc}
          type="text"
          placeholder="Book desc"
          name="desc"
          onChange={handleChange}
        />
        <input
          type="text"
          value={book.cover}
          placeholder="Book cover"
          name="cover"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Update</button>
        {error && <p>There was an error updating the book</p>}
      </div>
    </Modal>
  );
};
