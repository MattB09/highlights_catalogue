import React, {useState, useContext} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import axios from "axios";

export default function Highlights({ highlights, tags, htags, setData, userData, loadData, deleteHighlight }) {
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

    const deleteHighlightWrapper = async () => {
        await deleteHighlight(selectedItem, userData);
        loadData();
        handleDelHide();
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
        let added = await axios.post(`/api/${currentUser.uid}/highlights`, newHighlight);
        added = added.data[0];
        let allData = { ...userData };
        allData.Highlights.push(added);
        setData(allData);
        handleAddHide();
    }

    const editFunc = async (e) => {
        console.log("selected", selectedItem);
    }

    const highlightForm = (
        <form onSubmit={submitFunc}>
            <label>
                highlight
                <textarea name="highlight" rows="5" columns="70" placeholder="Enter the highlight here" required />
            </label>
            <select name="book">
                <option value="null">Select Book</option>
				{userData.Books && userData.Books.map(b=> {
                    return <option value={b.id}>{b.title}</option>
                })}
			</select>
            <Button variant="primary" type="submit">Save</Button>
        </form>
    )

    const areYouSure = (
        <>
            <p>Are you sure you want to delete the highlight? It cannot be undone!</p>
            <Button variant="danger" onClick={deleteHighlightWrapper} >Delete</Button>
        </>
    )

    const editTagForm = (
        <div className="edit-tag-container">
            <ul class="tag-list">
                {console.log(highlights)}
                {highlights && highlights.filter(h => h.id === selectedItem).map(h => {
                    return (<li>{h.name}</li>)
                })}
            </ul>
            <p>hello</p>
            <Button onClick={editFunc}>do something</Button>
        </div>
    )

    // add tags to highlights
    if (highlights && htags) {
        for (const h of highlights) {
            h.tags = [];
            for (const htag of htags) {
                if (htag.highlight_id === h.id) h.tags.push({id: htag.tag_id});
            }
            for (const t of h.tags) {
                t.tag = tags.find(tag => tag.id === t.id).tag;
            }
        }
    } 

    function listTags(tagsArr) {
        let str = "Tags: ";
        if (!tagsArr.length) return str + "none...";
        let tArr = tagsArr.map(t => t.tag);
        str += tArr.sort().join(", ");
        return str;
    }

    return (
        <div id="highlights">
            <h3>Highlights ({highlights && highlights.length})</h3>
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
                    highlights && highlights.map(h => {
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
                                    size="sm"
                                />
                                {h.highlight}
                                <div className="htags" data-value={h.id}>
                                    {listTags(h.tags)}
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
