import React, { useState } from "react";
import { Header, Sidebar, MainGreetings } from "../components/Components.js";
import { Button, Form, Table, Modal, Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/global.css";
import OfficerTable from "../components/officerTable.jsx";
import OfficerAddModal from "../components/officerAddModal.jsx";
function Officer() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    // Function of Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Header toggleSidebar={toggleSidebar} />
            <div
                className={`main-content${
                    isSidebarVisible ? " sidebar-open" : ""
                }`}
            >
                <MainGreetings />
                <Container>
                    <h4 className="d-flex justify-content-center">
                        Officer List
                    </h4>
                    <div className="d-flex justify-content-end mx-3">
                        <OfficerAddModal />
                    </div>
                    <OfficerTable />
                </Container>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Officer;
