import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";

const LogoutButton = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            await axios.get("http://localhost:8001/logoutUser");
            //clear cookie and session
            localStorage.removeItem("authToken");
            navigate("/", { replace: true });
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
            } else if (axios.isAxiosError(error)) {
                // cors and backend is fine, axios errorr
                if (error.response) {
                    console.error(
                        "Error during logout. Server responded with:",
                        error.response.data
                    );
                } else if (error.request) {
                    // axios check, cors or backend error
                    console.error(
                        "Error during logout. No response received:",
                        error.request
                    );
                } else {
                    // axios eror
                    console.error(
                        "Error during logout. Request setup error:",
                        error.message
                    );
                }
            } else {
                console.error("Error during logout:", error.message);
            }
        }
    };

    return (
        <Icon.Power
            onClick={logout}
            className="toggle-icons"
            width={30}
            height={30}
        />
    );
};

export default LogoutButton;
