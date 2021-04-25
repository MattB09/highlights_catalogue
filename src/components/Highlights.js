import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";
import { addSorted } from '../utils/helpers';

export default function Highlights() {
    // ------------------ UseStates ----------------------------------------
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context)
    const [highlights, setHighlights] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [addedTags, setAddedTags] = useState([]);
    const [tagSelect, setTagSelect] = useState("");

    // ------------------ UseEffect----------------------------------------
    useEffect(() => {
        if (state.data === undefined) return;
        setHighlights(filterHighlights(state.data))
    }, [state.filters, state.data.highlights, addedTags]);

    // ------------------ Filtering --------------------------------------
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

    // ------------------ Add highlight --------------------------------------
    const highlightForm = (
        <form onSubmit={submitFunc} className="h-form">
            <label className="h-label form-label" for="h-textarea">Highlight:</label>
            <textarea className="h-input" id="h-textarea" name="highlight" rows="5" columns="70" placeholder="Enter the highlight here" required />
            
            <label className="t-label form-label" for="tag-select">Tags:</label>
            <select name="tag" id="tag-select" className="t-select" value={tagSelect} onChange={(event)=>setTagSelect(event.target.value)}>
                <option value="">Select Tag</option>
                {state.data.tags.length > 0 && state.data.tags.filter(t => addedTags.find(added => added.id === t.id) === undefined)
                    .map(t => {
                        return <option key={t.id} value={t.id}>{t.tag}</option>
                })}
            </select>
            { addedTags.length > 0 && <p className="t-message">Click a tag to remove it</p> }
            <Button variant="primary" className="t-add" onClick={addTagClicked}>Add Tag</Button>
            <div className="t-display-container">
                {addedTags.length > 0 && addedTags.map(t => (
                    <div className="tag-list" onClick={()=>setAddedTags(addedTags.filter(tag => tag.id !== t.id))}>{t.tag}</div>    
                ))}
            </div>

            <label className="b-label form-label" for="book-select">Book:</label>
            <select name="book" className="b-select" id="book-select">
                <option value="null">Select Book</option>
				{state.data.books.length > 0 && state.data.books.map(b => {
                    return <option key={b.id} value={b.id}>{b.title}</option>
                })}
			</select>
            <Button variant="primary" type="submit" className="h-save">Save</Button>
        </form>
    )

    async function submitFunc(e) {
        e.preventDefault();
        if (e.target.highlight.value === "") {
             alert("field must not be blank");
             return;
        }
        let newHighlight = {
            highlight: e.target.highlight.value,
            book_id: parseInt(e.target.book.value),
            reviewed: true,
            tags: addedTags
        }
        let added = await axios.post(`/api/${currentUser.uid}/highlights`, newHighlight);
        let book = state.data.books.find((book) => book.id === parseInt(e.target.book.value));
        added = {...added.data[0], book, tags: addedTags}
        dispatch({type: 'addHighlight', payload: added});
        setAddedTags([]);
        setAddModalShow(false);
    }

    function addTagClicked() {
        if (tagSelect === "") return;
        let tagCopy = [...addedTags]
        addSorted(state.data.tags.find((t) => t.id === Number(tagSelect)), tagCopy, "tag");
        setAddedTags(tagCopy);
    }

    // ------------------ Delete highlight ------------------------------------
    async function deleteHighlight() {
        const deleted = await axios.delete(`/api/${currentUser.uid}/highlights/${selectedItem}`);
        dispatch({type: 'deleteHighlight', payload: deleted.data[0]});
		setDelModalShow(false);
        setSelectedItem(null);
    }

    function delClicked(hId) {
        setDelModalShow(true)
        setSelectedItem(hId);
    }

    const areYouSure = (
        <>
            <p>Are you sure you want to delete the highlight? It cannot be undone!</p>
            <Button variant="danger" onClick={deleteHighlight} >Delete</Button>
        </>
    )

    // -------------------------------- Editing Highlight ----------------------------------
    function editTagClicked(hId) {
        setEditModalShow(true);
        setSelectedItem(hId)
    }

    async function editFunc(e){
        console.log("selected", selectedItem);
        setEditModalShow(false);
    }

    const editTagForm = (
        <div className="edit-tag-container">
            <ul class="tag-list">
                {highlights.length && highlights.filter(h => h.id === selectedItem).map(h => {
                    return (<li>{h.name}</li>)
                })}
            </ul>
            <p>hello</p>
            <Button onClick={editFunc}>do something</Button>
        </div>
    )

    // ------------------ Highlight Component Return ---------------------------------
    return (
        <div id="highlights">
            <h3>Highlights ({highlights.length || 0})</h3>
            <Button className="add-button" variant="primary" onClick={() => setAddModalShow(true)}>
                Add
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={() => {
                    setAddModalShow(false)
                    setAddedTags([]);
                    setTagSelect("");
                }}
                title="Add Highlight"
                form={highlightForm}
                size="md"
            />
            <ul>
                {
                    highlights.length > 0 && highlights.map(h => {
                        return (
                            <li 
                            key={h.id}
                            value={h.id}
                            >
                                <Button className="small-button" variant="danger" onClick={() => delClicked(h.id)}>Del</Button>
                                <pre>{h.highlight}</pre>
                                <div className="indented">Book: {h.book === undefined ? "unspecified" : h.book.title || "unspecified" }</div>
                                <div className="indented" data-value={h.id}>
                                    Tags: {(h.tags.length && h.tags.map(t => t.tag).join(', ')) || "none"}
                                    <Button variant="primary" className="small-button edit-button" onClick={()=> editTagClicked(h.id)}>Edit</Button>

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
