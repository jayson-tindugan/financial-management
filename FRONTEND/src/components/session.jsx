import { useEffect, useState } from "react";

const session = () => {
    // Destructure the array returned by useState
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem("authToken");
        console.log("Stored Data:", storedData);
        if (storedData !== null) {
            setIsAuthenticated(true);
        } else {
            console.log("localStorage is not supported");
            setIsAuthenticated(false);
        }
    }, []); // Empty dependency array to run the effect only once

    return isAuthenticated;
};

export default session;
