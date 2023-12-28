import "../../assets/css/login.css";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import session from "../../components/session.jsx";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BITS_LOGO from "../../assets/img/BITS_LOGO.png";
import * as Icon from "react-bootstrap-icons";

function Forgot() {
    const isAuthenticated = session();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    console.log("Is Authenticated:", isAuthenticated);

    async function login(event) {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        try {
            await axios
                .post("http://localhost:8001/login", {
                    username: username,
                    password: password,
                    withCredentials: true,
                })
                .then(
                    (response) => {
                        console.log(response.data);
                        if (response.data == "Login successfully") {
                            localStorage.setItem("authToken", response.data);
                            navigate("/Dashboard");
                        }
                        if (
                            response.data ==
                            "Authentication failed: Bad credentials"
                        ) {
                            setErrorMessage("Wrong password");
                        }
                        if (
                            response.data ==
                            "Authentication failed: Error loading user by username"
                        ) {
                            setErrorMessage("User does not exist");
                        } else {
                            console.log(
                                "Unexpected error encounterer! Contact technical support for assistance!"
                            );
                        }
                    },
                    (fail) => {
                        console.error(fail);
                        setErrorMessage(
                            "Unexpected error encounterer! Contact technical support for assistance!"
                        );
                    }
                );
        } catch (err) {
            alert(err);
        }
    }
    const handleInputChange = (event) => {
        // Update the input values and clear the error message
        if (event.target.id === "username") {
            const inputValue = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
            setUsername(inputValue.slice(0, 9)); // Limit to 9 characters
            setErrorMessage("");
        } else if (event.target.id === "password") {
            const inputValue = event.target.value;

            // Filter out characters that don't match the criteria
            const filteredInput = inputValue.replace(/[^a-zA-Z0-9@_]/g, "");
            setPassword(filteredInput);

            // Validate if the password meets the criteria
            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_])[a-zA-Z0-9@_]+$/;

            if (filteredInput === "" || passwordRegex.test(filteredInput)) {
                setErrorMessage("");
            } else {
                setErrorMessage("");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Header></Header>
            <div className="login-main">
                <img
                    src={BITS_LOGO}
                    style={{ width: "350px;", height: "350px" }}
                    alt="BITS LOGO"
                />
                <div className="Login-Card">
                    <form action="/Dashboard" method="POST">
                        <div className="Title-Header">
                            <h3>Forgot Password</h3>
                            <hr />
                        </div>
                        {errorMessage && (
                            <Alert variant="danger">{errorMessage}</Alert>
                        )}
                        <div className="loginUserInput">
                            <label htmlFor="stud_id">Student ID:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleInputChange}
                                maxLength={9}
                            />
                        </div>
                        <div className="loginUserInput">
                            <label htmlFor="password">New Password:</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={handleInputChange}
                                    minLength={8}
                                />
                                <div
                                    className="showPassword"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <Icon.Eye
                                            className="sidebar-icons open pointer"
                                            color="black"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                    ) : (
                                        <Icon.EyeSlash
                                            className="sidebar-icons close pointer"
                                            color="#716868"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="loginUserInput">
                            <label htmlFor="password">Confirm Password:</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={handleInputChange}
                                    
                                />
                                <div
                                    className="showPassword"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <Icon.Eye
                                            className="sidebar-icons open pointer"
                                            color="black"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                    ) : (
                                        <Icon.EyeSlash
                                            className="sidebar-icons close pointer"
                                            color="#716868"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        
                        <div className="btnWrapper">
                            <div to="/Dashboard" className="Link">
                                <button onClick={login} name="login">
                                    Submit
                                </button>
                            </div>
                        </div>
                        <div className="btnWrapper">
                            <div to="/Dashboard" className="Link">
                                <button onClick={login} name="login" >
                                    Back
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Forgot;
