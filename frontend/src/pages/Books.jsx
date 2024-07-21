import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

export const Books = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/books')
            .then(res => {
                setBooks(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


  return (
    <div>Books</div>
  )
}
