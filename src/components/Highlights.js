import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Highlights() {
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context)
    const [highlights, setHighlights] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (state.data === undefined) return;
        setHighlights(filterHighlights(state.data))
    }, [state.filters, state.data.highlights]);


    function filterHighlights(data) { 
        if (state.filters.author !== "") return data.highlights.filter(h => h.book.author_id === state.filters.author);
        if (state.filters.book !== "") return data.highlights.filter(h => h.book.id === state.filters.book);
        if (state.filters.tag !== "") {
            let hWithTag = data.highlights.filter(h => {
                if (h.tags.find(t => t.id === state.filters.tag)) return true;
                return false;
            });
            return hWithTag;
        }
        return data.highlights; 
    }

    const deleteHighlight = async () => {
        const deleted = await axios.delete(`/api/${currentUser.uid}/highlights/${selectedItem}`);
        dispatch({type: 'deleteHighlight', payload: deleted.data[0]});
		setDelModalShow(false);
        setSelectedItem(null);
    }

    const delClicked = (hId) => {
        setDelModalShow(true)
        setSelectedItem(hId);
    }

    const editTagClicked = (hId) => {
        setEditModalShow(true);
        setSelectedItem(hId)
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
        let added = await axios.post(`/api/${currentUser.uid}/highlights`, newHighlight);
        let book = state.data.books.find((book) => book.id === e.target.book.value);
        added = {...added.data[0], book, tags: []}
        dispatch({type: 'addHighlight', payload: added});
        setAddModalShow(false);
    }

    const editFunc = async (e) => {
        console.log("selected", selectedItem);
        setEditModalShow(false);
    }

    const highlightForm = (
        <form onSubmit={submitFunc}>
            <label>
                Highlight:
                <textarea name="highlight" rows="5" columns="70" placeholder="Enter the highlight here" required />
            </label>
            <select name="book">
                <option value="null">Select Book</option>
				{state.data.books.length > 0 && state.data.books.map(b => {
                    return <option key={b.id} value={b.id}>{b.title}</option>
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
            <h3>Highlights ({highlights.length || 0})</h3>
            <Button className="add-button" variant="primary" onClick={() => setAddModalShow(true)}>
                Add
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                title="Add Highlight"
                form={highlightForm}
                size="lg"
            />
            <ul>
                {
                    highlights.length > 0 && highlights.map(h => {
                        return (
                            <li 
                            key={h.id}
                            value={h.id}
                            >
                                <Button className="delete-button" variant="danger" onClick={() => delClicked(h.id)}>Del</Button>
                                {h.highlight}
                                <div className="htags" data-value={h.id}>
                                    Tags: {(h.tags.length && h.tags.map(t => t.tag).join(', ')) || "none"}
                                    <Button variant="primary" className="delete-button edit-button" onClick={()=> editTagClicked(h.id)}>Edit</Button>

                                </div>
                            </li>
                        );
                    })
                }
            </ul>
			<ModalForm
				show={delModalShow}
				onHide={() => setDelModalShow(false)}
				title="Delete Highlight"
				form={areYouSure}
				size="md"
			/>
			<ModalForm
				show={editModalShow}
				onHide={() => setEditModalShow(false)}
				title="Edit Tags"
				form={editTagForm}
				size="md"
			/>
        </div>
    )
}
