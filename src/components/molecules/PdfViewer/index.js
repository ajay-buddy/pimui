import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function PDFViewer({
    url
}) {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <embed 
            src={`${process.env.S3URL}/3e5569ca-fd16-4627-bbff-c2f1db4d63be.pdf`}
            width="500" height="375"
            type="application/pdf" />
        </Modal.Body>
    </Modal>
}