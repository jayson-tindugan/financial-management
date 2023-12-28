import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LoginDetails from "../../components/loginDetails.jsx";
import \* as Icon from "react-bootstrap-icons";

function Sidebar({ isSidebarVisible }) {
const accountDetails = LoginDetails();
const [showOfficersSubMenu, setShowOfficersSubMenu] = useState(false);
const [showTransactionSubMenu, setShowTransactionSubMenu] = useState(false);
const [officerCaretRotation, setOfficerCaretRotation] = useState(false);
const [transactionCaretRotation, setTransactionCaretRotation] =
useState(false);
const location = useLocation();

    const toggleOfficersSubMenu = () => {
        setShowOfficersSubMenu(!showOfficersSubMenu);
        setOfficerCaretRotation(!officerCaretRotation);
    };
    const toggleTransactionSubMenu = () => {
        setShowTransactionSubMenu(!showTransactionSubMenu);
        setTransactionCaretRotation(!transactionCaretRotation);
    };
    return (
        <nav
            className={`sidebar-container${
                isSidebarVisible ? " sidebar-container-active" : ""
            }`}
        >
            <ul>
                <h4 className="role">{accountDetails.role}</h4>
                <li>
                    <NavLink
                        exact
                        to="/Dashboard"
                        className={
                            location.pathname === "/Dashboard"
                                ? "active-page"
                                : ""
                        }
                    >
                        <Icon.GraphUpArrow className="sidebar-icons" />
                        Dashboard
                    </NavLink>
                </li>
                {accountDetails.role === "ADMIN" && (
                    <>
                        <li onClick={toggleOfficersSubMenu}>
                            <NavLink>
                                <Icon.Clipboard2DataFill className="sidebar-icons" />
                                Officers
                                <Icon.CaretRightFill
                                    className={`caret sub-menu-toggle ${
                                        officerCaretRotation ? "rotate" : ""
                                    }`}
                                />
                            </NavLink>
                            {showOfficersSubMenu && (
                                <ul className="sub-menu">
                                    <hr />
                                    <li>
                                        <NavLink
                                            exact
                                            to="/StudentRecords"
                                            className={
                                                location.pathname ===
                                                "/StudentRecords"
                                                    ? "active-page"
                                                    : ""
                                            }
                                        >
                                            <Icon.PersonFillAdd className="sub-menu-link-icon" />
                                            Add Officer
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            exact
                                            to="/OfficerRecords"
                                            className={
                                                location.pathname ===
                                                "/OfficerRecords"
                                                    ? "active-page"
                                                    : ""
                                            }
                                        >
                                            <Icon.Clipboard2DataFill className="sub-menu-link-icon" />
                                            Officer Records
                                        </NavLink>
                                    </li>
                                    <hr />
                                </ul>
                            )}
                        </li>
                        <li>
                            <NavLink
                                exact
                                to="/Expenses"
                                className={
                                    location.pathname === "/Expenses"
                                        ? "active-page"
                                        : ""
                                }
                            >
                                <Icon.Coin className="sidebar-icons" />
                                Expenses
                            </NavLink>
                        </li>
                        <li onClick={toggleTransactionSubMenu}>
                            <NavLink>
                                <Icon.Clipboard2DataFill className="sidebar-icons" />
                                Transaction
                                <Icon.CaretRightFill
                                    className={`caret sub-menu-toggle ${
                                        transactionCaretRotation ? "rotate" : ""
                                    }`}
                                />
                            </NavLink>
                            {showTransactionSubMenu && (
                                <ul className="sub-menu">
                                    <hr />
                                    <li>
                                        <NavLink
                                            exact
                                            to="/StudentRecords"
                                            className={
                                                location.pathname ===
                                                "/StudentRecords"
                                                    ? "active-page"
                                                    : ""
                                            }
                                        >
                                            <Icon.PersonLinesFill className="sub-menu-link-icon" />
                                            Transaction
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            exact
                                            to="/OfficerRecords"
                                            className={
                                                location.pathname ===
                                                "/OfficerRecords"
                                                    ? "active-page"
                                                    : ""
                                            }
                                        >
                                            <Icon.PeopleFill className="sub-menu-link-icon" />
                                            Transaction History
                                        </NavLink>
                                    </li>
                                    <hr />
                                </ul>
                            )}
                        </li>
                    </>
                )}
                {accountDetails.role === "TREASURER" && (
                    <>
                        <li>
                            <NavLink
                                exact
                                to="/Transaction"
                                className={
                                    location.pathname === "/Transaction"
                                        ? "active-page"
                                        : ""
                                }
                            >
                                <Icon.CurrencyExchange className="sidebar-icons" />
                                Transaction
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/userReport">
                                <Icon.CashCoin className="sidebar-icons" />
                                Balance
                            </NavLink>
                        </li>
                    </>
                )}
                {accountDetails.role === "AUDITOR" && (
                    <>
                        <li>
                            <NavLink to="/userReport">
                                <Icon.CashCoin className="sidebar-icons" />
                                Balance
                            </NavLink>
                        </li>
                    </>
                )}
                {accountDetails.role === "OTHER_OFFICER" && (
                    <>
                        <li>
                            <NavLink to="/userOfficerRecords">
                                <Icon.PeopleFill className="sidebar-icons" />
                                Officer
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/userReport">
                                <Icon.Clipboard2DataFill className="sidebar-icons" />
                                Report
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink
                        exact
                        to="/Profile"
                        className={
                            location.pathname === "/Profile"
                                ? "active-page"
                                : ""
                        }
                    >
                        <Icon.PersonFillGear className="sidebar-icons" />
                        Profile
                    </NavLink>
                </li>
                <hr />
            </ul>
        </nav>
    );

}

export default Sidebar;
