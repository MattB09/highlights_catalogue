import React, {useState, useContext} from 'react'
import { Button, Modal } from 'react-bootstrap';
import ModalForm from './ModalForm';
//import Api from '../services/api';
import { AuthContext } from '../Auth';
import axios from "axios";

export default function Tags({ tags, filterFunc, setData, userData, clearFilters }) {
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleShow = () => setAddModalShow(true); 
    const handleHide = () => setAddModalShow(false);

    const handleDelShow = () => setDelModalShow(true); 
    const handleDelHide = () => setDelModalShow(false);

    const deleteTag = async () => {
        // to do -- make a delete where you can delete by tag ID also
        // await Api.delete(`/api/${currentUser.uid}/highlights`)
        let deleted = await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}`);
        deleted = deleted.data[0]
        let allData = { ...userData };
        allData.Tags = await allData.Tags.filter(t => t.id !== deleted.id);
        setData(allData);
        handleDelHide();
        clearFilters();
    }

    const delClicked = (e) => {
        handleDelShow();
        setSelectedItem(e.target.parentElement.value);
    }

    const submitFunc = async (e) => {
        e.preventDefault();
        if (e.target.tag.value === "") {
            alert("field must not be blank");
            return;
        }
        let newTag = await axios.post(`/api/${currentUser.uid}/tags`, {tag: e.target.tag.value});
        newTag = newTag.data[0];
        let allData = { ...userData };
        allData.Tags.push(newTag);
        setData(allData);
        handleHide();
    }

    const tagForm = (
        <form onSubmit={submitFunc}>
            <label>
                Tag
                <input name="tag" type="tag" placeholder="Tag" required />
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
        <div className="tags">
            <h3>Tags ({tags && tags.length})</h3>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

            <ModalForm
                show={addModalShow}
                onHide={handleHide}
                title="Add Tag"
                form={tagForm}
                size="md"
            />
            <ul>
                {
                    tags && tags.map(t => {
                        return (
                            <li 
                                key={t.id}
                                value={t.id} 
                                onClick={filterFunc}>
                                <Button variant="danger" onClick={delClicked}>Del</Button>
                                <ModalForm
                                    show={delModalShow}
                                    onHide={handleDelHide}
                                    title="Delete Tag"
                                    form={areYouSure}
                                    size="sm"
                                />
                                {t.tag}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
