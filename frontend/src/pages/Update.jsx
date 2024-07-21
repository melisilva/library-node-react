import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const Update = () => {
    const [book, setBook] = useState({
        title: '',
        desc: '',
        cover: ''
    });

    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.pathname.split('/')[2];

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/books/${bookId}`, book);
            console.log(response);  
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

  return (
    <div className="form">
    <h1>Update the Book</h1>
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
    <button onClick={handleClick}>Update</button>
    { error && <p>There was an error updating the book</p> }
    <Link to="/"> Back to books</Link>
  </div>
);
}
