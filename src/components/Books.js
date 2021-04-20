import React, {useState, useContext} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Books({ books, authors, highlights, setFilters, loadData, clearFilters }) {
    // const [addModalShow, setAddModalShow] = useState(false);
    // const [delModalShow, setDelModalShow] = useState(false);
    // const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context);

    // const handleAddShow = () => setAddModalShow(true); 
    // const handleAddHide = () => setAddModalShow(false);

    // const handleDelShow = () => setDelModalShow(true); 
    // const handleDelHide = () => setDelModalShow(false);

    const setBookFilter = (e) => {
        dispatch({type: 'setFilter', payload: {author: "", tag:"", book: e.currentTarget.value}});
    }

    // const deleteBook = async () => {
    //     let relatedH = highlights.filter(h => h.book.id === selectedItem)
    //     if (relatedH.length) {
    //         for (const h of relatedH) {
    //             await axios.delete(`/api/${currentUser.uid}/highlights/${h.id}`);
    //         }
    //     }
    //     await axios.delete(`/api/${currentUser.uid}/books/${selectedItem}`);
    //     clearFilters();
    //     handleDelHide();
    //     await loadData();
    //     setSelectedItem(null);
    // }

    // const delClicked = (e) => {
    //     handleDelShow();
    //     setSelectedItem(e.target.parentElement.value);
    // }

    // const submitFunc = async (e) => {
    //     e.preventDefault();
    //     if (e.target.title.value === "") {
    //          alert("field must not be blank");
    //          return;
    //     }
    //     let newBook = {
    //         title: e.target.title.value,
    //         summary: e.target.summary.value,
    //         year_published: e.target.year_published.value || null,
    //         year_read: e.target.year_read.value || null,
    //         author_id: parseInt(e.target.author.value) || null,
    //     }
    //     await axios.post(`/api/${currentUser.uid}/books`, newBook);
    //     loadData();
    //     handleAddHide();
    // }

    // const bookForm = (
    //     <form onSubmit={submitFunc}>
    //         <label>
    //             Title
    //             <input name="title" type="text" placeholder="title" required />
    //         </label>
    //         <label>
    //             Summary
    //             <textarea name="summary" rows="3" columns="100" placeholder="Enter a summary..." />
    //         </label>
    //         <label>
    //             Year published
    //             <input name="year_published" type="number" placeholder="year published" maxLength="4" />
    //         </label>
    //         <label>
    //             Year read
    //             <input name="year_read" type="number" placeholder="year read" maxLength="4" />
    //         </label>
    //         <select name="author">
    //             <option value="null">Select Author</option>
	// 			{authors && authors.map(a=> {
    //                 return <option value={a.id}>{a.name}</option>
    //             })}
	// 		</select>
    //         <Button variant="primary" type="submit">Save</Button>
    //     </form>
    // )

    // const areYouSure = (
    //     <>
    //         <p>Deleting this book will delete all of it's highlights. It cannot be undone!</p>
    //         <Button variant="danger" onClick={deleteBook} >Delete</Button>
    //     </>
    // )

    return (
        <div className="books filter-component">
            <h3>Books ({(state.data !== undefined && state.data.books.length) || 0})</h3>
            {/* <Button className="add-button" variant="primary" onClick={handleAddShow}>
                Add
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={handleAddHide}
                title="Add Book"
                form={bookForm}
                size="lg"
            /> */}
            <ul>
                {
                    state.data !== undefined && state.data.books.length 
                    ? state.data.books.map(b => {
                        return (
                            <li 
                                key={b.id}
                                value={b.id}
                                onClick={setBookFilter}>
                                {/* <Button className="delete-button" variant="danger" onClick={delClicked}>Del</Button>
                                <ModalForm 
                                    show={delModalShow}
                                    onHide={handleDelHide}
                                    title="Delete Book"
                                    form={areYouSure}
                                    size="sm"
                                /> */}
                                <span className="book-title">{b.title}</span> by <span className="book-author">{b.name || "unspecified"}</span>
                            </li>
                        );
                    })
                    : null
                }
            </ul>   
        </div>
    )
}
