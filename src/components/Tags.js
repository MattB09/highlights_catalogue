import React, {useState, useContext, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Tags() {
    // ------------------------- useState and context ----------------------------
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context);
    
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [tags, setTags] = useState([]);
    const [editTagVal, setEditTagVal] = useState(null)

    // ------------------------- useEffect ------------------------------------
    useEffect(() => {
        if (state.data === undefined) return;
        setTags(filterTags(state.data));
    }, [state.filters, state.data.tags]);

    // ------------------------- filtering -------------------------------------
    function setTagFilter(tId) {
        dispatch({type: 'setFilter', payload: {author: "", tag: tId, book: ""}});
    }

    function filterTags(data) { 
        if (state.filters.author !== "") {
            let hWithAuthor = data.highlights.reduce((acc, cur) => {
                if (cur.book.author_id === state.filters.author && cur.tags.length) return acc.concat(cur.tags);
                return acc;
            }, []);
            if (hWithAuthor) hWithAuthor = hWithAuthor.filter((h, ind, self) =>
                ind === self.findIndex((hl) => (hl.id === h.id)));
            return hWithAuthor;
        }
        if (state.filters.book !== "") {
            let hWithBooks = data.highlights.reduce((acc, cur) => {
                if (cur.book.id === state.filters.book && cur.tags.length) return acc.concat(cur.tags);
                return acc;
            }, []);
            if (hWithBooks) hWithBooks = hWithBooks.filter((h, ind, self) =>
                ind === self.findIndex((hl) => (hl.id === h.id)));
            return hWithBooks;
        }
        if (state.filters.tag !== "") return [data.tags.find(t => t.id === state.filters.tag)];
        return data.tags; 
    }

    // ------------------------- Add Tag --------------------------------------
    async function submitFunc(e) {
        e.preventDefault();
        if (e.target.tag.value === "") {
            alert("field must not be blank");
            return;
        }
        const added = await axios.post(`/api/${currentUser.uid}/tags`, {tag: e.target.tag.value});
        dispatch({type: 'addTag', payload: added.data[0]});
        setAddModalShow(false);
    }

    const tagForm = (
        <form onSubmit={submitFunc} className='simple-form'>
            <label for="tag-input" className='s-label form-label'>Tag: </label>
            <input id="tag-input" name="tag" className='s-input' type="text" placeholder="Tag" required />
            <Button variant="primary" type="submit" className='s-save'>Save</Button>
        </form>
    )

    // ------------------------- Edit  Tag --------------------------------------
    async function editTag(e) {
        e.preventDefault();
        if (e.target.tag.value === "") {
            alert("field must not be blank");
            return;
        }
        const added = await axios.put(`/api/${currentUser.uid}/tags/${selectedItem}`, {tag: e.target.tag.value});
        dispatch({type: 'editTag', payload: added.data[0]});
        setEditModalShow(false);
        setSelectedItem(null);
        setEditTagVal(null);
    }

    function editClicked(tId) {
        setSelectedItem(Number(tId));
        let tagVal = tags.find(t => t.id === Number(tId)).tag
        setEditTagVal(tagVal);
        setEditModalShow(true);
    }

    const editTagForm = (
        <form onSubmit={editTag} className='simple-form'>
            <label for="tag-input" className='s-label form-label'>Tag:</label>
            <input id="tag-input" name="tag" className='s-input' type="text" required 
                value={editTagVal} onChange={(e) => setEditTagVal(e.target.value)} />
            <Button variant="primary" type="submit" className='s-save'>Save</Button>
        </form>
    )

    // ------------------------- Delete Tag --------------------------------------
    async function deleteTag() {
        if (tags.length === 1) dispatch({type: 'clearFilters'});
        const deleted = await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}`);
        dispatch({type: 'deleteTag', payload: deleted.data[0]});
        setDelModalShow(false);
        setSelectedItem(null)
    }

    function delClicked(tId) {
        setDelModalShow(true);
        setSelectedItem(tId);
    }

    const areYouSure = (
        <>
            <p>Deleting this tag will remove it from all highlights. It cannot be undone!</p>
            <Button variant="danger" onClick={deleteTag} >Delete</Button>
        </>
    )

    // ------------------------- Tag component return  --------------------------------------
    return (
        <div className="tags filter-component">
            <h3>Tags ({tags.length || 0})</h3>
            <Button className="add-button" variant="primary" onClick={() => setAddModalShow(true)}>
                Add
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                title="Add Tag"
                form={tagForm}
                size="sm"
            />
            <ul>
                {
                    tags.length > 0 && tags.map(t => {
                        return (
                            <li className="filter-item" key={t.id}>
                                <Button className="small-button" variant="warning" onClick={() => editClicked(t.id)}>Edit</Button>
                                <Button className="small-button del-button" variant="danger" onClick={() => delClicked(t.id)}>Del</Button>
                                <div className="filter-text" onClick={()=> setTagFilter(t.id)}>{t.tag}</div> 
                            </li>
                        );
                    })
                }
            </ul>
            <ModalForm
                show={delModalShow}
                onHide={() => setDelModalShow(false)}
                title="Delete Tag"
                form={areYouSure}
                size="sm"
            />
            <ModalForm
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                title="Edit Tag"
                form={editTagForm}
                size="sm"
            />
        </div>
    )
}
