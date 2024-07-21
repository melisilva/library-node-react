import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

export const Add = ({ isOpen, onClose, onBookAdded }) => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    cover: ''
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/books', book);
      onBookAdded(); // Call the callback function
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
      contentLabel="Add Book"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button className="close-button" onClick={onClose}>&times;</button>
      <div className="form">
        <h1>Add a New Book</h1>
        <input
          type="text"
          placeholder="Book title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          rows={5}
          type="text"
          placeholder="Book desc"
          name="desc"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Book cover"
          name="cover"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Add</button>
        {error && <p>There was an error adding the book</p>}
      </div>
    </Modal>
  );
};
