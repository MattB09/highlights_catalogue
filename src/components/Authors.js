import React, {useState, useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Authors() {
    const [addModalShow, setAddModalShow] = useState(false);
    // const [delModalShow, setDelModalShow] = useState(false);
    // const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context);
    const [authors, setAuthors] = useState([]);

    // const handleDelShow = () => setDelModalShow(true); 
    // const handleDelHide = () => setDelModalShow(false);

    useEffect(() => {
        if (state.data === undefined) return;
        setAuthors(filterAuthors(state.data));
    }, [state]);

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

    const setAuthFilter = (e) => {
        dispatch({type: 'setFilter', payload: {book: "", tag: "", author: e.currentTarget.value}});
    }

    // const deleteAuthor = async () => {
    //     await axios.delete(`/api/${currentUser.uid}/authors/${selectedItem}`); 
    //     clearFilters();
    //     handleDelHide();
    //     await loadData();
    //     setSelectedItem(null);

    // }

    // const delClicked = (e) => {
    //     handleDelShow();
    //     setSelectedItem(e.target.parentElement.value);
    // }

    const submitFunc = async (e) => {
        e.preventDefault();
        if (e.target.author.value === "") {
            alert("Field must not be blank");
            return;
        } // check for duplicates..? how?
        const addedAuth = await axios.post(`/api/${currentUser.uid}/authors`, {author: e.target.author.value});
        console.log("console.log:", addedAuth.data)
        dispatch({type: 'addAuthor', payload: addedAuth.data[0]});
        setAddModalShow(false);
    }

    const authForm = (
        <form onSubmit={submitFunc}>
        <label>
            Author
            <input name="author" type="text" placeholder="Author's name" required />
        </label>
        <Button variant="primary" type="submit">Save</Button>
    </form>    
    )

    // const areYouSure = (
    //     <>
    //         <p>Deleting this author will leave the author's books authorless!.</p>
    //         <Button variant="danger" onClick={deleteAuthor} >Delete</Button>
    //     </>
    // )

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
                size="md"
            />
            <ul>
                {
                authors.length > 0 && authors.map(a => { 
                        if (a) {
                            return (
                                <li 
                                    key={a.id}
                                    value={a.id}
                                    onClick={setAuthFilter}
                                >
                                    {/* <Button className="delete-button" variant="danger" onClick={delClicked}>Del</Button>
                                    <ModalForm
                                        show={delModalShow}
                                        onHide={handleDelHide}
                                        title="Delete Author"
                                        form={areYouSure}
                                        size="sm"
                                    />                                 */}
                                    {a.name}
                                </li>
                            );
                        }
                        return null;
                    })
                }
            </ul>
        </div>
    )
}
