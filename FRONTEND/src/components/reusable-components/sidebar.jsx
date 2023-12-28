import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LoginDetails from "./LoginDetails.jsx";
import * as Icon from "react-bootstrap-icons";

function Sidebar({ isSidebarVisible }) {
    const accountDetails = LoginDetails();
    const location = useLocation();
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
                    <li>
                        <NavLink
                            exact
                            to="/Officer"
                            className={
                                location.pathname === "/Officer"
                                    ? "active-page"
                                    : ""
                            }
                        >
                            <Icon.PeopleFill className="sidebar-icons" />
                            Officer
                        </NavLink>
                    </li>
                )}
                {accountDetails.role === "TREASURER" && (
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
                )}
                {accountDetails.role === "AUDITOR" && (
                    <li>
                        <NavLink
                            exact
                            to="/Report"
                            className={
                                location.pathname === "/Report"
                                    ? "active-page"
                                    : ""
                            }
                        >
                            <Icon.Clipboard2DataFill className="sidebar-icons" />
                            Report
                        </NavLink>
                    </li>
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
