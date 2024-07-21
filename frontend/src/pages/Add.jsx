import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Add = () => {
    const [book, setBook] = useState({
        title: '',
        desc: '',
        cover: ''
    });

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/books', book);
            // can also be done with:
            //const response = await fetch('http://localhost:8000/books', {
            //    method: 'POST',
            //    headers: {
            //        'Content-Type': 'application/json'
            //    },
            //    body: JSON.stringify(book)
            //});
            console.log(response);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    console.log(book);

  return (
    <div className='form'>
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
    { error && <p>There was an error updating the book</p> }
    <Link to="/"> Back to books</Link>
        </div>
  )
}
