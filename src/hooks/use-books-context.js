import { useContext } from 'react';
import BooksContext from '../context/books';

// This is a custom hook:
function useBooksContext() {
    return useContext(BooksContext);
}

export default useBooksContext;

