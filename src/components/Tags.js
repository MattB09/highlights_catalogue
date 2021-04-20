import React, {useState, useContext} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import { Context } from '../App';
import axios from "axios";

export default function Tags({ tags, setFilters, clearFilters, loadData }) {
    // const [addModalShow, setAddModalShow] = useState(false);
    // const [delModalShow, setDelModalShow] = useState(false);
    // const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { state, dispatch } = useContext(Context);

    // const handleShow = () => setAddModalShow(true); 
    // const handleHide = () => setAddModalShow(false);

    // const handleDelShow = () => setDelModalShow(true); 
    // const handleDelHide = () => setDelModalShow(false);

    const setTagFilter = (e) => {
        dispatch({type: 'setFilter', payload: {author: "", tag: e.currentTarget.value, book: ""}});
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
            <h3>Tags ({(state.data !== undefined && state.data.tags.length) || 0})</h3>
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
                    state.data !== undefined && state.data.tags.length 
                    ? state.data.tags.map(t => {
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
                    : null
                }
            </ul>
        </div>
    )
}
