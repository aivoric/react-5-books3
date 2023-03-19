import { useState } from "react";
import useBooksContext from '../hooks/use-books-context';

function BookCreate() {
    const [bookName, setBookName] = useState("");
    const { createBook } = useBooksContext()

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createBook(bookName);
        setBookName('');
    }

    const updateBookName = (e) => {
        setBookName(e.target.value);
    }

    return (
        <div className="book-create">
            <h3> Add a Book</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input className="input" value={bookName} onChange={updateBookName}></input>
                <button className="button">Create</button>
            </form>
        </div>
    )
}

export default BookCreate;