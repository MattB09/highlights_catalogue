import React, {useState, useContext } from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import axios from "axios";

export default function Authors({ authors, setFilters, loadData, clearFilters }) {
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleAddShow = () => setAddModalShow(true); 
    const handleAddHide = () => setAddModalShow(false);

    const handleDelShow = () => setDelModalShow(true); 
    const handleDelHide = () => setDelModalShow(false);

    const setAuthFilter = (e) => {
        setFilters({book: "", tag: "", author: e.currentTarget.value});
    }

    const deleteAuthor = async () => {
        await axios.delete(`/api/${currentUser.uid}/authors/${selectedItem}`); 
        clearFilters();
        handleDelHide();
        await loadData();
        setSelectedItem(null);

    }

    const delClicked = (e) => {
        handleDelShow();
        setSelectedItem(e.target.parentElement.value);
    }

    const submitFunc = async (e) => {
        e.preventDefault();
        if (e.target.author.value === "") {
            alert("Field must not be blank");
            return;
        } // check for duplicates..? how?
        await axios.post(`/api/${currentUser.uid}/authors`, {author: e.target.author.value})
        loadData();
        handleAddHide();
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

    const areYouSure = (
        <>
            <p>Deleting this author will leave the author's books authorless!.</p>
            <Button variant="danger" onClick={deleteAuthor} >Delete</Button>
        </>
    )

    return (
        <div className="authors filter-component">
            <h3>Authors ({(authors && authors.length) || 0})</h3>
            <Button className="add-button" variant="primary" onClick={handleAddShow}>
                Add 
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={handleAddHide}
                title="Add Author"
                form={authForm}
                size="md"
            />
            <ul>
                {
                    authors ? authors.map(a => { 
                        if (a) {
                            return (
                                <li 
                                    key={a.id}
                                    value={a.id}
                                    onClick={setAuthFilter}
                                >
                                    <Button className="delete-button" variant="danger" onClick={delClicked}>Del</Button>
                                    <ModalForm
                                        show={delModalShow}
                                        onHide={handleDelHide}
                                        title="Delete Author"
                                        form={areYouSure}
                                        size="sm"
                                    />                                
                                    {a.name}
                                </li>
                            );
                        }
                        return null;
                    }) : null
                }
            </ul>
        </div>
    )
}
