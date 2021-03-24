import React, {useState, useContext} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import axios from "axios";

export default function Books({ books, authors, filterFunc, setData, userData, loadData }) {
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleAddShow = () => setAddModalShow(true); 
    const handleAddHide = () => setAddModalShow(false);

    const handleDelShow = () => setDelModalShow(true); 
    const handleDelHide = () => setDelModalShow(false);

    const deleteBook = async () => {
        alert("deleted");
        // let hIds = tagsH.filter(row => row.tag_id === selectedItem).map(row => row.highlight_id);
        // let hIdsStr = hIds.join('-');
        // if (hIds.length) await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}/highlights/${hIdsStr}`);
        // await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}`);
        // loadData();
        // handleDelHide();
        // setSelectedItem(null)
    }

    const delClicked = (e) => {
        handleDelShow();
        setSelectedItem(e.target.parentElement.value);
        alert(selectedItem);
    }

    const submitFunc = async (e) => {
        e.preventDefault();
        if (e.target.title.value === "") {
             alert("field must not be blank");
             return;
        }
        let newBook = {
            title: e.target.title.value,
            summary: e.target.summary.value,
            year_published: e.target.year_published.value,
            year_read: e.target.year_read.value,
            author_id: parseInt(e.target.author.value),
        }
        let added = await axios.post(`/api/${currentUser.uid}/books`, newBook);
        added = added.data[0];
        let allData = { ...userData };
        allData.Books.push(added);
        setData(allData);
        handleAddHide();
    }

    const bookForm = (
        <form onSubmit={submitFunc}>
            <label>
                Title
                <input name="title" type="text" placeholder="title" required />
            </label>
            <label>
                Summary
                <textarea name="summary" rows="3" columns="100" placeholder="Enter a summary..." />
            </label>
            <label>
                Year published
                <input name="year_published" type="number" placeholder="year published" maxLength="4" />
            </label>
            <label>
                Year read
                <input name="year_read" type="number" placeholder="year read" maxLength="4" />
            </label>
            <select name="author">
                <option value="null">Select Author</option>
				{userData.Authors && userData.Authors.map(a=> {
                    return <option value={a.id}>{a.name}</option>
                })}
			</select>
            <Button variant="primary" type="submit">Save</Button>
        </form>
    )

    const areYouSure = (
        <>
            <p>Deleting this book delete all of it's highlights. It cannot be undone!</p>
            <Button variant="danger" onClick={deleteBook} >Delete</Button>
        </>
    )


    // add author names to booklist
    if (books && authors) {
        for (const book of books) {
            if (book.author_id) {
                book.author = authors.find(auth => book.author_id === auth.id).name;
            }
        }
    }

    return (
        <div className="books">
            <h3>Books ({books && books.length})</h3>
            <Button variant="primary" onClick={handleAddShow}>
                Add
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={handleAddHide}
                title="Add Book"
                form={bookForm}
                size="lg"
            />
            <ul>
                {
                    books && books.map(b => {
                        return (
                            <li 
                                key={b.id}
                                value={b.id}
                                onClick={filterFunc}>
                                <Button variant="danger" onClick={delClicked}>Del</Button>
                                <ModalForm
                                    show={delModalShow}
                                    onHide={handleDelHide}
                                    title="Delete Book"
                                    form={areYouSure}
                                    size="sm"
                                />
                                <span className="book-title">{b.title}</span> by <span className="book-author">{b.author || "unspecified"}</span>
                            </li>
                        );
                    })
                }
            </ul>   
        </div>
    )
}
