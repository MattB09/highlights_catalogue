import React, {useState, useContext, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Books() {
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context);
    const [ books, setBooks ] = useState([]);

    useEffect(() => {
        if (state.data === undefined) return;
        setBooks(filterBooks(state.data));
    }, [state]);

    function setBookFilter(bId) {
        dispatch({type: 'setFilter', payload: {author: "", tag:"", book: bId}});
    }

    function filterBooks(data) {
        if (state.filters.author !== "") return data.books.filter(b => b.author_id === state.filters.author);
        if (state.filters.book !== "") return [data.books.find(b => b.id === state.filters.book)];
        if (state.filters.tag !== "") {
            let bookIds = data.highlights.filter(h => h.tags.find(t => t.id === state.filters.tag))
                .map(h => h.book.id);
            if (bookIds.length) return [data.books.find(b => bookIds.includes(b.id))];
            else return [];
        }
        return data.books; 
    }

    const deleteBook = async () => {
        if (books.length === 1) dispatch({type: 'clearFilters'});
        const deleted = await axios.delete(`/api/${currentUser.uid}/books/${selectedItem}`);
        dispatch({type: 'deleteBook', payload: deleted.data[0]});
        setSelectedItem(null);
        setDelModalShow(false);
    }

    const delClicked = (bookId) => {
        setDelModalShow(true);
        setSelectedItem(bookId);
    }

    async function submitFunc(e) {
        e.preventDefault();
        if (e.target.title.value === "") {
             alert("field must not be blank");
             return;
        }
        let newBook = {
            title: e.target.title.value,
            summary: e.target.summary.value,
            year_published: e.target.year_published.value || null,
            year_read: e.target.year_read.value || null,
            author_id: parseInt(e.target.author.value) || null,
        }
        const added = await axios.post(`/api/${currentUser.uid}/books`, newBook);
        added.data[0].name = state.data.authors.find(auth => auth.id === newBook.author_id).name;
        dispatch({type: 'addBook', payload: added.data[0]});
        setAddModalShow(false);
    }

    const bookForm = (
        <form onSubmit={submitFunc} className="b-form">
            <label for="book-title" className="title-label form-label">Title:</label>
            <input id="book-title" className="title-input" name="title" type="text" placeholder="title" required />

            <label for="summary" className="summary-label form-label">Summary:</label>
            <textarea id="summary" className="summary-input" name="summary" rows="3" columns="100" placeholder="Enter a summary..." />
            
            <label for="published" className="published-label form-label">Year published:</label>
            <input id="published" className="published-input" name="year_published" type="number" placeholder="year published" maxLength="4" />
            
            <label for="read" className="read-label form-label">Year read:</label>
            <input id="read" className="read-input" name="year_read" type="number" placeholder="year read" maxLength="4" />
            
            <label for="author-select" className="author-label form-label">Author:</label>
            <select id="author-select" className="author-select" name="author">
                <option value="null">Select Author</option>
				{state.data.authors && state.data.authors.map(a=> {
                    return <option key={a.id} value={a.id}>{a.name}</option>
                })}
			</select>
            <Button variant="primary" type="submit" className="b-save">Save</Button>
        </form>
    )

    const areYouSure = (
        <>
            <p>Deleting this book will delete all of it's highlights. It cannot be undone!</p>
            <Button variant="danger" onClick={deleteBook} >Delete</Button>
        </>
    )

    return (
        <div className="books filter-component">
            <h3>Books ({books.length || 0})</h3>
            <Button className="add-button" variant="primary" onClick={() => setAddModalShow(true)}>
                Add
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                title="Add Book"
                form={bookForm}
                size="md"
            />
            <ul>
                {
                    books.length > 0 && books.map(b => {
                        return (
                            <li className="filter-item" key={b.id}>
                                <Button className="small-button" variant="danger" onClick={() => delClicked(b.id)}>Del</Button>
                                <div className="filter-text" onClick={() => setBookFilter(b.id)}>
                                    <span className="book-title">{b.title}</span>
                                    {/* /* by <span className="book-author">{b.name || "unspecified"}</span> */}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            <ModalForm 
                show={delModalShow}
                onHide={() => setDelModalShow(false)}
                title="Delete Book"
                form={areYouSure}
                size="sm"
            /> 
        </div>
    )
}
