import axios from 'axios';
import { createContext, useState, useCallback } from 'react';

const BooksContext = createContext();

function Provider({ children }) {
    const [books, setBooks] = useState([]);

    const editBookById = async (id, title) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title
        });
        
        const updatedBooks = books.map((book) => {
            if(book.id === id) {
                return {...book, ...response.data};
            }
            return book;
        });
        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`)
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });
        setBooks(updatedBooks);
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });
        const updatedBooks = [
            ...books, 
            response.data
        ];
        setBooks(updatedBooks);
    };

    // useCallback creates a memory reference to an object which doesn't 
    // change with every re-render. This helps solve the problem where
    // you only need to run something once during the first render
    // It is somewhat similar to useEffect, but they can be combined together
    // useEffect received a second parameter inside [] which tells useEffect
    // to only run a function when the object inside the [] changes. If you 
    // don't wrap the object inside the [] with useCallback, then react will
    // keep on thinking that it is always a new object because with every 
    // re-render all function are re-created and point to a new place in memory
    // which makes react think inside of useEffect that it needs to re-render.
    // Watch this: https://www.udemy.com/course/react-redux/learn/lecture/34694894#overview
    // Read this: https://www.notion.so/ivankhokhlov/useCallback-ea00d9a6975442089dfdf1d60de23c96?pvs=4
    const fetchBooks = useCallback(async () => {
        const response = await axios.get("http://localhost:3001/books");
        setBooks(response.data);
    }, []);

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };

    return (
        <BooksContext.Provider value={valueToShare}>
            {children}
        </BooksContext.Provider>
    );
};

export { Provider };
export default BooksContext;