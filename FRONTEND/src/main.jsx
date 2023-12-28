import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";
import { LoginDetails } from "./components/Components.js";
import {
    Dashboard,
    Officer,
    Transaction,
    Report,
    Profile,
    PageNotFound,
    Forbidden,
} from "./pages/index.js";

const allowedRoles = {
    "/Dashboard": ["ADMIN", "TREASURER", "AUDITOR", "OTHER_OFFICER"],
    "/Officer": ["ADMIN"],
    "/Transaction": ["TREASURER"],
    "/Report": ["AUDITOR"],
    "/Profile": ["ADMIN", "TREASURER", "AUDITOR", "OTHER_OFFICER"],
};

const ProtectedRoute = ({ element, path }) => {
    const accountDetails = LoginDetails(); // Fetch the user's role here
    const navigate = useNavigate();

    // Check if the endpoint exists in allowedRoles
    if (!allowedRoles[path]) {
        // If the endpoint doesn't exist, redirect to Page Not Found
        navigate("/PageNotFound");
        return null; // Return null or a loading component if needed
    }

    // Check if the user's role is allowed for the current route
    if (!allowedRoles[path].includes(accountDetails.role)) {
        // If the user's role isn't allowed for this endpoint, redirect to Bad Request
        navigate("/ForbiddenAccess");
        return null; // Return null or a loading component if needed
    }

    return element;
};

const router = createBrowserRouter([
    // Bad Request route
    {
        path: "/ForbiddenAccess",
        element: <Forbidden />,
    },
    // Page not found route
    {
        path: "*",
        element: <PageNotFound />,
    },
    // Login / index route
    {
        path: "/",
        element: <App />,
    },

    // Forgot / index route
    // {
    //     path: "/Forgot",
    //     element: <Forgot />,
    // },
    // dashboard module
    {
        path: "/Dashboard",
        element: <ProtectedRoute element={<Dashboard />} path="/Dashboard" />,
    },
    // officer record module
    {
        path: "/Officer",
        element: <ProtectedRoute element={<Officer />} path="/Officer" />,
    },
    // transaction module
    {
        path: "/Transaction",
        element: (
            <ProtectedRoute element={<Transaction />} path="/Transaction" />
        ),
    },
    // report module
    {
        path: "/Report",
        element: <ProtectedRoute element={<Report />} path="/Report" />,
    },
    // profile module
    {
        path: "/Profile",
        element: <ProtectedRoute element={<Profile />} path="/Profile" />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
