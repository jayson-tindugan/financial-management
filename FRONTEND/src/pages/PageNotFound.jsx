import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/global.css";

function PageNotFound() {
    const navigate = useNavigate();

    const redirectToDashboard = () => {
        navigate("/Dashboard"); // Redirect to the Dashboard endpoint
    };
    return (
        <div className="bad-request d-flex flex-column justify-content-center">
            <h1 style={{ fontSize: "3rem" }}>Error: 404 - Page Not Found</h1>
            <p style={{ fontSize: "1.25rem" }} className="text-center">
                Sorry, the page you are looking for does not exist.
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

export default PageNotFound;
