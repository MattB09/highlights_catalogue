import React, {useState, useContext} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import axios from "axios";

export default function Tags({ tags, tagsH, filterFunc, setData, userData, loadData }) {
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleShow = () => setAddModalShow(true); 
    const handleHide = () => setAddModalShow(false);

    const handleDelShow = () => setDelModalShow(true); 
    const handleDelHide = () => setDelModalShow(false);

    const deleteTag = async () => {
        let hIds = tagsH.filter(row => row.tag_id === selectedItem).map(row => row.highlight_id);
        let hIdsStr = hIds.join('-');
        if (hIds.length) await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}/highlights/${hIdsStr}`);
        await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}`);
        loadData();
        handleDelHide();
        setSelectedItem(null)
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
