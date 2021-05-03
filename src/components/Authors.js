import React, {useState, useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Authors() {
<<<<<<< Updated upstream
    // ------------------------- useStates and useContext ------------------------
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context);
    
=======
    // ---------------------- useStates ---------------------
>>>>>>> Stashed changes
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [editAuthorVal, setEditAuthorVal] = useState(null);

<<<<<<< Updated upstream
    // ------------------------- useEffect -------------------------------------
=======
    // -------------------- useEffect -----------------------------
>>>>>>> Stashed changes
    useEffect(() => {
        if (state.data === undefined) return;
        setAuthors(filterAuthors(state.data));
    }, [state.filters, state.data.authors]);

<<<<<<< Updated upstream
    // ------------------------- filtering -----------------------------------
=======
    // -------------------- filtering-----------------------------
>>>>>>> Stashed changes
    function filterAuthors(data) {
        if (state.filters.author !== "") return [data.authors.find(a => a.id === state.filters.author)];
        if (state.filters.book !== "") {
            let authId = data.books.find(b => b.id === state.filters.book);
            if (authId) return [data.authors.find(a => a.id === authId.author_id)];
            return [];
        }
        if (state.filters.tag !== "") {
            let authIds = data.highlights.filter(h => h.tags.find(t => t.id === state.filters.tag))
                .map(h => h.book.author_id);
            if (authIds.length) return [data.authors.find(a => authIds.includes(a.id))];
            return [];
        }
        return data.authors; 
    }

    function setAuthFilter(aId) {
        dispatch({type: 'setFilter', payload: {book: "", tag: "", author: aId}});
    }

<<<<<<< Updated upstream
    // ------------------------- Add Author -----------------------------------
=======
    // -------------------- Add Author -----------------------------
>>>>>>> Stashed changes
    async function addAuthor(e) {
        e.preventDefault();
        if (e.target.author.value === "") {
            alert("Field must not be blank");
            return;
        } // check for duplicates..? how?
        const addedAuth = await axios.post(`/api/${currentUser.uid}/authors`, {author: e.target.author.value});
        dispatch({type: 'addAuthor', payload: addedAuth.data[0]});
        setAddModalShow(false);
    }

    const authForm = (
        <form onSubmit={addAuthor} className="simple-form">
            <label for="author-name" className='s-label form-label'>Author:</label>
            <input id="author-name" className='s-input' name="author" type="text" placeholder="Author's name" required />
            <Button variant="primary" type="submit" className="s-save">Save</Button>
        </form>    
    )

    // ------------------------- Edit Author ---------------------------------
    async function editAuthor(e) {
        e.preventDefault();
        const editedAuth = await axios.put(`/api/${currentUser.uid}/authors/${selectedItem}`, {name: e.target.author.value});
        dispatch({type: 'editAuthor', payload: editedAuth.data[0]});
        setEditModalShow(false);
        setSelectedItem(null);
        setEditAuthorVal(null);
    }

    function editClicked(authId) {
        setSelectedItem(Number(authId));
        let authVal = authors.find(a => a.id === Number(authId)).name;
        setEditAuthorVal(authVal);
        setEditModalShow(true)
    }

    const editAuthForm = (
        <form onSubmit={editAuthor} className="simple-form">
            <label for="author-name" className='s-label form-label'>Author:</label>
            <input id="author-name" className='s-input' name="author" type="text" required 
                value={editAuthorVal} onChange={(e) => setEditAuthorVal(e.target.value)}/>
            <Button variant="primary" type="submit" className="s-save">Save</Button>
        </form>    
    )

<<<<<<< Updated upstream
    // ------------------------- Delete Author -------------------------------
    async function deleteAuthor() {
        if (authors.length === 1) dispatch({type: 'clearFilters'});
=======
    // -------------------- Edit Author -----------------------------

    // -------------------- Delete Author -----------------------------
    async function deleteAuthor() {
>>>>>>> Stashed changes
        const deleted = await axios.delete(`/api/${currentUser.uid}/authors/${selectedItem}`); 
        dispatch({type: 'deleteAuthor', payload: deleted.data[0]});
        setDelModalShow(false);
        setSelectedItem(null);
    }

    function delClicked(authId) {
        setDelModalShow(true);
        setSelectedItem(authId);
    }

    const areYouSure = (
        <>
            <p>Deleting this author will leave the author's books authorless!</p>
            <Button variant="danger" onClick={deleteAuthor} >Delete</Button>
        </>
    )

<<<<<<< Updated upstream
    // -------------------------- Auth component return -----------------------
=======
    // ---------------------- Author component return -------------------------------------------
>>>>>>> Stashed changes
    return (
        <div className="authors filter-component">
            <h3>Authors ({(authors.length) || 0})</h3>
            <Button className="add-button" variant="primary" onClick={() => setAddModalShow(true)}>
                Add 
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                title="Add Author"
                form={authForm}
                size="sm"
            />
            <ul>
                {
                authors.length > 0 && authors.map(a => {
                    return a ? <li className="filter-item" key={a.id}>
                        <Button className="small-button" variant="warning" onClick={() => editClicked(a.id)}>Edit</Button>
                        <Button className="small-button del-button" variant="danger" onClick={() => delClicked(a.id)}>Del</Button>
                        <div className="filter-text" onClick={() => setAuthFilter(a.id)}>{a.name}</div>
                    </li> : null;
                })
                }
            </ul>
            <ModalForm
                show={delModalShow}
                onHide={() => setDelModalShow(false)}
                title="Delete Author"
                form={areYouSure}
                size="sm"
            /> 
            <ModalForm
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                title="Delete Author"
                form={editAuthForm}
                size="sm"
            />       
        </div>
    );
}
