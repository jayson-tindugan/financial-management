import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginDetails() {
    const [accountDetails, setAccountDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAccountDetails();
    }, []);

    const getAccountDetails = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(
                "http://localhost:8001/accountDetails"
            );

            console.log("Response:", response);

            if (response.status === 200) {
                setAccountDetails(response.data);
            } else {
                console.error("Unexpected response status:", response.status);
                navigate("/");
            }
        } catch (error) {
            console.error("Error fetching account details:", error.message);
            navigate("/");
        }
    };

    return accountDetails;
}

export default LoginDetails;
