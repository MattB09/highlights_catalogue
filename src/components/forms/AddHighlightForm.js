import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function AddHighlightForm({ tags }) {
    const [addedTags, setAddedTags] = useState([]);

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
        await axios.post(`/api/${currentUser.uid}/highlights`, newHighlight);
        await loadData();
        handleAddHide();
    }

    function addTagClicked(e) {
        console.log("add tag clicked P element", e.target.parentElement);
        console.log("add tag clicked newTags", e.target.parentElement.newTags);
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Highlight
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitFunc}>
                    <label>
                        highlight
                        <textarea name="highlight" rows="5" columns="70" placeholder="Enter the highlight here" required />
                    </label>
                    <select name="book">
                        <option value="null">Select Book</option>
                        {books && books.map(b=> {
                            return <option value={b.id}>{b.title}</option>
                        })}
                    </select>
                    <label>
                        New Tag
                        <select name="newTags">
                            <option value="null"></option>
                        </select>
                    </label>
                    <Button variant='primary' onClick={addTagClicked}></Button>
                    <Button variant="primary" type="submit">Save</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
