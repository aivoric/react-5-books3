import { useState, useContext } from "react";
import BooksContext from "../context/books";

function BookCreate() {
    const [bookName, setBookName] = useState("");
    const { createBook } = useContext(BooksContext);

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