import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/global.css";

function Forbidden() {
    const navigate = useNavigate();

    const redirectToDashboard = () => {
        navigate("/Dashboard"); // Redirect to the Dashboard endpoint
    };

    return (
        <div className="bad-request d-flex flex-column justify-content-center">
            <h1 style={{ fontSize: "3rem" }}>Error: 403 - Access Forbidden</h1>
            <p style={{ fontSize: "1.25rem" }} className="text-center">
                You do not have permission to access this resource
            </p>
            <div className="bad-request-btn-wrapper d-flex justify-content-center">
                <button
                    style={{ width: "200px" }}
                    onClick={redirectToDashboard}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default Forbidden;
