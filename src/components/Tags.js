import React, {useState, useContext, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Tags() {
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (state.data === undefined) return;
        setTags(filterTags(state.data));
    }, [state.filters, state.data.tags]);

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

    async function deleteTag() {
        dispatch({type: 'clearFilters'});
        const deleted = await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}`);
        dispatch({type: 'deleteTag', payload: deleted.data[0]});
        setDelModalShow(false);
        setSelectedItem(null)
    }

    function delClicked(tId) {
        setDelModalShow(true);
        setSelectedItem(tId);
    }

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
        <form onSubmit={submitFunc}>
            <label>
                Tag
                <input name="tag" type="text" placeholder="Tag" required />
            </label>
            <Button variant="primary" type="submit">Save</Button>
        </form>
    )

    const areYouSure = (
        <>
            <p>Deleting this tag will remove it from all highlights. It cannot be undone!</p>
            <Button variant="danger" onClick={deleteTag} >Delete</Button>
        </>
    )

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
                size="md"
            />
            <ul>
                {
                    tags.length > 0 && tags.map(t => {
                        return (
                            <li 
                                className="filter-item"
                                key={t.id}
                                // value={t.id} 
                                // onClick={setTagFilter}
                                >
                                <Button className="delete-button" variant="danger" onClick={() => delClicked(t.id)}>Del</Button>
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
        </div>
    )
}
