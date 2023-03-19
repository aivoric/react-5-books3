import { useState } from "react";
import useBooksContext from '../hooks/use-books-context';

function BookEdit({ book, onSaveChanges }) {
    const [title, setTitle] = useState(book.title);
    const { editBookById } = useBooksContext();

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveChanges();
        editBookById(book.id, title);
    };

    return (
        <form onSubmit={handleSubmit} className="book-edit">
            <label>Title</label>
            <input value={title} className="input" onChange={handleChange}/>
            <button className="button is-primary">
                Save Changes
            </button>
        </form>
    )
}

export default BookEdit;