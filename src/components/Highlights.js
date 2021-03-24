import React, {useState, useContext} from 'react'
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';
import { AuthContext } from '../Auth';
import axios from "axios";

export default function Highlights({ highlights, tags, htags, setData, userData, loadData }) {
    const [addModalShow, setAddModalShow] = useState(false);
    const [delModalShow, setDelModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleAddShow = () => setAddModalShow(true); 
    const handleAddHide = () => setAddModalShow(false);

    const handleDelShow = () => setDelModalShow(true); 
    const handleDelHide = () => setDelModalShow(false);

    const deleteHighlight = async () => {
        alert("deleted");
        // let hIds = tagsH.filter(row => row.tag_id === selectedItem).map(row => row.highlight_id);
        // let hIdsStr = hIds.join('-');
        // if (hIds.length) await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}/highlights/${hIdsStr}`);
        // await axios.delete(`/api/${currentUser.uid}/tags/${selectedItem}`);
        // loadData();
        // handleDelHide();
        // setSelectedItem(null)
    }

    const delClicked = (e) => {
        handleDelShow();
        setSelectedItem(e.target.parentElement.value);
        alert(selectedItem);
    }

    const submitFunc = async (e) => {
        e.preventDefault();
        alert("submitted");
        // if (e.target.title.value === "") {
        //      alert("field must not be blank");
        //      return;
        // }
        // let newBook = {
        //     title: e.target.title.value,
        //     summary: e.target.summary.value,
        //     year_published: e.target.year_published.value,
        //     year_read: e.target.year_read.value,
        //     author_id: parseInt(e.target.author.value),
        // }
        // let added = await axios.post(`/api/${currentUser.uid}/books`, newBook);
        // added = added.data[0];
        // let allData = { ...userData };
        // allData.Books.push(added);
        //setData(allData);
        loadData();
        handleAddHide();
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
            <Button variant="danger" onClick={deleteHighlight} >Delete</Button>
        </>
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
        <div className="highlights">
            <h3>Highlights ({highlights && highlights.length})</h3>
            <Button variant="primary" onClick={handleAddShow}>
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
                            <li key={h.id}>
                                <Button variant="danger" onClick={delClicked}>Del</Button>
                                <ModalForm
                                    show={delModalShow}
                                    onHide={handleDelHide}
                                    title="Delete Highlight"
                                    form={areYouSure}
                                    size="sm"
                                />
                                {h.highlight}
                                <div className="htags">
                                    {listTags(h.tags)}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
