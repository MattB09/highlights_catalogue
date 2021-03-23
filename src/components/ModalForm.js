import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function ModalForm(props) {

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.form}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
