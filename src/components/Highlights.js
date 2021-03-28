import React, {useState, useContext} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import axios from "axios";

export default function Highlights({ highlights, books, loadData, clearFilters, setFilters }) {
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleAddShow = () => setAddModalShow(true); 
    const handleAddHide = () => setAddModalShow(false);

    const handleDelShow = () => setDelModalShow(true); 
    const handleDelHide = () => setDelModalShow(false);

    const handleEditShow = () => setEditModalShow(true); 
    const handleEditHide = () => setEditModalShow(false);

    const deleteHighlight = async () => {
        await axios.delete(`/api/${currentUser.uid}/highlights/${selectedItem}`);
        handleDelHide();
        await loadData();
        setSelectedItem(null)
    }

    const delClicked = (e) => {
        handleDelShow();
        setSelectedItem(e.target.parentElement.value);
    }

    const editTagClicked = (e) => {
        handleEditShow();
        setSelectedItem(e.target.parentElement.getAttribute('data-value'))
    }

    const submitFunc = async (e) => {
        e.preventDefault();
        if (e.target.highlight.value === "") {
             alert("field must not be blank");
             return;
        }
        let newHighlight = {
            highlight: e.target.highlight.value,
            book_id: parseInt(e.target.book.value),
            reviewed: true,
        }
        await axios.post(`/api/${currentUser.uid}/highlights`, newHighlight);
        await loadData();
        handleAddHide();
    }

    const editFunc = async (e) => {
        console.log("selected", selectedItem);
        handleEditHide();
    }

    const highlightForm = (
        <form onSubmit={submitFunc}>
            <label>
                highlight
                <textarea name="highlight" rows="5" columns="70" placeholder="Enter the highlight here" required />
            </label>
            <select name="book">
                <option value="null">Select Book</option>
				{books && books.map(b=> {
                    return <option value={b.id}>{b.title}</option>
                })}
			</select>
            <Button variant="primary" type="submit">Save</Button>
        </form>
    )

    const areYouSure = (
        <>
            <p>Are you sure you want to delete the highlight? It cannot be undone!</p>
            <Button variant="danger" onClick={deleteHighlight} >Delete</Button>
        </>
    )

    const editTagForm = (
        <div className="edit-tag-container">
            <ul class="tag-list">
                {console.log(highlights)}
                {highlights.length && highlights.filter(h => h.id === selectedItem).map(h => {
                    return (<li>{h.name}</li>)
                })}
            </ul>
            <p>hello</p>
            <Button onClick={editFunc}>do something</Button>
        </div>
    )

    return (
        <div id="highlights">
            <h3>Highlights ({(highlights && highlights.length) || 0})</h3>
            <Button className="add-button" variant="primary" onClick={handleAddShow}>
                Add
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={handleAddHide}
                title="Add Highlight"
                form={highlightForm}
                size="lg"
            />
            <ul>
                {
                    (highlights && highlights.length) && highlights.map(h => {
                        return (
                            <li 
                            key={h.id}
                            value={h.id}
                            >
                                <Button className="delete-button" variant="danger" onClick={delClicked}>Del</Button>
                                <ModalForm
                                    show={delModalShow}
                                    onHide={handleDelHide}
                                    title="Delete Highlight"
                                    form={areYouSure}
                                    size="md"
                                />
                                {h.highlight}
                                <div className="htags" data-value={h.id}>
                                    Tags: {(h.tags.length && h.tags.map(t => t.tag).join(', ')) || "none"}
                                    <Button variant="primary" className="delete-button edit-button" onClick={editTagClicked}>Edit</Button>
                                    <ModalForm
                                        show={editModalShow}
                                        onHide={handleEditHide}
                                        title="Edit Tags"
                                        form={editTagForm}
                                        size="md"
                                    />
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
