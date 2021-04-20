import React, {useState, useContext, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Tags() {
    // const [addModalShow, setAddModalShow] = useState(false);
    // const [delModalShow, setDelModalShow] = useState(false);
    // const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context);
    const [tags, setTags] = useState([]);

    // const handleShow = () => setAddModalShow(true); 
    // const handleHide = () => setAddModalShow(false);

    // const handleDelShow = () => setDelModalShow(true); 
    // const handleDelHide = () => setDelModalShow(false);

    useEffect(() => {
        if (state.data === undefined) return;
        setTags(filterTags(state.data));
    }, [state.filters, state.data.tags]);

    const setTagFilter = (e) => {
        dispatch({type: 'setFilter', payload: {author: "", tag: e.currentTarget.value, book: ""}});
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

    // const deleteTag = async () => {
    //     await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}`);
    //     clearFilters();
    //     handleDelHide();
    //     await loadData();
    //     setSelectedItem(null)
    // }

    // const delClicked = (e) => {
    //     handleDelShow();
    //     setSelectedItem(e.target.parentElement.value);
    // }

    // const submitFunc = async (e) => {
    //     e.preventDefault();
    //     if (e.target.tag.value === "") {
    //         alert("field must not be blank");
    //         return;
    //     }
    //     await axios.post(`/api/${currentUser.uid}/tags`, {tag: e.target.tag.value});
    //     loadData();
    //     handleHide();
    // }

    // const tagForm = (
    //     <form onSubmit={submitFunc}>
    //         <label>
    //             Tag
    //             <input name="tag" type="text" placeholder="Tag" required />
    //         </label>
    //         <Button variant="primary" type="submit">Save</Button>
    //     </form>
    // )

    // const areYouSure = (
    //     <>
    //         <p>Deleting this tag will remove it from all highlights. It cannot be undone!</p>
    //         <Button variant="danger" onClick={deleteTag} >Delete</Button>
    //     </>
    // )

    return (
        <div className="tags filter-component">
            <h3>Tags ({tags.length || 0})</h3>
            {/* <Button className="add-button" variant="primary" onClick={handleShow}>
                Add
            </Button>
            <ModalForm
                show={addModalShow}
                onHide={handleHide}
                title="Add Tag"
                form={tagForm}
                size="md"
            /> */}
            <ul>
                {
                    tags.length > 0 && tags.map(t => {
                        return (
                            <li 
                                key={t.id}
                                value={t.id} 
                                onClick={setTagFilter}>
                                {/* <Button className="delete-button" variant="danger" onClick={delClicked}>Del</Button>
                                <ModalForm
                                    show={delModalShow}
                                    onHide={handleDelHide}
                                    title="Delete Tag"
                                    form={areYouSure}
                                    size="sm"
                                /> */}
                                {t.tag}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
