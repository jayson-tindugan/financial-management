import React from "react";
import { Modal, Button } from "react-bootstrap";

function InputModal({
    show,
    handleClose,
    handleSave,
    children,
    modalTitle,
    buttonText,
}) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Close
                </Button>
                {buttonText === "Confirm" ? (
                    <Button variant="danger" onClick={handleSave}>
                        {buttonText}
                    </Button>
                ) : (
                    <Button variant="success" onClick={handleSave}>
                        Update
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default InputModal;
