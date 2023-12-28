// Userdashboard.jsx
import React, { useState } from "react";
import {
    LoginDetails,
    Header,
    Sidebar,
    MainGreetings,
    Modal,
} from "../components/Components.js";
import ProfileBody from "../components/non-reusable-components/ProfileBody.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/global.css";

function Profile() {
    const accountDetails = LoginDetails();

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [showModals, setShowModals] = useState({});

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleClose = (key) => {
        setShowModals({ showModals, [key]: false });
    };

    const handleShow = (key) => {
        setShowModals({ showModals, [key]: true });
    };

    const handleSave = (key) => {
        // Logic to handle saving changes based on the key/modal

        // After saving changes, close the modal
        setShowModals({ showModals, [key]: false });
    };
    const generateInputModal = (key, label, placeholder) => {
        return (
            <Modal
                key={key}
                show={showModals[key] || false}
                handleClose={() => handleClose(key)}
                handleSave={() => handleSave(key)}
                modalTitle={`Edit ${label}`}
            >
                <form>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id={key}
                            placeholder={placeholder}
                        />
                    </div>
                </form>
            </Modal>
        );
    };

    const profileBodyFields = [
        {
            key: "idNumberModal",
            label: "Student Number",
            value: accountDetails.idNumber,
        },
        {
            key: "firstNameModal",
            label: "First Name",
            value: accountDetails.firstName,
        },
        {
            key: "middleInitialModal",
            label: "Middle Name",
            value: accountDetails.middleName,
        },
        {
            key: "lastNameModal",
            label: "Last Name",
            value: accountDetails.lastName,
        },
        { key: "roleModal", label: "Role", value: accountDetails.role },
        { key: "statusModal", label: "Status", value: accountDetails.status },
    ];

    const inputModals = profileBodyFields.map(({ key, label, value }) =>
        generateInputModal(key, label, value)
    );

    const handleDeactivateAccount = () => {
        setShowModals({
            showModals,
            deactivateModal: true,
            buttonText: "Confirm",
        });
    };

    const handleCloseModal = (key) => {
        setShowModals({ showModals, [key]: false }); // Close modal
    };

    const handleConfirmDeactivate = () => {
        // Logic to deactivate the account
        // ...

        setShowModals({ showModals, deactivateModal: false }); // Close modal after deactivation
    };
    return (
        <div>
            <Header toggleSidebar={toggleSidebar} />
            <div
                className={`main-content${
                    isSidebarVisible ? " sidebar-open" : ""
                }`}
            >
                <MainGreetings />
                <div className="">
                    {accountDetails.role !== "ADMIN" && (
                        <div className="profile-btn-wrapper d-flex justify-content-end">
                            <button
                                className="btn btn-outline-danger mb-3"
                                onClick={handleDeactivateAccount} // Add onClick event to trigger deactivation modal
                            >
                                Deactivate Account
                            </button>
                        </div>
                    )}
                    <div className="profile-content">
                        <div className="profile-details-header p-2">
                            <h4 className="p-0 m-0 text-white">
                                PERSONAL INFORMATION
                            </h4>
                        </div>
                        {profileBodyFields.map(({ key, label, value }) => (
                            <ProfileBody
                                key={key}
                                label={label.toUpperCase()}
                                value={value}
                                showIcon={accountDetails.role === "ADMIN"}
                                onClick={() => handleShow(key)}
                            />
                        ))}
                    </div>
                </div>
                {inputModals}
                <Modal
                    show={showModals.deactivateModal || false}
                    handleClose={() => handleCloseModal("deactivateModal")}
                    handleSave={handleConfirmDeactivate}
                    modalTitle="Confirmation"
                    buttonText={showModals.buttonText || "Update"} // Pass buttonText prop
                >
                    <p>Are you sure you want to deactivate your account?</p>
                </Modal>
            </div>
            <Sidebar isSidebarVisible={isSidebarVisible} />
        </div>
    );
}

export default Profile;
